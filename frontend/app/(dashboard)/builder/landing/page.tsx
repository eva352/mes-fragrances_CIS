"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  Home,
  Pencil,
  Plus,
  Settings2,
  Trash2,
  Wand2,
} from "lucide-react";

import type { BlockInstance, SitePage } from "@/lib/api/site-pages";
import {
  createSitePage,
  deleteSitePage,
  listSitePages,
  upsertSitePage,
} from "@/lib/api/site-pages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { BlockLibrarySheet } from "@/components/site/block-library-sheet";
import { auroraBlockCatalog } from "@/blocks/manifest";
import { suggestWebsiteStructure, type AvailableBlock, type SuggestedBlock } from "@/lib/api/structure";
import { getMaxUiProductTypes } from "@/lib/api/max-ui";
import { getProjectBrief, upsertProjectBrief, type ProjectBrief } from "@/lib/api/project-brief";
import { cn } from "@/lib/utils";

const RESERVED_SLUGS = new Set([
  "site",
  "showroom",
  "login",
  "builder",
  "api",
  "dashboard",
  "settings",
]);

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `blk_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function slugifyTitle(title: string) {
  const raw = title
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const base = raw || "page";
  return RESERVED_SLUGS.has(base) ? `${base}-page` : base;
}

function linesToList(text: string): string[] {
  return text
    .split(/\r?\n/g)
    .map((l) => l.trim())
    .filter(Boolean);
}

function listToLines(items: string[] | undefined): string {
  return (items ?? []).join("\n");
}

function buildUniqueSlug(title: string, pages: SitePage[]) {
  const base = slugifyTitle(title);
  const used = new Set(pages.map((p) => p.slug));
  if (!used.has(base)) return base;
  let i = 2;
  let candidate = `${base}-${i}`;
  while (used.has(candidate)) {
    i += 1;
    candidate = `${base}-${i}`;
  }
  return candidate;
}

function getPageHref(page: SitePage) {
  return page.is_home ? "/site" : `/site/${page.slug}`;
}

function sortPages(pages: SitePage[]) {
  return [...pages].sort((a, b) => {
    if (a.nav_order !== b.nav_order) return a.nav_order - b.nav_order;
    return a.title.localeCompare(b.title);
  });
}

function SortableBlockRow({
  block,
  onRemove,
  onEdit,
  canEdit,
}: {
  block: BlockInstance;
  onRemove: (id: string) => void;
  onEdit?: (id: string) => void;
  canEdit?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={isDragging ? "opacity-70" : undefined}>
      <Card>
        <CardContent className="flex items-center gap-3 py-3">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
            {...attributes}
            {...listeners}
            aria-label="Déplacer"
            title="Déplacer"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{block.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {block.category}/{block.slug}
            </p>
          </div>
          {canEdit ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onEdit?.(block.id)}
              aria-label="Éditer"
              title="Éditer"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(block.id)}
            aria-label="Supprimer"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LandingBuilderPage() {
  const [pages, setPages] = useState<SitePage[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingBlocks, setIsSavingBlocks] = useState(false);
  const [isSavingPage, setIsSavingPage] = useState(false);
  const [isPagesModalOpen, setIsPagesModalOpen] = useState(false);
  const [isSuggestingStructure, setIsSuggestingStructure] = useState(false);
  const [suggestStructureOpen, setSuggestStructureOpen] = useState(false);
  const [suggestedBlocks, setSuggestedBlocks] = useState<SuggestedBlock[]>([]);
  const [suggestNotes, setSuggestNotes] = useState<string[]>([]);
  const [suggestPatternName, setSuggestPatternName] = useState<string>("");
  const [suggestPatternSections, setSuggestPatternSections] = useState<string[]>([]);
  const [suggestDesignSystem, setSuggestDesignSystem] = useState<{
    styleName: string;
    colors: Record<string, string>;
    typography: Record<string, string>;
    keyEffects: string;
    antiPatterns: string;
    severity: string;
  } | null>(null);
  const [suggestDesignSystemMarkdown, setSuggestDesignSystemMarkdown] = useState<string | null>(null);
  const [suggestedForSlug, setSuggestedForSlug] = useState<string | null>(null);
  const [suggestQuery, setSuggestQuery] = useState<string>("");
  const [newTitle, setNewTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [expectedAction, setExpectedAction] = useState("");
  const [keyMessagesText, setKeyMessagesText] = useState("");
  const [facts, setFacts] = useState("");
  const [globalBrief, setGlobalBrief] = useState<ProjectBrief | null>(null);
  const [maxUiProductTypes, setMaxUiProductTypes] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsDraft, setSettingsDraft] = useState<ProjectBrief | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [editBlockOpen, setEditBlockOpen] = useState(false);
  const [editBlockId, setEditBlockId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<
    | {
        kind: "hero-1";
        headline: string;
        description: string;
        primaryCtaText: string;
        primaryCtaHref: string;
        secondaryCtaText: string;
        secondaryCtaHref: string;
        bulletsText: string;
      }
    | {
        kind: "feature-51";
        items: { heading: string; description: string }[];
      }
    | {
        kind: "pricing-9";
        title: string;
        subtitle: string;
        ctaLabel: string;
        tiers: { name: string; price: string; annualPrice: string; description: string }[];
      }
    | null
  >(null);
  const hasLoadedOnceRef = useRef(false);
  const searchParams = useSearchParams();
  const lastSavedTitleRef = useRef<Record<string, string>>({});
  const lastTitleToastAtRef = useRef<Record<string, number>>({});
  const suggestInFlightRef = useRef(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const selectedPage = useMemo(
    () => pages.find((p) => p.slug === selectedSlug) ?? null,
    [pages, selectedSlug],
  );

  const blocks = selectedPage?.blocks ?? [];
  const blockIds = useMemo(() => blocks.map((b) => b.id), [blocks]);
  const availableBlocks = useMemo<AvailableBlock[]>(() => {
    const out: AvailableBlock[] = [];
    for (const c of auroraBlockCatalog) {
      for (const b of c.blocks) {
        out.push({ category: c.slug, slug: b.slug, title: b.title });
      }
    }
    return out;
  }, []);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        let loaded = await listSitePages();
        if (!loaded.length) {
          const created = await createSitePage({
            slug: "landing",
            title: "Landing",
            is_home: true,
            show_in_nav: true,
          });
          loaded = [created];
        }
        const sorted = sortPages(loaded);
        setPages(sorted);
        const requestedSlug = searchParams?.get("page");
        const defaultPage =
          sorted.find((p) => p.slug === requestedSlug) ??
          sorted.find((p) => p.is_home) ??
          sorted[0];
        setSelectedSlug(defaultPage?.slug ?? null);
        setEditTitle(defaultPage?.title ?? "");
      } catch {
        toast.error("Impossible de charger les pages.");
      } finally {
        setIsLoading(false);
        hasLoadedOnceRef.current = true;
      }
    }
    load();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadGlobal() {
      try {
        const env = await getProjectBrief();
        if (cancelled) return;
        setGlobalBrief(env.brief);
      } catch {
        if (cancelled) return;
        setGlobalBrief(null);
      }

      try {
        const res = await getMaxUiProductTypes();
        if (cancelled) return;
        setMaxUiProductTypes(res.productTypes ?? []);
      } catch {
        if (cancelled) return;
        setMaxUiProductTypes([]);
      }
    }

    loadGlobal();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedPage) return;
    setEditTitle(selectedPage.title);
    setObjective(selectedPage.objective ?? "");
    setExpectedAction(selectedPage.expected_action ?? "");
    setKeyMessagesText(listToLines(selectedPage.key_messages ?? []));
    setFacts(selectedPage.facts ?? "");
    lastSavedTitleRef.current[selectedPage.slug] = selectedPage.title;
  }, [selectedPage?.slug]);

  useEffect(() => {
    if (!selectedPage) return;
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    if (trimmed === selectedPage.title) return;
    if (lastSavedTitleRef.current[selectedPage.slug] === trimmed) return;
    const timer = window.setTimeout(async () => {
      updateSelectedPage({ title: trimmed });
      lastSavedTitleRef.current[selectedPage.slug] = trimmed;
      const ok = await updatePage(selectedPage.slug, { title: trimmed });
      if (ok) showTitleSavedToast(selectedPage.slug);
    }, 800);
    return () => window.clearTimeout(timer);
  }, [editTitle, selectedPage?.slug]);

  useEffect(() => {
    if (!hasLoadedOnceRef.current || !selectedPage) return;
    const timer = window.setTimeout(async () => {
      setIsSavingBlocks(true);
      try {
        await upsertSitePage(selectedPage.slug, { blocks: selectedPage.blocks });
      } catch {
        toast.error("Sauvegarde automatique impossible.");
      } finally {
        setIsSavingBlocks(false);
      }
    }, 600);
    return () => window.clearTimeout(timer);
  }, [selectedPage?.blocks, selectedPage?.slug]);

  const updateSelectedPage = (patch: Partial<SitePage>) => {
    if (!selectedPage) return;
    setPages((prev) =>
      sortPages(prev.map((p) => (p.slug === selectedPage.slug ? { ...p, ...patch } : p))),
    );
  };

  const editableKindForBlock = (block: BlockInstance) => {
    if (block.category === "hero" && block.slug === "hero-1") return "hero-1" as const;
    if (block.category === "features" && block.slug === "feature-51") return "feature-51" as const;
    if (block.category === "pricing" && block.slug === "pricing-9") return "pricing-9" as const;
    return null;
  };

  const openBlockEditor = (block: BlockInstance) => {
    const kind = editableKindForBlock(block);
    if (!kind) return;
    setEditBlockId(block.id);

    const content = (block.content as any) ?? {};
    if (kind === "hero-1") {
      setEditDraft({
        kind,
        headline: String(content.headline ?? ""),
        description: String(content.description ?? ""),
        primaryCtaText: String(content.primaryCtaText ?? ""),
        primaryCtaHref: String(content.primaryCtaHref ?? ""),
        secondaryCtaText: String(content.secondaryCtaText ?? ""),
        secondaryCtaHref: String(content.secondaryCtaHref ?? ""),
        bulletsText: Array.isArray(content.bullets) ? content.bullets.join("\n") : String(content.bulletsText ?? ""),
      });
    } else if (kind === "feature-51") {
      const items: { heading: string; description: string }[] = Array.isArray(content.features)
        ? content.features.slice(0, 6).map((f: any) => ({
            heading: String(f?.heading ?? ""),
            description: String(f?.description ?? ""),
          }))
        : [
            { heading: "", description: "" },
            { heading: "", description: "" },
            { heading: "", description: "" },
          ];
      setEditDraft({ kind, items });
    } else if (kind === "pricing-9") {
      const tiers =
        Array.isArray(content.tiers) && content.tiers.length
          ? content.tiers.slice(0, 4).map((t: any) => ({
              name: String(t?.name ?? ""),
              price: String(t?.price ?? ""),
              annualPrice: String(t?.annualPrice ?? ""),
              description: String(t?.description ?? ""),
            }))
          : [
              { name: "Free", price: "$0", annualPrice: "$0", description: "" },
              { name: "Pro", price: "$10", annualPrice: "$100", description: "" },
              { name: "Premium", price: "$15", annualPrice: "$150", description: "" },
            ];
      setEditDraft({
        kind,
        title: String(content.title ?? ""),
        subtitle: String(content.subtitle ?? ""),
        ctaLabel: String(content.ctaLabel ?? ""),
        tiers,
      });
    }

    setEditBlockOpen(true);
  };

  const saveBlockEditor = () => {
    if (!selectedPage || !editBlockId || !editDraft) return;
    const nextBlocks = selectedPage.blocks.map((b) => {
      if (b.id !== editBlockId) return b;
      if (editDraft.kind === "hero-1") {
        const bullets = linesToList(editDraft.bulletsText);
        const content: Record<string, unknown> = {
          headline: editDraft.headline.trim() || undefined,
          description: editDraft.description.trim() || undefined,
          primaryCtaText: editDraft.primaryCtaText.trim() || undefined,
          primaryCtaHref: editDraft.primaryCtaHref.trim() || undefined,
          secondaryCtaText: editDraft.secondaryCtaText.trim() || undefined,
          secondaryCtaHref: editDraft.secondaryCtaHref.trim() || undefined,
          bullets: bullets.length ? bullets : undefined,
        };
        return { ...b, content };
      }
      if (editDraft.kind === "feature-51") {
        const features = editDraft.items
          .map((it) => ({ heading: it.heading.trim(), description: it.description.trim() }))
          .filter((it) => it.heading || it.description);
        return { ...b, content: { features } };
      }
      if (editDraft.kind === "pricing-9") {
        const tiers = editDraft.tiers
          .map((t) => ({
            name: t.name.trim(),
            price: t.price.trim(),
            annualPrice: t.annualPrice.trim(),
            description: t.description.trim(),
          }))
          .filter((t) => t.name);
        return {
          ...b,
          content: {
            title: editDraft.title.trim() || undefined,
            subtitle: editDraft.subtitle.trim() || undefined,
            ctaLabel: editDraft.ctaLabel.trim() || undefined,
            tiers: tiers.length ? tiers : undefined,
          },
        };
      }
      return b;
    });
    updateSelectedPage({ blocks: nextBlocks });
    toast.success("Bloc mis à jour.");
    setEditBlockOpen(false);
  };

  const resetBlockEditor = () => {
    if (!selectedPage || !editBlockId) return;
    const nextBlocks = selectedPage.blocks.map((b) => (b.id === editBlockId ? { ...b, content: null } : b));
    updateSelectedPage({ blocks: nextBlocks });
    toast.success("Bloc réinitialisé.");
    setEditBlockOpen(false);
  };

  const updatePage = async (
    slug: string,
    patch: Parameters<typeof upsertSitePage>[1],
  ): Promise<boolean> => {
    setIsSavingPage(true);
    try {
      const updated = await upsertSitePage(slug, patch);
      setPages((prev) =>
        sortPages(prev.map((p) => (p.slug === slug ? { ...p, ...updated } : p))),
      );
      return true;
    } catch {
      toast.error("Mise à jour impossible.");
      return false;
    } finally {
      setIsSavingPage(false);
    }
  };

  const showTitleSavedToast = (slug: string) => {
    const now = Date.now();
    const last = lastTitleToastAtRef.current[slug] ?? 0;
    if (now - last < 2000) return;
    lastTitleToastAtRef.current[slug] = now;
    toast.success("Titre sauvegardé.");
  };

  const setHomePage = async (slug: string) => {
    setIsSavingPage(true);
    try {
      const updated = await upsertSitePage(slug, { is_home: true });
      setPages((prev) =>
        sortPages(
          prev.map((p) => ({
            ...p,
            is_home: p.slug === updated.slug,
          })),
        ),
      );
      toast.success("Page d’accueil mise à jour.");
    } catch {
      toast.error("Impossible de définir la page d’accueil.");
    } finally {
      setIsSavingPage(false);
    }
  };

  const movePage = async (page: SitePage, direction: -1 | 1) => {
    const ordered = sortPages(pages);
    const index = ordered.findIndex((p) => p.slug === page.slug);
    const target = ordered[index + direction];
    if (!target) return;
    const updatedPages = pages.map((p) => {
      if (p.slug === page.slug) return { ...p, nav_order: target.nav_order };
      if (p.slug === target.slug) return { ...p, nav_order: page.nav_order };
      return p;
    });
    setPages(sortPages(updatedPages));
    try {
      await Promise.all([
        upsertSitePage(page.slug, { nav_order: target.nav_order }),
        upsertSitePage(target.slug, { nav_order: page.nav_order }),
      ]);
    } catch {
      toast.error("Impossible de réordonner les pages.");
    }
  };

  const orderedPages = useMemo(() => sortPages(pages), [pages]);

  const openSettings = async () => {
    if (!globalBrief) {
      try {
        const env = await getProjectBrief();
        setGlobalBrief(env.brief);
        setSettingsDraft(env.brief);
      } catch {
        toast.error("Impossible de charger le brief global.");
        return;
      }
    } else {
      setSettingsDraft(globalBrief);
    }
    setIsSettingsOpen(true);
  };

  const saveSettings = async () => {
    if (!settingsDraft) return;
    setIsSavingSettings(true);
    try {
      const env = await upsertProjectBrief(settingsDraft);
      setGlobalBrief(env.brief);
      setSuggestedForSlug(null);
      toast.success("Paramètres enregistrés.");
      setIsSettingsOpen(false);
    } catch {
      toast.error("Enregistrement impossible.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const runSuggestStructure = async (pageSlug: string) => {
    const res = await suggestWebsiteStructure({
      pageSlug,
      availableBlocks,
    });
    setSuggestedForSlug(pageSlug);
    setSuggestQuery(res.maxUi.query ?? "");
    setSuggestedBlocks(res.plan.blocks ?? []);
    setSuggestNotes(res.plan.notes ?? []);
    setSuggestPatternName(res.maxUi.pattern?.name ?? "");
    setSuggestPatternSections(res.maxUi.pattern?.sections ?? []);
    setSuggestDesignSystem(
      res.maxUi.designSystem
        ? {
            styleName: res.maxUi.designSystem.styleName,
            colors: res.maxUi.designSystem.colors ?? {},
            typography: res.maxUi.designSystem.typography ?? {},
            keyEffects: res.maxUi.designSystem.keyEffects ?? "",
            antiPatterns: res.maxUi.designSystem.antiPatterns ?? "",
            severity: res.maxUi.designSystem.severity ?? "MEDIUM",
          }
        : null,
    );
    setSuggestDesignSystemMarkdown(res.maxUi.designSystemMarkdown ?? null);
  };

  const renderPageRow = (page: SitePage) => {
    const isSelected = page.slug === selectedSlug;
    const isHome = page.is_home;

    return (
      <div key={page.id} className="space-y-1">
        <div
          className={cn(
            "flex items-center gap-2 rounded-md border border-transparent px-2 py-1.5",
            isSelected ? "bg-muted" : "hover:bg-muted/50",
          )}
        >
          <button
            type="button"
            onClick={() => setSelectedSlug(page.slug)}
            className="min-w-0 flex-1 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-medium">{page.title}</span>
              {isHome ? (
                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                  <Home className="h-3 w-3" />
                  Accueil
                </Badge>
              ) : null}
            </div>
            <p className="truncate text-xs text-muted-foreground">/{page.slug}</p>
          </button>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => movePage(page, -1)}
              aria-label="Monter"
              title="Monter"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => movePage(page, 1)}
              aria-label="Descendre"
              title="Descendre"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base">Website builder</CardTitle>
              <p className="text-xs text-muted-foreground">
                Crée des pages, organise la navigation et compose les blocs par page.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <BlockLibrarySheet
                disabled={!selectedPage}
                triggerLabel="Bibliothèque de blocs"
                onInsert={(block) => {
                  if (!selectedPage) return;
                  updateSelectedPage({
                    blocks: [...selectedPage.blocks, { ...block, id: createId() }],
                  });
                  toast.success("Bloc ajouté.");
                }}
              />
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={selectedPage ? getPageHref(selectedPage) : "/site"}
                  target="_blank"
                  rel="noreferrer"
                  prefetch={false}
                >
                  Voir la page
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  void openSettings();
                }}
              >
                <Settings2 className="h-4 w-4" />
                Paramètres
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={!selectedPage || isSuggestingStructure}
                onClick={async () => {
                  if (!selectedPage) return;
                  if (suggestedForSlug === selectedPage.slug && suggestedBlocks.length) {
                    setSuggestStructureOpen(true);
                    return;
                  }
                  if (suggestInFlightRef.current) return;
                  suggestInFlightRef.current = true;
                  setIsSuggestingStructure(true);
                  try {
                    await runSuggestStructure(selectedPage.slug);
                    setSuggestStructureOpen(true);
                  } catch (err) {
                    toast.error(err instanceof Error ? err.message : "Impossible de proposer une structure.");
                  } finally {
                    setIsSuggestingStructure(false);
                    suggestInFlightRef.current = false;
                  }
                }}
              >
                <Wand2 className="h-4 w-4" />
                {isSuggestingStructure ? "Analyse…" : "Proposer une structure"}
              </Button>
              <Button
                size="sm"
                disabled={!selectedPage || isSavingBlocks || isSavingPage}
                onClick={async () => {
                  if (!selectedPage) return;
                  setIsSavingBlocks(true);
                  try {
                    await upsertSitePage(selectedPage.slug, { blocks: selectedPage.blocks });
                    toast.success("Page sauvegardée.");
                  } catch {
                    toast.error("Sauvegarde impossible.");
                  } finally {
                    setIsSavingBlocks(false);
                  }
                }}
              >
                {isSavingBlocks ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Dialog open={suggestStructureOpen} onOpenChange={setSuggestStructureOpen}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Structure proposée</DialogTitle>
            <DialogDescription>
              Basée sur ton brief + des patterns (Max UI) + un orchestrateur IA. Tu peux appliquer puis reprendre la main (drag&drop).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {suggestQuery ? (
              <div className="rounded-lg border border-border bg-muted/20 p-3">
                <p className="text-xs font-medium text-muted-foreground">Requête (Max UI)</p>
                <p className="mt-1 break-words text-xs text-muted-foreground">{suggestQuery}</p>
              </div>
            ) : null}

            {suggestPatternName ? (
              <div className="rounded-lg border border-border bg-muted/20 p-3">
                <p className="text-xs font-medium text-muted-foreground">Pattern</p>
                <p className="text-sm font-semibold">{suggestPatternName}</p>
                {suggestPatternSections.length ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Sections : {suggestPatternSections.join(" → ")}
                  </p>
                ) : null}
              </div>
            ) : null}

            {suggestDesignSystem ? (
              <div className="rounded-lg border border-border bg-muted/20 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-medium text-muted-foreground">Design system (Max UI)</p>
                  <Badge variant="outline" className="text-xs">
                    {suggestDesignSystem.severity}
                  </Badge>
                </div>
                <p className="mt-1 text-sm font-semibold">{suggestDesignSystem.styleName}</p>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Couleurs</p>
                    <p className="text-xs text-muted-foreground">
                      primary {suggestDesignSystem.colors.primary} · secondary {suggestDesignSystem.colors.secondary} · cta {suggestDesignSystem.colors.cta}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      background {suggestDesignSystem.colors.background} · text {suggestDesignSystem.colors.text}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Typo</p>
                    <p className="text-xs text-muted-foreground">
                      heading {suggestDesignSystem.typography.heading} · body {suggestDesignSystem.typography.body}
                    </p>
                    {suggestDesignSystem.keyEffects ? (
                      <p className="text-xs text-muted-foreground">effets: {suggestDesignSystem.keyEffects}</p>
                    ) : null}
                  </div>
                </div>
                {suggestDesignSystem.antiPatterns ? (
                  <p className="mt-2 text-xs text-muted-foreground">à éviter: {suggestDesignSystem.antiPatterns}</p>
                ) : null}
              </div>
            ) : null}

            {suggestDesignSystemMarkdown ? (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Détails Max UI (Markdown)</p>
                <Textarea
                  readOnly
                  value={suggestDesignSystemMarkdown}
                  className="min-h-[220px] font-mono text-xs"
                />
              </div>
            ) : null}

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Blocs ({suggestedBlocks.length})
              </p>
              {suggestedBlocks.length ? (
                <div className="space-y-2">
                  {suggestedBlocks.map((b, idx) => (
                    <div key={`${b.category}/${b.slug}/${idx}`} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{b.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{b.category}/{b.slug}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Aucune proposition.</p>
              )}
            </div>

            {suggestNotes.length ? (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Notes</p>
                <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                  {suggestNotes.map((n, idx) => (
                    <li key={idx}>{n}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-wrap justify-end gap-2 pt-1">
              <Button type="button" variant="outline" onClick={() => setSuggestStructureOpen(false)}>
                Annuler
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!selectedPage || isSuggestingStructure}
                onClick={async () => {
                  if (!selectedPage) return;
                  if (suggestInFlightRef.current) return;
                  suggestInFlightRef.current = true;
                  setIsSuggestingStructure(true);
                  try {
                    await runSuggestStructure(selectedPage.slug);
                    toast.success("Structure régénérée.");
                  } catch (err) {
                    toast.error(err instanceof Error ? err.message : "Régénération impossible.");
                  } finally {
                    setIsSuggestingStructure(false);
                    suggestInFlightRef.current = false;
                  }
                }}
              >
                Régénérer
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!selectedPage || !suggestedBlocks.length}
                onClick={() => {
                  if (!selectedPage) return;
                  const next: BlockInstance[] = suggestedBlocks.map((b) => ({ ...b, id: createId() }));
                  updateSelectedPage({ blocks: [...selectedPage.blocks, ...next] });
                  toast.success("Blocs ajoutés à la fin.");
                  setSuggestStructureOpen(false);
                }}
              >
                Ajouter à la fin
              </Button>
              <Button
                type="button"
                disabled={!selectedPage || !suggestedBlocks.length}
                onClick={() => {
                  if (!selectedPage) return;
                  const next: BlockInstance[] = suggestedBlocks.map((b) => ({ ...b, id: createId() }));
                  updateSelectedPage({ blocks: next });
                  toast.success("Blocs appliqués.");
                  setSuggestStructureOpen(false);
                }}
              >
                Appliquer (remplacer)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isSettingsOpen}
        onOpenChange={(open) => {
          setIsSettingsOpen(open);
          if (!open) setSettingsDraft(null);
        }}
      >
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Paramètres (pour “Proposer une structure”)</DialogTitle>
            <DialogDescription>
              Ces champs alimentent Max UI + l’orchestrateur (structure + design system). Ils ne servent pas à la génération du pack LLM.
            </DialogDescription>
          </DialogHeader>

          {settingsDraft ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Type de site (Max UI)</p>
                <Select
                  value={settingsDraft.siteType || "__none__"}
                  onValueChange={(value) => {
                    const next = value === "__none__" ? "" : value;
                    setSettingsDraft((p) => (p ? { ...p, siteType: next } : p));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">—</SelectItem>
                    {maxUiProductTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Résumé en 1 phrase</p>
                <Input
                  value={settingsDraft.oneLiner}
                  onChange={(e) => setSettingsDraft((p) => (p ? { ...p, oneLiner: e.target.value } : p))}
                  placeholder="Ex : Un site vitrine pour présenter nos services et obtenir des demandes."
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Pour qui ? (public)</p>
                <Textarea
                  value={settingsDraft.targetUsers}
                  onChange={(e) => setSettingsDraft((p) => (p ? { ...p, targetUsers: e.target.value } : p))}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">But principal</p>
                <Textarea
                  value={settingsDraft.primaryGoal}
                  onChange={(e) => setSettingsDraft((p) => (p ? { ...p, primaryGoal: e.target.value } : p))}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Ton / style rédactionnel</p>
                <Input
                  value={settingsDraft.tone}
                  onChange={(e) => setSettingsDraft((p) => (p ? { ...p, tone: e.target.value } : p))}
                  placeholder="Ex : premium, chaleureux, direct…"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsSettingsOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="button" onClick={() => void saveSettings()} disabled={isSavingSettings}>
                    {isSavingSettings ? "Enregistrement…" : "Enregistrer"}
                  </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Chargement…</p>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={editBlockOpen}
        onOpenChange={(open) => {
          setEditBlockOpen(open);
          if (!open) {
            setEditDraft(null);
            setEditBlockId(null);
          }
        }}
      >
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Éditer le bloc</DialogTitle>
            <DialogDescription>
              MVP : édition data-driven sur 3 blocs pilotes (Hero 1, Feature 51, Pricing 9).
            </DialogDescription>
          </DialogHeader>

          {editDraft ? (
            <div className="space-y-4">
              {editDraft.kind === "hero-1" ? (
                <div className="grid gap-3">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Headline</p>
                    <Input
                      value={editDraft.headline}
                      onChange={(e) => setEditDraft({ ...editDraft, headline: e.target.value })}
                      placeholder="Ex : Le studio qui transforme vos idées en produits."
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Description</p>
                    <Textarea
                      value={editDraft.description}
                      onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })}
                      placeholder="Une phrase claire sur la valeur."
                      className="min-h-24"
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">CTA principal (texte)</p>
                      <Input
                        value={editDraft.primaryCtaText}
                        onChange={(e) => setEditDraft({ ...editDraft, primaryCtaText: e.target.value })}
                        placeholder="Ex : Demander une démo"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">CTA principal (lien)</p>
                      <Input
                        value={editDraft.primaryCtaHref}
                        onChange={(e) => setEditDraft({ ...editDraft, primaryCtaHref: e.target.value })}
                        placeholder="/contact"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">CTA secondaire (texte)</p>
                      <Input
                        value={editDraft.secondaryCtaText}
                        onChange={(e) => setEditDraft({ ...editDraft, secondaryCtaText: e.target.value })}
                        placeholder="Ex : Voir les services"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">CTA secondaire (lien)</p>
                      <Input
                        value={editDraft.secondaryCtaHref}
                        onChange={(e) => setEditDraft({ ...editDraft, secondaryCtaHref: e.target.value })}
                        placeholder="/services"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Bullets (1 par ligne)</p>
                    <Textarea
                      value={editDraft.bulletsText}
                      onChange={(e) => setEditDraft({ ...editDraft, bulletsText: e.target.value })}
                      placeholder={"Ex :\nSans engagement\nRéponse en 24h\nDesign premium"}
                      className="min-h-24"
                    />
                  </div>
                </div>
              ) : null}

              {editDraft.kind === "feature-51" ? (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Features (onglets)</p>
                  <div className="space-y-3">
                    {editDraft.items.map((it, idx) => (
                      <div key={idx} className="rounded-lg border border-border p-3">
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">Titre</p>
                            <Input
                              value={it.heading}
                              onChange={(e) => {
                                const next = [...editDraft.items];
                                next[idx] = { ...next[idx], heading: e.target.value };
                                setEditDraft({ ...editDraft, items: next });
                              }}
                              placeholder={`Feature ${idx + 1}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">Description</p>
                            <Input
                              value={it.description}
                              onChange={(e) => {
                                const next = [...editDraft.items];
                                next[idx] = { ...next[idx], description: e.target.value };
                                setEditDraft({ ...editDraft, items: next });
                              }}
                              placeholder="Une phrase."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditDraft({ ...editDraft, items: [...editDraft.items, { heading: "", description: "" }] })}
                      disabled={editDraft.items.length >= 6}
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter
                    </Button>
                  </div>
                </div>
              ) : null}

              {editDraft.kind === "pricing-9" ? (
                <div className="space-y-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Titre</p>
                      <Input value={editDraft.title} onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })} placeholder="Ex : Des prix simples" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">CTA (label)</p>
                      <Input value={editDraft.ctaLabel} onChange={(e) => setEditDraft({ ...editDraft, ctaLabel: e.target.value })} placeholder="Ex : Choisir" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Sous-titre</p>
                    <Textarea value={editDraft.subtitle} onChange={(e) => setEditDraft({ ...editDraft, subtitle: e.target.value })} className="min-h-20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Plans</p>
                    <div className="space-y-3">
                      {editDraft.tiers.map((t, idx) => (
                        <div key={idx} className="rounded-lg border border-border p-3">
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Nom</p>
                              <Input
                                value={t.name}
                                onChange={(e) => {
                                  const next = [...editDraft.tiers];
                                  next[idx] = { ...next[idx], name: e.target.value };
                                  setEditDraft({ ...editDraft, tiers: next });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Description</p>
                              <Input
                                value={t.description}
                                onChange={(e) => {
                                  const next = [...editDraft.tiers];
                                  next[idx] = { ...next[idx], description: e.target.value };
                                  setEditDraft({ ...editDraft, tiers: next });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Prix mensuel</p>
                              <Input
                                value={t.price}
                                onChange={(e) => {
                                  const next = [...editDraft.tiers];
                                  next[idx] = { ...next[idx], price: e.target.value };
                                  setEditDraft({ ...editDraft, tiers: next });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Prix annuel</p>
                              <Input
                                value={t.annualPrice}
                                onChange={(e) => {
                                  const next = [...editDraft.tiers];
                                  next[idx] = { ...next[idx], annualPrice: e.target.value };
                                  setEditDraft({ ...editDraft, tiers: next });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditBlockOpen(false)}>
                  Annuler
                </Button>
                <Button type="button" variant="outline" onClick={resetBlockEditor} disabled={!selectedPage || !editBlockId}>
                  Réinitialiser
                </Button>
                <Button type="button" onClick={saveBlockEditor} disabled={!selectedPage || !editBlockId}>
                  Enregistrer
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sélectionne un bloc à éditer.</p>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">Pages</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPagesModalOpen(true)}
                  aria-label="Créer / gérer les pages"
                  title="Créer / gérer les pages"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {orderedPages.length ? (
                orderedPages.map((page) => renderPageRow(page))
              ) : (
                <p className="text-sm text-muted-foreground">Aucune page.</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-muted/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">Brief (page)</CardTitle>
                {selectedPage ? (
                  <Badge variant="outline" className="text-xs">
                    {isSavingPage ? "Sauvegarde…" : "Auto-save"}
                  </Badge>
                ) : null}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedPage ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    Ces champs servent au wizard (Analyse projet) et au LLM codeur pour adapter les textes/SEO à ton projet.
                  </p>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Objectif de la page</p>
                    <Input
                      value={objective}
                      onChange={(event) => setObjective(event.target.value)}
                      onBlur={() => {
                        if (!selectedPage) return;
                        const trimmed = objective.trim();
                        updateSelectedPage({ objective: trimmed || null });
                        updatePage(selectedPage.slug, { objective: trimmed || null });
                      }}
                      placeholder="Ex : Expliquer l’offre et donner envie de contacter."
                    />
                    <p className="text-xs text-muted-foreground">
                      Ce que cette page doit accomplir pour le visiteur.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Action attendue (CTA)</p>
                    <Input
                      value={expectedAction}
                      onChange={(event) => setExpectedAction(event.target.value)}
                      onBlur={() => {
                        if (!selectedPage) return;
                        const trimmed = expectedAction.trim();
                        updateSelectedPage({ expected_action: trimmed || null });
                        updatePage(selectedPage.slug, { expected_action: trimmed || null });
                      }}
                      placeholder="Ex : Nous contacter / Demander un devis / Prendre rendez-vous"
                    />
                    <p className="text-xs text-muted-foreground">
                      L’action principale à mettre en avant (bouton, lien, formulaire).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Messages essentiels (3 à 5 lignes)</p>
                    <Textarea
                      value={keyMessagesText}
                      onChange={(event) => setKeyMessagesText(event.target.value)}
                      onBlur={() => {
                        if (!selectedPage) return;
                        const key_messages = linesToList(keyMessagesText);
                        updateSelectedPage({ key_messages });
                        updatePage(selectedPage.slug, { key_messages });
                      }}
                      placeholder={"Ex :\nSimple\nRapide\nTransparence\nSupport réactif"}
                      className="min-h-24"
                    />
                    <p className="text-xs text-muted-foreground">
                      Le LLM utilisera ces points pour adapter les textes des blocs.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Infos factuelles utiles (optionnel)</p>
                    <Textarea
                      value={facts}
                      onChange={(event) => setFacts(event.target.value)}
                      onBlur={() => {
                        if (!selectedPage) return;
                        const trimmed = facts.trim();
                        updateSelectedPage({ facts: trimmed || null });
                        updatePage(selectedPage.slug, { facts: trimmed || null });
                      }}
                      placeholder="Ex : ville/pays, email, téléphone, horaires"
                      className="min-h-20"
                    />
                    <p className="text-xs text-muted-foreground">
                      Optionnel : si tu ne sais pas, laisse vide — tu verras ceci directement avec le LLM codeur.
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sélectionne une page pour définir son objectif, son CTA et ses messages.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          {selectedPage ? (
            blocks.length === 0 ? (
              <Card>
                <CardContent className="py-6 text-sm text-muted-foreground">
                  Aucun bloc. Utilise “Bibliothèque de blocs” pour ajouter des sections.
                </CardContent>
              </Card>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {blocks.map((block) => (
                      <SortableBlockRow
                        key={block.id}
                        block={block}
                        onRemove={(id) => {
                          updateSelectedPage({
                            blocks: selectedPage.blocks.filter((b) => b.id !== id),
                          });
                        }}
                        canEdit={Boolean(editableKindForBlock(block))}
                        onEdit={(id) => {
                          const target = selectedPage.blocks.find((b) => b.id === id);
                          if (!target) return;
                          openBlockEditor(target);
                        }}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )
          ) : (
            <Card>
              <CardContent className="py-6 text-sm text-muted-foreground">
                Sélectionne une page pour gérer ses blocs.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isPagesModalOpen} onOpenChange={setIsPagesModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Pages</DialogTitle>
            <DialogDescription>
              Crée une page et ajuste ses paramètres. La navigation publique se met à jour automatiquement.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Créer une page</h3>
              <div className="space-y-2">
                <Input
                  placeholder="Titre de la page"
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Slug généré:{" "}
                  <span className="font-mono">
                    /{newTitle.trim() ? buildUniqueSlug(newTitle, pages) : "page"}
                  </span>
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                disabled={!newTitle.trim()}
                onClick={async () => {
                  const slug = buildUniqueSlug(newTitle, pages);
                  try {
                    const created = await createSitePage({
                      slug,
                      title: newTitle.trim(),
                      show_in_nav: true,
                      status: "published",
                    });
                    const updated = sortPages([...pages, created]);
                    setPages(updated);
                    setSelectedSlug(created.slug);
                    setNewTitle("");
                    setIsPagesModalOpen(false);
                    toast.success("Page créée.");
                  } catch {
                    toast.error("Création impossible.");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
                Créer
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Paramètres</h3>
              {selectedPage ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Titre</p>
                    <Input
                      value={editTitle}
                      onChange={(event) => setEditTitle(event.target.value)}
                      onBlur={() => {
                        const trimmed = editTitle.trim();
                        if (!trimmed) return;
                        if (trimmed === selectedPage.title) return;
                        if (lastSavedTitleRef.current[selectedPage.slug] === trimmed) return;
                        updateSelectedPage({ title: trimmed });
                        lastSavedTitleRef.current[selectedPage.slug] = trimmed;
                        updatePage(selectedPage.slug, { title: trimmed }).then((ok) => {
                          if (ok) showTitleSavedToast(selectedPage.slug);
                        });
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
                    <div>
                      <p className="text-sm font-medium">Afficher dans la navbar</p>
                      <p className="text-xs text-muted-foreground">Visible dans le menu public.</p>
                    </div>
                    <Switch
                      checked={selectedPage.show_in_nav}
                      onCheckedChange={(checked) => {
                        updateSelectedPage({ show_in_nav: checked });
                        updatePage(selectedPage.slug, { show_in_nav: checked });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Statut</p>
                    <Select
                      value={selectedPage.status}
                      onValueChange={(value) => {
                        updateSelectedPage({ status: value });
                        updatePage(selectedPage.slug, { status: value });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Publié</SelectItem>
                        <SelectItem value="draft">Brouillon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={selectedPage.is_home}
                      onClick={() => setHomePage(selectedPage.slug)}
                    >
                      <Home className="h-4 w-4" />
                      Définir comme accueil
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={pages.length <= 1}
                      onClick={async () => {
                        if (!selectedPage) return;
                        if (pages.length <= 1) return;
                        const confirmDelete = window.confirm(
                          `Supprimer la page "${selectedPage.title}" ?`,
                        );
                        if (!confirmDelete) return;
                        try {
                          await deleteSitePage(selectedPage.slug);
                          const remaining = pages.filter((p) => p.slug !== selectedPage.slug);
                          const nextSelected = remaining.find((p) => p.is_home) ?? remaining[0] ?? null;
                          setPages(sortPages(remaining));
                          setSelectedSlug(nextSelected?.slug ?? null);
                          toast.success("Page supprimée.");
                          setIsPagesModalOpen(false);
                        } catch {
                          toast.error("Suppression impossible.");
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </div>
                  {pages.length <= 1 ? (
                    <p className="text-xs text-muted-foreground">
                      La dernière page ne peut pas être supprimée.
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Sélectionne une page pour voir ses paramètres.</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || !selectedPage) return;
    const oldIndex = selectedPage.blocks.findIndex((b) => b.id === active.id);
    const newIndex = selectedPage.blocks.findIndex((b) => b.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    updateSelectedPage({
      blocks: arrayMove(selectedPage.blocks, oldIndex, newIndex),
    });
  }
}
