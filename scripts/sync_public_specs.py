#!/usr/bin/env python3

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from shutil import copyfile


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def _spec_pairs(repo_root: Path) -> list[tuple[Path, Path]]:
    shared_root = repo_root / "shared" / "specs"
    public_root = repo_root / "frontend" / "public" / "specs"

    pairs: list[tuple[Path, Path]] = [
        (shared_root / "theme.json", public_root / "theme.json"),
        (shared_root / "ui-manifest.json", public_root / "ui-manifest.json"),
        (shared_root / "app-spec.example.json", public_root / "app-spec.example.json"),
        (shared_root / "site-spec.example.json", public_root / "site-spec.example.json"),
    ]

    shared_schema = shared_root / "schema"
    public_schema = public_root / "schema"
    if shared_schema.exists():
        for f in sorted(shared_schema.glob("*.json")):
            pairs.append((f, public_schema / f.name))

    return pairs


def _read_bytes(path: Path) -> bytes | None:
    try:
        return path.read_bytes()
    except FileNotFoundError:
        return None


def main(argv: list[str]) -> int:
    p = argparse.ArgumentParser(description="Sync frontend/public/specs from shared/specs (source of truth).")
    p.add_argument("--check", action="store_true", help="Fail if outputs differ (CI mode).")
    p.add_argument("--write", action="store_true", help="Overwrite outputs to match shared/specs.")
    args = p.parse_args(argv)

    if args.check and args.write:
        print("Choose either --check or --write (not both).", file=sys.stderr)
        return 2
    mode = "check" if args.check else "write"

    repo_root = _repo_root()
    pairs = _spec_pairs(repo_root)

    changed: list[tuple[Path, Path]] = []
    missing_sources: list[Path] = []

    for src, dst in pairs:
        src_bytes = _read_bytes(src)
        if src_bytes is None:
            missing_sources.append(src)
            continue
        dst_bytes = _read_bytes(dst)
        if dst_bytes != src_bytes:
            changed.append((src, dst))

    if missing_sources:
        for src in missing_sources:
            print(f"Missing source spec: {src.relative_to(repo_root)}", file=sys.stderr)
        return 2

    if mode == "check":
        if changed:
            print("Public specs are out of sync. Run: python3 scripts/sync_public_specs.py --write", file=sys.stderr)
            for src, dst in changed:
                print(
                    f"- {dst.relative_to(repo_root)} != {src.relative_to(repo_root)}",
                    file=sys.stderr,
                )
            return 1
        print("OK: frontend/public/specs is in sync with shared/specs.")
        return 0

    # write mode
    for src, dst in changed:
        dst.parent.mkdir(parents=True, exist_ok=True)
        copyfile(src, dst)

    if changed:
        print(f"Updated {len(changed)} file(s) under frontend/public/specs/.")
    else:
        print("No changes needed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

