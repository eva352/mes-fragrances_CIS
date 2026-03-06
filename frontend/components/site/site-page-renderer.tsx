import type { ComponentType } from "react";

import { auroraBlockCatalog } from "@/blocks/manifest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BlockInstance = {
  id: string;
  category: string;
  slug: string;
  title: string;
  content?: Record<string, unknown> | null;
  props?: Record<string, unknown> | null;
};

export type SitePageResponse = {
  slug: string;
  title: string;
  blocks: BlockInstance[];
};

function findBlockComponent(category: string, slug: string) {
  const c = auroraBlockCatalog.find((x) => x.slug === category);
  const b = c?.blocks.find((x) => x.slug === slug);
  return b?.Component ?? null;
}

export function SitePageRenderer({
  page,
  fallbackBlocks,
}: {
  page: SitePageResponse | null;
  fallbackBlocks: BlockInstance[];
}) {
  const blocks = page?.blocks?.length ? page.blocks : fallbackBlocks;

  return (
    <div className="space-y-0 py-0">
      {blocks.map((block) => {
        const Component = findBlockComponent(block.category, block.slug);
        if (!Component) {
          return (
            <div key={block.id} className="container">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Bloc introuvable</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {block.title} ({block.category}/{block.slug})
                </CardContent>
              </Card>
            </div>
          );
        }

        const isConfigurable =
          (block.category === "hero" && block.slug === "hero-1") ||
          (block.category === "features" && block.slug === "feature-51") ||
          (block.category === "pricing" && block.slug === "pricing-9");

        if (isConfigurable && (block.content || block.props)) {
          const AnyComponent = Component as unknown as ComponentType<any>;
          return (
            <AnyComponent
              key={block.id}
              content={block.content ?? undefined}
              props={block.props ?? undefined}
            />
          );
        }

        return <Component key={block.id} />;
      })}
    </div>
  );
}
