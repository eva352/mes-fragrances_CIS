import { ArrowRight, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Feature80Props {
  className?: string;
}

const Feature80 = ({ className }: Feature80Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="aspect-5/6 overflow-clip rounded-3xl bg-accent">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex shrink-0 flex-col justify-center md:w-1/2 md:py-16 lg:mr-8 lg:pl-24 lg:text-left 2xl:pl-32">
            <p className="mb-6 text-xs font-medium tracking-wider uppercase">
              Tag Line
            </p>
            <h2 className="mb-6 text-3xl font-bold text-pretty lg:text-5xl">
              Feature Description
            </h2>
            <p className="mb-6 text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <a
              href="#"
              className="group mb-12 flex items-center pb-3 text-accent-foreground lg:text-xl"
            >
              Learn more{" "}
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <div className="flex flex-col gap-6 md:flex-row">
              <a
                href="#"
                className="group flex-1 rounded-xl border border-border p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Avatar className="size-10">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-3 size-10">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp" />
                      <AvatarFallback>RA</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-3 size-10">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                  </div>
                  <ChevronRight className="mt-2 size-5 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-8 font-medium lg:text-lg">Action 1</p>
              </a>
              <a
                href="#"
                className="group flex-1 rounded-xl border border-border p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                      alt="placeholder hero"
                      className="size-12 object-cover object-center"
                    />
                  </div>
                  <ChevronRight className="mt-2 size-5 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-8 font-medium lg:text-lg">Action 2</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature80 };
