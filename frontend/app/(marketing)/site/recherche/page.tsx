import type { Metadata } from "next";

import { PerfumeCatalogPage, type CatalogSearchParams } from "@/components/site/perfume-catalog-page";

export const metadata: Metadata = {
  title: "Recherche parfum",
  description: "Recherche avancée dans le catalogue parfum avec filtres par genre, marque, prix et famille olfactive.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams?: CatalogSearchParams | Promise<CatalogSearchParams>;
}) {
  return <PerfumeCatalogPage mode="search" searchParams={searchParams} />;
}
