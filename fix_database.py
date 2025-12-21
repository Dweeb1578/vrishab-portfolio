import os
from dotenv import load_dotenv
from pinecone import Pinecone
import cohere

# 1. Load Environment Variables (Try both .env and .env.local)
if not load_dotenv('.env'):
    load_dotenv('.env.local')

# 2. Key Verification
co_key = os.getenv("COHERE_API_KEY")
pc_key = os.getenv("PINECONE_API_KEY")

if not co_key:
    print("❌ Error: COHERE_API_KEY is missing. Check your .env.local file.")
    exit(1)
if not pc_key:
    print("❌ Error: PINECONE_API_KEY is missing. Check your .env.local file.")
    exit(1)

# Initialize Clients
co = cohere.Client(co_key)
pc = Pinecone(api_key=pc_key)

INDEX_NAME = "portfolio-rag"
EMBEDDING_MODEL = "embed-english-v3.0" 

def chunk_text(text, chunk_size=800):
    words = text.split()
    chunks = []
    current_chunk = []
    current_length = 0
    for word in words:
        current_length += len(word) + 1
        if current_length > chunk_size:
            chunks.append(" ".join(current_chunk))
            current_chunk = [word]
            current_length = len(word) + 1
        else:
            current_chunk.append(word)
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    return chunks

def get_resume_text():
    # Try multiple locations
    possible_paths = ["data/resume.md", "resume.md", "data/Resume.md"]
    
    for path in possible_paths:
        if os.path.exists(path):
            print(f"✅ Found resume at: {path}")
            with open(path, "r", encoding="utf-8") as f:
                return f.read()
    
    return None

def seed_database():
    print("🚀 Starting Database Update...")
    
    raw_text = get_resume_text()
    
    if not raw_text:
        print("❌ CRITICAL ERROR: Could not find 'resume.md'.")
        print("   -> Please check if the file exists in this folder or in a 'data' subfolder.")
        print("   -> Current folder files:", os.listdir())
        return

    print(f"📄 Read {len(raw_text)} characters.")
    chunks = chunk_text(raw_text)
    print(f"🔪 Split into {len(chunks)} chunks")

    index = pc.Index(INDEX_NAME)
    print("🧠 Generating Embeddings...")
    
    vectors_to_upsert = []
    for i, chunk in enumerate(chunks):
        try:
            response = co.embed(
                texts=[chunk],
                model=EMBEDDING_MODEL,
                input_type="search_document"
            )
            embedding = response.embeddings[0]
            
            vectors_to_upsert.append({
                "id": f"resume_chunk_{i}",
                "values": embedding,
                "metadata": {"text": chunk, "source": "resume.md"}
            })
        except Exception as e:
            print(f"⚠️ Error embedding chunk {i}: {e}")

    if vectors_to_upsert:
        print(f"☁️  Uploading {len(vectors_to_upsert)} vectors to Pinecone...")
        index.upsert(vectors=vectors_to_upsert)
        print("✅ Success! The Brain has been updated.")
        print("👉 You can now ask the bot about 'PM Coach AI'.")

if __name__ == "__main__":
    seed_database()