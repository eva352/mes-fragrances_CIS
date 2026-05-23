from __future__ import annotations

from collections.abc import Iterable
from decimal import Decimal
from typing import Any

from fastapi import APIRouter, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import DBSession
from app.models.advertiser import Advertiser
from app.models.affiliate_offer import AffiliateOffer
from app.models.perfume import Perfume
from app.schemas.perfume import (
    PerfumeCardRead,
    PerfumeDetailRead,
    PerfumeFeaturedRead,
    PerfumeOfferRead,
    QuizPersonalityProfileRead,
    QuizRecommendationItem,
    QuizRecommendationRequest,
    QuizRecommendationResponse,
)

router = APIRouter()


PROFILE_DETAILS: dict[str, dict[str, Any]] = {
    "romantic-soft": {
        "title": "Romantique douce",
        "subtitle": "Une personnalité tendre, rassurante et délicatement féminine.",
        "description": "Tu sembles attirée par les parfums qui enveloppent avec douceur, laissent une impression tendre et créent une présence délicate sans jamais en faire trop.",
        "olfactive_families": ["Floral doux", "Poudré", "Musqué", "Fruitée tendre"],
        "keywords": ["douceur", "réconfort", "poésie", "féminité"],
        "perfume_tags": ["romantic", "soft", "floral", "fruity", "musky", "powdery", "spring", "day"],
    },
    "elegant-classic": {
        "title": "Élégante classique",
        "subtitle": "Une allure chic, posée et intemporelle.",
        "description": "Ton profil recherche des sillages raffinés, bien construits et naturellement distingués. Tu aimes l'élégance qui dure et les signatures qui restent justes.",
        "olfactive_families": ["Floral élégant", "Aldéhydé", "Boisé doux", "Chypré léger"],
        "keywords": ["raffinement", "distinction", "classe", "intemporalité"],
        "perfume_tags": ["elegant", "classic", "signature", "floral", "powdery", "musky", "day"],
    },
    "sunny-sparkling": {
        "title": "Solaire pétillante",
        "subtitle": "Un profil lumineux, joyeux et spontané.",
        "description": "Tu sembles aimer les parfums frais, vivants et faciles à porter, avec une énergie lumineuse qui donne immédiatement une impression positive.",
        "olfactive_families": ["Agrumes", "Fruitée fraîche", "Floral solaire", "Aquatique"],
        "keywords": ["fraîcheur", "énergie", "bonne humeur", "lumière"],
        "perfume_tags": ["fresh", "fruity", "floral", "airy", "spring", "summer", "day"],
    },
    "mysterious-intense": {
        "title": "Mystérieuse intense",
        "subtitle": "Une présence profonde, magnétique et captivante.",
        "description": "Tu es attirée par les parfums plus intenses, texturés et enveloppants, capables de laisser une impression marquante et un sillage plus énigmatique.",
        "olfactive_families": ["Oriental", "Ambré", "Épicé", "Boisé sombre"],
        "keywords": ["mystère", "intensité", "présence", "profondeur"],
        "perfume_tags": ["amber", "warm", "bold", "evening", "special", "autumn", "winter"],
    },
    "bold-sensual": {
        "title": "Audacieuse sensuelle",
        "subtitle": "Un profil charismatique, affirmé et séducteur.",
        "description": "Tu recherches des parfums avec du caractère, de la sensualité et une vraie confiance dans le sillage. L'idée n'est pas la discrétion, mais l'impact juste.",
        "olfactive_families": ["Gourmand", "Oriental sensuel", "Floral opulent"],
        "keywords": ["sensualité", "impact", "confiance", "assurance"],
        "perfume_tags": ["confident", "bold", "gourmand", "amber", "warm", "evening", "special"],
    },
    "natural-soothing": {
        "title": "Naturelle apaisante",
        "subtitle": "Une personnalité authentique, calme et équilibrée.",
        "description": "Tu sembles préférer les parfums nets, sereins et faciles à vivre, avec une sensation de propre, de naturel et d'équilibre au quotidien.",
        "olfactive_families": ["Vert", "Musqué propre", "Aromatique", "Floral naturel"],
        "keywords": ["naturel", "propreté", "sérénité", "équilibre"],
        "perfume_tags": ["fresh", "airy", "soft", "everyday", "day", "spring", "musky"],
    },
    "creative-original": {
        "title": "Créative originale",
        "subtitle": "Un profil libre, curieux et singulier.",
        "description": "Tu recherches surtout une signature qui sorte un peu des sentiers battus, avec de la personnalité, du relief et une vraie impression d'originalité.",
        "olfactive_families": ["Aromatique atypique", "Cuiré doux", "Contrasté", "Fumé léger"],
        "keywords": ["originalité", "singularité", "surprise", "créativité"],
        "perfume_tags": ["woody", "signature", "bold", "special", "elegant"],
    },
    "minimalist-chic": {
        "title": "Minimaliste chic",
        "subtitle": "Une élégance sobre, moderne et très maîtrisée.",
        "description": "Tu sembles aimer les parfums nets, subtils et haut de gamme dans l'esprit. Le rendu recherché est discret, propre et parfaitement calibré.",
        "olfactive_families": ["Musqué", "Propre", "Boisé sec", "Floral abstrait"],
        "keywords": ["sobriété", "netteté", "discrétion", "haut de gamme"],
        "perfume_tags": ["minimal", "clean", "musky", "powdery", "signature", "elegant", "day"],
    },
}

