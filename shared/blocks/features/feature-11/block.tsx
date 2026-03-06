import { ChevronRight, CircleCheckBig } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature11Props {
  className?: string;
}

const Feature11 = ({ className }: Feature11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="max-h-96 w-full rounded-lg object-cover md:max-h-[500px] md:w-1/2"
          />
          <div className="lg:p-10">
            <h2 className="text-3xl font-medium text-balance md:text-5xl">
              Built with the latest technology stack
            </h2>
            <p className="mt-1 text-muted-foreground md:mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              alias unde et doloremque dignissimos error temporibus quisquam
              porro ducimus esse quod, a officiis.
            </p>
            <Button variant="outline" className="mt-6">
              Learn more <ChevronRight className="ml-2 size-4" />
            </Button>
            <ul className="mt-10 flex-wrap items-center gap-6 space-y-6 md:flex md:space-y-0">
              <li className="flex items-center gap-3">
                <CircleCheckBig className="size-4" /> Quality
              </li>
              <li className="flex items-center gap-3">
                <CircleCheckBig className="size-4" />
                Multi-purpose
              </li>
              <li className="flex items-center gap-3">
                <CircleCheckBig className="size-4" /> Easy to use
              </li>
              <li className="flex items-center gap-3">
                <CircleCheckBig className="size-4" /> Fast
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature11 };
