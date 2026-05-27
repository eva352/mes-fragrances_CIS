-- Initialize tracking columns on existing perfume_insert_candidates rows and
-- link already approved rows to perfumes when the correspondence is exact and
-- unambiguous.
--
-- This script never inserts into public.perfumes.

begin;

update public.perfume_insert_candidates pic
set first_seen_at = coalesce(pic.first_seen_at, pic.created_at, now()),
    last_seen_at = coalesce(pic.last_seen_at, pic.updated_at, pic.created_at, now()),
    seen_count = coalesce(nullif(pic.seen_count, 0), 1)
where pic.first_seen_at is null
   or pic.last_seen_at is null
   or pic.seen_count is null
   or pic.seen_count <= 0;

with exact_matches_ranked as (
    select
        pic.id as candidate_id,
        p.id as perfume_id,
        row_number() over (
            partition by pic.id
            order by p.id::text
        ) as perfume_rank,
        count(*) over (
            partition by pic.id
        ) as perfume_match_count
    from public.perfume_insert_candidates pic
    join public.perfumes p
      on lower(p.brand) = lower(pic.candidate_brand)
     and lower(p.name) = lower(pic.candidate_name)
    where pic.review_status = 'approved'
), resolvable as (
    select
        candidate_id,
        perfume_id
    from exact_matches_ranked
    where perfume_match_count = 1
      and perfume_rank = 1
), ambiguous as (
    select distinct
        candidate_id
    from exact_matches_ranked
    where perfume_match_count > 1
)
update public.perfume_insert_candidates pic
set promoted_perfume_id = r.perfume_id,
    promoted_at = coalesce(pic.promoted_at, now()),
    review_status = 'promoted',
    updated_at = now(),
    review_notes = coalesce(pic.review_notes || E'\n', '')
        || 'Backfilled as promoted after exact brand/name match against public.perfumes.'
from resolvable r
where pic.id = r.candidate_id
  and pic.review_status = 'approved'
  and pic.promoted_perfume_id is null;

select
    'approved_remaining' as metric,
    count(*) as value
from public.perfume_insert_candidates
where review_status = 'approved'

union all

select
    'promoted_with_link' as metric,
    count(*) as value
from public.perfume_insert_candidates
where review_status = 'promoted'
  and promoted_perfume_id is not null

union all

select
    'approved_ambiguous_matches' as metric,
    count(*) as value
from public.perfume_insert_candidates pic
where pic.review_status = 'approved'
  and exists (
      select 1
      from ambiguous a
      where a.candidate_id = pic.id
  )

union all

select
    'approved_without_match' as metric,
    count(*) as value
from public.perfume_insert_candidates pic
where pic.review_status = 'approved'
  and not exists (
      select 1
      from exact_matches_ranked emr
      where emr.candidate_id = pic.id
  );

commit;
