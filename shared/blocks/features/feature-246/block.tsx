import { BadgeCheck } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Feature246Props {
  className?: string;
}

const Feature246 = ({ className }: Feature246Props) => {
  const benefits = [
    "Global coverage, always",
    "No Other unnecessary mails",
    "We Don't send spams mails",
    "Explore tommorow",
  ];

  return (
    <section className={cn("bg-background", className)}>
      <div className="container flex flex-col justify-between overflow-hidden py-32 lg:flex-row">
        <div className="flex w-full flex-col items-start gap-20 lg:mr-2">
          <h1 className="text-5xl font-semibold tracking-tighter text-foreground md:text-7xl">
            Join Shadncn Blocks
            <br />
            Get Updates
          </h1>
          <div className="space-y-5">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-7 w-7 items-center justify-center">
                  <BadgeCheck className="h-20" />
                </div>
                <span className="text-xl tracking-tight text-foreground">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
          <div className="flex w-full items-center overflow-hidden rounded-full border border-border p-2">
            <Input
              className="h-full border-none pl-6 text-lg! tracking-tight shadow-none outline-none focus-visible:ring-0 focus-visible:outline-none"
              placeholder="Enter your email"
            />
            <Button className="right-2 h-15 rounded-full bg-foreground px-10 text-lg font-medium tracking-tight text-background transition-all ease-in-out hover:px-12">
              Sign Up
            </Button>
          </div>
        </div>
        <div className="relative flex h-auto w-full items-center justify-end rounded-none">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-letters-and-arrows-flying-out-of-a-black-hole.svg"
            className="object-fit left-40 scale-x-[-1] lg:absolute"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export { Feature246 };
