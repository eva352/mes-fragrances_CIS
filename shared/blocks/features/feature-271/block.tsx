import { BadgeCheck } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature271Props {
  className?: string;
}

const Feature271 = ({ className }: Feature271Props) => {
  const features = [
    "Instant Implementation",
    "One-Time Payment",
    "Developer Friendly",
    "Fully Responsive",
    "Production Ready",
    "Premium Support",
    "Regular Updates",
    "Customizable Design",
    "Performance Optimized",
    "Accessibility Compliant",
    "Cross-Browser ",
    "Documentation Included",
  ];

  return (
    <section className={cn("h-full w-screen overflow-hidden", className)}>
      <AuroraBackground>
        <div className="relative container flex h-full flex-col items-center justify-center gap-15 text-center">
          <div className="flex flex-col items-center justify-center">
            <Badge
              variant="outline"
              className="mb-5 w-fit rounded-full bg-background/70 px-4 py-1 text-sm tracking-tight"
            >
              Shadcnblocks
            </Badge>
            <h1 className="w-full max-w-xl text-center text-5xl font-medium font-semibold tracking-tighter lg:text-6xl">
              Start Using The free Blocks Now
            </h1>
          </div>
          <div className="flex w-full max-w-lg items-center gap-4 px-5">
            <span className="h-px w-full bg-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/50">FEATURES</p>
            <span className="h-px w-full bg-muted-foreground/20" />
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <li key={feature} className="flex gap-2 lg:items-center">
                <BadgeCheck className="size-4 text-muted-foreground text-primary" />
                <p className="tracking-tight text-muted-foreground/80">
                  {feature}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </AuroraBackground>
    </section>
  );
};

export { Feature271 };

// Below is the modified component from Aceternity UI
// Original source: npx shadcn@latest add https://ui.aceternity.com/registry/aurora-background.json
// Modified so we could change the aurora animate class and colors

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#000_10%,#666_15%,#ccc_20%,#fff_25%,#333_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

              "--gray-200": "#ccc",
              "--gray-400": "#666",
              "--gray-800": "#333",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--black)_10%,var(--gray-400)_15%,var(--gray-200)_20%,var(--white)_25%,var(--gray-800)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:animate-aurora-background after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
