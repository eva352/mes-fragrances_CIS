"""Create app_projects table

Revision ID: 202601091330
Revises: 202601091245
Create Date: 2026-01-09 13:30:00.000000

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import uuid


revision = "202601091330"
down_revision = "202601091245"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "app_projects",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("slug", sa.String(), nullable=False, unique=True),
        sa.Column(
            "spec",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::jsonb"),
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_app_projects_slug", "app_projects", ["slug"], unique=True)

    connection = op.get_bind()
    connection.execute(
        sa.text(
            """
            INSERT INTO app_projects (id, slug, spec, created_at, updated_at)
            VALUES (:id, :slug, CAST(:spec AS jsonb), NOW(), NOW())
            """
        ),
        {
            "id": str(uuid.uuid4()),
            "slug": "default",
            "spec": '{"version":"1.0","kind":"aurora.app","project":{"id":"aurora_stack","title":"AuroraStack","theme":{"mode":"system","palette":"northern-light"}},"shell":{"layout":"sidebar","navigation":[{"id":"nav_dashboard","title":"Dashboard","path":"/"},{"id":"nav_settings","title":"Settings","path":"/settings"}]},"pages":[{"id":"page_dashboard","path":"/","title":"Dashboard","sections":[],"dataSources":[]}]}',
        },
    )


def downgrade() -> None:
    op.drop_index("ix_app_projects_slug", table_name="app_projects")
    op.drop_table("app_projects")
