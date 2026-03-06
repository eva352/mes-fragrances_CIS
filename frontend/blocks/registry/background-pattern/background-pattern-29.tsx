import { cn } from "@/lib/utils";

import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";

interface BackgroundPattern29Props {
  className?: string;
}

const BackgroundPattern29 = ({ className }: BackgroundPattern29Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Top Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 100px, oklch(from var(--primary) calc(l * 0.85) calc(c * 0.8) h / 0.2), oklch(from var(--primary) calc(l * 0.7) calc(c * 0.6) h / 0.1) 60%, transparent)`,
        }}
      />
      <PatternPlaceholder />
    </section>
  );
};

export { BackgroundPattern29 };

export default BackgroundPattern29;
