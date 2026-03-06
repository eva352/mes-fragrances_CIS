import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface feature {
  title: string;
  description: string;
  link: string;
  gradient: string;
}

const FEATURES: Array<feature> = [
  {
    title: "AI-powered meeting assistant",
    description:
      "Schedule, summarize, and follow up on meetings automatically using our AI-driven productivity suite.",
    link: "#",
    gradient: "bg-linear-to-r from-[#00C9FF] to-[#92FE9D]",
  },
  {
    title: "Global CDN optimization",
    description:
      "Accelerate your site’s performance with intelligent edge caching and worldwide server coverage.",
    link: "#",
    gradient: "bg-linear-to-r from-[#f8ff00] to-[#3ad59f]",
  },
  {
    title: "Real-time user analytics",
    description:
      "Track user behavior across platforms with live dashboards and actionable segmentation tools.",
    link: "#",
    gradient: "bg-linear-to-r from-[#d53369] to-[#daae51]",
  },
  {
    title: "Automated data cleaning",
    description:
      "Enhance your datasets with AI enrichment, validation pipelines, and smart duplicate detection.",
    link: "#",
    gradient: "bg-linear-to-r from-[#FC466B] to-[#3F5EFB]",
  },
];

interface Feature221Props {
  className?: string;
}

const Feature221 = ({ className }: Feature221Props) => {
  return (
    <section
      className={cn(
        "bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat py-32",
        className,
      )}
    >
      <div className="container">
        <div className="flex w-full flex-col items-start justify-between gap-4 pb-16 lg:flex-row lg:items-end">
          <div className="flex w-full max-w-[32rem] flex-1 flex-col items-start gap-5">
            <h2 className="text-[2rem] leading-none font-bold tracking-tight md:text-[2.75rem] lg:text-5xl">
              Discover how companies use Our Services
            </h2>
            <p className="w-full max-w-[30rem] text-[1.15rem] leading-normal font-medium text-muted-foreground sm:text-xl">
              Accelerate growth with a single platform that automates
              scheduling, routing, enrichment, and intent workflows.
            </p>
          </div>
          <div>
            <Button className="rounded-full">
              See all use cases
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 grid-rows-[auto] gap-10 md:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <Card
              key={`feature-${i}`}
              className="flex w-full flex-col justify-between gap-10 rounded-[.5rem] border bg-background p-5"
            >
              <CardHeader className="flex w-full flex-col justify-between gap-4 p-0 lg:flex-row lg:items-center">
                <CardTitle className="flex w-fit items-center justify-start gap-2.5">
                  <h3 className="text-[1.75rem] leading-none font-bold tracking-tight">
                    {feature.title}
                  </h3>
                </CardTitle>
                <Badge className="bg-muted">
                  <p className="text-sm text-foreground">Feature</p>
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <p className="max-w-[20rem] text-base leading-[1.4] font-medium text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
              <CardFooter className="flex w-full items-end justify-between gap-5 p-0 lg:flex-row">
                <div className="flex-1">
                  <Button size="sm" className="rounded-full">
                    <a href={feature.link} className="flex items-center gap-2">
                      Learn More
                      <ArrowRight />
                    </a>
                  </Button>
                </div>
                <div className="h-8 w-8">
                  <div
                    className={cn(
                      "h-full w-full rounded-full",
                      feature.gradient,
                    )}
                  ></div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature221 };
