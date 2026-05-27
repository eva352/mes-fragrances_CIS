-- Proposed migration
-- Goal: enrich public.perfumes with columns already supported by the affiliate
-- matching worker, without modifying existing data.
--
-- This script is additive only.
-- It has NOT been executed on production.

begin;

alter table public.perfumes
    add column if not exists concentration text,
    add column if not exists volume_ml numeric(10, 2),
    add column if not exists ean text,
    add column if not exists gtin text,
    add column if not exists upc text,
    add column if not exists mpn text;

comment on column public.perfumes.concentration is
    'Canonical concentration used by affiliate matching (edp, edt, parfum, extrait, edc, eau_fraiche).';

comment on column public.perfumes.volume_ml is
    'Canonical bottle volume in milliliters used by affiliate matching.';

comment on column public.perfumes.ean is
    'EAN identifier usable for exact affiliate offer matching.';

comment on column public.perfumes.gtin is
    'GTIN identifier usable for exact affiliate offer matching.';

comment on column public.perfumes.upc is
    'UPC identifier usable for exact affiliate offer matching.';

comment on column public.perfumes.mpn is
    'Manufacturer part number usable for exact affiliate offer matching.';

create index if not exists idx_perfumes_brand_name_ci
    on public.perfumes (lower(brand), lower(name));

create index if not exists idx_perfumes_concentration_volume
    on public.perfumes (concentration, volume_ml);

create index if not exists idx_perfumes_ean
    on public.perfumes (ean)
    where ean is not null;

create index if not exists idx_perfumes_gtin
    on public.perfumes (gtin)
    where gtin is not null;

create index if not exists idx_perfumes_upc
    on public.perfumes (upc)
    where upc is not null;

create index if not exists idx_perfumes_mpn
    on public.perfumes (mpn)
    where mpn is not null;

commit;
