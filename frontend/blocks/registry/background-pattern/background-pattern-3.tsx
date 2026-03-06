import { cn } from "@/lib/utils";

import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";

interface BackgroundPattern3Props {
  className?: string;
}

const BackgroundPattern3 = ({ className }: BackgroundPattern3Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Basic Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,_var(--muted)_1px,_transparent_1px),linear-gradient(to_bottom,_var(--muted)_1px,_transparent_1px)] bg-[length:40px_40px]" />
      <PatternPlaceholder />
    </section>
  );
};

export { BackgroundPattern3 };

export default BackgroundPattern3;
