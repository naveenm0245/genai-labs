from fastapi import FastAPI
import uvicorn
from loguru import logger

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "GenAI Backend is running"}

@app.get("/health")
def health_check():
    return {"health": "ok"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)