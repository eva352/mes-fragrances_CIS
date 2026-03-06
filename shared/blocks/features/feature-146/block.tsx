"use client";

import { cn } from "@/lib/utils";
interface Feature146Props {
  className?: string;
}

const Feature146 = ({ className }: Feature146Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-24 flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="text-3xl font-medium md:w-1/2 lg:w-3/5 lg:text-center lg:text-5xl">
            <h1 className="text-muted-foreground">Proven methodologies.</h1>
            <h1>A culture of innovation.</h1>
          </div>
          <div className="text-left text-lg font-medium md:w-1/2 lg:w-2/5 lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            fuga error voluptates ut sint obcaecati reiciendis iure voluptatum
            quia.
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative flex w-full flex-col border border-solid border-muted-foreground/30 md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div className="absolute top-0 left-[-50px] h-[1px] w-12 border-b-[1px] border-dashed border-b-muted-foreground/30" />
              <div className="absolute top-[-50px] left-0 h-12 w-[1px] border-r-[1px] border-dashed border-r-muted-foreground/30" />
              <div className="absolute top-0 right-[-50px] h-[1px] w-12 border-b-[1px] border-dashed border-b-muted-foreground/30" />
              <div className="absolute top-[-50px] right-0 h-12 w-[1px] border-r-[1px] border-dashed border-r-muted-foreground/30" />
              <div className="flex flex-col justify-between gap-8 border-b border-solid border-muted-foreground/30 p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                <div>
                  <h2 className="font-semibold">Lorem ipsum dolor sit amet</h2>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>

                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="placeholder"
                  className="aspect-[1.45] h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-8 p-10 lg:w-3/5">
                <div>
                  <h2 className="font-semibold">Lorem ipsum dolor sit amet</h2>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>

                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                  alt="placeholder"
                  className="aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                />
              </div>
            </div>
            <div className="relative border-t border-solid border-muted-foreground/30">
              <div className="absolute bottom-0 left-[-50px] h-[1px] w-12 border-b-[1px] border-dashed border-b-muted-foreground/30" />
              <div className="absolute bottom-[-50px] left-0 h-12 w-[1px] border-r-[1px] border-dashed border-r-muted-foreground/30" />
              <div className="absolute right-[-50px] bottom-0 h-[1px] w-12 border-b-[1px] border-dashed border-b-muted-foreground/30" />
              <div className="absolute right-0 bottom-[-50px] h-12 w-[1px] border-r-[1px] border-dashed border-r-muted-foreground/30" />
              <div className="flex flex-col gap-8 p-10 lg:flex-row lg:items-center">
                <div className="lg:w-1/3">
                  <h2 className="font-semibold">Lorem ipsum dolor sit amet</h2>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>

                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                  alt="placeholder"
                  className="aspect-[1.7] h-full w-full object-cover lg:w-2/3"
                />
              </div>
            </div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"
              alt="cross"
              className="absolute top-[-4px] left-[-6px] w-3"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"
              alt="cross"
              className="absolute top-[-4px] right-[-6px] w-3"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"
              alt="cross"
              className="absolute bottom-[-8px] left-[-6px] w-3"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"
              alt="cross"
              className="absolute right-[-6px] bottom-[-8px] w-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature146 };
