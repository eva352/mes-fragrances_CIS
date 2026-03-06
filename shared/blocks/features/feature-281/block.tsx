"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FaApple,
  FaGoogle,
  FaLinkedin,
  FaMicrosoft,
  FaTwitter,
} from "react-icons/fa";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Feature281Props {
  className?: string;
}

const Feature281 = ({ className }: Feature281Props) => {
  return (
    <section className={cn("h-full w-screen overflow-hidden py-32", className)}>
      <div className="container flex w-full max-w-6xl flex-col items-center justify-center">
        <div className="relative flex h-full flex-col items-center justify-center gap-8 text-center">
          <p className="rounded-full bg-muted px-4 py-1 text-xs font-medium uppercase">
            TESTIMONIALS
          </p>
          <h1 className="w-full text-5xl font-medium font-semibold tracking-tighter lg:text-6xl">
            What our Users say
          </h1>
        </div>
        <div className="mt-24 flex items-center justify-center">
          <CardStack items={CARDS} />
        </div>
        <Button variant="ghost" className="group/btn mt-8 w-fit" asChild>
          <a href="#">
            Read More{" "}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export { Feature281 };

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      className={cn(
        "bg-emerald-100 px-1 py-0.5 font-bold text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500",
        className,
      )}
    >
      {children}
    </motion.span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Sarah Chen",
    designation: "Product Manager",
    userImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar1.png",
    companyIcon: FaApple,
    content: (
      <p>
        The implementation was incredibly smooth.{" "}
        <Highlight>We deployed in under 2 hours</Highlight> and the team loves
        how intuitive the interface is. The responsive design works perfectly
        across all devices.
      </p>
    ),
  },
  {
    id: 1,
    name: "Marcus Rodriguez",
    designation: "Frontend Developer",
    userImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar2.png",
    companyIcon: FaLinkedin,
    content: (
      <p>
        As a developer, I appreciate the clean code structure.{" "}
        <Highlight>Easy to customize</Highlight> and the documentation is
        comprehensive. The performance optimizations are noticeable in
        production.
      </p>
    ),
  },
  {
    id: 2,
    name: "Emily Watson",
    designation: "UX Designer",
    userImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar3.png",
    companyIcon: FaTwitter,
    content: (
      <p>
        The accessibility features are outstanding.{" "}
        <Highlight>WCAG compliant out of the box</Highlight> and the design
        system is consistent. Our users with disabilities have given us
        excellent feedback.
      </p>
    ),
  },
  {
    id: 3,
    name: "David Kim",
    designation: "Senior Engineer",
    userImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar4.png",
    companyIcon: FaGoogle,
    content: (
      <p>
        The performance is exceptional.{" "}
        <Highlight>Lightning fast loading times</Highlight> and the SEO
        optimizations have significantly improved our search rankings. Highly
        recommended for any modern web application.
      </p>
    ),
  },
  {
    id: 4,
    name: "Lisa Thompson",
    designation: "Marketing Director",
    userImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar5.png",
    companyIcon: FaMicrosoft,
    content: (
      <p>
        Perfect for our enterprise needs.{" "}
        <Highlight>Scalable and secure</Highlight> with excellent integration
        capabilities. The analytics dashboard provides invaluable insights for
        our marketing campaigns.
      </p>
    ),
  },
];

type Card = {
  id: number;
  name: string;
  designation: string;
  userImage: string;
  companyIcon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
};

// Below is the modified component from Aceternity UI
// Original source: npx shadcn@latest add https://ui.aceternity.com/registry/card-stack.json
// Modified to follow our coding standards and design system
// We respect copyright and attribution to the original creators

const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  const startFlipping = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  }, []);

  useEffect(() => {
    startFlipping();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startFlipping]);

  return (
    <div className="relative h-60 w-96">
      {cards.map((card, index) => {
        const CompanyIcon = card.companyIcon;
        return (
          <motion.div
            key={card.id}
            className="absolute flex h-60 w-96 flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] dark:border-white/[0.1] dark:bg-black dark:shadow-white/[0.05]"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              bounce: 0.3,
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar key={index} className="size-12">
                  <AvatarImage src={card.userImage} alt={card.name} />
                </Avatar>
                <div>
                  <p className="font-medium">{card.name}</p>
                  <p className="text-muted-foreground/80">{card.designation}</p>
                </div>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full bg-muted-foreground/15">
                <CompanyIcon className="size-5" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
