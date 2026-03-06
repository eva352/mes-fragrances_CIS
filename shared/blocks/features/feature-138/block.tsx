"use client";

import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature138Props {
  className?: string;
}

const Feature138 = ({ className }: Feature138Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-4xl font-semibold">
          Built by the best and brightest
        </h2>
        <p className="mt-3 text-xl font-medium text-muted-foreground">
          Lorem ipsum dolor, sit amet
        </p>

        <div className="mt-16 flex flex-col overflow-hidden rounded-2xl bg-muted md:flex-row">
          <div className="flex w-full items-center bg-muted md:w-1/2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
              alt="placeholder"
              className="max-h-64 w-full object-cover"
            />
          </div>
          <div className="flex w-full flex-col justify-center gap-6 px-8 py-7 md:w-1/2 md:px-12 md:py-10">
            <h6 className="text-lg font-semibold md:text-2xl">
              Proven methodologies
            </h6>

            <div className="h-px w-full bg-muted-foreground" />

            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium hover:underline"
            >
              <span>Learn more</span>
              <MoveRight strokeWidth={2} className="ml-2 size-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col overflow-hidden rounded-2xl bg-muted md:flex-row">
          <div className="flex w-full flex-col justify-center gap-6 px-8 py-7 md:w-1/2 md:px-12 md:py-10">
            <h6 className="text-lg font-semibold md:text-2xl">
              Technologies to scale
            </h6>

            <div className="h-px w-full bg-muted-foreground" />

            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium hover:underline"
            >
              <span>Learn more</span>
              <MoveRight strokeWidth={2} className="ml-2 size-4" />
            </a>
          </div>
          <div className="flex w-full items-center bg-muted md:w-1/2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg"
              alt="placeholder"
              className="max-h-64 w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col overflow-hidden rounded-2xl bg-muted md:flex-row">
          <div className="flex w-full items-center bg-muted md:w-1/2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg"
              alt="placeholder"
              className="max-h-64 w-full object-cover"
            />
          </div>
          <div className="flex w-full flex-col justify-center gap-6 px-8 py-7 md:w-1/2 md:px-12 md:py-10">
            <h6 className="text-lg font-semibold md:text-2xl">
              A culture of innovation
            </h6>

            <div className="h-px w-full bg-muted-foreground" />

            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium hover:underline"
            >
              <span>Learn more</span>
              <MoveRight strokeWidth={2} className="ml-2 size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature138 };