PROFILE_FIELD_WEIGHTS: dict[str, float] = {
    "social_style": 2.3,
    "atmosphere": 1.8,
    "room_presence": 1.8,
    "ideal_weekend": 1.6,
    "core_quality": 1.6,
    "desired_fragrance": 1.7,
    "desired_image": 1.8,
}

PROFILE_HINTS_BY_FIELD: dict[str, dict[str, dict[str, float]]] = {
    "desired_effect": {
        "discreet": {"minimalist-chic": 1.1, "natural-soothing": 0.8},
        "elegant": {"elegant-classic": 1.5, "minimalist-chic": 0.6},
        "comforting": {"romantic-soft": 1.2, "natural-soothing": 1.0},
        "fresh": {"sunny-sparkling": 1.2, "natural-soothing": 1.0},
        "sensual": {"bold-sensual": 1.4, "mysterious-intense": 0.9},
        "original": {"creative-original": 1.6},
        "powerful": {"bold-sensual": 1.3, "mysterious-intense": 1.2},
        "clean": {"minimalist-chic": 1.1, "natural-soothing": 1.1},
    },
    "instinctive_family": {
        "fruity": {"sunny-sparkling": 1.3, "romantic-soft": 0.8},
        "floral": {"romantic-soft": 1.0, "elegant-classic": 1.0},
        "gourmand": {"bold-sensual": 1.2, "romantic-soft": 0.8},
        "woody": {"creative-original": 1.1, "mysterious-intense": 1.0, "minimalist-chic": 0.4},
        "fresh": {"sunny-sparkling": 1.1, "natural-soothing": 1.2},
        "amber": {"mysterious-intense": 1.3, "bold-sensual": 1.0},
    },
    "trail": {
        "skin": {"minimalist-chic": 1.0, "natural-soothing": 1.0, "romantic-soft": 0.6},
        "moderate": {"elegant-classic": 1.0, "romantic-soft": 0.7},
        "present": {"elegant-classic": 0.7, "sunny-sparkling": 0.5, "creative-original": 0.8},
        "powerful": {"bold-sensual": 1.2, "mysterious-intense": 1.2},
    },
    "occasion": {
        "daily": {"natural-soothing": 0.7, "romantic-soft": 0.7, "minimalist-chic": 0.6},
        "formal": {"elegant-classic": 1.0, "minimalist-chic": 0.5},
        "festive": {"sunny-sparkling": 0.7, "bold-sensual": 0.9},
        "special": {"mysterious-intense": 0.9, "bold-sensual": 0.9},
        "date-night": {"romantic-soft": 0.7, "bold-sensual": 1.0, "mysterious-intense": 0.7},
    },
    "seasonality": {
        "spring": {"romantic-soft": 0.8, "sunny-sparkling": 0.8, "natural-soothing": 0.6},
        "summer": {"sunny-sparkling": 1.0, "natural-soothing": 0.7},
        "autumn": {"mysterious-intense": 0.9, "bold-sensual": 0.6},
        "winter": {"mysterious-intense": 1.0, "bold-sensual": 0.8, "elegant-classic": 0.4},
        "all-seasons": {"elegant-classic": 0.8, "minimalist-chic": 0.7},
        "holidays": {"mysterious-intense": 0.7, "bold-sensual": 0.7},
        "vacation": {"sunny-sparkling": 0.9},
        "romantic": {"romantic-soft": 0.9, "bold-sensual": 0.5},
    },
}

