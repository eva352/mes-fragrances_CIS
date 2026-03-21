from __future__ import annotations

import json
import re
from typing import Annotated, Any, Literal

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.core.crypto import decrypt_secret
from app.core.llm_specs import ensure_llm_specs_dir
from app.core.openrouter import OpenRouterError, chat_completions_json
from app.models.llm_user_setting import LlmUserSetting
from app.models.user import User
from app.schemas.structure import (
    AvailableBlock,
    MaxUiHint,
    MaxUiDesignSystem,
    MaxUiPattern,
    SuggestedBlock,
    SuggestWebappStructureRequest,
    SuggestWebappStructureResponse,
    SuggestWebsiteStructureRequest,
    SuggestWebsiteStructureResponse,
    WebappStructurePagePlan,
    WebappStructurePlan,
    WebsiteStructurePlan,
)
from app.max_ui import generate_design_system

router = APIRouter()
DBSession = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]


def _get_openrouter_settings_or_400(db: Session, user_id) -> tuple[str, str]:
    settings = db.query(LlmUserSetting).filter(LlmUserSetting.user_id == user_id).first()
    if not settings or not settings.openrouter_api_key_encrypted:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OpenRouter key not configured")
    if not (settings.openrouter_model or "").strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OpenRouter model not configured")
    try:
        api_key = decrypt_secret(settings.openrouter_api_key_encrypted)
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Cannot decrypt OpenRouter key")
    return api_key, settings.openrouter_model.strip()


