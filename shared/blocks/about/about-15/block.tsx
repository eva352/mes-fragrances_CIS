import React from "react";

import { cn } from "@/lib/utils";

interface About15Props {
  className?: string;
}

const About15 = ({ className }: About15Props) => {
  return (
    <section
      className={cn("py-32 bg-neutral-950 text-white", className)}
    >
      <div className="container flex flex-col items-center justify-center gap-25 lg:flex-row lg:gap-[10vw]">
        <div className="w-xs rotate-[-6deg] border bg-white p-1">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img14.png"
            alt=""
            className="pointer-events-none h-110 w-full object-cover"
          />

          <div className="pt-2 pb-1">
            <p className="text-lg font-medium tracking-tight text-neutral-950">
              John Doe
            </p>
            <p className="text-sm text-neutral-950/50">@shadcnblocks.com</p>
          </div>
        </div>
        <div className="w-xs space-y-6">
          <h1 className="mb-15 text-5xl font-medium tracking-tight">
            Shaping ideas with clarity and{" "}
            <span className="font-serif">impact</span>
          </h1>
          <p className="text-sm lg:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
            voluptate saepe quas cum reprehenderit eligendi inventore animi
            excepturi sapiente earum.
          </p>
          <p className="text-sm lg:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
            voluptate saepe quas cum reprehenderit eligendi inventore animi
            excepturi sapiente earum.
          </p>
        </div>
      </div>
    </section>
  );
};

export { About15 };
