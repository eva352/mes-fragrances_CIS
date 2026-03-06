"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface GridPatternProps {
  className?: string;
  style?: React.CSSProperties;
}

export function GridPattern({ className, style }: GridPatternProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:32px_32px]",
        className,
      )}
      style={style}
    />
  );
}
