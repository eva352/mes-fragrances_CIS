-- Populate or refresh public.perfume_insert_candidates from
-- public.product_match_candidates without writing into public.perfumes.
--
-- Conservative staging rules:
-- - stage only SAFE_INSERT_CANDIDATE and NEEDS_MANUAL_REVIEW
-- - preserve manual review decisions
-- - on repeated sightings, update last_seen_at and seen_count
-- - only refresh candidate fields when review_status is still pending

begin;

with candidates as (
    select
        pmc.id as source_candidate_id,
        pmc.advertiser_id,
        pmc.candidate_brand,
        pmc.candidate_name,
        pmc.candidate_concentration,
        pmc.candidate_volume_ml,
        pmc.candidate_category,
        pmc.candidate_image_url,
        pmc.candidate_url,
        pmc.source_count,
        pmc.advertiser_count,
        pmc.status,
        pmc.match_reason,
        nullif(btrim(pmc.enrichment_payload->>'ean'), '') as candidate_ean,
        nullif(btrim(pmc.enrichment_payload->>'gtin'), '') as candidate_gtin,
        nullif(btrim(pmc.enrichment_payload->>'upc'), '') as candidate_upc,
        nullif(btrim(pmc.enrichment_payload->>'mpn'), '') as candidate_mpn,
        nullif(btrim(pmc.enrichment_payload->>'affiliate_url'), '') as candidate_affiliate_url,
        nullif(btrim(pmc.enrichment_payload->>'title'), '') as candidate_source_title,
        lower(trim(regexp_replace(coalesce(pmc.candidate_brand, ''), '[^[:alnum:]]+', ' ', 'g'))) as brand_norm,
        lower(trim(regexp_replace(coalesce(pmc.candidate_name, ''), '[^[:alnum:]]+', ' ', 'g'))) as name_norm,
        trim(regexp_replace(
            regexp_replace(
                regexp_replace(lower(coalesce(pmc.candidate_name, '')), '(\d+(?:[\.,]\d+)?\s*(ml|g|oz))', ' ', 'gi'),
                '(eau de parfum|eau de toilette|eau de cologne|eau fraiche|parfum|extrait|edp|edt|edc)', ' ', 'gi'
            ),
            '[^[:alnum:]]+', ' ', 'g'
        )) as name_base_norm,
        lower(concat_ws(' ', coalesce(pmc.candidate_name, ''), coalesce(pmc.candidate_category, ''), coalesce(pmc.match_reason, ''))) as classification_text
    from public.product_match_candidates pmc
    where pmc.proposed_perfume_id is null
      and pmc.status in ('pending', 'needs_review')
), perfumes as (
    select
        p.id as perfume_id,
        p.brand,
        p.name,
        p.ean,
        p.gtin,
        p.upc,
        p.mpn,
        lower(trim(regexp_replace(coalesce(p.brand, ''), '[^[:alnum:]]+', ' ', 'g'))) as brand_norm,
        lower(trim(regexp_replace(coalesce(p.name, ''), '[^[:alnum:]]+', ' ', 'g'))) as name_norm,
        trim(regexp_replace(
            regexp_replace(
                regexp_replace(lower(coalesce(p.name, '')), '(\d+(?:[\.,]\d+)?\s*(ml|g|oz))', ' ', 'gi'),
                '(eau de parfum|eau de toilette|eau de cologne|eau fraiche|parfum|extrait|edp|edt|edc)', ' ', 'gi'
            ),
            '[^[:alnum:]]+', ' ', 'g'
        )) as name_base_norm
    from public.perfumes p
), candidate_perfume_pairs as (
    select
        c.source_candidate_id,
        p.perfume_id,
        p.brand,
        p.name,
        (p.brand_norm = c.brand_norm) as brand_match,
        (p.brand_norm = c.brand_norm and p.name_norm = c.name_norm) as exact_name_match,
        (p.brand_norm = c.brand_norm and c.name_base_norm <> '' and p.name_base_norm = c.name_base_norm) as base_name_match,
        (
            p.brand_norm = c.brand_norm
            and c.name_base_norm <> ''
            and p.name_base_norm <> ''
            and (
                position(p.name_base_norm in c.name_base_norm) > 0
                or position(c.name_base_norm in p.name_base_norm) > 0
            )
        ) as partial_name_match,
        (
            (c.candidate_ean is not null and p.ean = c.candidate_ean)
            or (c.candidate_gtin is not null and p.gtin = c.candidate_gtin)
            or (c.candidate_upc is not null and p.upc = c.candidate_upc)
            or (c.candidate_mpn is not null and p.mpn = c.candidate_mpn)
        ) as identifier_match
    from candidates c
    join perfumes p
      on p.brand_norm = c.brand_norm
      or (c.candidate_ean is not null and p.ean = c.candidate_ean)
      or (c.candidate_gtin is not null and p.gtin = c.candidate_gtin)
      or (c.candidate_upc is not null and p.upc = c.candidate_upc)
      or (c.candidate_mpn is not null and p.mpn = c.candidate_mpn)
), ranked_pairs as (
    select
        cpp.*,
        row_number() over (
            partition by cpp.source_candidate_id
            order by
                cpp.identifier_match desc,
                cpp.exact_name_match desc,
                cpp.base_name_match desc,
                cpp.partial_name_match desc,
                cpp.name
        ) as nearest_rank
    from candidate_perfume_pairs cpp
), pair_stats as (
    select
        source_candidate_id,
        count(distinct perfume_id) filter (where brand_match) as brand_match_count,
        count(distinct perfume_id) filter (where exact_name_match) as exact_name_match_count,
        count(distinct perfume_id) filter (where base_name_match) as base_name_match_count,
        count(distinct perfume_id) filter (where partial_name_match) as partial_name_match_count,
        count(distinct perfume_id) filter (where identifier_match) as identifier_match_count
    from candidate_perfume_pairs
    group by source_candidate_id
), nearest_perfume as (
    select
        source_candidate_id,
        perfume_id as nearest_perfume_id,
        brand as nearest_perfume_brand,
        name as nearest_perfume_name
    from ranked_pairs
    where nearest_rank = 1
), classified as (
    select
        c.source_candidate_id,
        c.candidate_brand,
        c.candidate_name,
        c.candidate_concentration,
        c.candidate_volume_ml,
        c.candidate_category,
        c.candidate_ean,
        c.candidate_gtin,
        c.candidate_upc,
        c.candidate_mpn,
        c.candidate_image_url,
        c.candidate_source_title,
        c.candidate_affiliate_url,
        c.source_count,
        c.match_reason,
        coalesce(ps.brand_match_count, 0) as brand_match_count,
        coalesce(ps.exact_name_match_count, 0) as exact_name_match_count,
        coalesce(ps.base_name_match_count, 0) as base_name_match_count,
        coalesce(ps.partial_name_match_count, 0) as partial_name_match_count,
        coalesce(ps.identifier_match_count, 0) as identifier_match_count,
        np.nearest_perfume_id,
        np.nearest_perfume_brand,
        np.nearest_perfume_name,
        (
            c.classification_text ~* '(^|[^[:alnum:]])(coffret|set|gift set|lot|deodorant|déodorant|deo|shower gel|gel douche|body lotion|lait corps|miniature|sample|tester|refill|recharge|after shave|savon|soap|bougie|candle|diffuseur)($|[^[:alnum:]])'
            or c.match_reason ilike 'excluded_%'
        ) as non_perfume_flag,
        (c.match_reason = 'No catalog perfume with a compatible brand was found.') as no_brand_match_reason
    from candidates c
    left join pair_stats ps on ps.source_candidate_id = c.source_candidate_id
    left join nearest_perfume np on np.source_candidate_id = c.source_candidate_id
), staged as (
    select
        source_candidate_id,
        candidate_brand,
        candidate_name,
        candidate_concentration,
        candidate_volume_ml,
        candidate_category,
        candidate_ean,
        candidate_gtin,
        candidate_upc,
        candidate_mpn,
        candidate_image_url,
        candidate_source_title,
        candidate_affiliate_url,
        case
            when non_perfume_flag then 'NON_PERFUME_PRODUCT'
            when identifier_match_count > 0 or exact_name_match_count > 0 then 'POSSIBLE_DUPLICATE'
            when base_name_match_count > 0 and (
                candidate_concentration is not null
                or candidate_volume_ml is not null
                or candidate_name ~* '(parfum|edp|edt|extrait|eau de parfum|eau de toilette)'
            ) then 'VARIANT_OF_EXISTING'
            when partial_name_match_count > 0 then 'POSSIBLE_DUPLICATE'
            when no_brand_match_reason and brand_match_count = 0 then 'SAFE_INSERT_CANDIDATE'
            else 'NEEDS_MANUAL_REVIEW'
        end as classification,
        case
            when non_perfume_flag then 0.99
            when identifier_match_count > 0 then 0.95
            when exact_name_match_count > 0 then 0.90
            when base_name_match_count > 0 then 0.80
            when partial_name_match_count > 0 then 0.67
            when no_brand_match_reason and brand_match_count = 0 and coalesce(source_count, 0) >= 2 then 0.84
            when no_brand_match_reason and brand_match_count = 0 then 0.76
            else 0.50
        end as confidence,
        case
            when non_perfume_flag then 'high'
            when identifier_match_count > 0 or exact_name_match_count > 0 then 'high'
            when base_name_match_count > 0 or partial_name_match_count > 0 then 'medium'
            when no_brand_match_reason and brand_match_count = 0 then 'low'
            else 'unknown'
        end as duplicate_risk,
        case
            when non_perfume_flag then 'Keyword or exclusion reason indicates non-perfume product.'
            when identifier_match_count > 0 then 'Identifier already matches an existing perfume.'
            when exact_name_match_count > 0 then 'Exact brand/name match already exists in perfumes.'
            when base_name_match_count > 0 then 'Existing perfume base name found; candidate looks like a concentration or bottle-size variant.'
            when partial_name_match_count > 0 then 'Same-brand partial name overlap suggests likely duplicate.'
            when no_brand_match_reason and brand_match_count = 0 then 'No compatible brand found in perfumes and no close existing perfume was detected.'
            else 'Unresolved weak match; manual review still required.'
        end as duplicate_reason,
        nearest_perfume_id,
        nearest_perfume_brand,
        nearest_perfume_name
    from classified
)
insert into public.perfume_insert_candidates (
    source_candidate_id,
    candidate_brand,
    candidate_name,
    candidate_concentration,
    candidate_volume_ml,
    candidate_category,
    candidate_ean,
    candidate_gtin,
    candidate_upc,
    candidate_mpn,
    candidate_image_url,
    candidate_source_title,
    candidate_affiliate_url,
    classification,
    confidence,
    duplicate_risk,
    duplicate_reason,
    nearest_perfume_id,
    nearest_perfume_brand,
    nearest_perfume_name,
    first_seen_at,
    last_seen_at,
    seen_count
)
select
    source_candidate_id,
    candidate_brand,
    candidate_name,
    candidate_concentration,
    candidate_volume_ml,
    candidate_category,
    candidate_ean,
    candidate_gtin,
    candidate_upc,
    candidate_mpn,
    candidate_image_url,
    candidate_source_title,
    candidate_affiliate_url,
    classification,
    confidence,
    duplicate_risk,
    duplicate_reason,
    nearest_perfume_id,
    nearest_perfume_brand,
    nearest_perfume_name,
    now(),
    now(),
    1
