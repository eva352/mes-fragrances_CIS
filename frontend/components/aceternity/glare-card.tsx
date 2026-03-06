"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface GlareCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlareCard({ className, children }: GlareCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-background", className)}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
