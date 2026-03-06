"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface GlowingStarsBackgroundCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlowingStarsBackgroundCard({ className, children }: GlowingStarsBackgroundCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-background p-4",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_45%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
