"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface BlogPost7Props {
  title: string;
  image: string;
  description: string;
  topNote: string;
  author: {
    name: string;
    image: string;
    description: string;
  };
  secondaryDescription: string;
  className?: string;
}

const Blogpost7 = ({
  title = "Sustainable Design in the Digital Age",
  description = "Why eco-conscious practices in digital products matter for the future of technology.",
  image = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  topNote = "Jan 22, 2025",
  author = {
    name: "Avatar",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    description: "Senior Software Engineer",
  },
  secondaryDescription = "At Our Studio, we transform ideas into digital platforms that tell your story with impact and performance.",
  className,
}: BlogPost7Props) => {
  return (
    <section
      className={cn(
        "grid min-h-lvh gap-10 p-6 md:grid-cols-2 lg:gap-20",
        className,
      )}
    >
      <div className="h-full overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid items-center">
        <div className="flex max-w-lg flex-col gap-10">
          {/* top note */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xs text-muted-foreground xl:text-base"
          >
            {topNote}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl font-bold md:text-5xl"
          >
            {title}
          </motion.h1>
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-muted-foreground lg:text-base"
          >
            {description}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <Avatar className="size-14 border">
              <AvatarImage src={author.image} alt={author.name} />
            </Avatar>
            <div className="">
              <h2 className="font-semibold xl:text-lg">{author.name}</h2>
              <p className="font-medium text-muted-foreground xl:text-lg">
                {author.description}
              </p>
            </div>
          </motion.div>

          <Separator />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <p className="text-3xl font-medium">{secondaryDescription}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Blogpost7 };
