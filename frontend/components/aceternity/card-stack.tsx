"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CardStackItem {
  id?: string | number;
  name?: string;
  designation?: string;
  content?: React.ReactNode;
}

interface CardStackProps {
  items?: CardStackItem[];
  className?: string;
}

export function CardStack({ items = [], className }: CardStackProps) {
  const visible = items.slice(0, 3);
  return (
    <div className={cn("relative w-80", className)}>
      {visible.map((item, index) => (
        <div
          key={item.id ?? index}
          className={cn(
            "rounded-2xl border border-border bg-background p-5 shadow-sm",
          )}
          style={{
            position: "relative",
            top: index * -12,
            zIndex: visible.length - index,
          }}
        >
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.designation}</p>
          <div className="mt-3 text-sm text-muted-foreground">{item.content}</div>
        </div>
      ))}
    </div>
  );
}
