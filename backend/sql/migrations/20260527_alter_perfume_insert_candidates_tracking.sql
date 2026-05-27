-- Add tracking fields to public.perfume_insert_candidates so daily staging can
-- distinguish new sightings, repeated sightings, and already promoted rows.
--
-- This migration is additive and intended to be safe to re-run.

begin;

alter table public.perfume_insert_candidates
    add column if not exists first_seen_at timestamptz not null default now(),
    add column if not exists last_seen_at timestamptz not null default now(),
    add column if not exists seen_count integer not null default 1,
    add column if not exists promoted_at timestamptz,
    add column if not exists promoted_perfume_id uuid;

update public.perfume_insert_candidates
set first_seen_at = coalesce(first_seen_at, created_at, now()),
    last_seen_at = coalesce(last_seen_at, updated_at, created_at, now()),
    seen_count = coalesce(nullif(seen_count, 0), 1)
where first_seen_at is null
   or last_seen_at is null
   or seen_count is null
   or seen_count <= 0;

do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'fk_perfume_insert_candidates_promoted_perfume'
          and conrelid = 'public.perfume_insert_candidates'::regclass
    ) then
        alter table public.perfume_insert_candidates
            add constraint fk_perfume_insert_candidates_promoted_perfume
            foreign key (promoted_perfume_id)
            references public.perfumes(id)
            on delete set null;
    end if;
end
$$;

alter table public.perfume_insert_candidates
    drop constraint if exists chk_perfume_insert_candidates_review_status;

alter table public.perfume_insert_candidates
    add constraint chk_perfume_insert_candidates_review_status
    check (
        review_status in (
            'pending',
            'approved',
            'rejected',
            'merged_existing',
            'needs_more_info',
            'promoted'
        )
    );

comment on column public.perfume_insert_candidates.first_seen_at is
    'First time the candidate was staged for manual review.';

comment on column public.perfume_insert_candidates.last_seen_at is
    'Last time the candidate was seen again by the staging sync.';

comment on column public.perfume_insert_candidates.seen_count is
    'How many staging syncs saw the same candidate source again.';

comment on column public.perfume_insert_candidates.promoted_at is
    'Timestamp when the candidate was promoted into perfumes or linked to an existing perfume unambiguously.';

comment on column public.perfume_insert_candidates.promoted_perfume_id is
    'Linked perfumes.id once the candidate has been promoted or merged into an existing perfume.';

create index if not exists idx_perfume_insert_candidates_tracking_review_status
    on public.perfume_insert_candidates (review_status);

create index if not exists idx_perfume_insert_candidates_tracking_classification
    on public.perfume_insert_candidates (classification);

create index if not exists idx_perfume_insert_candidates_tracking_review_classification
    on public.perfume_insert_candidates (review_status, classification);

create index if not exists idx_perfume_insert_candidates_tracking_last_seen_at
    on public.perfume_insert_candidates (last_seen_at desc);

create index if not exists idx_perfume_insert_candidates_tracking_promoted_at
    on public.perfume_insert_candidates (promoted_at desc)
    where promoted_at is not null;

create index if not exists idx_perfume_insert_candidates_tracking_promoted_perfume
    on public.perfume_insert_candidates (promoted_perfume_id)
    where promoted_perfume_id is not null;

commit;
