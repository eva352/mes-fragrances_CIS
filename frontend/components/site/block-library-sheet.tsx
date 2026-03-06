"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

import type { AuroraBlockDefinition } from "@/blocks/manifest";
import { auroraBlockCatalog } from "@/blocks/manifest";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type BlockCatalogItem = {
  categorySlug: string;
  categoryTitle: string;
  block: AuroraBlockDefinition;
};

function BlockPreviewHoverButton({
  categorySlug,
  blockSlug,
  blockTitle,
  BlockComponent,
}: {
  categorySlug: string;
  blockSlug: string;
  blockTitle: string;
  BlockComponent: AuroraBlockDefinition["Component"];
}) {
  const [open, setOpen] = useState(false);
  const [naturalHeight, setNaturalHeight] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  const previewHref = `/preview/block/${encodeURIComponent(categorySlug)}/${encodeURIComponent(blockSlug)}`;
  const viewportWidth = 1440;

  const measureRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const computeScale = () => {
    const measureEl = measureRef.current;
    const viewportEl = viewportRef.current;
    if (!measureEl || !viewportEl) return;

    const measuredHeight = measureEl.getBoundingClientRect().height;
    const nextNaturalHeight = Number.isFinite(measuredHeight) ? Math.max(0, measuredHeight) : 0;
    setNaturalHeight(nextNaturalHeight);

    const vpRect = viewportEl.getBoundingClientRect();
    const vpW = vpRect.width;
    const vpH = vpRect.height;
    if (!vpW || !vpH || !viewportWidth || !nextNaturalHeight) {
      setScale(1);
      return;
    }

    const scaleW = vpW / viewportWidth;
    const scaleH = vpH / nextNaturalHeight;
    const nextScale = Math.min(1, scaleW, scaleH);
    setScale(Number.isFinite(nextScale) ? Math.max(0.05, nextScale) : 1);
  };

  useEffect(() => {
    if (!open) return;

    const raf = window.requestAnimationFrame(() => computeScale());

    const viewportEl = viewportRef.current;
    if (!viewportEl || typeof ResizeObserver === "undefined") {
      return () => window.cancelAnimationFrame(raf);
    }

    const ro = new ResizeObserver(() => computeScale());
    ro.observe(viewportEl);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, viewportWidth]);

  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        Aperçu
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <DialogTitle className="truncate">{blockTitle}</DialogTitle>
              <Button variant="outline" size="sm" asChild>
                <a href={previewHref} target="_blank" rel="noreferrer" aria-label="Ouvrir en onglet">
                  <ExternalLink className="h-4 w-4" />
                  Ouvrir en onglet
                </a>
              </Button>
            </div>
          </DialogHeader>
          <div className="rounded-md border border-border bg-muted/20 p-2">
            <p className="text-xs text-muted-foreground">
              Aperçu desktop (1440) — les sélecteurs tablette/mobile reviendront plus tard.
            </p>
          </div>

          {/* Hidden measurement area (must be rendered to measure height). */}
          <div className="pointer-events-none absolute left-[-100000px] top-0 opacity-0">
            <div ref={measureRef} style={{ width: `${viewportWidth}px` }}>
              <BlockComponent />
            </div>
          </div>

          <div
            ref={viewportRef}
            className="h-[70vh] overflow-hidden rounded-md border border-border bg-background p-4"
          >
            <div className="flex h-full w-full items-start justify-center">
              <div
                className="shrink-0"
                style={{
                  width: `${Math.round(viewportWidth * scale)}px`,
                  height: naturalHeight ? `${Math.round(naturalHeight * scale)}px` : "auto",
                }}
              >
                <div
                  style={{
                    width: `${viewportWidth}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <BlockComponent />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function BlockLibrarySheet({
  disabled,
  triggerLabel = "Ajouter un bloc",
  onInsert,
}: {
  disabled?: boolean;
  triggerLabel?: string;
  onInsert: (block: { category: string; slug: string; title: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const allItems = useMemo((): BlockCatalogItem[] => {
    const out: BlockCatalogItem[] = [];
    for (const c of auroraBlockCatalog) {
      for (const b of c.blocks) {
        out.push({ categorySlug: c.slug, categoryTitle: c.title, block: b });
      }
    }
    return out;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      if (category !== "all" && item.categorySlug !== category) return false;
      if (!q) return true;
      return (
        item.block.title.toLowerCase().includes(q) ||
        item.block.slug.toLowerCase().includes(q) ||
        item.categoryTitle.toLowerCase().includes(q) ||
        item.categorySlug.toLowerCase().includes(q)
      );
    });
  }, [allItems, category, query]);

  const grouped = useMemo(() => {
    if (category !== "all") return new Map<string, BlockCatalogItem[]>([["", filtered]]);
    const map = new Map<string, BlockCatalogItem[]>();
    for (const item of filtered) {
      const key = item.categorySlug;
      const arr = map.get(key) ?? [];
      arr.push(item);
      map.set(key, arr);
    }
    return map;
  }, [filtered, category]);

  useEffect(() => {
    if (category !== "all") return;
    const q = query.trim();
    if (!q) {
      setOpenCategories([]);
      return;
    }
    setOpenCategories([...grouped.keys()]);
  }, [category, query, grouped]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" size="sm" disabled={disabled}>
          {triggerLabel}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle>Bibliothèque de blocs</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Clique “Aperçu” pour voir le rendu, puis clique “Ajouter”.
          </p>
        </SheetHeader>

        <div className="space-y-3 px-6 py-4">
          <div className="grid gap-2 sm:grid-cols-[1fr_220px]">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un bloc…"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {auroraBlockCatalog.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-xs text-muted-foreground">{filtered.length} bloc(s)</p>
        </div>

        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-6">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun bloc ne correspond à la recherche.</p>
            ) : category !== "all" ? (
              <div className="space-y-2">
                {filtered.map((item) => (
                  <div
                    key={`${item.categorySlug}/${item.block.slug}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.block.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.categorySlug}/{item.block.slug}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <BlockPreviewHoverButton
                        categorySlug={item.categorySlug}
                        blockSlug={item.block.slug}
                        blockTitle={item.block.title}
                        BlockComponent={item.block.Component}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => onInsert({ category: item.categorySlug, slug: item.block.slug, title: item.block.title })}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Accordion type="multiple" value={openCategories} onValueChange={setOpenCategories}>
                {[...grouped.entries()]
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([categorySlug, items]) => {
                    const categoryTitle =
                      auroraBlockCatalog.find((c) => c.slug === categorySlug)?.title ?? categorySlug;
                    return (
                      <AccordionItem key={categorySlug} value={categorySlug}>
                        <AccordionTrigger className="py-2 text-sm">
                          <div className="flex w-full items-center justify-between pr-2">
                            <span className="font-semibold">{categoryTitle}</span>
                            <span className="text-xs text-muted-foreground">{items.length}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {items
                              .slice()
                              .sort((a, b) => a.block.slug.localeCompare(b.block.slug))
                              .map((item) => (
                                <div
                                  key={`${item.categorySlug}/${item.block.slug}`}
                                  className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
                                >
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{item.block.title}</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                      {item.categorySlug}/{item.block.slug}
                                    </p>
                                  </div>
                                  <div className="flex shrink-0 items-center gap-2">
                                    <BlockPreviewHoverButton
                                      categorySlug={item.categorySlug}
                                      blockSlug={item.block.slug}
                                      blockTitle={item.block.title}
                                      BlockComponent={item.block.Component}
                                    />
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={() =>
                                        onInsert({
                                          category: item.categorySlug,
                                          slug: item.block.slug,
                                          title: item.block.title,
                                        })
                                      }
                                    >
                                      Ajouter
                                    </Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
              </Accordion>
            )}
          </div>
        </ScrollArea>

        <div className={cn("border-t border-border px-6 py-4", filtered.length ? "" : "hidden")}>
          <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
            Fermer
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
