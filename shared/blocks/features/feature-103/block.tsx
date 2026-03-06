import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature103Props {
  className?: string;
}

const Feature103 = ({ className }: Feature103Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-3">
          <Badge variant="outline" className="w-fit">
            CORE CAPABILITIES
          </Badge>
          <h2 className="text-2xl md:text-4xl">Discover our advanced tools</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-medium">
                Seamless Updates & Reversions
              </h3>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4" />
              </span>
            </div>
            <p className="text-muted-foreground">
              Gain complete insight into your deployment configurations and live
              performance.
            </p>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-medium">Effortless Rollbacks</h3>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4" />
              </span>
            </div>
            <p className="text-muted-foreground">
              Quickly revert to previous versions for smooth recovery.
            </p>
          </a>
          <div className="grid gap-6 md:col-span-2 md:grid-cols-3">
            <a
              href="#"
              className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-medium">Configuration Insights</h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                  <ArrowRight className="h-auto w-4" />
                </span>
              </div>
              <p className="text-muted-foreground">
                Monitor and evaluate your system settings for optimal
                performance.
              </p>
            </a>
            <a
              href="#"
              className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-medium">Automated Monitoring</h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                  <ArrowRight className="h-auto w-4" />
                </span>
              </div>
              <p className="text-muted-foreground">
                Leverage automated tracking to detect issues instantly.
              </p>
            </a>
            <a
              href="#"
              className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-medium">Performance Metrics</h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                  <ArrowRight className="h-auto w-4" />
                </span>
              </div>
              <p className="text-muted-foreground">
                Analyze detailed metrics to fine-tune your application’s
                efficiency.
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature103 };
