import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface DataItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

const DATA: DataItem[] = [
  {
    id: "item-1",
    title: "Explore the Alps",
    description: "Experience breathtaking views",
    href: "/destinations/alps",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    id: "item-2",
    title: "Tropical Paradise",
    description: "Relax on pristine beaches",
    href: "/destinations/tropical",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: "item-3",
    title: "Cultural Wonders",
    description: "Immerse yourself in rich history",
    href: "/destinations/cultural",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "item-4",
    title: "Beautiful People",
    description: "Meet amazing people around the world",
    href: "/destinations/cultural",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
];

interface Gallery11Props {
  className?: string;
}

const Gallery11 = ({ className }: Gallery11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="my-8 flex items-center justify-between px-4 lg:px-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl">
          Discover Travel Destinations
        </h2>
        <Button variant="outline" className="rounded-full" asChild>
          <span>
            Explore All
            <ArrowRight className="size-4" />
          </span>
        </Button>
      </div>

      <div className="relative w-full overflow-hidden px-4 lg:px-10">
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
        >
          <CarouselContent>
            {DATA.map((item) => (
              <CarouselItem
                key={item.id}
                className="min-w-[350px] flex-1 cursor-pointer"
              >
                <a href={item.href} target="_self" className="group">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
                      style={{ aspectRatio: "3/4" }}
                    />
                    <div className="absolute bottom-6 left-6 max-w-[90%] min-w-[75%] rounded-2xl bg-background px-6 py-4 transition-all duration-500 ease-out group-hover:bg-black group-hover:text-white">
                      <div className="flex flex-col items-start">
                        <h5 className="text-sm font-semibold md:text-lg">
                          {item.title}
                        </h5>
                        <div className="flex items-center gap-4">
                          <h4 className="text-sm font-bold md:text-lg lg:text-xl">
                            {item.description}
                          </h4>
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery11 };
