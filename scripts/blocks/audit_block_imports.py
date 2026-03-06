#!/usr/bin/env python3
"""Audit local @/ imports used in frontend/blocks/registry.

Fails if any @/ import cannot be resolved to a file in frontend/.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

IMPORT_RE = re.compile(
    r"""(?:
        import\s+(?:type\s+)?[^'\"]*?from\s*['\"]([^'\"]+)['\"]
      | import\s*['\"]([^'\"]+)['\"]
      | require\(\s*['\"]([^'\"]+)['\"]\s*\)
    )""",
    re.VERBOSE,
)

EXTS = [
    ".ts",
    ".tsx",
    ".mts",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".json",
    ".css",
]


def _iter_block_files(blocks_root: Path) -> list[Path]:
    files: list[Path] = []
    for ext in ("*.ts", "*.tsx", "*.mts"):
        files.extend(blocks_root.rglob(ext))
    return files


def _resolve_import(frontend_root: Path, import_path: str) -> bool:
    if not import_path.startswith("@/"):
        return True
    rel = import_path[2:]
    target = frontend_root / rel

    if target.exists():
        if target.is_file():
            return True
        if target.is_dir():
            return any((target / f"index{ext}").exists() for ext in EXTS)

    if target.suffix:
        return False

    for ext in EXTS:
        if target.with_suffix(ext).exists():
            return True

    return False


def audit(blocks_root: Path, frontend_root: Path) -> dict[str, set[Path]]:
    missing: dict[str, set[Path]] = {}
    for file_path in _iter_block_files(blocks_root):
        try:
            content = file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            content = file_path.read_text(encoding="utf-8", errors="replace")
        for match in IMPORT_RE.finditer(content):
            import_path = next((g for g in match.groups() if g), None)
            if not import_path or not import_path.startswith("@/"):
                continue
            if not _resolve_import(frontend_root, import_path):
                missing.setdefault(import_path, set()).add(file_path)
    return missing


def _print_missing(missing: dict[str, set[Path]], repo_root: Path) -> None:
    total = len(missing)
    print(f"Missing @/ imports: {total}")
    for import_path in sorted(missing.keys()):
        files = sorted(missing[import_path])
        print(f"- {import_path} ({len(files)} file(s))")
        for file_path in files:
            rel = file_path.relative_to(repo_root)
            print(f"  - {rel}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit @/ imports in frontend blocks.")
    parser.add_argument(
        "--blocks",
        default="frontend/blocks/registry",
        help="Blocks registry root (default: frontend/blocks/registry)",
    )
    parser.add_argument(
        "--frontend",
        default="frontend",
        help="Frontend root (default: frontend)",
    )
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[2]
    blocks_root = repo_root / args.blocks
    frontend_root = repo_root / args.frontend

    if not blocks_root.exists():
        print(f"Blocks root not found: {blocks_root}")
        return 2
    if not frontend_root.exists():
        print(f"Frontend root not found: {frontend_root}")
        return 2

    missing = audit(blocks_root, frontend_root)
    if missing:
        _print_missing(missing, repo_root)
        return 1

    print("All @/ imports in blocks resolve.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
