import { ArrowDown, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature71Props {
  className?: string;
}

const Feature71 = ({ className }: Feature71Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <p className="mb-6 text-xs font-medium tracking-wider uppercase">
            Tag Line
          </p>
          <h3 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Feature group
          </h3>
          <p className="mb-8 text-muted-foreground lg:max-w-2xl lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto">
              <ArrowDown className="size-4" />
              See all below
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Call to Action
            </Button>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <a
            href="#"
            className="group relative col-span-2 overflow-clip rounded-lg sm:max-lg:col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="placeholder"
              className="absolute h-full w-full object-cover object-center"
            />
            <div className="relative flex h-full w-full flex-col items-start justify-between bg-black/60 p-4 transition-colors hover:bg-black/70 sm:aspect-3/2 md:p-6 lg:p-10">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg"
                alt="placeholder logo"
                className="mb-12 h-8 invert md:h-12 dark:invert"
              />
              <div className="flex items-center text-xs font-medium text-white md:text-base lg:text-lg">
                Read more{" "}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </a>
          <div className="flex flex-col justify-between rounded-lg bg-accent p-4 sm:justify-end md:p-6 lg:p-10">
            <div className="mb-8 text-3xl sm:mb-2 lg:text-5xl">100+</div>
            <div className="text-xs md:text-base lg:text-lg">Metric 1</div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-accent p-4 sm:justify-end md:p-6 lg:p-10">
            <div className="mb-8 text-3xl sm:mb-2 lg:text-5xl">5</div>
            <div className="text-xs md:text-base lg:text-lg">Metric 2</div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-accent p-4 md:p-6 lg:p-10">
            <div className="mb-8 text-3xl lg:text-5xl">150+</div>
            <div className="text-xs md:text-base lg:text-lg">Metric 3</div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-accent p-4 md:p-6 lg:p-10">
            <div className="mb-8 text-3xl lg:text-5xl">10</div>
            <div className="text-xs md:text-base lg:text-lg">Metric 4</div>
          </div>
          <a
            href="#"
            className="group relative col-span-2 overflow-clip rounded-lg sm:max-lg:col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="placeholder"
              className="absolute h-full w-full object-cover object-center"
            />
            <div className="relative flex h-full w-full flex-col items-start justify-between gap-4 bg-black/50 p-4 transition-colors hover:bg-black/70 sm:aspect-2/1 md:flex-row md:items-end md:p-6 lg:p-10">
              <div>
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg"
                  alt="placeholder logo"
                  className="mb-8 h-7 invert md:mb-0 dark:invert"
                />
              </div>
              <div className="flex shrink-0 items-center text-xs font-medium text-white md:text-base lg:text-lg">
                Read more{" "}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature71 };
