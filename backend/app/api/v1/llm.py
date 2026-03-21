from __future__ import annotations

import json
from pathlib import Path
from typing import Annotated, Any

from datetime import datetime, timezone
import os
import zipfile

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.core.crypto import decrypt_secret, encrypt_secret
from app.core.llm_specs import ensure_llm_specs_dir
from app.core.openrouter import OpenRouterError, chat_completions_json, list_models
from app.models.llm_user_setting import LlmUserSetting
from app.models.user import User
from app.schemas.llm import (
    GenerateApplyRequest,
    GeneratePreviewRequest,
    GeneratePreviewResponse,
    LlmPackGenerateResponse,
    LlmPackPrecheckResponse,
    LlmSettingsRead,
    LlmSettingsUpdate,
    OpenRouterModelItem,
    OpenRouterModelsResponse,
    OpenRouterProviderGroup,
)

router = APIRouter()
DBSession = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]


ALLOWED_OUTPUT_FILES = {"PRD.md", "QUESTIONS_RECOMMENDATIONS.md", "SEO_GEO.md"}
PACK_ALLOWED_PREFIXES = {"api/", "docs/", "prompts/", "repo/", "specs/", "templates/"}


def _get_or_create_settings(db: Session, user_id) -> LlmUserSetting:
    settings = db.query(LlmUserSetting).filter(LlmUserSetting.user_id == user_id).first()
    if settings:
        return settings
    settings = LlmUserSetting(user_id=user_id)
    db.add(settings)
    db.commit()
    db.refresh(settings)
    return settings


def _get_api_key_or_400(settings: LlmUserSetting) -> str:
    if not settings.openrouter_api_key_encrypted:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OpenRouter key not configured")
    try:
        return decrypt_secret(settings.openrouter_api_key_encrypted)
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Cannot decrypt OpenRouter key")


def _group_models(items: list[dict[str, Any]]) -> OpenRouterModelsResponse:
    by_provider: dict[str, list[OpenRouterModelItem]] = {}
    for it in items:
        model_id = str(it.get("id") or "").strip()
        if not model_id:
            continue
        name = it.get("name")
        provider = model_id.split("/", 1)[0] if "/" in model_id else "other"
        by_provider.setdefault(provider, []).append(OpenRouterModelItem(id=model_id, name=str(name) if name else None))

    providers = []
    for provider in sorted(by_provider.keys()):
        models = sorted(by_provider[provider], key=lambda m: (m.name or "", m.id))
        providers.append(OpenRouterProviderGroup(provider=provider, models=models))

    return OpenRouterModelsResponse(providers=providers)


@router.get("/llm/settings", response_model=LlmSettingsRead, tags=["llm"])
def read_llm_settings(db: DBSession, user: CurrentUser):
    settings = _get_or_create_settings(db, user.id)
    return LlmSettingsRead(
        hasOpenRouterApiKey=bool(settings.openrouter_api_key_encrypted),
        openRouterModel=settings.openrouter_model,
    )


@router.put("/llm/settings", response_model=LlmSettingsRead, tags=["llm"])
def upsert_llm_settings(payload: LlmSettingsUpdate, db: DBSession, user: CurrentUser):
    settings = _get_or_create_settings(db, user.id)

    fields = payload.model_fields_set
    if "openrouter_api_key" in fields:
        raw = (payload.openrouter_api_key or "").strip()
        if not raw:
            settings.openrouter_api_key_encrypted = None
        else:
            try:
                settings.openrouter_api_key_encrypted = encrypt_secret(raw)
            except Exception as exc:
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc

    if "openrouter_model" in fields:
        settings.openrouter_model = (payload.openrouter_model or "").strip() or None

    db.commit()
    db.refresh(settings)
    return LlmSettingsRead(
        hasOpenRouterApiKey=bool(settings.openrouter_api_key_encrypted),
        openRouterModel=settings.openrouter_model,
    )


@router.get("/llm/openrouter/models", response_model=OpenRouterModelsResponse, tags=["llm"])
async def openrouter_models(db: DBSession, user: CurrentUser):
    settings = _get_or_create_settings(db, user.id)
    api_key = _get_api_key_or_400(settings)
    try:
        items = await list_models(api_key)
    except OpenRouterError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc
    return _group_models(items)


