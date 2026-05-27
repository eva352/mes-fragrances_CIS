# Staging des nouveaux parfums candidats

## Contexte

L'audit lecture seule des produits non matchés a montré un volume important de
candidats potentiels à insérer dans `public.perfumes`, avec plusieurs classes :

- `SAFE_INSERT_CANDIDATE`
- `POSSIBLE_DUPLICATE`
- `VARIANT_OF_EXISTING`
- `NON_PERFUME_PRODUCT`
- `NEEDS_MANUAL_REVIEW`

Le volume est suffisant pour interdire toute insertion directe dans le catalogue
public sans étape de revue intermédiaire.

## Pourquoi ne pas insérer directement dans `public.perfumes`

Les risques principaux sont :

- insertion de doublons évidents sur des parfums déjà présents ;
- insertion de variantes de concentration/volume à la place d'un parfum canonique ;
- insertion de produits non parfum (`coffret`, `after shave`, `shower gel`, etc.) ;
- insertion de lignes commercialement valides mais éditorialement incohérentes ;
- écrasement des règles métier si la revue humaine n'a pas encore tranché.

La table `public.perfume_insert_candidates` sert donc de zone de staging et de
revue avant toute promotion vers `public.perfumes`.

## Schéma proposé

Migration :

- `backend/sql/migrations/20260527_create_perfume_insert_candidates.sql`

La table stocke :

- les champs candidats dérivés de `product_match_candidates` ;
- une classification heuristique ;
- un niveau de confiance ;
- un risque de doublon ;
- un éventuel parfum existant le plus proche ;
- un statut de revue humain.

Note importante :

- `nearest_perfume_id` est en `UUID`, pas en `BIGINT`, car `public.perfumes.id`
  est un `UUID` dans le schéma CIS réel.

## Workflow recommandé

### 1. Créer la table de staging

Exécuter :

- `backend/sql/migrations/20260527_create_perfume_insert_candidates.sql`

### 2. Alimenter la table de staging

Exécuter :

- `backend/sql/backfill/20260527_stage_perfume_insert_candidates.sql`

Ce script :

- ne touche pas à `public.perfumes` ;
- n'écrase pas les revues déjà créées ;
- stage seulement `SAFE_INSERT_CANDIDATE` et `NEEDS_MANUAL_REVIEW` par défaut ;
- conserve les cas à risque (`POSSIBLE_DUPLICATE`, `VARIANT_OF_EXISTING`,
  `NON_PERFUME_PRODUCT`) pour un traitement séparé ou une importation revue.

### 3. Auditer la staging table

Exécuter :

- `backend/sql/audit/20260527_perfume_insert_candidates_audit.sql`

Points à vérifier :

- nombre de lignes par `classification` ;
- nombre de lignes par `review_status` ;
- top marques candidates ;
- lignes `approved` prêtes à promouvoir ;
- doublons potentiels contre `public.perfumes` ;
- lignes non parfums.

### 4. Revue manuelle

Règles minimales :

- `SAFE_INSERT_CANDIDATE`
  - confirmer que la marque n'existe pas déjà sous une autre normalisation ;
  - confirmer que le produit est bien un parfum ;
  - confirmer que l'image et les identifiants sont plausibles.
- `POSSIBLE_DUPLICATE`
  - vérifier si le candidat correspond déjà à un parfum existant ;
  - si oui, préférer une fusion logique ou un mapping plutôt qu'une insertion.
- `VARIANT_OF_EXISTING`
  - confirmer s'il s'agit d'une déclinaison à modéliser différemment ;
  - ne pas insérer directement comme nouveau parfum sans règle métier claire.
- `NON_PERFUME_PRODUCT`
  - rejeter ou archiver.
- `NEEDS_MANUAL_REVIEW`
  - arbitrer manuellement après revue de la marque, du titre source et des
    identifiants.

### 5. Promouvoir uniquement les lignes approuvées

Exécuter :

- `backend/sql/backfill/20260527_promote_approved_perfume_insert_candidates.sql`

Ce script :

- insère uniquement les lignes `review_status = 'approved'` ;
- refuse les doublons évidents par `lower(brand)+lower(name)` ;
- refuse les doublons par `ean`, `gtin`, `upc`, `mpn` ;
- retourne les lignes insérées ;
- ne modifie pas automatiquement `review_status` après promotion.

## Commandes d'exécution

Exemple générique :

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/sql/migrations/20260527_create_perfume_insert_candidates.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/sql/backfill/20260527_stage_perfume_insert_candidates.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/sql/audit/20260527_perfume_insert_candidates_audit.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/sql/backfill/20260527_promote_approved_perfume_insert_candidates.sql
```

## Stratégie de rollback

Rollback SQL :

- `backend/sql/rollback/20260527_drop_perfume_insert_candidates.sql`

Utilisation :

- uniquement après validation explicite ;
- uniquement si la table de staging doit être retirée complètement.

Le rollback :

- supprime la table de staging ;
- ne supprime pas `public.perfumes` ;
- ne supprime pas les lignes déjà promues dans `public.perfumes`.

## Risques connus

- l'heuristique SQL ne reproduit pas exactement tous les résultats du CSV
  d'audit externe ;
- `pg_trgm` n'est pas disponible par défaut sur la base auditée, donc la
  similarité texte reste limitée ;
- des variantes marketing ou des marques mal normalisées peuvent encore être
  classées trop agressivement ;
- les promotions approuvées nécessitent une validation éditoriale avant
  exécution.

## Prochaine étape possible

Deux suites logiques sont possibles :

- interface admin de revue sur `public.perfume_insert_candidates` ;
- script Python dédié pour importer un CSV revu et synchroniser les statuts de
  staging proprement.
