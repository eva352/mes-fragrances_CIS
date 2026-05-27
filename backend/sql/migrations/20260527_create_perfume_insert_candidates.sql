-- Proposed migration
-- Goal: create a staging/review table for unmatched perfume candidates before
-- any insertion into public.perfumes.
--
-- This script is additive only.
-- It has NOT been executed on production.

begin;

create table if not exists public.perfume_insert_candidates (
    id bigserial primary key,
    source_candidate_id bigint,
    source_offer_id bigint,
    candidate_brand text,
    candidate_name text,
    candidate_concentration text,
    candidate_volume_ml numeric(8, 2),
    candidate_category text,
    candidate_ean text,
    candidate_gtin text,
    candidate_upc text,
    candidate_mpn text,
    candidate_image_url text,
    candidate_source_title text,
    candidate_affiliate_url text,
    classification text not null,
    confidence numeric(5, 4),
    duplicate_risk text,
    duplicate_reason text,
    nearest_perfume_id uuid,
    nearest_perfume_brand text,
    nearest_perfume_name text,
    review_status text not null default 'pending',
    review_notes text,
    reviewed_at timestamptz,
    reviewed_by text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint chk_perfume_insert_candidates_classification
        check (
            classification in (
                'SAFE_INSERT_CANDIDATE',
                'POSSIBLE_DUPLICATE',
                'VARIANT_OF_EXISTING',
                'NON_PERFUME_PRODUCT',
                'NEEDS_MANUAL_REVIEW'
            )
        ),
    constraint chk_perfume_insert_candidates_review_status
        check (
            review_status in (
                'pending',
                'approved',
                'rejected',
                'merged_existing',
                'needs_more_info'
            )
        ),
    constraint chk_perfume_insert_candidates_duplicate_risk
        check (
            duplicate_risk is null
            or duplicate_risk in ('low', 'medium', 'high', 'unknown')
        ),
    constraint fk_perfume_insert_candidates_source_candidate
        foreign key (source_candidate_id)
        references public.product_match_candidates(id)
        on delete set null,
    constraint fk_perfume_insert_candidates_source_offer
        foreign key (source_offer_id)
        references public.offers(id)
        on delete set null,
    constraint fk_perfume_insert_candidates_nearest_perfume
        foreign key (nearest_perfume_id)
        references public.perfumes(id)
        on delete set null
);

comment on table public.perfume_insert_candidates is
    'Manual review staging table for unmatched affiliate products that may represent new perfumes to add to the catalog.';

comment on column public.perfume_insert_candidates.source_candidate_id is
    'Original product_match_candidates.id when the row was derived from the affiliate candidate pipeline.';

comment on column public.perfume_insert_candidates.source_offer_id is
    'Optional original offers.id when a future staging process is built directly from active offers.';

comment on column public.perfume_insert_candidates.classification is
    'Heuristic classification used during staging review: safe insert, duplicate risk, existing variant, non-perfume, or manual review.';

comment on column public.perfume_insert_candidates.duplicate_risk is
    'Optional duplicate risk level used by review tooling: low, medium, high, or unknown.';

comment on column public.perfume_insert_candidates.nearest_perfume_id is
    'Nearest existing public.perfumes UUID according to the staging heuristic. UUID is used because perfumes.id is UUID in CIS.';

comment on column public.perfume_insert_candidates.review_status is
    'Human review status controlling whether a candidate should be promoted into public.perfumes.';

create unique index if not exists idx_perfume_insert_candidates_source_candidate_unique
    on public.perfume_insert_candidates (source_candidate_id)
    where source_candidate_id is not null;

create index if not exists idx_perfume_insert_candidates_review_status
    on public.perfume_insert_candidates (review_status, classification, created_at desc);

create index if not exists idx_perfume_insert_candidates_classification
    on public.perfume_insert_candidates (classification, confidence desc, created_at desc);

create index if not exists idx_perfume_insert_candidates_brand_name_ci
    on public.perfume_insert_candidates (lower(candidate_brand), lower(candidate_name));

create index if not exists idx_perfume_insert_candidates_identifiers
    on public.perfume_insert_candidates (candidate_ean, candidate_mpn);

create index if not exists idx_perfume_insert_candidates_nearest_perfume
    on public.perfume_insert_candidates (nearest_perfume_id)
    where nearest_perfume_id is not null;

commit;
