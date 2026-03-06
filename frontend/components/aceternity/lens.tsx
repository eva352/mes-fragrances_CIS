"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface LensProps {
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

export function Lens({ hovering, setHovering, className, children }: LensProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-3xl", className)}
      onMouseEnter={() => setHovering?.(true)}
      onMouseLeave={() => setHovering?.(false)}
    >
      <div className={cn("transition-transform duration-300", hovering ? "scale-[1.02]" : "")}>{children}</div>
    </div>
  );
}
