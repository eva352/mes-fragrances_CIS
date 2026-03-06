import { ArrowRight, GitCompare } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature107Props {
  className?: string;
}

const Feature107 = ({ className }: Feature107Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="gap grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="mx-auto flex flex-col gap-4 md:col-span-2">
            <Badge
              variant="outline"
              className="flex w-fit gap-1 px-2.5 py-1.5 text-sm"
            >
              <GitCompare className="h-auto w-4" />
              Integrations
            </Badge>
            <h2 className="text-3xl font-semibold lg:text-4xl">
              Unlock Synergy, Seamless Integrations with SAP
            </h2>
            <p className="text-muted-foreground">
              Explore SAP seamless integrations with other tools and platforms,
              enhancing productivity and workflow efficiency.
            </p>
          </div>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Mail Link</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Quick connect your mail to preferred platform.
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Work Hub</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Sync work details with preferred platform
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Task Tracker</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Keep tabs on all your tasks effortlessly.
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Team Chat</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Message teams with the click of a button.
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Project Planner</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Plan projects from milestones to completion.
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Board View</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                View tasks in a board for easy tracking.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature107 };
