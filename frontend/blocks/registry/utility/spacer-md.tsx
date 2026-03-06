import { cn } from "@/lib/utils";

export default function SpacerMd({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("h-16", className)} />;
}

