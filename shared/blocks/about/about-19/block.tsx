import React from "react";

import { cn } from "@/lib/utils";

interface About19Props {
  className?: string;
}

const About19 = ({ className }: About19Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-15 lg:grid-cols-7 lg:gap-1">
          <div className="col-span-4 h-120 border">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img2.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="col-span-3 ml-auto max-w-4xl space-y-15 lg:pl-15">
            <h1 className="text-2xl font-medium tracking-tight">
              We are a team of creators, thinkers, and builders who believe in
              crafting experiences that truly connect. Our story is built on
              passion, innovation, and the drive to bring meaningful ideas to
              life.
            </h1>
            <p className="text-base text-foreground/40 lg:text-lg">
              We ask: What’s the goal? Who’s it for? How do we make it
              effortless? we begin with why, who, and how to make it better.
            </p>
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <p className="flex-1 text-sm text-foreground/40">
                We aim to bring diverse minds together, turning ideas into
                experiences that matter.
              </p>
              <div className="flex w-fit items-center gap-2">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar1.png"
                  className="size-10"
                  alt="avatr"
                />
                <div>
                  <h3 className="font-medium tracking-tight">John Doe</h3>
                  <p className="text-sm text-foreground/40">
                    Creative Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About19 };
