import os
from dotenv import load_dotenv
from pinecone import Pinecone

# Load keys
load_dotenv(".env.local")

# Connect
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("portfolio-rag")

# Get Stats
stats = index.describe_index_stats()
print("\n📊 Database Stats:")
print(stats)

# Peek at the data
print("\n👀 Peeking at the first 3 items:")
results = index.query(
    vector=[0] * 1024, # Dummy vector just to get random results
    top_k=3,
    include_metadata=True
)

for match in results['matches']:
    print(f"\nID: {match['id']}")
    print(f"Score: {match['score']}")
    print(f"Text Snippet: {match['metadata'].get('text', 'NO TEXT FOUND')[:100]}...") # Show first 100 chars