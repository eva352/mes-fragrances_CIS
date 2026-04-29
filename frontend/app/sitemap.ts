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
    { url: `${baseUrl}/site`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/site/quiz-parfum`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/site/mentions-legales`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/site/confidentialite`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/site/cookies`, changeFrequency: "monthly", priority: 0.2 },
  ];

  const perfumePages: MetadataRoute.Sitemap = perfumes.map((perfume) => ({
    url: `${baseUrl}/site/parfum/${perfume.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...perfumePages];
}

