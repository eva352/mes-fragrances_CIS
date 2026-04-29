from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.db.session import Base


class PerfumeOffer(Base):
    __tablename__ = "perfume_offers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    perfume_id = Column(UUID(as_uuid=True), ForeignKey("perfumes.id", ondelete="CASCADE"), nullable=False, index=True)
    merchant_name = Column(String, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    currency = Column(String, nullable=False, default="EUR")
    availability = Column(String, nullable=True)
    affiliate_url = Column(Text, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
