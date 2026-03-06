import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

interface Feature207Props {
  className?: string;
}

const Feature207 = ({ className }: Feature207Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <p className="text-sm font-light">WORKFLOW</p>
        <h2 className="mt-2 text-3xl font-medium md:text-5xl">
          Capturing Perfect Moments
        </h2>
        <div className="mt-14">
          <Separator />
          <div className="py-8">
            <div className="flex gap-4 md:items-center">
              <span className="mt-0.5 font-mono text-muted-foreground md:mt-0">
                01
              </span>
              <div className="grid items-center gap-3 md:grid-cols-2 md:gap-8">
                <h3 className="text-2xl">Vision & Preparation</h3>
                <p className="text-muted-foreground">
                  We discuss your photographic goals, scout locations, and
                  develop a detailed shot list to ensure we capture your perfect
                  moments.
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="py-8">
            <div className="flex gap-4 md:items-center">
              <span className="mt-0.5 font-mono text-muted-foreground md:mt-0">
                02
              </span>
              <div className="grid items-center gap-3 md:grid-cols-2 md:gap-8">
                <h3 className="text-2xl">Shooting & Direction</h3>
                <p className="text-muted-foreground">
                  Our skilled photographers utilize professional equipment,
                  creative composition techniques, and expert lighting to create
                  stunning imagery.
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="py-8">
            <div className="flex gap-4 md:items-center">
              <span className="mt-0.5 font-mono text-muted-foreground md:mt-0">
                03
              </span>
              <div className="grid items-center gap-3 md:grid-cols-2 md:gap-8">
                <h3 className="text-2xl">Editing & Delivery</h3>
                <p className="text-muted-foreground">
                  We meticulously process each image with professional
                  retouching techniques to deliver a polished collection that
                  exceeds your expectations.
                </p>
              </div>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </section>
  );
};

export { Feature207 };
