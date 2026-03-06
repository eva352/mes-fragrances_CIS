import { Check, ChevronRight } from "lucide-react";
import { type SVGProps, useId } from "react";

import { Button } from "@/components/ui/button";

export function Feature195() {
  return (
    <section className="py-32 text-background md:container md:max-w-5xl">
      <div className="relative isolate container grid items-center overflow-hidden bg-linear-to-r from-primary to-primary/75 py-8 max-lg:gap-10 max-md:gap-6 md:rounded-3xl lg:grid-cols-2 lg:px-8">
        <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_left,black_50%,transparent_100%)]">
          <PlusSigns className="h-full w-full text-background/[0.05]" />
        </div>
        <div className="border-background/20 lg:border-e lg:py-16 lg:pr-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Launch today
          </h2>
          <p className="mt-3 text-sm font-medium text-background/70">
            In the past, new financial companies had to rely on expensive
            middleware that linked them to outdated sponsor bank systems,
            restricting their potential. Our API solves this today.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 max-md:hidden">
            <Button size="lg" variant="secondary" className="group" asChild>
              <a href="/signup">
                Start for free
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button size="lg" className="group bg-secondary-foreground" asChild>
              <a href="/">
                Get a demo
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-6 lg:py-10 lg:pl-20">
          <div>
            <h3 className="text-3xl font-semibold text-background md:text-4xl lg:text-5xl">
              $29.99
            </h3>
            <p className="mt-1 text-xl font-medium text-background/70">
              per user per month
            </p>
          </div>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex items-center gap-2">
              <Check className="size-4" />
              All free plan features and...
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4" />
              Mainline AI
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4" />
              Unlimited teams
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-4 md:hidden">
            <Button size="lg" variant="secondary" className="group w-full">
              <a href="/signup" className="flex items-center gap-2">
                Start building for free
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button size="lg" className="group w-full bg-secondary-foreground">
              <a href="/" className="flex items-center gap-2">
                Get a demo
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PlusSignsProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const PlusSigns = ({ className, ...props }: PlusSignsProps) => {
  const GAP = 16;
  const STROKE_WIDTH = 1;
  const PLUS_SIZE = 6;
  const id = useId();
  const patternId = `plus-pattern-${id}`;

  return (
    <svg width={GAP * 2} height={GAP * 2} className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};
