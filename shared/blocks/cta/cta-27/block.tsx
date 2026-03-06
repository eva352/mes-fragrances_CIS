import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta27Props {
  className?: string;
}

const Cta27 = ({ className }: Cta27Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-5xl font-bold md:text-6xl">Create better.</h2>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-muted/50">
            <div className="mx-8 mt-6 mb-12 flex flex-col gap-5">
              <h3 className="text-4xl font-semibold md:text-5xl">Design Kit</h3>
              <div className="flex gap-3">
                <Button size="lg">Start creating</Button>
                <Button size="lg" variant="outline">
                  View gallery
                </Button>
              </div>
            </div>
            <div className="relative max-h-96 overflow-hidden pl-32 sm:pl-32">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="max-h-96 w-full rounded-tl-xl border-t border-l border-border object-cover"
              />
              <div className="absolute -bottom-16 left-10 isolate sm:left-10">
                <div className="h-full max-h-96 w-full">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-1.png"
                    alt="phone frame"
                    className="max-h-[60vw] sm:max-h-96 lg:max-h-80 xl:max-h-96"
                  />
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg"
                    alt="placeholder"
                    className="absolute top-0 left-0 -z-10 h-full w-full rounded-4xl"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-muted/50">
            <div className="mx-8 mt-6 mb-12 flex flex-col gap-5">
              <h3 className="text-4xl font-semibold md:text-5xl">
                Brand Studio
              </h3>
              <div className="flex gap-3">
                <Button size="lg">Start creating</Button>
                <Button size="lg" variant="outline">
                  View gallery
                </Button>
              </div>
            </div>
            <div className="relative max-h-96 overflow-hidden pl-32 sm:pl-32">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="placeholder"
                className="max-h-96 w-full rounded-tl-xl border-t border-l border-border object-cover"
              />
              <div className="absolute -bottom-16 left-10 isolate sm:left-10">
                <div className="h-full max-h-96 w-full">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-1.png"
                    alt="phone frame"
                    className="max-h-[60vw] sm:max-h-96 lg:max-h-80 xl:max-h-96"
                  />
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg"
                    alt="placeholder"
                    className="absolute top-0 left-0 -z-10 h-full w-full rounded-4xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta27 };