def _read_project_brief_or_400() -> dict[str, Any]:
    specs_dir = ensure_llm_specs_dir()
    brief_path = specs_dir / "project-brief.json"
    if not brief_path.exists():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing llm_specs/project-brief.json")
    try:
        return json.loads(brief_path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Invalid project-brief.json: {exc}") from exc


def _json_extract_first_object(text: str) -> dict[str, Any]:
    if not text:
        raise ValueError("Empty content")

    # Prefer fenced JSON blocks if present.
    fence = re.search(r"```json\\s*(\\{.*?\\})\\s*```", text, flags=re.DOTALL | re.IGNORECASE)
    if fence:
        return json.loads(fence.group(1))

    # Otherwise find the first balanced {...} object.
    start = text.find("{")
    if start == -1:
        raise ValueError("No JSON object found")
    level = 0
    end = None
    for i in range(start, len(text)):
        ch = text[i]
        if ch == "{":
            level += 1
        elif ch == "}":
            level -= 1
            if level == 0:
                end = i
                break
    if end is None:
        raise ValueError("Unterminated JSON object")
    return json.loads(text[start : end + 1])


WEBSITE_PATTERNS: list[dict[str, Any]] = [
    {
        "id": "hero-features-cta",
        "name": "Hero + Features + CTA",
        "keywords": ["saas", "outil", "b2b", "studio", "plateforme", "builder", "ia", "ai"],
        "sections": ["hero", "features", "compare", "pricing", "cta"],
    },
    {
        "id": "hero-testimonials-cta",
        "name": "Hero + Testimonials + CTA",
        "keywords": ["service", "agence", "studio", "consulting", "b2c", "premium", "confiance"],
        "sections": ["hero", "features", "timeline", "about", "cta"],
    },
    {
        "id": "bento-showcase",
        "name": "Bento Grid Showcase",
        "keywords": ["modulaire", "bento", "apple", "showcase", "design", "ui", "ux"],
        "sections": ["hero", "features", "process", "pricing", "cta"],
    },
]

WEBAPP_PATTERNS: list[dict[str, Any]] = [
    {
        "id": "admin-saas-mvp",
        "name": "Admin SaaS MVP (Sidebar)",
        "keywords": ["admin", "backoffice", "dashboard", "saas", "mvp"],
        "sections": ["dashboard", "users", "jobs", "logs", "integrations", "billing", "notifications", "settings"],
    }
]


def _choose_pattern(mode: Literal["website", "webapp"], query: str) -> MaxUiPattern:
    """
    Keep a small deterministic selector as fallback. In V2, the design system generator
    provides the primary pattern + inferred sections.
    """
    hay = (query or "").lower()
    candidates = WEBSITE_PATTERNS if mode == "website" else WEBAPP_PATTERNS
    best = candidates[0]
    best_score = -1
    for p in candidates:
        score = sum(1 for kw in p.get("keywords", []) if kw in hay)
        if score > best_score:
            best_score = score
            best = p
    return MaxUiPattern(id=str(best["id"]), name=str(best["name"]), sections=[str(s) for s in best.get("sections") or []])


def _build_design_system(mode: Literal["website", "webapp"], query: str) -> tuple[MaxUiDesignSystem | None, str | None, MaxUiPattern | None, list[str]]:
    notes: list[str] = []
    try:
        ds = generate_design_system(query, mode=mode)
        md = ds.to_markdown()
        pattern = MaxUiPattern(
            id=re.sub(r"[^a-z0-9]+", "-", ds.pattern_name.lower()).strip("-") or ("website" if mode == "website" else "webapp"),
            name=ds.pattern_name,
            sections=ds.pattern_sections,
        )
        design = MaxUiDesignSystem(
            category=ds.category,
            severity=ds.severity,
            patternName=ds.pattern_name,
            patternSectionsText=ds.pattern_sections_text,
            ctaPlacement=ds.cta_placement,
            colorStrategy=ds.color_strategy,
            conversionFocus=ds.conversion,
            styleName=ds.style_name,
            styleKeywords=ds.style_keywords,
            styleBestFor=ds.style_best_for,
            styleEffects=ds.style_effects,
            stylePerformance=ds.style_performance,
            styleAccessibility=ds.style_accessibility,
            colors=ds.colors,
            typography=ds.typography,
            keyEffects=ds.key_effects,
            antiPatterns=ds.anti_patterns,
        )
        notes.append("Max UI (V2): design system generated from CSV knowledge base (deterministic BM25).")
        return design, md, pattern, notes
    except Exception:
        notes.append("Max UI (V2) unavailable; using fallback pattern selector.")
        return None, None, None, notes


def _build_query(brief: dict[str, Any], extra: str = "") -> str:
    parts = [
        str(brief.get("siteType") or ""),
        str(brief.get("oneLiner") or ""),
        str(brief.get("primaryGoal") or ""),
        str(brief.get("tone") or ""),
        str(brief.get("targetUsers") or ""),
        str(extra or ""),
    ]
    return " ".join(p.strip() for p in parts if str(p).strip()).strip()


def _website_fallback_plan(available: list[AvailableBlock], pattern: MaxUiPattern) -> WebsiteStructurePlan:
    by_category: dict[str, list[AvailableBlock]] = {}
    for b in available:
        by_category.setdefault(b.category, []).append(b)
    blocks: list[SuggestedBlock] = []
    seen = set()
    preferred_by_category: dict[str, str] = {
        "hero": "hero-1",
        "features": "feature-51",
        "pricing": "pricing-9",
    }
    for section in pattern.sections:
        # In Pilot blocks, section == category most of the time.
        candidates = by_category.get(section) or []
        if not candidates:
            continue
        preferred_slug = preferred_by_category.get(section)
        pick = next((c for c in candidates if preferred_slug and c.slug == preferred_slug), candidates[0])
        key = (pick.category, pick.slug)
        if key in seen:
            continue
        seen.add(key)
        blocks.append(SuggestedBlock(category=pick.category, slug=pick.slug, title=pick.title))
    if not blocks:
        # Last resort: take up to 5 unique blocks in catalog order.
        for b in available:
            key = (b.category, b.slug)
            if key in seen:
                continue
            seen.add(key)
            blocks.append(SuggestedBlock(category=b.category, slug=b.slug, title=b.title))
            if len(blocks) >= 5:
                break
    return WebsiteStructurePlan(blocks=blocks, notes=["Fallback plan used (LLM output invalid or empty)."])


def _sanitize_text(value: str, *, max_len: int) -> str:
    s = str(value or "").strip()
    if len(s) > max_len:
        return s[:max_len].rstrip()
    return s


def _sanitize_list(values, *, max_items: int, max_item_len: int) -> list[str]:
    if not isinstance(values, list):
        return []
    out: list[str] = []
    for v in values[:max_items]:
        t = _sanitize_text(str(v), max_len=max_item_len)
        if t:
            out.append(t)
    return out


def _sanitize_block_payload(category: str, slug: str, raw_content, raw_props) -> tuple[dict | None, dict | None]:
    """
    Allow content/props only for the 3 pilot blocks. Drop unknown keys and enforce small size limits.
    """
    content = raw_content if isinstance(raw_content, dict) else None
    props = raw_props if isinstance(raw_props, dict) else None

    if category == "hero" and slug == "hero-1":
        c: dict = {}
        if content:
            c["headline"] = _sanitize_text(content.get("headline", ""), max_len=90)
            c["description"] = _sanitize_text(content.get("description", ""), max_len=260)
            c["primaryCtaText"] = _sanitize_text(content.get("primaryCtaText", ""), max_len=40)
            c["primaryCtaHref"] = _sanitize_text(content.get("primaryCtaHref", ""), max_len=120)
            c["secondaryCtaText"] = _sanitize_text(content.get("secondaryCtaText", ""), max_len=40)
            c["secondaryCtaHref"] = _sanitize_text(content.get("secondaryCtaHref", ""), max_len=120)
            bullets = _sanitize_list(content.get("bullets"), max_items=6, max_item_len=80)
            if bullets:
                c["bullets"] = bullets
        # Props not used in MVP for this block yet.
        return (c if any(v for v in c.values()) else None), None

    if category == "features" and slug == "feature-51":
        c: dict = {}
        if content:
            features = content.get("features")
            if isinstance(features, list):
                out_items = []
                for idx, it in enumerate(features[:6]):
                    if not isinstance(it, dict):
                        continue
                    heading = _sanitize_text(it.get("heading", ""), max_len=50)
                    description = _sanitize_text(it.get("description", ""), max_len=140)
                    icon = _sanitize_text(it.get("icon", ""), max_len=30)
                    if not (heading or description):
                        continue
                    out_items.append(
                        {
                            "id": _sanitize_text(it.get("id", f"feature-{idx+1}"), max_len=32) or f"feature-{idx+1}",
                            "heading": heading,
                            "description": description,
                            "icon": icon or None,
                            "isDefault": bool(it.get("isDefault")) if idx == 0 else bool(it.get("isDefault")),
                        }
                    )
                if out_items:
                    c["features"] = out_items
        return (c if c else None), None

    if category == "pricing" and slug == "pricing-9":
        c: dict = {}
        if content:
            c["title"] = _sanitize_text(content.get("title", ""), max_len=70)
            c["subtitle"] = _sanitize_text(content.get("subtitle", ""), max_len=220)
            c["ctaLabel"] = _sanitize_text(content.get("ctaLabel", ""), max_len=40)
            tiers = content.get("tiers")
            if isinstance(tiers, list):
                out_tiers = []
                for it in tiers[:4]:
                    if not isinstance(it, dict):
                        continue
                    name = _sanitize_text(it.get("name", ""), max_len=20)
                    if not name:
                        continue
                    out_tiers.append(
                        {
                            "name": name,
                            "price": _sanitize_text(it.get("price", ""), max_len=16),
                            "annualPrice": _sanitize_text(it.get("annualPrice", ""), max_len=16),
                            "description": _sanitize_text(it.get("description", ""), max_len=120),
                        }
                    )
                if out_tiers:
                    c["tiers"] = out_tiers
        return (c if any(v for v in c.values()) else None), None

    return None, None


@router.post("/structure/suggest", response_model=SuggestWebsiteStructureResponse | SuggestWebappStructureResponse, tags=["structure"])
async def suggest_structure(payload: SuggestWebsiteStructureRequest | SuggestWebappStructureRequest, db: DBSession, user: CurrentUser):
    brief = _read_project_brief_or_400()
    api_key, model = _get_openrouter_settings_or_400(db, user.id)

    if payload.mode == "website":
        from app.models.site_page import SitePage

        page = db.query(SitePage).filter(SitePage.slug == payload.page_slug).first()
        page_export = None
        if page:
            page_export = {
                "slug": page.slug,
                "title": page.title,
                "objective": page.objective,
                "expected_action": page.expected_action,
                "key_messages": page.key_messages or [],
                "facts": page.facts,
                "blocks": page.blocks or [],
            }

        query = _build_query(brief, extra=(page_export.get("objective") if page_export else ""))
        design_system, design_system_md, ds_pattern, ds_notes = _build_design_system("website", query)
        pattern = ds_pattern or _choose_pattern("website", query)
        max_ui = MaxUiHint(
            query=query,
            pattern=pattern,
            notes=ds_notes,
            designSystem=design_system,
            designSystemMarkdown=design_system_md,
        )

        available = payload.available_blocks or []
        allowed_set = {(b.category, b.slug) for b in available}

        sys = "\n".join(
            [
                "Tu es “Pilot Orchestrator”. Tu dois proposer une structure de page website en choisissant UNIQUEMENT des blocs existants.",
                "",
                "Règles strictes :",
                "- Output STRICT JSON (un seul objet), sans markdown, sans texte autour.",
                "- Ne jamais inventer un bloc. Choisir uniquement parmi `availableBlocks`.",
                "- `plan.blocks` est une liste ordonnée de blocs {category, slug, title, content?, props?}.",
                "- Utilise `maxUi.pattern.sections` comme guide d'ordre (si possible).",
                "- Maximum 10 blocs.",
                "- Pas de secrets.",
                "- Si `maxUi.designSystem` existe, respecte le style (couleurs/typo/effets) et ajoute du contenu cohérent dans les blocks pilotables.",
                "",
                "Préférences (MVP, pour voir l'impact du contenu) :",
                "- Pour la section hero, préfère `hero/hero-1` si disponible.",
                "- Pour la section features, préfère `features/feature-51` si disponible.",
                "- Pour la section pricing, préfère `pricing/pricing-9` si disponible.",
                "",
                "Blocks pilotables (content) :",
                "- hero/hero-1 : {headline, description, primaryCtaText, primaryCtaHref, secondaryCtaText, secondaryCtaHref, bullets[]}",
                "- features/feature-51 : {features:[{heading, description, icon?, isDefault?}]}",
                "- pricing/pricing-9 : {title, subtitle, ctaLabel, tiers:[{name, price, annualPrice, description}]}",
                "",
                "Schéma attendu :",
                "{",
                '  "plan": {',
                '    "blocks": [{"category":"hero","slug":"hero-1","title":"Hero 1","content":{"headline":"...","description":"..."}}],',
                '    "notes": ["..."]',
                "  }",
                "}",
            ]
        )

        user_prompt = json.dumps(
            {
                "brief": brief,
                "page": page_export,
                "maxUi": max_ui.model_dump(by_alias=True),
                "availableBlocks": [b.model_dump() for b in available],
                "constraints": {"maxBlocks": 10},
            },
            ensure_ascii=False,
            indent=2,
        )

        llm_payload = {
            "model": model,
            "temperature": 0.0,
            "max_tokens": 900,
            "messages": [
                {"role": "system", "content": sys},
                {"role": "user", "content": user_prompt},
            ],
        }

        plan_obj: dict[str, Any] | None = None
        try:
            raw = await chat_completions_json(api_key, llm_payload)
            content = (((raw.get("choices") or [{}])[0]).get("message") or {}).get("content") or ""
            plan_obj = _json_extract_first_object(str(content))
        except OpenRouterError as exc:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc
        except Exception:
            plan_obj = None

        # Validate + coerce.
        plan_blocks: list[SuggestedBlock] = []
        plan_notes: list[str] = []
        if isinstance(plan_obj, dict):
            p = plan_obj.get("plan")
            if isinstance(p, dict):
                raw_blocks = p.get("blocks")
                if isinstance(raw_blocks, list):
                    for it in raw_blocks[:10]:
                        if not isinstance(it, dict):
                            continue
                        cat = str(it.get("category") or "").strip()
                        slug = str(it.get("slug") or "").strip()
                        title = str(it.get("title") or "").strip()
                        if not (cat and slug and title):
                            continue
                        if (cat, slug) not in allowed_set:
                            continue
                        content, props = _sanitize_block_payload(cat, slug, it.get("content"), it.get("props"))
                        plan_blocks.append(SuggestedBlock(category=cat, slug=slug, title=title, content=content, props=props))
                raw_notes = p.get("notes")
                if isinstance(raw_notes, list):
                    plan_notes = [str(n) for n in raw_notes if str(n).strip()][:10]

        if not plan_blocks:
            fallback = _website_fallback_plan(available, pattern)
            return SuggestWebsiteStructureResponse(maxUi=max_ui, plan=fallback)

        return SuggestWebsiteStructureResponse(
            maxUi=max_ui,
            plan=WebsiteStructurePlan(blocks=plan_blocks, notes=plan_notes),
        )

    # Webapp
    query = _build_query(brief, extra="webapp backoffice dashboard")
    design_system, design_system_md, ds_pattern, ds_notes = _build_design_system("webapp", query)
    pattern = ds_pattern or _choose_pattern("webapp", query)
    max_ui = MaxUiHint(
        query=query,
        pattern=pattern,
        notes=ds_notes,
        designSystem=design_system,
        designSystemMarkdown=design_system_md,
    )

    specs_dir = ensure_llm_specs_dir()
    app_path = specs_dir / "app.json"
    app_spec_raw: dict[str, Any] | None = None
    if app_path.exists():
        try:
            app_spec_raw = json.loads(app_path.read_text(encoding="utf-8"))
        except Exception:
            app_spec_raw = None

    sys = "\n".join(
        [
            "Tu es “Pilot Orchestrator”. Tu dois proposer une structure de webapp (pages + navigation) en choisissant UNIQUEMENT des templates existants.",
            "",
            "Règles strictes :",
            "- Output STRICT JSON (un seul objet), sans markdown, sans texte autour.",
            "- Ne jamais inventer un template. Choisir uniquement parmi `availableTemplates`.",
            "- `plan.pages` reprend les pages existantes de `currentAppSpec` (mêmes ids) et peut ajuster: enabled, templateId, objective, description, successCriteria.",
            "- `plan.navigationPageIds` est une liste ordonnée d'ids de pages (doit exister). Ne mets pas les pages fixed: '/', '/settings', '/aide'.",
            "- Maximum 12 pages dans la navigation.",
            "- Pas de secrets.",
            "- Si `maxUi.designSystem` existe, respecte le style (cohérence, accessibilité, simplicité).",
            "",
            "Schéma attendu :",
            "{",
            '  "plan": {',
            '    "navigationPageIds": ["page_users","page_jobs"],',
            '    "pages": [{"id":"page_users","enabled":true,"templateId":"users-table","objective":"...","description":"...","successCriteria":["..."]}],',
            '    "notes": ["..."]',
            "  }",
            "}",
        ]
    )

    user_prompt = json.dumps(
        {
            "brief": brief,
            "maxUi": max_ui.model_dump(by_alias=True),
            "availableTemplates": [t.model_dump() for t in payload.available_templates],
            "currentAppSpec": app_spec_raw,
            "constraints": {"maxNav": 12},
        },
        ensure_ascii=False,
        indent=2,
    )

    llm_payload = {
        "model": model,
        "temperature": 0.0,
        "max_tokens": 1100,
        "messages": [
            {"role": "system", "content": sys},
            {"role": "user", "content": user_prompt},
        ],
    }

    plan_obj: dict[str, Any] | None = None
    try:
        raw = await chat_completions_json(api_key, llm_payload)
        content = (((raw.get("choices") or [{}])[0]).get("message") or {}).get("content") or ""
        plan_obj = _json_extract_first_object(str(content))
    except OpenRouterError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc
    except Exception:
        plan_obj = None

    allowed_templates = {t.id for t in payload.available_templates}
    current_pages_by_id: dict[str, Any] = {}
    if isinstance(app_spec_raw, dict):
        for p in (app_spec_raw.get("pages") or []):
            if isinstance(p, dict) and str(p.get("id") or "").strip():
                current_pages_by_id[str(p["id"])] = p

    nav_ids: list[str] = []
    pages_out: list[WebappStructurePagePlan] = []
    notes: list[str] = []

    if isinstance(plan_obj, dict):
        p = plan_obj.get("plan")
        if isinstance(p, dict):
            raw_nav = p.get("navigationPageIds")
            if isinstance(raw_nav, list):
                nav_ids = [str(x) for x in raw_nav if str(x).strip()][:12]
            raw_pages = p.get("pages")
            if isinstance(raw_pages, list):
                for it in raw_pages:
                    if not isinstance(it, dict):
                        continue
                    page_id = str(it.get("id") or "").strip()
                    if not page_id:
                        continue
                    base = current_pages_by_id.get(page_id) or {"id": page_id, "title": it.get("title") or page_id, "path": it.get("path") or "/"}
                    template_id = it.get("templateId") if "templateId" in it else base.get("templateId")
                    if template_id is not None and str(template_id).strip() and str(template_id) not in allowed_templates:
                        template_id = base.get("templateId")
                    pages_out.append(
                        WebappStructurePagePlan(
                            id=page_id,
                            title=str(it.get("title") or base.get("title") or page_id),
                            path=str(it.get("path") or base.get("path") or "/"),
                            enabled=bool(it.get("enabled", True)),
                            templateId=str(template_id) if template_id is not None else None,
                            objective=(str(it.get("objective") or "").strip() or None),
                            description=(str(it.get("description") or "").strip() or None),
                            successCriteria=[str(x) for x in (it.get("successCriteria") or []) if str(x).strip()][:10],
                        )
                    )
            raw_notes = p.get("notes")
            if isinstance(raw_notes, list):
                notes = [str(n) for n in raw_notes if str(n).strip()][:10]

    # Ensure pages are unique by id (keep first)
    uniq_pages: dict[str, WebappStructurePagePlan] = {}
    for p in pages_out:
        if p.id not in uniq_pages:
            uniq_pages[p.id] = p

    # Keep nav ids that exist in current spec
    nav_ids = [i for i in nav_ids if i in current_pages_by_id]

    plan = WebappStructurePlan(navigationPageIds=nav_ids, pages=list(uniq_pages.values()), notes=notes)
    return SuggestWebappStructureResponse(maxUi=max_ui, plan=plan)
