import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero11Props {
  className?: string;
}

const Hero11 = ({ className }: Hero11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-b">
        <div className="container max-w-7xl">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 flex flex-col items-center gap-6 text-center">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="logo"
                className="h-10 md:h-16"
              />
              <div>
                <h1 className="mb-4 text-3xl font-medium text-pretty lg:text-5xl">
                  Build your next project with Blocks
                </h1>
                <p className="max-w-3xl text-muted-foreground lg:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                  doloremque mollitia fugiat omnis! Porro facilis quo animi
                  consequatur. Explicabo.
                </p>
              </div>
              <Button>
                Get Started
                <ChevronRight className="h-4" />
              </Button>
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg"
            alt="placeholder"
            className="mt-20 aspect-video w-full rounded-t-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero11 };
