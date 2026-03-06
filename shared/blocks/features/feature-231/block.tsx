import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Modern",
    description:
      "Built with the latest web technologies for speed and performance",
  },
  {
    title: "Responsive",
    description: "Designed to work perfectly on any device and screen size",
  },
  {
    title: "Customizable",
    description: "Easily adapt to your brand with powerful theming options",
  },
  {
    title: "Accessible",
    description: "Created with accessibility in mind to support all users",
  },
];

interface Feature231Props {
  className?: string;
}

const Feature231 = ({ className }: Feature231Props) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background py-24 md:py-32",
        className,
      )}
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-8">
            <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
              <span className="mb-2 block text-muted-foreground">
                Blocks built with
              </span>
              <span className="mb-2 block text-primary">Shadcn</span>
              <span className="block">& Tailwind</span>
            </h1>

            <hr className="w-24 border-t-2 border-border" />

            <p className="max-w-md text-lg text-muted-foreground">
              Create stunning web experiences with our premium components.
              Modern, responsive, and beautifully crafted for your next project.
            </p>

            <div className="flex space-x-4">
              <Button size="lg">
                Get Started
                <ArrowRight />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature231 };
