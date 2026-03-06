import { cn } from "@/lib/utils";

export default function SpacerSm({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("h-8", className)} />;
}

