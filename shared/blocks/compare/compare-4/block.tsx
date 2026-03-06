import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface DataItem {
  title: string;
  brick: { value: string; unit?: string; desc: string };
  ghost: { value: string; unit?: string; desc: string };
}

interface Compare4Props {
  className?: string;
}

const Compare4 = ({ className }: Compare4Props) => {
  const DATA: DataItem[] = [
    {
      title: "Server Requirements",
      brick: {
        value: "2500",
        unit: "GB",
        desc: "High-performance dedicated servers",
      },
      ghost: {
        value: "250",
        unit: "GB",
        desc: "Cloud-optimized infrastructure",
      },
    },
    {
      title: "Team Size (~)",
      brick: { value: "20", desc: "Full in-house development team" },
      ghost: { value: "5", desc: "Core team with automated workflows" },
    },
    {
      title: "Development Time",
      brick: { value: "48", unit: "w", desc: "Traditional development cycle" },
      ghost: { value: "8", unit: "w", desc: "Rapid deployment framework" },
    },
    {
      title: "Initial Setup",
      brick: {
        value: "$1.2",
        unit: "M",
        desc: "Enterprise infrastructure costs",
      },
      ghost: { value: "$40", unit: "k*", desc: "Pay-as-you-grow model" },
    },
    {
      title: "ROI Timeline",
      brick: { value: "4", unit: "y", desc: "Standard enterprise timeline" },
      ghost: { value: "8", unit: "m", desc: "Accelerated market entry" },
    },
  ];

  return (
    <section className={cn("bg-muted/30 py-32", className)}>
      <div className="container grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 lg:grid-cols-12">
        {/* Header */}
        <div className="col-span-4 mb-8 max-w-3xl md:col-span-8 md:mb-12 lg:col-span-10 lg:col-start-2 lg:mb-16">
          <h2 className="mb-4 text-center text-3xl font-bold sm:text-left md:text-4xl lg:text-6xl">
            Compare Cloud vs On-site Infrastructure
          </h2>
        </div>

        {/* Column Headers */}
        <div className="col-span-4 px-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
          <div className="grid grid-cols-4 items-center gap-4 md:grid-cols-8">
            <div className="col-span-4 md:col-span-2"></div>
            <div className="col-span-2 ml-0 md:col-span-3 md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
              <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase md:text-sm">
                Traditional
              </h4>
            </div>
            <div className="col-span-2 ml-0 md:col-span-3 md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
              <h4 className="text-xs font-bold tracking-wider uppercase md:text-sm">
                Cloud-Native
              </h4>
            </div>
          </div>
        </div>

        {/* Comparison rows wrapper */}
        <div className="col-span-4 rounded-xl bg-background shadow-sm md:col-span-8 lg:col-span-10 lg:col-start-2">
          {DATA.map((row, index) => (
            <div
              key={index}
              className="group border-t px-4 transition-colors first:rounded-t-xl first:border-t-0 last:rounded-b-xl hover:bg-muted/50"
            >
              <div className="grid grid-cols-4 items-start gap-4 py-6 md:grid-cols-8 md:py-8">
                <h3 className="col-span-4 mt-2 text-base font-bold md:col-span-2 md:text-lg">
                  {row.title}
                </h3>

                {/* Traditional Stat */}
                <div className="col-span-2 flex flex-col md:col-span-3">
                  <div className="ml-0 transition-colors group-hover:text-foreground md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
                    <p className="mb-1 flex items-baseline text-2xl font-bold text-foreground md:mb-2 md:text-5xl">
                      {row.brick.value}
                      {row.brick.unit && (
                        <sup className="ml-0.5 text-xs text-foreground md:text-sm">
                          {row.brick.unit}
                        </sup>
                      )}
                    </p>
                    <p className="text-xs leading-tight text-muted-foreground md:text-sm md:leading-normal">
                      {row.brick.desc}
                    </p>
                  </div>
                </div>

                {/* Cloud-Native Stat */}
                <div className="col-span-2 flex flex-col md:col-span-3">
                  <div className="ml-0 transition-colors group-hover:text-accent-foreground md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
                    <p className="mb-1 flex items-baseline text-2xl font-bold text-foreground md:mb-2 md:text-5xl">
                      {row.ghost.value}
                      {row.ghost.unit && (
                        <sup className="ml-0.5 text-xs text-foreground md:text-sm">
                          {row.ghost.unit}
                        </sup>
                      )}
                    </p>
                    <p className="text-xs leading-tight text-muted-foreground md:text-sm md:leading-normal">
                      {row.ghost.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground md:text-sm">
                * Varies based on specific requirements and complexity
              </p>
              <p className="text-xs text-muted-foreground md:text-sm">
                ^ Deployment time may vary depending on integration requirements
              </p>
              <p className="text-xs text-muted-foreground md:text-sm">
                # Additional costs may apply for premium features
              </p>
            </div>
            <div className="flex justify-end">
              <Button className="rounded-full px-8 transition-transform hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compare4 };
