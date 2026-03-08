# Procédure de “nettoyage” — transformer **Context Intelligence Studio (CIS)** en **votre application**

Ce document décrit une procédure **complète et reproductible** pour prendre la base **Context Intelligence Studio (CIS)** (FastAPI + Next.js + TailwindCSS + shadcn/ui + Postgres Docker) et la transformer en une nouvelle application “brandée”, isolée et prête à évoluer.

Public cible :
- développeur (humain) qui bootstrappe une nouvelle app,
- LLM codeur (Codex CLI/Claude Code/Gemini CLI) chargé d’automatiser le renommage.

Objectifs du “nettoyage” :
- remplacer toute référence “CIS / AuroraStack” par *votre* nom,
- isoler l’app sur le serveur (DB + volumes + cookies/localStorage + domaines),
- standardiser les variables d’environnement avec un **préfixe propre** (ex: `AVEO_`),
- garder la stack Docker “portable” (développement local + serveur + reverse proxy).

---

## 0) Conventions (à décider AVANT de modifier le code)

Choisissez 2 identifiants :

1) **Nom marketing** (affiché UI) :
- Exemple : `Cockpit Aveo`
- On l’utilise pour titres, sidebar, pages, docs.

2) **Slug technique** (stable, ASCII, DB-safe) :
- Exemple : `cockpit_aveo`
- On l’utilise pour :
  - identifiants (ex: specs),
  - DB name/user,
  - noms de volumes Docker,
  - clés cookies/localStorage.

Recommandation :
- `APP_NAME="Mon Application"`
- `APP_SLUG="mon_application"` (snake_case)
- `APP_HOST="mon-application.auroramind.fr"` (kebab-case)

---

## 1) Installation du template dans le répertoire cible (sans sous-dossier)

Pré-requis :
- `git`, `docker`, `docker compose`.

Dans un dossier vide :
```bash
git clone <URL_DU_TEMPLATE_CIS> .
```

Vérifier :
```bash
git status -sb
ls -la
```

---

## 2) Stratégie de renommage (recommandée)

### 2.1. Préfixes d’environnement

Objectif : ne plus polluer le serveur avec des variables génériques, et éviter les collisions entre apps.

Recommandé :
- **Backend/Infra** : `APP_PREFIX_` (ex: `AVEO_`)
- **Frontend public (Next.js)** : `NEXT_PUBLIC_<APP_PREFIX>_...` (ex: `NEXT_PUBLIC_AVEO_...`)

Exemples de mapping (conseillés) :
- `AURORA_*` → `AVEO_*`
- `NEXT_PUBLIC_APP_NAME` → `NEXT_PUBLIC_AVEO_APP_NAME`
- `NEXT_PUBLIC_BACKEND_URL` → `NEXT_PUBLIC_AVEO_BACKEND_URL`
- `ADMIN_EMAIL` → `AVEO_ADMIN_EMAIL`
- `ADMIN_PASSWORD` → `AVEO_ADMIN_PASSWORD`
- `JWT_SECRET_KEY` → `AVEO_JWT_SECRET_KEY`
- `ALLOWED_ORIGINS` → `AVEO_ALLOWED_ORIGINS`
- `LLMLITE_*` → `AVEO_LLMLITE_*`
- `AURORA_ENCRYPTION_KEY` → `AVEO_ENCRYPTION_KEY`
- `CIS_PROXY_URL` → `AVEO_PROXY_URL`

Notes :
- Next.js **n’expose au navigateur** que les variables `NEXT_PUBLIC_*`.
- Vous pouvez conserver une compat temporaire (fallback) dans le code (`AVEO_*` puis `AURORA_*`) si vous migrez une instance déjà en production.

### 2.2. Isolation DB/Volumes

Objectif : DB indépendante (même serveur, pas de collision).

Recommandé :
- `AVEO_DB_NAME=<APP_SLUG>` (ex: `cockpit_aveo`)
- `AVEO_DB_USER=<APP_SLUG>`
- volume docker dédié : `<APP_SLUG>_db`

### 2.3. Isolation navigateur (cookies/localStorage)

Objectif : éviter collisions de thèmes/mode/builder prefs entre apps (surtout sur le même domaine parent).

