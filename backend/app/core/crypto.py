from __future__ import annotations

import os

from cryptography.fernet import Fernet, InvalidToken


ENV_KEY = "AURORA_ENCRYPTION_KEY"


def _get_fernet() -> Fernet:
    raw = (os.environ.get(ENV_KEY) or "").strip()
    if not raw:
        raise RuntimeError(f"Missing {ENV_KEY} (required for OpenRouter BYOK storage).")
    try:
        return Fernet(raw.encode("utf-8"))
    except Exception as exc:
        raise RuntimeError(f"Invalid {ENV_KEY} (must be a Fernet key).") from exc


def encrypt_secret(value: str) -> str:
    f = _get_fernet()
    token = f.encrypt((value or "").encode("utf-8"))
    return token.decode("utf-8")


def decrypt_secret(token: str) -> str:
    f = _get_fernet()
    try:
        raw = f.decrypt((token or "").encode("utf-8"))
    except InvalidToken as exc:
        raise RuntimeError("Invalid encrypted secret token.") from exc
    return raw.decode("utf-8")

