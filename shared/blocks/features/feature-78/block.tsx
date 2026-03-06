"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  {
    id: "feature-1",
    tabLabel: "Feature 1",
    title: "Feature 1",
    description:
      "Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur, id interdum ante congue.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "feature-2",
    tabLabel: "Feature 2",
    title: "Feature 2",
    description:
      "Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: "feature-3",
    tabLabel: "Feature 3",
    title: "Feature 3",
    description:
      "Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur, id interdum ante congue.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
];

interface Feature78Props {
  className?: string;
}

const Feature78 = ({ className }: Feature78Props) => {
  const [selection, setSelection] = useState(features[0].id);
  return (
    <section className={cn("py-32", className)}>
      <div className="flex flex-col">
        <div className="container">
          <div className="lg:max-w-3xl">
            <h2 className="mb-2 text-xl font-semibold md:text-4xl">
              Powerful Features
            </h2>
            <a
              href="#"
              className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
            >
              Book a demo{" "}
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <div>
          <Tabs value={selection} onValueChange={setSelection}>
            <div className="relative mt-6">
              <div className="overflow-auto">
                <div className="container min-w-fit">
                  <TabsList>
                    {features.map((feature) => (
                      <TabsTrigger key={feature.id} value={feature.id}>
                        {feature.tabLabel}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-background)_0%,transparent_10%,transparent_90%,var(--color-background)_100%)] md:hidden" />
              </div>
            </div>
            <div className="container">
              {features.map((feature) => (
                <TabsContent key={feature.id} value={feature.id}>
                  <div className="mt-12 flex flex-col md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
                    <div className="overflow-clip rounded-3xl md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                      <img
                        src={feature.image}
                        alt={feature.tabLabel}
                        className="aspect-16/9 h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-col justify-center py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                      <h3 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground lg:text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature78 };
