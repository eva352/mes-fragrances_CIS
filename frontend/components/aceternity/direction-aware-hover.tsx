"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface DirectionAwareHoverProps {
  className?: string;
  imageUrl: string;
  children?: React.ReactNode;
}

export function DirectionAwareHover({ className, imageUrl, children }: DirectionAwareHoverProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-3xl", className)}>
      <img src={imageUrl} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="space-y-1">{children}</div>
      </div>
    </div>
  );
}
