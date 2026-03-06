import { cn } from "@/lib/utils";

import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";

interface BackgroundPattern13Props {
  className?: string;
}

const BackgroundPattern13 = ({ className }: BackgroundPattern13Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Left Fade Diagonal Cross Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 32px, var(--muted) 32px, var(--muted) 33px),
            repeating-linear-gradient(135deg, transparent, transparent 32px, var(--muted) 32px, var(--muted) 33px)
          `,
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />
      <PatternPlaceholder />
    </section>
  );
};

export { BackgroundPattern13 };

export default BackgroundPattern13;
