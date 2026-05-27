-- Rollback SQL for the proposed migration 20260527_add_perfumes_matching_columns.sql
--
-- WARNING:
-- This drops columns and therefore drops data unless it has been backed up first.
-- Use only after explicit approval.

begin;

drop index if exists public.idx_perfumes_mpn;
drop index if exists public.idx_perfumes_upc;
drop index if exists public.idx_perfumes_gtin;
drop index if exists public.idx_perfumes_ean;
drop index if exists public.idx_perfumes_concentration_volume;
drop index if exists public.idx_perfumes_brand_name_ci;

alter table public.perfumes
    drop column if exists mpn,
    drop column if exists upc,
    drop column if exists gtin,
    drop column if exists ean,
    drop column if exists volume_ml,
    drop column if exists concentration;

commit;