PROFILE_HINTS_BY_SENSATION: dict[str, dict[str, float]] = {
    "freshness": {"sunny-sparkling": 1.0, "natural-soothing": 0.9},
    "softness": {"romantic-soft": 1.0, "natural-soothing": 0.6},
    "warmth": {"mysterious-intense": 0.9, "bold-sensual": 0.8, "romantic-soft": 0.4},
    "cleanliness": {"minimalist-chic": 0.9, "natural-soothing": 0.9},
    "elegance": {"elegant-classic": 1.0, "minimalist-chic": 0.5},
    "mystery": {"mysterious-intense": 1.1},
    "sensuality": {"bold-sensual": 1.1, "mysterious-intense": 0.6},
    "energy": {"sunny-sparkling": 1.0},
    "comfort": {"romantic-soft": 0.9, "natural-soothing": 0.8},
    "refinement": {"elegant-classic": 0.9, "minimalist-chic": 0.8},
    "originality": {"creative-original": 1.2},
}

PERFUME_TAGS_BY_FIELD: dict[str, dict[str, list[str]]] = {
    "frequency": {
        "daily": ["everyday", "day"],
        "occasionally": ["signature", "special"],
        "rarely": ["special"],
        "first-time": ["soft", "day", "everyday"],
    },
    "occasion": {
        "daily": ["day", "everyday"],
        "formal": ["elegant", "signature", "day"],
        "festive": ["special", "evening"],
        "special": ["special", "evening", "bold"],
        "date-night": ["evening", "special", "warm"],
    },
    "seasonality": {
        "spring": ["spring", "fresh", "day"],
        "summer": ["summer", "fresh", "airy", "day"],
        "autumn": ["autumn", "warm"],
        "winter": ["winter", "warm", "special"],
        "all-seasons": ["signature", "day"],
        "holidays": ["winter", "special", "bold"],
        "vacation": ["summer", "fresh", "fruity"],
        "romantic": ["special", "warm", "soft"],
    },
    "desired_effect": {
        "discreet": ["soft", "airy", "day"],
        "elegant": ["elegant", "signature"],
        "comforting": ["warm", "cocoon", "soft"],
        "fresh": ["fresh", "airy", "day"],
        "sensual": ["evening", "special", "warm", "bold"],
        "original": ["signature", "woody"],
        "powerful": ["bold", "special", "confident"],
        "clean": ["minimal", "clean", "musky", "everyday"],
    },
    "instinctive_family": {
        "fruity": ["fruity", "fresh"],
        "floral": ["floral"],
        "gourmand": ["gourmand", "sweet", "warm"],
        "woody": ["woody", "signature"],
        "fresh": ["fresh", "airy", "day"],
        "amber": ["amber", "warm", "evening"],
    },
    "trail": {
        "skin": ["soft", "airy", "minimal"],
        "moderate": ["balanced", "elegant", "day"],
        "present": ["signature", "special"],
        "powerful": ["bold", "evening"],
    },
}

PERFUME_TAGS_BY_SENSATION: dict[str, list[str]] = {
    "freshness": ["fresh", "airy", "day"],
    "softness": ["soft", "musky"],
    "warmth": ["warm", "amber"],
    "cleanliness": ["clean", "minimal", "musky"],
    "elegance": ["elegant", "signature"],
    "mystery": ["bold", "special", "evening"],
    "sensuality": ["warm", "evening", "special"],
    "energy": ["fresh", "fruity", "day"],
    "comfort": ["soft", "cocoon", "warm"],
    "refinement": ["elegant", "powdery", "signature"],
    "originality": ["woody", "signature", "bold"],
}

