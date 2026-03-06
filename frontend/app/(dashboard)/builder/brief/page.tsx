"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";

import { getProjectBrief, upsertProjectBrief, type ProjectBrief, type ProjectType } from "@/lib/api/project-brief";
import { getMaxUiProductTypes } from "@/lib/api/max-ui";
import { downloadLlmPack, generateLlmPack, getLlmSettings, precheckLlmPack } from "@/lib/api/llm";

function buildEmptyBrief(): ProjectBrief {
  return {
    version: "1.0",
    kind: "aurora.projectBrief",
    title: "Mon projet",
    oneLiner: "",
    projectType: "website",
    targetUsers: "",
    primaryGoal: "",
    tone: "",
    facts: "",
    siteType: "",

    // Legacy/extended fields kept for compatibility (ignored by the wizard UI).
    authRequired: false,
    roles: [],
    mustHave: [],
    niceToHave: [],
    nonGoals: [],
    entities: [],
    integrations: [],
    notes: "",
    openQuestions: [],
  };
}

export default function ProjectBriefWizardPage() {
  const [brief, setBrief] = useState<ProjectBrief | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const lastSavedJsonRef = useRef<string>("");

  const [llmHasKey, setLlmHasKey] = useState(false);
  const [llmModel, setLlmModel] = useState<string>("");
  const [isLlmLoading, setIsLlmLoading] = useState(false);

  const [warnings, setWarnings] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [confirmGenerateOpen, setConfirmGenerateOpen] = useState(false);
  const [pendingWarnings, setPendingWarnings] = useState<string[]>([]);
  const [packDialogOpen, setPackDialogOpen] = useState(false);
  const [packDownloadUrl, setPackDownloadUrl] = useState<string>("");
  const [packWroteDir, setPackWroteDir] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [maxUiProductTypes, setMaxUiProductTypes] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const env = await getProjectBrief();
        if (cancelled) return;
        const loaded = env.brief;
        setBrief({
          ...buildEmptyBrief(),
          ...loaded,
          projectType: loaded.projectType === "webapp" ? "webapp" : "website",
        });
        setLastSavedAt(env.updated_at);
        lastSavedJsonRef.current = JSON.stringify(env.brief);
      } catch {
        if (cancelled) return;
        const fallback = buildEmptyBrief();
        setBrief(fallback);
        lastSavedJsonRef.current = JSON.stringify(fallback);
        toast.error("Impossible de charger le brief. Mode brouillon local.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadMaxUi() {
      try {
        const res = await getMaxUiProductTypes();
        if (cancelled) return;
        setMaxUiProductTypes(res.productTypes ?? []);
      } catch {
        if (cancelled) return;
        setMaxUiProductTypes([]);
      }
    }
    loadMaxUi();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadLlm() {
      setIsLlmLoading(true);
      try {
        const s = await getLlmSettings();
        if (cancelled) return;
        setLlmHasKey(Boolean(s.hasOpenRouterApiKey));
        setLlmModel(s.openRouterModel ?? "");
      } catch {
        if (cancelled) return;
        setLlmHasKey(false);
        setLlmModel("");
      } finally {
        if (!cancelled) setIsLlmLoading(false);
      }
    }

    loadLlm();
    return () => {
      cancelled = true;
    };
  }, []);

  const normalized = useMemo<ProjectBrief | null>(() => {
    if (!brief) return null;
    return {
      ...brief,
      title: brief.title.trim(),
      oneLiner: brief.oneLiner.trim(),
      targetUsers: brief.targetUsers.trim(),
      primaryGoal: brief.primaryGoal.trim(),
      tone: brief.tone.trim(),
      facts: brief.facts.trim(),
      siteType: brief.siteType.trim(),
      projectType: brief.projectType === "webapp" ? "webapp" : "website",
    };
  }, [brief]);

  useEffect(() => {
    if (!normalized) return;
    const json = JSON.stringify(normalized);
    if (json === lastSavedJsonRef.current) return;

    const timer = window.setTimeout(async () => {
      setIsSaving(true);
      try {
        const env = await upsertProjectBrief(normalized);
        lastSavedJsonRef.current = JSON.stringify(env.brief);
        setLastSavedAt(env.updated_at);
      } catch {
        toast.error("Sauvegarde impossible. Vérifie que le backend tourne.");
      } finally {
        setIsSaving(false);
      }
    }, 900);

    return () => window.clearTimeout(timer);
  }, [normalized]);

  if (isLoading || !brief || !normalized) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Chargement…</p>
      </main>
    );
  }

  const projectType = normalized.projectType;
  const canGenerate = !isLlmLoading && llmHasKey && Boolean(llmModel.trim());

  async function runGeneration() {
    const res = await generateLlmPack();
    setWarnings(res.warnings ?? []);
    setPackDownloadUrl(res.downloadUrl);
    setPackWroteDir(res.wroteDir);
    setPackDialogOpen(true);
    toast.success("Pack généré.");
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <div className="space-y-1">
        <Typography variant="h2">Analyse du projet (wizard)</Typography>
        <Typography variant="muted">
          Réponds simplement. Ces infos servent à générer un pack de documents pour un LLM codeur.
        </Typography>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge variant="outline">Auto-save</Badge>
          <span className="text-xs text-muted-foreground">
            {isSaving
              ? "Sauvegarde…"
              : lastSavedAt
                ? `Dernière sauvegarde: ${new Date(lastSavedAt).toLocaleString()}`
                : "—"}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">1) Type de projet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Dans le MVP : un projet AuroraStack = un seul type.
          </p>
          <Select
            value={projectType}
            onValueChange={(value) => {
              setBrief((p) => (p ? { ...p, projectType: value as ProjectType } : p));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Site web (public)</SelectItem>
              <SelectItem value="webapp">Application admin (backoffice)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">2) Brief global</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Type de site (Max UI)</p>
            <Select
              value={brief.siteType || "__none__"}
              onValueChange={(value) => {
                const next = value === "__none__" ? "" : value;
                setBrief((p) => (p ? { ...p, siteType: next } : p));
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
            <p className="text-xs text-muted-foreground">
              Doit correspondre à la taxonomie Max UI (products.csv) pour améliorer la cohérence des patterns/styles.
            </p>
          </div>

          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Nom du projet</p>
            <Input
              value={brief.title}
              onChange={(e) => setBrief((p) => (p ? { ...p, title: e.target.value } : p))}
              placeholder="Ex : Studio Nova"
            />
            <p className="text-xs text-muted-foreground">Un nom simple pour identifier le projet.</p>
          </div>

          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Résumé en 1 phrase</p>
            <Input
              value={brief.oneLiner}
              onChange={(e) => setBrief((p) => (p ? { ...p, oneLiner: e.target.value } : p))}
              placeholder="Ex : Un site vitrine pour présenter nos services et obtenir des demandes de contact, ou une webapp qui devra gérer une application de facturation clients."
            />
            <p className="text-xs text-muted-foreground">Une phrase claire, sans détails techniques.</p>
          </div>

          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Pour qui ? (public / utilisateurs)</p>
            <Textarea
              value={brief.targetUsers}
              onChange={(e) => setBrief((p) => (p ? { ...p, targetUsers: e.target.value } : p))}
              placeholder="Ex : PME, indépendants, particuliers…"
              className="min-h-20"
            />
            <p className="text-xs text-muted-foreground">Qui va lire / utiliser ce projet.</p>
          </div>

          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">But principal</p>
            <Textarea
              value={brief.primaryGoal}
              onChange={(e) => setBrief((p) => (p ? { ...p, primaryGoal: e.target.value } : p))}
              placeholder="Ex : Recevoir des demandes de contact qualifiées."
              className="min-h-20"
            />
            <p className="text-xs text-muted-foreground">Le résultat le plus important.</p>
          </div>

          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Ton / style d’écriture (global)</p>
            <Input
              value={brief.tone}
              onChange={(e) => setBrief((p) => (p ? { ...p, tone: e.target.value } : p))}
              placeholder="Ex : professionnel et simple / premium / chaleureux / très direct"
            />
            <p className="text-xs text-muted-foreground">Aide à écrire des textes adaptés.</p>
          </div>

          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Infos factuelles utiles (optionnel)</p>
            <Textarea
              value={brief.facts}
              onChange={(e) => setBrief((p) => (p ? { ...p, facts: e.target.value } : p))}
              placeholder="Ex : email, téléphone, ville/pays, horaires, nom de société…"
              className="min-h-20"
            />
            <p className="text-xs text-muted-foreground">
              Optionnel : si tu ne sais pas, laisse vide — tu verras ceci directement avec le LLM codeur.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/20">
        <CardHeader>
          <CardTitle className="text-base">3) Générer les documents (ZIP)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Une seule génération produit <span className="font-mono">tous</span> les fichiers (docs LLM + specs + prompts + OpenAPI),
            les écrit dans <span className="font-mono">llm_specs/</span>, puis te propose le ZIP à télécharger.
          </p>

          {!llmHasKey || !llmModel.trim() ? (
            <div className="space-y-2">
              <p>
                Prérequis : configure ta clé OpenRouter + le modèle dans{" "}
                <Link href="/settings" className="underline underline-offset-4">
                  /settings
                </Link>{" "}
                → “IA (OpenRouter)”.
              </p>
            </div>
          ) : null}

          {warnings.length ? (
            <div className="rounded-md border border-border bg-background p-3">
              <p className="text-sm font-medium text-foreground">Avertissements (non bloquants)</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              disabled={!canGenerate || isGenerating}
              onClick={async () => {
                if (!llmModel.trim()) return;
                setIsGenerating(true);
                setWarnings([]);
                try {
                  // Force-save the latest brief to avoid races with the autosave debounce.
                  const env = await upsertProjectBrief(normalized);
                  lastSavedJsonRef.current = JSON.stringify(env.brief);
                  setLastSavedAt(env.updated_at);

                  const pre = await precheckLlmPack();
                  setWarnings(pre.warnings ?? []);
                  if (pre.warnings?.length) {
                    setPendingWarnings(pre.warnings);
                    setConfirmGenerateOpen(true);
                    return;
                  }

                  await runGeneration();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Génération impossible.");
                } finally {
                  setIsGenerating(false);
                }
              }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Génération…
                </>
              ) : (
                "Générer les documents"
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Astuce : pour un meilleur résultat, complète aussi les objectifs/descriptions côté builders (webapp :{" "}
            <span className="font-mono">/builder/app</span>, website : <span className="font-mono">/builder/landing</span>).
          </p>
        </CardContent>
      </Card>

      <Dialog open={packDialogOpen} onOpenChange={setPackDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Pack prêt</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Les fichiers ont été écrits dans :</p>
            <p className="rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
              {packWroteDir || "llm_specs/pack/..."}
            </p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setPackDialogOpen(false)}
              disabled={isDownloading}
            >
              Fermer
            </Button>
            <Button
              disabled={!packDownloadUrl || isDownloading}
              onClick={async () => {
                if (!packDownloadUrl) return;
                setIsDownloading(true);
                try {
                  const { blob, filename } = await downloadLlmPack(packDownloadUrl);
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = filename || "aurora-agent-pack.zip";
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Téléchargement impossible.");
                } finally {
                  setIsDownloading(false);
                }
              }}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Téléchargement…
                </>
              ) : (
                "Télécharger le zip"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmGenerateOpen} onOpenChange={setConfirmGenerateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Générer quand même ?</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Il manque des informations. Tu peux continuer, mais le pack sera moins précis.
            </p>
            {pendingWarnings.length ? (
              <div className="rounded-md border border-border bg-background p-3">
                <p className="text-sm font-medium text-foreground">Avertissements</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {pendingWarnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              disabled={isGenerating}
              onClick={() => {
                setConfirmGenerateOpen(false);
                setPendingWarnings([]);
              }}
            >
              Non
            </Button>
            <Button
              disabled={isGenerating}
              onClick={async () => {
                setConfirmGenerateOpen(false);
                setIsGenerating(true);
                try {
                  await runGeneration();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Génération impossible.");
                } finally {
                  setIsGenerating(false);
                  setPendingWarnings([]);
                }
              }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Génération…
                </>
              ) : (
                "Oui, générer"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
