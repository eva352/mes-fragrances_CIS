"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { AURORA_THEMES, useAuroraTheme } from "@/lib/aurora-theme";
import { getAppSpec, upsertAppSpec, type AppSpec } from "@/lib/api/app-spec";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ThemeSettings() {
  const { themeId, setTheme } = useAuroraTheme();
  const [spec, setSpec] = useState<AppSpec | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const env = await getAppSpec();
        setSpec(env.spec);
      } catch {
        // best-effort (MVP)
      }
    }
    void load();
  }, []);

  async function persistTheme(nextThemeId: string) {
    let workingSpec = spec;
    if (!workingSpec) {
      try {
        const env = await getAppSpec();
        workingSpec = env.spec;
        setSpec(env.spec);
      } catch {
        return;
      }
    }

    const nextSpec: AppSpec = {
      ...workingSpec,
      project: {
        ...workingSpec.project,
        theme: {
          ...workingSpec.project.theme,
          palette: nextThemeId,
        },
      },
    };

    setIsSaving(true);
    try {
      const updated = await upsertAppSpec(nextSpec);
      setSpec(updated.spec);
    } catch {
      toast.error("Impossible de sauvegarder le thème côté projet.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="text-base">Palette</CardTitle>
        <CardDescription>
          Les couleurs de l’UI (HSL). Le mode clair/sombre se règle séparément.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {AURORA_THEMES.map((t) => {
            const selected = t.id === themeId;
            const swatches = [t.swatches.primary, t.swatches.secondary, t.swatches.accent, t.swatches.background];

            return (
              <Button
                key={t.id}
                type="button"
                variant="outline"
                disabled={isSaving}
                onClick={async () => {
                  setTheme(t.id);
                  await persistTheme(t.id);
                }}
                className={cn(
                  "h-auto justify-start gap-3 rounded-xl px-3 py-3",
                  selected && "border-primary ring-2 ring-primary/20",
                )}
              >
                <div className="flex items-center gap-1">
                  {swatches.map((c, idx) => (
                    <span
                      key={idx}
                      className="h-4 w-4 rounded-sm border"
                      style={{ backgroundColor: c }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start">
                  <span className="truncate text-sm font-medium">{t.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.hasDark ? "Light/Dark" : "Light"}
                  </span>
                </div>
                <span className={cn("ml-auto opacity-0", selected && "opacity-100")}>
                  <Check className="h-4 w-4" />
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
