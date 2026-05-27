-- Roll back perfume_insert_candidates tracking additions without dropping the
-- staging table itself.

begin;

drop index if exists idx_perfume_insert_candidates_tracking_review_status;
drop index if exists idx_perfume_insert_candidates_tracking_classification;
drop index if exists idx_perfume_insert_candidates_tracking_review_classification;
drop index if exists idx_perfume_insert_candidates_tracking_last_seen_at;
drop index if exists idx_perfume_insert_candidates_tracking_promoted_at;
drop index if exists idx_perfume_insert_candidates_tracking_promoted_perfume;

alter table public.perfume_insert_candidates
    drop constraint if exists fk_perfume_insert_candidates_promoted_perfume;

alter table public.perfume_insert_candidates
    drop constraint if exists chk_perfume_insert_candidates_review_status;

update public.perfume_insert_candidates
set review_status = case
        when promoted_perfume_id is not null then 'merged_existing'
        else 'approved'
    end
where review_status = 'promoted';

alter table public.perfume_insert_candidates
    add constraint chk_perfume_insert_candidates_review_status
    check (
        review_status in (
            'pending',
            'approved',
            'rejected',
            'merged_existing',
            'needs_more_info'
        )
    );

alter table public.perfume_insert_candidates
    drop column if exists promoted_perfume_id,
    drop column if exists promoted_at,
    drop column if exists seen_count,
    drop column if exists last_seen_at,
    drop column if exists first_seen_at;

commit;
