import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta17Props {
  className?: string;
}

const CirclesPattern = () => (
  <svg
    className="absolute inset-0 size-full"
    viewBox="0 0 1984 1984"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect
      x="0.5"
      y="0.5"
      width="1983"
      height="1983"
      rx="991.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="100.5"
      y="100.5"
      width="1783"
      height="1783"
      rx="891.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="200.5"
      y="200.5"
      width="1583"
      height="1583"
      rx="791.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="300.5"
      y="300.5"
      width="1383"
      height="1383"
      rx="691.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="400.25"
      y="400.25"
      width="1183.5"
      height="1183.5"
      rx="591.75"
      strokeWidth="0.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="500.25"
      y="500.25"
      width="983.5"
      height="983.5"
      rx="491.75"
      strokeWidth="0.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="600.25"
      y="600.25"
      width="783.5"
      height="783.5"
      rx="391.75"
      strokeWidth="0.5"
      className="fill-muted/50 stroke-border"
    />
    <rect
      x="700.25"
      y="700.25"
      width="583.5"
      height="583.5"
      rx="291.75"
      strokeWidth="0.5"
      className="fill-muted/30 stroke-border"
    />
  </svg>
);

const Cta17 = ({ className }: Cta17Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="relative flex items-center justify-center overflow-hidden border py-20 text-center md:p-20">
        <CirclesPattern />
        <div className="container relative">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-3xl font-semibold text-balance md:text-5xl">
              Start building your websites faster
            </h1>
            <p className="md:text-lg">
              Try our tools and services to build your website faster. Start
              with a 14-day free trial. No credit card required. No setup fees.
              Cancel anytime.
            </p>
            <div className="mt-11 flex flex-col justify-center gap-2 sm:flex-row">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta17 };
