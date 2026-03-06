"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Feature313Props {
  className?: string;
  imageSrc: string;
  imageAlt: string;
  videoUrl?: string;
  videoCaption: string;
  videoSecondaryCaption: string;
  cards: {
    title: string;
    image: string;
    className?: string;
  }[];
}

const Feature313 = ({
  className,
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg",
  imageAlt = "Creative agency studio preview",
  videoUrl = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/man-1.mp4", // "https://www.youtube.com/watch?v=3GwjfUFyY6M",
  videoCaption = "Discover our story",
  videoSecondaryCaption = "(1:47 Sec)",
  cards = [
    {
      title: "Innovative strategies that drive real growth",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    },
    {
      title: "User-centric design built on research and insight",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    },
    {
      title: "End-to-end support from concept to delivery",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    },
    {
      title: "Global partnerships built on trust and transparency",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
    },
  ],
}: Feature313Props) => {
  // Helper function to extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = videoUrl ? getYouTubeVideoId(videoUrl) : null;
  const isYouTube = !!youtubeId;
  const isMobile = useIsMobile();

  return (
    <section className={cn("bg-muted py-24", className)}>
      <div className="container flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Card key={index} className="border-none p-10 shadow-none">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  {cards.map((card, circleIndex) => (
                    <div
                      key={circleIndex}
                      className={`${index >= circleIndex ? "bg-primary" : "bg-muted"} h-2 w-2 rounded-full`}
                    />
                  ))}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  0{index + 1}
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <div className="aspect-square h-12 w-12 flex-shrink-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="aspect-square h-full w-full rounded-lg object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-md leading-tight font-medium">
                    {card.title}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Video Container */}
        <Dialog>
          <DialogTrigger asChild>
            <motion.div
              className="group relative aspect-video min-h-72 cursor-pointer overflow-hidden rounded-lg"
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="absolute inset-0"
                variants={{
                  initial: { filter: "blur(0px)" },
                  hover: { filter: "blur(4px)" },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-full rounded-lg object-cover"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.1 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
              <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="flex flex-col items-center justify-center gap-2 md:flex-row"
                  variants={{
                    initial: { gap: "0.5rem" },
                    hover: { gap: "0rem" },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    variants={{
                      initial: { x: 0, scale: 1 },
                      hover: {
                        x: isMobile ? 0 : "75%",
                        scale: 1.2,
                      },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Button
                      size="lg"
                      className="h-14 w-14 rounded-full bg-secondary hover:bg-secondary lg:h-20 lg:w-20"
                    >
                      <Play className="ml-0.5 size-5 text-primary md:size-7" />
                      <span className="sr-only">{videoCaption}</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    className="text-center md:text-left"
                    variants={{
                      initial: { opacity: 1 },
                      hover: { opacity: 0, transform: "-translate-y-3" },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="px-4 py-2">
                      <p className="text-lg font-bold text-secondary">
                        {videoCaption}
                      </p>
                      <p className="text-lg font-medium text-muted-foreground">
                        {videoSecondaryCaption}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="w-full border-none bg-black p-0 md:max-w-6xl md:p-1">
            <DialogTitle className="sr-only">{videoCaption}</DialogTitle>
            <DialogDescription className="sr-only">
              {videoSecondaryCaption} - {videoCaption}
            </DialogDescription>
            <div className="aspect-video w-full">
              {isYouTube ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  title="Video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="h-full w-full rounded-lg"
                  controls
                  autoPlay
                  src={videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export { Feature313 };
