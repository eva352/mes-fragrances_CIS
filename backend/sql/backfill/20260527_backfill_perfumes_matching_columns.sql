-- Proposed backfill
-- Goal: populate only NULL target fields on public.perfumes using stable, auditable
-- sources from public.offers and public.product_match_candidates.
--
-- This script is intentionally conservative:
-- - only updates rows when the source value is unique per perfume
-- - only updates target columns when the current value is NULL
-- - excludes candidate rows flagged as excluded_* for concentration/volume
--
-- This script has NOT been executed.

begin;

-- 1) Backfill image_url, ean and mpn from active affiliate offers
-- only when all active offers linked to the perfume agree on the value.
with stable_offer_values as (
    select
        perfume_id,
        min(image_url) filter (where coalesce(image_url, '') <> '') as image_url_value,
        count(distinct image_url) filter (where coalesce(image_url, '') <> '') as image_url_distinct,
        min(raw_payload->>'ean') filter (where coalesce(raw_payload->>'ean', '') <> '') as ean_value,
        count(distinct raw_payload->>'ean') filter (where coalesce(raw_payload->>'ean', '') <> '') as ean_distinct,
        min(raw_payload->>'mpn') filter (where coalesce(raw_payload->>'mpn', '') <> '') as mpn_value,
        count(distinct raw_payload->>'mpn') filter (where coalesce(raw_payload->>'mpn', '') <> '') as mpn_distinct
    from public.offers
    where perfume_id is not null
      and active = true
      and affiliate_url is not null
    group by perfume_id
)
update public.perfumes p
set
    image_url = case
        when p.image_url is null
         and sov.image_url_distinct = 1
         and sov.image_url_value is not null
        then sov.image_url_value
        else p.image_url
    end,
    ean = case
        when p.ean is null
         and sov.ean_distinct = 1
         and sov.ean_value is not null
        then sov.ean_value
        else p.ean
    end,
    mpn = case
        when p.mpn is null
         and sov.mpn_distinct = 1
         and sov.mpn_value is not null
        then sov.mpn_value
        else p.mpn
    end
from stable_offer_values sov
where p.id = sov.perfume_id
  and (
      (p.image_url is null and sov.image_url_distinct = 1 and sov.image_url_value is not null)
   or (p.ean is null and sov.ean_distinct = 1 and sov.ean_value is not null)
   or (p.mpn is null and sov.mpn_distinct = 1 and sov.mpn_value is not null)
  );

-- 2) Backfill concentration and volume_ml from product_match_candidates
-- only when a proposed perfume exists and the candidate values are stable.
with stable_candidate_values as (
    select
        proposed_perfume_id as perfume_id,
        min(candidate_concentration) filter (
            where candidate_concentration is not null
              and btrim(candidate_concentration) <> ''
        ) as concentration_value,
        count(distinct candidate_concentration) filter (
            where candidate_concentration is not null
              and btrim(candidate_concentration) <> ''
        ) as concentration_distinct,
        min(candidate_volume_ml) filter (where candidate_volume_ml is not null) as volume_value,
        count(distinct candidate_volume_ml) filter (where candidate_volume_ml is not null) as volume_distinct
    from public.product_match_candidates
    where proposed_perfume_id is not null
      and coalesce(match_reason, '') not like 'excluded_%'
    group by proposed_perfume_id
)
update public.perfumes p
set
    concentration = case
        when p.concentration is null
         and scv.concentration_distinct = 1
         and scv.concentration_value is not null
        then scv.concentration_value
        else p.concentration
    end,
    volume_ml = case
        when p.volume_ml is null
         and scv.volume_distinct = 1
         and scv.volume_value is not null
        then scv.volume_value
        else p.volume_ml
    end
from stable_candidate_values scv
where p.id = scv.perfume_id
  and (
      (p.concentration is null and scv.concentration_distinct = 1 and scv.concentration_value is not null)
   or (p.volume_ml is null and scv.volume_distinct = 1 and scv.volume_value is not null)
  );

commit;
