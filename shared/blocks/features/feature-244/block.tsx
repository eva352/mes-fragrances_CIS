import React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Feature244 = () => {
  // Enhanced feature data
  const features = [
    {
      title: "Seamless Collaboration",
      description:
        "Collaborate with your team in real-time, ensuring everyone stays on the same page and projects move forward efficiently.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    },
    {
      title: "Intuitive Interface",
      description:
        "Our user-friendly design makes it easy for anyone to get started, reducing the learning curve and boosting productivity.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    },
    {
      title: "Powerful Integrations",
      description:
        "Connect with your favorite tools and services to streamline your workflow and automate repetitive tasks.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain valuable insights with comprehensive analytics and reporting features to help you make data-driven decisions.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-xYFl3Q9am1E-unsplash.jpg",
    },
  ];

  return (
    <section className="bg-background">
      <div className="container py-32">
        <div className="mb-16 max-w-2xl space-y-8 pl-4">
          <h2 className="text-5xl font-bold tracking-tighter text-foreground md:text-6xl">
            Explore our features
          </h2>
          <p className="text-lg tracking-tight text-muted-foreground md:text-xl">
            Discover the powerful features that help transform your workflow and
            drive business success.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="p-2">
            {features.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <DottedDiv className="group h-[500px] place-self-end p-4">
                  <Card className="h-full w-full shrink-0 rounded-lg border border-border bg-muted">
                    <CardContent className="relative flex h-full flex-col items-center justify-center gap-6 p-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mb-4 size-40 rounded-lg object-cover"
                      />
                      <h3 className="mb-2 text-center text-2xl font-medium tracking-tighter text-foreground md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="text-center text-base tracking-tight text-muted-foreground md:text-lg">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </DottedDiv>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="my-3 flex justify-end gap-3 pr-5">
            <CarouselPrevious className="static m-0 size-12 translate-y-0 p-0" />
            <CarouselNext
              variant="default"
              className="static size-12 translate-y-0"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Feature244 };

const DottedDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("relative", className)}>
    <div className="absolute top-4 -left-0 h-[1.5px] w-[115%] bg-muted" />
    <div className="absolute bottom-4 -left-0 h-[1.5px] w-[115%] bg-muted" />
    <div className="absolute -top-25 left-4 h-[130%] w-[1.5px] bg-muted" />
    <div className="absolute -top-25 right-4 h-[130%] w-[1.5px] bg-muted" />
    <div className="absolute top-[12.5px] left-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute top-[12.5px] right-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute bottom-[12.5px] left-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute right-[12.5px] bottom-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    {children}
  </div>
);
