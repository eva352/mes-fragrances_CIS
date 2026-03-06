"use client";
import { Play } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero116Props {
  className?: string;
}

const Hero116 = ({ className }: Hero116Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <Fragment>
      <section
        className={cn("font-dm_sans bg-background py-12 md:py-24", className)}
      >
        <div className="container max-w-[1440px]">
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center gap-8">
              <h1 className="max-w-[1000px] text-center text-[3.125rem] leading-none text-foreground md:text-[4.25rem] lg:text-[5.5rem]">
                Unlock impactful solutions for accelerated software growth
              </h1>
              <p className="max-w-[53.125rem] text-center text-lg leading-snug text-muted-foreground md:text-xl">
                Sign up on our website and use your account for as long as you’d
                like. Our team is always available to assist and dedicated to
                solving any issues you encounter.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
                <Button
                  onClick={() => setIsVideoOpen(true)}
                  asChild
                  className="group flex h-fit w-fit items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-base"
                >
                  <a href="#">
                    <span className="block overflow-hidden">
                      <span
                        data-text="See How it Works"
                        className="relative block text-nowrap transition-all group-hover:-translate-y-[110%] after:absolute after:top-[110%] after:left-0 after:h-full after:w-full after:content-[attr(data-text)]"
                      >
                        See How it Works
                      </span>
                    </span>
                    <Play className="size-4!" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="group block h-fit w-fit overflow-hidden rounded-full px-5 py-2 text-center text-base text-foreground"
                >
                  <a href="#">
                    <span className="block overflow-hidden">
                      <span
                        data-text="Get Started Now"
                        className="relative block text-nowrap transition-all group-hover:-translate-y-[110%] after:absolute after:top-[110%] after:left-0 after:h-full after:w-full after:content-[attr(data-text)]"
                      >
                        Get Started Now
                      </span>
                    </span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="w-full py-[16%]">
              <div className="border-muted2 relative aspect-[2.716981132/1] w-full border">
                <div className="absolute -top-[28%] left-[18%] w-[28.47%] max-w-[25.625rem]">
                  <AspectRatio ratio={1.11372549 / 1}>
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
                <div className="absolute -top-[28%] left-[51%] w-[18.75%] max-w-[16.875rem]">
                  <AspectRatio ratio={0.845559846 / 1}>
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
                <div className="absolute -bottom-[14%] left-[51%] w-[38.19%] max-w-[34.375rem]">
                  <AspectRatio ratio={1.686153846 / 1}>
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
                <div className="absolute -bottom-[30%] left-[10.7%] w-[38.19%] max-w-[34.375rem]">
                  <AspectRatio ratio={1.415041783 / 1}>
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export { Hero116 };
