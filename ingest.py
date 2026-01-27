import os
from dotenv import load_dotenv
from pinecone import Pinecone
import cohere
from langchain_text_splitters import RecursiveCharacterTextSplitter

# 1. Load keys from your .env file
load_dotenv(".env")

# 2. Setup Clients
co = cohere.Client(os.getenv("COHERE_API_KEY"))
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# 3. Connect to Index
index_name = "portfolio-rag"
index = pc.Index(index_name)

# 4. Load and Chunk the Markdown
print("📄 Loading resume.md...")
with open("resume.md", "r", encoding="utf-8") as f:
    text = f.read()

# "Recursive" means it tries to split by paragraphs first, then sentences.
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,    # 500 characters per chunk (approx 1 paragraph)
    chunk_overlap=50,  # Overlap to keep context between chunks
    separators=["\n## ", "\n", " ", ""]
)
chunks = splitter.create_documents([text])

print(f"🧩 Split resume into {len(chunks)} chunks.")

# 5. Embed and Upload
vectors = []
print("🚀 Generating embeddings and uploading...")

for i, chunk in enumerate(chunks):
    # Generate Embedding (Vector)
    response = co.embed(
        texts=[chunk.page_content],
        model="embed-english-v3.0",
        input_type="search_document"
    )
    embedding = response.embeddings[0]
    
    # Prepare for Pinecone
    vectors.append({
        "id": f"chunk_{i}",
        "values": embedding,
        "metadata": {"text": chunk.page_content}
    })

# Batch upload
index.upsert(vectors=vectors)

print("✅ Success! Your portfolio is now in the Vector Database.")