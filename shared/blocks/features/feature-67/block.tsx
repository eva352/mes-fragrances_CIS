import {
  Bolt,
  Building,
  Cloud,
  MessagesSquare,
  Rocket,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    id: "feature-1",
    title: "Feature 1",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: Cloud,
  },
  {
    id: "feature-2",
    title: "Feature 2",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: Star,
  },
  {
    id: "feature-3",
    title: "Feature 3",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: Bolt,
  },
  {
    id: "feature-4",
    title: "Feature 4",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: MessagesSquare,
  },
  {
    id: "feature-5",
    title: "Feature 5",
    description: "Nam vitae molestie arcu. Quisque eu libero orci.",
    icon: Rocket,
  },
  {
    id: "feature-6",
    title: "Feature 6",
    description:
      "Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur.",
    icon: Building,
  },
];

interface Feature67Props {
  className?: string;
}

const Feature67 = ({ className }: Feature67Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-start gap-8 lg:gap-12 lg:px-16 xl:flex-row xl:gap-32">
        <h3 className="text-3xl font-semibold md:shrink-0 md:text-4xl lg:max-w-1/3 lg:max-w-3xl lg:text-5xl">
          Feature group
        </h3>
        <div className="grid w-full gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex rounded-lg border border-border bg-accent p-6 md:p-8"
            >
              <feature.icon className="mr-3 size-5 shrink-0 lg:mr-6 lg:size-6" />
              <div>
                <div className="mb-3 h-5 text-sm font-semibold text-accent-foreground md:text-base">
                  {feature.title}
                </div>
                <div className="text-sm font-medium text-muted-foreground md:text-base">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature67 };
