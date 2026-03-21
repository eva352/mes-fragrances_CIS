from __future__ import annotations

import csv
from pathlib import Path


DATA_DIR = Path(__file__).parent / "data"


def list_product_types() -> list[str]:
    """
    Returns the canonical Max UI website "Product Type" taxonomy used in products.csv.
    This list is used to align Pilot brief inputs with Max UI reasoning/pattern selection.
    """
    path = DATA_DIR / "products.csv"
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8", newline="") as f:
        rows = csv.DictReader(f)
        values: set[str] = set()
        for r in rows:
            v = str(r.get("Product Type") or "").strip()
            if v:
                values.add(v)
    return sorted(values)

