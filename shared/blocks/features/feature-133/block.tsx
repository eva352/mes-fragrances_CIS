"use client";

import { Code, MessageCircle, Text } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature133Props {
  className?: string;
}

const Feature133 = ({ className }: Feature133Props) => {
  return (
    <section className={cn("container py-32", className)}>
      <h2 className="text-2xl font-semibold md:text-4xl">
        Various integrations to help you grow your business
      </h2>

      <div className="mt-12 flex flex-col gap-6 md:flex-row">
        <div className="flex w-full flex-col justify-between overflow-hidden rounded-2xl border bg-card px-12 pt-12 text-card-foreground shadow-sm">
          <div className="mb-12 flex flex-col gap-3">
            <Code className="size-6" />
            <h4 className="text-xl font-semibold">Copy paste components</h4>
            <p className="text-base font-normal text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
              laboriosam voluptatibus temporibus doloremque laudantium.
            </p>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="max-h-52 w-full rounded-t-md object-cover shadow-lg"
          />
        </div>
        <div className="flex w-full flex-col gap-6">
          <div className="w-full overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col gap-3 p-12">
              <Text className="size-6" />
              <h4 className="text-xl font-semibold">100% customizable</h4>
              <p className="text-base font-normal text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm md:flex-row">
            <div className="flex w-full flex-col p-12 md:gap-3">
              <MessageCircle className="size-6" />
              <h4 className="text-xl font-semibold">24/7 support</h4>
              <p className="text-base font-normal text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature133 };
