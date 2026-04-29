# Installation (Docker uniquement)

AuroraStack est conçu pour démarrer un nouveau projet **FastAPI + Next.js + Tailwind + shadcn/ui** rapidement, avec une base Postgres incluse.

## Prérequis
- Docker + Docker Compose
  - Windows/macOS : Docker Desktop
  - Linux : Docker Engine + plugin Compose v2
- Pour le “one-pass” : Python 3

## Installation (depuis GitHub)
```bash
git clone https://github.com/syl2042/Aurora_Stack.git
cd Aurora_Stack
```

## Installation (depuis un ZIP)
1. Téléchargez le ZIP et décompressez-le.
2. Ouvrez un terminal dans le dossier extrait.

## Démarrage “one-pass” (recommandé)
Cette commande :
- crée `.env.local` si absent (ou utilise `.env` si déjà présent),
- demande le **nom du projet** + les **identifiants admin**,
- choisit des ports libres (en partant de `19xxx`),
- génère les mots de passe,
- lance Docker,
- applique les migrations.

Note : la sélection automatique des ports ne se fait que lors de la **première exécution** (quand le fichier env est créé). Ensuite, modifiez `.env.local` (ou `.env`) si vous souhaitez changer les ports.

Linux/macOS/WSL :
```bash
bash scripts/setup.sh
```

Windows PowerShell :
```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup.ps1
```

Ensuite : ouvrez l’URL affichée (ex. `http://localhost:19100/login`).
Identifiants de connexion : utilisez l’email/mot de passe admin saisis pendant le one-pass (ou modifiez-les dans `.env.local`).

## Démarrage manuel
1) Créez `.env.local` :
```bash
cp .env.example .env.local
```
2) Éditez `.env.local` (au minimum `PILOT_DB_PASSWORD`, `PILOT_ADMIN_PASSWORD` et `PILOT_JWT_SECRET_KEY`).
3) (Optionnel) OpenRouter (génération de docs) :
   - Renseignez `PILOT_ENCRYPTION_KEY` (clé de chiffrement côté serveur, utilisée pour stocker la clé OpenRouter BYOK).
   - Génération rapide (Python) :
     ```bash
     python -c "import base64, os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())"
     ```
4) Lancez la stack :
```bash
docker compose --env-file .env.local up -d --build
```
5) Migrations :
```bash
docker compose --env-file .env.local exec -T backend python -m alembic upgrade head
```

## Serveur (accès navigateur)
Par défaut, les ports sont bindés sur `127.0.0.1` pour sécurité. Utilisez un tunnel SSH :
```bash
ssh -L 19100:localhost:19100 -L 19101:localhost:19101 -L 19432:localhost:19432 user@server -N
```
Adaptez les ports selon votre `.env.local` (ou `.env`), puis ouvrez `http://localhost:<PILOT_FRONTEND_PORT>/login`.

## Mettre à jour AuroraStack (après installation)
> Important : AuroraStack sert de base pour ton projet. Si tu as déjà beaucoup modifié le code, une mise à jour peut créer des conflits. La méthode la plus simple est de mettre à jour tôt, ou de fusionner sélectivement.

### A) Si tu as installé via Git (recommandé)
1) Mets-toi à jour :
```bash
git pull
```

2) Vérifie si de nouvelles variables d’environnement ont été ajoutées :
- compare `.env.example` et ton `.env.local`
- ajoute manuellement les nouvelles variables dans `.env.local` si nécessaire

3) Rebuild + migrations (sans perdre les données) :
```bash
docker compose --env-file .env.local up -d --build
docker compose --env-file .env.local exec -T backend python -m alembic upgrade head
```

Alternative “1 commande” : relancer le one-pass (il complète le env, rebuild et applique les migrations) :
```bash
bash scripts/setup.sh
```

### B) Si tu as installé via un ZIP (sans Git)
- Re-télécharge une version récente du ZIP.
- Remplace les fichiers du projet (en gardant ton `.env.local`).
- Puis exécute :
```bash
docker compose --env-file .env.local up -d --build
docker compose --env-file .env.local exec -T backend python -m alembic upgrade head
```

### C) Backup / rollback (conseillé avant grosse mise à jour)
- Backup DB (simple) : export SQL depuis pgAdmin, ou via `pg_dump`.
- Si tu veux repartir de zéro : `docker compose --env-file .env.local down -v` (⚠️ supprime les données).

## Cas “j’ai déjà Postgres sur le serveur”
Ce n’est pas un problème : la stack embarque **son propre Postgres** via Docker et expose par défaut le port `19432` (au lieu de `5432`).
Si besoin, changez `PILOT_DB_PORT` dans `.env.local` (ou `.env`), ou relancez l’installation one-pass après avoir supprimé le fichier env.

