from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for the frontend origin
origins = [
    "http://localhost:59120",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    # Simple reply logic (you can connect your AI model here)
    reply_text = f"You said: '{request.message}'. This is a response from the FastAPI backend!"
    return {"reply": reply_text}
