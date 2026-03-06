"""Create site_pages table

Revision ID: 202601080900
Revises: 202511141435
Create Date: 2026-01-08 09:00:00.000000

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import uuid


revision = "202601080900"
down_revision = "202511141435"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "site_pages",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("slug", sa.String(), nullable=False, unique=True),
        sa.Column("title", sa.String(), nullable=False, server_default=sa.text("'Page'")),
        sa.Column(
            "blocks",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'[]'::jsonb"),
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_site_pages_slug", "site_pages", ["slug"], unique=True)

    connection = op.get_bind()
    connection.execute(
        sa.text(
            """
            INSERT INTO site_pages (id, slug, title, blocks, created_at, updated_at)
            VALUES (:id, :slug, :title, '[]'::jsonb, NOW(), NOW())
            """
        ),
        {"id": str(uuid.uuid4()), "slug": "landing", "title": "Landing"},
    )


def downgrade() -> None:
    op.drop_index("ix_site_pages_slug", table_name="site_pages")
    op.drop_table("site_pages")
