import Link from "next/link";

import { PerfumeCard } from "@/components/site/perfume-card";
import { PerfumeFiltersForm } from "@/components/site/perfume-filters-form";
import { SearchInlineForm } from "@/components/site/search-inline-form";
import { Button } from "@/components/ui/button";
import { getPublicPerfumeFilters, searchPublicPerfumePage } from "@/lib/api/public-perfumes";
import { PUBLIC_PATHS } from "@/lib/site/public-paths";
import { getPublicProjectInfo } from "@/lib/site/project";

const CATALOG_PAGE_SIZE = 24;
const CATALOG_FETCH_LIMIT = CATALOG_PAGE_SIZE + 1;

export type CatalogSearchParams = {
  q?: string | string[];
  page?: string | string[];
  gender?: string | string[];
  brand?: string | string[];
  family?: string | string[];
  minPrice?: string | string[];
  maxPrice?: string | string[];
};

function firstValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function listValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  return value?.trim() ? [value.trim()] : [];
}

function parsePrice(value: string) {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

function parsePage(value?: string | string[]) {
  const parsed = Number(firstValue(value));
  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

function buildHiddenInputs({
  selectedGenders,
  selectedBrands,
  selectedFamilies,
  minPrice,
  maxPrice,
}: {
  selectedGenders: string[];
  selectedBrands: string[];
  selectedFamilies: string[];
  minPrice: number | null;
  maxPrice: number | null;
}) {
  const hiddenInputs: Array<{ name: string; value: string }> = [
    ...selectedGenders.map((value) => ({ name: "gender", value })),
    ...selectedBrands.map((value) => ({ name: "brand", value })),
    ...selectedFamilies.map((value) => ({ name: "family", value })),
  ];

  if (minPrice != null) {
    hiddenInputs.push({ name: "minPrice", value: String(minPrice) });
  }

  if (maxPrice != null) {
    hiddenInputs.push({ name: "maxPrice", value: String(maxPrice) });
  }

  return hiddenInputs;
}

function buildClearHref(basePath: string, query: string) {
  if (!query) {
    return basePath;
  }

  return `${basePath}?q=${encodeURIComponent(query)}`;
}

function buildPageHref({
  basePath,
  page,
  query,
  selectedGenders,
  selectedBrands,
  selectedFamilies,
  minPrice,
  maxPrice,
}: {
  basePath: string;
  page: number;
  query: string;
  selectedGenders: string[];
  selectedBrands: string[];
  selectedFamilies: string[];
  minPrice: number | null;
  maxPrice: number | null;
}) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  for (const value of selectedGenders) {
    params.append("gender", value);
  }

  for (const value of selectedBrands) {
    params.append("brand", value);
  }

  for (const value of selectedFamilies) {
    params.append("family", value);
  }

  if (minPrice != null) {
    params.set("minPrice", String(minPrice));
  }

  if (maxPrice != null) {
    params.set("maxPrice", String(maxPrice));
  }

  const suffix = params.toString();
  return suffix ? `${basePath}?${suffix}` : basePath;
}

export async function PerfumeCatalogPage({
  mode,
  searchParams,
}: {
  mode: "catalog" | "search";
  searchParams?: CatalogSearchParams | Promise<CatalogSearchParams>;
}) {
  const resolved = await Promise.resolve(searchParams);
  const query = firstValue(resolved?.q).trim();
  const page = parsePage(resolved?.page);
  const selectedGenders = listValue(resolved?.gender);
  const selectedBrands = listValue(resolved?.brand);
  const selectedFamilies = listValue(resolved?.family);
  const minPrice = parsePrice(firstValue(resolved?.minPrice));
  const maxPrice = parsePrice(firstValue(resolved?.maxPrice));
  const pagePath = mode === "catalog" ? PUBLIC_PATHS.catalog : PUBLIC_PATHS.search;
  const hiddenInputs = buildHiddenInputs({ selectedGenders, selectedBrands, selectedFamilies, minPrice, maxPrice });
  const clearHref = buildClearHref(pagePath, query);
  const hasFilters = Boolean(query || selectedGenders.length || selectedBrands.length || selectedFamilies.length || minPrice != null || maxPrice != null);
  const offset = (page - 1) * CATALOG_PAGE_SIZE;

  const [project, filters, searchResult] = await Promise.all([
    getPublicProjectInfo(),
    getPublicPerfumeFilters(),
    searchPublicPerfumePage({
      q: query,
      genders: selectedGenders,
      brands: selectedBrands,
      families: selectedFamilies,
      minPrice,
      maxPrice,
      limit: CATALOG_FETCH_LIMIT,
      offset,
    }),
  ]);

  const perfumes = searchResult.items;
  const totalMatches = searchResult.total;
  const totalPages = totalMatches > 0 ? Math.ceil(totalMatches / CATALOG_PAGE_SIZE) : 0;
  const hasNextPage = perfumes.length > CATALOG_PAGE_SIZE;
  const displayedPerfumes = perfumes.slice(0, CATALOG_PAGE_SIZE);
  const previousPageHref =
    page > 1
      ? buildPageHref({
          basePath: pagePath,
          page: page - 1,
          query,
          selectedGenders,
          selectedBrands,
          selectedFamilies,
          minPrice,
          maxPrice,
        })
      : null;
  const nextPageHref = hasNextPage
    ? buildPageHref({
        basePath: pagePath,
        page: page + 1,
        query,
        selectedGenders,
        selectedBrands,
        selectedFamilies,
        minPrice,
        maxPrice,
      })
    : null;

  const eyebrow = mode === "catalog" ? "Nos parfums" : "Recherche parfum";
  const title = mode === "catalog" ? `Explorer les parfums de ${project.title}` : `Rechercher un parfum selon vos envies`;
  const description =
    mode === "catalog"
      ? "Parcourez librement le catalogue par genre, marque, famille olfactive et budget pour découvrir des parfums cohérents avec vos envies."
      : "Affinez votre recherche par mot-clé, genre, marque, famille olfactive et budget pour trouver plus vite le parfum qui vous correspond.";
  const emptyMessage =
    mode === "catalog"
      ? "Aucun parfum ne correspond à ces filtres pour le moment. Essaie une famille plus large ou réinitialise certains critères."
      : "Aucun parfum ne correspond pour l'instant à cette recherche. Essaie un autre mot-clé ou ajuste les filtres.";
  const showCatalogSearch = mode !== "catalog";
  const showQuizButton = mode !== "catalog";
  const showHeaderActions = mode === "search";

  return (
    <div className="container py-10 md:py-14">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--mf-ink-soft))]">{eyebrow}</p>
            <h1 className="font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">{title}</h1>
            <p className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))] md:text-base">{description}</p>
          </div>

          {showHeaderActions ? (
            <div className="flex flex-wrap gap-3">
              {showQuizButton ? (
                <Button asChild className="rounded-full px-6">
                  <Link href={PUBLIC_PATHS.quiz}>Faire le test</Link>
                </Button>
              ) : null}
              {mode === "search" ? (
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link href={PUBLIC_PATHS.catalog}>Voir nos parfums</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        {showCatalogSearch ? (
          <div className="rounded-[2rem] border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-cream),0.86)] p-5 shadow-[0_24px_60px_rgba(168,135,131,0.10)] backdrop-blur">
            <SearchInlineForm action={pagePath} defaultValue={query} hiddenInputs={hiddenInputs} />
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2">
            <PerfumeFiltersForm
              action={pagePath}
              query={query}
              filters={filters}
              selectedGenders={selectedGenders}
              selectedBrands={selectedBrands}
              selectedFamilies={selectedFamilies}
              minPrice={minPrice}
              maxPrice={maxPrice}
              clearHref={clearHref}
            />
          </aside>

          <div className="space-y-5">
            <div className="rounded-[1.8rem] border border-[hsla(var(--mf-line),0.76)] bg-white/55 px-5 py-4 text-sm text-[hsl(var(--mf-ink-soft))]">
              {hasFilters ? (
                <p>
                  {totalMatches} parfum{totalMatches > 1 ? "s" : ""} disponible{totalMatches > 1 ? "s" : ""}
                  {query ? (
                    <>
                      {" "}pour <span className="font-medium text-[hsl(var(--mf-ink))]">“{query}”</span>
                    </>
                  ) : null}
                  .
                </p>
              ) : (
                <p>
                  {totalMatches} parfum{totalMatches > 1 ? "s" : ""} disponible{totalMatches > 1 ? "s" : ""}.
                </p>
              )}
            </div>

            {displayedPerfumes.length ? (
              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {displayedPerfumes.map((perfume) => (
                    <PerfumeCard key={perfume.slug} perfume={perfume} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-[hsl(var(--mf-line))] bg-[hsla(var(--mf-cream),0.72)] p-6 text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
                {emptyMessage}
              </div>
            )}

            {previousPageHref || nextPageHref ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.8rem] border border-[hsla(var(--mf-line),0.76)] bg-white/55 px-5 py-4">
                <div className="space-y-1">
                  <p className="text-sm text-[hsl(var(--mf-ink-soft))]">Navigation catalogue</p>
                  {totalPages > 1 ? (
                    <p className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--mf-ink-soft))]">
                      {page} sur {totalPages}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  {previousPageHref ? (
                    <Button asChild variant="outline" className="rounded-full px-5">
                      <Link href={previousPageHref}>Page précédente</Link>
                    </Button>
                  ) : null}
                  {nextPageHref ? (
                    <Button asChild className="rounded-full px-5">
                      <Link href={nextPageHref}>Page suivante</Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
