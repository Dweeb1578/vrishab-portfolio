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
# Cheap, fast model just for the situating sentences.
CONTEXT_MODEL = "llama-3.1-8b-instant"
# Chunks per contextualization call — batching keeps total tokens under Groq's
# per-minute limit so the full re-ingest takes seconds, not minutes.
CONTEXT_BATCH = 7
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


splitter = RecursiveCharacterTextSplitter(
    chunk_size=1100,
    chunk_overlap=150,
    separators=["\n\n", "\n", ". ", " ", ""],
)


_SITUATE_INSTRUCTION = (
    "situates it: which role, project, or section it belongs to and the key "
    "entities or dates it covers. Use ONLY facts present above."
)


def contextualize_one(chunk: str, full_doc: str) -> str:
    """Single-chunk situating sentence. Slower per chunk, but exact — used as the
    fallback when a batch call miscounts."""
    prompt = (
        "You are situating a snippet from Vrishab Nair's resume so it can be "
        "retrieved on its own.\n\n"
        f"<resume>\n{full_doc}\n</resume>\n\n"
        f"<snippet>\n{chunk}\n</snippet>\n\n"
        f"Write ONE short sentence (max 25 words) that {_SITUATE_INSTRUCTION} "
        "Output only the sentence."
    )
    try:
        resp = groq_client.chat.completions.create(
            model=CONTEXT_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            max_tokens=80,
        )
        return (resp.choices[0].message.content or "").strip()
    except Exception as e:
        print(f"   (single context failed, using heading only: {e})")
        return ""


def contextualize_batch(chunks: list[str], full_doc: str) -> list[str] | None:
    """Anthropic-style Contextual Retrieval: generate a one-sentence situating
    prefix for each chunk (role/project/section + key entities and dates) so it
    stays retrievable on its own. Prepending this before embedding lifts recall
    on a small, entity-dense corpus.

    Batched several chunks per call: re-sending the full resume once per chunk
    blows past Groq's per-minute token limit and throttles hard (~28 calls ->
    minutes). One call per batch sends the doc a handful of times instead.
    Returns None when the model returns the wrong number of contexts or errors,
    so the caller can fall back to exact per-chunk calls for that batch."""
    numbered = "\n\n".join(f"[{i}]\n{c}" for i, c in enumerate(chunks))
    prompt = (
        "You situate snippets from Vrishab Nair's resume so each can be retrieved "
        "on its own.\n\n"
        f"<resume>\n{full_doc}\n</resume>\n\n"
        f"<snippets>\n{numbered}\n</snippets>\n\n"
        f"For EACH numbered snippet, write ONE short sentence (max 25 words) that "
        f"{_SITUATE_INSTRUCTION} Respond with strict JSON "
        '{"contexts": ["...", ...]} — exactly one string per snippet, in the same '
        "order."
    )
    try:
        resp = groq_client.chat.completions.create(
            model=CONTEXT_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            max_tokens=800,
            response_format={"type": "json_object"},
        )
        out = json.loads(resp.choices[0].message.content or "{}").get("contexts", [])
        if len(out) == len(chunks):
            return [str(s).strip() for s in out]
        print(f"   (batch returned {len(out)} != {len(chunks)} contexts; retrying per-chunk)")
    except Exception as e:
        print(f"   (batch context failed, retrying per-chunk: {e})")
    return None


# Build heading-prefixed chunks, then give each a contextual situating sentence.
records: list[dict] = []
for heading, body in split_into_sections(text):
    for piece in splitter.split_text(body):
        content = f"[{heading}]\n{piece}".strip()
        records.append({"section": heading, "content": content})

print(f"🧩 Built {len(records)} chunks. Generating contextual prefixes...")
for start in range(0, len(records), CONTEXT_BATCH):
    batch = records[start:start + CONTEXT_BATCH]
    contents = [r["content"] for r in batch]
    ctxs = contextualize_batch(contents, text)
    if ctxs is None:
        ctxs = [contextualize_one(c, text) for c in contents]
    for r, ctx in zip(batch, ctxs):
        r["text"] = f"{ctx}\n\n{r['content']}".strip() if ctx else r["content"]
    print(f"   [{min(start + CONTEXT_BATCH, len(records))}/{len(records)}] contextualized")

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
