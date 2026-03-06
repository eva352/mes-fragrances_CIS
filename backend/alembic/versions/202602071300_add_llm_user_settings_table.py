"""Create llm_user_settings table

Revision ID: 202602071300
Revises: 202602071200
Create Date: 2026-02-07 13:00:00.000000

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "202602071300"
down_revision = "202602071200"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "llm_user_settings",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("openrouter_api_key_encrypted", sa.String(), nullable=True),
        sa.Column("openrouter_model", sa.String(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_llm_user_settings_user_id", "llm_user_settings", ["user_id"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_llm_user_settings_user_id", table_name="llm_user_settings")
    op.drop_table("llm_user_settings")

