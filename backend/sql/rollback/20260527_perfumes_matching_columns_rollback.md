# Rollback strategy: proposed `perfumes` matching columns

Ce document décrit la stratégie de rollback pour:

- la migration `20260527_add_perfumes_matching_columns.sql`
- le backfill `20260527_backfill_perfumes_matching_columns.sql`

## Important

Cette stratégie n'a pas été exécutée.  
Elle suppose qu'aucune autre écriture applicative n'a encore commencé à utiliser les nouvelles colonnes.

## Principe

Le rollback doit être fait en deux temps:

1. sauvegarder les valeurs qui auraient été ajoutées
2. supprimer index puis colonnes

## Étape 0: backup logique avant rollback

Exporter les colonnes ajoutées avant toute suppression:

```sql
create table if not exists public.perfumes_matching_columns_backup_20260527 as
select
    id,
    slug,
    brand,
    name,
    concentration,
    volume_ml,
    ean,
    gtin,
    upc,
    mpn,
    image_url,
    now() as backed_up_at
from public.perfumes;
```

Si une table de backup en base n'est pas souhaitée, faire à minima un export CSV/SQL externe.

## Étape 1: supprimer les index ajoutés

```sql
drop index if exists public.idx_perfumes_mpn;
drop index if exists public.idx_perfumes_upc;
drop index if exists public.idx_perfumes_gtin;
drop index if exists public.idx_perfumes_ean;
drop index if exists public.idx_perfumes_concentration_volume;
drop index if exists public.idx_perfumes_brand_name_ci;
```

## Étape 2: supprimer les colonnes ajoutées

```sql
alter table public.perfumes
    drop column if exists mpn,
    drop column if exists upc,
    drop column if exists gtin,
    drop column if exists ean,
    drop column if exists volume_ml,
    drop column if exists concentration;
```

## Quand ne PAS rollback

Ne pas rollback si:

- le worker affiliate a déjà commencé à utiliser ces colonnes en production
- des données manuelles ont été saisies dans ces colonnes
- des index exact-match sont déjà utilisés par des scripts métiers

Dans ce cas, préférer:

- rollback applicatif seulement
- ou gel de la feature avec colonnes conservées

## Vérifications post-rollback

```sql
select column_name
from information_schema.columns
where table_schema = 'public'
  and table_name = 'perfumes'
  and column_name in ('concentration', 'volume_ml', 'ean', 'gtin', 'upc', 'mpn');

select indexname
from pg_indexes
where schemaname = 'public'
  and tablename = 'perfumes'
  and indexname in (
      'idx_perfumes_brand_name_ci',
      'idx_perfumes_concentration_volume',
      'idx_perfumes_ean',
      'idx_perfumes_gtin',
      'idx_perfumes_upc',
      'idx_perfumes_mpn'
  );
```

Résultat attendu:

- aucune colonne restante
- aucun index restant