QUIZ_LABELS: dict[str, dict[str, str]] = {
    "desired_effect": {
        "discreet": "une présence discrète",
        "elegant": "une allure élégante",
        "comforting": "une sensation réconfortante",
        "fresh": "un rendu frais",
        "sensual": "une aura sensuelle",
        "original": "une touche originale",
        "powerful": "un sillage puissant",
        "clean": "un rendu propre et minimaliste",
    },
    "instinctive_family": {
        "fruity": "des accords fruités",
        "floral": "des facettes florales",
        "gourmand": "des notes gourmandes",
        "woody": "des nuances boisées",
        "fresh": "des accords frais",
        "amber": "des accents ambrés",
    },
    "trail": {
        "skin": "un sillage très proche de la peau",
        "moderate": "un sillage modéré",
        "present": "une présence nette",
        "powerful": "un sillage marquant",
    },
    "occasion": {
        "daily": "un usage quotidien",
        "formal": "des moments plus formels",
        "festive": "des moments festifs",
        "special": "des grandes occasions",
        "date-night": "les soirées et rendez-vous",
    },
    "seasonality": {
        "spring": "le printemps",
        "summer": "l'été",
        "autumn": "l'automne",
        "winter": "l'hiver",
        "all-seasons": "toutes les saisons",
        "holidays": "les fêtes de fin d'année",
        "vacation": "les vacances",
        "romantic": "les moments romantiques",
    },
    "sensations": {
        "freshness": "de la fraîcheur",
        "softness": "de la douceur",
        "warmth": "de la chaleur",
        "cleanliness": "une sensation de propreté",
        "elegance": "de l'élégance",
        "mystery": "une pointe de mystère",
        "sensuality": "de la sensualité",
        "energy": "de l'énergie",
        "comfort": "du confort",
        "refinement": "du raffinement",
        "originality": "de l'originalité",
    },
}


def _to_float(value: Decimal | float | int | None) -> float | None:
    if value is None:
        return None
    return float(value)


def _offer_sort_key(row: tuple[AffiliateOffer, Advertiser]) -> tuple[int, float, int, str, int]:
    offer, advertiser = row
    total_price = _to_float(offer.total_price)
    price = _to_float(offer.price) or 0.0
    advertiser_priority = advertiser.priority if advertiser.priority is not None else 100
    return (
        0 if offer.in_stock is True else 1,
        total_price if total_price is not None else price,
        advertiser_priority,
        advertiser.name.casefold(),
        int(offer.id),
    )


def _group_offers(rows: Iterable[tuple[AffiliateOffer, Advertiser]]) -> dict[Any, list[tuple[AffiliateOffer, Advertiser]]]:
    grouped: dict[Any, list[tuple[AffiliateOffer, Advertiser]]] = {}
    for row in sorted(rows, key=lambda item: (str(item[0].perfume_id), _offer_sort_key(item))):
        grouped.setdefault(row[0].perfume_id, []).append(row)
    return grouped


def _load_offers_map(db: Session, perfume_ids: Iterable[Any]) -> dict[Any, list[tuple[AffiliateOffer, Advertiser]]]:
    ids = list(perfume_ids)
    if not ids:
        return {}

    rows = (
        db.query(AffiliateOffer, Advertiser)
        .join(Advertiser, Advertiser.id == AffiliateOffer.advertiser_id)
        .filter(
            AffiliateOffer.perfume_id.in_(ids),
            AffiliateOffer.active.is_(True),
            Advertiser.active.is_(True),
        )
        .all()
    )
    return _group_offers(rows)


def _build_offer(offer: AffiliateOffer, advertiser: Advertiser) -> PerfumeOfferRead:
    return PerfumeOfferRead(
        id=int(offer.id),
        advertiser_name=advertiser.name,
        title=offer.title,
        price=_to_float(offer.price) or 0.0,
        currency=offer.currency,
        delivery_cost=_to_float(offer.delivery_cost),
        total_price=_to_float(offer.total_price),
        affiliate_url=offer.affiliate_url,
        merchant_url=offer.merchant_url,
        image_url=offer.image_url,
        in_stock=offer.in_stock,
        stock_status=offer.stock_status,
        last_seen_at=offer.last_seen_at,
        last_price_change_at=offer.last_price_change_at,
    )


def _offer_list_price(row: tuple[AffiliateOffer, Advertiser]) -> float | None:
    offer, _advertiser = row
    total_price = _to_float(offer.total_price)
    if total_price is not None:
        return total_price
    return _to_float(offer.price)


