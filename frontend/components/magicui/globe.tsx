"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="h-40 w-40 rounded-full border border-border bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
    </div>
  );
}
