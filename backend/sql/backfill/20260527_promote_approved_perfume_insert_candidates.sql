-- Proposed promotion script
-- Goal: insert approved staging rows into public.perfumes without touching
-- non-approved candidates and without promoting obvious duplicates.
--
-- Important:
-- - this script inserts into public.perfumes only
-- - it does not change review_status automatically
-- - follow-up review bookkeeping remains a manual or later application step

begin;

with approved as (
    select
        pic.id,
        pic.candidate_brand,
        pic.candidate_name,
        pic.candidate_concentration,
        pic.candidate_volume_ml,
        pic.candidate_ean,
        pic.candidate_gtin,
        pic.candidate_upc,
        pic.candidate_mpn,
        pic.candidate_image_url
    from public.perfume_insert_candidates pic
    where pic.review_status = 'approved'
      and pic.classification in ('SAFE_INSERT_CANDIDATE', 'NEEDS_MANUAL_REVIEW')
), deduped as (
    select
        a.*,
        trim(regexp_replace(lower(coalesce(a.candidate_brand, '') || ' ' || coalesce(a.candidate_name, '')), '[^[:alnum:]]+', '-', 'g')) as slug_base
    from approved a
    where coalesce(btrim(a.candidate_brand), '') <> ''
      and coalesce(btrim(a.candidate_name), '') <> ''
      and not exists (
          select 1
          from public.perfumes p
          where lower(p.brand) = lower(a.candidate_brand)
            and lower(p.name) = lower(a.candidate_name)
      )
      and not exists (
          select 1
          from public.perfumes p
          where (a.candidate_ean is not null and p.ean = a.candidate_ean)
             or (a.candidate_gtin is not null and p.gtin = a.candidate_gtin)
             or (a.candidate_upc is not null and p.upc = a.candidate_upc)
             or (a.candidate_mpn is not null and p.mpn = a.candidate_mpn)
      )
), numbered as (
    select
        d.*,
        row_number() over (partition by d.slug_base order by d.id) as slug_rank
    from deduped d
), prepared as (
    select
        (
            substr(md5('perfume_insert_candidate:' || n.id::text), 1, 8) || '-' ||
            substr(md5('perfume_insert_candidate:' || n.id::text), 9, 4) || '-' ||
            substr(md5('perfume_insert_candidate:' || n.id::text), 13, 4) || '-' ||
            substr(md5('perfume_insert_candidate:' || n.id::text), 17, 4) || '-' ||
            substr(md5('perfume_insert_candidate:' || n.id::text), 21, 12)
        )::uuid as id,
        case
            when n.slug_rank = 1 then n.slug_base
            else n.slug_base || '-' || n.id::text
        end as slug,
        n.candidate_name as name,
        n.candidate_brand as brand,
        n.candidate_image_url as image_url,
        n.candidate_concentration as concentration,
        n.candidate_volume_ml as volume_ml,
        n.candidate_ean as ean,
        n.candidate_gtin as gtin,
        n.candidate_upc as upc,
        n.candidate_mpn as mpn
    from numbered n
    where n.slug_base <> ''
      and not exists (
          select 1
          from public.perfumes p
          where p.slug = case
              when n.slug_rank = 1 then n.slug_base
              else n.slug_base || '-' || n.id::text
          end
      )
)
insert into public.perfumes (
    id,
    slug,
    name,
    brand,
    image_url,
    concentration,
    volume_ml,
    ean,
    gtin,
    upc,
    mpn
)
select
    p.id,
    p.slug,
    p.name,
    p.brand,
    p.image_url,
    p.concentration,
    p.volume_ml,
    p.ean,
    p.gtin,
    p.upc,
    p.mpn
from prepared p
returning id, slug, brand, name;

commit;

-- Manual follow-up after promotion:
-- - review the returned inserted rows
-- - if needed, set public.perfume_insert_candidates.review_status manually to a
--   post-promotion state once a reliable promotion-tracking convention exists
