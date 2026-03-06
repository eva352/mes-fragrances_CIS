import { ArrowUpRight, BookOpen, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta26Props {
  className?: string;
}

const Cta26 = ({ className }: Cta26Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative h-96 overflow-hidden rounded-xl border border-border">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/andrew-kliatskyi-LYZxo7oVFOI-unsplash.webp"
            alt="placeholder"
            className="hidden h-full w-full object-cover dark:block"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/denis96-gmsf4Zo2-rY-unsplash.webp"
            alt="placeholder"
            className="h-full w-full object-cover dark:hidden"
          />
          <div className="absolute inset-0 bg-radial from-background to-background/50 lg:to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold md:text-5xl">
                Try it free
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Experience our platform and discover how it can transform your
                workflow
              </p>
            </div>
            <Button size="lg">
              Get started
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <a
            href="#"
            className="flex flex-col items-start gap-8 rounded-xl border border-border bg-muted/50 px-10 py-8 transition-transform hover:-translate-y-0.5"
          >
            <span className="grid size-12 place-items-center rounded-lg border border-border">
              <Zap className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-medium md:text-3xl">
                Instant setup
              </h3>
              <p className="text-muted-foreground">
                Get up and running in minutes with our guided onboarding
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col items-start gap-8 rounded-xl border border-border bg-muted/50 px-10 py-8 transition-transform hover:-translate-y-0.5"
          >
            <span className="grid size-12 place-items-center rounded-lg border border-border">
              <BookOpen className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-medium md:text-3xl">
                Documentation
              </h3>
              <p className="text-muted-foreground">
                Comprehensive guides and tutorials to help you succeed
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Cta26 };
