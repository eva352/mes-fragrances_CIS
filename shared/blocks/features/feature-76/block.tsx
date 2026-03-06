import { Blocks, BookOpen, Palette, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    id: "feature-1",
    title: "Component Library",
    description:
      "Access over 50 beautifully designed components built with Tailwind CSS. Each component is fully customizable and ready for production.",
    icon: <Blocks className="size-10" strokeWidth={1.5} />,
  },
  {
    id: "feature-2",
    title: "Themeable",
    description:
      "Customize your design system with powerful theming. Create light and dark modes or match your brand colors with simple CSS variables.",
    icon: <Palette className="size-10" strokeWidth={1.5} />,
  },
  {
    id: "feature-3",
    title: "Performance",
    description:
      "Built with performance in mind. Minimal JavaScript and optimized CSS ensures your UI stays fast no matter how complex your design.",
    icon: <Zap className="size-10" strokeWidth={1.5} />,
  },
  {
    id: "feature-4",
    title: "Documentation",
    description:
      "Comprehensive documentation with examples and usage guidelines for every component. Get up and running quickly with our detailed guides.",
    icon: <BookOpen className="size-10" strokeWidth={1.5} />,
  },
];

interface Feature76Props {
  className?: string;
}

const Feature76 = ({ className }: Feature76Props) => {
  return (
    <section className={cn("relative pt-32", className)}>
      <div className="relative z-10 container flex flex-col space-y-14">
        <h2 className="px-6 text-3xl font-semibold md:mb-4 md:text-5xl lg:mb-6 lg:max-w-md lg:px-10">
          UI Library Features
        </h2>
        <div className="relative mt-6 md:mt-10">
          <div className="absolute top-0 right-0 left-0 h-px bg-border" />
          <div className="grid divide-border md:grid-cols-4 md:divide-x">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="relative px-6 pb-20 md:pb-10 lg:px-10"
              >
                <div className="absolute top-0 right-0 left-0 h-px bg-border md:hidden" />
                <div className="relative -mt-6 mb-10 flex aspect-square w-12 items-center justify-center bg-background md:-mt-10 md:mb-10 md:w-20">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-3 max-w-[12rem] text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute right-0 bottom-0 left-0 h-px bg-border" />
        </div>
      </div>
      <div className="absolute inset-0 container hidden h-full md:block">
        <div className="relative h-full">
          <div className="absolute inset-y-0 left-0 h-full w-px bg-border"></div>
          <div className="absolute inset-y-0 right-0 h-full w-px bg-border"></div>
        </div>
      </div>
    </section>
  );
};

export { Feature76 };
