import { cn } from "@/lib/utils";

import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";

interface BackgroundPattern4Props {
  className?: string;
}

const BackgroundPattern4 = ({ className }: BackgroundPattern4Props) => {
  return (
    <section className={cn("relative min-h-screen w-full", className)}>
      <PatternPlaceholder />
      {/* Background Pattern */}
      {/* Diagonal Fade Grid Left Pattern */}
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,_var(--muted)_1px,_transparent_1px),linear-gradient(to_bottom,_var(--muted)_1px,_transparent_1px)] bg-[length:32px_32px]"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
        }}
      />
    </section>
  );
};

export { BackgroundPattern4 };

export default BackgroundPattern4;
