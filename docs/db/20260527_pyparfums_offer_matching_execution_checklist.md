# Checklist d'exécution: migration matching `perfumes`

Cette checklist prépare l'exécution future de la migration et du backfill.  
Elle n'a pas été exécutée dans cette tâche.

## Portée

Scripts concernés:

- `backend/sql/migrations/20260527_add_perfumes_matching_columns.sql`
- `backend/sql/backfill/20260527_backfill_perfumes_matching_columns.sql`
- `backend/sql/rollback/20260527_drop_perfumes_matching_columns.sql`

## Pré-checks

- [ ] vérifier que la branche applicative déployée correspond bien à la version auditée
- [ ] confirmer qu'aucune migration concurrente sur `public.perfumes` n'est en attente
- [ ] relire le rapport d'audit `docs/db/20260527_pyparfums_offer_matching_audit.md`
- [ ] vérifier que les fichiers locaux sensibles hors Git ne seront pas inclus

## Backup avant exécution

- [ ] faire un dump PostgreSQL complet avant toute écriture
- [ ] enregistrer le SHA Git exact de la version applicative
- [ ] exporter un snapshot des colonnes actuelles de `public.perfumes`

## Exécution recommandée

### 1. Migration structurelle

- [ ] exécuter uniquement `20260527_add_perfumes_matching_columns.sql`
- [ ] vérifier que les colonnes existent dans `information_schema.columns`
- [ ] vérifier que les index existent dans `pg_indexes`

### 2. Audit post-migration

- [ ] exécuter `20260527_pyparfums_offer_matching_audit.sql`
- [ ] confirmer qu'aucune donnée n'a encore été modifiée

### 3. Backfill contrôlé

- [ ] relire les règles de stabilité du backfill
- [ ] exécuter `20260527_backfill_perfumes_matching_columns.sql`
- [ ] mesurer le nombre exact de lignes modifiées par colonne
- [ ] vérifier un échantillon manuel des lignes enrichies

## Vérifications fonctionnelles après backfill

- [ ] vérifier que `perfumes.ean` et `perfumes.mpn` ont été remplis uniquement sur valeurs stables
- [ ] vérifier que `perfumes.concentration` et `perfumes.volume_ml` n'ont été remplis que pour des cas non ambigus
- [ ] vérifier qu'aucun champ non NULL existant n'a été écrasé
- [ ] relancer l'audit SQL et comparer avant/après
- [ ] relancer un import affiliate en dry-run seulement si validation explicite

## Vérifications de performance

- [ ] vérifier les plans d'exécution sur les requêtes de matching principales
- [ ] confirmer l'utilisation des nouveaux index
- [ ] mesurer l'impact sur les requêtes publiques liées aux offres si nécessaire

## Rollback

Déclencheurs de rollback:

- données backfillées incohérentes
- régression de matching constatée
- problème de performance lié aux index/colonnes

Étapes:

- [ ] sauvegarder les colonnes enrichies avant rollback
- [ ] exécuter `20260527_drop_perfumes_matching_columns.sql` uniquement après validation explicite
- [ ] confirmer la disparition des colonnes et index

## Hors périmètre

- aucune exécution automatique pendant cette PR
- aucun changement du worker affiliate dans cette PR
- aucun changement de logique frontend/backend applicative dans cette PR
