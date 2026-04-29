from pydantic import BaseModel, ConfigDict, Field


class PerfumeOfferRead(BaseModel):
    merchant_name: str = Field(alias="merchantName")
    price: float
    currency: str
    availability: str | None = None
    affiliate_url: str = Field(alias="affiliateUrl")

    model_config = ConfigDict(populate_by_name=True)


class PerfumeCardRead(BaseModel):
    slug: str
    name: str
    brand: str
    image_url: str | None = Field(default=None, alias="imageUrl")
    short_description: str | None = Field(default=None, alias="shortDescription")
    olfactive_family: str | None = Field(default=None, alias="olfactiveFamily")
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
