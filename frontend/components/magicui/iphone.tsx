"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface IphoneProps {
  src: string;
  className?: string;
}

export function Iphone({ src, className }: IphoneProps) {
  return (
    <div className={cn("rounded-[32px] border border-border bg-black p-2 shadow-lg", className)}>
      <img src={src} alt="" className="h-full w-full rounded-[24px] object-cover" />
    </div>
  );
}
