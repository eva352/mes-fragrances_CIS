"""Create users table

Revision ID: 202511141435
Revises:
Create Date: 2025-11-14 14:35:00.000000

"""
import os
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import uuid
from passlib.context import CryptContext

# revision identifiers, used by Alembic.
revision = '202511141435'
down_revision = None
branch_labels = None
depends_on = None

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__ident="2b",
)


def upgrade() -> None:
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('email', sa.String(), unique=True, index=True, nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('is_active', sa.Boolean(), default=True, nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    
    # Insert default admin user
    connection = op.get_bind()

    admin_email = os.getenv("ADMIN_EMAIL", "admin@example.com")

    admin_password_hash = os.getenv("ADMIN_PASSWORD_HASH")
    if not admin_password_hash:
        admin_password = os.getenv("ADMIN_PASSWORD", "change_me")
        admin_password_hash = pwd_context.hash(admin_password)
    
    # Insert admin user
    connection.execute(
        sa.text("""
            INSERT INTO users (id, email, hashed_password, is_active, created_at)
            VALUES (:id, :email, :hashed_password, :is_active, NOW())
        """),
        {
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "hashed_password": admin_password_hash,
            "is_active": True
        }
    )


def downgrade() -> None:
    # Drop users table
    op.drop_table('users')
