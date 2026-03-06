"use client";
import { ChevronUp, Flag, Pyramid, Users, Workflow, Zap } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FEATURES = [
  {
    title: "Tailored workflows",
    description: "Custom issue flows",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    icon: <Workflow />,
  },
  {
    title: "Cross-team projects",
    description: "Team collaboration",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    icon: <Users />,
  },
  {
    title: "Milestones",
    description: "Concrete phases",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    icon: <Flag />,
  },
];

interface Feature184Props {
  className?: string;
}

const Feature184 = ({ className }: Feature184Props) => {
  const [activeTab, setActiveTab] = useState(FEATURES[0].title);

  return (
    <section className={cn("py-20 md:py-32", className)}>
      <div className="container mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Center the heading */}
        <div className="mb-12 max-w-3xl text-center">
          <h2 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Explore our features
          </h2>
        </div>

        {/* Content Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative h-[300px] overflow-hidden rounded-xl sm:h-[420px]">
            <img
              src={FEATURES.find((f) => f.title === activeTab)?.image}
              alt={activeTab}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative flex flex-col justify-between">
            <Tabs
              defaultValue={FEATURES[0].title}
              onValueChange={(value) => setActiveTab(value)}
              className="h-full w-full"
            >
              <TabsList className="flex h-full flex-col gap-4 rounded-xl border-none bg-transparent p-0">
                {FEATURES.map((feature) => (
                  <TabsTrigger
                    key={feature.title}
                    value={feature.title}
                    className={cn(
                      "group flex h-full w-full flex-col items-start rounded-xl p-6 text-left transition-all",
                      "border border-border/50 bg-card hover:border-primary/50",
                      "data-[state=active]:border-primary data-[state=active]:bg-primary/95 data-[state=active]:shadow-lg",
                      "relative",
                      "data-[state=active]:scale-[1.02]",
                      "data-[state=active]:z-20",
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div
                          className={cn(
                            "rounded-lg bg-muted p-4 transition-colors",
                            "group-data-[state=active]:bg-background",
                          )}
                        >
                          {feature.icon}
                        </div>
                        <div className="flex flex-col gap-2">
                          <h3
                            className={cn(
                              "text-xl font-medium",
                              "group-data-[state=active]:text-primary-foreground",
                            )}
                          >
                            {feature.title}
                          </h3>
                          <span
                            className={cn(
                              "text-sm text-muted-foreground transition-colors",
                              "group-data-[state=active]:text-primary-foreground/90",
                            )}
                          >
                            {feature.description}
                          </span>
                        </div>
                      </div>
                      <div className="pl-8">
                        <ChevronUp
                          className={cn(
                            "size-5 text-muted-foreground transition-all duration-300",
                            "group-data-[state=active]:rotate-180 group-data-[state=active]:text-primary-foreground",
                          )}
                        />
                      </div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Buttons row */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="w-full sm:w-auto">
            <Zap className="mr-2 size-4" /> Get Started
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Pyramid className="mr-2 size-4" /> Register Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Feature184 };
