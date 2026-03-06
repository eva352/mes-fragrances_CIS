"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Banner6Props {
  count?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  avatars?: Array<{
    src: string;
    fallback: string;
  }>;
  defaultVisible?: boolean;
  className?: string;
}

const Banner6 = ({
  description = "Used by over 2K+ customers worldwide",
  avatars = [
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", fallback: "User" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", fallback: "User" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp", fallback: "User" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp", fallback: "User" },
  ],
  defaultVisible = true,
  className,
}: Banner6Props) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section
      className={cn(
        "absolute top-4 right-0 left-0 z-50 mx-auto max-w-2xl animate-in fade-in slide-in-from-top-2",
        className,
      )}
    >
      <div className="mx-4">
        <div className="w-full rounded-full border bg-background p-4 shadow-md">
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {avatars.map((avatar, i) => (
                  <Avatar key={i} className="ring-2 ring-white">
                    <AvatarImage src={avatar.src} alt={`User ${i + 1}`} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm font-semibold">{description}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Banner6 };
