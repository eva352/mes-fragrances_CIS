-- Promote approved perfume_insert_candidates into public.perfumes and track
-- which staging rows were promoted or merged into an existing perfume.
--
-- Conservative behavior:
-- - only review_status = 'approved' is eligible
-- - rows already marked 'promoted' are ignored
-- - obvious duplicates are not inserted again
-- - rows with an unambiguous existing perfume match are marked
--   'merged_existing'
-- - rows inserted into perfumes are marked 'promoted'

begin;

with approved as (
    select
        pic.id as candidate_id,
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
), exact_existing_matches as (
    select
        a.candidate_id,
        min(p.id) as perfume_id,
        count(*) as perfume_match_count
    from approved a
    join public.perfumes p
      on lower(p.brand) = lower(a.candidate_brand)
     and lower(p.name) = lower(a.candidate_name)
    group by a.candidate_id
), exact_existing_resolved as (
    select
        candidate_id,
        perfume_id
    from exact_existing_matches
    where perfume_match_count = 1
), identifier_existing_matches as (
    select
        a.candidate_id,
        min(p.id) as perfume_id,
        count(*) as perfume_match_count
    from approved a
    join public.perfumes p
      on (a.candidate_ean is not null and p.ean = a.candidate_ean)
      or (a.candidate_gtin is not null and p.gtin = a.candidate_gtin)
      or (a.candidate_upc is not null and p.upc = a.candidate_upc)
      or (a.candidate_mpn is not null and p.mpn = a.candidate_mpn)
    group by a.candidate_id
), identifier_existing_resolved as (
    select
        candidate_id,
        perfume_id
    from identifier_existing_matches
    where perfume_match_count = 1
      and candidate_id not in (select candidate_id from exact_existing_resolved)
), insertable as (
    select
        a.*,
        trim(
            regexp_replace(
                lower(coalesce(a.candidate_brand, '') || ' ' || coalesce(a.candidate_name, '')),
                '[^[:alnum:]]+',
                '-',
                'g'
            )
        ) as slug_base
    from approved a
    where coalesce(btrim(a.candidate_brand), '') <> ''
      and coalesce(btrim(a.candidate_name), '') <> ''
      and a.candidate_id not in (select candidate_id from exact_existing_resolved)
      and a.candidate_id not in (select candidate_id from identifier_existing_resolved)
), numbered as (
    select
        i.*,
        row_number() over (partition by i.slug_base order by i.candidate_id) as slug_rank
    from insertable i
), prepared as (
    select
        n.candidate_id,
        (
            substr(md5('perfume_insert_candidate:' || n.candidate_id::text), 1, 8) || '-' ||
            substr(md5('perfume_insert_candidate:' || n.candidate_id::text), 9, 4) || '-' ||
            substr(md5('perfume_insert_candidate:' || n.candidate_id::text), 13, 4) || '-' ||
            substr(md5('perfume_insert_candidate:' || n.candidate_id::text), 17, 4) || '-' ||
            substr(md5('perfume_insert_candidate:' || n.candidate_id::text), 21, 12)
        )::uuid as perfume_id,
        case
            when n.slug_rank = 1 then n.slug_base
            else n.slug_base || '-' || n.candidate_id::text
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
              else n.slug_base || '-' || n.candidate_id::text
          end
      )
), inserted as (
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
        p.perfume_id,
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
    returning id
), inserted_resolved as (
    select
        p.candidate_id,
        p.perfume_id
    from prepared p
    join inserted i on i.id = p.perfume_id
), resolved as (
    select
        candidate_id,
        perfume_id,
        'merged_existing'::text as target_review_status,
        'Marked as merged_existing after exact match to an already existing perfume.'::text as note
    from exact_existing_resolved

    union all

    select
        candidate_id,
        perfume_id,
        'merged_existing'::text as target_review_status,
        'Marked as merged_existing after identifier match to an already existing perfume.'::text as note
    from identifier_existing_resolved

    union all

    select
        candidate_id,
        perfume_id,
        'promoted'::text as target_review_status,
        'Promoted into public.perfumes by controlled approved-candidate script.'::text as note
    from inserted_resolved
)
update public.perfume_insert_candidates pic
set promoted_perfume_id = r.perfume_id,
    promoted_at = coalesce(pic.promoted_at, now()),
    review_status = r.target_review_status,
    updated_at = now(),
    review_notes = coalesce(pic.review_notes || E'\n', '') || r.note
from resolved r
where pic.id = r.candidate_id
  and pic.review_status = 'approved';

commit;
