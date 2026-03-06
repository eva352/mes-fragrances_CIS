"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  className?: string;
  glow?: boolean | number;
  proximity?: number;
  spread?: number;
  inactiveZone?: number;
  disabled?: boolean;
}

export function GlowingEffect({ className, disabled }: GlowingEffectProps) {
  if (disabled) return null;
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_60%)]",
        className,
      )}
    />
  );
}
