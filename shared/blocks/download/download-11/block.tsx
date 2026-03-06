import { cn } from "@/lib/utils";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";

interface Download11Props {
  className?: string;
}

const Download11 = ({ className }: Download11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-10 md:gap-14 lg:flex-row lg:items-stretch">
          <div className="flex max-w-md flex-col items-start justify-between gap-8 text-center lg:text-left">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-bold">Download for Windows</h1>
                <p className="text-muted-foreground lg:text-xl">
                  With our desktop app, productivity is just a click away.
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                <Button size="lg" className="w-full">
                  Download .MSI
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Download .EXE
                </Button>
                <Button
                  variant="link"
                  size="lg"
                  className="w-full px-0 sm:col-span-2 lg:justify-start"
                >
                  Download from Microsoft Store
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 text-sm text-muted-foreground">
              <p>Compatible with Windows 7, 8, 10 and 11</p>
              <p>
                Version 4.2.0 -{" "}
                <a href="#" className="text-primary hover:underline">
                  View Release Notes
                </a>
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border p-1">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/dashboard-1.png"
              alt="placeholder"
              className="rounded-lg dark:hidden"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/dashboard-dark-1.png"
              alt="placeholder"
              className="hidden dark:block"
            />
            <BorderBeam duration={8} size={400} />
            <BorderBeam duration={8} delay={3} size={400} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Download11 };