from staged s
where s.classification in ('SAFE_INSERT_CANDIDATE', 'NEEDS_MANUAL_REVIEW')
on conflict (source_candidate_id)
    where source_candidate_id is not null
do update
set candidate_brand = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_brand
        else public.perfume_insert_candidates.candidate_brand
    end,
    candidate_name = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_name
        else public.perfume_insert_candidates.candidate_name
    end,
    candidate_concentration = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_concentration
        else public.perfume_insert_candidates.candidate_concentration
    end,
    candidate_volume_ml = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_volume_ml
        else public.perfume_insert_candidates.candidate_volume_ml
    end,
    candidate_category = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_category
        else public.perfume_insert_candidates.candidate_category
    end,
    candidate_ean = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_ean
        else public.perfume_insert_candidates.candidate_ean
    end,
    candidate_gtin = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_gtin
        else public.perfume_insert_candidates.candidate_gtin
    end,
    candidate_upc = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_upc
        else public.perfume_insert_candidates.candidate_upc
    end,
    candidate_mpn = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_mpn
        else public.perfume_insert_candidates.candidate_mpn
    end,
    candidate_image_url = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_image_url
        else public.perfume_insert_candidates.candidate_image_url
    end,
    candidate_source_title = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_source_title
        else public.perfume_insert_candidates.candidate_source_title
    end,
    candidate_affiliate_url = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.candidate_affiliate_url
        else public.perfume_insert_candidates.candidate_affiliate_url
    end,
    classification = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.classification
        else public.perfume_insert_candidates.classification
    end,
    confidence = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.confidence
        else public.perfume_insert_candidates.confidence
    end,
    duplicate_risk = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.duplicate_risk
        else public.perfume_insert_candidates.duplicate_risk
    end,
    duplicate_reason = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.duplicate_reason
        else public.perfume_insert_candidates.duplicate_reason
    end,
    nearest_perfume_id = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.nearest_perfume_id
        else public.perfume_insert_candidates.nearest_perfume_id
    end,
    nearest_perfume_brand = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.nearest_perfume_brand
        else public.perfume_insert_candidates.nearest_perfume_brand
    end,
    nearest_perfume_name = case
        when public.perfume_insert_candidates.review_status = 'pending' then excluded.nearest_perfume_name
        else public.perfume_insert_candidates.nearest_perfume_name
    end,
    last_seen_at = now(),
    seen_count = coalesce(public.perfume_insert_candidates.seen_count, 1) + 1,
    updated_at = now();

commit;
