import type { MetadataRoute } from "next";

import { searchPublicPerfumes } from "@/lib/api/public-perfumes";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:19100";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl().replace(/\/$/, "");

  let perfumes: Awaited<ReturnType<typeof searchPublicPerfumes>> = [];
  try {
    perfumes = await searchPublicPerfumes("", { limit: 5000 });
  } catch {
    perfumes = [];
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/nos-parfums`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/nouveautes`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/meilleures-ventes`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/test-personnalite-olfactif`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/mentions-legales`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/confidentialite`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, changeFrequency: "monthly", priority: 0.2 },
  ];

  const perfumePages: MetadataRoute.Sitemap = perfumes.map((perfume) => ({
    url: `${baseUrl}/parfum/${perfume.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...perfumePages];
}
