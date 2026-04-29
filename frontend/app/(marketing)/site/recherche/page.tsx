import type { Metadata } from "next";

import { PerfumeCard } from "@/components/site/perfume-card";
import { SearchInlineForm } from "@/components/site/search-inline-form";
import { searchPublicPerfumes } from "@/lib/api/public-perfumes";
import { getPublicProjectInfo } from "@/lib/site/project";

type SearchParams = {
  q?: string | string[];
};

export const metadata: Metadata = {
  title: "Recherche parfum",
  description: "Recherche interne de parfums du MVP.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  const resolved = await Promise.resolve(searchParams);
  const query = Array.isArray(resolved?.q) ? resolved?.q[0] : resolved?.q ?? "";
  const [project, perfumes] = await Promise.all([
    getPublicProjectInfo(),
    query.trim() ? searchPublicPerfumes(query.trim()) : Promise.resolve([]),
  ]);

  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--mf-ink-soft))]">Recherche parfum</p>
          <h1 className="font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">
            Chercher un parfum dans {project.title}
          </h1>
          <p className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))] md:text-base">
            Recherche simple du MVP: nom, marque, famille olfactive ou quelques notes principales.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-cream),0.86)] p-5 shadow-[0_24px_60px_rgba(168,135,131,0.10)] backdrop-blur">
          <SearchInlineForm defaultValue={query} />
        </div>

        {query.trim() ? (
          <p className="text-sm text-[hsl(var(--mf-ink-soft))]">
            {perfumes.length} résultat{perfumes.length > 1 ? "s" : ""} pour{" "}
            <span className="font-medium text-[hsl(var(--mf-ink))]">“{query.trim()}”</span>.
          </p>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[hsl(var(--mf-line))] bg-[hsla(var(--mf-cream),0.72)] p-6 text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
            Commence par un nom de parfum, une marque ou une famille olfactive comme{" "}
            <span className="font-medium text-[hsl(var(--mf-ink))]">Libre</span>,{" "}
            <span className="font-medium text-[hsl(var(--mf-ink))]">Chanel</span> ou{" "}
            <span className="font-medium text-[hsl(var(--mf-ink))]">floral musqué</span>.
          </div>
        )}

        {query.trim() && perfumes.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[hsl(var(--mf-line))] bg-[hsla(var(--mf-cream),0.72)] p-6 text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
            Aucun parfum ne correspond pour l'instant à cette recherche. Essaie un autre mot-clé ou passe par le test de personnalité olfactive.
          </div>
        ) : null}

        {perfumes.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {perfumes.map((perfume) => (
              <PerfumeCard key={perfume.slug} perfume={perfume} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
