import {
  CalendarClock,
  ChartNoAxesCombined,
  PocketKnife,
  SquarePen,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FEATURES_DATA = [
  {
    title: "Smart Task Management",
    description:
      "Create, prioritize, and delegate tasks effortlessly. AI helps you identify what matters most with smart recommendations and automated workflows.",
    icon: SquarePen,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  },
  {
    title: "Automated Scheduling",
    description:
      "Let AI find the best time slots for meetings, reminders, and tasks based on your calendar and working habits. Stay organized without the hassle.",
    icon: CalendarClock,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
  },
  {
    title: "Personalized Insights",
    description:
      "Track your productivity with AI-powered insights. Get weekly summaries and actionable tips to improve your workflow and manage workloads better.",
    icon: ChartNoAxesCombined,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
  },
];
interface Feature167Props {
  className?: string;
}

const Feature167 = ({ className }: Feature167Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <PocketKnife className="size-4" />
            <span>Features</span>
          </Badge>

          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Smart productivity with AI
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Unlock smarter productivity with features that help you manage
            tasks, time, and focus—seamlessly.
          </p>
        </div>
      </div>

      <div className="container border-x px-0">
        <Tabs
          defaultValue={FEATURES_DATA[0].title}
          className="flex flex-col items-stretch gap-0 divide-y rounded-none lg:flex-row lg:divide-x lg:divide-y-0"
        >
          <TabsList className="flex h-auto w-full flex-col rounded-none border-b bg-transparent p-0 lg:w-1/3 lg:border-r lg:border-b-0">
            {FEATURES_DATA.map((item, index, array) => (
              <TabsTrigger
                key={item.title}
                value={item.title}
                className={`group relative flex w-full rounded-none px-4 py-4 text-start whitespace-normal data-[state=active]:shadow-none lg:px-6 lg:py-5 ${
                  index !== array.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="absolute bottom-[-1px] left-0 z-10 h-[2px] w-0 bg-linear-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-1/2" />
                <div className="flex w-full flex-col">
                  <div className="flex items-center gap-1.5">
                    <item.icon className="size-4" />
                    <h3 className="text-lg tracking-[-0.36px]">{item.title}</h3>
                  </div>
                  <p className="mt-2.5 text-sm tracking-[-0.32px] text-muted-foreground lg:text-base">
                    {item.description}
                  </p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative flex-1">
            <div className="h-[300px] lg:h-[400px]">
              {FEATURES_DATA.map((item, index) => (
                <TabsContent
                  key={index}
                  value={item.title}
                  className="absolute inset-0 m-0 rounded-none p-6 transition-all duration-500 data-[state=inactive]:pointer-events-none data-[state=inactive]:opacity-0 lg:p-12"
                >
                  <div className="flex h-full items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="h-full w-full bg-muted object-contain p-6 lg:p-12 dark:invert"
                    />
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export { Feature167 };
