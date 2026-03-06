import { cn } from "@/lib/utils";

interface DashedLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedLine = ({
  orientation = "horizontal",
  className,
}: DashedLineProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "text-muted-foreground relative",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className
      )}
    >
      <div
        className={cn(
          isHorizontal
            ? [
                "h-px w-full",
                "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]",
              ]
            : [
                "h-full w-px",
                "bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]",
              ]
        )}
      />
    </div>
  );
};

interface FeatureImage {
  src: string;
  alt: string;
}

interface FeatureItem {
  title: string;
  description: string;
  images: FeatureImage[];
  isIconGrid?: boolean;
}

interface Feature343Props {
  heading?: string;
  topItems?: FeatureItem[];
  bottomItems?: FeatureItem[];
  className?: string;
}

const Feature343 = ({
  heading = "Streamline your resource allocation and execution",
  topItems = [
    {
      title: "Reusable issue templates.",
      description:
        "Draft lightning-fast documents with our Smart Instructions and Templates.",
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
          alt: "Issue template interface",
        },
      ],
    },
    {
      title: "Simplify your stack.",
      description: "No more Confluence, SharePoint, or Microsoft Word.",
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/jira.svg",
          alt: "Jira logo",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion.svg",
          alt: "Notion logo",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/asana.svg",
          alt: "Asana logo",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/drive.svg",
          alt: "Google Drive logo",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/excel.svg",
          alt: "Excel logo",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/word.svg",
          alt: "Word logo",
        },
      ],
      isIconGrid: true,
    },
  ],
  bottomItems = [
    {
      title: "Archive it.",
      description:
        "Keep your workspace clean by archiving completed projects.",
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
          alt: "Archive interface",
        },
      ],
    },
    {
      title: "Task discussions.",
      description: "Collaborate with your team directly on tasks.",
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
          alt: "Task discussions interface",
        },
      ],
    },
    {
      title: "Notifications.",
      description: "Stay updated with real-time notifications.",
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
          alt: "Notifications interface",
        },
      ],
    },
  ],
  className,
}: Feature343Props) => {
  return (
    <section className={cn("overflow-hidden pb-28 lg:pb-32", className)}>
      <div>
        <h2 className="container text-center text-3xl tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          {heading}
        </h2>

        <div className="mt-8 md:mt-12 lg:mt-20">
          <DashedLine
            orientation="horizontal"
            className="container scale-x-105"
          />

          {/* Top Features Grid - 2 items */}
          <div className="container relative flex max-md:flex-col">
            {topItems.map((item, i) => (
              <FeatureCard
                key={i}
                item={item}
                isLast={i === topItems.length - 1}
              />
            ))}
          </div>
          <DashedLine
            orientation="horizontal"
            className="container max-w-7xl scale-x-110"
          />

          {/* Bottom Features Grid - 3 items */}
          <div className="container relative grid max-w-7xl md:grid-cols-3">
            {bottomItems.map((item, i) => (
              <FeatureCard
                key={i}
                item={item}
                isLast={i === bottomItems.length - 1}
                className="md:pb-0"
              />
            ))}
          </div>
        </div>
        <DashedLine
          orientation="horizontal"
          className="container max-w-7xl scale-x-110"
        />
      </div>
    </section>
  );
};

interface FeatureCardProps {
  item: FeatureItem;
  isLast?: boolean;
  className?: string;
}

const FeatureCard = ({ item, isLast, className }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-1 flex-col justify-between px-0 py-6 md:px-6 md:py-8",
        className
      )}
    >
      <div className="mb-5 text-balance md:mb-8">
        <h3 className="inline font-semibold">{item.title} </h3>
        <span className="text-muted-foreground">{item.description}</span>
      </div>

      {item.isIconGrid ? (
        <div className="relative overflow-hidden">
          <div className="flex flex-wrap gap-4">
            {item.images.map((image, j) => (
              <div
                key={j}
                className="bg-background grid aspect-square size-14 place-items-center rounded-xl p-2 lg:size-16"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="size-8 object-contain lg:size-10"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {item.images.map((image, j) => (
            <img
              key={j}
              src={image.src}
              alt={image.alt}
              className="h-auto max-h-64 w-auto max-w-full object-contain object-left-top"
            />
          ))}
        </div>
      )}

      {!isLast && (
        <>
          <DashedLine
            orientation="vertical"
            className="absolute top-0 right-0 max-md:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute inset-x-0 bottom-0 md:hidden"
          />
        </>
      )}
    </div>
  );
};

export { Feature343 };
