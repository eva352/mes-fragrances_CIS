import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { ColorModeToggle } from "@/components/color-mode-toggle";
import { BuilderToggles } from "./builder-toggles";
import { ThemeSettings } from "./theme-settings";
import { LlmSettings } from "./llm-settings";

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-xl border border-border bg-card">
      <summary className="cursor-pointer list-none px-4 py-3 [&::-webkit-details-marker]:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{title}</p>
            {description ? (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </div>
      </summary>
      <div className="border-t border-border p-4">{children}</div>
    </details>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <SettingsSection
        title="Builders"
        description="Affiche ou masque les builders dans la sidebar."
      >
        <BuilderToggles />
      </SettingsSection>

      <SettingsSection
        title="Mode clair / sombre"
        description="Choisis l’apparence globale (light/dark)."
      >
        <ColorModeToggle label="Mode sombre" />
      </SettingsSection>

      <SettingsSection
        title="Thème (palette)"
        description="Choisis un thème (tokens HSL) — appliqué immédiatement et mémorisé."
      >
        <ThemeSettings />
      </SettingsSection>

      <SettingsSection
        title="IA (OpenRouter)"
        description="Configure ta clé OpenRouter + le modèle. La génération se fait dans le wizard."
      >
        <LlmSettings />
      </SettingsSection>
    </div>
  );
}
