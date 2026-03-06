"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const IconElem = ({ image, title }: { image: string; title: string }) => (
  <div className="flex flex-col items-center">
    <img
      src={image}
      alt={title}
      className="mb-3 hidden h-14 w-14 rounded-lg object-cover p-2 shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px] md:block dark:invert"
    />
    <Badge variant="secondary" className="font-mono text-xs font-semibold">
      {title}
    </Badge>
  </div>
);

interface Feature152Props {
  className?: string;
}

const Feature152 = ({ className }: Feature152Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 flex flex-col items-center md:mb-6">
          <Badge variant="secondary" className="mb-6 bg-muted">
            Get started today
          </Badge>
          <h1 className="mb-3 max-w-md text-center text-2xl font-medium md:text-4xl">
            Lorem ipsum dolor sit, amet consectetur
          </h1>
          <p className="mb-3 max-w-80 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
            illum!
          </p>
          <Button variant="link" asChild className="text-blue-700">
            <a href="#">
              View Integrations <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
        <div className="relative mx-auto flex max-w-3xl flex-col gap-5 overflow-hidden pb-8 md:gap-0">
          <div className="flex justify-around md:mb-[-30px]">
            <IconElem
              image="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
              title="Revenue Recognition"
            />
            <IconElem
              image="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
              title="Fraud Prevention"
            />
          </div>
          <div className="flex justify-center md:mb-[-30px]">
            <IconElem
              image="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg"
              title="Risk Assessment"
            />
          </div>
          <div className="flex justify-evenly md:mb-[-30px]">
            <IconElem image="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg" title="Compliance" />
            <IconElem image="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg" title="Cash Flow" />
          </div>
          <div className="flex justify-between">
            <IconElem
              image="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg"
              title="Investment Analysis"
            />
            <IconElem
              image="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
              title="Expense Tracking"
            />
          </div>

          {[...Array(11)].map((_, index) => (
            <div
              key={index}
              className="absolute -bottom-2 left-1/2 z-[-2] aspect-square rounded-full border border-indigo-200"
              style={{
                width: 60 + 80 * index + "px",
                opacity: 0.5,
                filter: "saturate(10%)",
                transform: "translateX(-50%) translateY(50%)",
              }}
            />
          ))}
          <div className="absolute inset-0 z-[-1] bg-linear-to-b from-background via-transparent to-transparent" />
          <div className="absolute inset-0 z-[-1] bg-linear-to-l from-background via-transparent to-transparent" />
          <div className="absolute inset-0 z-[-1] bg-linear-to-r from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 z-[-2] h-[1px] w-full bg-indigo-200 opacity-50" />
        </div>
      </div>
    </section>
  );
};

export { Feature152 };
