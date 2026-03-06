import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero100Props {
  className?: string;
}

const Hero100 = ({ className }: Hero100Props) => {
  return (
    <section className={cn("overflow-hidden font-sans", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="basis-2/4">
            <div className="mt-10 flex flex-col gap-2">
              <p className="text-base font-semibold text-muted-foreground">
                Client Relationship Management Software
              </p>
              <h1 className="mb-2 text-4xl leading-snug! font-medium text-black lg:text-5xl">
                Your contact management, all streamlined in a single platform
              </h1>
              <p className="mb-2 text-lg text-black/80">
                Providing a comprehensive view of everything you know about the
                people, companies, and organizations you work with.
              </p>
              <Button
                asChild
                variant="default"
                className="block h-fit w-fit rounded-full px-7 py-3 text-base font-semibold transition-transform hover:scale-105"
              >
                <a href="#">Try Free</a>
              </Button>
            </div>
          </div>
          <div className="relative basis-[42%] py-9 md:py-16">
            <div className="aspect-square w-full overflow-hidden">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                alt=""
                className="relative z-20 h-full w-full object-cover object-center"
              />
              <div className="absolute top-0 left-[6.25rem] z-10 aspect-[1.378254211/1] h-full w-[56.25rem] bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero100 };
