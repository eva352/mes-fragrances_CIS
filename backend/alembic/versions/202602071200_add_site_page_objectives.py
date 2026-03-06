"""Add objective fields to site_pages

Revision ID: 202602071200
Revises: 202602040900
Create Date: 2026-02-07 12:00:00.000000

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "202602071200"
down_revision = "202602040900"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("site_pages", sa.Column("objective", sa.Text(), nullable=True))
    op.add_column("site_pages", sa.Column("expected_action", sa.Text(), nullable=True))
    op.add_column(
        "site_pages",
        sa.Column(
            "key_messages",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'[]'::jsonb"),
        ),
    )
    op.add_column("site_pages", sa.Column("facts", sa.Text(), nullable=True))

    # Remove server default (keep app-level default)
    op.alter_column("site_pages", "key_messages", server_default=None)


def downgrade() -> None:
    op.drop_column("site_pages", "facts")
    op.drop_column("site_pages", "key_messages")
    op.drop_column("site_pages", "expected_action")
    op.drop_column("site_pages", "objective")

