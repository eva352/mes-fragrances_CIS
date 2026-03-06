"""Create ui_libraries table

Revision ID: 202601091245
Revises: 202601081130
Create Date: 2026-01-09 12:45:00.000000

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "202601091245"
down_revision = "202601081130"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "ui_libraries",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False, unique=True),
        sa.Column(
            "component_keys",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'[]'::jsonb"),
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_ui_libraries_user_id", "ui_libraries", ["user_id"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_ui_libraries_user_id", table_name="ui_libraries")
    op.drop_table("ui_libraries")

