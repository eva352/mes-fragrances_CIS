"use client";

import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaBluesky, FaXTwitter } from "react-icons/fa6";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Changelog4Props {
  className?: string;
}

const Changelog4 = ({ className }: Changelog4Props) => {
  const [scrollProgress, setScrollProgress] = useState(8);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 92 + 8;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto w-full max-w-5xl md:px-10">
          <div className="flex flex-col gap-16">
            <h1 className="text-5xl font-bold">Changelog</h1>
            <div className="mx-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-muted p-3 md:gap-4">
              <a href="#">
                <FaLinkedin className="size-6 text-muted-foreground duration-150 hover:text-primary" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 text-muted-foreground duration-150 hover:text-primary" />
              </a>
              <a href="#">
                <FaBluesky className="size-6 text-muted-foreground duration-150 hover:text-primary" />
              </a>
              <p className="text-sm text-muted-foreground">
                Follow us and stay up to date with everything we&apos;re on!
              </p>
            </div>
            <div className="relative space-y-20">
              <div className="absolute top-4 hidden h-full w-0.5 md:-left-12 md:block lg:-left-14">
                <div className="h-full w-full rounded-full bg-muted">
                  <div
                    className="relative max-h-full w-full rounded-full bg-linear-to-b from-primary/20 via-primary/40 to-primary transition-all duration-300"
                    style={{
                      height: `${scrollProgress}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="relative">
                <span className="absolute top-2 hidden size-5 -translate-x-1/2 place-items-center rounded-full border bg-background md:-left-12 md:grid lg:-left-[55px]">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="placeholder"
                  className="aspect-video rounded-md border border-border object-cover"
                />
                <div className="my-4 flex items-center gap-2">
                  <Avatar className="size-8 rounded-full border border-border">
                    <AvatarImage
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                      alt="placeholder"
                    />
                  </Avatar>
                  <time className="text-sm text-muted-foreground">
                    11 Feb 2025
                  </time>
                </div>
                <div className="prose max-w-none dark:prose-invert">
                  <h2 className="text-4xl">
                    Big Tech Stack Updates and Performance Boost
                  </h2>
                  <p>
                    We&apos;re upgrading our tech stack to leverage{" "}
                    <b>cutting-edge web technologies</b>, providing better
                    performance and developer experience across our platform.
                  </p>
                  <h3>Framework updates:</h3>
                  <ul>
                    <li>
                      <b>React 18</b> - Concurrent rendering and automatic
                      batching for better performance.
                    </li>
                    <li>
                      <b>TypeScript 5.0</b> - Better type inference and
                      decorator support.
                    </li>
                    <li>
                      <b>Vite 5.0</b> - Lightning fast builds and improved hot
                      module replacement.
                    </li>
                  </ul>
                  <p>
                    Read more about our tech stack in our <a href="#">docs</a>.
                  </p>
                  <h3>Performance improvements:</h3>
                  <ul>
                    <li>
                      <b>Lazy loading</b> - Reduced initial load time and
                      improved user experience.
                    </li>
                    <li>
                      <b>Code splitting</b> - Improved code organization and
                      maintainability.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <span className="absolute top-2 hidden size-5 -translate-x-1/2 place-items-center rounded-full border bg-background md:-left-12 md:grid lg:-left-[55px]">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                  alt="placeholder"
                  className="aspect-video rounded-md border border-border object-cover"
                />
                <div className="my-4 flex items-center gap-2">
                  <Avatar className="size-8 rounded-full border border-border">
                    <AvatarImage
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"
                      alt="placeholder"
                    />
                  </Avatar>
                  <time className="text-sm text-muted-foreground">
                    23 Sep 2024
                  </time>
                </div>
                <div className="prose max-w-none dark:prose-invert">
                  <h2 className="text-4xl">
                    Infrastructure and Security Updates
                  </h2>
                  <p>
                    We&apos;ve made significant improvements to our
                    infrastructure and security measures to ensure a more robust
                    and secure platform.
                  </p>
                  <h3>Infrastructure updates:</h3>
                  <ul>
                    <li>
                      <b>Docker containers</b> - Improved deployment consistency
                      and scalability
                    </li>
                    <li>
                      <b>Kubernetes</b> - Better container orchestration and
                      auto-scaling
                    </li>
                    <li>
                      <b>Redis caching</b> - Faster response times and reduced
                      database load
                    </li>
                  </ul>
                  <h3>Security enhancements:</h3>
                  <ul>
                    <li>
                      <b>OAuth 2.0</b> - Enhanced authentication and
                      authorization flows
                    </li>
                    <li>
                      <b>Rate limiting</b> - Protection against DDoS attacks and
                      abuse
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Changelog4 };
