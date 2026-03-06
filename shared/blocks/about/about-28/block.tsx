import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Image {
  src: string;
  alt: string;
}

interface TextContent {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

interface About28Props {
  leftImages?: Image[];
  leftText?: TextContent;
  rightText?: TextContent;
  rightImages?: Image[];
  className?: string;
}

const About28 = ({
  leftImages = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "Team collaboration",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      alt: "Team workspace",
    },
  ],
  leftText = {
    title: "The team",
    paragraphs: [
      "We started building in 2019 and launched in 2022. Every endpoint has been designed from the ground up — with no technical debt or legacy systems. We are purpose-built to power project management innovation for the next hundred years.",
      "We are 100% founder and team-owned, profitable, and we keep our team lean. Over time, this page will become more polished, but for now, we're focused on delivering for developers.",
      "If you're interested in building the future of PM, check out our open roles below.",
    ],
    ctaButton: {
      href: "/careers",
      text: "View open roles",
    },
  },
  rightText = {
    paragraphs: [
      "We are dedicated to transforming the way teams plan, execute, and deliver projects. Our mission is to provide our customers with an unbeatable edge over delays, inefficiencies, and disorganisation through actionable insights and seamless collaboration.",
      "We're customer-obsessed — investing the time to understand every aspect of your workflow so that we can help you operate better than ever before. We're all in this together because your success is our success.",
    ],
  },
  rightImages = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      alt: "Modern workspace",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
      alt: "Team collaboration",
    },
  ],
  className,
}: About28Props) => {
  return (
    <section
      className={cn(
        "container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end",
        className
      )}
    >
      {/* Images Left - Text Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <ImageSection images={leftImages} className="xl:-translate-x-10" />
        <TextSection
          title={leftText.title}
          paragraphs={leftText.paragraphs}
          ctaButton={leftText.ctaButton}
        />
      </div>

      {/* Text Left - Images Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <TextSection paragraphs={rightText.paragraphs} />
        <ImageSection
          images={rightImages}
          className="hidden lg:flex xl:translate-x-10"
        />
      </div>
    </section>
  );
};

interface ImageSectionProps {
  images: Image[];
  className?: string;
}

const ImageSection = ({ images, className }: ImageSectionProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

interface TextSectionProps {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

const TextSection = ({ title, paragraphs, ctaButton }: TextSectionProps) => {
  return (
    <div className="flex-1 space-y-4 text-lg md:space-y-6">
      {title && <h2 className="text-foreground text-4xl">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <Button size="lg" asChild>
            <a href={ctaButton.href}>{ctaButton.text}</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export { About28 };
