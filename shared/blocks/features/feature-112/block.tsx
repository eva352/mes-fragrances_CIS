import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature112Props {
  className?: string;
}

const Feature112 = ({ className }: Feature112Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
          <Badge variant="outline">High Standards</Badge>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Create, Motivate, and Succeed
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Join the journey to build intricately crafted digital solutions.
          </p>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium md:text-base"
          >
            View all capabilities
            <ChevronRight className="h-auto w-4" />
          </a>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-3 lg:gap-10">
          <div className="flex flex-col rounded-lg border">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="aspect-video size-full rounded-t-lg object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Innovative Communication
              </h3>
              <a href="#" className="flex items-center gap-1 text-sm">
                Lear more
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="placeholder"
              className="aspect-video size-full rounded-t-lg object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2.5 font-semibold md:text-xl">
                High-Quality Resources
              </h3>
              <a href="#" className="flex items-center gap-1 text-sm">
                Lear more
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
              alt="placeholder"
              className="aspect-video size-full rounded-t-lg object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Grow Your Audience
              </h3>
              <a href="#" className="flex items-center gap-1 text-sm">
                Lear more
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature112 };
