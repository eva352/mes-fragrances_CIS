import React from "react";

import { cn } from "@/lib/utils";

interface About14Props {
  className?: string;
}

const About14 = ({ className }: About14Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-10 lg:space-y-20">
        <div className="w-full grid-cols-6 gap-10 space-y-5 lg:grid lg:space-y-0">
          <h1 className="col-span-2 text-5xl font-semibold tracking-tight lg:text-7xl">
            About Us
          </h1>
          <div />
         
        </div>
        <div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img1.png"
            alt="about us iamge"
            className="mt-4 h-132 w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 gap-10 space-y-12 lg:grid-cols-6 lg:space-y-0">
          <p className="hidden text-foreground lg:block">
            Our Crew, Our story
          </p>
          <div className="order-2 col-span-2 lg:order-none lg:pr-24 lg:pl-10">
            <p className="text-foreground/40">
              We aim to bring diverse minds together, turning ideas into
              experiences that matter.
            </p>
            <div className="mt-5 flex items-center gap-5 lg:mt-12">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar1.png"
                className="size-12"
                alt="avatr"
              />
              <div>
                <h3 className="text-lg font-medium tracking-tight">John Doe</h3>
                <p className="text-sm text-foreground/40">Creative Director</p>
              </div>
            </div>
          </div>
          <div className="order-1 col-span-3 lg:order-none lg:mt-0 lg:pl-10">
            <h2 className="text-2xl font-medium tracking-tight lg:text-3xl">
              We are a team of creators, thinkers, and builders who believe in
              crafting experiences that truly connect. Our story is built on
              passion, innovation, and the drive to bring meaningful ideas to
              life.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About14 };
