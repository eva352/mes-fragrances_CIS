"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface PatternPlaceholderProps {
  className?: string;
}

export function PatternPlaceholder({ className }: PatternPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:48px_48px]",
        className,
      )}
    />
  );
}
