"""
Ingest resume.md into the Pinecone 'portfolio-rag' index.

Improvements over the original:
- Wipes the index first (delete_all) so stale vectors (e.g. old employer
  mentions) can't linger and resurface in answers.
- Heading-aware chunking: each chunk is prefixed with the section title it
  came from, so a chunk like a single bullet still carries the context of
  "Professional Experience > Founders Office at Pinch" into its embedding.
- Batched embeddings (Cohere accepts up to 96 texts/call) instead of one HTTP
  round-trip per chunk.
"""

import os
import re
import json
import time
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv
from pinecone import Pinecone
import cohere
from groq import Groq
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Project lines look like:  **AI DJ** | *Python, ffmpeg, ...*
PROJECT_RE = re.compile(r"^\*\*(.+?)\*\*\s*\|")

load_dotenv(".env")

co = cohere.Client(os.getenv("COHERE_API_KEY"))
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("portfolio-rag")
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SOURCE = "resume.md"
EMBED_MODEL = "embed-english-v3.0"
EMBED_BATCH = 96
UPSERT_BATCH = 100
# Fast current-gen model for the per-chunk situating sentence. Llama 4 Scout is
# the free, modern successor to the (soon-deprecated) llama-3.1-8b-instant.
CONTEXT_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"
# Per-chunk calls run concurrently; this caps simultaneous requests so we stay
# polite to Groq's rate limits while still finishing in seconds.
CONTEXT_WORKERS = 5
# Mirror of the embedded chunks so the chat route can run client-side BM25
# (hybrid retrieval) without a second vector store or extra infra.
CHUNKS_JSON = os.path.join("data", "rag-chunks.json")

print(f"📄 Loading {SOURCE}...")
with open(SOURCE, "r", encoding="utf-8") as f:
    text = f.read()


def split_into_sections(md: str):
    """Yield (heading, body) pairs, splitting on top-level (#) and sub (##) headings."""
    sections = []
    current_heading = "Overview"
    buffer: list[str] = []
    for line in md.splitlines():
        stripped = line.strip()
        project_match = PROJECT_RE.match(stripped)
        if stripped.startswith("#"):
            if buffer:
                sections.append((current_heading, "\n".join(buffer).strip()))
                buffer = []
            current_heading = stripped.lstrip("#").strip()
        elif project_match:
            # a project title line starts its own section so each project is
            # retrievable on its own, with the right label.
            if buffer:
                sections.append((current_heading, "\n".join(buffer).strip()))
                buffer = []
            current_heading = project_match.group(1).strip()
            buffer.append(line)
        else:
            buffer.append(line)
    if buffer:
        sections.append((current_heading, "\n".join(buffer).strip()))
    return [(h, b) for h, b in sections if b]


def build_outline(md: str) -> str:
    """Compact table of contents — every heading and project title, one per line.
    Sent to the contextualizer instead of the full resume: it gives the model
    enough structure to place a snippet without spending ~3.7K tokens/call (which
    blows the 30K TPM free-tier budget after ~8 calls). The snippet itself still
    carries its own facts/dates."""
    out = []
    for line in md.splitlines():
        s = line.strip()
        if s.startswith("#"):
            out.append(s.lstrip("#").strip())
        elif PROJECT_RE.match(s):
            out.append(s.split("|")[0].strip().strip("*").strip())
    return "\n".join(out)


splitter = RecursiveCharacterTextSplitter(
    chunk_size=1100,
    chunk_overlap=150,
    separators=["\n\n", "\n", ". ", " ", ""],
)


_SITUATE_INSTRUCTION = (
    "situates it: which role, project, or section it belongs to and the key "
    "entities or dates it covers. Use ONLY facts present above."
)


