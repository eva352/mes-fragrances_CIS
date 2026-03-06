"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface PointerHighlightProps {
  containerClassName?: string;
  children?: React.ReactNode;
}

export function PointerHighlight({ containerClassName, children }: PointerHighlightProps) {
  return (
    <span className={cn("relative inline-block", containerClassName)}>
      <span className="absolute inset-0 -z-10 rounded-md bg-primary/15" />
      <span className="px-1">{children}</span>
    </span>
  );
}
