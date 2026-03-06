#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import tempfile
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_env_key() -> None:
    if os.environ.get("SHADCNBLOCKS_API_KEY"):
        return
    env_path = REPO_ROOT / ".env.local"
    if not env_path.exists():
        return
    text = env_path.read_text()
    match = re.search(r"^SHADCNBLOCKS_API_KEY=(.+)$", text, re.MULTILINE)
    if match:
        os.environ["SHADCNBLOCKS_API_KEY"] = match.group(1).strip()


def run_search(limit: int, offset: int) -> dict:
    cmd = [
        "npx",
        "--yes",
        "shadcn@latest",
        "search",
        "@shadcnblocks",
        "-l",
        str(limit),
        "-o",
        str(offset),
    ]
    with tempfile.NamedTemporaryFile(mode="w+", suffix=".json", delete=False) as tmp:
        subprocess.run(
            cmd,
            cwd=str(REPO_ROOT),
            check=True,
            stdout=tmp,
            stderr=subprocess.PIPE,
            text=True,
        )
        tmp_path = Path(tmp.name)
    data = json.loads(tmp_path.read_text())
    tmp_path.unlink(missing_ok=True)
    return data


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--out",
        required=True,
        help="Output JSON file (array of items).",
    )
    parser.add_argument("--limit", type=int, default=200)
    args = parser.parse_args()

    load_env_key()

    out_path = Path(args.out).expanduser().resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)

    items: list[dict] = []
    offset = 0
    while True:
        payload = run_search(args.limit, offset)
        items.extend(payload.get("items", []))
        pagination = payload.get("pagination", {})
        if not pagination.get("hasMore"):
            break
        offset = pagination.get("offset", 0) + pagination.get("limit", args.limit)

    out_path.write_text(json.dumps(items, ensure_ascii=False, indent=2))
    print(f"Wrote {len(items)} items to {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
