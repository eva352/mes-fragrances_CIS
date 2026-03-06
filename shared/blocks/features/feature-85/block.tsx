import {
  BarChartHorizontal,
  BatteryCharging,
  CircleHelp,
  Layers,
  WandSparkles,
  ZoomIn,
} from "lucide-react";

import { cn } from "@/lib/utils";

const reasons = [
  {
    title: "Quality",
    description:
      "Our app prioritizes high-quality performance, ensuring a smooth and reliable experience for all users.",
    icon: <ZoomIn className="size-7 shrink-0 md:size-8" strokeWidth={1.5} />,
  },
  {
    title: "Experience",
    description:
      "With years of expertise, we offer a polished platform designed for your success and satisfaction.",
    icon: (
      <BarChartHorizontal
        className="size-7 shrink-0 md:size-8"
        strokeWidth={1.5}
      />
    ),
  },
  {
    title: "Support",
    description:
      "Our dedicated support team is always available to help you get the most out of the platform.",
    icon: (
      <CircleHelp className="size-7 shrink-0 md:size-8" strokeWidth={1.5} />
    ),
  },
  {
    title: "Innovation",
    description:
      "Constantly evolving with the latest technology, we stay ahead of the curve to keep you competitive.",
    icon: (
      <WandSparkles className="size-7 shrink-0 md:size-8" strokeWidth={1.5} />
    ),
  },
  {
    title: "Results",
    description:
      "We focus on delivering measurable results, helping your team meet goals faster and more efficiently.",
    icon: <Layers className="size-7 shrink-0 md:size-8" strokeWidth={1.5} />,
  },
  {
    title: "Efficiency",
    description:
      "Our platform is built for speed and efficiency, optimizing every task for peak performance.",
    icon: (
      <BatteryCharging
        className="size-7 shrink-0 md:size-8"
        strokeWidth={1.5}
      />
    ),
  },
];

interface Feature85Props {
  className?: string;
}

const Feature85 = ({ className }: Feature85Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-t">
        <div>
          <div className="relative container overflow-hidden border-x border-muted-foreground/20 py-32">
            <div className="isolate mx-auto flex max-w-3xl flex-col gap-20">
              <div className="bg absolute -top-1 -left-[1px] -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_100%_120%_at_50%_50%,transparent_20%,#000_100%)] bg-[size:64px_64px] opacity-20 [clip-path:inset(0px_0px_50%_0px)]"></div>
              <h2 className="text-center text-3xl md:text-5xl">
                A Project Management App You&apos;ll Love Using
              </h2>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-aspect-video-1.svg"
                alt="placeholder"
                className="max-h-64 w-full rounded-xl object-cover"
              />
              <p className="text-center text-xl md:text-3xl">
                It combines intuitive design with powerful features to help your
                team thrive.
              </p>
            </div>
          </div>
          <div className="border-t border-muted-foreground/20">
            <div className="container border-x border-muted-foreground/20 px-0">
              <div className="grid gap-px bg-muted-foreground/20 md:grid-cols-2 lg:grid-cols-3">
                {reasons.map((reason, i) => (
                  <div
                    key={i}
                    className="flex gap-4 bg-muted px-6 pt-8 pb-8 md:flex-col md:gap-0 md:px-8 md:pt-16"
                  >
                    {reason.icon}
                    <div>
                      <h3 className="mb-2 md:mt-6 md:text-lg">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="border-x border-t border-muted-foreground/20">
              <div className="container border-x border-muted-foreground/20 py-16"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature85 };
