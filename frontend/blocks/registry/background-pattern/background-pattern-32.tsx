import { cn } from "@/lib/utils";

import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";

interface BackgroundPattern32Props {
  className?: string;
}

const BackgroundPattern32 = ({ className }: BackgroundPattern32Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Right Fade Circuit Board Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(90deg, var(--muted) 1px, transparent 1px),
        linear-gradient(180deg, var(--muted) 1px, transparent 1px),
        linear-gradient(90deg, var(--muted) 1px, transparent 1px),
        linear-gradient(180deg, var(--muted) 1px, transparent 1px)
      `,
          backgroundSize: "50px 50px, 50px 50px, 10px 10px, 10px 10px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
        }}
      />

      <PatternPlaceholder />
    </section>
  );
};

export { BackgroundPattern32 };

export default BackgroundPattern32;
