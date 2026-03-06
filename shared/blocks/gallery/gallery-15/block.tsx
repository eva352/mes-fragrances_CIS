"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface DatItem {
  id: string;
  title: string;
  price: string;
  image: string;
  hoverImage: string;
  tag: string;
}

const DATA: DatItem[] = [
  {
    id: "1",
    title: "Custom Web Development",
    price: "$1,500",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    tag: "Tailored Solutions",
  },
  {
    id: "2",
    title: "Mobile App Development",
    price: "$2,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    tag: "iOS & Android",
  },
  {
    id: "3",
    title: "Cloud Solutions",
    price: "$3,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-majMgWtrF48-unsplash.jpg",
    tag: "Scalable Infrastructure",
  },
  {
    id: "4",
    title: "UI/UX Design",
    price: "$1,200",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-xYFl3Q9am1E-unsplash.jpg",
    tag: "User-Centric Design",
  },
  {
    id: "5",
    title: "E-Commerce Platforms",
    price: "$2,500",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    tag: "Seamless Shopping",
  },
  {
    id: "6",
    title: "AI & Machine Learning",
    price: "$5,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    tag: "Smart Automation",
  },
  {
    id: "7",
    title: "DevOps Services",
    price: "$2,800",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    tag: "Efficient Workflows",
  },
  {
    id: "8",
    title: "Cybersecurity Solutions",
    price: "$4,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
    hoverImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-majMgWtrF48-unsplash.jpg",
    tag: "Secure Systems",
  },
];

interface Gallery15Props {
  className?: string;
}

const Gallery15 = ({ className }: Gallery15Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  // Calculate the progress bar width and position
  const progressWidth = 240;
  const progressIndicatorWidth = progressWidth / DATA.length;
  const progressOffset = currentIndex * progressIndicatorWidth;

  return (
    <section className={cn("py-32", className)}>
      <div className="px-4 lg:px-10">
        <div className="mb-6 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Our Services</h2>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="px-4 pb-10 lg:px-10">
            {DATA.map((product) => (
              <CarouselItem key={product.id} className="min-w-[334px] flex-1">
                <a
                  href={`/services/${product.id}`}
                  className="group relative flex h-full flex-col items-start justify-start gap-2"
                >
                  <div className="w-full">
                    <div className="group relative z-10 overflow-hidden rounded-2xl">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        style={{ aspectRatio: "3/4" }}
                      />
                      <img
                        src={product.hoverImage}
                        alt={product.title}
                        className="absolute top-0 left-0 z-10 h-full w-full rounded-2xl object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ aspectRatio: "3/4" }}
                      />

                      <Badge
                        className="absolute top-4 left-4 bg-background px-4 py-2"
                        variant="outline"
                      >
                        {product.tag}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3>{product.title}</h3>
                    <span>
                      Starting at <span>{product.price}</span>
                    </span>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded bg-gray-200">
          <div
            className="h-[2px] rounded bg-black transition-transform duration-300 ease-out"
            style={{
              width: `${progressIndicatorWidth}px`,
              transform: `translateX(${progressOffset}px)`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export { Gallery15 };
