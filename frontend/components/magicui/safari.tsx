"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SafariProps {
  imageSrc: string;
  url?: string;
  mode?: "light" | "dark" | "simple" | string;
  className?: string;
}

export function Safari({ imageSrc, url, mode = "light", className }: SafariProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-background", className)}>
      <div className={cn("flex items-center gap-2 border-b border-border px-3 py-2 text-xs", mode === "dark" ? "bg-muted text-foreground" : "bg-background")}
      >
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-green-400" />
        <span className="ml-2 truncate text-muted-foreground">{url ?? "example.com"}</span>
      </div>
      <img src={imageSrc} alt="" className="h-full w-full object-cover" />
    </div>
  );
}
