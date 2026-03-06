"use client";

import { Database, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const DATA: DataItem[] = [
  {
    id: "feature-1",
    title: "Innovative Solutions",
    description: "Discover cutting-edge tools to revolutionize your workflow.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    icon: <Sparkles className="h-6 w-6 text-white" />,
  },
  {
    id: "feature-2",
    title: "Data Management",
    description: "Efficiently organize and manage your data with ease.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
    icon: <Database className="h-6 w-6 text-white" />,
  },
  {
    id: "feature-3",
    title: "Advanced Security",
    description: "Protect your assets with state-of-the-art security features.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
    icon: <LockKeyhole className="h-6 w-6 text-white" />,
  },
];

interface Feature186Props {
  className?: string;
}

const Feature186 = ({ className }: Feature186Props) => {
  const [selection, setSelection] = useState(DATA[0].id);

  return (
    <section className={cn("relative py-16 md:py-32", className)}>
      <div
        className="absolute top-0 right-0 left-0 z-0 h-[800px] w-screen [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] bg-repeat opacity-30"
        style={{
          backgroundImage: "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/architect.svg')",
          backgroundSize: "60px",
        }}
      />
      <div className="relative z-10 container">
        <div>
          <h2 className="text-4xl font-medium sm:text-5xl lg:text-6xl">
            Our Key Features
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Unlock the full potential of your projects with our powerful and
            intuitive features.
          </p>

          {/* Tabs */}
          <div className="mt-4 lg:mt-8">
            <Tabs value={selection} onValueChange={setSelection}>
              <div className="relative">
                <div className="overflow-auto">
                  {/* TabsTrigger Container Aligned Left */}
                  <div className="mb-6 flex min-w-fit flex-col items-start lg:mb-8">
                    <TabsList className="gap-4 bg-transparent">
                      {DATA.map((feature) => (
                        <TabsTrigger key={feature.id} value={feature.id}>
                          {feature.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--background))_0%,transparent_10%,transparent_90%,hsl(var(--background))_100%)] md:hidden" />
                </div>
              </div>

              {/* TabsContent */}
              <div className="relative w-full overflow-hidden">
                {DATA.map((feature) => (
                  <TabsContent
                    key={feature.id}
                    value={feature.id}
                    className="relative z-20"
                  >
                    <div className="aspect-3/2 w-full rounded-lg bg-accent p-6 md:p-14 md:px-24">
                      <div className="mx-auto max-w-full md:mx-0 md:max-w-md">
                        <div className="flex size-12 items-center justify-center rounded-full bg-black">
                          {feature.icon}
                        </div>
                        <div className="my-4 md:my-8">
                          <h1 className="text-lg font-bold sm:text-xl lg:text-2xl">
                            {feature.title}
                          </h1>
                          <span className="text-base text-muted-foreground sm:text-lg lg:text-xl">
                            {feature.description}
                          </span>
                        </div>
                      </div>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="mt-4 h-full w-full rounded-lg object-cover object-center md:mt-0"
                      />
                    </div>
                  </TabsContent>
                ))}
              </div>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center py-3 md:hidden">
                {DATA.map((feature) => (
                  <Button
                    key={feature.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelection(feature.id);
                    }}
                  >
                    <div
                      className={`size-2 rounded-full ${
                        feature.id === selection ? "bg-primary" : "bg-input"
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature186 };
