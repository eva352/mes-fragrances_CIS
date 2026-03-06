import { ArrowRight } from "@/components/icons";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta21Props {
  className?: string;
}

const Cta21 = ({ className }: Cta21Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[500px]">
          <img
            src="/blocks/cta/cta-21/photo-1507623457503-9743b35aea95"
            alt="placeholder"
            className="h-full w-full bg-bottom object-cover"
          />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 p-6">
            <h2 className="text-center text-2xl font-semibold md:text-4xl">
              Innovation. Control. Success.
            </h2>
            <Button size="lg">
              Get Started Now
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta21 };

export default Cta21;
