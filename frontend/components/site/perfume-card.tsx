import Link from "next/link";

import { PerfumeVisual } from "@/components/site/perfume-visual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PerfumeCard as PerfumeCardType } from "@/lib/api/public-perfumes";

function formatPrice(price?: number | null, currency?: string | null) {
  if (price == null) return null;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency || "EUR",
    minimumFractionDigits: 2,
  }).format(price);
}

export function PerfumeCard({
  perfume,
  ctaLabel = "Voir les offres",
}: {
  perfume: PerfumeCardType;
  ctaLabel?: string;
}) {
  const price = formatPrice(perfume.lowestPrice, perfume.currency);

  return (
    <article className="group rounded-[2.1rem] border border-[hsla(var(--mf-line),0.82)] bg-[linear-gradient(180deg,hsla(var(--mf-cream),0.92),hsla(var(--mf-blush),0.72))] p-4 shadow-[0_24px_56px_rgba(168,135,131,0.10)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(176,138,139,0.14)]">
      <PerfumeVisual name={perfume.name} brand={perfume.brand} imageUrl={perfume.imageUrl} compact />

      <div className="mt-4 flex flex-wrap gap-2">
        {perfume.isNewArrival ? (
          <Badge className="rounded-full bg-[hsl(var(--mf-rose-strong))] px-3 py-1 text-white hover:bg-[hsl(var(--mf-rose-strong))]">
            Nouveauté
          </Badge>
        ) : null}

        {perfume.isBestSeller ? (
          <Badge
            variant="secondary"
            className="rounded-full border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-petal),0.65)] px-3 py-1 text-[hsl(var(--mf-ink))] hover:bg-[hsla(var(--mf-petal),0.65)]"
          >
            Best-seller
          </Badge>
        ) : null}

        {perfume.olfactiveFamily ? (
          <Badge
            variant="outline"
            className="rounded-full border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-blush),0.72)] px-3 py-1 text-[hsl(var(--mf-ink-soft))]"
          >
            {perfume.olfactiveFamily}
          </Badge>
        ) : null}
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--mf-ink-soft))]">{perfume.brand}</p>
        <h3 className="font-serif text-2xl text-[hsl(var(--mf-ink))]">{perfume.name}</h3>
        <p className="text-sm leading-6 text-[hsl(var(--mf-ink-soft))]">{perfume.shortDescription}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--mf-ink-soft))]">À partir de</p>
          <p className="text-lg font-semibold text-[hsl(var(--mf-ink))]">{price ?? "Prix à confirmer"}</p>
        </div>

        <Button
          asChild
          className="rounded-full px-5 shadow-[0_16px_28px_rgba(178,140,146,0.18)] transition duration-300 group-hover:shadow-[0_18px_30px_rgba(178,140,146,0.24)]"
        >
          <Link href={`/site/parfum/${perfume.slug}`}>{ctaLabel}</Link>
        </Button>
      </div>
    </article>
  );
}
