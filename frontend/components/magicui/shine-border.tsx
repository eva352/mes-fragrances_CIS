"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ShineBorderProps {
  className?: string;
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
  children?: React.ReactNode;
}

export function ShineBorder({ className, children }: ShineBorderProps) {
  return (
    <div className={cn("relative rounded-2xl border border-border", className)}>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
