-- Audit read-only pour le matching entre public.perfumes, public.offers
-- et public.product_match_candidates.
--
-- Aucun UPDATE / INSERT / DELETE dans ce fichier.

-- 1) Colonnes et schéma
select
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
from information_schema.columns
where table_schema = 'public'
  and table_name in ('perfumes', 'offers', 'product_match_candidates')
order by table_name, ordinal_position;

-- 2) Index existants
select
    tablename,
    indexname,
    indexdef
from pg_indexes
where schemaname = 'public'
  and tablename in ('perfumes', 'offers', 'product_match_candidates')
order by tablename, indexname;

-- 3) Volumétrie brute
select 'perfumes' as table_name, count(*) as row_count from public.perfumes
union all
select 'offers', count(*) from public.offers
union all
select 'product_match_candidates', count(*) from public.product_match_candidates;

-- 4) Taux de remplissage perfumes
select
    count(*) as perfumes_total,
    count(*) filter (where is_published) as perfumes_published,
    count(*) filter (where image_url is not null and btrim(image_url) <> '') as perfumes_with_image,
    count(*) filter (where short_description is not null and btrim(short_description) <> '') as perfumes_with_short_description,
    count(*) filter (where description is not null and btrim(description) <> '') as perfumes_with_description,
    count(*) filter (where gender is not null and btrim(gender) <> '') as perfumes_with_gender,
    count(*) filter (where source_price is not null) as perfumes_with_source_price,
    count(*) filter (where olfactive_family is not null and btrim(olfactive_family) <> '') as perfumes_with_family,
    count(*) filter (where budget_tier is not null and btrim(budget_tier) <> '') as perfumes_with_budget_tier,
    count(*) filter (where jsonb_array_length(top_notes) > 0) as perfumes_with_top_notes,
    count(*) filter (where jsonb_array_length(heart_notes) > 0) as perfumes_with_heart_notes,
    count(*) filter (where jsonb_array_length(base_notes) > 0) as perfumes_with_base_notes,
    count(*) filter (where jsonb_array_length(quiz_tags) > 0) as perfumes_with_quiz_tags
from public.perfumes;

-- 5) Taux de remplissage offers
select
    count(*) as offers_total,
    count(*) filter (where perfume_id is not null) as offers_linked_perfume,
    count(*) filter (where perfume_id is null) as offers_without_perfume,
    count(*) filter (where active) as offers_active,
    count(*) filter (where active and affiliate_url is not null and btrim(affiliate_url) <> '') as offers_active_with_url,
    count(*) filter (where image_url is not null and btrim(image_url) <> '') as offers_with_image,
    count(*) filter (where total_price is not null) as offers_with_total_price,
    count(*) filter (where delivery_cost is not null) as offers_with_delivery_cost,
    count(*) filter (where in_stock is true) as offers_in_stock_true,
    count(*) filter (where in_stock is false) as offers_in_stock_false,
    count(*) filter (where in_stock is null) as offers_in_stock_unknown,
    count(*) filter (where merchant_product_id is not null and btrim(merchant_product_id) <> '') as offers_with_merchant_product_id,
    count(*) filter (where network_product_id is not null and btrim(network_product_id) <> '') as offers_with_network_product_id
from public.offers;

select match_status, count(*)
from public.offers
group by match_status
order by count(*) desc;

select match_method, count(*)
from public.offers
group by match_method
order by count(*) desc nulls last;

-- 6) Taux de remplissage product_match_candidates
select
    count(*) as candidates_total,
    count(*) filter (where proposed_perfume_id is not null) as candidates_with_proposed_perfume,
    count(*) filter (where candidate_brand is not null and btrim(candidate_brand) <> '') as candidates_with_brand,
    count(*) filter (where candidate_concentration is not null and btrim(candidate_concentration) <> '') as candidates_with_concentration,
    count(*) filter (where candidate_volume_ml is not null) as candidates_with_volume_ml,
    count(*) filter (where candidate_image_url is not null and btrim(candidate_image_url) <> '') as candidates_with_image,
    count(*) filter (where candidate_url is not null and btrim(candidate_url) <> '') as candidates_with_url,
    count(*) filter (where dedupe_key is not null and btrim(dedupe_key) <> '') as candidates_with_dedupe_key
from public.product_match_candidates;

select status, count(*)
from public.product_match_candidates
group by status
order by count(*) desc;

select match_reason, count(*)
from public.product_match_candidates
group by match_reason
order by count(*) desc nulls last
limit 20;

-- 7) Candidats par concentration et volume
select candidate_concentration, count(*)
from public.product_match_candidates
where candidate_concentration is not null and btrim(candidate_concentration) <> ''
group by candidate_concentration
order by count(*) desc;

select
    width_bucket(candidate_volume_ml::numeric, 0, 250, 10) as volume_bucket,
    min(candidate_volume_ml) as min_volume_ml,
    max(candidate_volume_ml) as max_volume_ml,
    count(*) as row_count
