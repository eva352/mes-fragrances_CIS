from __future__ import annotations

import os
from typing import Any

import httpx


OPENROUTER_BASE_URL = os.environ.get("AURORA_OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1").rstrip("/")


class OpenRouterError(RuntimeError):
    pass


def _auth_headers(api_key: str) -> dict[str, str]:
    return {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }


async def list_models(api_key: str) -> list[dict[str, Any]]:
    url = f"{OPENROUTER_BASE_URL}/models"
    async with httpx.AsyncClient(timeout=20) as client:
        res = await client.get(url, headers=_auth_headers(api_key))
    if res.status_code >= 400:
        raise OpenRouterError(f"OpenRouter /models failed: {res.status_code}")
    data = res.json()
    items = data.get("data")
    if not isinstance(items, list):
        raise OpenRouterError("OpenRouter /models: invalid response shape")
    return items


async def chat_completions_json(api_key: str, payload: dict[str, Any]) -> dict[str, Any]:
    url = f"{OPENROUTER_BASE_URL}/chat/completions"
    async with httpx.AsyncClient(timeout=60) as client:
        res = await client.post(url, headers=_auth_headers(api_key), json=payload)
    if res.status_code >= 400:
        raise OpenRouterError(f"OpenRouter /chat/completions failed: {res.status_code}")
    return res.json()

