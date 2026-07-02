import type { Metadata } from "next";

import { PerfumeCatalogPage, type CatalogSearchParams } from "@/components/site/perfume-catalog-page";
import { getPublicProjectInfo } from "@/lib/site/project";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const project = await getPublicProjectInfo();
  return {
    title: `Nos parfums | ${project.title}`,
    description: `Le catalogue parfum de ${project.title} avec recherche avancée et filtres par genre, marque, prix et famille olfactive.`,
  };
}

export default function CatalogPage({
  searchParams,
}: {
  searchParams?: CatalogSearchParams | Promise<CatalogSearchParams>;
}) {
  return <PerfumeCatalogPage mode="catalog" searchParams={searchParams} />;
}
