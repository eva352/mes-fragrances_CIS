"use client";

import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Feature238Props {
  className?: string;
}

const Feature238 = ({ className }: Feature238Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <div className="mb-4 flex items-center justify-center gap-2">
          <img
            className="size-6"
            alt="Copy paste icon"
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
          />
          <h2 className="text-center text-xl font-semibold tracking-tight text-foreground">
            Just Copy Paste
          </h2>
        </div>

        <h1 className="text-center text-6xl font-bold tracking-tighter text-foreground md:text-[100px]">
          Amazing
          <br />
          components
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-muted-foreground">
          Discover our collection of beautifully designed, ready-to-use
          components that you can easily integrate into your projects.
        </p>

        <div className="relative mt-8 flex flex-col items-center justify-center">
          <Button className="w-75 rounded-2xl px-2 py-6 shadow-[0px_1px_3px_#0000001a,inset_0px_2px_0px_#ffffff40]">
            Sign up for free
          </Button>
          <a
            href="#"
            className="group relative z-12 flex w-75 items-center justify-center rounded-2xl py-6 text-muted-foreground hover:bg-none"
          >
            Book a demo
            <ChevronRightIcon className="ml-1 h-4 w-4 transition-all ease-in-out group-hover:ml-4" />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.8 }}
          className="relative mt-22 h-100"
        >
          <motion.div
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            whileHover={{ y: -50 }}
            transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.8 }}
            className="absolute top-20 left-0 z-8 hidden h-[350px] w-[550px] flex-col items-center justify-center rounded-3xl border border-border bg-muted p-2 md:flex"
          >
            <Card className="relative h-full w-full rounded-2xl border">
              <CardContent className="flex h-full w-full items-center justify-center p-0">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="size-3.5 rounded-full bg-red-500" />
                  <div className="size-3.5 rounded-full bg-yellow-500" />
                  <div className="size-3.5 rounded-full bg-green-500" />
                </div>
                {/* Browser Window Content */}
                <img
                  className="size-30"
                  alt="Block Logo"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            whileHover={{ y: -50 }}
            transition={{
              ease: [0, 0.71, 0.2, 1.01],
              duration: 0.8,
              delay: 0.05,
            }}
            className="absolute top-0 left-1/2 z-10 flex h-[350px] w-full max-w-[550px] -translate-x-1/2 flex-col items-center justify-center rounded-3xl border border-border bg-muted p-2"
          >
            <Card className="relative h-full w-full rounded-2xl border bg-foreground">
              <CardContent className="flex h-full w-full items-center justify-center p-0">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="size-3.5 rounded-full bg-red-500" />
                  <div className="size-3.5 rounded-full bg-yellow-500" />
                  <div className="size-3.5 rounded-full bg-green-500" />
                </div>
                {/* Browser Window Content */}
                <img
                  className="size-30"
                  alt="Block Logo"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-white-1.svg"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            whileHover={{ y: -50 }}
            transition={{
              ease: [0, 0.71, 0.2, 1.01],
              duration: 0.8,
              delay: 0.1,
            }}
            className="absolute -top-18 right-0 z-11 hidden h-[350px] w-[550px] flex-col items-center justify-center rounded-3xl border border-border bg-muted p-2 md:flex"
          >
            <Card className="relative h-full w-full rounded-2xl border">
              <CardContent className="flex h-full w-full items-center justify-center p-0">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="size-3.5 rounded-full bg-red-500" />
                  <div className="size-3.5 rounded-full bg-yellow-500" />
                  <div className="size-3.5 rounded-full bg-green-500" />
                </div>
                {/* Browser Window Content */}
                <img
                  className="size-30"
                  alt="Block Logo"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { Feature238 };
