import { CirclePlus } from "lucide-react";

import { cn } from "@/lib/utils";

type StatCard = {
  value: string;
  label: string;
  description?: string;
  logos?: string[];
};

interface Feature312Props {
  sectionLabel?: string;
  heading: string;
  subheading?: string;
  descriptionHeading?: string;
  description?: string;
  image: string;
  stats: StatCard[];
  className?: string;
}

const Feature312 = ({
  sectionLabel = "Our Impact",
  heading = "Transforming ideas into lasting experiences, ",
  subheading = "through thoughtful design and reliable technology.",
  descriptionHeading = "Built for growth, not just launch.",
  description = "We craft digital products that scale with your business. From concept to production, our team focuses on performance, precision, and design systems that stand the test of time.",
  image = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img9.jpeg",
  stats = [
    {
      value: "120+",
      label: "Projects launched worldwide",
      description:
        "From startups to global brands, we’ve helped over 120 clients build meaningful digital experiences that deliver measurable impact.",
    },
    {
      value: "98%",
      label: "Client retention rate",
      logos: [
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      ],
    },
  ],
  className,
}: Feature312Props) => {
  return (
    <section className={cn("bg-muted py-24", className)}>
      <div className="container mx-auto flex max-w-7xl flex-col gap-2 md:gap-30">
        {/* Section label and heading row */}
        <div className="flex flex-col gap-2 md:grid md:auto-rows-[minmax(0,1fr)] md:grid-cols-[repeat(4,minmax(50px,1fr))] md:grid-rows-[repeat(1,minmax(0,1fr))] md:gap-8">
          {/* Section label */}
          <div className="flex items-center gap-2 text-xs font-bold md:text-sm">
            <CirclePlus size={20} />
            <span>{sectionLabel}</span>
          </div>

          {/* Heading */}
          <div className="col-span-3 max-w-3xl">
            <h2 className="text-2xl leading-tight font-bold tracking-tight md:text-4xl">
              {heading}
              <span className="block font-semibold text-muted-foreground">
                {subheading}
              </span>
            </h2>
          </div>
        </div>

        {/* Main content: image on left, content on right */}
        <div className="relative flex flex-col gap-4 md:grid md:auto-rows-[minmax(0,1fr)] md:grid-cols-[repeat(4,minmax(50px,1fr))] md:grid-rows-[repeat(1,minmax(0,1fr))] md:gap-10">
          {/* Left Image */}
          <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-muted bg-background md:col-span-2">
            <img
              src={image}
              alt="Why choose us image"
              className="aspect-video h-full w-full object-cover"
            />
            <div className="absolute top-10 right-10">
              <CirclePlus size={20} />
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-2 flex flex-col gap-16">
            {/* Description */}
            <div className="w-5/6">
              <p className="col-span-3 indent-10 text-xl font-medium">
                {descriptionHeading}
                <span className="text-muted-foreground">{description}</span>
              </p>
            </div>

            {/* Statistics Cards - 2x2 Grid */}
            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
              {/* Card 1 (Top-Left) */}
              <div className="order-1 rounded-2xl bg-background p-8 md:order-1">
                <div className="flex items-start justify-between">
                  <div className="text-3xl font-bold md:text-5xl">
                    {stats[0]?.value}
                  </div>
                  <div className="text-xs text-muted-foreground">01</div>
                </div>
              </div>

              {/* Card 2 (Top-Right) */}
              <div className="order-3 rounded-2xl bg-background p-8 md:order-2">
                <div className="flex items-start justify-between">
                  <div className="text-3xl font-bold md:text-5xl">
                    {stats[1]?.value}
                  </div>
                  <div className="text-xs text-muted-foreground">02</div>
                </div>
              </div>

              {/* Card 3 (Bottom-Left) */}
              <div className="order-2 flex min-h-80 flex-col justify-between gap-16 rounded-2xl bg-background p-8 md:order-3">
                <div className="text-right">
                  <div className="justify-self-end text-lg font-bold md:w-3/4">
                    {stats[0]?.label}
                  </div>
                </div>
                <div className="text-muted-foreground">
                  {stats[0]?.description}
                </div>
              </div>

              {/* Card 4 (Bottom-Right) */}
              <div className="order-4 flex h-80 h-full flex-col justify-between gap-16 rounded-2xl bg-background p-8 md:order-4">
                <div className="text-right">
                  <div className="justify-self-end text-lg font-bold md:w-3/4">
                    {stats[1]?.label}
                  </div>
                </div>
                <div className="flex justify-between gap-3 text-muted-foreground">
                  <div>
                    <img
                      src={stats[1]?.logos?.[0]}
                      alt="logo"
                      className="h-6 w-14"
                    />
                  </div>
                  <div>
                    <img
                      src={stats[1]?.logos?.[1]}
                      alt="logo"
                      className="h-6 w-14"
                    />
                  </div>
                  <div>
                    <img
                      src={stats[1]?.logos?.[2]}
                      alt="logo"
                      className="h-6 w-14"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature312 };
