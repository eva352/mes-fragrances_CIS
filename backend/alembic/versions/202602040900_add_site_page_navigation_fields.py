"""Add navigation fields to site_pages

Revision ID: 202602040900
Revises: 202601091330
Create Date: 2026-02-04 09:00:00.000000

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "202602040900"
down_revision = "202601091330"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "site_pages",
        sa.Column("parent_id", postgresql.UUID(as_uuid=True), nullable=True),
    )
    op.add_column(
        "site_pages",
        sa.Column(
            "status",
            sa.String(),
            nullable=False,
            server_default=sa.text("'published'"),
        ),
    )
    op.add_column(
        "site_pages",
        sa.Column(
            "show_in_nav",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("true"),
        ),
    )
    op.add_column(
        "site_pages",
        sa.Column(
            "nav_order",
            sa.Integer(),
            nullable=False,
            server_default=sa.text("0"),
        ),
    )
    op.add_column(
        "site_pages",
        sa.Column(
            "is_home",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
    )

    op.create_foreign_key(
        "fk_site_pages_parent_id",
        "site_pages",
        "site_pages",
        ["parent_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index("ix_site_pages_parent_id", "site_pages", ["parent_id"])

    connection = op.get_bind()
    connection.execute(
        sa.text(
            """
            UPDATE site_pages
            SET status = 'published',
                show_in_nav = true,
                nav_order = 0,
                is_home = CASE WHEN slug = 'landing' THEN true ELSE false END
            """
        )
    )


def downgrade() -> None:
    op.drop_index("ix_site_pages_parent_id", table_name="site_pages")
    op.drop_constraint("fk_site_pages_parent_id", "site_pages", type_="foreignkey")
    op.drop_column("site_pages", "is_home")
    op.drop_column("site_pages", "nav_order")
    op.drop_column("site_pages", "show_in_nav")
    op.drop_column("site_pages", "status")
    op.drop_column("site_pages", "parent_id")
