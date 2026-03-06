import { cn } from "@/lib/utils";

import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";

interface BackgroundPattern11Props {
  className?: string;
}

const BackgroundPattern11 = ({ className }: BackgroundPattern11Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Diagonal Cross Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 32px, var(--muted) 32px, var(--muted) 33px),
            repeating-linear-gradient(135deg, transparent, transparent 32px, var(--muted) 32px, var(--muted) 33px)
          `,
        }}
      />
      <PatternPlaceholder />
    </section>
  );
};

export { BackgroundPattern11 };

export default BackgroundPattern11;
