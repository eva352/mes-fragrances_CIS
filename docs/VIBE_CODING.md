# Vibe coding (LLM) avec AuroraStack

AuroraStack est pensé pour être “vibe codé” : vous décrivez une fonctionnalité, un LLM génère/modifie le code, et vous validez via Docker.

## Workflow recommandé (MVP) : Analyse projet → Pack LLM
1) Dans l’interface AuroraStack :
   - Wizard : `/builder/brief` (brief global + type : site OU webapp)
   - Webapp : `/builder/app` (objectif + description par page)
   - Site web : `/builder/landing` (objectif + CTA + messages par page)
2) Paramètres → LLM (OpenRouter) : saisir la clé (BYOK) + choisir un modèle (sans interface de chat).
3) Dans le wizard : cliquer **“Générer les documents”** → écrit tout dans `llm_specs/` et propose le ZIP.
4) Donner le ZIP à un LLM codeur (Codex CLI/Claude/Gemini) en suivant `prompts/README.md` dans le pack.

## Outils conseillés (au choix)
- Codex CLI
- Claude Code
- Gemini CLI
- Ou un LLM “web” (ChatGPT/Claude/Gemini) en copiant le code manuellement

## Fichiers à donner au LLM (contexte minimum)
- `README.md`
- `AGENTS.md`
- `docker-compose.yml`
- `backend/app/` (routes, modèles, config)
- `frontend/app/` + `frontend/components/` + `frontend/lib/`

## Règles de travail (recommandées)
1) Toujours partir d’une demande “produit” (objectif + contraintes), puis demander un plan court.
2) Garder une base stable : ne pas casser auth, DB, layout.
3) Vérifier via Docker (`docker compose up -d --build` + migrations).
4) Éviter les dépendances inutiles : préférer shadcn/ui + Tailwind.

## Conventions AuroraStack
- Backend : FastAPI sous `/api/v1/...`, Alembic pour les migrations.
- Frontend : Next.js App Router, UI via shadcn/ui, tokens HSL dans `frontend/app/globals.css`.
- Par défaut, le frontend consomme l’API via `/api/v1/...` (proxy Next.js).

## Bon prompt de départ (exemple)
Copiez/collez au LLM :

“Tu travailles dans AuroraStack (FastAPI + Next.js App Router + Tailwind + shadcn/ui).  
Objectif : [décrire la feature].  
Contraintes : routes sous `/api/v1`, migrations Alembic si DB, TypeScript strict, pas de `any`.  
Livrables : fichiers modifiés + commandes Docker pour tester.  
Commence par un plan en 5 étapes maximum.”

Note : pour un nouveau projet (site/webapp), le prompt “Étape 1/3” complet est dans `README.md` et aussi dans le pack exporté (`prompts/00_prompt_general.md`).
