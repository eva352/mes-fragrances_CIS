"""Sync admin password from env

Revision ID: 202601081130
Revises: 202601080900
Create Date: 2026-01-08 11:30:00.000000

"""

import os
import uuid
from alembic import op
import sqlalchemy as sa
from passlib.context import CryptContext


revision = "202601081130"
down_revision = "202601080900"
branch_labels = None
depends_on = None

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__ident="2b",
)


def upgrade() -> None:
    connection = op.get_bind()

    admin_email = os.getenv("ADMIN_EMAIL") or os.getenv("PILOT_ADMIN_EMAIL", "admin@example.com")

    admin_password_hash = os.getenv("ADMIN_PASSWORD_HASH")
    if not admin_password_hash:
        admin_password = os.getenv("ADMIN_PASSWORD") or os.getenv("PILOT_ADMIN_PASSWORD", "change_me")
        admin_password_hash = pwd_context.hash(admin_password)

    # Upsert admin user: if exists, sync password; else insert.
    existing = connection.execute(
        sa.text("SELECT id FROM users WHERE email = :email"),
        {"email": admin_email},
    ).fetchone()

    if existing:
        connection.execute(
            sa.text("UPDATE users SET hashed_password = :hashed_password WHERE email = :email"),
            {"email": admin_email, "hashed_password": admin_password_hash},
        )
    else:
        connection.execute(
            sa.text(
                """
                INSERT INTO users (id, email, hashed_password, is_active, created_at)
                VALUES (:id, :email, :hashed_password, :is_active, NOW())
                """
            ),
            {
                "id": str(uuid.uuid4()),
                "email": admin_email,
                "hashed_password": admin_password_hash,
                "is_active": True,
            },
        )


def downgrade() -> None:
    # No downgrade for password sync.
    pass
