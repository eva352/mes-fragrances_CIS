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

interface Feature220Props {
  className?: string;
}

const Feature220 = ({ className }: Feature220Props) => {
  return (
    <section
      className={cn(
        "bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat py-20",
        className,
      )}
    >
      <div className="container flex flex-wrap-reverse gap-12 lg:grid lg:grid-cols-[1fr_1.5fr] lg:gap-[7.5rem]">
        <div className="flex flex-col justify-between gap-20">
          <div className="mt-10 flex flex-col gap-5">
            <h2 className="text-4xl leading-none font-semibold tracking-tight md:text-5xl">
              Build Stunning Interfaces Faster Than Ever Before
            </h2>
            <p className="text-lg leading-[1.4] font-medium text-muted-foreground md:text-xl">
              Drag, drop, and customize ready-made components to speed up your
              workflow and create polished UIs in no time.
            </p>
            <div>
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Building
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div>
            <div className="group flex w-full max-w-[30rem] flex-col gap-10 rounded-[.5rem] bg-background p-5 transition-shadow hover:shadow-[0_0_2px_theme('colors.gray.300')]">
              <div className="flex w-full flex-col gap-8 sm:flex-row">
                {stats.map((item, i) => (
                  <div
                    className="flex flex-col gap-1"
                    key={`stats-use-case-${i}`}
                  >
                    <div className="text-xl font-semibold">{item.number}</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[46.5rem]">
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
      </div>
    </section>
  );
};

export { Feature220 };
