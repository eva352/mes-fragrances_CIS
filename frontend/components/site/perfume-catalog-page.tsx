import Link from "next/link";

import { PerfumeCard } from "@/components/site/perfume-card";
import { PerfumeFiltersForm } from "@/components/site/perfume-filters-form";
import { SearchInlineForm } from "@/components/site/search-inline-form";
import { Button } from "@/components/ui/button";
import { getPublicPerfumeFilters, searchPublicPerfumes } from "@/lib/api/public-perfumes";
import { PUBLIC_PATHS } from "@/lib/site/public-paths";
import { getPublicProjectInfo } from "@/lib/site/project";

export type CatalogSearchParams = {
  q?: string | string[];
  gender?: string | string[];
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

function buildHiddenInputs({
  selectedGenders,
  selectedFamilies,
  minPrice,
  maxPrice,
}: {
  selectedGenders: string[];
  selectedFamilies: string[];
  minPrice: number | null;
  maxPrice: number | null;
}) {
  const hiddenInputs: Array<{ name: string; value: string }> = [
    ...selectedGenders.map((value) => ({ name: "gender", value })),
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

export async function PerfumeCatalogPage({
  mode,
  searchParams,
}: {
  mode: "catalog" | "search";
  searchParams?: CatalogSearchParams | Promise<CatalogSearchParams>;
}) {
  const resolved = await Promise.resolve(searchParams);
  const query = firstValue(resolved?.q).trim();
  const selectedGenders = listValue(resolved?.gender);
  const selectedFamilies = listValue(resolved?.family);
  const minPrice = parsePrice(firstValue(resolved?.minPrice));
  const maxPrice = parsePrice(firstValue(resolved?.maxPrice));
  const pagePath = mode === "catalog" ? PUBLIC_PATHS.catalog : PUBLIC_PATHS.search;
  const hiddenInputs = buildHiddenInputs({ selectedGenders, selectedFamilies, minPrice, maxPrice });
  const clearHref = buildClearHref(pagePath, query);
  const hasFilters = Boolean(query || selectedGenders.length || selectedFamilies.length || minPrice != null || maxPrice != null);

  const [project, filters, perfumes] = await Promise.all([
    getPublicProjectInfo(),
    getPublicPerfumeFilters(),
    searchPublicPerfumes({
      q: query,
      genders: selectedGenders,
      families: selectedFamilies,
      minPrice,
      maxPrice,
      limit: 5000,
    }),
  ]);

  const eyebrow = mode === "catalog" ? "Nos parfums" : "Recherche parfum";
  const title = mode === "catalog" ? `Explorer les parfums de ${project.title}` : `Rechercher un parfum selon vos envies`;
  const description =
    mode === "catalog"
      ? "Parcourez librement le catalogue par genre, famille olfactive et budget pour découvrir des parfums cohérents avec vos envies."
      : "Affinez votre recherche par mot-clé, genre, famille olfactive et budget pour trouver plus vite le parfum qui vous correspond.";
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
                  {perfumes.length} résultat{perfumes.length > 1 ? "s" : ""} trouvé{perfumes.length > 1 ? "s" : ""}
                  {query ? (
                    <>
                      {" "}pour <span className="font-medium text-[hsl(var(--mf-ink))]">“{query}”</span>
                    </>
                  ) : null}
                  .
                </p>
              ) : (
                <p>
                  {perfumes.length} parfum{perfumes.length > 1 ? "s" : ""} à explorer dans le catalogue public.
                </p>
              )}
            </div>

            {perfumes.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {perfumes.map((perfume) => (
                  <PerfumeCard key={perfume.slug} perfume={perfume} />
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-[hsl(var(--mf-line))] bg-[hsla(var(--mf-cream),0.72)] p-6 text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
