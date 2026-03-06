import { Bell, Bug, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature173Props {
  className?: string;
}

const Feature173 = ({ className }: Feature173Props) => {
  const ITEMS = [
    {
      value: "100%",
      label: "More bugs",
      icon: Bug,
    },
    {
      value: "121%",
      label: "More notifications",
      icon: Bell,
    },
    {
      value: "2x",
      label: "More chaotic",
      icon: Sparkles,
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex gap-3 max-md:flex-col">
          <h2 className="flex-1 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Tailor made for post-modern product teams
          </h2>
          <p className="flex-1 self-end text-lg font-medium text-muted-foreground">
            Streamline is built on the habits that make the best product teams
            successful: staying focused, moving quickly, and always aiming for
            high-quality work.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:mt-12 lg:mt-20 lg:grid-cols-3">
          {ITEMS.map((metric, i) => (
            <div
              key={i}
              className="relative flex [aspect-ratio:3.5/2.6] flex-col justify-between overflow-hidden rounded-[24px] bg-linear-to-b from-muted to-[#D6E3DF] md:[aspect-ratio:3.8/5] dark:to-[#2A3633]"
            >
              <div className="p-8 pb-2">
                <metric.icon className="size-10 fill-primary" />
              </div>
              <div className="p-6">
                <div className="text-6xl font-semibold tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xl font-semibold tracking-tight">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-end text-sm text-muted-foreground">
          *average increase in comparison to Jira
        </div>
      </div>
    </section>
  );
};

export { Feature173 };
