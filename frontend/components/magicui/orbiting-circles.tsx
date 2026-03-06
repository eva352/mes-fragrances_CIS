"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface OrbitingCirclesProps {
  className?: string;
  iconSize?: number;
  radius?: number;
  speed?: number;
  reverse?: boolean;
  children?: React.ReactNode;
}

export function OrbitingCircles({ className, children }: OrbitingCirclesProps) {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", className)}>
      <div className="flex flex-wrap items-center justify-center gap-3">{children}</div>
    </div>
  );
}
