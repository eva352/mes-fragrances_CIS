"use client";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Pyramid,
  Sparkle,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
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
    icon: <Zap className="size-5" />,
  },
  {
    title: "Advanced Analytics",
    description:
      "Gain deep insights with powerful analytics to make data-driven decisions.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    icon: <Pyramid className="size-5" />,
  },
  {
    title: "Smart Search & Filters",
    description:
      "Find exactly what you need with intelligent search and filtering options.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    icon: <Sparkle className="size-5" />,
  },
  {
    title: "Enhanced Security",
    description:
      "Protect your data with top-notch security features and encryption.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    icon: <BadgeCheck className="size-5" />,
  },
];

interface Feature181Props {
  className?: string;
}

const Feature181 = ({ className }: Feature181Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-left">
          <h2 className="mb-6 text-3xl font-semibold lg:text-4xl">
            Discover Powerful Features
          </h2>
          <Button className="mr-4 rounded-full">
            Get Started
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        {/* Feature Cards Section */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4">
          {DATA.map((feature, index) => (
            <div
              key={index}
              className={cn("mt-0 flex flex-col border-l px-6 sm:mt-4 md:mt-6")}
            >
              {/* Masked Text */}
              <div className="relative">
                <h1 className="mb-16 bg-linear-to-r from-white to-transparent bg-clip-text text-9xl">
                  0{index + 1}
                </h1>
                <div className="absolute inset-0 bg-linear-to-r from-white to-transparent opacity-100"></div>
              </div>

              <p className="text-md mt-4 mb-2 font-semibold">{feature.title}</p>
              <p className="text-md mb-6 text-muted-foreground">
                {feature.description}
              </p>
              <Badge variant="outline" className="w-fit gap-2 py-2">
                <Clock className="size-4" />5 Minute
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature181 };
