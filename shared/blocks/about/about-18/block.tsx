import React from "react";

import { cn } from "@/lib/utils";

interface About18Props {
  className?: string;
}

const About18 = ({ className }: About18Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-15 lg:grid-cols-7 lg:gap-12">
          <p className="col-span-2 font-medium">Our mission</p>

          <div className="col-span-4 ml-auto max-w-4xl space-y-10 lg:pl-15">
            <h1 className="text-2xl font-medium tracking-tight">
              We transform ideas into digital experiences that inspire and
              engage. Every project is an opportunity to push boundaries,
              challenge conventions, and create something extraordinary that
              leaves a lasting impact.
            </h1>
            <p className="w-fit text-lg text-foreground/40 lg:translate-y-2">
              Our approach: Research deeply, design thoughtfully, and deliver
              excellence. We believe in the power of collaboration, continuous
              learning, and staying ahead of industry trends.
            </p>
          </div>
        </div>
        <div className="my-20 grid grid-cols-2 items-center gap-4">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img2.png"
            alt=""
            className="h-150 w-full object-cover saturate-0"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img1.png"
            alt=""
            className="h-150 w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 gap-15 lg:grid-cols-7 lg:gap-12">
          <p className="col-span-2 font-medium">What drives us</p>

          <div className="col-span-4 ml-auto max-w-4xl space-y-10 lg:pl-15">
            <h1 className="text-2xl font-medium tracking-tight">
              We are a team of creators, thinkers, and builders who believe in
              crafting experiences that truly connect. Our story is built on
              passion, innovation, and the drive to bring meaningful ideas to
              life.
            </h1>
            <p className="w-fit text-lg text-foreground/40 lg:translate-y-2">
              We ask: What's the goal? Who's it for? How do we make it
              effortless?
              <br className="hidden lg:block" />
              We begin with why, who, and how to make it better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About18 };
