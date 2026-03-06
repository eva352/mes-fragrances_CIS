import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature111Props {
  className?: string;
}

const Feature111 = ({ className }: Feature111Props) => {
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
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div className="-mx-7 rounded-lg bg-muted px-14 pt-7 md:mx-0">
            <div className="mx-auto flex flex-col items-center gap-2.5 text-center md:gap-5">
              <Badge variant="outline" className="bg-background">
                Premium
              </Badge>
              <h2 className="text-lg font-semibold md:text-3xl">
                For Entrepreneurs
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Discover the potential of innovative web design.
              </p>
              <a
                href="#"
                className="flex items-center gap-1 text-sm font-medium md:text-base"
              >
                Sign Up
                <ChevronRight className="h-auto w-4" />
              </a>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                alt="placeholder"
                className="mt-5 max-h-[400px] rounded-t-lg"
              />
            </div>
          </div>
          <div className="-mx-7 rounded-lg bg-muted px-14 pt-7 md:mx-0">
            <div className="mx-auto flex flex-col items-center gap-2.5 text-center md:gap-5">
              <Badge variant="outline" className="bg-background">
                Featured
              </Badge>
              <h2 className="text-lg font-semibold md:text-3xl">
                For Businesses
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Build an exceptional digital presence today.
              </p>
              <a
                href="#"
                className="flex items-center gap-1 text-sm font-medium md:text-base"
              >
                Get Started
                <ChevronRight className="h-auto w-4" />
              </a>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg"
                alt="placeholder"
                className="mt-5 max-h-[400px] rounded-t-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature111 };
