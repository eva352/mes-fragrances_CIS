from __future__ import annotations

import argparse
import sys
from pathlib import Path

APP_ROOT = Path(__file__).resolve().parents[1]
if str(APP_ROOT) not in sys.path:
    sys.path.insert(0, str(APP_ROOT))

from app.db.session import SessionLocal
from app.models.perfume import Perfume
from scripts.import_mesfra_catalog import normalize_gender, open_csv_stream, parse_source, slugify


def sync_metadata(csv_path: str, dry_run: bool = False) -> tuple[int, int]:
    with open_csv_stream(csv_path) as handle:
        brands, source_perfumes = parse_source(handle)

    session = SessionLocal()
    try:
        perfumes = {perfume.slug: perfume for perfume in session.query(Perfume).all()}
        updated = 0
        matched = 0

        for source in source_perfumes:
            brand = brands.get(source.brand_id)
            if brand is None:
                continue

            slug = slugify(f"{brand.name}-{source.name}")
            perfume = perfumes.get(slug)
            if perfume is None:
                continue

            matched += 1
            next_gender = normalize_gender(source.gender)
            next_price = source.price
            changed = False

            if perfume.gender != next_gender:
                perfume.gender = next_gender
                changed = True

            current_price = float(perfume.source_price) if perfume.source_price is not None else None
            if current_price != next_price:
                perfume.source_price = next_price
                changed = True

            if changed:
                updated += 1

        if dry_run:
            session.rollback()
        else:
            session.commit()

        return matched, updated
    finally:
        session.close()


def main() -> int:
    parser = argparse.ArgumentParser(description="Backfill perfume gender and source price from catalog CSV.")
    parser.add_argument("csv_path")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    matched, updated = sync_metadata(args.csv_path, dry_run=args.dry_run)
    print(f"matched={matched} updated={updated} dry_run={args.dry_run}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
