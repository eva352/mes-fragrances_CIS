"use client";

import { Switch } from "@/components/ui/switch";
import { useBuilderPreferences } from "@/lib/builder-preferences";

export function BuilderToggles() {
  const { prefs, setBuilderEnabled } = useBuilderPreferences();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
        <div>
          <p className="text-sm font-medium">Wizard (brief projet)</p>
          <p className="text-xs text-muted-foreground">
            Affiche le wizard qui capture la description du projet pour générer un agent pack.
          </p>
        </div>
        <Switch
          checked={prefs.brief}
          onCheckedChange={(checked) => setBuilderEnabled("brief", checked)}
        />
      </div>
      <div className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
        <div>
          <p className="text-sm font-medium">Webapp builder</p>
          <p className="text-xs text-muted-foreground">
            Affiche le builder webapp et ses menus dans la sidebar.
          </p>
        </div>
        <Switch
          checked={prefs.webapp}
          onCheckedChange={(checked) => setBuilderEnabled("webapp", checked)}
        />
      </div>
      <div className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
        <div>
          <p className="text-sm font-medium">Website builder</p>
          <p className="text-xs text-muted-foreground">
            Affiche le builder website et ses menus dans la sidebar.
          </p>
        </div>
        <Switch
          checked={prefs.website}
          onCheckedChange={(checked) => setBuilderEnabled("website", checked)}
        />
      </div>
    </div>
  );
}
