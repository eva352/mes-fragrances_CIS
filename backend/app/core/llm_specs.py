from __future__ import annotations

from pathlib import Path


def resolve_llm_specs_dir() -> Path:
    raw = (Path.cwd() / "llm_specs").resolve()
    candidates: list[Path] = []

    env = None
    try:
        import os

        env = os.environ.get("AURORA_LLM_SPECS_DIR")
    except Exception:
        env = None

    if env:
        candidates.append(Path(env))

    candidates.append(Path("/llm_specs"))
    candidates.append(raw)
    candidates.append(Path(__file__).resolve().parents[3] / "llm_specs")

    for c in candidates:
        try:
            if c.exists():
                return c
        except Exception:
            continue

    return candidates[0]


def ensure_llm_specs_dir() -> Path:
    p = resolve_llm_specs_dir()
    p.mkdir(parents=True, exist_ok=True)
    return p

