# Tracking des candidats d'insertion parfum

## Contexte du diagnostic

Le diagnostic lecture seule suivant a été mené après promotion contrôlée de
`43` lignes approuvées depuis `public.perfume_insert_candidates` vers
`public.perfumes` :

- `/home/eva/deploy_reports/perfume_candidate_refresh_diagnosis_20260527_150952/16_diagnosis_report.md`

Constat principal :

- les `43` nouveaux parfums ont bien été ajoutés à `public.perfumes` ;
- le rerun ciblé du worker (`match-offers` puis `create-candidates`) n'a pas
  changé `product_match_candidates` ;
- la raison n'est pas un refus de mise à jour des candidats existants ;
- la raison est que le worker relit uniquement le **dernier import run réussi**
  et que ces `43` produits n'étaient pas présents dans ce sous-ensemble.

Conséquence :

- un staging quotidien a besoin de mémoriser si un candidat a déjà été vu,
  revu, promu ou simplement revu à nouveau ;
- la promotion doit être traçable pour éviter de retraiter des candidats déjà
  injectés dans `public.perfumes`.

## Rôle des nouvelles colonnes

Migration :

- `backend/sql/migrations/20260527_alter_perfume_insert_candidates_tracking.sql`

Colonnes ajoutées :

- `first_seen_at`
  - première apparition du candidat en staging ;
- `last_seen_at`
  - dernière fois où le staging a revu la même source ;
- `seen_count`
  - nombre de synchronisations ayant revu le candidat ;
- `promoted_at`
  - moment où le candidat a été promu ou relié sans ambiguïté à un parfum
    existant ;
- `promoted_perfume_id`
  - `public.perfumes.id` lié après promotion ou fusion contrôlée.

Le statut de revue est aussi étendu avec :

- `promoted`

Objectif :

- distinguer clairement :
  - un candidat nouveau ;
  - un candidat déjà vu mais encore `pending` ;
  - un candidat approuvé puis promu ;
  - un candidat approuvé mais rattaché à un parfum déjà existant.

## Workflow quotidien cible

### 1. Staging quotidien

Exécuter :

- `backend/sql/backfill/20260527_stage_perfume_insert_candidates.sql`

Comportement attendu :

- inserter les nouveaux `SAFE_INSERT_CANDIDATE` et `NEEDS_MANUAL_REVIEW` ;
- sur conflit `source_candidate_id` :
  - mettre à jour `last_seen_at` ;
  - incrémenter `seen_count` ;
  - ne rafraîchir les champs candidats que si `review_status = 'pending'` ;
  - ne jamais remettre en `pending` une ligne déjà `approved`, `promoted`,
    `rejected`, `merged_existing` ou `needs_more_info`.

### 2. Revue humaine

La revue continue à se faire dans `public.perfume_insert_candidates`.

Règle pratique :

- `approved`
  - la ligne peut être promue dans `public.perfumes` ;
- `merged_existing`
  - la ligne correspond déjà sans ambiguïté à un parfum existant ;
- `promoted`
  - la ligne a déjà été promue et ne doit plus être retraitée comme backlog
    ouvert.

### 3. Promotion contrôlée

Exécuter :

- `backend/sql/backfill/20260527_promote_approved_perfume_insert_candidates.sql`

Comportement retenu :

- insert uniquement les lignes `review_status = 'approved'` ;
- refuse les doublons évidents par :
  - `lower(brand)+lower(name)`
  - `ean`
  - `gtin`
  - `upc`
  - `mpn`
- si une ligne `approved` correspond déjà de manière non ambiguë à un parfum
  existant :
  - ne crée pas de nouveau parfum ;
  - la marque `merged_existing` ;
  - renseigne `promoted_perfume_id` et `promoted_at`
- si une ligne est réellement insérée :
  - la marque `promoted` ;
  - renseigne `promoted_perfume_id` et `promoted_at`

Ainsi, un candidat déjà consommé par le workflow n'est plus retraité comme
approbation ouverte.

### 4. Audit quotidien

Exécuter :

- `backend/sql/audit/20260527_perfume_insert_candidates_audit.sql`

Le script audit donne notamment :

- counts par `classification`
- counts par `review_status`
- total `promoted`
- `approved_without_promoted_link`
- `promoted_without_perfume`
- candidats récemment revus
- `pending` anciens ou stagnants
- top marques par nouveaux / récents candidats

## Script de backfill tracking

Exécuter si la table existe déjà sans colonnes de tracking :

- `backend/sql/backfill/20260527_backfill_perfume_insert_candidates_tracking.sql`

Ce script :

- initialise `first_seen_at`, `last_seen_at`, `seen_count` ;
- transforme en `promoted` les lignes actuellement `approved` qui correspondent
  déjà sans ambiguïté à un parfum existant par `lower(brand)+lower(name)` ;
- utilise une résolution déterministe basée sur `row_number()` / `count() over`
  au lieu d'un agrégat sur UUID ;
- émet un diagnostic final auto-contenu (`approved_remaining`,
  `promoted_with_link`, `approved_ambiguous_matches`,
  `approved_without_match`) sans réutiliser de CTE hors scope ;
- laisse les cas ambigus en `approved` ;
- ne touche pas aux lignes `pending`, `rejected` ou `needs_more_info`.

## Commandes d'exécution

Exemple générique :

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/sql/migrations/20260527_alter_perfume_insert_candidates_tracking.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/sql/backfill/20260527_backfill_perfume_insert_candidates_tracking.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/sql/backfill/20260527_stage_perfume_insert_candidates.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/sql/audit/20260527_perfume_insert_candidates_audit.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backend/sql/backfill/20260527_promote_approved_perfume_insert_candidates.sql
```

## Rollback

Rollback SQL :

- `backend/sql/rollback/20260527_drop_perfume_insert_candidates_tracking.sql`

Ce rollback :

- supprime les colonnes et index de tracking ;
- restaure la contrainte `review_status` sans `promoted` ;
- ne supprime pas la table `public.perfume_insert_candidates` ;
- ne supprime pas `public.perfumes`.

## Risques connus

- la promotion reste conservatrice mais dépend d'une correspondance non ambiguë
  pour marquer `merged_existing` ;
- le staging quotidien ne remplace pas encore un vrai refresh historique des
  candidats déjà ouverts dans `product_match_candidates` ;
- le worker actuel ne sait toujours pas rescanner l'historique complet des
  import runs.

## Prochaine PR recommandée

Cette PR est volontairement limitée au SQL/docs côté CIS.

La suite logique côté worker est une PR séparée pour :

- ajouter une commande `refresh-candidates` ou équivalent ;
- relire les candidats ouverts (`pending`, `needs_review`) contre le catalogue
  courant ;
- puis, éventuellement, lancer le staging quotidien et produire un rapport
  synthétique sans renotifier tout le backlog.
