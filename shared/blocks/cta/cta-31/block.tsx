import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta31Props {
  className?: string;
}

const Cta31 = ({ className }: Cta31Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="relative container">
        <h1 className="mx-auto max-w-4xl bg-gradient-to-r from-primary/60 via-primary to-primary/60 bg-clip-text text-center text-4xl font-semibold text-transparent lg:text-6xl">
          Solutions for <br /> Modern Businesses
        </h1>
        <p className="mt-4 text-center text-lg lg:mt-10">
          Transform your workflow with cutting-edge technology
        </p>
        <div className="relative z-10 mt-8 flex justify-center lg:mt-16">
          <Button size="lg">
            Explore Our Solutions
            <ArrowRight />
          </Button>
        </div>
        <div className="inset-0 -z-10 flex justify-center lg:absolute">
          <div className="relative -top-8 flex justify-between sm:-top-20 lg:-top-0 lg:w-full">
            <div className="relative -left-20 min-h-44 min-w-[460px] translate-x-28 scale-80 sm:translate-x-0 lg:min-h-[292px] lg:scale-90 xl:scale-100">
              <span className="absolute right-0 -bottom-5 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-3.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-24 bottom-1 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-20.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-44 bottom-7 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-6.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-44 bottom-28 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-8.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-4 left-24 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-9.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-24 left-20 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-21.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
            </div>
            <div className="relative -right-20 min-h-44 min-w-[460px] -translate-x-28 scale-80 sm:translate-x-0 lg:min-h-[292px] lg:scale-90 xl:scale-100">
              <span className="absolute -bottom-5 left-0 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-12.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-1 left-24 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-13.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-7 left-44 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-14.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute bottom-28 left-44 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-15.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-24 bottom-4 flex size-20 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-17.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
              <span className="absolute right-20 bottom-24 flex size-20 scale-60 items-center justify-center rounded-full border border-border p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-19.svg"
                  alt="logo"
                  className="brightness-0 invert-0 dark:invert"
                />
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta31 };
