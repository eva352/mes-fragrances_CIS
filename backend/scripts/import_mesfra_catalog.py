from __future__ import annotations

import argparse
import csv
import io
import sys
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import TextIO

APP_ROOT = Path(__file__).resolve().parents[1]
if str(APP_ROOT) not in sys.path:
    sys.path.insert(0, str(APP_ROOT))

from app.db.session import SessionLocal
from app.models.perfume import Perfume

BRAND_HEADER = ["id", "marque", "nb_parfums", "notoriete"]
PERFUME_HEADER = [
    "id",
    "marque_id",
    "nom",
    "temperature",
    "intensite",
    "note_de_tete",
    "note_de_coeur",
    "note_de_fond",
    "famille",
    "sous_famille",
    "genre",
    "personalite",
    "concentration",
    "format",
    "prix",
    "url_image",
    "url_affiliation_1",
    "url_affiliation_2",
    "url_affiliation_3",
]


@dataclass(frozen=True)
class SourceBrand:
    source_id: int
    name: str
    perfume_count: int | None
    notoriety: float | None


@dataclass(frozen=True)
class SourcePerfume:
    source_id: int
    brand_id: int
    name: str
    top_field: str
    heart_field: str
    base_field: str
    family: str
    sub_family: str
    gender: str
    concentration: str
    bottle_format: str
    price: float | None


@dataclass(frozen=True)
class ImportSummary:
    source_brands: int
    source_perfumes: int
    inserted_perfumes: int
    skipped_existing: int
    skipped_duplicate_source: int
    skipped_missing_brand: int


def normalize_space(value: str | None) -> str:
    return " ".join((value or "").strip().split())


def ascii_fold(value: str | None) -> str:
    text = unicodedata.normalize("NFKD", normalize_space(value))
    return text.encode("ascii", "ignore").decode("ascii").lower()


def slugify(value: str) -> str:
    folded = ascii_fold(value)
    chars: list[str] = []
    previous_dash = False
    for char in folded:
        if char.isalnum():
            chars.append(char)
            previous_dash = False
            continue
        if not previous_dash:
            chars.append("-")
            previous_dash = True
    return "".join(chars).strip("-")


def parse_float(value: str | None) -> float | None:
    text = normalize_space(value).replace(",", ".")
    if not text:
        return None
    try:
        return float(text)
    except ValueError:
        return None


def parse_int(value: str | None) -> int | None:
    text = normalize_space(value)
    if not text:
        return None
    try:
        return int(text)
    except ValueError:
        return None


def open_csv_stream(path_value: str) -> TextIO:
    if path_value == "-":
        return io.TextIOWrapper(sys.stdin.buffer, encoding="utf-8-sig", newline="")
    return Path(path_value).open("r", encoding="utf-8-sig", newline="")


def parse_source(handle: TextIO) -> tuple[dict[int, SourceBrand], list[SourcePerfume]]:
    brands: dict[int, SourceBrand] = {}
    perfumes: list[SourcePerfume] = []
    section: str | None = None

    for row in csv.reader(handle):
        if not row:
            continue

        normalized = [normalize_space(cell) for cell in row]
        if normalized == BRAND_HEADER:
            section = "brands"
            continue
        if normalized == PERFUME_HEADER:
            section = "perfumes"
            continue
        if normalized[0] == "id":
            section = None
            continue

        if section == "brands":
            if len(normalized) < 4 or not normalized[0].isdigit():
                continue
            source_id = int(normalized[0])
            brands[source_id] = SourceBrand(
                source_id=source_id,
                name=normalized[1],
                perfume_count=parse_int(normalized[2]),
                notoriety=parse_float(normalized[3]),
            )
            continue

        if section == "perfumes":
            if len(normalized) < 19 or not normalized[0].isdigit() or not normalized[1].isdigit():
                continue
            perfumes.append(
                SourcePerfume(
                    source_id=int(normalized[0]),
                    brand_id=int(normalized[1]),
                    name=normalized[2],
                    top_field=normalized[5],
                    heart_field=normalized[6],
                    base_field=normalized[7],
                    family=normalized[8],
                    sub_family=normalized[9],
                    gender=normalized[10],
                    concentration=normalized[12],
                    bottle_format=normalized[13],
                    price=parse_float(normalized[14]),
                )
            )

    return brands, perfumes


def split_notes(value: str) -> list[str]:
    text = normalize_space(value)
    if not text:
        return []

    candidates = text.replace(" / ", ",").replace(";", ",").split(",")
    notes: list[str] = []
    for candidate in candidates:
        note = normalize_space(candidate)
        if note and note not in notes:
            notes.append(note)
    return notes


def pick_olfactive_family(source: SourcePerfume) -> str | None:
    for value in (source.family, source.sub_family, source.top_field):
        text = normalize_space(value)
        if text:
            return text
    return None


def infer_budget_tier(price: float | None) -> str | None:
    if price is None or price <= 0:
        return None
    if price < 45:
        return "accessible"
    if price < 90:
        return "medium"
    return "premium"


