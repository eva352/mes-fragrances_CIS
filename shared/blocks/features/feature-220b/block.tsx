import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

const stats = [
  {
    number: "52%",
    text: "boost in user retention",
  },
  {
    number: "40%",
    text: "decrease in development time",
  },
  {
    number: "2.5x",
    text: "increase in feature adoption",
  },
];

interface Feature220bProps {
  className?: string;
}

const Feature220b = ({ className }: Feature220bProps) => {
  return (
    <section
      className={cn(
        "bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat py-20",
        className,
      )}
    >
      <div className="container">
        {/* Stats First */}
        <div className="mb-20 flex flex-wrap justify-center gap-12">
          {stats.map((item, i) => (
            <div key={`stats-${i}`} className="min-w-[12rem] text-center">
              <div className="mb-2 text-4xl font-semibold md:text-5xl">
                {item.number}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {item.text}
              </div>
            </div>
          ))}
        </div>

        {/* Content and Video Grid */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Video Left */}
          <div className="order-2 lg:order-1">
            <AspectRatio
              ratio={0.873239437}
              className="overflow-hidden rounded-2xl"
            >
              <video
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-8.mp4"
                className="block size-full object-cover object-center"
                loop
                autoPlay
                muted
                controls={false}
              />
            </AspectRatio>
          </div>

          {/* Content Right */}
          <div className="order-1 space-y-6 lg:order-2">
            <h2 className="text-4xl leading-none font-semibold tracking-tight md:text-5xl">
              Build Stunning Interfaces Faster Than Ever Before
            </h2>
            <p className="text-lg leading-[1.4] font-medium text-muted-foreground md:text-xl">
              Drag, drop, and customize ready-made components to speed up your
              workflow and create polished UIs in no time.
            </p>
            <div className="pt-4">
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Building
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature220b };
