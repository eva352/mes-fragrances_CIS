from __future__ import annotations

import os

from cryptography.fernet import Fernet, InvalidToken


ENV_KEYS = ("PILOT_ENCRYPTION_KEY", "AURORA_ENCRYPTION_KEY")


def _get_raw_key() -> tuple[str, str]:
    for env_key in ENV_KEYS:
        raw = (os.environ.get(env_key) or "").strip()
        if raw:
            return env_key, raw

    primary = ENV_KEYS[0]
    legacy = ENV_KEYS[1]
    raise RuntimeError(
        f"Missing {primary} (legacy fallback: {legacy}; required for OpenRouter BYOK storage)."
    )


def _get_fernet() -> Fernet:
    env_key, raw = _get_raw_key()
    try:
        return Fernet(raw.encode("utf-8"))
    except Exception as exc:
        raise RuntimeError(f"Invalid {env_key} (must be a Fernet key).") from exc


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

