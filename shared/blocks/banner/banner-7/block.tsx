"use client";

import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Banner7Props {
  className?: string;
}

const Banner7 = ({ className }: Banner7Props) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;
  return (
    <section
      className={cn(
        "flex items-center justify-between gap-2 border-t-3 border-t-primary bg-muted px-4 py-4 dark:bg-card",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-4 text-sm font-medium md:justify-center md:text-center">
        <p>
          Our Premium Plan is now live! 🎉 Enjoy more features and flexibility.
          <a href="#" className="ml-2 whitespace-nowrap underline md:hidden">
            <span>Learn more</span>
          </a>
        </p>
        <Separator
          orientation="vertical"
          className="hidden self-stretch bg-primary data-[orientation=vertical]:h-auto md:block"
        />
        <a href="#" className="group hidden items-center gap-2 md:flex">
          <span>Learn more</span>
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
      <Button variant="ghost" size="icon" onClick={handleClose}>
        <X />
      </Button>
    </section>
  );
};

export { Banner7 };
