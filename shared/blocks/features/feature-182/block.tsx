"use client";
import { ArrowRight, BadgeCheck, Pyramid, Sparkle, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface DataItem {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const DATA: DataItem[] = [
  {
    title: "Seamless Integrations",
    description:
      "Connect your favorite tools and services effortlessly for a unified workflow.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    icon: <Zap className="size-6" />,
  },
  {
    title: "Advanced Analytics",
    description:
      "Gain deep insights with powerful analytics to make data-driven decisions.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    icon: <Pyramid className="size-6" />,
  },
  {
    title: "Smart Search & Filters",
    description:
      "Find exactly what you need with intelligent search and filtering options.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    icon: <Sparkle className="size-6" />,
  },
];

interface Feature182Props {
  className?: string;
}

const Feature182 = ({ className }: Feature182Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {/* Title and Buttons Section */}
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-semibold sm:mb-9 sm:text-3xl lg:mb-14 lg:text-4xl">
            Discover Powerful Features
          </h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="w-full sm:w-auto">
              Explore Features <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" className="w-full shadow-sm sm:w-auto">
              Get Started <BadgeCheck className="size-4" />
            </Button>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="mt-12 grid gap-6 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {DATA.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <img
                src={feature.image}
                alt={feature.title}
                className="h-64 w-full rounded-lg object-cover"
              />
              <p className="mt-4 mb-2 text-xl font-bold">{feature.title}</p>
              <p className="mb-6 text-sm text-muted-foreground">
                {feature.description}
              </p>
              <div className="w-fit rounded-lg border p-2 shadow-sm">
                {feature.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature182 };
