# Blocks (showroom) — workflow

AuroraStack supporte une “bibliothèque de blocks” (type shadcnblocks) **séparée** du backoffice.

## 1) Source (shared)
Tu peux déposer des blocks dans `shared/blocks/` :
- soit en mode “dossiers” : `shared/blocks/<category>/<slug>/` avec `meta.json`, `block.tsx`, `install.txt`
- soit en mode “fichier texte” (bootstrap) : `shared/blocks/shadcn blocks.txt`

## 2) Ingestion (fichier texte → dossiers)
```bash
node scripts/blocks/ingest-from-txt.mjs
```

## 3) Publication (shared → frontend)
Génère :
- `frontend/blocks/registry/**` (TSX)
- `frontend/blocks/manifest.ts` (catalogue)
- `frontend/public/blocks/**` (images locales)
- `docs/BLOCKS_REPORT.md` (rapport)

```bash
node scripts/blocks/publish-to-frontend.mjs
```

## 3b) Audit des imports (CI)
Vérifie que tous les imports `@/` utilisés dans les blocs existent côté `frontend/`.

```bash
python3 scripts/blocks/audit_block_imports.py
```

## 4) Aperçu des blocs
Dans le MVP, l’aperçu et l’ajout de blocs se fait directement dans le **builder website** via la **bibliothèque de blocs** (panneau latéral).

Note : la page `/site/showroom` peut exister pour debug interne, mais elle n’est pas exposée dans la navigation.
