import os
from dotenv import load_dotenv
from pinecone import Pinecone
import cohere

# 1. Setup
load_dotenv(".env")
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
co = cohere.Client(os.getenv("COHERE_API_KEY"))
index = pc.Index("portfolio-rag")

query = "Tell me about ECOX LABS"
print(f"🔎 Testing Search for: '{query}'")

# 2. Generate Embedding
print("🧠 Generating Vector...")
try:
    response = co.embed(
        texts=[query],
        model='embed-english-v3.0',
        input_type='search_query'
    )
    vector = response.embeddings[0]
except Exception as e:
    print(f"❌ Embedding Failed: {e}")
    exit()

# 3. Query Pinecone
print("🌲 Querying Database...")
try:
    results = index.query(
        vector=vector,
        top_k=3,
        include_metadata=True
    )
    
    # 4. Show Results
    if not results['matches']:
        print("❌ RESULT: 0 Matches found. The database is likely empty or misconfigured.")
    else:
        print(f"✅ RESULT: Found {len(results['matches'])} matches!")
        for i, m in enumerate(results['matches']):
            score = m['score']
            text_snippet = m['metadata'].get('text', 'NO TEXT')[:100]
            print(f"   {i+1}. [Score: {score:.4f}] {text_snippet}...")

except Exception as e:
    print(f"❌ Database Error: {e}")