import {
  ArrowRight,
  Atom,
  Box,
  GitGraph,
  Hourglass,
  Layout,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature91Props {
  className?: string;
}

const Feature91 = ({ className }: Feature91Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto grid max-w-7xl gap-y-6 lg:grid-cols-2">
          <div className="rounded-md border p-6 md:p-10 lg:rounded-l-md lg:rounded-r-none lg:border-y lg:border-r-0 lg:border-l">
            <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
              Team Leads
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Use this platform to create seamless integrations, enhance
              functionality, and focus on growing your product with ease and
              efficiency.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
              >
                Browse features
                <ArrowRight className="h-auto w-4" />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
              >
                Create integrations
                <ArrowRight className="h-auto w-4" />
              </a>
            </div>
            <div className="mt-10">
              <div className="flex items-center gap-7 py-6">
                <Box className="h-auto w-8 shrink-0" />
                <p>
                  Set up integrations quickly and efficiently with our
                  user-friendly tools and APIs.
                </p>
              </div>
              <div className="flex items-center gap-7 border-y border-dashed border-primary py-6">
                <GitGraph className="h-auto w-8 shrink-0" />
                <p>
                  Expand your feature set without losing focus on core
                  objectives and timelines.
                </p>
              </div>
              <div className="flex items-center gap-7 py-6">
                <Atom className="h-auto w-8 shrink-0" />
                <p>
                  Enhance user engagement and reduce churn with optimized
                  solutions and workflows.
                </p>
              </div>
            </div>
          </div>
          <div className="dark rounded-md border bg-background p-6 text-primary md:p-10 lg:rounded-l-none lg:rounded-r-md">
            <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
              Developers
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Skip the hassle of building from scratch. Utilize our
              infrastructure, flexible APIs, and customization options to get
              things done.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
              >
                Access documentation
                <ArrowRight className="h-auto w-4" />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
              >
                Discover use cases
                <ArrowRight className="h-auto w-4" />
              </a>
            </div>
            <div className="mt-10">
              <div className="flex items-center gap-7 py-6">
                <Hourglass className="h-auto w-8 shrink-0" />
                <p>
                  Save time with ready-to-use infrastructure and real-time
                  solutions for your projects.
                </p>
              </div>
              <div className="flex items-center gap-7 border-y border-dashed border-primary py-6">
                <Layout className="h-auto w-8 shrink-0" />
                <p>
                  Scale easily to manage increasing data volumes as you grow
                  your user base.
                </p>
              </div>
              <div className="flex items-center gap-7 py-6">
                <ShieldCheck className="h-auto w-8 shrink-0" />
                <p>
                  Benefit from secure, compliant architecture with top-tier
                  encryption and data protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature91 };
