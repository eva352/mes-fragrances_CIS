from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy import Column, String, Boolean, DateTime
import uuid

from app.core.config import settings


engine = create_engine(
    str(settings.database_url),
    pool_pre_ping=True,
    future=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


class Base(DeclarativeBase):
    """Base SQLAlchemy pour tous les modèles ORM."""
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()