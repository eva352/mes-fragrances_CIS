"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "lead"
  | "muted"
  | "small"

export type TypographyProps = {
  variant?: TypographyVariant
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-3xl font-semibold tracking-tight sm:text-4xl",
  h2: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-lg font-semibold tracking-tight",
  p: "leading-7",
  lead: "text-lg text-muted-foreground",
  muted: "text-sm text-muted-foreground",
  small: "text-sm font-medium leading-none",
}

function defaultTagForVariant(variant: TypographyVariant): TypographyProps["as"] {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "muted":
    case "small":
      return "span"
    case "lead":
    case "p":
    default:
      return "p"
  }
}

export function Typography({
  variant = "p",
  as,
  className,
  children,
}: TypographyProps) {
  const Tag = (as ?? defaultTagForVariant(variant)) as keyof JSX.IntrinsicElements
  return <Tag className={cn(variantClasses[variant], className)}>{children}</Tag>
}

