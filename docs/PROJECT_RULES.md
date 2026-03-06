# AuroraStack — Project Rules

Ce document décrit les règles “projet” (conventions + garde‑fous) pour faire évoluer AuroraStack sans casser la base.

## 1) Objectif de la stack
- Fournir une base stable **FastAPI + Postgres + Next.js + Tailwind + shadcn/ui**.
- Avoir une UI/thème configurable avec :
  - un **mode** `light/dark` (via `next-themes`) ;
  - une **palette** multi‑thèmes (via `data-aurora-theme`).

## 2) Architecture (à respecter)
### Backend
- Entrée : `backend/app/main.py`
- API : routes sous `backend/app/api/v1/` (préfixe `/api/v1/...`)
- DB : SQLAlchemy 2.x, session dans `backend/app/db/session.py`
- Migrations : `backend/alembic/` (Alembic)

### Frontend
- Next.js App Router : `frontend/app/`
- Zone “app” (auth) : `frontend/app/(dashboard)/...`
- UI : composants shadcn dans `frontend/components/ui/`
- Composants applicatifs : `frontend/components/`
- Helpers : `frontend/lib/`

## 3) Conventions de code
### Frontend (TypeScript/React)
- Pas de `any` (sauf nécessité, documentée).
- Utiliser les tokens Tailwind/shadcn (`bg-background`, `text-foreground`, etc.).
- Ne pas hardcoder de couleurs : utiliser les variables HSL et les classes Tailwind.

### Backend (Python)
- PEP8, noms en `snake_case`.
- Endpoints sous `/api/v1/...`, statuts HTTP cohérents.
- Toute évolution DB = **migration Alembic**.

## 4) Thèmes : mode vs palette (important)
- **Mode clair/sombre** = classe `dark` sur `<html>` (persistée dans `localStorage` via `next-themes`).
  - Clé : `aurora_stack_color_mode` (voir `frontend/app/layout.tsx`)
- **Palette** = attribut `data-aurora-theme` sur `<html>` (persistée cookie+localStorage).
  - Cookie : `aurora_stack_theme`
  - LocalStorage : `aurora-theme`
- Pour ajouter des thèmes : éditer `frontend/themes/aurora-themes.source.txt`, puis :
  - `cd frontend && npm run gen:themes`
  - et rebuild Docker si besoin (`docker compose up -d --build frontend`)

## 5) Ports / isolation (serveur)
- La stack est conçue pour être **indépendante** (ne pas réutiliser les réseaux externes d’autres stacks).
- Exposition recommandée sur `127.0.0.1` + tunnel SSH.
- Ports par défaut : `19100` (frontend), `19101` (backend), `19432` (postgres).

## 6) Ajout de features : check-list rapide
- UI :
  - Ajouter une page sous `frontend/app/(dashboard)/...`
  - Lier dans `frontend/components/app-sidebar.tsx`
  - Garder les pages non implémentées sur une “carte” *construction en cours* si besoin
- API :
  - Modèle SQLAlchemy + schémas Pydantic
  - Migration Alembic
  - Route(s) `backend/app/api/v1/...`
- Toujours valider via Docker :
  - `docker compose up -d --build`
  - `docker compose exec -T backend python -m alembic upgrade head`

## 7) Optionnel : “Marketing / Landing pages”
AuroraStack peut servir de base pour :
- un **site web public** (landing / vitrine / blog) ; ou
- une **webapp admin** (backoffice).

Règle MVP : **1 projet AuroraStack = 1 seul type** (site OU webapp). Si vous voulez les deux, partez sur 2 dossiers/projets séparés.

### Builders (sources de vérité)
- Wizard “Analyse du projet” : `frontend/app/(dashboard)/builder/brief/page.tsx` → écrit `llm_specs/project-brief.json`.
- Webapp builder : `frontend/app/(dashboard)/builder/app/page.tsx` → écrit `llm_specs/app.json`.
- Website builder : `frontend/app/(dashboard)/builder/landing/page.tsx` → pages stockées en DB (`site_pages`).

### Pack LLM (export ZIP)
Objectif : générer un ZIP pour qu’un **LLM codeur** comprenne la stack + le brief + les pages, puis pose ses questions et prépare un plan.
- Export : via UI → wizard `/builder/brief` → **“Générer les documents”** (ZIP + fichiers écrits dans `llm_specs/pack/latest/`).
- Le pack contient `prompts/README.md` + `prompts/00/10/20_*.md` (runbook : le LLM ne doit pas enchaîner tout seul).

### OpenRouter (optionnel, sans chat)
AuroraStack peut générer automatiquement 3 documents (sans interface de conversation) :
- `llm_specs/generated/PRD.md`
- `llm_specs/generated/QUESTIONS_RECOMMENDATIONS.md`
- `llm_specs/generated/SEO_GEO.md`

Sécurité :
- La clé OpenRouter est BYOK, stockée côté serveur **chiffrée** (jamais exportée).

Note : AuroraStack (MVP) ne fournit pas un site e‑commerce “clé en main” (produit/panier/checkout). C’est une extension à faire ensuite avec le LLM codeur si besoin.
