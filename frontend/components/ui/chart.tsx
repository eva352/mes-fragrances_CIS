"use client";

import * as React from "react";
import { Tooltip } from "recharts";

import { cn } from "@/lib/utils";
import { echarts, type EChartsCoreOption, type EChartsType } from "@/lib/echarts/core";
import { useAuroraChartThemeToken } from "@/lib/echarts/theme";

export type ChartConfig = Record<
  string,
  {
    label: string;
    color?: string;
  }
>;

type ChartContextValue = {
  config?: ChartConfig;
};

const ChartContext = React.createContext<ChartContextValue>({});

export function ChartContainer({
  config,
  className,
  children,
}: {
  config?: ChartConfig;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("w-full", className)}>{children}</div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip(props: React.ComponentProps<typeof Tooltip>) {
  return <Tooltip {...props} />;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  indicator,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number | string; color?: string }>;
  label?: string;
  indicator?: "solid" | "dashed";
}) {
  if (!active || !payload || payload.length === 0) return null;
  const borderStyle = indicator === "dashed" ? "border-dashed" : "border-solid";
  return (
    <div className={cn("rounded-md border border-border bg-background p-2 text-xs shadow-sm", borderStyle)}>
      {label ? <div className="mb-1 font-medium">{label}</div> : null}
      <div className="space-y-1">
        {payload.map((item, index) => (
          <div key={`${item.name ?? "item"}-${index}`} className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-mono">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export type AuroraChartProps = {
  option: EChartsCoreOption;
  height?: number;
  className?: string;
};

export function Chart({ option, height = 280, className }: AuroraChartProps) {
  const theme = useAuroraChartThemeToken();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const chartRef = React.useRef<EChartsType | null>(null);

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const chart = echarts.init(node, undefined, { renderer: "canvas" });
    chartRef.current = chart;

    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(node);

    return () => {
      observer.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const baseTooltip = {
      backgroundColor: theme.background,
      borderColor: theme.border,
      textStyle: { color: theme.foreground },
    };

    const baseLegend = {
      textStyle: { color: theme.mutedForeground },
    };

    const mergedTooltip =
      option.tooltip && typeof option.tooltip === "object" && !Array.isArray(option.tooltip)
        ? { ...baseTooltip, ...option.tooltip }
        : option.tooltip ?? baseTooltip;

    const mergedLegend =
      option.legend && typeof option.legend === "object" && !Array.isArray(option.legend)
        ? { ...baseLegend, ...option.legend }
        : option.legend ?? baseLegend;

    const themedOption: EChartsCoreOption = {
      backgroundColor: "transparent",
      textStyle: { color: theme.foreground },
      color: option.color ?? theme.chart,
      tooltip: mergedTooltip,
      legend: mergedLegend,
      ...option,
    };

    chart.setOption(themedOption, { notMerge: true, lazyUpdate: true });
  }, [option, theme]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full", className)}
      style={{ height }}
      aria-label="Chart"
      role="img"
    />
  );
}
