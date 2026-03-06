# Modèles de prompts (AuroraStack)

## Workflow “Pack LLM” (recommandé pour un nouveau projet)
AuroraStack peut exporter un ZIP (“agent pack”) qui contient :
- les specs (brief + pages),
- l’OpenAPI,
- les docs générées (PRD, SEO/GEO, questions),
- et **3 prompts** (Étape 1/3 → Étape 2/3 → Étape 3/3) avec un runbook.

Génération (UI) :
- Configure OpenRouter : `/settings` → “LLM (OpenRouter)” (clé + modèle)
- Ouvre le wizard : `/builder/brief` → **“Générer les documents”**

Dans le ZIP : `prompts/README.md` explique l’ordre exact (pour éviter que le LLM enchaîne tout seul).

## 1) Ajouter une page (frontend)
“Ajoute une page `app/(dashboard)/X/page.tsx` avec un layout cohérent (cards shadcn/ui, Tailwind).  
Ajoute le lien correspondant dans la sidebar si nécessaire.  
Garde le style UI/thème choisi (tokens HSL).”

## 2) Ajouter une table + API (backend)
“Ajoute une table `X` (SQLAlchemy) + schémas Pydantic + endpoints CRUD sous `/api/v1/x`.  
Crée une migration Alembic.  
Ajoute une validation minimale et des statuts HTTP corrects.  
Donne les commandes Docker pour migrer et tester.”

## 3) Ajouter un composant shadcn/ui
“Crée un composant `frontend/components/X.tsx` basé sur shadcn/ui, typé, sans `any`.  
Expose des props claires, et documente l’usage avec un petit exemple.”

## 4) Déboguer un bug UI
“Analyse le layout, les classes Tailwind et le comportement responsive.  
Propose 1 correctif minimal, sans refactor massif, et explique comment vérifier.”
