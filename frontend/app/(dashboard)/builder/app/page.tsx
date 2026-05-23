"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { GripVertical, ExternalLink, Save, HelpCircle, Wand2 } from "lucide-react";
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
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { APP_PAGE_TEMPLATES } from "@/components/app-templates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { getAppSpec, upsertAppSpec, type AppPage, type AppSpec, type AppSpecShellNavItem } from "@/lib/api/app-spec";
import { useAppRuntime } from "@/components/app-runtime-context";
import { suggestWebappStructure, type AvailableTemplate, type WebappStructurePlan } from "@/lib/api/structure";

function linesToList(text: string): string[] {
  return text
    .split(/\r?\n/g)
    .map((l) => l.trim())
    .filter(Boolean);
}

function listToLines(items: string[] | undefined): string {
  return (items ?? []).join("\n");
}

function HelpTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
          aria-label="Aide"
          title="Aide"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[320px] text-xs leading-relaxed">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

const RESERVED_SLUGS = new Set([
  "dashboard",
  "settings",
  "aide",
  "support",
  "documentation",
  "profil",
  "login",
  "builder",
  "ui",
  "site",
  "api",
]);

function normalizeLegacyAppPath(path: string) {
  if (path === "/app/dashboard") return "/";
  if (path.startsWith("/app/")) return `/${path.slice("/app/".length)}`;
  return path;
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

function isFixedBackofficePage(path: string) {
  const p = normalizeLegacyAppPath(path);
  return p === "/" || p === "/dashboard" || p === "/settings" || p === "/aide";
}

function buildUniquePathForTitle(params: {
  title: string;
  pages: AppPage[];
  currentPageId: string;
}) {
  const baseSlug = slugifyTitle(params.title);
  const used = new Set(
    params.pages
      .filter((p) => p.id !== params.currentPageId)
      .map((p) => normalizeLegacyAppPath(p.path)),
  );

  if (baseSlug === "dashboard") {
    return "/dashboard-page";
  }

  let candidate = `/${baseSlug}`;
  let i = 2;
  while (used.has(candidate) || isFixedBackofficePage(candidate)) {
    candidate = `/${baseSlug}-${i}`;
    i += 1;
  }
  return candidate;
}

function normalizeSpec(spec: AppSpec, navigationPageIds: string[]): AppSpec {
  const normalizedPages = spec.pages.map((p) => ({
    ...p,
    enabled: p.enabled ?? true,
    templateId: p.templateId ?? null,
    path: normalizeLegacyAppPath(p.path),
  }));

  const pageById = new Map<string, AppPage>();
  for (const p of normalizedPages) pageById.set(p.id, p);

  const existingByPageId = new Map<string, AppSpecShellNavItem>();
  for (const item of spec.shell.navigation) {
    const normalizedPath = normalizeLegacyAppPath(item.path);
    const page = normalizedPages.find((p) => p.path === normalizedPath);
    if (!page) continue;
    existingByPageId.set(page.id, item);
  }

  const normalizedNavigation = navigationPageIds
    .map((pageId) => {
      const page = pageById.get(pageId);
      if (!page || page.enabled === false) return null;
      if (isFixedBackofficePage(page.path)) return null;
      const existing = existingByPageId.get(pageId);
      return {
        id: existing?.id ?? `nav_${pageId}`,
        title: page.title,
        path: page.path,
      } satisfies AppSpecShellNavItem;
    })
    .filter(Boolean) as AppSpecShellNavItem[];

  return {
    ...spec,
    shell: {
      ...spec.shell,
      navigation: normalizedNavigation,
    },
    pages: normalizedPages,
  };
}

function SortableNavRow({ id, title, path }: { id: string; title: string; path: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={cn(isDragging ? "opacity-70" : undefined)}>
      <Card className="border-border/60">
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
            <p className="truncate text-sm font-medium">{title}</p>
            <p className="truncate text-xs text-muted-foreground">{path}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function WebAppPlannerPage() {
  const [spec, setSpec] = useState<AppSpec | null>(null);
  const [navigationPageIds, setNavigationPageIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuggestingStructure, setIsSuggestingStructure] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestPatternName, setSuggestPatternName] = useState("");
  const [suggestPatternSections, setSuggestPatternSections] = useState<string[]>([]);
  const [suggestNotes, setSuggestNotes] = useState<string[]>([]);
  const [suggestPlan, setSuggestPlan] = useState<WebappStructurePlan | null>(null);
  const [suggestDesignSystem, setSuggestDesignSystem] = useState<{
    styleName: string;
    colors: Record<string, string>;
    typography: Record<string, string>;
    keyEffects: string;
    antiPatterns: string;
    severity: string;
  } | null>(null);
  const [suggestDesignSystemMarkdown, setSuggestDesignSystemMarkdown] = useState<string | null>(null);
  const { setSpec: setRuntimeSpec } = useAppRuntime();
  const suggestInFlightRef = useRef(false);
  const [hasSuggestedOnce, setHasSuggestedOnce] = useState(false);

  const runSuggest = async () => {
    const res = await suggestWebappStructure({ availableTemplates });
    setSuggestPlan(res.plan);
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
    setHasSuggestedOnce(true);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const env = await getAppSpec();
      const loaded: AppSpec = {
        ...env.spec,
        pages: env.spec.pages.map((p) => ({ ...p, path: normalizeLegacyAppPath(p.path) })),
        shell: {
          ...env.spec.shell,
          navigation: env.spec.shell.navigation.map((n) => ({ ...n, path: normalizeLegacyAppPath(n.path) })),
        },
      };

      const enabledPages = loaded.pages.filter((p) => p.enabled !== false && !isFixedBackofficePage(p.path));
      const enabledIds = new Set(enabledPages.map((p) => p.id));

      const pageIdByPath = new Map<string, string>();
      for (const p of loaded.pages) pageIdByPath.set(p.path, p.id);

      const base = loaded.shell.navigation
        .map((n) => pageIdByPath.get(n.path))
        .filter((id): id is string => Boolean(id))
        .filter((id) => enabledIds.has(id));

      const missing = enabledPages.map((p) => p.id).filter((id) => !base.includes(id));

      if (!cancelled) {
        setSpec(loaded);
        setNavigationPageIds([...base, ...missing]);
      }
    }

    load().catch(() => {
      toast.error("Impossible de charger la spec webapp");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const enabledPages = useMemo(() => {
    return (spec?.pages ?? []).filter((p) => p.enabled !== false);
  }, [spec]);

  const previewPath = (() => {
    const firstId = navigationPageIds[0];
    const page = spec?.pages.find((p) => p.id === firstId);
    return page?.path ?? "/";
  })();

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    const oldIndex = navigationPageIds.indexOf(String(active.id));
    const newIndex = navigationPageIds.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    setNavigationPageIds((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  if (!spec) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Chargement…</p>
      </main>
    );
  }

  const normalized = normalizeSpec(spec, navigationPageIds);
  const availableTemplates = useMemo<AvailableTemplate[]>(() => {
    return APP_PAGE_TEMPLATES.map((t) => ({ id: t.id, title: t.title }));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Typography variant="h2">WebApp (plan)</Typography>
          <Typography variant="muted">
            Configure pages + navigation + templates. Source of truth: `llm_specs/app.json`.
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={previewPath}>
              <ExternalLink className="h-4 w-4" />
              Ouvrir dans le backoffice
            </Link>
          </Button>
          <Button
            variant="outline"
            disabled={isSuggestingStructure}
            onClick={async () => {
              if (hasSuggestedOnce) {
                setSuggestOpen(true);
                return;
              }
              if (suggestInFlightRef.current) return;
              suggestInFlightRef.current = true;
              setIsSuggestingStructure(true);
              try {
                await runSuggest();
                setSuggestOpen(true);
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
            onClick={async () => {
              setIsSaving(true);
              try {
                const env = await upsertAppSpec(normalized);
                setSpec(env.spec);
                setRuntimeSpec(env.spec);
                toast.success("Spec webapp sauvegardée");
              } catch {
                toast.error("Erreur lors de la sauvegarde");
              } finally {
                setIsSaving(false);
              }
            }}
            disabled={isSaving}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Dialog open={suggestOpen} onOpenChange={setSuggestOpen}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Structure proposée</DialogTitle>
            <DialogDescription>
              Basée sur ton brief + patterns (Max UI) + un orchestrateur IA. Tu peux appliquer puis ajuster manuellement.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
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

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isSuggestingStructure}
                onClick={async () => {
                  if (suggestInFlightRef.current) return;
                  suggestInFlightRef.current = true;
                  setIsSuggestingStructure(true);
                  try {
                    await runSuggest();
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
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Navigation</p>
                {suggestPlan?.navigationPageIds?.length ? (
                  <div className="space-y-2">
                    {suggestPlan.navigationPageIds.map((id) => {
                      const page = normalized.pages.find((p) => p.id === id);
                      return (
                        <div key={id} className="rounded-lg border border-border p-3">
                          <p className="truncate text-sm font-medium">{page?.title ?? id}</p>
                          <p className="truncate text-xs text-muted-foreground">{page?.path ?? "—"}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">—</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Pages (modifiées)</p>
                {suggestPlan?.pages?.length ? (
                  <div className="space-y-2">
                    {suggestPlan.pages.map((p) => (
                      <div key={p.id} className="rounded-lg border border-border p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">{p.title}</p>
                          <Badge variant={p.enabled ? "secondary" : "outline"}>
                            {p.enabled ? "enabled" : "disabled"}
                          </Badge>
                        </div>
                        <p className="mt-1 truncate text-xs text-muted-foreground">{p.path}</p>
                        {p.templateId ? (
                          <p className="mt-1 truncate text-xs text-muted-foreground">template: {p.templateId}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">—</p>
                )}
              </div>
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
              <Button type="button" variant="outline" onClick={() => setSuggestOpen(false)}>
                Annuler
              </Button>
              <Button
                type="button"
                disabled={!suggestPlan}
                onClick={() => {
                  if (!suggestPlan) return;

                  const planPagesById = new Map(suggestPlan.pages.map((p) => [p.id, p]));

                  setSpec((prev) => {
                    if (!prev) return prev;
                    const nextPages: AppPage[] = prev.pages.map((page) => {
                      const planned = planPagesById.get(page.id);
                      if (!planned) return page;
                      return {
                        ...page,
                        enabled: planned.enabled,
                        templateId: planned.templateId ?? page.templateId ?? null,
                        objective: planned.objective ?? page.objective ?? null,
                        description: planned.description ?? page.description ?? null,
                        successCriteria: planned.successCriteria ?? page.successCriteria ?? [],
                      };
                    });
                    return { ...prev, pages: nextPages };
                  });

                  const allowedIds = new Set(normalized.pages.map((p) => p.id));
                  const filteredNav = (suggestPlan.navigationPageIds ?? [])
                    .filter((id) => allowedIds.has(id))
                    .filter((id) => {
                      const page = normalized.pages.find((p) => p.id === id);
                      if (!page) return false;
                      return !isFixedBackofficePage(page.path);
                    });
                  setNavigationPageIds(filteredNav);

                  toast.success("Structure appliquée.");
                  setSuggestOpen(false);
                }}
              >
                Appliquer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {normalized.pages.map((p) => {
              const enabled = p.enabled !== false;
              const fixed = isFixedBackofficePage(p.path);
              return (
                <div key={p.id} className="rounded-lg border border-border p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={enabled}
                        disabled={fixed}
                        onCheckedChange={(checked) => {
                          setSpec((prev) => {
                            if (!prev) return prev;
                            const nextPages = prev.pages.map((page) =>
                              page.id === p.id ? { ...page, enabled: checked } : page,
                            );
                            return { ...prev, pages: nextPages };
                          });

                          setNavigationPageIds((prev) => {
                            if (checked) {
                              return prev.includes(p.id) ? prev : [...prev, p.id];
                            }
                            return prev.filter((x) => x !== p.id);
                          });
                        }}
                      />
                      <div className="min-w-0">
                        <Input
                          value={p.title}
                          disabled={fixed}
                          onChange={(e) => {
                            const title = e.target.value;
                            setSpec((prev) => {
                              if (!prev) return prev;
                              return {
                                ...prev,
                                pages: prev.pages.map((page) =>
                                  page.id === p.id
                                    ? {
                                        ...page,
                                        title,
                                        path: buildUniquePathForTitle({
                                          title,
                                          pages: prev.pages,
                                          currentPageId: p.id,
                                        }),
                                      }
                                    : page,
                                ),
                              };
                            });
                          }}
                          className="h-9"
                        />
                        <p className="mt-2 text-xs text-muted-foreground">{p.path}</p>
                      </div>
                    </div>
                    <Badge variant={fixed ? "outline" : enabled ? "secondary" : "outline"}>
                      {fixed ? "fixed" : enabled ? "enabled" : "disabled"}
                    </Badge>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-2">
                    <p className="text-xs font-medium text-muted-foreground">Template</p>
                    <Select
                      value={p.templateId ?? ""}
                      disabled={fixed}
                      onValueChange={(value) => {
                        setSpec((prev) => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            pages: prev.pages.map((page) =>
                              page.id === p.id ? { ...page, templateId: value } : page,
                            ),
                          };
                        });
                      }}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Choisir un template" />
                      </SelectTrigger>
                      <SelectContent>
                        {APP_PAGE_TEMPLATES.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-muted-foreground">Objectif (1 phrase)</p>
                        <HelpTip text="À quoi sert cette page, en une phrase simple." />
                      </div>
                      <Input
                        value={p.objective ?? ""}
                        onChange={(e) => {
                          const objective = e.target.value;
                          setSpec((prev) => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              pages: prev.pages.map((page) =>
                                page.id === p.id ? { ...page, objective } : page,
                              ),
                            };
                          });
                        }}
                        placeholder="Ex : Voir les chiffres clés et les dernières actions."
                        className="h-9"
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-muted-foreground">Description</p>
                        <HelpTip text="Décris ce qu’on voit et ce qu’on peut faire. Pas besoin de détails techniques." />
                      </div>
                      <Textarea
                        value={p.description ?? ""}
                        onChange={(e) => {
                          const description = e.target.value;
                          setSpec((prev) => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              pages: prev.pages.map((page) =>
                                page.id === p.id ? { ...page, description } : page,
                              ),
                            };
                          });
                        }}
                        placeholder="Ex : Sur cette page, l’admin gère les factures : il voit la liste, peut créer, modifier et exporter."
                        className="min-h-24"
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-muted-foreground">C’est réussi si… (critères)</p>
                        <HelpTip text="Optionnel : si tu ne sais pas, laisse vide — tu verras ceci directement avec le LLM codeur." />
                      </div>
                      <Textarea
                        value={listToLines(p.successCriteria)}
                        onChange={(e) => {
                          const successCriteria = linesToList(e.target.value);
                          setSpec((prev) => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              pages: prev.pages.map((page) =>
                                page.id === p.id ? { ...page, successCriteria } : page,
                              ),
                            };
                          });
                        }}
                        placeholder={"Ex :\nLa liste se charge vite\nCréer une facture ne fait pas d’erreur\nLes changements sont visibles tout de suite"}
                        className="min-h-24"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
          </CardHeader>
        <CardContent className="space-y-3">
          <Typography variant="muted">
            Drag & drop l’ordre des pages activées.
          </Typography>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={navigationPageIds} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {navigationPageIds.map((id) => {
                    const page = (spec.pages ?? []).find((p) => p.id === id) ?? null;
                    return (
                      <SortableNavRow
                        key={id}
                        id={id}
                        title={page?.title ?? id}
                        path={page?.path ?? ""}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Résumé</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            Pages activées: <span className="font-medium">{enabledPages.length}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Le LLM utilisera `llm_specs/app.json` + le code templates pour brancher API, états et logique métier.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