## Base de données : se connecter à Postgres
AuroraStack embarque **Postgres 17** via Docker Compose (`service: db`). Les identifiants sont dans `.env.local` :
- `PILOT_DB_NAME`, `PILOT_DB_USER`, `PILOT_DB_PASSWORD`, `PILOT_DB_PORT`

### Connexion (CLI) — recommandé
Sans rien installer sur ta machine (depuis le conteneur) :
```bash
docker compose --env-file .env.local exec -T db psql -U "$PILOT_DB_USER" -d "$PILOT_DB_NAME"
```

Si tu as `psql` installé en local :
```bash
psql "postgresql://$PILOT_DB_USER:$PILOT_DB_PASSWORD@127.0.0.1:$PILOT_DB_PORT/$PILOT_DB_NAME"
```

### Connexion (outil graphique)
Exemples (DBeaver / TablePlus / DataGrip, etc.) :
- Host : `127.0.0.1`
- Port : `PILOT_DB_PORT` (par défaut `19432`)
- Database : `PILOT_DB_NAME`
- User : `PILOT_DB_USER`
- Password : `PILOT_DB_PASSWORD`

### Connexion via pgAdmin (interne ou externe)
pgAdmin est l’outil officiel (gratuit) pour administrer Postgres.
- Téléchargement : https://www.pgadmin.org/download/

#### A) Connecter le Postgres “interne” (celui livré avec AuroraStack)
Pré-requis : la stack tourne (`docker compose up ...`) et le port DB est exposé (par défaut `127.0.0.1:19432`).

1) Ouvre pgAdmin → **Add New Server**
2) Onglet **General**
   - Name : `AuroraStack (local)` (ou ce que tu veux)
3) Onglet **Connection**
   - Host name/address : `127.0.0.1`
   - Port : `PILOT_DB_PORT` (par défaut `19432`)
   - Maintenance database : `PILOT_DB_NAME` (par défaut `aurora_stack`)
   - Username : `PILOT_DB_USER`
   - Password : `PILOT_DB_PASSWORD`
   - (Option) coche “Save password”
4) Clique **Save**, puis explore les tables.

Si la stack tourne sur un serveur, utilise d’abord un **tunnel SSH** (voir section ci-dessous), puis garde `127.0.0.1` dans pgAdmin.

#### B) Connecter un Postgres externe (base déjà existante)
1) Ouvre pgAdmin → **Add New Server**
2) Onglet **Connection**
   - Host : l’hôte de ta base externe (ex: `db.mycompany.com`)
   - Port : `5432` (ou celui de ton provider)
   - Maintenance database : le nom de la DB
   - Username / Password : ceux du provider
3) (Option) Onglet **SSL**
   - Si ton provider l’exige : SSL mode = `require` (ou la config fournie par le provider)

Note : `DATABASE_URL` sert à dire au backend AuroraStack quelle DB utiliser. pgAdmin, lui, se connecte directement à l’hôte/port de la base.

### Sur un serveur (accès depuis ton poste)
Si `AURORA_BIND_HOST=127.0.0.1` sur le serveur, utilise un tunnel SSH (incluant le port DB) :
```bash
ssh -L 19100:localhost:19100 -L 19101:localhost:19101 -L 19432:localhost:19432 user@server -N
```
(Adapte les ports selon ton `.env.local`.)

### Reset DB (⚠️ destructif)
Supprime la base + les données (volume Docker) :
```bash
docker compose --env-file .env.local down -v
```

## Option avancée : utiliser un Postgres externe (au lieu du conteneur)
Oui, c’est faisable : tu peux connecter AuroraStack à une base Postgres déjà existante.

1) Dans `.env.local`, définis `DATABASE_URL` :
```bash
# Exemple (adapte user/password/host/db)
DATABASE_URL=postgresql+psycopg://user:password@host:5432/dbname
```
Si ton provider impose TLS, ajoute par exemple `?sslmode=require`.

2) Relance la stack et applique les migrations (elles s’appliqueront sur la DB externe) :
```bash
docker compose --env-file .env.local up -d --build
docker compose --env-file .env.local exec -T backend python -m alembic upgrade head
```

Notes :
- Le service `db` peut rester démarré : il sera simplement inutilisé si `DATABASE_URL` pointe ailleurs.
- Bonne pratique : n’expose jamais ton Postgres externe publiquement ; utilise un réseau privé/VPN/firewall.

## Export “agent pack” (ZIP)
Pré-requis : stack démarrée + migrations appliquées, et identifiants admin présents dans `.env.local`.

Dans l’interface :
1) Configure OpenRouter : `/settings` → “LLM (OpenRouter)” (clé + modèle)
2) Ouvre le wizard : `/builder/brief`
3) Clique **“Générer les documents”** → un ZIP est proposé au téléchargement

Les fichiers sont aussi écrits localement dans `llm_specs/` (notamment `llm_specs/pack/latest/` et `llm_specs/pack/latest.zip`).
