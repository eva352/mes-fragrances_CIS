import { CircleHelp, Eye, Lightbulb, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DATA = [
  {
    title: "Unified Scheduling",
    description:
      "Keep all your appointments and events in sync with seamless cross-platform calendar connectivity.",
    icon: CircleHelp,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Insightful Performance",
    description:
      "Get clear, real-time analytics tracking your progress, key milestones, focus hours, and completed tasks.",
    icon: Volume2,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Effortless Tool Integrations",
    description:
      "Link your favorite apps and services to streamline work without switching between platforms.",
    icon: Lightbulb,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
];

interface Feature169Props {
  className?: string;
}

const Feature169 = ({ className }: Feature169Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 py-4 max-md:mx-0 max-md:max-w-none md:mx-8 md:mx-auto md:border-x lg:py-8">
          <Badge variant="outline">
            <Eye className="size-4" />
            <span>Optimize</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Optimize every aspect of your day
          </h2>
          <p className="max-w-[600px] text-muted-foreground">
            Achieve seamless productivity with intelligent scheduling,
            insightful analytics, and effortless integrations.
          </p>
        </div>
      </div>
      <div className="container overflow-hidden px-0 max-md:mx-0 max-md:max-w-none md:mx-8 md:mx-auto md:border-x">
        <Tabs defaultValue={DATA[0].title}>
          <TabsList className="relative grid gap-px border-b bg-border md:grid-cols-3">
            {DATA.map((item) => (
              <TabsTrigger
                key={item.title}
                value={item.title}
                className="group relative bg-background p-6 text-left data-[state=inactive]:opacity-60 lg:p-8"
              >
                <div className="flex items-center gap-2 text-lg font-medium tracking-tight lg:text-xl">
                  <span className="grid size-6 place-items-center rounded-full bg-muted">
                    <item.icon className="size-4" />
                  </span>
                  {item.title}
                </div>
                <p className="mt-2.5 text-sm text-muted-foreground lg:text-base">
                  {item.description}
                </p>
                <span className="absolute -top-1 -left-1 hidden size-2 rounded-full border border-border bg-background md:block" />
                <span className="absolute -bottom-1 -left-1 z-10 hidden size-2 rounded-full border border-border bg-background md:block" />
                <div className="absolute -bottom-px left-0 h-px w-0 bg-linear-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-full" />
              </TabsTrigger>
            ))}
            <span className="absolute -right-1 -bottom-1 hidden size-2 rounded-full border border-border bg-background lg:block" />
            <span className="absolute -top-1 -right-1 size-2 rounded-full border border-border bg-background" />
          </TabsList>
          {DATA.map((item) => (
            <TabsContent
              key={item.title}
              value={item.title}
              className="p-6 lg:p-10"
            >
              <img
                src={item.image}
                alt={item.title}
                className="aspect-video h-full w-full rounded-sm border border-border object-cover"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container size-full md:border-x"></div>
      </div>
    </section>
  );
};

export { Feature169 };