def infer_quiz_tags(source: SourcePerfume, olfactive_family: str | None) -> list[str]:
    tags: set[str] = set()
    family_text = ascii_fold(olfactive_family)
    concentration_text = ascii_fold(source.concentration)

    if "floral" in family_text:
        tags.update({"floral", "elegant"})
    if "fruit" in family_text:
        tags.update({"fruity", "fresh", "spring", "day"})
    if "gourmand" in family_text:
        tags.update({"gourmand", "sweet", "warm"})
    if "musq" in family_text:
        tags.update({"musky", "powdery", "soft"})
    if "ambre" in family_text or "oriental" in family_text:
        tags.update({"amber", "warm", "evening", "special"})
    if "boise" in family_text or "woody" in family_text:
        tags.update({"woody", "elegant", "signature"})
    if "aromatique" in family_text or "aromatic" in family_text:
        tags.update({"fresh", "balanced", "day"})
    if "chypr" in family_text:
        tags.update({"classic", "elegant", "signature"})
    if "epice" in family_text or "spice" in family_text:
        tags.update({"bold", "warm"})
    if "aquatique" in family_text or "marine" in family_text or "hesperide" in family_text:
        tags.update({"fresh", "summer", "airy", "day"})

    if "brume" in concentration_text or "cologne" in concentration_text or "fraiche" in concentration_text:
        tags.update({"soft", "airy", "everyday", "day"})
    elif "intense" in concentration_text:
        tags.update({"bold", "evening", "special"})
    elif "eau de toilette" in concentration_text:
        tags.update({"balanced", "everyday", "day"})
    elif "eau de parfum" in concentration_text:
        tags.update({"signature", "elegant"})

    if not tags:
        tags.add("signature")

    return sorted(tags)


def build_short_description(source: SourcePerfume, olfactive_family: str | None) -> str:
    audience = {
        "Femme": "pour femme",
        "Homme": "pour homme",
        "Mixte": "mixte",
        "Enfant": "pour enfant",
    }.get(source.gender, "")

    lead = "Un parfum"
    if audience:
        lead = f"{lead} {audience}"

    details: list[str] = []
    if olfactive_family:
        details.append(f"au profil {olfactive_family.lower()}")
    if source.concentration:
        details.append(f"en {source.concentration.lower()}")

    if details:
        return f"{lead} {' '.join(details)}."
    return f"{lead} a decouvrir sur Mes Fragrances."


def build_description(brand: SourceBrand, source: SourcePerfume, olfactive_family: str | None) -> str:
    parts = [f"{source.name} de {brand.name} rejoint le catalogue Mes Fragrances."]
    if olfactive_family:
        parts.append(f"Famille olfactive: {olfactive_family}.")
    if source.gender:
        parts.append(f"Public: {source.gender}.")
    if source.concentration:
        parts.append(f"Concentration: {source.concentration}.")
    if source.bottle_format:
        parts.append(f"Format reference: {source.bottle_format}.")
    if source.price and source.price > 0:
        parts.append(f"Prix source: {source.price:.2f} EUR.")
    return " ".join(parts)


def build_perfume_model(brand: SourceBrand, source: SourcePerfume) -> Perfume:
    olfactive_family = pick_olfactive_family(source)
    slug = slugify(f"{brand.name}-{source.name}")

    has_structured_notes = bool(source.heart_field or source.base_field)
    top_notes = split_notes(source.top_field) if has_structured_notes else []
    heart_notes = split_notes(source.heart_field)
    base_notes = split_notes(source.base_field)

    return Perfume(
        slug=slug,
        name=source.name,
        brand=brand.name,
        image_url=None,
        short_description=build_short_description(source, olfactive_family),
        description=build_description(brand, source, olfactive_family),
        olfactive_family=olfactive_family,
        budget_tier=infer_budget_tier(source.price),
        top_notes=top_notes,
        heart_notes=heart_notes,
        base_notes=base_notes,
        quiz_tags=infer_quiz_tags(source, olfactive_family),
        is_new_arrival=False,
        is_best_seller=False,
        is_published=True,
    )


def import_catalog(csv_path: str, dry_run: bool) -> ImportSummary:
    with open_csv_stream(csv_path) as handle:
        brands, source_perfumes = parse_source(handle)

    session = SessionLocal()
    try:
        existing_slugs = {slug for (slug,) in session.query(Perfume.slug).all()}
        seen_source_slugs: set[str] = set()
        rows_to_insert: list[Perfume] = []
        skipped_existing = 0
        skipped_duplicate_source = 0
        skipped_missing_brand = 0

        for source in source_perfumes:
            brand = brands.get(source.brand_id)
            if brand is None:
                skipped_missing_brand += 1
                continue

            slug = slugify(f"{brand.name}-{source.name}")
            if not slug or slug in seen_source_slugs:
                skipped_duplicate_source += 1
                continue
            seen_source_slugs.add(slug)

            if slug in existing_slugs:
                skipped_existing += 1
                continue

            rows_to_insert.append(build_perfume_model(brand, source))

        if not dry_run and rows_to_insert:
            session.add_all(rows_to_insert)
            session.commit()

        return ImportSummary(
            source_brands=len(brands),
            source_perfumes=len(source_perfumes),
            inserted_perfumes=len(rows_to_insert),
            skipped_existing=skipped_existing,
            skipped_duplicate_source=skipped_duplicate_source,
            skipped_missing_brand=skipped_missing_brand,
        )
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Import the Mes Fragrances CSV catalog into the Postgres perfumes table.",
    )
    parser.add_argument(
        "--csv",
        required=True,
        help="Path to the CSV export file, or '-' to read from stdin.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Parse and prepare the import without writing to the database.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    summary = import_catalog(csv_path=args.csv, dry_run=args.dry_run)

    print(f"Source brands: {summary.source_brands}")
    print(f"Source perfumes: {summary.source_perfumes}")
    print(f"Inserted perfumes: {summary.inserted_perfumes}")
    print(f"Skipped existing perfumes: {summary.skipped_existing}")
    print(f"Skipped duplicate source rows: {summary.skipped_duplicate_source}")
    print(f"Skipped missing brands: {summary.skipped_missing_brand}")
    print(f"Dry run: {'yes' if args.dry_run else 'no'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

