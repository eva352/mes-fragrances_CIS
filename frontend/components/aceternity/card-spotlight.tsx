"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CardSpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardSpotlight({ className, children }: CardSpotlightProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-background p-6", className)}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