Recommandé :
- cookie thème : `<APP_SLUG>_theme` (ex: `cockpit_aveo_theme`)
- localStorage thème : `<APP_SLUG>_theme`
- localStorage mode : `<APP_SLUG>_color_mode`
- localStorage prefs builders : `<APP_SLUG>_builders`

---

## 3) Modifications “source de vérité” à appliquer (checklist)

Cette section liste les zones typiques à modifier dans CIS.

### 3.1. Fichiers d’environnement

1) Mettre à jour `.env.example` :
- toutes les variables `AURORA_*` → `<PREFIX>_*`,
- définir les valeurs par défaut de l’app :
  - DB name/user = `<APP_SLUG>`,
  - app title = `<APP_NAME>`,
  - allowed origins inclut le domaine final.

2) Mettre à jour la doc/les scripts “one-pass” :
- `scripts/setup.sh`
- `scripts/setup.ps1`

Objectif :
- générer secrets forts (JWT + encryption),
- choisir ports libres si premier lancement,
- écrire les variables *prefixées* dans `.env.local`.

### 3.2. Docker Compose

Mettre à jour `docker-compose.yml` :
- DB :
  - `POSTGRES_DB/USER/PASSWORD` → `AVEO_DB_*`
  - volume → `cockpit_aveo_db` (ou `<APP_SLUG>_db`)
- Backend :
  - `AVEO_DATABASE_URL` (ou équivalent) **par défaut** vers le service `db`,
  - `AVEO_*` pour project title, jwt, allowed origins, llmlite, encryption,
  - mounts : éviter les chemins “aurora_*” si vous renommez.
- Frontend :
  - passer `NEXT_PUBLIC_<PREFIX>_*` en build args + env,
  - passer `AVEO_NEXT_BACKEND_ORIGIN` (ou équivalent) pour le rewrite `/api/v1/*`.

Vérification simple :
```bash
docker compose --env-file .env.example config > /tmp/compose.yml
```

### 3.3. Backend (FastAPI)

Zones typiques :

1) `backend/app/core/config.py`
- Faire pointer `Settings` sur les nouvelles variables (`AVEO_*`).
- Idéal : utiliser des alias/fallbacks tant que vous migrez.

2) `backend/app/main.py`
- Message racine `/` et `FastAPI(title=...)` doivent refléter `<APP_NAME>`.

3) Scripts/LLM prompts intégrés (si présents)
- Remplacer “AuroraStack Instructor”, “CIS Orchestrator”, etc.

4) Variables “montées” via Docker
- Si vous renommez `*_DOCS_DIR`, `*_SHARED_SPECS_DIR`, `*_LLM_SPECS_DIR`, mettez à jour les `os.environ.get(...)`.

5) Migrations Alembic
- Si elles lisent `ADMIN_EMAIL`, `ADMIN_PASSWORD`, etc. :
  - passer sur `AVEO_ADMIN_EMAIL`, `AVEO_ADMIN_PASSWORD` (et éventuellement fallback legacy).

Vérification quick-win :
```bash
python3 -m compileall -q backend/app
```

### 3.4. Frontend (Next.js)

Zones typiques :

1) Variables `NEXT_PUBLIC_*`
- `frontend/lib/brand.ts` : lire `NEXT_PUBLIC_<PREFIX>_APP_NAME`.
- `frontend/lib/api/*` : lire `NEXT_PUBLIC_<PREFIX>_BACKEND_URL`.
- `frontend/app/layout.tsx` :
  - `metadata.title` doit refléter `<APP_NAME>`,
  - `ThemeProvider.storageKey` doit être isolé (`<APP_SLUG>_color_mode`).

2) Theme cookie/localStorage
- `frontend/lib/*theme*/constants.ts` : cookie name (ex: `cockpit_aveo_theme`)
- `frontend/lib/*theme*/themes.ts` + générateur : storage key (ex: `cockpit_aveo_theme`)
- Si vous générez le fichier TS via script, modifiez **la source** (ex: `frontend/scripts/gen-aurora-themes.mjs`) puis regen.

