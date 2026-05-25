import Link from "next/link";

import { PerfumeVisual } from "@/components/site/perfume-visual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PerfumeCard as PerfumeCardType } from "@/lib/api/public-perfumes";
import { PUBLIC_PATHS } from "@/lib/site/public-paths";

function formatPrice(price?: number | null, currency?: string | null) {
  if (price == null || price <= 0) return null;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency || "EUR",
    minimumFractionDigits: 2,
  }).format(price);
}

function formatBudgetTier(value?: string | null) {
  if (!value) return "À préciser";

  const normalized = value.trim().toLowerCase();

  if (normalized === "entry") return "Accessible";
  if (normalized === "mid") return "Intermédiaire";
  if (normalized === "premium") return "Premium";
  if (normalized === "luxury") return "Luxe";

  return value;
}

export function PerfumeCard({
  perfume,
  ctaLabel,
}: {
  perfume: PerfumeCardType;
  ctaLabel?: string;
}) {
  const bestOfferPrice = formatPrice(
    perfume.bestOffer?.totalPrice ?? perfume.bestOffer?.price,
    perfume.bestOffer?.currency ?? perfume.currency,
  );
  const fallbackPrice = formatPrice(perfume.lowestPrice, perfume.currency);
  const budgetLabel = formatBudgetTier(perfume.budgetTier);
  const keyNotes = perfume.keyNotes.slice(0, 3);
  const offerImageUrl = perfume.bestOffer?.imageUrl ?? null;
  const displayImageUrl = perfume.imageUrl || offerImageUrl || null;
  const offerCount = perfume.offerCount ?? 0;
  const additionalOffers = offerCount > 1 ? offerCount - 1 : 0;
  const buttonLabel = ctaLabel || (perfume.bestOffer ? "Voir les offres" : "Découvrir le parfum");

  return (
    <article className="group rounded-[2.1rem] border border-[rgba(154,78,99,0.22)] bg-[rgba(255,255,255,0.62)] p-4 shadow-[0_24px_56px_rgba(168,135,131,0.10)] backdrop-blur-[6px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(176,138,139,0.14)]">
      <PerfumeVisual
        name={perfume.name}
        brand={perfume.brand}
        imageUrl={displayImageUrl}
        alt={`${perfume.brand} ${perfume.name}`}
        compact
      />

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

      <dl className="mt-4 grid gap-3 rounded-[1.5rem] border border-[hsla(var(--mf-line),0.8)] bg-[hsla(var(--mf-cream),0.72)] p-4 text-sm sm:grid-cols-2">
        <div className="space-y-1">
          <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-[hsl(var(--mf-ink-soft))]">Univers</dt>
          <dd className="font-medium text-[hsl(var(--mf-ink))]">{perfume.olfactiveFamily || "À découvrir"}</dd>
        </div>
        <div className="space-y-1">
          <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-[hsl(var(--mf-ink-soft))]">Budget</dt>
          <dd className="font-medium text-[hsl(var(--mf-ink))]">{budgetLabel}</dd>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-[hsl(var(--mf-ink-soft))]">Notes clés</dt>
          <dd className="text-[hsl(var(--mf-ink))]">
            {keyNotes.length ? keyNotes.join(" · ") : "Notes détaillées disponibles sur la fiche parfum"}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--mf-ink-soft))]">
            {perfume.bestOffer ? "Meilleure offre" : "Prix indicatif"}
          </p>
          <p className="text-lg font-semibold text-[hsl(var(--mf-ink))]">
            {perfume.bestOffer && bestOfferPrice ? `Dès ${bestOfferPrice}` : fallbackPrice ?? "Prix à venir"}
          </p>
          {perfume.bestOffer?.advertiserName ? (
            <p className="truncate text-sm text-[hsl(var(--mf-ink-soft))]">chez {perfume.bestOffer.advertiserName}</p>
          ) : null}
          {additionalOffers > 0 ? (
            <p className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--mf-ink-soft))]">+ {additionalOffers} offres</p>
          ) : null}
        </div>

        <Button
          asChild
          className="rounded-full px-5 shadow-[0_16px_28px_rgba(178,140,146,0.18)] transition duration-300 group-hover:shadow-[0_18px_30px_rgba(178,140,146,0.24)]"
        >
          <Link href={PUBLIC_PATHS.perfume(perfume.slug)}>{buttonLabel}</Link>
        </Button>
      </div>
    </article>
  );
}
