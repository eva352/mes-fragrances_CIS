import { cn } from "@/lib/utils";

export default function SpacerLg({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("h-24", className)} />;
}

