# Repository Guidelines

## Project Structure & Modules
- `backend/app/`: FastAPI entrypoint `main.py`, API routes under `api/v1/` (auth, users, health), settings in `core/`, DB session in `db/session.py`, models/schemas in `models/` and `schemas/`. Alembic migrations live in `backend/alembic/`.
- `frontend/app/`: Next.js 16 App Router pages (login at `(auth)/login`, dashboard at `dashboard/`). Shared UI lives in `frontend/components/` (including `login-04.tsx`, `app-sidebar.tsx`) and helpers in `frontend/lib/`.
- `docs/`: project rules and templates; read `PROJECT_RULES.md` before structural changes. `scripts/`: small maintenance scripts (hash helpers).

## Build, Test, and Development Commands
- Full stack via Docker: `docker compose --env-file .env.local up --build` (frontend `127.0.0.1:${AURORA_FRONTEND_PORT:-19100}`, backend `127.0.0.1:${AURORA_BACKEND_PORT:-19101}`; API via proxy: `/api/v1/...`).
- Environnement principal: Docker (utiliser la commande ci-dessus).
- Reverse proxy production: `https://cis.auroramind.fr/`.
- Backend local: `cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000`. Sync DB: `python -m alembic upgrade head`.
- Frontend local: `cd frontend && npm install && npm run dev -- -H 0.0.0.0 -p 3000`. Production bundle: `npm run build && npm run start`. Lint: `npm run lint`.

## Coding Style & Naming Conventions
- Python: PEP 8, 4-space indent, `snake_case` for vars/functions, `PascalCase` models/schemas. Keep API paths under `/api/v1/...`.
- TypeScript/React: `PascalCase` components/files in `components/`, segment folders in `app/` use kebab if multiple words. Prefer typed props/hooks, avoid `any`.
- Styling: Tailwind CSS v3; color tokens définis dans `frontend/app/globals.css` via variables CSS HSL (thème “Northern Light”, UI/thème). Use utility classes first; keep custom CSS tiny and colocated.

## Testing Guidelines
- Current gate is lint + manual checks. For backend, add pytest tests under `backend/tests/` when extending APIs; seed data with Alembic migrations. For frontend, add React Testing Library specs as `*.test.tsx` for components and Playwright for flows (login/dashboard).
- Manual smoke before pushing: `docker compose --env-file .env.local up --build`, hit `http://localhost:${AURORA_FRONTEND_PORT:-19100}/login`, sign in, and verify `/dashboard` renders without console errors. Check the blocks library (accordion + preview + add) loads without errors.

## Commit & Pull Request Guidelines
- Commits: prefer Conventional Commit prefixes (`feat:`, `fix:`, `chore:`, `docs:`, `test:`). Keep commits scoped and avoid mixing frontend/back in one commit when possible.
- PRs should list: summary, linked issue/task, commands run (lint/tests), screenshots for UI changes, and notes on env or migration impacts. Do not commit secrets (`.env.local`, `backend/.env.local`, `frontend/.env.local`); use the `.env.example` files as references.
## Security Baseline (Follow By Default)

### Secrets & Data Handling

- Never commit secrets (API keys, passwords, tokens, PEM/SSH keys) or “backup/export” JSONs containing them.
- Never print secrets in logs/errors/UI. If you must reference a credential, show a redacted form only (e.g. `sk-…last4`).
- Prefer storing secrets in `chrome.storage.local` (device-local). Treat `chrome.storage.sync` as **non-secret** storage.
- Backups/exports must be **redacted by default** and must not include access tokens (ex: token d’API) or passwords.

### Permissions & Attack Surface (Manifest)

- Keep permissions minimal; remove anything unused.
- Avoid `<all_urls>` in `host_permissions` / `matches` unless a feature strictly requires it. Prefer tight match patterns.
- Do not weaken extension CSP (avoid `unsafe-eval`, remote code, or broad `web_accessible_resources`).

### Network Safety (Webhook/Nexus/WordPress/OpenRouter)

- Validate all user-provided URLs:
  - default to `https://`, reject unknown schemes (`file:`, `chrome:`, etc.).
  - block localhost/private IP ranges by default (SSRF/exfil risk); allow only with an explicit user override + warning.
- Require explicit user intent for exfiltration actions (Webhook/Nexus/WordPress): show destination + what fields will be sent.
- Treat any server-provided upload URL (e.g., presigned `upload_url`) as untrusted: verify scheme/host policy before POSTing.

### HTML/Markdown Safety

- Do not use `innerHTML` / `dangerouslySetInnerHTML` with untrusted content.
- Escape user/page-derived strings when generating HTML (exports, WordPress content, Nexus HTML payloads).

### Logging & Error Messages

- Errors returned from remote services may contain sensitive data; avoid displaying raw server responses. Prefer generic messages + HTTP status.
- Do not store full extracted page text unless needed; apply size limits and consider user-configurable retention.

### Dependency Hygiene

- Keep lockfiles committed (`package-lock.json`).
- Before shipping: `npm audit --omit=dev` should be clean; if `npm audit` flags dev-only issues, mitigate dev exposure and plan upgrades.

### Agent-Specific Instructions (for automated changes)

- Ne **rien modifier** (code, config, docs, migrations, scripts) sans **validation finale explicite** de l’utilisateur.
- Toute modification doit être validée par moi avec l’expression **"je valide"** clairement indiquée.
- Par défaut : proposer une liste de questions + une proposition de changements, attendre validation, puis seulement implémenter.
- À chaque mise à jour livrée (push sur `main`) : mettre à jour `CHANGELOG.md` (section `[Unreleased]`) à partir des commits, via `python3 scripts/generate_changelog.py --write`.
- Prefer secure-by-default implementations even if they slightly reduce convenience (e.g., no secret sync, redacted exports).
- Any change that affects permissions, storage schema, export/import formats, or network destinations must include:
  - migration notes (what breaks/changes),
  - manual test steps (Chrome “Load unpacked” from `dist/`),
  - and a short threat rationale (what risk it reduces).
