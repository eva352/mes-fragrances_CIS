"""add perfume source price

Revision ID: 202605201650
Revises: 202605201610
Create Date: 2026-05-20 16:50:00.000000
"""

from alembic import op
import sqlalchemy as sa


revision = "202605201650"
down_revision = "202605201610"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("perfumes", sa.Column("source_price", sa.Numeric(10, 2), nullable=True))
    op.execute(
        """
        UPDATE perfumes
        SET source_price = ((regexp_match(description, 'Prix source: ([0-9]+(?:\\.[0-9]+)?) EUR'))[1])::numeric
        WHERE description ~ 'Prix source: [0-9]+(?:\\.[0-9]+)? EUR'
        """
    )


def downgrade() -> None:
    op.drop_column("perfumes", "source_price")
