"use client";

import { BookOpen, PenTool, Play } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero112Props {
  className?: string;
}

const Hero112 = ({ className }: Hero112Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className={cn("bg-background py-12 md:py-32", className)}>
      <div className="container max-w-[60rem]">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-medium lg:text-6xl">
              Find the perfect course for you
            </h1>
            <p className="text-lg text-muted-foreground lg:max-w-[80%]">
              Unlock exclusive access to premium tutorials, insider insights,
              and more. Enhance your creativity and elevate your learning
              journey.
            </p>
            <div className="relative z-10 flex flex-wrap items-center gap-6">
              <Button asChild variant="default">
                <a href="#">Explore Courses</a>
              </Button>
              <Button
                variant="ghost"
                className="group flex items-center gap-2 hover:bg-transparent"
                onClick={() => setIsVideoOpen(true)}
              >
                <div className="flex h-10 w-10 rounded-full bg-primary transition-transform group-hover:scale-110">
                  <Play className="m-auto h-5 w-5 fill-white stroke-white" />
                </div>
                <div>Course Video</div>
              </Button>
            </div>
          </div>
          <div>
            <div className="relative mx-auto mt-28 h-[21.25rem] w-[21.25rem] rounded-full bg-primary md:mx-0 md:mt-0 lg:h-[25rem] lg:w-[25rem]">
              <div className="absolute bottom-0 w-[21.25rem] overflow-hidden rounded-full lg:h-[25rem] lg:w-[25rem]">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt=""
                  className="w-full scale-100 object-cover object-center"
                />
              </div>
              <div className="absolute -right-5 bottom-10 flex w-[17.5rem] items-center justify-center gap-1 rounded-full bg-background px-4 py-3 shadow-md">
                <div className="flex -space-x-[0.875rem]">
                  {[
                    {
                      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
                      fallback: "AB",
                    },
                    {
                      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
                      fallback: "CD",
                    },
                    {
                      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
                      fallback: "EF",
                    },
                  ].map(({ src, fallback }, i) => (
                    <Avatar
                      key={i}
                      className="flex h-12 w-12 shrink-0 rounded-full border-4 border-white object-cover"
                    >
                      <AvatarImage src={src} alt="" />
                      <AvatarFallback>{fallback}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="flex-1 text-sm text-gray-800">
                  7000+ people already joined
                </div>
              </div>
              <div className="absolute top-0 right-0 flex h-[6.25rem] w-[6.25rem] rotate-12 rounded-3xl border-8 border-white bg-primary lg:h-[6.875rem] lg:w-[6.875rem]">
                <BookOpen className="m-auto h-[2.5rem] w-[2.5rem] stroke-white lg:h-[3.125rem] lg:w-[3.125rem]" />
              </div>
              <div className="absolute top-1/3 -left-10 flex h-[6.25rem] w-[6.25rem] -rotate-12 rounded-3xl border-8 border-white bg-primary lg:h-[6.875rem] lg:w-[6.875rem]">
                <PenTool className="m-auto h-[3.5rem] w-[3.5rem] -rotate-90 fill-white lg:h-[4.5rem] lg:w-[4.5rem]" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 rounded-3xl border p-6">
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex flex-1 flex-col gap-3 border-b-[1px] p-6 md:border-r-[1px] md:border-b-0">
              <div className="text-2xl font-medium text-primary lg:text-4xl">
                87
              </div>
              <div className="text-muted-foreground lg:text-lg">
                Courses by Experts
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 border-b-[1px] p-6 md:border-r-[1px] md:border-b-0">
              <div className="text-2xl font-medium text-primary lg:text-4xl">
                200+
              </div>
              <div className="text-muted-foreground lg:text-lg">
                Hours of Content
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="text-2xl font-medium text-primary lg:text-4xl">
                100%
              </div>
              <div className="text-muted-foreground lg:text-lg">
                User Satisfaction Rating
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
};

export { Hero112 };