def _build_card(perfume: Perfume, offers: list[tuple[AffiliateOffer, Advertiser]]) -> PerfumeCardRead:
    lowest_offer = offers[0] if offers else None
    return PerfumeCardRead(
        slug=perfume.slug,
        name=perfume.name,
        brand=perfume.brand,
        image_url=perfume.image_url,
        short_description=perfume.short_description,
        olfactive_family=perfume.olfactive_family,
        budget_tier=perfume.budget_tier,
        lowest_price=_offer_list_price(lowest_offer) if lowest_offer else None,
        currency=lowest_offer[0].currency if lowest_offer else None,
        is_new_arrival=bool(perfume.is_new_arrival),
        is_best_seller=bool(perfume.is_best_seller),
    )


def _normalize(text: str) -> str:
    return " ".join((text or "").strip().lower().split())


def _matches_query(perfume: Perfume, query: str) -> bool:
    if not query:
        return True
    tokens = [token for token in _normalize(query).split(" ") if token]
    if not tokens:
        return True

    haystack_parts = [
        perfume.name,
        perfume.brand,
        perfume.short_description or "",
        perfume.description or "",
        perfume.olfactive_family or "",
        *[str(item) for item in (perfume.top_notes or [])],
        *[str(item) for item in (perfume.heart_notes or [])],
        *[str(item) for item in (perfume.base_notes or [])],
    ]
    haystack = _normalize(" ".join(haystack_parts))
    return all(token in haystack for token in tokens)


def _candidate_perfumes(db: Session) -> list[Perfume]:
    return (
        db.query(Perfume)
        .filter(Perfume.is_published.is_(True))
        .order_by(Perfume.is_best_seller.desc(), Perfume.name.asc())
        .all()
    )


def _build_profile(profile_key: str) -> QuizPersonalityProfileRead:
    details = PROFILE_DETAILS[profile_key]
    return QuizPersonalityProfileRead(
        key=profile_key,
        title=str(details["title"]),
        subtitle=str(details["subtitle"]),
        description=str(details["description"]),
        olfactive_families=[str(item) for item in details["olfactive_families"]],
        keywords=[str(item) for item in details["keywords"]],
    )


def _profile_scores(payload: QuizRecommendationRequest) -> dict[str, float]:
    scores = {profile_key: 0.0 for profile_key in PROFILE_DETAILS}

    for field_name, weight in PROFILE_FIELD_WEIGHTS.items():
        value = getattr(payload, field_name, "")
        if value in scores:
            scores[value] += weight

    for field_name, mappings in PROFILE_HINTS_BY_FIELD.items():
        value = getattr(payload, field_name, "")
        for profile_key, weight in mappings.get(value, {}).items():
            scores[profile_key] += weight

    for sensation in payload.sensations:
        for profile_key, weight in PROFILE_HINTS_BY_SENSATION.get(sensation, {}).items():
            scores[profile_key] += weight

    return scores


def _resolve_profile(payload: QuizRecommendationRequest) -> str:
    scores = _profile_scores(payload)
    return max(scores.items(), key=lambda item: item[1])[0]


def _desired_perfume_tags(payload: QuizRecommendationRequest, profile_key: str) -> tuple[set[str], set[str]]:
    profile_tags = set(str(tag) for tag in PROFILE_DETAILS[profile_key]["perfume_tags"])
    desired_tags = set(profile_tags)

    for field_name, mappings in PERFUME_TAGS_BY_FIELD.items():
        value = getattr(payload, field_name, "")
        desired_tags.update(mappings.get(value, []))

    for sensation in payload.sensations:
        desired_tags.update(PERFUME_TAGS_BY_SENSATION.get(sensation, []))

    return profile_tags, desired_tags


def _match_labels(payload: QuizRecommendationRequest) -> list[str]:
    labels: list[str] = []
    for field_name in ("desired_effect", "instinctive_family", "trail", "occasion", "seasonality"):
        value = getattr(payload, field_name, "")
        label = QUIZ_LABELS.get(field_name, {}).get(value)
        if label:
            labels.append(label)

    for sensation in payload.sensations:
        label = QUIZ_LABELS.get("sensations", {}).get(sensation)
        if label:
            labels.append(label)

    deduped: list[str] = []
    for label in labels:
        if label not in deduped:
            deduped.append(label)
    return deduped


def _score_perfume(payload: QuizRecommendationRequest, perfume: Perfume, profile_key: str) -> float:
    tags = set(str(tag) for tag in (perfume.quiz_tags or []))
    profile_tags, desired_tags = _desired_perfume_tags(payload, profile_key)
    score = 0.0

    profile_overlap = sum(1 for tag in profile_tags if tag in tags)
    direct_overlap = sum(1 for tag in desired_tags - profile_tags if tag in tags)
    score += profile_overlap * 2.2
    score += direct_overlap * 1.35

    if perfume.is_best_seller:
        score += 0.2
    if perfume.is_new_arrival:
        score += 0.1
    return score


