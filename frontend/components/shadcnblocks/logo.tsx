"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface LogoProps {
  url?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Logo({ url = "#", className, children }: LogoProps) {
  return (
    <a href={url} className={cn("inline-flex items-center gap-2", className)}>
      {children ?? <LogoText />}
    </a>
  );
}

interface LogoImageProps {
  src?: string;
  alt?: string;
  title?: string;
  className?: string;
}

export function LogoImage({ src, alt = "logo", title, className }: LogoImageProps) {
  if (!src) {
    return <div className={cn("h-8 w-24 rounded bg-muted", className)} aria-hidden="true" />;
  }
  return <img src={src} alt={alt} title={title} className={cn("h-8 w-auto", className)} />;
}

export function LogoImageDesktop(props: LogoImageProps) {
  return <LogoImage {...props} />;
}

export function LogoImageMobile(props: LogoImageProps) {
  return <LogoImage {...props} />;
}

export function LogoText({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <span className={cn("text-sm font-semibold uppercase tracking-tight", className)}>
      {children ?? "Logo"}
    </span>
  );
}
