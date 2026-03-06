"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.12),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_45%)]",
        className,
      )}
    />
  );
}
