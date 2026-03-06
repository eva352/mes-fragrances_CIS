import type { LucideIcon } from "lucide-react";
import { AudioLines, AudioWaveform } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";

type image = {
  src: string;
  alt: string;
};

type imageVariant = "1" | "2" | "3";

interface Item {
  title: string;
  summary: string;
  number?: string;
  images: Array<image>;
  Icon?: LucideIcon;
  variant: imageVariant;
}

interface CardImageProps {
  variant: imageVariant;
  images: Array<image>;
  Icon?: LucideIcon;
}

const LIST: Array<Item> = [
  {
    title: "Seamless File Upload",
    summary:
      "Effortlessly upload your files with our intuitive drag-and-drop interface. Supports all major file formats.",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-Kj2tYAl4HZg-unsplash.jpg",
        alt: "Upload interface",
      },
    ],
    Icon: AudioWaveform,
    variant: "1",
  },
  {
    title: "Secure and Fast",
    summary:
      "Experience lightning-fast uploads with top-notch security to keep your data safe and private.",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-3QqzCTIfUJI-unsplash.jpg",
        alt: "Secure upload",
      },
    ],
    variant: "2",
  },
  {
    title: "Manage Your Files",
    summary:
      "Organize and manage your uploaded files with ease. Access them anytime, anywhere.",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vasilis-karkalas-qOaeVSKyhhE-unsplash.jpg",
        alt: "File management",
      },
    ],
    Icon: AudioLines,
    variant: "3",
  },
];

const CardImage = ({ variant, images, Icon }: CardImageProps) => {
  switch (variant) {
    case "1":
      return (
        <div className="absolute right-[30%] bottom-[3.75rem]">
          <div className="aspect-[1.645714286] w-[25rem]">
            <div className="flex size-full items-center -space-x-[10%]">
              <div className="w-full shrink-0">
                <AspectRatio
                  className="overflow-hidden rounded-2xl"
                  ratio={1.558095238}
                >
                  <img
                    src={images[0].src}
                    alt={images[0].alt}
                    className="block size-full object-cover object-center"
                  />
                </AspectRatio>
              </div>
              <div className="w-[16%] shrink-0">
                <AspectRatio
                  className="w-full overflow-hidden rounded-lg shadow"
                  ratio={1}
                >
                  <div className="flex size-full bg-background">
                    {Icon && (
                      <Icon className="m-auto size-[65%] stroke-muted-foreground/80 stroke-1" />
                    )}
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      );
    case "2":
      return (
        <div className="absolute right-1/6 -bottom-[5%]">
          <div className="aspect-video w-[31.25rem] overflow-hidden rounded-2xl shadow-2xl sm:w-[42.5rem]">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="block size-full object-cover object-center"
            />
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute right-1/6 -bottom-[5%]">
          <div className="relative aspect-[1.195592287] w-[21.25rem] sm:w-[25rem]">
            <div className="absolute bottom-0 aspect-[1.287833828] w-full overflow-hidden rounded-2xl">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="block size-full object-cover object-center"
              />
            </div>
            <div className="absolute top-0 right-0 flex aspect-square w-[20%] translate-x-1/2 overflow-hidden rounded-lg bg-background shadow">
              {Icon && (
                <Icon className="m-auto size-[65%] stroke-muted-foreground/80 stroke-1" />
              )}
            </div>
          </div>
        </div>
      );
  }
};

const Card = ({ title, summary, images, Icon, number, variant }: Item) => {
  const numberBorderColor = "var(--muted-foreground)";
  return (
    <div
      className="relative flex h-full min-h-[39.375rem] w-full max-w-[34rem] flex-col justify-between gap-4 overflow-hidden rounded-[0.75rem] bg-muted"
      style={{ backgroundImage: "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/p6.png')" }}
    >
      <div className="flex w-full flex-col gap-4 p-10 pr-[3.75rem] pb-0 md:p-[3.75rem]">
        <h3 className="text-2xl leading-none">{title}</h3>
        <p className="text-xl leading-normal">{summary}</p>
      </div>
      <div className="relative size-full min-h-[21.875rem]">
        <CardImage images={images} Icon={Icon} variant={variant} />
      </div>
      <div
        className="absolute top-5 right-5 size-fit text-7xl leading-none font-light text-muted opacity-25"
        style={{
          textShadow: `
            2px 0 ${numberBorderColor}, -2px 0 ${numberBorderColor}, 
            0 2px ${numberBorderColor}, 0 -2px ${numberBorderColor},
            1px 1px ${numberBorderColor}, -1px -1px ${numberBorderColor}, 
            1px -1px ${numberBorderColor}, -1px 1px ${numberBorderColor}
          `,
        }}
      >
        {number}
      </div>
    </div>
  );
};

interface Feature219Props {
  className?: string;
}

const Feature219 = ({ className }: Feature219Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center justify-center gap-6 xl:grid-cols-3">
          {LIST.map((item, i) => (
            <Card number={`${++i}`} {...item} key={`card-feature219-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature219 };
