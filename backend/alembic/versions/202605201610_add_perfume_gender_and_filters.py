"""add perfume gender field

Revision ID: 202605201610
Revises: 202603301200
Create Date: 2026-05-20 16:10:00.000000
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "202605201610"
down_revision = "202603301200"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("perfumes", sa.Column("gender", sa.String(), nullable=True))
    op.execute(
        """
        UPDATE perfumes
        SET gender = CASE
            WHEN description ILIKE '%Public: Femme.%' OR short_description ILIKE '%pour femme%' THEN 'femme'
            WHEN description ILIKE '%Public: Homme.%' OR short_description ILIKE '%pour homme%' THEN 'homme'
            WHEN description ILIKE '%Public: Mixte.%' OR short_description ILIKE '%mixte%' THEN 'unisex'
            WHEN description ILIKE '%Public: Enfant.%' OR short_description ILIKE '%pour enfant%' THEN 'enfant'
            ELSE NULL
        END
        """
    )


def downgrade() -> None:
    op.drop_column("perfumes", "gender")
