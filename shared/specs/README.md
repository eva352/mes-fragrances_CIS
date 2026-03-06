# Specs (source de vérité)

AuroraStack utilise des fichiers “spec” comme **source de vérité** pour décrire ce que l’utilisateur a construit (website ou webapp).

- **Fichiers = vérité** : faciles à versionner, exporter (ZIP) et rejouer.
- **CIS (actuel)** :
  - Webapp : spec persistée en fichier (`llm_specs/app.json`).
  - Website : pages persistées en DB (`site_pages`) et exportées dans le pack LLM.

## Fichiers v1

- `shared/specs/theme.json` : thème par défaut du projet (palette + mode).
- `shared/specs/ui-manifest.json` : catalogue des primitives (shadcn/ui) et modules “Aurora” disponibles.
- `shared/specs/site-spec.example.json` : exemple de spec website (blocks + pages).
- `shared/specs/app-spec.example.json` : exemple de spec webapp (shell + pages + primitives/modules).

Les schémas JSON (validation) sont dans `shared/specs/schema/`.
