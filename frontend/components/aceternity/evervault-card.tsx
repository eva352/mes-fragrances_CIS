"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface EvervaultCardProps {
  text?: string;
  className?: string;
}

export function EvervaultCard({ text = "Secure", className }: EvervaultCardProps) {
  return (
    <div className={cn("flex items-center justify-center rounded-2xl border border-border bg-background p-6 text-sm", className)}>
      {text}
    </div>
  );
}
