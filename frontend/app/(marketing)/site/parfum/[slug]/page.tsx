import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PerfumeVisual } from "@/components/site/perfume-visual";
import { OfferList } from "@/components/site/offer-list";
import { Badge } from "@/components/ui/badge";
import { getPublicPerfume } from "@/lib/api/public-perfumes";

type Params = {
  slug: string;
};

async function loadPerfume(slug: string) {
  try {
    return await getPublicPerfume(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params | Promise<Params>;
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const perfume = await loadPerfume(resolved.slug);
  if (!perfume) {
    return {
      title: "Parfum introuvable",
    };
  }

  return {
    title: `${perfume.name} | ${perfume.brand}`,
    description: perfume.shortDescription || perfume.description || `Découvrir ${perfume.name}, son univers olfactif et les offres partenaires disponibles.`,
  };
}

export default async function PerfumeDetailPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const resolved = await Promise.resolve(params);
  const perfume = await loadPerfume(resolved.slug);
  if (!perfume) {
    notFound();
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <div className="rounded-[2rem] border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-cream),0.86)] p-4 shadow-[0_24px_60px_rgba(168,135,131,0.12)] backdrop-blur">
            <PerfumeVisual name={perfume.name} brand={perfume.brand} imageUrl={perfume.imageUrl} />
          </div>
          <div className="rounded-[2rem] border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-cream),0.82)] p-5 shadow-[0_20px_48px_rgba(168,135,131,0.10)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--mf-ink-soft))]">Famille</p>
            <p className="mt-2 text-lg font-medium text-[hsl(var(--mf-ink))]">{perfume.olfactiveFamily || "À préciser"}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {perfume.topNotes.map((note) => (
                <Badge key={`top-${note}`} variant="outline" className="rounded-full border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-blush),0.65)] px-3 py-1 text-[hsl(var(--mf-ink-soft))]">
                  {note}
                </Badge>
              ))}
              {perfume.heartNotes.map((note) => (
                <Badge key={`heart-${note}`} variant="secondary" className="rounded-full border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-petal),0.6)] px-3 py-1 text-[hsl(var(--mf-ink))] hover:bg-[hsla(var(--mf-petal),0.6)]">
                  {note}
                </Badge>
              ))}
              {perfume.baseNotes.map((note) => (
                <Badge key={`base-${note}`} className="rounded-full bg-[hsl(var(--mf-rose-strong))] px-3 py-1 text-white hover:bg-[hsl(var(--mf-rose-strong))]">
                  {note}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-cream),0.86)] p-6 shadow-[0_24px_60px_rgba(168,135,131,0.12)] backdrop-blur md:p-8">
            <div className="flex flex-wrap gap-2">
              {perfume.isNewArrival ? (
                <Badge className="rounded-full bg-[hsl(var(--mf-rose-strong))] px-3 py-1 text-white hover:bg-[hsl(var(--mf-rose-strong))]">
                  Nouveauté
                </Badge>
              ) : null}
              {perfume.isBestSeller ? (
                <Badge variant="secondary" className="rounded-full border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-petal),0.6)] px-3 py-1 text-[hsl(var(--mf-ink))] hover:bg-[hsla(var(--mf-petal),0.6)]">
                  Best-seller
                </Badge>
              ) : null}
              {perfume.budgetTier ? (
                <Badge variant="outline" className="rounded-full border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-blush),0.65)] px-3 py-1 capitalize text-[hsl(var(--mf-ink-soft))]">
                  {perfume.budgetTier}
                </Badge>
              ) : null}
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[hsl(var(--mf-ink-soft))]">{perfume.brand}</p>
            <h1 className="mt-2 font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">{perfume.name}</h1>
            <p className="mt-4 text-base leading-8 text-[hsl(var(--mf-ink-soft))]">{perfume.description || perfume.shortDescription}</p>
          </div>

          <section className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--mf-ink-soft))]">Où le découvrir ou l&apos;acheter</p>
              <h2 className="mt-2 font-serif text-3xl text-[hsl(var(--mf-ink))]">Offres partenaires</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
                Lorsque des offres sont disponibles, elles apparaissent ici pour prolonger la découverte du parfum plus simplement.
              </p>
            </div>
            <OfferList offers={perfume.offers} />
          </section>
        </div>
      </div>
    </div>
  );
}
