from __future__ import annotations

import importlib
import inspect
import os
import sys
import unittest
import uuid
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch


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
                SimpleNamespace(
                    id=1,
                    perfume_id="p",
                    in_stock=True,
                    total_price=84.9,
                    price=79.9,
                    currency="EUR",
                    title="Offer A",
                    delivery_cost=5.0,
                    affiliate_url="https://awin.example/a",
                    merchant_url="https://merchant.example/a",
                    image_url="https://merchant.example/a.jpg",
                    stock_status="En stock",
                    last_seen_at=None,
                    last_price_change_at=None,
                ),
                SimpleNamespace(name="Boutique A", priority=100),
            ),
            (
                SimpleNamespace(
                    id=2,
                    perfume_id="p",
                    in_stock=True,
                    total_price=81.9,
                    price=81.9,
                    currency="EUR",
                    title="Offer B",
                    delivery_cost=0.0,
                    affiliate_url="https://awin.example/b",
                    merchant_url="https://merchant.example/b",
                    image_url="https://merchant.example/b.jpg",
                    stock_status="En stock",
                    last_seen_at=None,
                    last_price_change_at=None,
                ),
                SimpleNamespace(name="Boutique B", priority=100),
            ),
        ])["p"]

        card = perfumes._build_card(perfume, grouped)

        self.assertEqual(card.lowest_price, 81.9)
        self.assertEqual(card.currency, "EUR")
        self.assertEqual(card.offer_count, 2)
        self.assertIsNotNone(card.best_offer)
        self.assertEqual(card.best_offer.advertiser_name, "Boutique B")
        self.assertEqual(card.best_offer.total_price, 81.9)

    def test_offer_loading_logic_is_perfume_based_and_not_comas_specific(self):
        source = inspect.getsource(perfumes._load_offers_map)

        self.assertIn("AffiliateOffer.perfume_id", source)
        self.assertIn("Advertiser.active", source)
        self.assertIn("AffiliateOffer.affiliate_url", source)
        self.assertNotIn("perfume_offers", source)
        self.assertNotIn("product_id", source)
        self.assertNotIn("105475", source)
        self.assertNotIn("97867", source)

    def test_search_cards_with_offers_only_filters_out_perfumes_without_offers(self):
        with_offer = SimpleNamespace(
            id="with-offer",
            slug="with-offer",
            name="With Offer",
            brand="Brand A",
            image_url=None,
            short_description="",
            olfactive_family=None,
            budget_tier=None,
            is_new_arrival=False,
            is_best_seller=False,
            top_notes=[],
            heart_notes=[],
            base_notes=[],
            gender=None,
            source_price=None,
        )
        without_offer = SimpleNamespace(
            id="without-offer",
            slug="without-offer",
            name="Without Offer",
            brand="Brand B",
            image_url=None,
            short_description="",
            olfactive_family=None,
            budget_tier=None,
            is_new_arrival=False,
            is_best_seller=False,
            top_notes=[],
            heart_notes=[],
            base_notes=[],
            gender=None,
            source_price=None,
        )

        def fake_candidate_perfumes(_db, with_offers_only=False):
            return [with_offer] if with_offers_only else [with_offer, without_offer]

        def fake_load_offers_map(_db, perfume_ids):
            offers = {}
            if with_offer.id in perfume_ids:
                offers[with_offer.id] = [
                    (
                        SimpleNamespace(
                            id=10,
                            perfume_id=with_offer.id,
                            in_stock=True,
                            total_price=49.9,
                            price=49.9,
                            currency="EUR",
                            title="Offer",
                            delivery_cost=None,
                            affiliate_url="https://awin.example/offer",
                            merchant_url="https://merchant.example/offer",
                            image_url=None,
                            stock_status=None,
                            last_seen_at=None,
                            last_price_change_at=None,
                        ),
                        SimpleNamespace(name="Retailer", priority=100),
                    )
                ]
            return offers

        with (
            patch.object(perfumes, "_candidate_perfumes", side_effect=fake_candidate_perfumes),
            patch.object(perfumes, "_load_offers_map", side_effect=fake_load_offers_map),
        ):
            unfiltered = perfumes._search_cards(db=None, query="", limit=10, with_offers_only=False)
            filtered = perfumes._search_cards(db=None, query="", limit=10, with_offers_only=True)

        self.assertEqual([item.slug for item in unfiltered], ["with-offer", "without-offer"])
        self.assertEqual([item.slug for item in filtered], ["with-offer"])
        self.assertEqual(filtered[0].offer_count, 1)

    def test_search_cards_filters_by_brand(self):
        lancome = SimpleNamespace(
            id="lancome",
            slug="la-vie-est-belle",
            name="La Vie Est Belle",
            brand="Lancôme",
            image_url=None,
            short_description="",
            olfactive_family="Floral",
            budget_tier=None,
            is_new_arrival=False,
            is_best_seller=False,
            top_notes=[],
            heart_notes=[],
            base_notes=[],
            gender="femme",
            source_price=79.9,
        )
        dior = SimpleNamespace(
            id="dior",
            slug="jadore",
            name="J'adore",
            brand="Dior",
            image_url=None,
            short_description="",
            olfactive_family="Floral",
            budget_tier=None,
            is_new_arrival=False,
            is_best_seller=False,
            top_notes=[],
            heart_notes=[],
            base_notes=[],
            gender="femme",
            source_price=89.9,
        )

        with (
            patch.object(perfumes, "_candidate_perfumes", return_value=[lancome, dior]),
            patch.object(perfumes, "_load_offers_map", return_value={}),
        ):
            filtered = perfumes._search_cards(db=None, query="", limit=10, brands=["LANCÔME"])

        self.assertEqual([item.slug for item in filtered], ["la-vie-est-belle"])

    def test_search_cards_offset_loads_offers_only_for_visible_page(self):
        perfumes_page = [
            SimpleNamespace(
                id="one",
                slug="one",
                name="One",
                brand="Brand A",
                image_url=None,
                short_description="",
                olfactive_family=None,
                budget_tier=None,
                is_new_arrival=False,
                is_best_seller=False,
                top_notes=[],
                heart_notes=[],
                base_notes=[],
                gender=None,
                source_price=None,
            ),
            SimpleNamespace(
                id="two",
                slug="two",
                name="Two",
                brand="Brand B",
                image_url=None,
                short_description="",
                olfactive_family=None,
                budget_tier=None,
                is_new_arrival=False,
                is_best_seller=False,
                top_notes=[],
                heart_notes=[],
                base_notes=[],
                gender=None,
                source_price=None,
            ),
            SimpleNamespace(
                id="three",
                slug="three",
                name="Three",
                brand="Brand C",
                image_url=None,
                short_description="",
                olfactive_family=None,
                budget_tier=None,
                is_new_arrival=False,
                is_best_seller=False,
                top_notes=[],
                heart_notes=[],
                base_notes=[],
                gender=None,
                source_price=None,
            ),
        ]
        loaded_ids: list[list[str]] = []

        def fake_load_offers_map(_db, perfume_ids):
            loaded_ids.append(list(perfume_ids))
            return {}

        with (
            patch.object(perfumes, "_candidate_perfumes", return_value=perfumes_page),
            patch.object(perfumes, "_load_offers_map", side_effect=fake_load_offers_map),
        ):
            results = perfumes._search_cards(db=None, query="", limit=2, offset=1)

        self.assertEqual([item.slug for item in results], ["two", "three"])
        self.assertEqual(loaded_ids, [["two", "three"]])

    def test_candidate_perfumes_filter_is_offer_based_and_not_comas_specific(self):
        source = inspect.getsource(perfumes._candidate_perfumes)

        self.assertIn("AffiliateOffer.perfume_id", source)
        self.assertIn("Advertiser.active", source)
        self.assertIn("AffiliateOffer.affiliate_url", source)
        self.assertNotIn("perfume_offers", source)
        self.assertNotIn("105475", source)
        self.assertNotIn("97867", source)


if __name__ == "__main__":
    unittest.main()
