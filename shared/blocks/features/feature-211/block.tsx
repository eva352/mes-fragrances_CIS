"use client";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Eye, ScanFace, Users, View } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type imageType = {
  src: string;
  alt?: string;
};

type variantType = "1" | "2" | "3" | "4";

interface list {
  icon: LucideIcon;
  title: string;
  tabName: string;
  summary: string;
  imageComponent: variantType;
  images: Array<imageType>;
  link?: {
    name: string;
    href: string;
  };
}
const TAB_LIST: Array<list> = [
  {
    icon: ScanFace,
    title: "Focus on Active Speaker",
    tabName: "Center Active Speaker",
    summary:
      "Keep the speaker front and center—perfect for social media clips. No cropping, no resizing—just one click!",
    imageComponent: "1",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        alt: "",
      },
    ],
  },
  {
    icon: Eye,
    title: "Maintain eye contact",
    tabName: "Eye Contact",
    summary:
      "Feel free to read from your script—our app will adjust your gaze, ensuring the viewer sees you looking directly into the camera, even if you weren't.",
    imageComponent: "2",
    link: {
      name: "Learn more",
      href: "",
    },
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        alt: "",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
        alt: "",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
        alt: "",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg",
        alt: "",
      },
    ],
  },
  {
    icon: View,
    title: "Green Screen",
    tabName: "Green Screen",
    summary:
      "Skip the messy home studio and green screen setup—our app smartly removes your background, allowing you to replace it with any image or video you choose.",
    imageComponent: "3",
    link: {
      name: "Learn more",
      href: "",
    },
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        alt: "",
      },
    ],
  },
  {
    icon: Users,
    title: "Automatic multicam",
    tabName: "Automatic multicam",
    summary:
      "Simply upload your multicam video files, and let our app cut to the speaker automatically. One more time-consuming task, done with just a click.",
    imageComponent: "4",
    link: {
      name: "Learn more",
      href: "",
    },
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
        alt: "",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
        alt: "",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
        alt: "",
      },
    ],
  },
];

interface ImagesProps {
  images: Array<imageType>;
  variant?: variantType;
}

const Images = ({ images, variant = "1" }: ImagesProps) => {
  const positions = [
    {
      top: "12%",
      right: "36%",
      rotate: "2.6deg",
    },
    {
      top: "12%",
      right: "70%",
      rotate: "-2.4deg",
    },
    {
      bottom: "16%",
      right: "35%",
      rotate: "1.6deg",
    },
    {
      bottom: "15%",
      right: "2%",
      rotate: "-1.5deg",
    },
  ];

  switch (variant) {
    case "1":
      return (
        <div className="ml-auto aspect-[0.930372149] h-full max-h-[38.75rem] overflow-hidden rounded-tl-[0.5rem] rounded-bl-[0.5rem]">
          <img
            className="block size-full object-cover object-center"
            src={images[0].src}
            alt={images[0].alt}
          />
        </div>
      );
    case "2":
      return (
        <div className="size-full pr-4">
          <div className="relative ml-auto aspect-[0.930372149] h-full max-h-[38.75rem] overflow-hidden rounded-[0.625rem]">
            {images.map((img, i) => (
              <div
                style={{ ...positions[i] }}
                className="absolute aspect-[0.845360825] w-[30%] overflow-hidden rounded-[0.5rem] shadow-md"
                key={`img-${variant}-${i}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="block size-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      );
    case "3":
      return (
        <div className="relative ml-auto aspect-[0.930372149] h-full max-h-[38.75rem] overflow-hidden rounded-[0.625rem]">
          <div className="absolute top-1/2 left-[5%] aspect-[1.586206897] w-[120%] -translate-y-1/2 overflow-hidden rounded-2xl shadow-xl xl:right-[-22%]">
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
        <div className="ml-auto aspect-[0.930372149] h-full max-h-[38.75rem] overflow-hidden pl-4 xl:pl-0">
          <div className="grid size-full grid-cols-2 grid-rows-2 gap-[3%]">
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 overflow-hidden rounded-[0.625rem]">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="block size-full object-cover object-center"
              />
            </div>
            <div className="col-start-1 col-end-2 row-start-2 row-end-3 overflow-hidden rounded-[0.625rem]">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="block size-full object-cover object-center"
              />
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-3 overflow-hidden rounded-tl-[0.625rem] rounded-bl-[0.625rem]">
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="block size-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      );
  }
};

interface Feature211Props {
  className?: string;
}

const Feature211 = ({ className }: Feature211Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-xl bg-muted py-11">
          <Tabs
            defaultValue={TAB_LIST[0].tabName}
            className="flex-col-reverse gap-10 xl:h-[43.75rem]"
          >
            <TabsList className="mx-auto flex h-auto w-[calc(100%-32px)] justify-start overflow-auto bg-muted lg:w-max lg:items-center lg:justify-center lg:overflow-hidden lg:rounded-full">
              {TAB_LIST.map((tab) => (
                <TabsTrigger
                  className="shrink-0 rounded-full px-4 py-2 text-sm leading-tight font-medium"
                  key={`trigger-${tab.tabName}`}
                  value={tab.tabName}
                >
                  {tab.tabName}
                </TabsTrigger>
              ))}
            </TabsList>
            {TAB_LIST.map((tab) => (
              <TabsContent
                value={tab.tabName}
                className="grid w-full grid-cols-1 items-center gap-8 xl:grid-cols-[37.5rem_1fr]"
                key={`content-${tab.tabName}`}
              >
                <div className="flex flex-col gap-4 px-8 xl:pl-18">
                  <div className="flex size-8 rounded-lg bg-primary text-primary-foreground">
                    <tab.icon className="m-auto size-4" />
                  </div>
                  <h2 className="font-serif text-5xl xl:text-7xl">
                    {tab.title}
                  </h2>
                  <p className="mt-4 text-xl text-foreground">{tab.summary}</p>
                  <div>
                    {tab.link && (
                      <Button asChild size="lg" className="w-full md:w-fit">
                        <a href={tab.link.href}>
                          {tab.link.name}
                          <ArrowRight />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="h-full w-full justify-self-end pl-4 md:pl-0">
                  <Images variant={tab.imageComponent} images={tab.images} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature211 };
