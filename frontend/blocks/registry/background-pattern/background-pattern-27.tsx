import { cn } from "@/lib/utils";

import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";

interface BackgroundPattern27Props {
  className?: string;
}

const BackgroundPattern27 = ({ className }: BackgroundPattern27Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Gradinet Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(from var(--primary) calc(l - 0.1) c h / 0.20), transparent 70%)",
        }}
      />
      <PatternPlaceholder />
    </section>
  );
};

export { BackgroundPattern27 };

export default BackgroundPattern27;
