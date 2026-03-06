"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface RippleProps {
  className?: string;
  mainCircleSize?: number;
}

export function Ripple({ className }: RippleProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 rounded-full border border-primary/20", className)} />
  );
}
