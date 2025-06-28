import chromadb
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
chroma = chromadb.Client()
collection = chroma.get_or_create_collection("ideas")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/add")
async def add_idea(req: Request):
    body = await req.json()
    collection.add(
        documents=[body["text"]],
        embeddings=[body["embedding"]],
        ids=[body["id"]]
    )
    return {"status": "ok"}

@app.post("/query")
async def query_vector(req: Request):
    body = await req.json()
    results = collection.query(
        query_embeddings=[body["embedding"]],
        n_results=3,
        include=["distances", "documents", "metadatas"]
    )
    return results
