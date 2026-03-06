import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta7Props {
  className?: string;
}

const Cta7 = ({ className }: Cta7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative rounded-xl border border-border bg-accent px-6 py-8 2xl:grid 2xl:grid-cols-2 2xl:px-14 2xl:py-10">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <svg
              fill="none"
              width={404}
              height={384}
              viewBox="0 0 404 384"
              aria-hidden="true"
              className="absolute top-full left-full -translate-x-2/3 -translate-y-1/2 rotate-[60deg]"
            >
              <defs>
                <pattern
                  x={0}
                  y={0}
                  id="dots"
                  width={16}
                  height={16}
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx={2}
                    cy={2}
                    r={2}
                    fill="currentColor"
                    className="text-border"
                  />
                </pattern>
              </defs>
              <rect fill="url(#dots)" width={400} height={400} />
            </svg>
          </div>
          <div className="relative mb-12 2xl:mb-0">
            <h3 className="mb-6 text-2xl font-semibold md:mb-8 md:text-4xl lg:mb-12">
              Call to Action
            </h3>
            <p className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
              Experience the Difference
            </p>
            <ul className="grid gap-x-8 gap-y-4 text-muted-foreground md:grid-cols-2">
              <li className="flex items-center gap-2">
                <Check className="size-5 text-foreground" />
                Easy Integration
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-5 text-foreground" />
                24/7 Support
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-5 text-foreground" />
                Customizable Design
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-5 text-foreground" />
                Regular Updates
              </li>
            </ul>
          </div>
          <div className="relative flex items-end 2xl:justify-end">
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta7 };
