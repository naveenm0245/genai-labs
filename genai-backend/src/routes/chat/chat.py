from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from services.chat.chat import chat

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    top_p: Optional[float] = None
    top_k: Optional[int] = None
    min_tokens: Optional[int] = None
    max_tokens: Optional[int] = None
    temperature: Optional[float] = None
    frequency_penalty: Optional[float] = None
    presence_penalty: Optional[float] = None


@router.post("/chat")
def chat_route(request: ChatRequest):
    messages_dict = [{"role": msg.role, "content": msg.content} for msg in request.messages]
    
    # Build parameters dict, only including non-None values
    params = {}
    if request.top_p is not None:
        params["top_p"] = request.top_p
    if request.top_k is not None:
        params["top_k"] = request.top_k
    if request.min_tokens is not None:
        params["min_tokens"] = request.min_tokens
    if request.max_tokens is not None:
        params["max_tokens"] = request.max_tokens
    if request.temperature is not None:
        params["temperature"] = request.temperature
    if request.frequency_penalty is not None:
        params["frequency_penalty"] = request.frequency_penalty
    if request.presence_penalty is not None:
        params["presence_penalty"] = request.presence_penalty
    
    response = chat(messages_dict, **params)
    return {"content": response}