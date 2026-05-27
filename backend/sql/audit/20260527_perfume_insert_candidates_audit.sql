-- Audit read-only for public.perfume_insert_candidates.
-- Use after staging imports, after tracking backfill, and before any
-- promotion into public.perfumes.

-- 1) Counts by classification
select
    classification,
    count(*) as candidate_count
from public.perfume_insert_candidates
group by classification
order by classification;

-- 2) Counts by review status
select
    review_status,
    count(*) as candidate_count
from public.perfume_insert_candidates
group by review_status
order by review_status;

-- 3) Promoted count and tracking anomalies
select
    count(*) filter (where review_status = 'promoted') as promoted_count,
    count(*) filter (
        where review_status = 'approved'
          and promoted_perfume_id is null
    ) as approved_without_promoted_link,
    count(*) filter (
        where review_status = 'promoted'
          and promoted_perfume_id is null
    ) as promoted_without_promoted_link,
    count(*) filter (
        where review_status = 'promoted'
          and promoted_perfume_id is not null
          and not exists (
              select 1
              from public.perfumes p
              where p.id = public.perfume_insert_candidates.promoted_perfume_id
          )
    ) as promoted_without_perfume
from public.perfume_insert_candidates;

-- 4) Top candidate brands overall
select
    coalesce(nullif(candidate_brand, ''), '(brand missing)') as candidate_brand,
    count(*) as candidate_count,
    count(distinct candidate_name) as distinct_titles,
    count(*) filter (where classification = 'SAFE_INSERT_CANDIDATE') as safe_insert_count,
    count(*) filter (where classification = 'POSSIBLE_DUPLICATE') as duplicate_count,
    count(*) filter (where classification = 'NON_PERFUME_PRODUCT') as non_perfume_count
from public.perfume_insert_candidates
group by coalesce(nullif(candidate_brand, ''), '(brand missing)')
order by candidate_count desc, candidate_brand
limit 50;

-- 5) Recently seen candidates
select
    id,
    candidate_brand,
    candidate_name,
    classification,
    review_status,
    seen_count,
    first_seen_at,
    last_seen_at
from public.perfume_insert_candidates
where last_seen_at >= now() - interval '7 days'
order by last_seen_at desc, id desc
limit 200;

-- 6) Stale pending candidates
select
    id,
    candidate_brand,
    candidate_name,
    classification,
    confidence,
    seen_count,
    first_seen_at,
    last_seen_at
from public.perfume_insert_candidates
where review_status = 'pending'
  and last_seen_at < now() - interval '30 days'
order by last_seen_at asc, id asc
limit 200;

-- 7) Top brands by recent new/repeat candidates
select
    coalesce(nullif(candidate_brand, ''), '(brand missing)') as candidate_brand,
    count(*) filter (where first_seen_at >= now() - interval '7 days') as new_last_7d,
    count(*) filter (
        where last_seen_at >= now() - interval '7 days'
          and seen_count > 1
    ) as repeat_last_7d,
    count(*) filter (where review_status = 'pending') as pending_count
from public.perfume_insert_candidates
group by coalesce(nullif(candidate_brand, ''), '(brand missing)')
having count(*) filter (where last_seen_at >= now() - interval '7 days') > 0
    or count(*) filter (where first_seen_at >= now() - interval '7 days') > 0
order by new_last_7d desc, repeat_last_7d desc, candidate_brand
limit 50;

-- 8) Approved rows still ready for promotion
select
    id,
    candidate_brand,
    candidate_name,
    candidate_concentration,
    candidate_volume_ml,
    candidate_ean,
    candidate_mpn,
    classification,
    confidence,
    review_status,
    seen_count,
    last_seen_at
from public.perfume_insert_candidates
where review_status = 'approved'
order by confidence desc nulls last, last_seen_at desc, id
limit 200;

-- 9) Potential duplicates against public.perfumes by exact brand/name or identifier
select
    pic.id,
    pic.candidate_brand,
    pic.candidate_name,
    pic.candidate_ean,
    pic.candidate_mpn,
    pic.review_status,
    pic.promoted_perfume_id,
    p.id as perfume_id,
    p.brand as perfume_brand,
    p.name as perfume_name,
    case
        when lower(pic.candidate_brand) = lower(p.brand)
         and lower(pic.candidate_name) = lower(p.name)
        then 'exact_brand_name'
        when pic.candidate_ean is not null and pic.candidate_ean = p.ean
        then 'ean'
        when pic.candidate_mpn is not null and pic.candidate_mpn = p.mpn
        then 'mpn'
        when pic.candidate_gtin is not null and pic.candidate_gtin = p.gtin
        then 'gtin'
        when pic.candidate_upc is not null and pic.candidate_upc = p.upc
        then 'upc'
        else 'other'
    end as duplicate_basis
from public.perfume_insert_candidates pic
join public.perfumes p
  on (lower(pic.candidate_brand) = lower(p.brand) and lower(pic.candidate_name) = lower(p.name))
  or (pic.candidate_ean is not null and pic.candidate_ean = p.ean)
  or (pic.candidate_mpn is not null and pic.candidate_mpn = p.mpn)
  or (pic.candidate_gtin is not null and pic.candidate_gtin = p.gtin)
  or (pic.candidate_upc is not null and pic.candidate_upc = p.upc)
order by pic.id, duplicate_basis, p.name
limit 200;

-- 10) Non-perfume rows detected in staging
select
    id,
    candidate_brand,
    candidate_name,
    candidate_category,
    classification,
    duplicate_reason,
    review_status,
    seen_count,
    last_seen_at
from public.perfume_insert_candidates
where classification = 'NON_PERFUME_PRODUCT'
order by candidate_brand nulls last, candidate_name nulls last
limit 200;
