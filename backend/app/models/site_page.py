from sqlalchemy import Column, String, DateTime, Boolean, Integer, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
import uuid

from app.db.session import Base


class SitePage(Base):
    __tablename__ = "site_pages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False, default="Page")
    parent_id = Column(UUID(as_uuid=True), ForeignKey("site_pages.id", ondelete="SET NULL"), nullable=True)
    status = Column(String, nullable=False, default="published")
    show_in_nav = Column(Boolean, nullable=False, default=True)
    nav_order = Column(Integer, nullable=False, default=0)
    is_home = Column(Boolean, nullable=False, default=False)
    objective = Column(Text, nullable=True)
    expected_action = Column(Text, nullable=True)
    key_messages = Column(JSONB, nullable=False, default=list)
    facts = Column(Text, nullable=True)
    blocks = Column(JSONB, nullable=False, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
