from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, Text
from sqlalchemy.dialects.postgresql import BIGINT, JSONB, UUID
from sqlalchemy.sql import func

from app.db.session import Base


class AffiliateOffer(Base):
    __tablename__ = "offers"

    id = Column(BIGINT, primary_key=True)
    advertiser_id = Column(BIGINT, ForeignKey("advertisers.id", ondelete="CASCADE"), nullable=False, index=True)
    perfume_id = Column(UUID(as_uuid=True), ForeignKey("perfumes.id", ondelete="SET NULL"), nullable=True, index=True)
    network = Column(Text, nullable=False)
    network_product_id = Column(Text, nullable=True)
    merchant_product_id = Column(Text, nullable=True)
    title = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Numeric(12, 2), nullable=False)
    currency = Column(Text, nullable=False, default="EUR")
    delivery_cost = Column(Numeric(12, 2), nullable=True)
    total_price = Column(Numeric(12, 2), nullable=True)
    affiliate_url = Column(Text, nullable=False)
    merchant_url = Column(Text, nullable=True)
    image_url = Column(Text, nullable=True)
    in_stock = Column(Boolean, nullable=True)
    stock_status = Column(Text, nullable=True)
    first_seen_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    last_seen_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    last_price_change_at = Column(DateTime(timezone=True), nullable=True)
    missed_imports = Column(Integer, nullable=False, default=0)
    active = Column(Boolean, nullable=False, default=True)
    match_status = Column(Text, nullable=False, default="unmatched")
    match_score = Column(Numeric(5, 2), nullable=True)
    match_method = Column(Text, nullable=True)
    raw_payload = Column(JSONB, nullable=False, default=dict)
    metadata_json = Column("metadata", JSONB, nullable=False, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
