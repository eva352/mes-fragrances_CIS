# Context Intelligence Studio (CIS)

CIS est une application **FastAPI + Next.js + Tailwind + shadcn/ui** pour créer des sites ou des webapps et gérer une **bibliothèque de blocs** (aperçu + ajout), avec un workflow d’import/publish maîtrisé.

## Stack
- Backend: FastAPI, SQLAlchemy 2.x, Alembic, auth JWT (Bearer).
- Frontend: Next.js (App Router), Tailwind v3, shadcn/ui, next-themes.
- Base de données: Postgres 17 (via Docker Compose).

## Démarrage (Docker)
Prérequis:
- Docker Engine + plugin Compose v2.

Installation manuelle:
```bash
cp .env.example .env.local
docker compose --env-file .env.local up -d --build
docker compose --env-file .env.local exec -T backend python -m alembic upgrade head
```

## URLs
- Frontend local: `http://localhost:${AURORA_FRONTEND_PORT}`
- API locale: `http://localhost:${AURORA_BACKEND_PORT}/api/v1/health`
- Reverse proxy prod: `https://cis.auroramind.fr/`

## Health check
Endpoint:
- `GET /api/v1/health`

Script de vérification:
```bash
bash scripts/check_cis.sh
```

Options:
- `SKIP_PROXY=1` pour ignorer le check `https://cis.auroramind.fr/`
- `CIS_PROXY_URL=https://cis.auroramind.fr` pour forcer une autre URL

## Workflow blocs
1. Ajouter ou mettre à jour les blocs dans `shared/blocks/`.
2. Publier vers le frontend:
   ```bash
   node scripts/blocks/publish-to-frontend.mjs
   ```
3. Vérifier les imports:
   ```bash
   python3 scripts/blocks/audit_block_imports.py
   ```
4. Rebuild si besoin:
   ```bash
   docker compose --env-file .env.local up -d --build
   ```

Voir aussi: `docs/BLOCKS.md`

## CI (audit blocs)
Un workflow GitHub Actions exécute l’audit des imports et vérifie que les fichiers générés sont bien committés.
- Fichier: `.github/workflows/blocks-audit.yml`
- Déclenchement: changements sur `shared/blocks/` et `frontend/blocks/registry/`

## CI (sync specs publiques)
Les specs publiques servies par le frontend (`frontend/public/specs/`) sont synchronisées depuis `shared/specs/`.
- Script: `python3 scripts/sync_public_specs.py --write`
- CI: `.github/workflows/specs-sync.yml`

## Dépendances (audit)
```bash
bash scripts/npm_audit_frontend.sh
```

## Sécurité
- Ne jamais committer `.env.local` (utiliser `.env.example`).
- Changer `ADMIN_PASSWORD` après installation.
- Définir `JWT_SECRET_KEY` avant toute mise en prod.

## Documentation
- Règles projet: `docs/PROJECT_RULES.md`
- Workflow blocs: `docs/BLOCKS.md`
- Installation détaillée: `docs/INSTALL.md`
