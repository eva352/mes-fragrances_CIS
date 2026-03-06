"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Footer27Props {
  className?: string;
}

const Footer27 = ({ className }: Footer27Props) => {
  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "X (Twitter)", href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-between md:flex-row md:items-center"
            >
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-4xl leading-tight font-bold text-foreground lg:text-5xl">
                    Connect with Me
                  </h2>
                  <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                    No commitments. Just a quick chat to see if we click.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button size="lg">Get in Touch</Button>
                </motion.div>
              </div>

              <div className="mt-5 space-y-8 md:mt-0">
                <motion.div variants={itemVariants}>
                  <div className="space-y-6">
                    {socialLinks.map((link) => (
                      <motion.div
                        key={link.name}
                        variants={itemVariants}
                        whileHover={{ x: 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <a
                          href={link.href}
                          className="group flex items-center gap-2 py-2 text-foreground transition-colors hover:text-foreground/80"
                        >
                          <span className="text-xl font-medium">
                            {link.name}
                          </span>
                          <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16"
            >
              <motion.div variants={itemVariants}>
                <Separator className="mb-8" />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
              >
                <p className="text-sm text-muted-foreground">
                  © Copyright 2025. All rights Reserved.
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <span className="text-muted-foreground">
                    Made by{" "}
                    <motion.a
                      href="https://x.com/shadcnblocks"
                      className="underline underline-offset-4 transition-colors hover:text-foreground"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      shadcnblocks
                    </motion.a>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer27 };
