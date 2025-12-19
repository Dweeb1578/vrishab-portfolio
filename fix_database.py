import os
from dotenv import load_dotenv
from pinecone import Pinecone
import cohere

# 1. Setup
load_dotenv(".env.local")
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
co = cohere.Client(os.getenv("COHERE_API_KEY"))
index_name = "portfolio-rag"
index = pc.Index(index_name)

# 2. Read Resume
print("📖 Reading resume.md...")
try:
    with open("resume.md", "r", encoding="utf-8") as f:
        text = f.read()
except FileNotFoundError:
    print("❌ Error: resume.md not found!")
    exit()

# 3. Chunking (Simple Split by headings)
chunks = [c.strip() for c in text.split("## ") if c.strip()]
print(f"🧩 Found {len(chunks)} sections.")

# 4. Generate Embeddings
print("🧠 Generating AI embeddings (this takes a moment)...")
response = co.embed(
    texts=chunks,
    model='embed-english-v3.0',
    input_type='search_document' # <--- FIXED: snake_case for Python
)
embeddings = response.embeddings

# 5. Upload to Pinecone
print("🚀 Uploading to Pinecone...")
vectors = []
for i, (chunk, vector) in enumerate(zip(chunks, embeddings)):
    vectors.append({
        "id": f"vec_{i}",
        "values": vector,
        "metadata": {"text": chunk} 
    })

# Batch upload
index.upsert(vectors=vectors)

print("✅ Success! Database updated with correct labels.")
print("👉 You can now go back to the browser and ask 'Tell me about ECOX LABS'")