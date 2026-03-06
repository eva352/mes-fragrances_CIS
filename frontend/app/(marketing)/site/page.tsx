import { SitePageRenderer, type SitePageResponse } from "@/components/site/site-page-renderer";
import { APP_NAME } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `${APP_NAME} — Site`,
  description: "Landing publique basée sur une composition de blocks (persistée en DB).",
};

type SitePageListItem = SitePageResponse & {
  is_home: boolean;
};

async function fetchSitePages(): Promise<SitePageListItem[]> {
  try {
    const backendOrigin = (process.env.NEXT_BACKEND_ORIGIN ?? "http://localhost:8000").replace(/\/$/, "");
    const res = await fetch(`${backendOrigin}/api/v1/site/pages`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function SiteHomePage() {
  const pages = await fetchSitePages();
  const page = pages.find((p) => p.is_home) ?? pages[0] ?? null;
  const fallbackBlocks = [
    { id: "default-hero-1", category: "hero", slug: "hero-1", title: "hero 1" },
    { id: "default-about-1", category: "about", slug: "about-1", title: "About 1" },
  ] satisfies SitePageResponse["blocks"];

  return <SitePageRenderer page={page} fallbackBlocks={fallbackBlocks} />;
}
