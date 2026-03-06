"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { getLlmSettings, listOpenRouterModels, upsertLlmSettings, type OpenRouterProviderGroup } from "@/lib/api/llm";

export function LlmSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasKey, setHasKey] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");

  const [providers, setProviders] = useState<OpenRouterProviderGroup[]>([]);
  const [isModelsLoading, setIsModelsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const s = await getLlmSettings();
        if (cancelled) return;
        setHasKey(Boolean(s.hasOpenRouterApiKey));
        setSelectedModel(s.openRouterModel ?? "");

        if (s.hasOpenRouterApiKey) {
          setIsModelsLoading(true);
          try {
            const res = await listOpenRouterModels();
            if (cancelled) return;
            setProviders(res.providers ?? []);
          } catch {
            if (cancelled) return;
            toast.error("Impossible de charger la liste des modèles OpenRouter.");
          } finally {
            if (!cancelled) setIsModelsLoading(false);
          }
        }
      } catch {
        if (cancelled) return;
        toast.error("Impossible de charger les paramètres OpenRouter.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const modelsCount = useMemo(() => providers.reduce((sum, p) => sum + (p.models?.length ?? 0), 0), [providers]);

  async function refreshModels() {
    setIsModelsLoading(true);
    try {
      const res = await listOpenRouterModels();
      setProviders(res.providers ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Impossible de récupérer la liste des modèles.");
    } finally {
      setIsModelsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Chargement…</p>
    );
  }

  return (
    <div className="space-y-3">
      <Card className="bg-muted/20">
        <CardHeader>
          <CardTitle className="text-base">Clé OpenRouter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2">
            <p className="text-xs text-muted-foreground">
              La clé est stockée côté serveur (chiffrée). Elle n’est jamais incluse dans le pack.
            </p>
            <Input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder={hasKey ? "•••••••• (remplacer la clé)" : "Coller la clé OpenRouter…"}
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                disabled={!apiKeyInput.trim()}
                onClick={async () => {
                  try {
                    const s = await upsertLlmSettings({ openRouterApiKey: apiKeyInput.trim() });
                    setHasKey(Boolean(s.hasOpenRouterApiKey));
                    setApiKeyInput("");
                    toast.success("Clé OpenRouter enregistrée.");
                    await refreshModels();
                  } catch (err) {
                    toast.error(err instanceof Error ? err.message : "Enregistrement impossible.");
                  }
                }}
              >
                Enregistrer la clé
              </Button>
              {hasKey ? (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    try {
                      const s = await upsertLlmSettings({ openRouterApiKey: "" });
                      setHasKey(Boolean(s.hasOpenRouterApiKey));
                      setProviders([]);
                      setSelectedModel("");
                      toast.success("Clé supprimée.");
                    } catch (err) {
                      toast.error(err instanceof Error ? err.message : "Suppression impossible.");
                    }
                  }}
                >
                  Supprimer la clé
                </Button>
              ) : null}
              {hasKey ? (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={isModelsLoading}
                  onClick={refreshModels}
                >
                  {isModelsLoading ? "Chargement…" : "Charger les modèles"}
                </Button>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={cn("bg-muted/20", !hasKey ? "opacity-60" : undefined)}>
        <CardHeader>
          <CardTitle className="text-base">Modèle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Select
            value={selectedModel}
            disabled={!hasKey || !modelsCount}
            onValueChange={async (value) => {
              setSelectedModel(value);
              try {
                await upsertLlmSettings({ openRouterModel: value });
              } catch {
                toast.error("Impossible d’enregistrer le modèle.");
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={hasKey ? (modelsCount ? "Choisir un modèle…" : "Charger la liste des modèles") : "Ajoute une clé d’abord"} />
            </SelectTrigger>
            <SelectContent>
              {providers.map((group, idx) => (
                <SelectGroup key={group.provider}>
                  <SelectLabel>{group.provider}</SelectLabel>
                  {group.models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name ? `${m.name} (${m.id})` : m.id}
                    </SelectItem>
                  ))}
                  {idx < providers.length - 1 ? <SelectSeparator /> : null}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Conseil : utiliser de préférence un modèle premium pour générer les documents (GPT 5.2, Gemini 3, Claude 4.5…).
          </p>
        </CardContent>
      </Card>

      <Card className="bg-muted/20">
        <CardHeader>
          <CardTitle className="text-base">Génération des documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Typography variant="muted">La génération se fait dans le wizard (Brief).</Typography>
          <Button asChild type="button" variant="outline" size="sm">
            <Link href="/builder/brief">Ouvrir le wizard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
