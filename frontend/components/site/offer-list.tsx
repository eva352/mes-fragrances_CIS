import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PerfumeOffer } from "@/lib/api/public-perfumes";

function formatPrice(price: number | null | undefined, currency: string) {
  if (price == null) {
    return null;
  }
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

function formatDateLabel(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
  }).format(parsed);
}

function getStockLabel(offer: PerfumeOffer) {
  if (offer.inStock === true) {
    return offer.stockStatus || "En stock";
  }
  if (offer.inStock === false) {
    return offer.stockStatus || "Indisponible";
  }
  return offer.stockStatus || "Stock inconnu";
}

export function OfferList({ offers }: { offers: PerfumeOffer[] }) {
  if (!offers.length) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-[hsl(var(--mf-line))] bg-[hsla(var(--mf-cream),0.76)] p-6 text-sm text-[hsl(var(--mf-ink-soft))]">
        Aucune offre partenaire n&apos;est disponible pour le moment. Les options d&apos;achat apparaîtront ici dès qu&apos;elles seront disponibles.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-cream),0.88)] p-4 shadow-[0_18px_48px_rgba(168,135,131,0.10)] backdrop-blur sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-1 items-start gap-4">
            {offer.imageUrl ? (
              <div className="h-24 w-20 shrink-0 overflow-hidden rounded-[1.1rem] border border-[hsla(var(--mf-line),0.85)] bg-white/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={offer.imageUrl} alt={offer.title} className="h-full w-full object-cover" />
              </div>
            ) : null}
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--mf-ink-soft))]">{offer.advertiserName}</p>
                <h3 className="text-lg font-semibold text-[hsl(var(--mf-ink))]">{offer.title}</h3>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[hsl(var(--mf-ink-soft))]">
                <span className="text-xl font-semibold text-[hsl(var(--mf-ink))]">
                  {formatPrice(offer.totalPrice ?? offer.price, offer.currency)}
                </span>
                {offer.deliveryCost != null ? <span>Livraison {formatPrice(offer.deliveryCost, offer.currency)}</span> : null}
                {offer.totalPrice != null && offer.totalPrice !== offer.price ? (
                  <span>Prix parfum {formatPrice(offer.price, offer.currency)}</span>
                ) : null}
                {offer.totalPrice != null ? <span>Prix total {formatPrice(offer.totalPrice, offer.currency)}</span> : null}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[hsl(var(--mf-ink-soft))]">
                <span>{getStockLabel(offer)}</span>
                {formatDateLabel(offer.lastPriceChangeAt || offer.lastSeenAt) ? (
                  <span>Dernière mise à jour {formatDateLabel(offer.lastPriceChangeAt || offer.lastSeenAt)}</span>
                ) : null}
              </div>
            </div>
          </div>
          <Button asChild className="rounded-full px-5 shadow-[0_16px_28px_rgba(178,140,146,0.18)]">
            <a href={offer.affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer">
              Voir l&apos;offre
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
}
