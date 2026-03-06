import { FileCode, Layers } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Cta19Props {
  className?: string;
}

const Cta19 = ({ className }: Cta19Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col rounded-xl border lg:flex-row">
          <div className="grow px-8 py-8 lg:px-16">
            <Badge variant="outline">Get Started</Badge>
            <div className="mt-4 max-w-xl">
              <h2 className="text-3xl font-semibold md:text-4xl">
                Transform your workflow with our enterprise solution
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Our platform streamlines complex operations at scale, providing
                comprehensive insights and intelligent automation capabilities.
                Achieve greater efficiency and productivity with our proven
                enterprise tools.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button>Start free trial</Button>
              <Button variant="outline">Schedule demo</Button>
            </div>
          </div>
          <div className="flex grow basis-5/12 flex-col justify-between border-t lg:border-t-0 lg:border-l">
            <a
              href="#"
              className="flex h-full items-center px-9 py-6 transition-colors hover:bg-muted/50 lg:justify-center"
            >
              <div className="flex gap-4">
                <FileCode
                  className="size-8 shrink-0 md:size-10"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold md:text-xl">
                    Documentation
                  </h3>
                  <p className="max-w-lg text-muted-foreground md:text-lg">
                    Learn more about our platform&apos;s features and
                    capabilities.
                  </p>
                </div>
              </div>
            </a>
            <Separator />
            <a
              href="#"
              className="flex h-full items-center px-9 py-6 transition-colors hover:bg-muted/50 lg:justify-center"
            >
              <div className="flex gap-4">
                <Layers
                  className="size-8 shrink-0 md:size-10"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold md:text-xl">
                    Interactive Demo
                  </h3>
                  <p className="max-w-lg text-muted-foreground md:text-lg">
                    Experience our platform firsthand with an interactive
                    demonstration of key features.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta19 };
