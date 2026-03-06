#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

src="shared/ui/themes stack.json"
dst="frontend/themes/aurora-themes.source.txt"

if [[ ! -f "$src" ]]; then
  echo "ERROR: source file not found: $src" >&2
  exit 1
fi

mkdir -p "$(dirname "$dst")"
cp "$src" "$dst"
echo "Synced themes:"
echo "- $src -> $dst"

