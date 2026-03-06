import type { LucideIcon } from "lucide-react";
import { Blend, ChartNoAxesColumn, CircleDot, Diamond } from "lucide-react";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FeatureContent = {
  title: string;
  description: string;
  image: string;
  className?: string;
};

const FEATURES: Array<{
  title: string;
  description: string;
  content: FeatureContent;
  icon: LucideIcon;
}> = [
  {
    title: "Tailored workflows",
    description: "Track progress across custom issue flows for your team.",
    content: {
      title: "Track progress across custom issue flows for your team.",
      description: `Simple, robust, and blazingly fast. Mainline is designed with developer ergonomics in mind. It's the first issue tracker your team will actually enjoy using.`,
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    },
    icon: CircleDot,
  },
  {
    title: "Cross-team projects",
    description: "Collaborate across teams and departments.",
    content: {
      title: "Collaborate across teams and departments.",
      description:
        "Simple, robust, and blazingly fast. Mainline is designed with developer ergonomics in mind. It's the first issue tracker your team will actually enjoy using.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    },
    icon: Blend,
  },
  {
    title: "Milestones",
    description: "Break projects down into concrete phases.",
    content: {
      title: "Break projects down into concrete phases.",
      description:
        "Simple, robust, and blazingly fast. Mainline is designed with developer ergonomics in mind. It's the first issue tracker your team will actually enjoy using.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    },
    icon: Diamond,
  },
  {
    title: "Progress insights",
    description: "Track scope, velocity, and progress over time.",
    content: {
      title: "Track scope, velocity, and progress over time.",
      description:
        "Simple, robust, and blazingly fast. Mainline is designed with developer ergonomics in mind. It's the first issue tracker your team will actually enjoy using.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    },
    icon: ChartNoAxesColumn,
  },
];

interface Feature175Props {
  className?: string;
}

const Feature175 = ({ className }: Feature175Props) => {
  return (
    <section className={cn("py-32 dark:bg-[#2F332E]", className)}>
      <div className="container">
        <div className="flex gap-3 max-md:flex-col">
          <h2 className="flex-1 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Streamline your resource allocation and execution
          </h2>
          <p className="flex-1 self-end text-lg font-medium text-muted-foreground">
            Streamline is built on the habits that make the best product teams
            successful: staying focused, moving quickly, and always aiming for
            high-quality work.
          </p>
        </div>

        <Tabs
          defaultValue={FEATURES[0].title}
          orientation="vertical"
          className="border-muted2 mt-8 grid grid-cols-1 gap-4 rounded-xl border p-4 md:mt-12 lg:mt-20 lg:grid-cols-4"
        >
          <TabsList className="flex h-auto flex-col justify-start rounded-xl bg-muted p-1.5">
            {FEATURES.map((feature) => (
              <TabsTrigger
                key={feature.title}
                value={feature.title}
                className="w-full justify-start rounded-lg px-4 py-3 text-start whitespace-normal text-gray-700 transition-colors duration-300 data-[state=active]:text-black data-[state=active]:shadow-xl lg:px-6 lg:py-4 dark:text-gray-300 dark:data-[state=active]:text-white"
              >
                <div>
                  <feature.icon className="size-7 md:size-8 lg:size-9" />
                  <h3 className="mt-3 font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {FEATURES.map((feature) => (
            <TabsContent
              className={cn(
                "col-span-1 m-0 overflow-hidden rounded-xl bg-background lg:col-span-3",
                feature.content.className,
              )}
              key={feature.title}
              value={feature.title}
            >
              <div className="max-w-2xl pb-4 text-balance">
                <h4 className="inline font-semibold">
                  {feature.content.title}{" "}
                </h4>
                <span className="mt-2 font-medium text-pretty text-muted-foreground">
                  {feature.content.description}
                </span>
              </div>
              <img
                src={feature.content.image}
                alt={feature.title}
                className="h-[420px] w-full rounded-lg object-cover lg:h-[512px] lg:flex-1"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export { Feature175 };
