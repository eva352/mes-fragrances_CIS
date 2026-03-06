"use client";

import Fade from "embla-carousel-fade";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Contact4Props {
  className?: string;
}

const Contact4 = ({ className }: Contact4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="max-w-xl">
          <h1 className="mb-3 text-xl font-medium text-muted-foreground">
            Contact us
          </h1>
          <p className="text-4xl font-medium text-balance md:text-5xl">
            Get in touch with us today to learn more
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
            <div>
              <h2 className="mb-4 text-xl font-medium md:text-2xl">Sales</h2>
              <p className="text-muted-foreground">
                Interested in learning more about our platform? Contact our
                sales team for more information.
              </p>
            </div>
            <a href="#" className="hover:underline">
              Request a demo
            </a>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
            <div>
              <h2 className="mb-4 text-xl font-medium md:text-2xl">Support</h2>
              <p className="text-muted-foreground">
                We’re here to help with any platform questions. Check out our
                FAQs and learn more.
              </p>
            </div>
            <a href="#" className="hover:underline">
              Get support
            </a>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
            <div>
              <h2 className="mb-4 text-xl font-medium md:text-2xl">
                General Inquiries
              </h2>
              <p className="text-muted-foreground">
                For general inquiries, please reach out to us using the form
                below.
              </p>
            </div>
            <a href="#" className="hover:underline">
              Contact us
            </a>
          </div>
        </div>
        <div className="mt-7">
          <Carousel
            plugins={[Fade()]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              <CarouselItem>
                <div className="relative flex h-full flex-col overflow-hidden rounded-t-lg md:max-h-[496px] md:rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/maps/map-1.png"
                    alt="placeholder"
                    className="h-full w-full rounded-t-lg object-cover md:rounded-lg"
                  />
                  <div className="bottom-8 left-8 flex flex-col justify-between gap-6 rounded-b-lg border-x border-b bg-background p-6 md:absolute md:max-w-96 md:rounded-lg md:border">
                    <div>
                      <h2 className="mb-4 text-xl font-medium md:text-2xl">
                        4 Locations Worldwide
                      </h2>
                      <p className="text-muted-foreground">
                        We have offices in New York, Paris, Kyiv, and Singapore.
                      </p>
                    </div>
                    <a href="#" className="hover:underline">
                      Learn more
                    </a>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative flex h-full flex-col overflow-hidden rounded-t-lg md:max-h-[496px] md:rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/maps/map-2.png"
                    alt="placeholder"
                    className="h-full w-full rounded-t-lg object-cover md:rounded-lg"
                  />
                  <div className="bottom-8 left-8 flex flex-col justify-between gap-6 rounded-b-lg border-x border-b bg-background p-6 md:absolute md:max-w-96 md:rounded-lg md:border">
                    <div>
                      <h2 className="mb-4 text-xl font-medium md:text-2xl">
                        New York, USA
                      </h2>
                      <p className="text-muted-foreground">
                        1 Liberty Plaza, 165 Broadway, New York, NY 10006
                      </p>
                    </div>
                    <a href="#" className="hover:underline">
                      See on Google Maps
                    </a>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative flex h-full flex-col overflow-hidden rounded-t-lg md:max-h-[496px] md:rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/maps/map-3.png"
                    alt="placeholder"
                    className="h-full w-full rounded-t-lg object-cover md:rounded-lg"
                  />
                  <div className="bottom-8 left-8 flex flex-col justify-between gap-6 rounded-b-lg border-x border-b bg-background p-6 md:absolute md:max-w-96 md:rounded-lg md:border">
                    <div>
                      <h2 className="mb-4 text-xl font-medium md:text-2xl">
                        Paris, France
                      </h2>
                      <p className="text-muted-foreground">
                        10 Rue de la Paix, 75002 Paris
                      </p>
                    </div>
                    <a href="#" className="hover:underline">
                      See on Google Maps
                    </a>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative flex h-full flex-col overflow-hidden rounded-t-lg md:max-h-[496px] md:rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/maps/map-4.png"
                    alt="placeholder"
                    className="h-full w-full rounded-t-lg object-cover md:rounded-lg"
                  />
                  <div className="bottom-8 left-8 flex flex-col justify-between gap-6 rounded-b-lg border-x border-b bg-background p-6 md:absolute md:max-w-96 md:rounded-lg md:border">
                    <div>
                      <h2 className="mb-4 text-xl font-medium md:text-2xl">
                        Kyiv, Ukraine
                      </h2>
                      <p className="text-muted-foreground">
                        1A Sportyvna Square, 01023 Kyiv
                      </p>
                    </div>
                    <a href="#" className="hover:underline">
                      See on Google Maps
                    </a>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative flex h-full flex-col overflow-hidden rounded-t-lg md:max-h-[496px] md:rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/maps/map-5.png"
                    alt="placeholder"
                    className="h-full w-full rounded-t-lg object-cover md:rounded-lg"
                  />
                  <div className="bottom-8 left-8 flex flex-col justify-between gap-6 rounded-b-lg border-x border-b bg-background p-6 md:absolute md:max-w-96 md:rounded-lg md:border">
                    <div>
                      <h2 className="mb-4 text-xl font-medium md:text-2xl">
                        Singapore, Singapore
                      </h2>
                      <p className="text-muted-foreground">
                        One Raffles Place, Singapore 048616
                      </p>
                    </div>
                    <a href="#" className="hover:underline">
                      See on Google Maps
                    </a>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="absolute right-6 bottom-2 flex gap-4 md:right-10 md:bottom-5">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Contact4 };
