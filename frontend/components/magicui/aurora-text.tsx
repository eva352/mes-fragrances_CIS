import * as React from "react";

import { cn } from "@/lib/utils";

type AuroraTextProps = {
  children: React.ReactNode;
  colors?: string[];
  className?: string;
};

export function AuroraText({ children, colors = ["#ff6b6b", "#6b5bff"], className }: AuroraTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <span
      className={cn("bg-clip-text text-transparent", className)}
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}
