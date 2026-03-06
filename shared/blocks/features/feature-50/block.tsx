import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature50Props {
  className?: string;
}

const Feature50 = ({ className }: Feature50Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h2 className="mb-2 text-center text-3xl font-semibold text-balance lg:text-5xl">
            Built your dream project with our blocks
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quaerat
            odit sunt eaque ex, natus vel maxime tenetur odio? Nemo.
          </p>
          <Button variant="outline" className="mt-6">
            Get started for free
            <ChevronRight className="ml-1 h-4" />
          </Button>
        </div>
        <div className="mx-auto mt-20 flex max-w-5xl grid-cols-1 flex-col gap-6 lg:grid lg:grid-cols-7">
          <a
            href="#"
            className="col-span-7 grid overflow-hidden rounded-lg bg-muted sm:grid-cols-2"
          >
            <div className="flex flex-col justify-between p-8 lg:p-12">
              <div>
                <div className="mb-4 text-xs text-muted-foreground">
                  COPY AND PASTE
                </div>
                <h3 className="mb-2 text-xl font-medium lg:text-2xl">
                  Ready to use blocks for your project
                </h3>
                <p className="text-sm text-muted-foreground lg:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti molestiae similique atque laboriosam a illum ad sit.
                  Natus, iste voluptatem!
                </p>
              </div>
              <div className="mt-6 sm:mt-8">
                <Button variant="outline">
                  Learn more
                  <ChevronRight className="ml-1 h-4" />
                </Button>
              </div>
            </div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
              alt="placeholder"
              className="order-first aspect-video h-full max-h-96 w-full border-b object-cover sm:order-last sm:aspect-auto lg:max-h-none lg:border-b-0 lg:border-l"
            />
          </a>
          <a
            href="#"
            className="group relative overflow-hidden rounded-lg bg-muted lg:col-span-3"
          >
            <Button
              variant="outline"
              size="sm"
              className="absolute top-7 right-10 transition-all duration-200 group-hover:opacity-100 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0"
            >
              <ChevronRight className="h-4" />
            </Button>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg"
              alt="placeholder"
              className="max-h-72 w-full border-b object-cover"
            />
            <div className="p-8 lg:p-12">
              <div className="mb-4 text-xs text-muted-foreground">
                EASY TO USE
              </div>
              <h3 className="mb-2 text-xl font-medium lg:text-2xl">
                Customize and build your project
              </h3>
            </div>
          </a>
          <a
            href="#"
            className="grid overflow-hidden rounded-lg bg-muted sm:grid-cols-2 lg:col-span-4"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg"
              alt="placeholder"
              className="aspect-video h-full max-h-96 w-full border-b object-cover sm:aspect-auto lg:max-h-none lg:border-r lg:border-b-0"
            />
            <div className="flex flex-col justify-between p-8 lg:p-12">
              <div>
                <div className="mb-4 text-xs text-muted-foreground">
                  A BLOCK FOR EVERYTHING
                </div>
                <h3 className="mb-2 text-xl font-medium lg:text-2xl">
                  Blocks for every project
                </h3>
              </div>
              <div className="mt-6 sm:mt-8">
                <Button variant="outline">
                  Learn more
                  <ChevronRight className="ml-1 h-4" />
                </Button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature50 };
