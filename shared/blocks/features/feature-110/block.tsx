"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Atom, ChevronRight, ShieldCheck, Star, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Feature110Props {
  className?: string;
}

const Feature110 = ({ className }: Feature110Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
          <Badge variant="outline">High Standards</Badge>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Create, Motivate, and Succeed
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Join the journey to build intricately crafted digital solutions.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-7 md:grid-cols-2">
          <div className="flex flex-col gap-7">
            <div className="rounded-xl border bg-muted p-8 md:p-10">
              <div className="mb-7 flex flex-wrap items-center gap-2.5">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background px-2.5 py-1.5 text-sm font-semibold"
                >
                  <Zap className="h-auto w-4" />
                  Fast
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background px-2.5 py-1.5 text-sm font-semibold"
                >
                  <ShieldCheck className="h-auto w-4" />
                  Solid
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background px-2.5 py-1.5 text-sm font-semibold"
                >
                  <Atom className="h-auto w-4" />
                  Sleek
                </Badge>
              </div>
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Dynamic Features
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Elevate your website with advanced design tools and interactive
                options.
              </p>
              <a
                href="#"
                className="mt-5 flex items-center gap-1 text-sm font-medium md:text-base"
              >
                View all capabilities
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
            <div className="rounded-xl border bg-muted pb-8 md:pb-10">
              <div className="p-8 md:p-10">
                <div className="mb-2.5 flex items-center justify-between">
                  <h3 className="font-semibold md:text-xl">Premium Quality</h3>
                  <Badge variant="outline" className="bg-background">
                    Special Access
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground md:text-base">
                  Get the best of both worlds with our high-quality designs.
                </p>
              </div>

              <Carousel
                opts={{
                  loop: true,
                }}
                plugins={[
                  AutoScroll({
                    speed: 0.8,
                  }),
                ]}
                className="relative max-w-[calc(100vw-64px)] overflow-hidden"
              >
                <CarouselContent className="">
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                </CarouselContent>
                <div className="absolute inset-0 bg-linear-to-r from-muted via-transparent to-muted"></div>
              </Carousel>
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <div className="rounded-xl border bg-muted p-8 md:p-10">
              <div className="mb-2.5 flex items-center gap-1">
                <Star className="h-auto w-5 fill-primary" />
                <Star className="h-auto w-5 fill-primary" />
                <Star className="h-auto w-5 fill-primary" />
                <Star className="h-auto w-5 fill-primary" />
                <Star className="h-auto w-5 fill-primary" />
              </div>
              <p className="mb-7 text-sm text-muted-foreground">
                From 15k+ users
              </p>
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Unmatched Organization
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Discover streamlined features for quick edits and optimal
                results.
              </p>
            </div>
            <div className="rounded-xl border bg-muted p-8 md:p-10">
              <div className="mb-14 flex justify-end">
                <Badge variant="outline" className="bg-background">
                  Exclusive
                </Badge>
              </div>
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Highly Structured
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Check out our versatile template for speedy updates and exports!
              </p>
              <a
                href="#"
                className="mt-5 flex items-center gap-1 text-sm font-medium md:text-base"
              >
                Explore all features
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature110 };
