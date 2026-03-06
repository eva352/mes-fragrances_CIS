#!/usr/bin/env python3
from __future__ import annotations

import csv
import json
import re
from dataclasses import dataclass
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
BLOCKS_DIR = REPO_ROOT / "shared" / "blocks"
PRODUCTS_CSV = REPO_ROOT / "backend" / "app" / "max_ui" / "data" / "products.csv"
OUT_MD = REPO_ROOT / "docs" / "MVP SCOPE" / "BLOCKS_BY_SITE_TYPE.md"


@dataclass(frozen=True)
class Block:
    category: str
    slug: str
    title: str


def _title_from_slug(slug: str) -> str:
    return slug.replace("-", " ").strip().title()


def load_blocks() -> list[Block]:
    blocks: list[Block] = []
    if not BLOCKS_DIR.exists():
        return blocks

    for meta_path in sorted(BLOCKS_DIR.glob("*/*/meta.json")):
        category = meta_path.parent.parent.name
        slug = meta_path.parent.name
        title = ""
        try:
            raw = json.loads(meta_path.read_text(encoding="utf-8"))
            title = str(raw.get("title") or "").strip()
        except Exception:
            title = ""
        blocks.append(Block(category=category, slug=slug, title=title or _title_from_slug(slug)))

    # Also include any block folders lacking meta.json (defensive)
    for block_dir in sorted(p for p in BLOCKS_DIR.glob("*/*") if p.is_dir()):
        category = block_dir.parent.name
        slug = block_dir.name
        if any(b.category == category and b.slug == slug for b in blocks):
            continue
        blocks.append(Block(category=category, slug=slug, title=_title_from_slug(slug)))

    return blocks


def blocks_by_category(blocks: list[Block]) -> dict[str, list[Block]]:
    out: dict[str, list[Block]] = {}
    for b in blocks:
        out.setdefault(b.category, []).append(b)
    for k in out:
        out[k] = sorted(out[k], key=lambda b: (b.slug, b.title))
    return out


# CIS categories today (from shared/blocks). We keep "missing-but-important" sections here too.
SECTION_ORDER = [
    "hero",
    "features",
    "compare",
    "pricing",
    "process",
    "about",
    "timeline",  # used as social-proof in MVP
    "tabs",  # used as FAQ in MVP
    "gallery",  # missing today
    "before-after",  # missing today
    "contact",  # missing today
    "booking",  # missing today
    "cta",  # missing today
    "footer",  # missing today
]


def infer_sections_from_landing_pattern(pattern: str) -> list[str]:
    """
    Heuristic mapping from Max UI "Landing Page Pattern" to CIS sections.
    It's intentionally transparent and conservative: it only infers what is implied.
    """
    p = (pattern or "").lower()
    sections: list[str] = []

    def add(s: str):
        if s not in sections:
            sections.append(s)

    # Always start with hero for websites.
    add("hero")

    if "feature" in p or "showcase" in p or "demo" in p:
        add("features")
    if "comparison" in p or "compare" in p:
        add("compare")
    if "pricing" in p or "conversion" in p:
        add("pricing")
    if "trust" in p or "authority" in p or "social proof" in p:
        add("timeline")
        add("about")
    if "storytelling" in p:
        add("about")
        add("process")
    if "portfolio" in p or "grid" in p or "gallery" in p or "visual" in p:
        add("gallery")
    if "cta" in p:
        add("cta")

    return sections


def normalize_section(section: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", (section or "").strip().lower()).strip("-")
    if s in {"testimonials", "social-proof", "socialproof", "trust"}:
        return "timeline"
    if s in {"faq"}:
        return "tabs"
    return s


def format_blocks_list(items: list[Block]) -> str:
    return ", ".join(f"`{b.category}/{b.slug}`" for b in items)


def load_products() -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    with PRODUCTS_CSV.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append({k: (v or "") for k, v in r.items()})
    return rows


def main() -> int:
    blocks = load_blocks()
    by_cat = blocks_by_category(blocks)
    categories_present = sorted(by_cat.keys())

    products = load_products()

    lines: list[str] = []
    lines.append("# CIS — Blocs disponibles par type de site (Max UI Product Type)")
    lines.append("")
    lines.append("Ce document est **généré automatiquement** depuis :")
    lines.append(f"- `shared/blocks/` (catalogue de blocs disponibles dans CIS)")
    lines.append(f"- `backend/app/max_ui/data/products.csv` (liste des *Product Types* + *Landing Page Pattern*)")
    lines.append("")
    lines.append("Limites actuelles :")
    lines.append("- CIS n'a pas encore de blocs dédiés pour `gallery`, `before-after`, `contact/booking`, `cta`, `footer` (ils apparaîtront donc comme *manquants*).")
    lines.append("- Les sections recommandées sont une **heuristique** dérivée du champ Max UI `Landing Page Pattern` (à affiner avec une future “CIS Blocks Catalog”).")
    lines.append("")
    lines.append("## Catalogue CIS (actuel)")
    lines.append("")
    lines.append(f"- Catégories présentes : {', '.join(f'`{c}`' for c in categories_present)}")
    lines.append(f"- Total blocs : {len(blocks)}")
    lines.append("")
    for cat in sorted(categories_present):
        lines.append(f"### {cat} ({len(by_cat[cat])})")
        lines.append(format_blocks_list(by_cat[cat]))
        lines.append("")

    lines.append("---")
    lines.append("")
    lines.append("## Matrice par type de site")
    lines.append("")

    for row in products:
        product_type = (row.get("Product Type") or "").strip()
        if not product_type:
            continue
        landing_pattern = (row.get("Landing Page Pattern") or "").strip()
        key_considerations = (row.get("Key Considerations") or "").strip()

        inferred = infer_sections_from_landing_pattern(landing_pattern)
        inferred = [normalize_section(s) for s in inferred]

        # Keep order stable & readable.
        inferred_ordered: list[str] = []
        for s in SECTION_ORDER:
            if s in inferred:
                inferred_ordered.append(s)
        for s in inferred:
            if s not in inferred_ordered:
                inferred_ordered.append(s)

        lines.append(f"### {product_type}")
        lines.append(f"- Pattern Max UI : **{landing_pattern or '—'}**")
        if key_considerations:
            short = key_considerations
            if len(short) > 220:
                short = short[:220].rstrip() + "…"
            lines.append(f"- Notes Max UI : {short}")
        lines.append(f"- Sections suggérées : {', '.join(f'`{s}`' for s in inferred_ordered) if inferred_ordered else '—'}")

        missing: list[str] = []
        for s in inferred_ordered:
            if s in by_cat:
                candidates = by_cat[s]
                lines.append(f"  - `{s}` : {format_blocks_list(candidates)}")
            else:
                missing.append(s)
        if missing:
            lines.append(f"- Sections manquantes (CIS) : {', '.join(f'`{s}`' for s in missing)}")
        lines.append("")

    OUT_MD.parent.mkdir(parents=True, exist_ok=True)
    OUT_MD.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

