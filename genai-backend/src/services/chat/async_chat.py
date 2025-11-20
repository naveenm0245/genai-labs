from openai import AsyncOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

async_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def async_chat(
    messages: list[dict],
    top_p: float = None,
    top_k: int = None,
    min_tokens: int = None,
    max_tokens: int = None,
    temperature: float = None,
    frequency_penalty: float = None,
    presence_penalty: float = None,
) -> str:
    """
    Async version of chat function for parallel generation.
    """
    # Build parameters dict
    params = {
        "model": "gpt-4o-mini",  # Using a valid OpenAI model
        "messages": messages,
    }
    
    # Add optional parameters if provided
    if top_p is not None:
        params["top_p"] = top_p
    if temperature is not None:
        params["temperature"] = temperature
    if max_tokens is not None:
        params["max_tokens"] = max_tokens
    if min_tokens is not None:
        params["min_tokens"] = min_tokens
    if frequency_penalty is not None:
        params["frequency_penalty"] = frequency_penalty
    if presence_penalty is not None:
        params["presence_penalty"] = presence_penalty
    # Note: top_k is not a standard OpenAI parameter, but we accept it for compatibility
    
    response = await async_client.chat.completions.create(**params)
    return response.choices[0].message.content

