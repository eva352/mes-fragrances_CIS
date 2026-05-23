import type { Metadata } from "next";
import Link from "next/link";

import { PerfumeCard } from "@/components/site/perfume-card";
import { Button } from "@/components/ui/button";
import { loadFeaturedPerfumes } from "@/lib/site/featured";
import { PUBLIC_PATHS } from "@/lib/site/public-paths";
import { getPublicProjectInfo } from "@/lib/site/project";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const project = await getPublicProjectInfo();
  return {
    title: `Meilleures ventes parfum | ${project.title}`,
    description: `Une sélection de parfums appréciés pour explorer des signatures déjà plébiscitées sur ${project.title}.`,
  };
}

export default async function BestSellersPage() {
  const [project, featured] = await Promise.all([getPublicProjectInfo(), loadFeaturedPerfumes()]);
  const bestSellers = featured.bestSellers;

  return (
    <div className="container py-10 md:py-14">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--mf-ink-soft))]">Meilleures ventes</p>
            <h1 className="font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">
              Les signatures les plus désirées
            </h1>
            <p className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))] md:text-base">
              Une sélection de parfums appréciés pour leur sillage, leur équilibre ou leur popularité. Une autre manière d&apos;explorer le catalogue quand on cherche des valeurs sûres.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href={PUBLIC_PATHS.catalog}>Explorer nos parfums</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href={PUBLIC_PATHS.quiz}>Faire le test</Link>
            </Button>
          </div>
        </div>

        {bestSellers.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {bestSellers.map((perfume) => (
              <PerfumeCard key={perfume.slug} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2.2rem] border border-dashed border-[rgba(154,78,99,0.22)] bg-[rgba(255,255,255,0.62)] p-8 text-sm leading-7 text-[hsl(var(--mf-ink-soft))] backdrop-blur-[6px]">
            Les parfums les plus appréciés apparaîtront ici à mesure que le catalogue sera enrichi.
          </div>
        )}
      </div>
    </div>
  );
}
