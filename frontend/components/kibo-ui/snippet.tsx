"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface SnippetProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export function Snippet({ value, defaultValue, onValueChange, className, children }: SnippetProps) {
  return (
    <Tabs value={value} defaultValue={defaultValue} onValueChange={onValueChange} className={cn("w-full rounded-lg border border-border bg-background", className)}>
      {children}
    </Tabs>
  );
}

export function SnippetHeader({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("flex items-center justify-between gap-3 border-b border-border px-3 py-2", className)}>{children}</div>;
}

export function SnippetTabsList({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <TabsList className={cn("h-8", className)}>{children}</TabsList>;
}

export function SnippetTabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) {
  return <TabsTrigger className={cn("h-7 text-xs", className)} {...props} />;
}

export function SnippetTabsContent({ className, ...props }: React.ComponentProps<typeof TabsContent>) {
  return (
    <TabsContent
      className={cn("mt-0 bg-background px-4 py-3 text-xs font-mono", className)}
      {...props}
    />
  );
}

interface SnippetCopyButtonProps {
  value?: string;
  onCopy?: () => void;
  onError?: () => void;
}

export function SnippetCopyButton({ value = "", onCopy, onError }: SnippetCopyButtonProps) {
  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(value);
      }
      onCopy?.();
    } catch {
      onError?.();
    }
  };

  return (
    <Button type="button" variant="ghost" size="sm" onClick={handleCopy}>
      Copier
    </Button>
  );
}
