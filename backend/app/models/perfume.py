from sqlalchemy import Boolean, Column, DateTime, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func
import uuid

from app.db.session import Base


class Perfume(Base):
    __tablename__ = "perfumes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    short_description = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    olfactive_family = Column(String, nullable=True)
    budget_tier = Column(String, nullable=True)
    top_notes = Column(JSONB, nullable=False, default=list)
    heart_notes = Column(JSONB, nullable=False, default=list)
    base_notes = Column(JSONB, nullable=False, default=list)
    quiz_tags = Column(JSONB, nullable=False, default=list)
    is_new_arrival = Column(Boolean, nullable=False, default=False)
    is_best_seller = Column(Boolean, nullable=False, default=False)
    is_published = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
