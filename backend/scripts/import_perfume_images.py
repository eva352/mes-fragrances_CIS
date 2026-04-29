from __future__ import annotations

import argparse
import csv
import io
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import TextIO

APP_ROOT = Path(__file__).resolve().parents[1]
if str(APP_ROOT) not in sys.path:
    sys.path.insert(0, str(APP_ROOT))

from app.db.session import SessionLocal
from app.models.perfume import Perfume

REQUIRED_HEADERS = {"slug", "image_url"}


@dataclass(frozen=True)
class ImageRow:
    slug: str
    image_url: str


@dataclass(frozen=True)
class ImportSummary:
    rows_read: int
    updated: int
    unchanged: int
    skipped_duplicates: int
    skipped_missing_slug: int
    skipped_invalid_url: int
    skipped_not_found: int
    skipped_only_empty: int


def normalize_space(value: str | None) -> str:
    return " ".join((value or "").strip().split())


def open_csv_stream(path_value: str) -> TextIO:
    if path_value == "-":
        return io.TextIOWrapper(sys.stdin.buffer, encoding="utf-8-sig", newline="")
    return Path(path_value).open("r", encoding="utf-8-sig", newline="")


def is_supported_image_url(value: str) -> bool:
    return value.startswith("/") or value.startswith("http://") or value.startswith("https://")


def parse_rows(handle: TextIO) -> list[ImageRow]:
    reader = csv.DictReader(handle)
    headers = {normalize_space(header) for header in (reader.fieldnames or []) if header}
    missing_headers = REQUIRED_HEADERS - headers
    if missing_headers:
        missing = ", ".join(sorted(missing_headers))
        raise ValueError(f"CSV missing required headers: {missing}")

    rows: list[ImageRow] = []
    for row in reader:
        slug = normalize_space(row.get("slug"))
        image_url = normalize_space(row.get("image_url"))
        rows.append(ImageRow(slug=slug, image_url=image_url))
    return rows


def import_perfume_images(csv_path: str, dry_run: bool, only_empty: bool) -> ImportSummary:
    with open_csv_stream(csv_path) as handle:
        rows = parse_rows(handle)

    session = SessionLocal()
    try:
        perfumes_by_slug = {
            perfume.slug: perfume
            for perfume in session.query(Perfume).all()
        }

        seen_slugs: set[str] = set()
        updated = 0
        unchanged = 0
        skipped_duplicates = 0
        skipped_missing_slug = 0
        skipped_invalid_url = 0
        skipped_not_found = 0
        skipped_only_empty = 0

        for row in rows:
            if not row.slug:
                skipped_missing_slug += 1
                continue

            if row.slug in seen_slugs:
                skipped_duplicates += 1
                continue
            seen_slugs.add(row.slug)

            if not row.image_url or not is_supported_image_url(row.image_url):
                skipped_invalid_url += 1
                continue

            perfume = perfumes_by_slug.get(row.slug)
            if perfume is None:
                skipped_not_found += 1
                continue

            if only_empty and normalize_space(perfume.image_url):
                skipped_only_empty += 1
                continue

            if normalize_space(perfume.image_url) == row.image_url:
                unchanged += 1
                continue

            perfume.image_url = row.image_url
            updated += 1

        if dry_run:
            session.rollback()
        else:
            session.commit()

        return ImportSummary(
            rows_read=len(rows),
            updated=updated,
            unchanged=unchanged,
            skipped_duplicates=skipped_duplicates,
            skipped_missing_slug=skipped_missing_slug,
            skipped_invalid_url=skipped_invalid_url,
            skipped_not_found=skipped_not_found,
            skipped_only_empty=skipped_only_empty,
        )
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Import perfume image URLs into the perfumes table from a CSV mapping.",
    )
    parser.add_argument(
        "--csv",
        required=True,
        help="Path to the CSV mapping file, or '-' to read from stdin.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Parse and prepare the import without writing to the database.",
    )
    parser.add_argument(
        "--only-empty",
        action="store_true",
        help="Only fill perfumes that do not already have an image_url.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    summary = import_perfume_images(
        csv_path=args.csv,
        dry_run=args.dry_run,
        only_empty=args.only_empty,
    )

    print(f"Rows read: {summary.rows_read}")
    print(f"Updated perfumes: {summary.updated}")
    print(f"Unchanged perfumes: {summary.unchanged}")
    print(f"Skipped duplicate slugs in CSV: {summary.skipped_duplicates}")
    print(f"Skipped missing slug rows: {summary.skipped_missing_slug}")
    print(f"Skipped invalid image URLs: {summary.skipped_invalid_url}")
    print(f"Skipped unknown slugs: {summary.skipped_not_found}")
    print(f"Skipped because image already existed: {summary.skipped_only_empty}")
    print(f"Dry run: {'yes' if args.dry_run else 'no'}")
    print(f"Only empty: {'yes' if args.only_empty else 'no'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
