"use client";

import * as React from "react";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type CarouselApi = UseEmblaCarouselType[1];

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: EmblaOptionsType;
  plugins?: Parameters<typeof useEmblaCarousel>[1];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  api: CarouselApi | null;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} | null;

const CarouselContext = React.createContext<CarouselContextProps>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ orientation = "horizontal", opts, plugins, setApi, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    React.useEffect(() => {
      if (!api) return;
      setApi?.(api);

      const onSelect = () => {
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
      };

      onSelect();
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api.off("reInit", onSelect);
        api.off("select", onSelect);
      };
    }, [api, setApi]);

    return (
      <CarouselContext.Provider
        value={{
          api,
          canScrollNext,
          canScrollPrev,
          scrollNext: () => api?.scrollNext(),
          scrollPrev: () => api?.scrollPrev(),
        }}
      >
        <div ref={ref} className={cn("relative", className)} {...props}>
          <div ref={carouselRef}>{children}</div>
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className="overflow-hidden">
        <div className={cn("flex", className)} {...props} />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} role="group" className={cn("min-w-0 shrink-0 grow-0 basis-full", className)} {...props} />;
  },
);
CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselContent, CarouselItem, useCarousel };

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { canScrollPrev, scrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      type="button"
      variant={variant}
      size={size}
      className={cn("absolute left-2 top-1/2 -translate-y-1/2", className)}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    />
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { canScrollNext, scrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      type="button"
      variant={variant}
      size={size}
      className={cn("absolute right-2 top-1/2 -translate-y-1/2", className)}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    />
  );
});
CarouselNext.displayName = "CarouselNext";

export { CarouselNext, CarouselPrevious };
