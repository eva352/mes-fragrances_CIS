import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature94Props {
  className?: string;
}

const Feature94 = ({ className }: Feature94Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-y-4 md:flex-row">
            <h2 className="text-center text-2xl font-bold md:text-left md:text-4xl">
              Make better decisions
              <br /> across your entire workflow
            </h2>
            <Button variant="outline" size="lg">
              View Integrations
            </Button>
          </div>
          <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-muted p-6">
              <div className="mb-6 flex gap-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                  alt="logo"
                  className="h-auto w-16"
                />
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                  alt="logo"
                  className="h-auto w-16"
                />
              </div>
              <h4 className="mb-4 text-xl font-semibold md:text-2xl">
                Insights
              </h4>
              <p className="text-lg text-muted-foreground">
                Leverage your existing data to gain user-specific insights.
              </p>
            </div>
            <div className="rounded-xl border bg-muted p-6">
              <div className="mb-6 flex gap-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg"
                  alt="logo"
                  className="h-auto w-16"
                />
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg"
                  alt="logo"
                  className="h-auto w-16"
                />
              </div>
              <h4 className="mb-4 text-xl font-semibold md:text-2xl">
                Metrics
              </h4>
              <p className="text-lg text-muted-foreground">
                Understand the reasons behind key performance metrics.
              </p>
            </div>
            <div className="rounded-xl border bg-muted p-6">
              <div className="mb-6 flex gap-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg"
                  alt="logo"
                  className="h-auto w-16"
                />
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg"
                  alt="logo"
                  className="h-auto w-16"
                />
              </div>
              <h4 className="mb-4 text-xl font-semibold md:text-2xl">
                Testing
              </h4>
              <p className="text-lg text-muted-foreground">
                Validate your testing results using real-time data insights.
              </p>
            </div>
            <div className="rounded-xl border bg-muted p-6">
              <div className="mb-6 flex gap-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                  alt="logo"
                  className="h-auto w-16"
                />
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                  alt="logo"
                  className="h-auto w-16"
                />
              </div>
              <h4 className="mb-4 text-xl font-semibold md:text-2xl">
                Teamwork
              </h4>
              <p className="text-lg text-muted-foreground">
                Share relevant insights with your team for better collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature94 };
