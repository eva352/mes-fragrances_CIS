from __future__ import annotations

import importlib
import inspect
import os
import sys
import unittest
import uuid
from pathlib import Path
from types import SimpleNamespace


def _load_perfumes_module():
    backend_root = Path(__file__).resolve().parents[1]
    if str(backend_root) not in sys.path:
        sys.path.insert(0, str(backend_root))

    os.environ.setdefault(
        "PILOT_DATABASE_URL",
        "postgresql+psycopg://pilot:change_me_but_long_enough_for_tests@localhost:5432/pilot",
    )
    os.environ.setdefault("PILOT_JWT_SECRET_KEY", "x" * 40)
    return importlib.import_module("app.api.v1.perfumes")


perfumes = _load_perfumes_module()


class AffiliateOfferDisplayTests(unittest.TestCase):
    def test_group_offers_sorts_by_stock_then_total_price_then_priority_then_name(self):
        perfume_id = uuid.uuid4()
        rows = [
            (
                SimpleNamespace(id=3, perfume_id=perfume_id, in_stock=False, total_price=40, price=40),
                SimpleNamespace(name="Zeta", priority=100),
            ),
            (
                SimpleNamespace(id=2, perfume_id=perfume_id, in_stock=True, total_price=72, price=72),
                SimpleNamespace(name="Beta", priority=90),
            ),
            (
                SimpleNamespace(id=1, perfume_id=perfume_id, in_stock=True, total_price=72, price=72),
                SimpleNamespace(name="Alpha", priority=80),
            ),
        ]

        grouped = perfumes._group_offers(rows)

        self.assertEqual(
            [row[1].name for row in grouped[perfume_id]],
            ["Alpha", "Beta", "Zeta"],
        )

    def test_build_offer_exposes_safe_public_fields_only(self):
        offer = SimpleNamespace(
            id=42,
            title="La Vie Est Belle Eau de Parfum 50 ml",
            price=79.9,
            currency="EUR",
            delivery_cost=0,
            total_price=79.9,
            affiliate_url="https://awin.example/offer",
            merchant_url="https://merchant.example/product",
            image_url="https://merchant.example/image.jpg",
            in_stock=True,
            stock_status="En stock",
            last_seen_at=None,
            last_price_change_at=None,
            raw_payload={"internal": "hidden"},
            metadata={"debug": "hidden"},
        )
        advertiser = SimpleNamespace(name="Boutique A")

        dto = perfumes._build_offer(offer, advertiser)
        payload = dto.model_dump(by_alias=True)

        self.assertEqual(payload["advertiserName"], "Boutique A")
        self.assertEqual(payload["title"], "La Vie Est Belle Eau de Parfum 50 ml")
        self.assertEqual(payload["affiliateUrl"], "https://awin.example/offer")
        self.assertNotIn("raw_payload", payload)
        self.assertNotIn("metadata", payload)
        self.assertNotIn("rawPayload", payload)

    def test_build_card_uses_affiliate_total_price_for_lowest_price(self):
        perfume = SimpleNamespace(
            slug="la-vie-est-belle",
            name="La Vie Est Belle",
            brand="Lancôme",
            image_url=None,
            short_description=None,
            olfactive_family="Floral",
            budget_tier="premium",
            is_new_arrival=False,
            is_best_seller=True,
        )
        grouped = perfumes._group_offers([
            (
                SimpleNamespace(id=1, perfume_id="p", in_stock=True, total_price=84.9, price=79.9, currency="EUR"),
                SimpleNamespace(name="Boutique A", priority=100),
            ),
            (
                SimpleNamespace(id=2, perfume_id="p", in_stock=True, total_price=81.9, price=81.9, currency="EUR"),
                SimpleNamespace(name="Boutique B", priority=100),
            ),
        ])["p"]

        card = perfumes._build_card(perfume, grouped)

        self.assertEqual(card.lowest_price, 81.9)
        self.assertEqual(card.currency, "EUR")

    def test_offer_loading_logic_is_perfume_based_and_not_comas_specific(self):
        source = inspect.getsource(perfumes._load_offers_map)

        self.assertIn("AffiliateOffer.perfume_id", source)
        self.assertIn("Advertiser.active", source)
        self.assertNotIn("product_id", source)
        self.assertNotIn("105475", source)
        self.assertNotIn("97867", source)


if __name__ == "__main__":
    unittest.main()
