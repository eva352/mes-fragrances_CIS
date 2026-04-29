import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PerfumeOffer } from "@/lib/api/public-perfumes";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

export function OfferList({ offers }: { offers: PerfumeOffer[] }) {
  if (!offers.length) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-[hsl(var(--mf-line))] bg-[hsla(var(--mf-cream),0.76)] p-6 text-sm text-[hsl(var(--mf-ink-soft))]">
        Aucune offre n'est disponible pour le moment. Tu pourras brancher les liens partenaires plus tard.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {offers.map((offer) => (
        <div
          key={`${offer.merchantName}-${offer.price}`}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-cream),0.88)] p-4 shadow-[0_18px_48px_rgba(168,135,131,0.10)] backdrop-blur sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--mf-ink-soft))]">{offer.merchantName}</p>
            <p className="text-xl font-semibold text-[hsl(var(--mf-ink))]">{formatPrice(offer.price, offer.currency)}</p>
            <p className="text-sm text-[hsl(var(--mf-ink-soft))]">{offer.availability || "Disponibilité à vérifier"}</p>
          </div>
          <Button asChild className="rounded-full px-5 shadow-[0_16px_28px_rgba(178,140,146,0.18)]">
            <a href={offer.affiliateUrl} target="_blank" rel="nofollow sponsored noreferrer">
              Voir l'offre
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
}
