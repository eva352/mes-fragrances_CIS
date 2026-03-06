import { ArrowRight, Flame } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature134Props {
  className?: string;
}

const Feature134 = ({ className }: Feature134Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2.5 py-1.5 text-sm"
          >
            <Flame className="h-auto w-4" />
            Key Highlights
          </Badge>
          <h2 className="text-center text-3xl font-semibold lg:text-4xl">
            Enhance Your Workflow
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg">
            Discover powerful tools to increase efficiency, simplify tasks, and
            reach your goals faster.
          </p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <a href="#" className="flex flex-col rounded-lg border">
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">
                  Easy Event Scheduling
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Plan effortlessly with integrated scheduling for smooth
                  collaboration.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="size-full max-h-72 rounded-lg border object-cover"
              />
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col justify-between rounded-lg border lg:col-span-2"
          >
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">Unified Messaging</h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Keep everyone connected with seamless communication tools.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="placeholder"
                className="h-full max-h-72 w-full rounded-lg border object-cover"
              />
            </div>
          </a>
          <a href="#" className="flex flex-col rounded-lg border">
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">Smart Alerts</h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Get timely updates to stay organized and ahead.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="placeholder"
                className="size-full max-h-72 rounded-lg border object-cover"
              />
            </div>
          </a>
          <a href="#" className="flex flex-col rounded-lg border">
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">Fast Feedback Cycles</h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Speed up progress with quick input and decisions.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
                alt="placeholder"
                className="size-full max-h-72 rounded-lg border object-cover"
              />
            </div>
          </a>
          <a href="#" className="flex flex-col rounded-lg border">
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">File Sharing</h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Share and retrieve important documents with ease.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg"
                alt="placeholder"
                className="size-full max-h-72 rounded-lg border object-cover"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature134 };
