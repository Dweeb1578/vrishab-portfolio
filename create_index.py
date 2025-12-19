import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

# 1. Load your API key
load_dotenv(".env.local")

# 2. Initialize Client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index_name = "portfolio-rag"

# 3. Create the Index
# We check if it exists first to avoid errors
if index_name not in pc.list_indexes().names():
    print(f"Creating index: {index_name}...")
    pc.create_index(
        name=index_name,
        dimension=1024, # Matches Cohere embed-english-v3.0
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1" # The standard free region
        )
    )
    print("✅ Index created successfully!")
else:
    print(f"ℹ️ Index '{index_name}' already exists.")
    