def contextualize_one(chunk: str, outline: str, retries: int = 3) -> str:
    """Anthropic-style Contextual Retrieval: one situating sentence (role/project/
    section + key entities and dates) so the chunk stays retrievable on its own.

    Deterministic per-chunk call, so there's no fragile "return exactly N JSON
    items" contract to miscount. Sends a compact outline (not the full resume) to
    stay well under the TPM budget. Retries with backoff on rate limits; returns
    '' on persistent failure so the caller falls back to the bare heading prefix."""
    prompt = (
        "You are situating a snippet from Vrishab Nair's resume so it can be "
        "retrieved on its own. Here is the resume's outline for context:\n\n"
        f"<outline>\n{outline}\n</outline>\n\n"
        f"<snippet>\n{chunk}\n</snippet>\n\n"
        f"Write ONE short sentence (max 25 words) that {_SITUATE_INSTRUCTION} "
        "Output only the sentence."
    )
    for attempt in range(retries):
        try:
            resp = groq_client.chat.completions.create(
                model=CONTEXT_MODEL,
                messages=[{"role": "user", "content": prompt}],
                temperature=0,
                max_tokens=80,
            )
            return (resp.choices[0].message.content or "").strip()
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 * (attempt + 1))  # backoff on rate limit / transient
                continue
            print(f"   (context failed after {retries} tries, heading only: {e})")
            return ""
    return ""


# Build heading-prefixed chunks, then give each a contextual situating sentence.
records: list[dict] = []
for heading, body in split_into_sections(text):
    for piece in splitter.split_text(body):
        content = f"[{heading}]\n{piece}".strip()
        records.append({"section": heading, "content": content})

print(f"🧩 Built {len(records)} chunks. Generating contextual prefixes ({CONTEXT_MODEL})...")
outline = build_outline(text)
# Run the per-chunk calls concurrently — deterministic and fast. executor.map
# preserves input order, so contexts[i] lines up with records[i].
with ThreadPoolExecutor(max_workers=CONTEXT_WORKERS) as pool:
    contexts = list(pool.map(lambda r: contextualize_one(r["content"], outline), records))
for r, ctx in zip(records, contexts):
    r["text"] = f"{ctx}\n\n{r['content']}".strip() if ctx else r["content"]
done = sum(1 for c in contexts if c)
print(f"   contextualized {done}/{len(records)} (rest fall back to heading prefix)")

# Batch-embed.
print("🚀 Generating embeddings...")
embeddings: list[list[float]] = []
for start in range(0, len(records), EMBED_BATCH):
    batch = records[start:start + EMBED_BATCH]
    resp = co.embed(
        texts=[r["text"] for r in batch],
        model=EMBED_MODEL,
        input_type="search_document",
    )
    embeddings.extend(resp.embeddings)

# Wipe stale vectors so nothing outdated survives the re-ingest.
print("🧹 Clearing existing vectors...")
try:
    index.delete(delete_all=True)
except Exception as e:
    print(f"   (nothing to clear or delete failed: {e})")

# Upsert fresh.
print("📤 Upserting...")
vectors = [
    {
        "id": f"chunk_{i}",
        "values": embeddings[i],
        "metadata": {"text": r["text"], "section": r["section"]},
    }
    for i, r in enumerate(records)
]
for start in range(0, len(vectors), UPSERT_BATCH):
    index.upsert(vectors=vectors[start:start + UPSERT_BATCH])

# Mirror the exact chunks (same ids) to JSON so the chat route can run BM25 and
# fuse it with the dense results via RRF. Stays in sync because it's written
# from the same `records` in the same pass.
os.makedirs(os.path.dirname(CHUNKS_JSON), exist_ok=True)
with open(CHUNKS_JSON, "w", encoding="utf-8") as f:
    json.dump(
        [
            {"id": f"chunk_{i}", "section": r["section"], "text": r["text"]}
            for i, r in enumerate(records)
        ],
        f,
        ensure_ascii=False,
        indent=2,
    )

print(f"✅ Success! Ingested {len(vectors)} chunks into 'portfolio-rag'.")
print(f"🗂️  Wrote {CHUNKS_JSON} ({len(records)} chunks) for hybrid BM25 retrieval.")
