import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Feature8Props {
  className?: string;
}

const Feature8 = ({ className }: Feature8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-6xl">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <Badge variant="outline">Studies</Badge>
          <h1 className="max-w-2xl text-center text-3xl font-light md:text-5xl">
            Welcome to our innovative training platform
          </h1>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-6 md:flex-row lg:mt-20 lg:gap-10">
          <Card className="group p-6">
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "ml-auto hidden w-fit cursor-pointer transition-all duration-200 group-hover:opacity-100 md:flex lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0",
              )}
            >
              Learn more
              <ChevronRight className="ml-1 h-4" />
            </a>
            <div className="mt-6 flex gap-4">
              <p className="text-lg font-light lg:text-2xl">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
                deserunt.
              </p>
              <a
                href="#"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "icon",
                  }),
                  "shrink-0 cursor-pointer md:hidden",
                )}
              >
                <ChevronRight className="h-4" />
              </a>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <p className="text-sm font-light lg:text-base">Built with</p>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg"
                alt="shadcn"
                className="h-6 dark:invert"
              />
            </div>
          </Card>
          <Card className="group p-6">
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "ml-auto hidden w-fit cursor-pointer transition-all duration-200 group-hover:opacity-100 md:flex lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0",
              )}
            >
              Learn more
              <ChevronRight className="ml-1 h-4" />
            </a>
            <div className="mt-6 flex gap-4">
              <p className="text-lg font-light lg:text-2xl">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
                deserunt.
              </p>
              <a
                href="#"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "icon",
                  }),
                  "shrink-0 cursor-pointer md:hidden",
                )}
              >
                <ChevronRight className="h-4" />
              </a>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <p className="text-sm font-light lg:text-base">Styled with</p>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark-light.svg"
                alt="shadcn"
                className="h-4 dark:hidden"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark-dark.svg"
                alt="shadcn"
                className="hidden h-4 dark:block"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { Feature8 };
