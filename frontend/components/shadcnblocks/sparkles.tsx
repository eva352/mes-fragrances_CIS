"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
}

export function SparklesCore({
  className,
  background = "transparent",
  particleColor = "#ffffff",
}: SparklesCoreProps) {
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ background }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${particleColor}22 0%, transparent 40%), radial-gradient(circle at 80% 30%, ${particleColor}22 0%, transparent 45%), radial-gradient(circle at 30% 80%, ${particleColor}22 0%, transparent 40%)`,
        }}
      />
    </div>
  );
}
