import { notFound } from "next/navigation";

import { SitePageRenderer, type SitePageResponse } from "@/components/site/site-page-renderer";

export const dynamic = "force-dynamic";

type Params = {
  slug: string;
};

async function fetchSitePage(slug: string): Promise<SitePageResponse | null> {
  try {
    const backendOrigin = (process.env.NEXT_BACKEND_ORIGIN ?? "http://localhost:8000").replace(/\/$/, "");
    const res = await fetch(`${backendOrigin}/api/v1/site/pages/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function SiteDynamicPage({ params }: { params: Params | Promise<Params> }) {
  const resolvedParams = await Promise.resolve(params);
  const page = await fetchSitePage(resolvedParams.slug);
  if (!page) {
    notFound();
  }

  const fallbackBlocks = [] satisfies SitePageResponse["blocks"];
  return <SitePageRenderer page={page} fallbackBlocks={fallbackBlocks} />;
}
