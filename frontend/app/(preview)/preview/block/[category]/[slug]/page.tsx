import { notFound } from "next/navigation";

import { auroraBlockCatalog } from "@/blocks/manifest";

export const dynamic = "force-dynamic";

type Params = {
  category: string;
  slug: string;
};

export default async function BlockPreviewPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const resolvedParams = await params;
  const category = auroraBlockCatalog.find((c) => c.slug === resolvedParams.category);
  const block = category?.blocks.find((b) => b.slug === resolvedParams.slug);
  if (!block) return notFound();

  const Component = block.Component;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <Component />
      </div>
    </div>
  );
}
