import { type SVGProps, useId } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface About8Props {
  className?: string;
}

const About8 = ({ className }: About8Props) => {
  return (
    <section className={cn("py-32", className)}>
      {/* Hero Section */}
      <section className="relative container max-w-5xl py-10 md:py-12 lg:py-15">
        <div className="">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            A different
            <br />
            kind of bank.
          </h1>
          <p className="mt-4 max-w-2xl text-2xl text-muted-foreground md:text-3xl">
            We&apos;re on a mission to transform financial services by
            harnessing vast amounts of untapped financial data.
          </p>
        </div>
        {/* Background decoration */}
        <>
          <div className="absolute -inset-40 z-[-1] [mask-image:radial-gradient(circle_at_center,black_0%,black_20%,transparent_80%)]">
            <PlusSigns className="h-full w-full text-foreground/[0.05]" />
          </div>
        </>
      </section>

      {/* Stats Section */}
      <section className="container max-w-5xl border-y py-5">
        <h2 className="font-mono text-sm font-semibold tracking-widest text-accent-foreground">
          By the numbers
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              $150M
            </h3>
            <p className="mt-1 font-medium text-muted-foreground">Raised</p>
          </div>
          <div>
            <h3 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              20K
            </h3>
            <p className="mt-1 font-medium text-muted-foreground">Companies</p>
          </div>
          <div>
            <h3 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              1.3B
            </h3>
            <p className="mt-1 font-medium text-muted-foreground">
              Monthly transactions
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              1.5K
            </h3>
            <p className="mt-1 font-medium text-muted-foreground">
              Connections per minute
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container max-w-5xl py-10 md:py-12 lg:py-15">
        <div className="max-w-2xl space-y-5 md:space-y-8 lg:space-y-10">
          <p className="text-lg">
            Financial services have changed, are changing, and will continue to
            change — for the better. Now is the time for finance to be
            developer-first and API-driven. But in order to do this — it needs a
            new foundation.
          </p>

          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            We were always told that banks can&apos;t be platforms.
          </h2>
          <p className="text-lg">
            Everyone tried fixing the problem by layering APIs on legacy
            systems, creating abstractions and inefficiencies. We have spent
            years building and scaling companies like Plaid, Stripe, and Affirm,
            confronting these limitations firsthand. The current solutions
            aren&apos;t good enough. We believe that banking infrastructure must
            be reimagined as an API platform. But we had to start from ground
            zero.
          </p>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="my-5 pb-10 md:my-8 md:pb-12 lg:my-12 lg:pb-15">
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="-ml-4">
            <CarouselItem className="basis-[80%] lg:basis-1/3 xl:basis-[40%]">
              <div className="relative h-[330px] lg:h-[440px] xl:h-[600px]">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="Charter team member working"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[80%] lg:basis-1/3 xl:basis-[40%]">
              <div className="relative h-[330px] lg:h-[440px] xl:h-[600px]">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="Modern workspace setup"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[80%] lg:basis-1/3 xl:basis-[40%]">
              <div className="relative h-[330px] lg:h-[440px] xl:h-[600px]">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="Team collaboration"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      {/* CoreAPI Section */}
      <section className="container">
        <div className="mr-0 ml-auto max-w-2xl space-y-5 md:space-y-8 lg:space-y-10">
          <p className="text-lg">
            We started building CoreAPI in 2019 and launched in 2022. Every
            endpoint has been designed from the ground up — with no technical
            debt or legacy systems. We are purpose-built to power financial
            innovation for the next hundred years.
          </p>

          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            We are a bit of a unique company — not your standard tech or fintech
            company.
          </h2>

          <p className="text-lg">
            We are 100% founder and team-owned, profitable, and we keep our team
            lean. Over time, this page will become more polished, but for now,
            we&apos;re focused on delivering for developers.
          </p>
        </div>
      </section>

      {/* Founding Team Section */}
      <section className="container py-10 md:py-12 lg:py-15">
        <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-semibold tracking-tight md:text-4xl">
              The founding team
            </h2>
            <p className="mt-5 text-lg md:mt-6">
              We started building CoreAPI in 2019 and launched in 2022. Every
              endpoint has been designed from the ground up — with no technical
              debt or legacy systems. We are purpose-built to power financial
              innovation for the next hundred years. We are 100% founder and
              team-owned, profitable, and we keep our team lean. Over time, this
              page will become more polished, but for now, we&apos;re focused on
              delivering for developers. If you&apos;re interested in building
              the future of financial APIs, check out our open roles below.
            </p>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="Founding team collaboration"
            width={480}
            height={400}
            className="order-1 object-cover md:order-2"
          />
        </div>
      </section>
    </section>
  );
};

interface PlusSignsProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const PlusSigns = ({ className, ...props }: PlusSignsProps) => {
  const GAP = 16;
  const STROKE_WIDTH = 1;
  const PLUS_SIZE = 6;
  const id = useId();
  const patternId = `plus-pattern-${id}`;

  return (
    <svg width={GAP * 2} height={GAP * 2} className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

export { About8 };