3) Builders “désactivés par défaut” (optionnel mais recommandé)
- Ajoutez `NEXT_PUBLIC_<PREFIX>_ENABLE_BUILDERS=0`
- Appliquez un guard sur `/builder/*` :
  - layout parent qui affiche une carte “builders désactivés”,
  - navigation sidebar masquée.

Vérification quick-win :
```bash
node -c frontend/next.config.js
```

---

## 4) Reverse proxy (Caddy) — bloc à copier/coller

Exemple (ports par défaut : frontend `19100`, backend `19101`) :
```caddyfile
<APP_HOST> {
  encode zstd gzip

  @api path /api/v1/*
  handle @api {
    reverse_proxy 127.0.0.1:19101
  }

  handle {
    reverse_proxy 127.0.0.1:19100
  }
}
```

Notes :
- gardez les conteneurs bindés sur `127.0.0.1` (plus sûr),
- Caddy termine TLS et fait le routage `/api/v1/*`.

---

## 5) Contrôles finaux (must-have)

### 5.1. Recherche de “restes” (ripgrep)

À adapter selon votre base :
```bash
rg -n "Context Intelligence Studio|Contexte Intelligence Studio|\\bCIS\\b|AuroraStack|aurora_stack|cis\\.auroramind\\.fr" -S .
```

### 5.2. Vérifier que les env legacy ne sont plus requis

Rechercher `AURORA_` / `ADMIN_EMAIL` etc :
```bash
rg -n "\\bAURORA_[A-Z0-9_]+\\b|\\bADMIN_EMAIL\\b|\\bADMIN_PASSWORD\\b|\\bALLOWED_ORIGINS\\b|\\bJWT_SECRET_KEY\\b" -S .
```

Vous pouvez accepter quelques occurrences si vous avez volontairement gardé des **fallbacks** (migration en douceur).

### 5.3. Lancement Docker + migrations

```bash
cp .env.example .env.local
bash scripts/setup.sh
```

Ou manuel :
```bash
docker compose --env-file .env.local up -d --build
docker compose --env-file .env.local exec -T backend python -m alembic upgrade head
```

### 5.4. Smoke test

- Frontend : `http://localhost:<FRONTEND_PORT>/login`
- API health : `http://localhost:<BACKEND_PORT>/api/v1/health`
- Proxy (si Caddy) : `https://<APP_HOST>/`

Option script :
```bash
bash scripts/check_cockpit_aveo.sh
```

---

## 6) Pièges fréquents (à éviter)

1) **Variables Next.js non exposées**
- Si vous n’utilisez pas `NEXT_PUBLIC_...`, la variable sera `undefined` côté navigateur.

2) **Collisions cookies/localStorage**
- Sans renommage, changer le thème/mode dans une app peut impacter une autre app (même domaine).

3) **DB non isolée**
- Si vous gardez `aurora_stack` partout, vous risquez de “partager” une DB/volume avec d’autres stacks.

4) **Builders accessibles “en direct”**
- Masquer la sidebar ne suffit pas : protégez `/builder/*` via un layout guard si vous voulez les désactiver réellement.

5) **Migrations Alembic utilisant les anciens env**
- Beaucoup de bootstraps cassent ici : assurez-vous que les migrations lisent les nouveaux env (au moins en fallback).

---

## 7) Template minimal pour un nouveau projet (résumé en 10 lignes)

1) Définir `APP_NAME`, `APP_SLUG`, `APP_HOST`, `ENV_PREFIX`.
2) Remplacer `.env.example` → `ENV_PREFIX_*` et defaults propres.
3) Mettre à jour `docker-compose.yml` (DB name/user/volume + backend env + frontend `NEXT_PUBLIC_*`).
4) Backend : config/env + branding + prompts.
5) Frontend : branding + `NEXT_PUBLIC_*` + cookies/localStorage keys.
6) Scripts : `setup.*`, `check_*`, export pack, docs.
7) `rg` pour traquer CIS/Aurora restants.
8) `docker compose up -d --build` + `alembic upgrade head`.
9) Smoke `/login` + `/api/v1/health` + domaine proxy.
10) Figer la base : tag git (optionnel) pour recommencer facilement.

