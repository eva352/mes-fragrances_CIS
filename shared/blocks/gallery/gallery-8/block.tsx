import { MoveRight } from "lucide-react";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

const resources = [
  {
    title: "Getting Started with Templates",
    category: "guide",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Template Pricing & Plans",
    category: "pricing",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Introducing Our New Template Builder",
    category: "news",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "Modern Design Patterns: Creating Responsive Templates for 2025",
    category: "tutorial",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    title: "The Ultimate Guide to Template Customization",
    category: "ebook",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    title: "Template Success Stories: Year in Review",
    category: "blog",
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
];

interface Gallery8Props {
  className?: string;
}

const Gallery8 = ({ className }: Gallery8Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <h2 className="text-2xl font-bold text-pretty">
          Start building with our template collection
        </h2>
        <Carousel>
          <div className="mt-6 grid gap-x-14 gap-y-10 lg:mt-16 lg:grid-cols-3">
            <div className="order-3 flex flex-col gap-6 lg:order-none">
              {resources.slice(0, 3).map((resource, idx) => (
                <Fragment key={idx}>
                  <div className="flex flex-col gap-1">
                    <div className="font-mono text-sm text-muted-foreground uppercase">
                      {resource.category}
                    </div>
                    <a
                      href={resource.link}
                      className="group flex items-center gap-2 font-semibold"
                    >
                      {resource.title}
                      <MoveRight className="mt-0.5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                  <Separator />
                </Fragment>
              ))}
              <a
                href="#"
                className="group flex items-center gap-2 font-semibold"
              >
                View all resources
                <MoveRight className="mt-0.5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            <div className="order-1 lg:order-none lg:col-span-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]">
              <CarouselContent className="ml-0 max-w-[min(calc(100vw-4rem),24rem)] select-none sm:max-w-96">
                {resources.map((item, idx) => (
                  <CarouselItem
                    className={cn(
                      "w-fit border-y border-l border-border pl-0 transition-colors duration-300 hover:bg-muted/50",
                      idx === resources.length - 1 && "border-r",
                    )}
                    key={idx}
                  >
                    <a href={item.link} className="block h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-video object-cover"
                      />
                      <div className="px-6 py-8">
                        <div className="text-sm text-muted-foreground uppercase">
                          {item.category}
                        </div>
                        <h3 className="mt-2 text-xl font-semibold lg:text-2xl">
                          {item.title}
                        </h3>
                      </div>
                    </a>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
            <div className="order-2 flex items-center gap-4 lg:order-none lg:col-start-2">
              <CarouselPrevious className="static size-12 translate-x-0 translate-y-0" />
              <CarouselNext className="static size-12 translate-x-0 translate-y-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery8 };
