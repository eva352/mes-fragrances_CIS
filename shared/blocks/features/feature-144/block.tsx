"use client";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Feature144Props {
  className?: string;
}

const Feature144 = ({ className }: Feature144Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-center text-4xl">
          Build your website with UI blocks
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-2xl text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
          doloremque mollitia fugiat
        </p>

        <Card className="mt-20 flex flex-col gap-6 p-6 md:flex-row md:gap-8 md:p-8">
          <div className="flex w-full flex-col justify-between">
            <h6 className="text-xl md:text-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </h6>
            <Badge
              variant="outline"
              className="mt-4 w-fit bg-muted px-4 py-3 md:text-base"
            >
              Build website with UI blocks
            </Badge>
          </div>
          <div className="w-full">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="max-h-80 w-full rounded-lg object-cover"
            />
          </div>
        </Card>

        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:gap-8">
          <Card className="flex w-full flex-col gap-6 p-6 md:gap-8 md:p-8">
            <div className="w-full">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="placeholder"
                className="max-h-80 w-full rounded-lg object-cover"
              />
            </div>

            <div className="flex w-full flex-col justify-between">
              <h6 className="text-xl md:text-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h6>
              <Badge
                variant="outline"
                className="mt-10 w-fit bg-muted px-4 py-3 md:text-base"
              >
                Build website with UI blocks
              </Badge>
            </div>
          </Card>
          <Card className="flex w-full flex-col gap-6 p-6 md:gap-8 md:p-8">
            <div className="w-full">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="placeholder"
                className="max-h-80 w-full rounded-lg object-cover"
              />
            </div>

            <div className="flex w-full flex-col justify-between">
              <h6 className="text-xl md:text-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h6>
              <Badge
                variant="outline"
                className="mt-10 w-fit bg-muted px-4 py-3 md:text-base"
              >
                Build website with UI blocks
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { Feature144 };
