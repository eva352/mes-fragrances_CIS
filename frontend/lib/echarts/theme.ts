"use client";

import * as React from "react";

type AuroraChartTheme = {
  chart: string[];
  foreground: string;
  mutedForeground: string;
  border: string;
  background: string;
};

function readCssVar(name: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value;
}

function hslFromVar(varName: string) {
  const raw = readCssVar(varName);
  if (!raw) return undefined;
  return `hsl(${raw})`;
}

function getTheme(): AuroraChartTheme {
  const chart = [
    hslFromVar("--chart-1"),
    hslFromVar("--chart-2"),
    hslFromVar("--chart-3"),
    hslFromVar("--chart-4"),
    hslFromVar("--chart-5"),
  ].filter(Boolean) as string[];

  return {
    chart: chart.length ? chart : ["#22c55e", "#3b82f6", "#a855f7", "#f97316", "#ef4444"],
    background: hslFromVar("--background") ?? "#ffffff",
    foreground: hslFromVar("--foreground") ?? "#0f172a",
    mutedForeground: hslFromVar("--muted-foreground") ?? "#64748b",
    border: hslFromVar("--border") ?? "#e2e8f0",
  };
}

export function useAuroraChartThemeToken() {
  const [theme, setTheme] = React.useState<AuroraChartTheme>(() => getTheme());

  React.useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class", "data-aurora-theme"],
    });
    setTheme(getTheme());
    return () => observer.disconnect();
  }, []);

  return theme;
}