@router.get("/perfumes/search", response_model=list[PerfumeCardRead], tags=["perfumes"])
def search_perfumes(
    db: DBSession,
    q: str = Query(default="", min_length=0, max_length=100),
    limit: int = Query(default=18, ge=1, le=5000),
):
    query = _normalize(q)
    perfumes = [perfume for perfume in _candidate_perfumes(db) if _matches_query(perfume, query)]
    offers_map = _load_offers_map(db, [perfume.id for perfume in perfumes])
    return [_build_card(perfume, offers_map.get(perfume.id, [])) for perfume in perfumes[:limit]]


@router.get("/perfumes/featured", response_model=PerfumeFeaturedRead, tags=["perfumes"])
def featured_perfumes(db: DBSession):
    perfumes = _candidate_perfumes(db)
    offers_map = _load_offers_map(db, [perfume.id for perfume in perfumes])

    new_arrivals = [
        _build_card(perfume, offers_map.get(perfume.id, []))
        for perfume in perfumes
        if perfume.is_new_arrival
    ][:4]
    best_sellers = [
        _build_card(perfume, offers_map.get(perfume.id, []))
        for perfume in perfumes
        if perfume.is_best_seller
    ][:4]

    return PerfumeFeaturedRead(new_arrivals=new_arrivals, best_sellers=best_sellers)


@router.get("/perfumes/{slug}", response_model=PerfumeDetailRead, tags=["perfumes"])
def read_perfume(slug: str, db: DBSession):
    perfume = (
        db.query(Perfume)
        .filter(Perfume.slug == slug, Perfume.is_published.is_(True))
        .first()
    )
    if not perfume:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Perfume not found")

    offers = _load_offers_map(db, [perfume.id]).get(perfume.id, [])
    card = _build_card(perfume, offers)
    return PerfumeDetailRead(
        **card.model_dump(by_alias=False),
        description=perfume.description,
        top_notes=[str(item) for item in (perfume.top_notes or [])],
        heart_notes=[str(item) for item in (perfume.heart_notes or [])],
        base_notes=[str(item) for item in (perfume.base_notes or [])],
        offers=[_build_offer(offer, advertiser) for offer, advertiser in offers],
    )


@router.get("/perfumes/{slug}/offers", response_model=list[PerfumeOfferRead], tags=["perfumes"])
def read_perfume_offers(slug: str, db: DBSession):
    perfume = (
        db.query(Perfume)
        .filter(Perfume.slug == slug, Perfume.is_published.is_(True))
        .first()
    )
    if not perfume:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Perfume not found")
    offers = _load_offers_map(db, [perfume.id]).get(perfume.id, [])
    return [_build_offer(offer, advertiser) for offer, advertiser in offers]


@router.post("/quiz/recommendations", response_model=QuizRecommendationResponse, tags=["perfumes"])
def get_quiz_recommendations(payload: QuizRecommendationRequest, db: DBSession):
    perfumes = _candidate_perfumes(db)
    profile_key = _resolve_profile(payload)
    profile = _build_profile(profile_key)
    labels = _match_labels(payload)
    scored = sorted(
        ((perfume, _score_perfume(payload, perfume, profile_key)) for perfume in perfumes),
        key=lambda item: item[1],
        reverse=True,
    )
    top_perfumes = [perfume for perfume, score in scored if score > 0][:3]
    if not top_perfumes:
        top_perfumes = perfumes[:3]

    offers_map = _load_offers_map(db, [perfume.id for perfume in top_perfumes])
    recommendations: list[QuizRecommendationItem] = []
    for perfume in top_perfumes:
        if labels:
            explanation = (
                f"Une proposition cohérente avec le profil {profile.title.lower()} et "
                + ", ".join(labels[:3])
                + "."
            )
        else:
            explanation = f"Une proposition élégante et cohérente avec le profil {profile.title.lower()}."
        recommendations.append(
            QuizRecommendationItem(
                perfume=_build_card(perfume, offers_map.get(perfume.id, [])),
                explanation=explanation,
            )
        )

    return QuizRecommendationResponse(profile=profile, recommendations=recommendations)
