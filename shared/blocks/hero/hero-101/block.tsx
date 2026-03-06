"use client";

import { PlayIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero101Props {
  className?: string;
}

const Hero101 = ({ className }: Hero101Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  return (
    <>
      <section
        className={cn(
          "relative overflow-hidden border border-b pt-40 pb-10 font-sans shadow-[inset_0_-4px_10px_var(--color-primary)] before:absolute before:-top-[88%] before:left-1/2 before:block before:h-[200%] before:w-[200%] before:-translate-x-1/2 before:bg-[radial-gradient(var(--color-violet-100)_15%,var(--color-transparent)_20%,var(--color-yellow-50)_30%,var(--color-transparent)_50%,var(--color-cyan-50)_60%)] before:bg-cover before:bg-no-repeat before:opacity-55 before:content-['']",
          className,
        )}
      >
        <div className="relative z-20 container max-w-[84rem]">
          <div className="mx-auto flex max-w-[54.375rem] flex-col items-center gap-4">
            <h1 className="text-center text-4xl leading-none font-bold text-black sm:text-5xl md:text-[4rem]">
              The ultimate all-in-one User Management Platform
            </h1>
            <p className="text-center text-base text-muted-foreground md:text-lg">
              We offers a full suite of embeddable UIs, versatile APIs, and
              admin dashboards to authenticate and manage your users
              effortlessly.
            </p>
            <div className="flex flex-col items-center gap-3 pt-4 md:flex-row">
              <Button
                asChild
                variant="default"
                className="border px-3 py-1.5 text-sm font-medium"
              >
                <a href="#">Start for Free</a>
              </Button>
              <Button
                asChild
                variant="ghost"
                onClick={() => setIsVideoOpen(true)}
                className="flex w-fit items-center gap-3 hover:bg-transparent"
              >
                <a href="#">
                  <div className="relative h-7 w-7 rounded-full p-[3px] before:absolute before:top-0 before:left-0 before:block before:h-full before:w-full before:animate-[spin_5s_ease-in-out_infinite] before:rounded-full before:bg-linear-to-r before:from-primary before:to-transparent before:content-['']">
                    <div className="relative z-20 flex h-full w-full rounded-full bg-background">
                      <PlayIcon className="m-auto h-3! w-3! fill-primary stroke-primary" />
                    </div>
                  </div>
                  <p className="text-sm/5 font-medium text-primary">
                    Watch Demo{" "}
                    <span className="ml-1 text-xs text-muted-foreground">
                      2 min
                    </span>
                  </p>
                </a>
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-20 max-w-[60rem] lg:max-w-full">
            <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {Array(7)
                  .fill(null)
                  .map((_, i) => (
                    <img
                      key={`hero101-${i}`}
                      src={`https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-${++i}.svg`}
                      alt=""
                      className="h-6 w-28 object-contain object-center"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[50rem]">
          <DialogHeader>
            <DialogTitle>Presentation Video</DialogTitle>
          </DialogHeader>
          <AspectRatio ratio={16 / 9}>
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/your-video-id"
              title="Presentation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </AspectRatio>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { Hero101 };
