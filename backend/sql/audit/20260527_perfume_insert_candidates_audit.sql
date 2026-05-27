-- Audit read-only for public.perfume_insert_candidates.
-- Use after staging imports and before any promotion into public.perfumes.

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

-- 3) Top candidate brands
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

-- 4) Approved rows ready for promotion
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
    review_status
from public.perfume_insert_candidates
where review_status = 'approved'
order by confidence desc nulls last, id
limit 200;

-- 5) Potential duplicates against public.perfumes by exact brand/name or identifier
select
    pic.id,
    pic.candidate_brand,
    pic.candidate_name,
    pic.candidate_ean,
    pic.candidate_mpn,
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

-- 6) Non-perfume rows detected in staging
select
    id,
    candidate_brand,
    candidate_name,
    candidate_category,
    classification,
    duplicate_reason,
    review_status
from public.perfume_insert_candidates
where classification = 'NON_PERFUME_PRODUCT'
order by candidate_brand nulls last, candidate_name nulls last
limit 200;
