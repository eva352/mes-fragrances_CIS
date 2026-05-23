from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PerfumeOfferRead(BaseModel):
    id: int
    advertiser_name: str = Field(alias="advertiserName")
    title: str
    price: float
    currency: str
    delivery_cost: float | None = Field(default=None, alias="deliveryCost")
    total_price: float | None = Field(default=None, alias="totalPrice")
    affiliate_url: str = Field(alias="affiliateUrl")
    merchant_url: str | None = Field(default=None, alias="merchantUrl")
    image_url: str | None = Field(default=None, alias="imageUrl")
    in_stock: bool | None = Field(default=None, alias="inStock")
    stock_status: str | None = Field(default=None, alias="stockStatus")
    last_seen_at: datetime | None = Field(default=None, alias="lastSeenAt")
    last_price_change_at: datetime | None = Field(default=None, alias="lastPriceChangeAt")

    model_config = ConfigDict(populate_by_name=True)


class PerfumeCardRead(BaseModel):
    slug: str
    name: str
    brand: str
    image_url: str | None = Field(default=None, alias="imageUrl")
    short_description: str | None = Field(default=None, alias="shortDescription")
    gender: str | None = None
    olfactive_family: str | None = Field(default=None, alias="olfactiveFamily")
    key_notes: list[str] = Field(default_factory=list, alias="keyNotes")
    budget_tier: str | None = Field(default=None, alias="budgetTier")
    lowest_price: float | None = Field(default=None, alias="lowestPrice")
    currency: str | None = None
    is_new_arrival: bool = Field(default=False, alias="isNewArrival")
    is_best_seller: bool = Field(default=False, alias="isBestSeller")

    model_config = ConfigDict(populate_by_name=True)


class PerfumeDetailRead(PerfumeCardRead):
    description: str | None = None
    top_notes: list[str] = Field(default_factory=list, alias="topNotes")
    heart_notes: list[str] = Field(default_factory=list, alias="heartNotes")
    base_notes: list[str] = Field(default_factory=list, alias="baseNotes")
    offers: list[PerfumeOfferRead] = Field(default_factory=list)


class PerfumeFeaturedRead(BaseModel):
    new_arrivals: list[PerfumeCardRead] = Field(default_factory=list, alias="newArrivals")
    best_sellers: list[PerfumeCardRead] = Field(default_factory=list, alias="bestSellers")

    model_config = ConfigDict(populate_by_name=True)


class PerfumeFilterValueRead(BaseModel):
    value: str
    label: str
    count: int


class PerfumePriceRangeRead(BaseModel):
    min: float | None = None
    max: float | None = None


class PerfumeFilterOptionsRead(BaseModel):
    genders: list[PerfumeFilterValueRead] = Field(default_factory=list)
    families: list[PerfumeFilterValueRead] = Field(default_factory=list)
    price_range: PerfumePriceRangeRead = Field(default_factory=PerfumePriceRangeRead, alias="priceRange")

    model_config = ConfigDict(populate_by_name=True)


class QuizRecommendationRequest(BaseModel):
    target: str
    frequency: str
    occasion: str
    seasonality: str
    desired_effect: str = Field(alias="desiredEffect")
    instinctive_family: str = Field(alias="instinctiveFamily")
    sensations: list[str] = Field(default_factory=list)
    trail: str
    social_style: str = Field(alias="socialStyle")
    atmosphere: str
    room_presence: str = Field(alias="roomPresence")
    ideal_weekend: str = Field(alias="idealWeekend")
    core_quality: str = Field(alias="coreQuality")
    desired_fragrance: str = Field(alias="desiredFragrance")
    desired_image: str = Field(alias="desiredImage")

    model_config = ConfigDict(populate_by_name=True)


class QuizPersonalityProfileRead(BaseModel):
    key: str
    title: str
    subtitle: str
    description: str
    olfactive_families: list[str] = Field(default_factory=list, alias="olfactiveFamilies")
    keywords: list[str] = Field(default_factory=list)

    model_config = ConfigDict(populate_by_name=True)


class QuizRecommendationItem(BaseModel):
    perfume: PerfumeCardRead
    explanation: str


class QuizRecommendationResponse(BaseModel):
    profile: QuizPersonalityProfileRead
    recommendations: list[QuizRecommendationItem] = Field(default_factory=list)