def _read_json_file(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def _build_instructor_user_prompt(db: Session, project_brief: dict[str, Any]) -> str:
    # Keep this prompt concise and deterministic; the system prompt controls behavior.
    # Inputs are embedded as JSON for fidelity.
    specs_dir = ensure_llm_specs_dir()
    app_path = specs_dir / "app.json"
    brief_text = json.dumps(project_brief, ensure_ascii=False, indent=2)

    app_text = None
    if app_path.exists():
        try:
            app_text = json.dumps(_read_json_file(app_path), ensure_ascii=False, indent=2)
        except Exception:
            app_text = None

    from app.main import app as fastapi_app

    openapi_text = json.dumps(fastapi_app.openapi(), ensure_ascii=False, indent=2)

    # Website pages live in DB (site_pages).
    # We reuse the ORM model so we don't depend on HTTP calls.
    from app.models.site_page import SitePage

    pages = db.query(SitePage).order_by(SitePage.parent_id.is_(None).desc(), SitePage.parent_id, SitePage.nav_order, SitePage.title).all()
    site_pages = [
        {
            "slug": p.slug,
            "title": p.title,
            "is_home": p.is_home,
            "status": p.status,
            "show_in_nav": p.show_in_nav,
            "nav_order": p.nav_order,
            "objective": p.objective,
            "expected_action": p.expected_action,
            "key_messages": p.key_messages or [],
            "facts": p.facts,
            "blocks": p.blocks or [],
        }
        for p in pages
    ]
    site_text = json.dumps(site_pages, ensure_ascii=False, indent=2)

    parts = [
        "# Inputs (JSON)",
        "",
        "## project-brief.json",
        "```json",
        brief_text,
        "```",
        "",
        "## openapi.json",
        "```json",
        openapi_text,
        "```",
        "",
        "## site-pages (DB export)",
        "```json",
        site_text,
        "```",
    ]

    if app_text:
        parts.extend(
            [
                "",
                "## app.json",
                "```json",
                app_text,
                "```",
            ]
        )

    return "\n".join(parts)


INSTRUCTOR_SYSTEM_PROMPT = """Tu es “Pilot Instructor”. Tu génères des documents Markdown de cadrage projet à partir de fichiers fournis (brief, pages, objectifs, descriptions, OpenAPI, architecture).

Règles strictes :
- Tu écris en français clair, compréhensible par un débutant.
- Tu utilises toujours le nom du projet tel qu’indiqué dans le brief (`title`) quand tu parles du site/de l’application de l’utilisateur.
- Tu ne modifies jamais le code applicatif et tu ne donnes jamais de patch.
- Tu n’inventes pas de faits. Si une information manque, écris “À confirmer”.
- Tu privilégies la simplicité, la rapidité et la robustesse. Pas de surenchère technologique.
- Tu ne proposes pas d’intégrations externes (paiement, Stripe, etc.) sauf si c’est explicitement demandé dans le brief.
- Pilot (MVP) ne fournit pas “clé en main” un site e‑commerce complet (pages produit, panier, checkout). Si le brief parle d’e‑commerce, note-le comme une extension à faire ensuite avec le LLM codeur.
- Tu n’inclus jamais de secrets (clés API, mots de passe). Si un secret apparaît dans les entrées, demande sa suppression.
- Tu ne poses pas de questions à l’utilisateur dans une conversation : tu écris des documents et tu mets les questions dans `QUESTIONS_RECOMMENDATIONS.md`.

Sortie obligatoire (format strict JSON, un seul objet) :
{
  "files": [
    {"path": "PRD.md", "content": "..."},
    {"path": "QUESTIONS_RECOMMENDATIONS.md", "content": "..."},
    {"path": "SEO_GEO.md", "content": "..."}
  ]
}

Contraintes sur `path` :
- uniquement et exactement : `PRD.md`, `QUESTIONS_RECOMMENDATIONS.md`, `SEO_GEO.md`.

Contenu attendu :
1) `PRD.md`
- Résumé du projet (public, but, ton/style)
- Pages (site ou webapp) : pour chaque page, reprendre Objectif + Description + Critères si dispo
- Flux principaux (déduits uniquement des descriptions, sinon “À confirmer”)
- Exigences non fonctionnelles : responsive, accessibilité de base, performance raisonnable
- Sections “À confirmer” si manque d’info

2) `QUESTIONS_RECOMMENDATIONS.md`
- Questions à trancher AVANT plan, classées en 3 sections : Global / Par page / SEO-GEO
- Pour chaque question : Recommandation (simple/rapide/robuste) + 1 alternative + justification courte (2–4 lignes)
- Ne pas demander d’intégrations non mentionnées.

3) `SEO_GEO.md`
- Checklist complète SEO/GEO adaptée au projet :
  titles/descriptions, OpenGraph/Twitter, canonical, sitemap/robots, JSON-LD (Organization/WebSite + Article si blog + FAQPage si FAQ),
  structure Hn, alt, maillage interne, pages légales
- Marquer “À confirmer” si des infos factuelles manquent.
"""


def _read_text_or_500(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Cannot read {path}: {exc}") from exc


def _shared_specs_dir() -> Path:
    # Mounted in docker-compose.yml as read-only (preferred), but allow override.
    return Path(os.environ.get("PILOT_SHARED_SPECS_DIR", "/pilot_shared_specs")).resolve()


def _docs_dir() -> Path:
    return Path(os.environ.get("PILOT_DOCS_DIR", "/pilot_docs")).resolve()


def _pack_static_architecture_stack_md() -> str:
    return "\n".join(
        [
            "# Architecture Pilot (résumé)",
            "",
            "Pilot = FastAPI + Postgres + Next.js App Router + Tailwind + shadcn/ui.",
            "",
            "## Backend",
            "- Entrée : `backend/app/main.py`",
            "- API : `backend/app/api/v1/*` (préfixe `/api/v1/...`)",
            "- DB : SQLAlchemy + Alembic (`backend/alembic/`)",
            "",
            "## Frontend",
            "- App Router : `frontend/app/`",
            "- Dashboard/admin : `frontend/app/(dashboard)/...`",
            "- Website public : `frontend/app/(marketing)/site/...`",
            "- Proxy API : `/api/v1/*` via `frontend/next.config.js` (rewrites)",
            "",
            "## Source de vérité",
            "- Webapp : `llm_specs/app.json` (API `/api/v1/app/spec`)",
            "- Brief projet : `llm_specs/project-brief.json` (API `/api/v1/project/brief`)",
            "- Website : pages en DB via `/api/v1/site/pages` (builder `/builder/landing`)",
            "",
        ]
    ) + "\n"


def _pack_static_bloc_externe_format_md() -> str:
    return "\n".join(
        [
            "# Format attendu pour fournir un bloc externe (shadcn)",
            "",
            "Si aucun bloc existant ne convient, tu peux fournir un bloc externe au LLM codeur au format ci-dessous.",
            "",
            "## 1) Source",
            "- Lien : <URL du bloc>",
            "",
            "## 2) Installation (si disponible)",
            "- Commande : `npx ...`",
            "",
            "## 3) Dépendances",
            "- Liste des dépendances + commandes d’installation",
            "",
            "## 4) Code",
            "- Colle le composant TSX complet (et les fichiers annexes si nécessaires).",
            "",
            "## 5) Notes",
            "- Images/ressources nécessaires, variantes, contraintes d’utilisation.",
            "",
            "Note : inspire-toi du format des fichiers dans `shared/blocks/*.txt`.",
            "",
        ]
    ) + "\n"


def _pack_static_agents_append_md() -> str:
    return "\n".join(
        [
            "# Ajout recommandé dans AGENTS.md (après accord explicite)",
            "",
            "- Aucune modification de code sans validation explicite de l’utilisateur.",
            "- Répondre en français simple (débutant).",
            "- Pas de surenchère technologique : privilégier simplicité/rapidité/robustesse.",
            "- Workflow : compréhension → questions → plan → attendre “Je valide” → implémentation.",
            "- Responsive d’abord (mobile-first). Pas “application mobile”.",
            "- Backend : routes sous `/api/v1`, migrations Alembic pour toute évolution DB.",
            "",
        ]
    ) + "\n"


def _pack_prompt_runbook() -> str:
    return "\n".join(
        [
            "# RUNBOOK (ordre d’exécution des prompts)",
            "",
            "Objectif : exécuter le LLM codeur en 3 étapes, sans qu’il enchaîne tout seul.",
            "",
            "1) Étape 1/3 — Compréhension",
            "- Envoie exactement `prompts/00_prompt_general.md`.",
            "",
            "2) Étape 2/3 — Questions + recommandations",
            "- Envoie exactement `prompts/10_prompt_questions.md`.",
            "",
            "3) Tu réponds aux questions",
            "",
            "4) Étape 3/3 — Plan + STOP",
            "- Envoie exactement `prompts/20_prompt_plan_gate.md`.",
            "- Le LLM doit demander “Je valide” puis s’arrêter.",
            "",
            "Après “Je valide” seulement : tu peux lancer l’implémentation (hors de ces prompts).",
            "",
        ]
    ) + "\n"


def _pack_prompt_00() -> str:
    return "\n".join(
        [
            "Tu es un LLM codeur (type Codex CLI). Tu travailles sur Pilot (FastAPI + Next.js + Tailwind + composants shadcn).",
            "",
            "Objectif (Étape 1/3) : analyser le projet de l’utilisateur et la stack, puis produire une compréhension claire + des pistes d’amélioration, sans poser toutes les questions ni faire le plan (ces étapes viennent après).",
            "",
            "Important : quand tu parles du produit/site/app de l’utilisateur, utilise toujours le nom du projet indiqué dans `specs/project-brief.json` (`title`).",
            "",
            "Règles impératives :",
            "- Réponds en français simple (débutant).",
            "- Pas de surenchère technologique.",
            "- Responsive d’abord (mobile-first). Pas “application mobile”.",
            "- Ne modifie aucun fichier tant que je n’ai pas écrit exactement : “Je valide”.",
            "- Ne propose pas d’intégrations externes non demandées explicitement.",
            "",
            "À lire en priorité (dans le pack) :",
            "- `prompts/README.md` (ordre des étapes)",
            "- `specs/project-brief.json`",
            "- `specs/app-spec.json` (si présent)",
            "- `specs/site-pages.json` (si présent)",
            "- `api/openapi.json`",
            "- `docs/PRD.md`",
            "- `docs/ARCHITECTURE_STACK.md`",
            "- `docs/SEO_GEO.md` (si présent)",
            "- `docs/QUESTIONS_RECOMMENDATIONS.md` (si présent)",
            "",
            "Ensuite, analyse le codebase du repo pour comprendre l’architecture (frontend / backend / API / DB / migrations) et repérer où se feront les modifications quand ce sera validé.",
            "",
            "Output attendu maintenant (sans proposer de code, sans patch) :",
            "1) “Voici ce que j’ai compris”",
            "   - Résume le type de projet (site ou webapp), le public, l’objectif, le ton/style, et la liste des pages.",
            "2) “Où je vais travailler dans le repo”",
            "   - Liste les dossiers/fichiers pertinents (frontend, backend, DB/migrations) que tu utiliseras plus tard.",
            "3) “Voici ce que je pense qu’on pourrait améliorer” (recommandations)",
            "   - Propose des améliorations recommandées, priorisées, qui privilégient simplicité/rapidité/robustesse.",
            "   - Pour un site : structure des pages, cohérence du contenu, blocs manquants possibles (en priorité via blocs existants), responsive, SEO/GEO.",
            "   - Pour une webapp : cohérence des pages, données/écrans à prévoir, points d’attention UX, endpoints probables à créer (sans les coder).",
            "4) “Ce qui manque pour être certain”",
            "   - Liste courte (max 5–10) de points ambigus/absents que tu devras clarifier ensuite.",
            "",
            "Important :",
            "- Ne pas enchaîner sur l’étape 2/3 ni 3/3 dans cette réponse.",
            "- Ne demande pas “Je valide” ici.",
            "",
            "(Étape 1/3 — n’exécute pas les étapes 2/3 et 3/3.)",
            "",
        ]
    )


def _pack_prompt_10() -> str:
    return "\n".join(
        [
            "Tu es un LLM codeur (type Codex CLI). Étape 2/3 : poser les questions à trancher AVANT plan, avec recommandations.",
            "",
            "Important : utilise toujours le nom du projet indiqué dans `specs/project-brief.json` (`title`) quand tu parles du produit/site/app de l’utilisateur.",
            "",
            "Règles impératives :",
            "- Réponds en français simple (débutant).",
            "- Pas de surenchère technologique.",
            "- Responsive d’abord (mobile-first). Pas “application mobile”.",
            "- Ne modifie aucun fichier tant que je n’ai pas écrit exactement : “Je valide”.",
            "- Ne propose pas d’intégrations externes non demandées explicitement.",
            "",
            "Contexte à lire en priorité (dans le pack) :",
            "- `specs/project-brief.json`",
            "- `specs/app-spec.json` (si présent)",
            "- `specs/site-pages.json` (si présent)",
            "- `docs/PRD.md`",
            "- `docs/QUESTIONS_RECOMMENDATIONS.md` (si présent) → utilise-le comme base, complète si nécessaire",
            "- `docs/SEO_GEO.md` (si présent)",
            "",
            "Tâche :",
            "1) Écris “Voici ce que j’ai compris” (max ~10 bullets).",
            "",
            "2) Liste ensuite les questions à trancher avec des recommandations optimisées privilégiant la simplicité, la rapidité et la robustesse, AVANT plan, en 3 sections :",
            "- A. Questions globales",
            "- B. Questions par page",
            "- C. Questions SEO / GEO",
            "",
            "Format obligatoire pour CHAQUE question :",
            "- Question",
            "- Recommandation (conseillée)",
            "- Alternative",
            "- Pourquoi (2–4 lignes max)",
            "",
            "Consignes :",
            "- WEBAPP : base-toi sur Objectif / Description / Critères par page. Pose des questions pratiques (données, actions, règles, droits, validations, états UI). Donne une recommandation MVP si l’utilisateur ne sait pas.",
            "- SITE WEB : base-toi sur les blocs existants. Tu peux recommander des blocs/pages si utile, en priorité via les blocs déjà présents. Si un bloc externe est nécessaire, demander le format `docs/bloc-externe-format.md`.",
            "- SEO/GEO : poser les questions nécessaires (titles/descriptions, OG, canonical, sitemap/robots, JSON-LD, Hn, alt, maillage, pages légales, FAQ). Proposer une recommandation par défaut si info manquante.",
            "",
            "Fin obligatoire :",
            "“Réponds à ces questions, puis je prépare un plan. Je ne modifierai aucun fichier avant ‘Je valide’.”",
            "Ne pas enchaîner sur l’étape 3/3.",
            "",
        ]
    )


def _pack_prompt_20() -> str:
    return "\n".join(
        [
            "Tu es un LLM codeur (type Codex CLI). Étape 3/3 : produire un plan détaillé, puis demander “Je valide” et s’arrêter.",
            "",
            "Important : utilise toujours le nom du projet indiqué dans `specs/project-brief.json` (`title`) quand tu parles du produit/site/app de l’utilisateur.",
            "",
            "Règles impératives :",
            "- Réponds en français simple (débutant).",
            "- Pas de surenchère technologique.",
            "- Responsive d’abord (mobile-first). Pas “application mobile”.",
            "- Ne modifie aucun fichier tant que je n’ai pas écrit exactement : “Je valide”.",
            "",
            "Tâche :",
            "- Produis un plan de développement détaillé en phases :",
            "  1) Frontend (pages, composants, branchements API, états UI)",
            "  2) Backend (routes `/api/v1`, logique métier, auth si nécessaire)",
            "  3) Base de données (tables + migrations Alembic si nécessaire)",
            "  4) Contrats API (OpenAPI + payloads + erreurs)",
            "  5) SEO/GEO (metadata, OG, canonical, sitemap, robots, JSON-LD, Hn, alt, maillage, pages légales, FAQ)",
            "  6) Tests (commandes Docker + scénario de vérification)",
            "",
            "Contraintes :",
            "- Plan concret : mentionne les dossiers/fichiers à toucher, endpoints, commandes de test.",
            "- Pas de code, pas de patch dans cette étape.",
            "",
            "Fin obligatoire :",
            "Demande à l’utilisateur d’écrire exactement : Je valide",
            "Puis écris : “J’attends ‘Je valide’ pour commencer à modifier le code.” et STOP.",
            "",
        ]
    )


def _pack_readme_md() -> str:
    return "\n".join(
        [
            "# Aurora agent pack",
            "",
            "Ce ZIP contient les specs et références nécessaires pour qu’un agent LLM puisse adapter le projet.",
            "",
            "## Contenu",
            "- `specs/app-spec.json` : spec webapp (runtime).",
            "- `specs/site-pages.json` : pages website (runtime).",
            "- `specs/site-landing.json` : page home (runtime, si dispo).",
            "- `specs/ui-library.json` : bibliothèque composants choisie.",
            "- `specs/project-brief.json` : brief projet (wizard) pour guider un LLM.",
            "- `specs/ui-manifest.json` + `specs/theme.json` : source de vérité (fichiers).",
            "- `api/openapi.json` : OpenAPI du backend.",
            "- `docs/` : PRD + docs d’architecture + SEO/GEO.",
            "- `prompts/` : prompts pour LLM codeur (runbook + étapes 1/2/3).",
            "- `templates/` : snippets à intégrer (AGENTS).",
            "",
        ]
    ) + "\n"


def _validate_pack_relpath(rel: str) -> None:
    if rel == "README.md":
        return
    if not any(rel.startswith(p) for p in PACK_ALLOWED_PREFIXES):
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Invalid pack path: {rel}")
    if ".." in Path(rel).parts:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Invalid pack path: {rel}")


def _pack_precheck(db: Session, user: User, project_brief: dict[str, Any]) -> list[str]:
    warnings: list[str] = []

    title = str(project_brief.get("title") or "").strip()
    one = str(project_brief.get("oneLiner") or "").strip()
    goal = str(project_brief.get("primaryGoal") or "").strip()
    project_type = str(project_brief.get("projectType") or "").strip()

    if not title:
        warnings.append("Brief : le nom du projet est vide.")
    if not one:
        warnings.append("Brief : le résumé en 1 phrase est vide.")
    if not goal:
        warnings.append("Brief : le but principal est vide.")

    specs_dir = ensure_llm_specs_dir()

    if project_type == "webapp":
        app_path = specs_dir / "app.json"
        if not app_path.exists():
            warnings.append("Webapp : `llm_specs/app.json` est manquant (builder webapp non rempli).")
        else:
            try:
                app = _read_json_file(app_path)
                pages = app.get("pages") or []
                if isinstance(pages, list):
                    for p in pages:
                        if not isinstance(p, dict):
                            continue
                        p_title = str(p.get("title") or p.get("id") or "page").strip()
                        if not str(p.get("objective") or "").strip():
                            warnings.append(f"Webapp : objectif manquant sur la page “{p_title}”.")
                        if not str(p.get("description") or "").strip():
                            warnings.append(f"Webapp : description manquante sur la page “{p_title}”.")
            except Exception:
                warnings.append("Webapp : `llm_specs/app.json` est invalide.")

    if project_type == "website":
        from app.models.site_page import SitePage

        pages = db.query(SitePage).order_by(SitePage.nav_order, SitePage.title).all()
        if not pages:
            warnings.append("Website : aucune page trouvée (builder website non rempli).")
        for p in pages:
            if not (p.objective or "").strip():
                warnings.append(f"Website : objectif manquant sur la page “{p.title}”.")
            if not (p.expected_action or "").strip():
                warnings.append(f"Website : CTA manquant sur la page “{p.title}”.")
            if not (p.key_messages or []):
                warnings.append(f"Website : messages essentiels vides sur la page “{p.title}”.")

    return warnings


def _pack_collect_files(db: Session, user: User) -> tuple[dict[str, bytes], list[str]]:
    specs_dir = ensure_llm_specs_dir()
    brief_path = specs_dir / "project-brief.json"
    if not brief_path.exists():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing llm_specs/project-brief.json")

    project_brief = _read_json_file(brief_path)
    warnings = _pack_precheck(db, user, project_brief)

    # Read DB exports.
    from app.models.site_page import SitePage
    from app.models.ui_library import UiLibrary
    from app.main import app as fastapi_app

    site_pages = db.query(SitePage).order_by(SitePage.parent_id.is_(None).desc(), SitePage.parent_id, SitePage.nav_order, SitePage.title).all()
    site_pages_export = [
        {
            "slug": p.slug,
            "title": p.title,
            "is_home": p.is_home,
            "status": p.status,
            "show_in_nav": p.show_in_nav,
            "nav_order": p.nav_order,
            "objective": p.objective,
            "expected_action": p.expected_action,
            "key_messages": p.key_messages or [],
            "facts": p.facts,
            "blocks": p.blocks or [],
        }
        for p in site_pages
    ]
    home_page = next((p for p in site_pages_export if p.get("is_home")), site_pages_export[0] if site_pages_export else None)

    ui_library = db.query(UiLibrary).filter(UiLibrary.user_id == user.id).first()
    ui_library_export = {"component_keys": (ui_library.component_keys if ui_library else [])}

    openapi = fastapi_app.openapi()

    # Read shared/specs files (mounted).
    shared_specs = _shared_specs_dir()
    ui_manifest_path = shared_specs / "ui-manifest.json"
    theme_path = shared_specs / "theme.json"
    schema_dir = shared_specs / "schema"
    docs_dir = _docs_dir()

    pack: dict[str, bytes] = {}
    pack["README.md"] = _pack_readme_md().encode("utf-8")

    # Specs.
    pack["specs/project-brief.json"] = (json.dumps(project_brief, indent=2, ensure_ascii=False) + "\n").encode("utf-8")
    app_path = specs_dir / "app.json"
    if app_path.exists():
        pack["specs/app-spec.json"] = (json.dumps(_read_json_file(app_path), indent=2, ensure_ascii=False) + "\n").encode("utf-8")
    pack["specs/site-pages.json"] = (json.dumps(site_pages_export, indent=2, ensure_ascii=False) + "\n").encode("utf-8")
    pack["specs/site-landing.json"] = (json.dumps(home_page, indent=2, ensure_ascii=False) + "\n").encode("utf-8")
    pack["specs/ui-library.json"] = (json.dumps(ui_library_export, indent=2, ensure_ascii=False) + "\n").encode("utf-8")

    if ui_manifest_path.exists():
        pack["specs/ui-manifest.json"] = (_read_text_or_500(ui_manifest_path).rstrip() + "\n").encode("utf-8")
    if theme_path.exists():
        pack["specs/theme.json"] = (_read_text_or_500(theme_path).rstrip() + "\n").encode("utf-8")
    if schema_dir.exists():
        for f in sorted(schema_dir.glob("*.json")):
            rel = f"specs/schema/{f.name}"
            pack[rel] = (_read_text_or_500(f).rstrip() + "\n").encode("utf-8")

    # API.
    pack["api/openapi.json"] = (json.dumps(openapi, indent=2, ensure_ascii=False) + "\n").encode("utf-8")

    # Docs: from generated if present.
    generated_dir = specs_dir / "generated"
    prd = (generated_dir / "PRD.md")
    questions = (generated_dir / "QUESTIONS_RECOMMENDATIONS.md")
    seo = (generated_dir / "SEO_GEO.md")
    if prd.exists():
        pack["docs/PRD.md"] = (_read_text_or_500(prd).rstrip() + "\n").encode("utf-8")
    else:
        pack["docs/PRD.md"] = "# PRD\n\n(\u00c0 g\u00e9n\u00e9rer)\n".encode("utf-8")
    if questions.exists():
        pack["docs/QUESTIONS_RECOMMENDATIONS.md"] = (_read_text_or_500(questions).rstrip() + "\n").encode("utf-8")
    if seo.exists():
        pack["docs/SEO_GEO.md"] = (_read_text_or_500(seo).rstrip() + "\n").encode("utf-8")

    pack["docs/ARCHITECTURE_STACK.md"] = _pack_static_architecture_stack_md().encode("utf-8")
    pack["docs/bloc-externe-format.md"] = _pack_static_bloc_externe_format_md().encode("utf-8")

    # Prompts + rules (read from docs mount when available).
    prompts_md = docs_dir / "PROMPTS.md"
    project_rules_md = docs_dir / "PROJECT_RULES.md"
    if prompts_md.exists():
        pack["prompts/prompts.md"] = (_read_text_or_500(prompts_md).rstrip() + "\n").encode("utf-8")
    else:
        pack["prompts/prompts.md"] = b"# Prompts\n\n"
    if project_rules_md.exists():
        pack["prompts/project-rules.md"] = (_read_text_or_500(project_rules_md).rstrip() + "\n").encode("utf-8")
    else:
        pack["prompts/project-rules.md"] = b"# Project rules\n\n"

    pack["prompts/README.md"] = _pack_prompt_runbook().encode("utf-8")
    pack["prompts/00_prompt_general.md"] = _pack_prompt_00().encode("utf-8")
    pack["prompts/10_prompt_questions.md"] = _pack_prompt_10().encode("utf-8")
    pack["prompts/20_prompt_plan_gate.md"] = _pack_prompt_20().encode("utf-8")

    # Templates.
    pack["templates/agents_append.md"] = _pack_static_agents_append_md().encode("utf-8")

    # Repo references.
    pack["repo/references.json"] = (
        json.dumps(
            {
                "repoRoot": "Aurora_stack",
                "generatedAt": datetime.now(timezone.utc).isoformat(),
                "importantPaths": [
                    "docs/PROJECT_RULES.md",
                    "docs/PROMPTS.md",
                    "shared/specs/ui-manifest.json",
                    "shared/specs/theme.json",
                    "llm_specs/project-brief.json",
                    "llm_specs/generated/PRD.md",
                    "llm_specs/generated/QUESTIONS_RECOMMENDATIONS.md",
                    "llm_specs/generated/SEO_GEO.md",
                    "frontend/components/ui/",
                    "frontend/app/(dashboard)/builder/app/page.tsx",
                    "frontend/app/(dashboard)/builder/landing/page.tsx",
                    "frontend/app/(dashboard)/builder/brief/page.tsx",
                    "frontend/app/(dashboard)/ui/components/page.tsx",
                    "frontend/blocks/manifest.ts",
                    "shared/blocks/",
                    "backend/app/api/v1/app_spec.py",
                    "backend/app/api/v1/site_pages.py",
                    "backend/app/api/v1/ui_library.py",
                    "backend/app/api/v1/project_brief.py",
                    "backend/app/api/v1/llm.py",
                    "backend/app/core/openrouter.py",
                    "backend/app/core/crypto.py",
                    "api/openapi.json",
                ],
                "notes": [
                    "Le builder webapp travaille sur une spec; l'agent IA doit créer/adapter le code (pages, API) à partir de cette spec.",
                    "Le wizard brief produit `project-brief.json` (sans secrets) pour guider un LLM instructeur/codeur.",
                    "Les docs `llm_specs/generated/*` sont générées via OpenRouter et incluses dans le pack.",
                ],
            },
            indent=2,
            ensure_ascii=False,
        )
        + "\n"
    ).encode("utf-8")

    for rel in pack.keys():
        _validate_pack_relpath(rel)

    return pack, warnings


def _pack_write_to_llm_specs(specs_dir: Path, user: User, pack: dict[str, bytes]) -> tuple[str, Path, Path]:
    pack_id = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    root_global = specs_dir / "pack"
    root_user = root_global / f"user_{user.id}"

    out_dir = root_user / "latest"
    out_zip = root_user / "latest.zip"
    global_dir = root_global / "latest"
    global_zip = root_global / "latest.zip"

    def write_target(target_dir: Path, target_zip: Path) -> None:
        # Overwrite latest directory.
        if target_dir.exists():
            for child in sorted(target_dir.rglob("*"), reverse=True):
                if child.is_file():
                    try:
                        child.unlink()
                    except Exception:
                        pass
                elif child.is_dir():
                    try:
                        child.rmdir()
                    except Exception:
                        pass
        target_dir.mkdir(parents=True, exist_ok=True)

        # Write files to dir.
        for rel, content in pack.items():
            _validate_pack_relpath(rel)
            p = target_dir / rel
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_bytes(content)

        # Write zip.
        target_zip.parent.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(target_zip, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for rel in sorted(pack.keys()):
                zf.writestr(rel, pack[rel])

    # Write both a per-user pack and a convenient global "latest" copy under llm_specs/pack/.
    write_target(out_dir, out_zip)
    write_target(global_dir, global_zip)

    return pack_id, out_dir, out_zip


@router.post("/llm/generate/preview", response_model=GeneratePreviewResponse, tags=["llm"])
async def generate_preview(payload: GeneratePreviewRequest, db: DBSession, user: CurrentUser):
    settings = _get_or_create_settings(db, user.id)
    api_key = _get_api_key_or_400(settings)

    specs_dir = ensure_llm_specs_dir()
    brief_path = specs_dir / "project-brief.json"
    if not brief_path.exists():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing llm_specs/project-brief.json")

    try:
        project_brief = _read_json_file(brief_path)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Invalid project-brief.json: {exc}") from exc

    user_prompt = _build_instructor_user_prompt(db, project_brief)
    req = {
        "model": payload.model,
        "messages": [
            {"role": "system", "content": INSTRUCTOR_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.2,
    }

    try:
        raw = await chat_completions_json(api_key, req)
    except OpenRouterError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc

    try:
        content = raw["choices"][0]["message"]["content"]
    except Exception:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="OpenRouter response missing content")

    try:
        parsed = json.loads(content)
    except Exception:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Instructor did not return valid JSON")

    files = parsed.get("files")
    if not isinstance(files, list):
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Instructor JSON missing files[]")

    normalized = []
    for f in files:
        if not isinstance(f, dict):
            continue
        path = str(f.get("path") or "").strip()
        if path not in ALLOWED_OUTPUT_FILES:
            continue
        content = str(f.get("content") or "")
        normalized.append({"path": path, "content": content})

    if set(x["path"] for x in normalized) != ALLOWED_OUTPUT_FILES:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Instructor output incomplete")

    return GeneratePreviewResponse(files=normalized)


@router.post("/llm/generate/apply", status_code=status.HTTP_204_NO_CONTENT, tags=["llm"])
def generate_apply(payload: GenerateApplyRequest, db: DBSession, user: CurrentUser):
    _ = _get_or_create_settings(db, user.id)
    specs_dir = ensure_llm_specs_dir()
    out_dir = specs_dir / "generated"
    out_dir.mkdir(parents=True, exist_ok=True)

    by_path = {f.path: f.content for f in payload.files if f.path in ALLOWED_OUTPUT_FILES}
    if set(by_path.keys()) != ALLOWED_OUTPUT_FILES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing generated files")

    for name in sorted(ALLOWED_OUTPUT_FILES):
        (out_dir / name).write_text(by_path[name].rstrip() + "\n", encoding="utf-8")

    return None


@router.get("/llm/pack/precheck", response_model=LlmPackPrecheckResponse, tags=["llm"])
def pack_precheck(db: DBSession, user: CurrentUser):
    specs_dir = ensure_llm_specs_dir()
    brief_path = specs_dir / "project-brief.json"
    if not brief_path.exists():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing llm_specs/project-brief.json")
    try:
        project_brief = _read_json_file(brief_path)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Invalid project-brief.json: {exc}") from exc

    warnings = _pack_precheck(db, user, project_brief)
    return LlmPackPrecheckResponse(warnings=warnings)


@router.post("/llm/pack/generate", response_model=LlmPackGenerateResponse, tags=["llm"])
async def pack_generate(db: DBSession, user: CurrentUser):
    settings = _get_or_create_settings(db, user.id)
    api_key = _get_api_key_or_400(settings)
    model = (settings.openrouter_model or "").strip()
    if not model:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OpenRouter model not configured")

    specs_dir = ensure_llm_specs_dir()
    brief_path = specs_dir / "project-brief.json"
    if not brief_path.exists():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing llm_specs/project-brief.json")

    project_brief = _read_json_file(brief_path)

    # 1) Generate LLM docs (preview → apply).
    user_prompt = _build_instructor_user_prompt(db, project_brief)
    req = {
        "model": model,
        "messages": [
            {"role": "system", "content": INSTRUCTOR_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.2,
    }
    try:
        raw = await chat_completions_json(api_key, req)
    except OpenRouterError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc

    try:
        content = raw["choices"][0]["message"]["content"]
        parsed = json.loads(content)
    except Exception:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Instructor did not return valid JSON")

    files = parsed.get("files")
    if not isinstance(files, list):
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Instructor JSON missing files[]")

    normalized = []
    for f in files:
        if not isinstance(f, dict):
            continue
        path = str(f.get("path") or "").strip()
        if path not in ALLOWED_OUTPUT_FILES:
            continue
        c = str(f.get("content") or "")
        normalized.append({"path": path, "content": c})

    if set(x["path"] for x in normalized) != ALLOWED_OUTPUT_FILES:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Instructor output incomplete")

    out_dir = specs_dir / "generated"
    out_dir.mkdir(parents=True, exist_ok=True)
    by_path = {x["path"]: x["content"] for x in normalized}
    for name in sorted(ALLOWED_OUTPUT_FILES):
        (out_dir / name).write_text(by_path[name].rstrip() + "\n", encoding="utf-8")

    # 2) Build + write full pack (includes generated docs and all non-LLM files).
    pack, warnings = _pack_collect_files(db, user)
    pack_id, wrote_dir, wrote_zip = _pack_write_to_llm_specs(specs_dir, user, pack)

    return LlmPackGenerateResponse(
        packId=pack_id,
        downloadUrl=f"/llm/pack/{pack_id}/download",
        wroteDir=str(wrote_dir),
        warnings=warnings,
    )


@router.get("/llm/pack/{pack_id}/download", tags=["llm"])
def pack_download(pack_id: str, db: DBSession, user: CurrentUser):
    _ = _get_or_create_settings(db, user.id)
    specs_dir = ensure_llm_specs_dir()
    zip_path = specs_dir / "pack" / f"user_{user.id}" / "latest.zip"
    if not zip_path.exists():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pack zip not found. Generate it first.")
    filename = f"aurora-agent-pack-{pack_id}.zip"
    return FileResponse(path=str(zip_path), filename=filename, media_type="application/zip")
