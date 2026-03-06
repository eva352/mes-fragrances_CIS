import { cn } from "@/lib/utils";

export default function SpacerXs({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("h-4", className)} />;
}

