"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

export function ColorModeToggle({
  label = "Mode sombre",
  showLabel = true,
  className,
}: {
  label?: string;
  showLabel?: boolean;
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className={className}>
      <div
        className={
          showLabel
            ? "flex items-center justify-between gap-3"
            : "flex items-center justify-center gap-3"
        }
      >
        {showLabel ? (
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{label}</span>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        ) : (
          <>
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={isDark}
              disabled={!mounted}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              aria-label="Basculer light/dark"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </>
        )}
        {showLabel ? (
          <Switch
            checked={isDark}
            disabled={!mounted}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Basculer light/dark"
          />
        ) : null}
      </div>
    </div>
  );
}
