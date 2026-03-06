"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ThreeDMarqueeProps {
  className?: string;
  images?: string[];
}

export function ThreeDMarquee({ className, images = [] }: ThreeDMarqueeProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-2", className)}>
      {images.map((src, index) => (
        <div key={`${src}-${index}`} className="overflow-hidden rounded-lg">
          <img src={src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}
