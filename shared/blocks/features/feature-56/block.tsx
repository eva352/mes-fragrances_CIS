import { cn } from "@/lib/utils";

interface Feature56Props {
  className?: string;
}

const Feature56 = ({ className }: Feature56Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col gap-6 lg:px-32">
        <div className="flex flex-col rounded-lg border border-border bg-accent p-8">
          <p className="mb-2 text-sm font-semibold md:text-base">
            Feature description
          </p>
          <p className="mb-8 text-sm text-muted-foreground md:text-base">
            Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet
            magna nec massa consectetur, id interdum ante congue. Nam leo elit,
            convallis luctus tincidunt et, ullamcorper sed justo.
          </p>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-8-wide.svg"
            alt="placeholder"
            className="rounded-md lg:mt-auto lg:w-full"
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="grid-cols-2 gap-x-20 rounded-lg border border-border bg-accent p-6 md:grid md:p-8 lg:flex lg:flex-col">
            <div className="flex flex-col">
              <p className="mb-2 text-sm font-semibold md:text-base">
                Feature description
              </p>
              <p className="mb-8 text-sm text-muted-foreground md:text-base">
                Nam vitae molestie arcu. Quisque eu libero orci.
              </p>
            </div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
              alt="placeholder"
              className="rounded-md lg:mt-auto lg:w-full"
            />
          </div>
          <div className="grid-cols-2 gap-x-20 rounded-lg border border-border bg-accent p-6 md:grid md:p-8 lg:flex lg:flex-col">
            <div className="flex flex-col">
              <p className="mb-2 text-sm font-semibold md:text-base">
                Feature description
              </p>
              <p className="mb-8 text-sm text-muted-foreground md:text-base">
                Nam vitae molestie arcu. Quisque eu libero orci.
              </p>
            </div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg"
              alt="placeholder"
              className="rounded-md lg:mt-auto lg:w-full"
            />
          </div>
          <div className="grid-cols-2 gap-x-20 rounded-lg border border-border bg-accent p-6 md:grid md:p-8 lg:flex lg:flex-col">
            <div className="flex flex-col">
              <p className="mb-2 text-sm font-semibold md:text-base">
                Feature description
              </p>
              <p className="mb-8 text-sm text-muted-foreground md:text-base">
                Nam vitae molestie arcu. Quisque eu libero orci.
              </p>
            </div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg"
              alt="placeholder"
              className="rounded-md lg:mt-auto lg:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature56 };
