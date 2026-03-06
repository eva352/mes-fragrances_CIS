import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature64Props {
  className?: string;
}

const Feature64 = ({ className }: Feature64Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="outline" className="mb-6">
            Coming Soon
          </Badge>
          <h3 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Feature group
          </h3>
          <p className="text-muted-foreground lg:max-w-3xl lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
        </div>
        <div className="grid w-full gap-6 lg:grid-cols-7">
          <div className="flex flex-col rounded-lg border border-border bg-accent p-6 md:p-8 lg:col-span-4">
            <div className="flex justify-center">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="mb-6 aspect-4/3 sm:max-h-64 md:mb-8 lg:w-full"
              />
            </div>
            <div className="mt-auto flex flex-col">
              <p className="mb-2 text-sm font-semibold md:text-base">Feature</p>
              <p className="text-sm text-muted-foreground md:text-base">
                Nam vitae molestie arcu. Quisque eu libero orci.
              </p>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border border-border bg-accent p-6 md:p-8 lg:col-span-3">
            <div className="flex justify-center">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="placeholder"
                className="mb-6 aspect-4/3 sm:max-h-64 md:mb-8 lg:w-full"
              />
            </div>
            <div className="mt-auto flex flex-col">
              <p className="mb-2 text-sm font-semibold md:text-base">Feature</p>
              <p className="text-sm text-muted-foreground md:text-base">
                Nam vitae molestie arcu. Quisque eu libero orci.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature64 };
