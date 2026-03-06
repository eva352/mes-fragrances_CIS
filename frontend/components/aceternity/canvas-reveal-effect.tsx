"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type CanvasColor = string | number[];

interface CanvasRevealEffectProps {
  className?: string;
  containerClassName?: string;
  colors?: CanvasColor[];
  dotSize?: number;
  animationSpeed?: number;
}

export function CanvasRevealEffect({ className, containerClassName, colors = ["#60a5fa", "#f472b6"], dotSize = 2 }: CanvasRevealEffectProps) {
  const toColor = (value: CanvasColor) => {
    if (Array.isArray(value)) {
      const [r, g, b] = value;
      return `rgb(${r ?? 255}, ${g ?? 255}, ${b ?? 255})`;
    }
    return value;
  };
  const primary = toColor(colors[0] ?? "#60a5fa");
  const secondary = toColor(colors[1] ?? colors[0] ?? "#f472b6");
  const gradient = `radial-gradient(circle at 20% 20%, ${primary}22 0%, transparent 45%), radial-gradient(circle at 80% 30%, ${secondary}22 0%, transparent 45%)`;
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div
        className={cn("absolute inset-0", className)}
        style={{
          background: gradient,
          backgroundSize: `${dotSize * 20}px ${dotSize * 20}px`,
        }}
      />
    </div>
  );
}
