import { MoonStar, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Hero107Props {
  className?: string;
}

const Hero107 = ({ className }: Hero107Props) => {
  return (
    <section
      className={cn("bg-muted bg-cover bg-center py-12 md:py-20", className)}
    >
      <div className="container">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-8">
          <div className="mx-auto flex max-w-[43.75rem] flex-col gap-8 lg:mx-0">
            <div className="flex flex-col gap-6">
              <div className="m-auto flex w-fit flex-nowrap items-center gap-2 rounded-3xl border px-4 py-2 lg:m-0">
                <Sparkles className="size-5" />
                <div className="text-base font-light">
                  Free Portfolio Template
                </div>
              </div>
              <h1 className="to-muted2 inline-block bg-linear-to-br from-foreground bg-clip-text text-center font-serif text-4xl text-transparent md:text-6xl md:leading-snug lg:text-left">
                Your Trusted Collaborator for Digital Services
              </h1>
            </div>
            <div>
              <div className="mx-auto w-fit lg:mx-0">
                <Button
                  asChild
                  className="group relative grid h-fit overflow-hidden rounded-full px-7 py-5 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset]"
                >
                  <a href="#">
                    <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip-btn overflow-hidden rounded-full [mask:linear-gradient(white,transparent_50%)] before:absolute before:[inset:0_auto_auto_50%] before:aspect-square before:w-[200%] before:[translate:-50%_-15%] before:rotate-[-90deg] before:animate-rotate-btn before:bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--color-muted)_360deg)] before:content-['']" />
                    <span className="backdrop absolute inset-[2.5px] rounded-full bg-black transition-colors duration-200 group-hover:bg-slate-900" />
                    <span className="text z-10 text-center font-medium text-white">
                      Click Here
                    </span>
                  </a>
                </Button>
              </div>
              <div
                className="my-9 h-[1px] w-full bg-black"
                style={{
                  background:
                    "linear-gradient(270deg, rgba(234, 232, 225, .2) 0%, rgba(17, 16, 17, .2) 50%, rgba(17, 16, 17, 0) 100%)",
                }}
              />
              <p className="mx-auto w-full max-w-[30rem] text-center text-lg font-light text-foreground lg:mx-0 lg:text-left">
                Assisting startups and brands in creating impactful and engaging
                solutions for their software requirements.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[31.25rem]">
            <div className="relative mx-auto w-full max-w-full lg:mx-0">
              <div className="w-full overflow-hidden rounded-3xl">
                <AspectRatio ratio={1}>
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                    alt="Responsive square image"
                    className="size-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="absolute right-0 bottom-0">
                <Button
                  asChild
                  variant="secondary"
                  className="m-4 flex h-fit items-center gap-2 rounded-xl px-5 py-4 text-xl font-semibold shadow-md"
                >
                  <a href="#">
                    <MoonStar className="size-6!" />
                    <div>Hire Me</div>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero107 };
