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
    title: `Nouveautés parfum | ${project.title}`,
    description: `Les nouveautés parfum mises en avant par ${project.title}.`,
  };
}

export default async function NewArrivalsPage() {
  const [project, featured] = await Promise.all([getPublicProjectInfo(), loadFeaturedPerfumes()]);
  const newArrivals = featured.newArrivals;

  return (
    <div className="container py-10 md:py-14">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--mf-ink-soft))]">Nouveautés</p>
            <h1 className="font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">
              Les nouveautés à découvrir en ce moment
            </h1>
            <p className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))] md:text-base">
              Tout le catalogue reste visible ici, avec les références marquées comme nouveautés mises en avant en premier pour garder une lecture plus éditoriale que marchande.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <Link href={PUBLIC_PATHS.search}>Explorer tous les parfums</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href={PUBLIC_PATHS.quiz}>Faire le test</Link>
            </Button>
          </div>
        </div>

        {newArrivals.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {newArrivals.map((perfume) => (
              <PerfumeCard key={perfume.slug} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2.2rem] border border-dashed border-[rgba(154,78,99,0.22)] bg-[rgba(255,255,255,0.62)] p-8 text-sm leading-7 text-[hsl(var(--mf-ink-soft))] backdrop-blur-[6px]">
            Les nouveautés apparaîtront ici à mesure que le catalogue sera enrichi.
          </div>
        )}
      </div>
    </div>
  );
}
