import { CloudLightning, Compass, Gift, Shield, Star, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature68Props {
  className?: string;
}

const Feature68 = ({ className }: Feature68Props) => {
  const features = [
    {
      icon: <Star />,
      title: "Feature 1",
      description: "Brief description of feature 1",
    },
    {
      icon: <Zap />,
      title: "Feature 2",
      description: "Brief description of feature 2",
    },
    {
      icon: <Shield />,
      title: "Feature 3",
      description: "Brief description of feature 3",
    },
    {
      icon: <Compass />,
      title: "Feature 4",
      description: "Brief description of feature 4",
    },
    {
      icon: <CloudLightning />,
      title: "Feature 5",
      description: "Brief description of feature 5",
    },
    {
      icon: <Gift />,
      title: "Feature 6",
      description: "Brief description of feature 6",
    },
  ];

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            Features
          </h2>
          <p className="max-w-prose text-base text-muted-foreground md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card/50 px-6 py-8 md:px-10 md:py-12">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              return (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-primary/10 p-2">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Feature68 };
