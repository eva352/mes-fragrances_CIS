import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature119Props {
  className?: string;
}

const Feature119 = ({ className }: Feature119Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-2.5">
            <Badge variant="outline">Your path to success</Badge>
            <h2 className="text-center text-4xl md:text-5xl">
              Get Started with Ease
            </h2>
          </div>
          <div className="grid gap-7 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="flex gap-4">
              <span className="text-md flex size-11 shrink-0 items-center justify-center rounded-full bg-muted font-mono">
                01
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Create an Account</h3>
                <p className="text-muted-foreground">
                  Sign up quickly and choose the best plan for your needs.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-md flex size-11 shrink-0 items-center justify-center rounded-full bg-muted font-mono">
                02
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Set Up Integrations</h3>
                <p className="text-muted-foreground">
                  Easily connect your tools and start gathering insights.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-md flex size-11 shrink-0 items-center justify-center rounded-full bg-muted font-mono">
                03
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">
                  Collaborate Effortlessly
                </h3>
                <p className="text-muted-foreground">
                  Invite your team and begin working together instantly.
                </p>
              </div>
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg"
            alt="placeholder"
            className="aspect-video w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Feature119 };
