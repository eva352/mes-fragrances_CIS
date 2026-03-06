#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
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


def slugify(name: str) -> str:
    cleaned = name.replace("_", "-")
    match = re.match(r"^([a-z-]+)(\d.*)$", cleaned)
    if match:
        return f"{match.group(1)}-{match.group(2)}"
    return cleaned


def category_for_name(name: str, category_map: dict[str, list[str]]) -> str | None:
    lowered = name.lower()
    for category, prefixes in category_map.items():
        for prefix in prefixes:
            if lowered.startswith(prefix):
                return category
    return None


def fetch_block_item(name: str) -> dict:
    cmd = [
        "npx",
        "--yes",
        "shadcn@latest",
        "view",
        f"@shadcnblocks/{name}",
    ]
    result = subprocess.run(
        cmd,
        cwd=str(REPO_ROOT),
        check=True,
        capture_output=True,
        text=True,
    )
    payload = json.loads(result.stdout)
    return payload[0]


def write_block(out_dir: Path, item: dict, category: str) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    block_file = out_dir / "block.tsx"
    meta_file = out_dir / "meta.json"
    install_file = out_dir / "install.txt"

    files = item.get("files", [])
    block_content = None
    for file_entry in files:
        if file_entry.get("path", "").endswith(".tsx"):
            block_content = file_entry.get("content", "")
            break
    if block_content is None:
        return

    block_file.write_text(block_content)

    install_lines = [f"npx shadcn add @shadcnblocks/{item['name']}"]
    dependencies = item.get("dependencies", []) or []
    if dependencies:
        install_lines.append(f"npm install {' '.join(dependencies)}")
    install_file.write_text("\n".join(install_lines) + "\n")

    meta = {
        "title": item.get("title") or item.get("name"),
        "category": category,
        "slug": out_dir.name,
        "source": {
            "registry": "@shadcnblocks",
            "name": item.get("name"),
        },
        "install": install_lines,
    }
    meta_file.write_text(json.dumps(meta, ensure_ascii=False, indent=2))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--index", required=True, help="Path to shadcnblocks index.json")
    parser.add_argument(
        "--categories",
        default="",
        help="Comma-separated category names to import. Default: all in mapping file.",
    )
    parser.add_argument(
        "--mapping",
        default=str(REPO_ROOT / "scripts/blocks/shadcnblocks-cis-categories.json"),
        help="Category mapping JSON.",
    )
    parser.add_argument(
        "--out-root",
        default=str(REPO_ROOT / "shared/blocks"),
        help="Output root for CIS blocks.",
    )
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()

    load_env_key()

    index_path = Path(args.index).expanduser().resolve()
    items = json.loads(index_path.read_text())
    category_map = json.loads(Path(args.mapping).read_text())

    allowed_categories = (
        {c.strip() for c in args.categories.split(",") if c.strip()}
        if args.categories
        else set(category_map.keys())
    )

    out_root = Path(args.out_root).resolve()
    imported = 0

    for item in items:
        name = item.get("name")
        if not name:
            continue
        category = category_for_name(name, category_map)
        if not category or category not in allowed_categories:
            continue

        slug = slugify(name)
        out_dir = out_root / category / slug
        if out_dir.exists() and not args.overwrite:
            continue

        block_item = fetch_block_item(name)
        write_block(out_dir, block_item, category)
        imported += 1

    print(f"Imported {imported} blocks into {out_root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
