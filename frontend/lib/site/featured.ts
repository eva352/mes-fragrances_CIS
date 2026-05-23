import {
  getFeaturedPerfumes,
  searchPublicPerfumes,
  type FeaturedPerfumes,
  type PerfumeCard,
} from "@/lib/api/public-perfumes";

const CATALOG_LIMIT = 5000;
const collator = new Intl.Collator("fr", { sensitivity: "base", numeric: true });

function dedupePerfumes(perfumes: PerfumeCard[]) {
  const seen = new Set<string>();

  return perfumes.filter((perfume) => {
    if (seen.has(perfume.slug)) {
      return false;
    }

    seen.add(perfume.slug);
    return true;
  });
}

function compareAlphabetical(a: PerfumeCard, b: PerfumeCard) {
  return collator.compare(`${a.brand} ${a.name}`, `${b.brand} ${b.name}`);
}

function comparePreferredOrder(a: PerfumeCard, b: PerfumeCard, preferredOrder: Map<string, number>) {
  const aIndex = preferredOrder.get(a.slug);
  const bIndex = preferredOrder.get(b.slug);

  if (aIndex == null && bIndex == null) {
    return 0;
  }

  if (aIndex == null) {
    return 1;
  }

  if (bIndex == null) {
    return -1;
  }

  return aIndex - bIndex;
}

function sortForNewArrivals(perfumes: PerfumeCard[], featured: PerfumeCard[]) {
  const preferredOrder = new Map(featured.map((perfume, index) => [perfume.slug, index]));

  return [...perfumes].sort((a, b) => {
    return (
      comparePreferredOrder(a, b, preferredOrder) ||
      Number(b.isNewArrival) - Number(a.isNewArrival) ||
      compareAlphabetical(a, b)
    );
  });
}

function sortForBestSellers(perfumes: PerfumeCard[], featured: PerfumeCard[]) {
  const preferredOrder = new Map(featured.map((perfume, index) => [perfume.slug, index]));

  return [...perfumes].sort((a, b) => {
    return (
      comparePreferredOrder(a, b, preferredOrder) ||
      Number(b.isBestSeller) - Number(a.isBestSeller) ||
      Number(b.lowestPrice != null) - Number(a.lowestPrice != null) ||
      compareAlphabetical(a, b)
    );
  });
}

function sortForCatalog(perfumes: PerfumeCard[], featured: FeaturedPerfumes) {
  const preferredOrder = new Map<string, number>();

  [...featured.newArrivals, ...featured.bestSellers].forEach((perfume, index) => {
    if (!preferredOrder.has(perfume.slug)) {
      preferredOrder.set(perfume.slug, index);
    }
  });

  return [...perfumes].sort((a, b) => {
    return (
      comparePreferredOrder(a, b, preferredOrder) ||
      Number(b.isNewArrival) - Number(a.isNewArrival) ||
      Number(b.isBestSeller) - Number(a.isBestSeller) ||
      Number(b.lowestPrice != null) - Number(a.lowestPrice != null) ||
      compareAlphabetical(a, b)
    );
  });
}

export async function loadFeaturedPerfumes(): Promise<FeaturedPerfumes> {
  const [featuredResult, catalogResult] = await Promise.allSettled([
    getFeaturedPerfumes(),
    searchPublicPerfumes("", { limit: CATALOG_LIMIT }),
  ]);

  const featured = featuredResult.status === "fulfilled" ? featuredResult.value : { newArrivals: [], bestSellers: [] };
  const catalog = catalogResult.status === "fulfilled" ? catalogResult.value : [];
  const perfumes = dedupePerfumes([...featured.newArrivals, ...featured.bestSellers, ...catalog]);

  if (!perfumes.length) {
    return featured;
  }

  return {
    newArrivals: sortForNewArrivals(perfumes, featured.newArrivals),
    bestSellers: sortForBestSellers(perfumes, featured.bestSellers),
  };
}

export async function loadCatalogPerfumes(limit = 12): Promise<PerfumeCard[]> {
  const [featuredResult, catalogResult] = await Promise.allSettled([
    getFeaturedPerfumes(),
    searchPublicPerfumes("", { limit: CATALOG_LIMIT }),
  ]);

  const featured = featuredResult.status === "fulfilled" ? featuredResult.value : { newArrivals: [], bestSellers: [] };
  const catalog = catalogResult.status === "fulfilled" ? catalogResult.value : [];
  const perfumes = dedupePerfumes([...featured.newArrivals, ...featured.bestSellers, ...catalog]);

  return sortForCatalog(perfumes, featured).slice(0, limit);
}
