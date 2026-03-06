"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface LinkPreviewProps {
  url: string;
  className?: string;
  children?: React.ReactNode;
}

export function LinkPreview({ url, className, children }: LinkPreviewProps) {
  return (
    <a
      href={url}
      className={cn("underline decoration-dotted underline-offset-4 hover:decoration-solid", className)}
      target={url.startsWith("http") ? "_blank" : undefined}
      rel={url.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
