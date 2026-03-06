import { CornerDownRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Contact19Props {
  className?: string;
}

const Contact19 = ({ className }: Contact19Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mt-20 flex max-h-120 flex-col justify-between gap-15 md:gap-20 lg:flex-row">
          <div className="flex w-full max-w-md flex-col justify-between gap-30">
            <div className="relative w-fit">
              <h1 className="text-6xl leading-none font-semibold tracking-tight lg:text-7xl">
                Stay Connected
              </h1>
              <p className="mt-10 mb-5 text-foreground/50">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis nisi omnis, excepturi doloribus fuga delectus at ab
                magnam beatae explicabo.
              </p>

              <Button variant="ghost" className="group">
                <CornerDownRight className="size-4" />
                Get in touch
              </Button>
            </div>

            <div>
              <a
                href=""
                className="flex items-center gap-4 text-4xl font-medium tracking-tighter"
              >
                +1 (002) 312 4123
              </a>
              <a
                href=""
                className="flex items-center gap-4 text-4xl font-medium tracking-tighter"
              >
                hi@shadcnblocks.com
              </a>
            </div>
          </div>
          <div className="top-0 right-0 flex h-screen w-full flex-col gap-2 lg:absolute lg:w-1/2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png"
              alt=""
              className="pointer-events-none h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact19 };
