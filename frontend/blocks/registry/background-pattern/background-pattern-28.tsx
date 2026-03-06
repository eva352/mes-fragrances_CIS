import { cn } from "@/lib/utils";

import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";

interface BackgroundPattern28Props {
  className?: string;
}

const BackgroundPattern28 = ({ className }: BackgroundPattern28Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Center Spotlight Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
        radial-gradient(
          circle at center,
          oklch(from var(--primary) calc(l * 0.85) calc(c * 0.8) h / 0.12) 0%,
          oklch(from var(--primary) calc(l * 0.8) calc(c * 0.75) h / 0.08) 30%,
          oklch(from var(--primary) calc(l * 0.75) calc(c * 0.7) h / 0.04) 60%,
          transparent 80%
        )
      `,
        }}
      />
      <PatternPlaceholder />
    </section>
  );
};

export { BackgroundPattern28 };

export default BackgroundPattern28;
