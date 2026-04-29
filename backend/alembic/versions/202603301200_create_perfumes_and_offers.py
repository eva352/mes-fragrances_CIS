"""Create perfumes and perfume_offers tables

Revision ID: 202603301200
Revises: 202602071300
Create Date: 2026-03-30 12:00:00.000000

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "202603301200"
down_revision = "202602071300"
branch_labels = None
depends_on = None


PERFUMES = [
    {
        "id": "8be35f27-2fbb-4704-a0e7-2cb01f094001",
        "slug": "chanel-chance-eau-tendre",
        "name": "Chance Eau Tendre",
        "brand": "Chanel",
        "image_url": None,
        "short_description": "Une signature fruitée florale, lumineuse et délicate pour tous les jours.",
        "description": "Chance Eau Tendre mêle la fraîcheur du pamplemousse, un cœur fleuri élégant et un fond doux. C'est un parfum facile à porter, féminin et raffiné, pensé pour une sensation lumineuse du matin au soir.",
        "olfactive_family": "Floral fruité",
        "budget_tier": "premium",
        "top_notes": ["Pamplemousse", "Coing"],
        "heart_notes": ["Jasmin", "Jacinthe"],
        "base_notes": ["Musc blanc", "Cèdre", "Iris"],
        "quiz_tags": ["floral", "fruity", "fresh", "soft", "day", "spring", "romantic", "elegant", "budget-premium", "signature"],
        "is_new_arrival": True,
        "is_best_seller": True,
        "is_published": True,
    },
    {
        "id": "8be35f27-2fbb-4704-a0e7-2cb01f094002",
        "slug": "ysl-libre",
        "name": "Libre",
        "brand": "Yves Saint Laurent",
        "image_url": None,
        "short_description": "Un floral ambré affirmé, moderne et solaire, pour un style confiant.",
        "description": "Libre associe la lavande, la fleur d'oranger et une base chaleureuse. Le rendu est affirmé, féminin et moderne, avec une vraie présence sans perdre en élégance.",
        "olfactive_family": "Floral ambré",
        "budget_tier": "premium",
        "top_notes": ["Lavande", "Mandarine", "Cassis"],
        "heart_notes": ["Fleur d'oranger", "Jasmin"],
        "base_notes": ["Vanille", "Ambre gris", "Musc"],
        "quiz_tags": ["floral", "amber", "bold", "evening", "confident", "warm", "budget-premium", "special", "winter", "signature"],
        "is_new_arrival": False,
        "is_best_seller": True,
        "is_published": True,
    },
    {
        "id": "8be35f27-2fbb-4704-a0e7-2cb01f094003",
        "slug": "lancome-la-vie-est-belle",
        "name": "La Vie Est Belle",
        "brand": "Lancôme",
        "image_url": None,
        "short_description": "Un floral gourmand généreux, doux et enveloppant, parfait pour une touche réconfortante.",
        "description": "La Vie Est Belle joue sur l'iris, le jasmin et une gourmandise vanillée. Le résultat est chaleureux, féminin et très reconnaissable, idéal pour celles qui aiment les sillages doux mais présents.",
        "olfactive_family": "Floral gourmand",
        "budget_tier": "medium",
        "top_notes": ["Poire", "Cassis"],
        "heart_notes": ["Iris", "Jasmin", "Fleur d'oranger"],
        "base_notes": ["Praline", "Vanille", "Patchouli"],
        "quiz_tags": ["gourmand", "sweet", "warm", "romantic", "soft", "evening", "autumn", "winter", "budget-medium", "special"],
        "is_new_arrival": False,
        "is_best_seller": True,
        "is_published": True,
    },
    {
        "id": "8be35f27-2fbb-4704-a0e7-2cb01f094004",
        "slug": "narciso-rodriguez-for-her",
        "name": "For Her",
        "brand": "Narciso Rodriguez",
        "image_url": None,
        "short_description": "Un floral musqué chic, intime et très élégant, avec une vraie signature.",
        "description": "For Her repose sur un musc soyeux, des fleurs délicates et un fond boisé ambré. Le parfum reste raffiné, enveloppant et très féminin, avec une élégance discrète mais marquante.",
        "olfactive_family": "Floral musqué",
        "budget_tier": "premium",
        "top_notes": ["Rose", "Pêche"],
        "heart_notes": ["Musc", "Fleur d'oranger"],
        "base_notes": ["Ambre", "Patchouli", "Bois doux"],
        "quiz_tags": ["musky", "powdery", "elegant", "minimal", "day", "evening", "budget-premium", "signature", "autumn", "winter"],
        "is_new_arrival": True,
        "is_best_seller": False,
        "is_published": True,
    },
    {
        "id": "8be35f27-2fbb-4704-a0e7-2cb01f094005",
        "slug": "guerlain-mon-guerlain",
        "name": "Mon Guerlain",
        "brand": "Guerlain",
        "image_url": None,
        "short_description": "Une lavande vanillée raffinée, chaleureuse et très enveloppante.",
        "description": "Mon Guerlain associe lavande, jasmin sambac et vanille dans un sillage chic et réconfortant. C'est un parfum moderne mais doux, idéal pour une impression cocooning et sophistiquée.",
        "olfactive_family": "Aromatique ambré",
        "budget_tier": "premium",
        "top_notes": ["Lavande", "Bergamote"],
        "heart_notes": ["Jasmin sambac", "Iris"],
        "base_notes": ["Vanille", "Santal", "Coumarine"],
        "quiz_tags": ["amber", "warm", "cocoon", "soft", "elegant", "winter", "autumn", "budget-premium", "signature", "special"],
        "is_new_arrival": False,
        "is_best_seller": False,
        "is_published": True,
    },
    {
        "id": "8be35f27-2fbb-4704-a0e7-2cb01f094006",
        "slug": "zara-nude-bouquet",
        "name": "Nude Bouquet",
        "brand": "Zara",
        "image_url": None,
        "short_description": "Un floral fruité accessible, doux et lumineux, très simple à adopter.",
        "description": "Nude Bouquet propose une lecture fraîche et facile du floral fruité. Son rendu léger et propre convient bien aux petits budgets qui cherchent une option féminine et agréable au quotidien.",
        "olfactive_family": "Floral fruité",
        "budget_tier": "accessible",
        "top_notes": ["Cerise", "Bergamote"],
        "heart_notes": ["Pivoine", "Rose"],
        "base_notes": ["Musc blanc", "Vanille douce"],
        "quiz_tags": ["floral", "fruity", "fresh", "day", "spring", "summer", "soft", "budget-accessible", "everyday", "romantic"],
        "is_new_arrival": True,
        "is_best_seller": False,
        "is_published": True,
    },
]

OFFERS = [
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095001", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094001", "merchant_name": "Sephora", "price": 116.00, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/sephora/chance-eau-tendre", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095002", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094001", "merchant_name": "Marionnaud", "price": 112.90, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/marionnaud/chance-eau-tendre", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095003", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094002", "merchant_name": "Sephora", "price": 104.00, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/sephora/libre", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095004", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094002", "merchant_name": "Nocibé", "price": 99.90, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/nocibe/libre", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095005", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094003", "merchant_name": "Notino", "price": 79.90, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/notino/la-vie-est-belle", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095006", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094003", "merchant_name": "Sephora", "price": 84.50, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/sephora/la-vie-est-belle", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095007", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094004", "merchant_name": "Marionnaud", "price": 92.00, "currency": "EUR", "availability": "Stock limité", "affiliate_url": "https://example.com/partners/marionnaud/for-her", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095008", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094004", "merchant_name": "Nocibé", "price": 95.50, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/nocibe/for-her", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095009", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094005", "merchant_name": "Sephora", "price": 97.00, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/sephora/mon-guerlain", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095010", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094005", "merchant_name": "Notino", "price": 89.90, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/notino/mon-guerlain", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095011", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094006", "merchant_name": "Zara", "price": 22.95, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/zara/nude-bouquet", "is_active": True},
    {"id": "8be35f27-2fbb-4704-a0e7-2cb01f095012", "perfume_id": "8be35f27-2fbb-4704-a0e7-2cb01f094006", "merchant_name": "Zalando Beauty", "price": 24.90, "currency": "EUR", "availability": "En stock", "affiliate_url": "https://example.com/partners/zalando/nude-bouquet", "is_active": True},
]


def upgrade() -> None:
    op.create_table(
        "perfumes",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("slug", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("brand", sa.String(), nullable=False),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("short_description", sa.Text(), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("olfactive_family", sa.String(), nullable=True),
        sa.Column("budget_tier", sa.String(), nullable=True),
        sa.Column("top_notes", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default=sa.text("'[]'::jsonb")),
        sa.Column("heart_notes", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default=sa.text("'[]'::jsonb")),
        sa.Column("base_notes", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default=sa.text("'[]'::jsonb")),
        sa.Column("quiz_tags", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default=sa.text("'[]'::jsonb")),
        sa.Column("is_new_arrival", sa.Boolean(), nullable=False, server_default=sa.text("FALSE")),
        sa.Column("is_best_seller", sa.Boolean(), nullable=False, server_default=sa.text("FALSE")),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default=sa.text("TRUE")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("NOW()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("NOW()")),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_perfumes_slug", "perfumes", ["slug"], unique=True)

    op.create_table(
        "perfume_offers",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("perfume_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("merchant_name", sa.String(), nullable=False),
        sa.Column("price", sa.Numeric(10, 2), nullable=False),
        sa.Column("currency", sa.String(), nullable=False, server_default="EUR"),
        sa.Column("availability", sa.String(), nullable=True),
        sa.Column("affiliate_url", sa.Text(), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("TRUE")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("NOW()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("NOW()")),
        sa.ForeignKeyConstraint(["perfume_id"], ["perfumes.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_perfume_offers_perfume_id", "perfume_offers", ["perfume_id"], unique=False)

    perfumes_table = sa.table(
        "perfumes",
        sa.column("id", postgresql.UUID(as_uuid=True)),
        sa.column("slug", sa.String()),
        sa.column("name", sa.String()),
        sa.column("brand", sa.String()),
        sa.column("image_url", sa.String()),
        sa.column("short_description", sa.Text()),
        sa.column("description", sa.Text()),
        sa.column("olfactive_family", sa.String()),
        sa.column("budget_tier", sa.String()),
        sa.column("top_notes", postgresql.JSONB(astext_type=sa.Text())),
        sa.column("heart_notes", postgresql.JSONB(astext_type=sa.Text())),
        sa.column("base_notes", postgresql.JSONB(astext_type=sa.Text())),
        sa.column("quiz_tags", postgresql.JSONB(astext_type=sa.Text())),
        sa.column("is_new_arrival", sa.Boolean()),
        sa.column("is_best_seller", sa.Boolean()),
        sa.column("is_published", sa.Boolean()),
    )
    offers_table = sa.table(
        "perfume_offers",
        sa.column("id", postgresql.UUID(as_uuid=True)),
        sa.column("perfume_id", postgresql.UUID(as_uuid=True)),
        sa.column("merchant_name", sa.String()),
        sa.column("price", sa.Numeric(10, 2)),
        sa.column("currency", sa.String()),
        sa.column("availability", sa.String()),
        sa.column("affiliate_url", sa.Text()),
        sa.column("is_active", sa.Boolean()),
    )

    op.bulk_insert(perfumes_table, PERFUMES)
    op.bulk_insert(offers_table, OFFERS)


def downgrade() -> None:
    op.drop_index("ix_perfume_offers_perfume_id", table_name="perfume_offers")
    op.drop_table("perfume_offers")
    op.drop_index("ix_perfumes_slug", table_name="perfumes")
    op.drop_table("perfumes")
