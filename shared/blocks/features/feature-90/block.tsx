import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature90Props {
  className?: string;
}

const Feature90 = ({ className }: Feature90Props) => {
  return (
    <section className={cn("bg-muted/10 py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h2 className="mb-2 text-center text-4xl font-extrabold text-balance lg:text-6xl">
            Seamless connections with all your tools
          </h2>
          <p className="text-center text-lg text-muted-foreground lg:text-xl">
            Easily integrate your platform with the services you rely on to
            enhance your productivity and results.
          </p>
          <Button variant="outline" className="mt-6">
            View all integrations
          </Button>
        </div>
        <div className="my-14">
          <div className="flex justify-center -space-x-4 sm:-space-x-5">
            <span className="flex aspect-square h-[13vw] min-h-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted md:h-28">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="logo"
                className="h-auto w-[8vw] max-w-12 md:w-12"
              />
            </span>
            <span className="flex aspect-square h-[13vw] min-h-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted md:h-28">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                alt="logo"
                className="h-auto w-[8vw] max-w-12 md:w-12"
              />
            </span>
            <span className="flex aspect-square h-[13vw] min-h-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted md:h-28">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg"
                alt="logo"
                className="h-auto w-[8vw] max-w-12 md:w-12"
              />
            </span>
            <span className="flex aspect-square h-[13vw] min-h-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted md:h-28">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg"
                alt="logo"
                className="h-auto w-[8vw] max-w-12 md:w-12"
              />
            </span>
            <span className="flex aspect-square h-[13vw] min-h-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted md:h-28">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg"
                alt="logo"
                className="h-auto w-[8vw] max-w-12 md:w-12"
              />
            </span>
            <span className="flex aspect-square h-[13vw] min-h-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted md:h-28">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="logo"
                className="h-auto w-[8vw] max-w-12 md:w-12"
              />
            </span>
            <span className="flex aspect-square h-[13vw] min-h-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted md:h-28">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                alt="logo"
                className="h-auto w-[8vw] max-w-12 md:w-12"
              />
            </span>
            <span className="flex aspect-square h-[13vw] min-h-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted md:h-28">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg"
                alt="logo"
                className="h-auto w-[8vw] max-w-12 md:w-12"
              />
            </span>
          </div>
        </div>
        <div className="text-center text-sm">
          and more than
          <a href="#" className="ml-1 font-bold underline">
            120+ integrations available
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature90 };
