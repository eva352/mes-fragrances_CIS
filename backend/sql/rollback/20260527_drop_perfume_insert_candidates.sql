-- Proposed rollback
-- Goal: drop the staging table introduced for perfume insert candidates.
--
-- This script is destructive and should only be run after explicit validation.

begin;

drop table if exists public.perfume_insert_candidates;

commit;