from public.product_match_candidates
where candidate_volume_ml is not null
group by volume_bucket
order by volume_bucket;

-- 8) Identifiants exacts disponibles côté offers / candidats
select
    count(*) as offers_total,
    count(distinct raw_payload->>'ean') as distinct_ean,
    count(*) filter (where raw_payload->>'ean' ~ '^[0-9]{8,14}$') as valid_numeric_ean,
    count(distinct raw_payload->>'mpn') as distinct_mpn,
    count(distinct raw_payload->>'product_GTIN') as distinct_product_gtin
from public.offers;

select
    count(*) as candidates_total,
    count(distinct enrichment_payload->>'ean') as distinct_ean,
    count(*) filter (where enrichment_payload->>'ean' ~ '^[0-9]{8,14}$') as valid_numeric_ean,
    count(distinct enrichment_payload->>'mpn') as distinct_mpn,
    count(distinct enrichment_payload->>'network_product_id') as distinct_network_product_id,
    count(distinct enrichment_payload->>'merchant_product_id') as distinct_merchant_product_id
from public.product_match_candidates;

-- 9) Parfums avec variantes d'offres non modélisées
with perfume_offer_titles as (
    select
        perfume_id,
        count(*) as offer_count,
        count(distinct title) as distinct_titles
    from public.offers
    where perfume_id is not null
    group by perfume_id
)
select
    count(*) as perfumes_with_offers,
    count(*) filter (where offer_count > 1) as perfumes_with_multiple_offers,
    count(*) filter (where distinct_titles > 1) as perfumes_with_multiple_titles
from perfume_offer_titles;

select
    p.slug,
    p.brand,
    p.name,
    count(*) as offer_count,
    count(distinct o.title) as distinct_titles,
    array_agg(o.title order by o.title) as sample_titles
from public.offers o
join public.perfumes p on p.id = o.perfume_id
group by p.id, p.slug, p.brand, p.name
having count(distinct o.title) > 1
order by count(distinct o.title) desc, count(*) desc
limit 20;

-- 10) Backfill preview: valeurs stables depuis offers
with offer_ids as (
    select
        perfume_id,
        count(distinct raw_payload->>'ean') filter (where coalesce(raw_payload->>'ean', '') <> '') as ean_distinct,
        min(raw_payload->>'ean') filter (where coalesce(raw_payload->>'ean', '') <> '') as ean_value,
        count(distinct raw_payload->>'mpn') filter (where coalesce(raw_payload->>'mpn', '') <> '') as mpn_distinct,
        min(raw_payload->>'mpn') filter (where coalesce(raw_payload->>'mpn', '') <> '') as mpn_value,
        count(distinct image_url) filter (where coalesce(image_url, '') <> '') as image_distinct,
        min(image_url) filter (where coalesce(image_url, '') <> '') as image_value
    from public.offers
    where perfume_id is not null
      and active = true
    group by perfume_id
)
select
    count(*) as perfumes_with_offers,
    count(*) filter (where ean_distinct = 1) as consistent_ean,
    count(*) filter (where mpn_distinct = 1) as consistent_mpn,
    count(*) filter (where image_distinct = 1) as consistent_image
from offer_ids;

-- 11) Backfill preview: valeurs stables depuis product_match_candidates
with candidate_agg as (
    select
        proposed_perfume_id as perfume_id,
        count(distinct candidate_concentration) filter (
            where candidate_concentration is not null
              and btrim(candidate_concentration) <> ''
        ) as concentration_distinct,
        min(candidate_concentration) filter (
            where candidate_concentration is not null
              and btrim(candidate_concentration) <> ''
        ) as concentration_value,
        count(distinct candidate_volume_ml) filter (where candidate_volume_ml is not null) as volume_distinct,
        min(candidate_volume_ml) filter (where candidate_volume_ml is not null) as volume_value
    from public.product_match_candidates
    where proposed_perfume_id is not null
      and coalesce(match_reason, '') not like 'excluded_%'
    group by proposed_perfume_id
)
select
    count(*) filter (where concentration_distinct = 1 and concentration_value is not null) as perfumes_with_consistent_candidate_concentration,
    count(*) filter (where volume_distinct = 1 and volume_value is not null) as perfumes_with_consistent_candidate_volume,
    count(*) filter (
        where concentration_distinct = 1
          and volume_distinct = 1
          and concentration_value is not null
          and volume_value is not null
    ) as perfumes_with_both_from_candidates
from candidate_agg;

-- 12) Anomalie métier: marque absente vs match ambigu
with brand_match as (
    select
        count(*) as total,
        count(*) filter (where lower(match_reason) like '%compatible brand%') as no_brand_match
    from public.product_match_candidates
)
select
    total,
    no_brand_match,
    total - no_brand_match as brand_found_or_other_issue,
    round((no_brand_match::numeric / nullif(total, 0)) * 100, 2) as no_brand_match_pct
from brand_match;
