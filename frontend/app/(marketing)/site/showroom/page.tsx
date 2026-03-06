import Link from "next/link";

import { auroraBlockCatalog } from "@/blocks/manifest";
import { SiteShowroomActions } from "@/components/site/showroom-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `${APP_NAME} — Showroom`,
  description: "Catalogue de blocks par catégories pour tester les thèmes.",
};

type SearchParams = {
  category?: string | string[];
  block?: string | string[];
  page?: string | string[];
};

function getFirst(value: string | string[] | undefined) {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

type SitePageResponse = {
  id: string;
  slug: string;
  title: string;
  is_home: boolean;
};

async function fetchSitePages(): Promise<SitePageResponse[]> {
  try {
    const backendOrigin = (process.env.NEXT_BACKEND_ORIGIN ?? "http://localhost:8000").replace(/\/$/, "");
    const res = await fetch(`${backendOrigin}/api/v1/site/pages`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function SiteShowroomPage({
  searchParams,
}: {
  searchParams: SearchParams | Promise<SearchParams>;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const selectedCategorySlug = getFirst(resolvedSearchParams.category);
  const selectedBlockSlug = getFirst(resolvedSearchParams.block);
  const selectedPageSlug = getFirst(resolvedSearchParams.page);
  const pages = await fetchSitePages();

  const defaultCategory = auroraBlockCatalog[0];
  const category =
    auroraBlockCatalog.find((c) => c.slug === selectedCategorySlug) ?? defaultCategory;

  const defaultBlock = category.blocks[0];
  const block = category.blocks.find((b) => b.slug === selectedBlockSlug) ?? defaultBlock;

  const BlockComponent = block.Component;

  return (
    <div className="container py-8">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold">Showroom</h1>
        <p className="text-sm text-muted-foreground">
          Sélectionnez une catégorie et un bloc pour visualiser rapidement le rendu selon le thème.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-2">
          {auroraBlockCatalog.map((c) => {
            const firstBlock = c.blocks[0];
            const href = firstBlock
              ? `/site/showroom?category=${encodeURIComponent(c.slug)}&block=${encodeURIComponent(firstBlock.slug)}`
              : `/site/showroom?category=${encodeURIComponent(c.slug)}`;

            const isActive = c.slug === category.slug;
            return (
              <Button
                key={c.slug}
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-between"
                asChild
              >
                <Link href={href}>
                  <span className="text-sm">{c.title}</span>
                  <Badge variant="secondary">{c.blocks.length}</Badge>
                </Link>
              </Button>
            );
          })}
        </aside>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-base">Blocs — {category.title}</CardTitle>
                <SiteShowroomActions
                  pages={pages}
                  defaultPageSlug={selectedPageSlug}
                  block={{ category: category.slug, slug: block.slug, title: block.title }}
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {category.blocks.map((b) => {
                const href = `/site/showroom?category=${encodeURIComponent(category.slug)}&block=${encodeURIComponent(
                  b.slug,
                )}`;
                const isActive = b.slug === block.slug;
                return (
                  <Button key={b.slug} variant={isActive ? "default" : "outline"} size="sm" asChild>
                    <Link href={href}>{b.title}</Link>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          <div className="overflow-hidden rounded-lg border border-border bg-background">
            <BlockComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
