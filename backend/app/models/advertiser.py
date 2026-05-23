from sqlalchemy import Boolean, Column, DateTime, Integer, Numeric, Text
from sqlalchemy.dialects.postgresql import BIGINT, JSONB
from sqlalchemy.sql import func

from app.db.session import Base


class Advertiser(Base):
    __tablename__ = "advertisers"

    id = Column(BIGINT, primary_key=True)
    network = Column(Text, nullable=False)
    network_advertiser_id = Column(Text, nullable=False)
    name = Column(Text, nullable=False)
    country_code = Column(Text, nullable=True)
    currency = Column(Text, nullable=True)
    awin_feed_id = Column(Text, nullable=True)
    awin_feed_name = Column(Text, nullable=True)
    awin_membership_status = Column(Text, nullable=True)
    deeplink_enabled = Column(Boolean, nullable=True)
    commission_min = Column(Numeric(10, 4), nullable=True)
    commission_max = Column(Numeric(10, 4), nullable=True)
    commission_type = Column(Text, nullable=True)
    priority = Column(Integer, nullable=False, default=100)
    active = Column(Boolean, nullable=False, default=True)
    metadata_json = Column("metadata", JSONB, nullable=False, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
