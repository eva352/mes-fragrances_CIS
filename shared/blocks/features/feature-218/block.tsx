import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Feature218Props {
  className?: string;
}

const Feature218 = ({ className }: Feature218Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="border-b">
        <div className="container flex w-full flex-col gap-6">
          <h2 className="font-serif text-5xl leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl">
            Go Pro, Build Better
          </h2>
          <div className="grid w-full gap-4 xl:grid-cols-[.33fr_.66fr]">
            <div className="flex flex-col gap-11">
              <div className="text-xl leading-[1.6] text-muted-foreground">
                Take your designs to the next level with Pro! Get access to
                premium UI blocks, advanced customization options, and new
                updates regularly.
              </div>
              <div>
                <Button asChild size="lg" className="w-full md:w-fit">
                  <a href="#">
                    Go Pro
                    <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
            <div className="pt-10 xl:pt-20">
              <div className="relative ml-auto w-full max-w-[50rem] after:absolute after:top-0 after:right-0 after:z-20 after:block after:h-full after:w-1/3 after:rounded-tr-2xl after:bg-linear-90 after:from-transparent after:to-background after:content-['']">
                <AspectRatio
                  ratio={1.932}
                  className="w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl"
                >
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                    alt=""
                    className="block size-full object-cover object-[50%_0%]"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature218 };
