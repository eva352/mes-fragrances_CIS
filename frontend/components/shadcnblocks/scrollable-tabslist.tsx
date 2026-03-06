"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ScrollableTabsListProps {
  className?: string;
  children?: React.ReactNode;
}

export function ScrollableTabsList({ className, children }: ScrollableTabsListProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="min-w-max">{children}</div>
    </div>
  );
}
