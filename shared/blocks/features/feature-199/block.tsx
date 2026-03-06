"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

const features = [
  {
    title: "AI-Powered Analytics",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Cloud Integration",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Real-time Monitoring",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "Data Visualization",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    title: "Automated Workflows",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    title: "Team Collaboration",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    title: "API Integration",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Custom Dashboards",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Security Features",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "Performance Metrics",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    title: "Machine Learning Models",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    title: "Data Encryption",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    title: "Automated Testing",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "CI/CD Pipeline",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Version Control",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "Code Analysis",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    title: "Database Management",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    title: "Load Balancing",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    title: "Container Orchestration",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Microservices",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Edge Computing",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "Serverless Functions",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    title: "DevOps Tools",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    title: "Infrastructure as Code",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    title: "Authentication Services",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Message Queues",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Service Discovery",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "API Gateway",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    title: "Caching Solutions",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    title: "Event Streaming",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    title: "GraphQL Support",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
];

interface Feature199Props {
  className?: string;
}

const Feature199 = ({ className }: Feature199Props) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const items = container.getElementsByClassName("feature-item");
      const containerMiddle = window.innerHeight * 0.6;

      let closestItem = null;
      let closestDistance = Infinity;

      Array.from(items).forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - containerMiddle);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = index;
        }
      });

      if (closestItem !== null) {
        setActiveFeature(closestItem);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-10 text-4xl font-bold md:text-5xl lg:mb-20 lg:text-6xl">
          Discover Our Powerful Features
        </h1>
        <div className="relative gap-6 pb-72 md:grid md:grid-cols-5 md:pb-0">
          <div className="col-span-3 pb-4" ref={containerRef}>
            <Separator />
            {features.map((feature, index) => (
              <React.Fragment key={index}>
                <div
                  className="feature-item py-3"
                  onMouseEnter={() => !isMobile && setActiveFeature(index)}
                >
                  <div className="flex items-center gap-7 md:gap-16 lg:gap-28">
                    <span
                      className={cn(
                        "invisible size-2.5 shrink-0 rounded-full bg-primary md:size-3",
                        activeFeature === index && "visible",
                      )}
                    ></span>
                    <h2
                      className={cn(
                        "text-[clamp(1.65rem,3vw,2.15rem)] font-bold text-muted-foreground",
                        activeFeature === index && "text-primary",
                      )}
                    >
                      {feature.title}
                    </h2>
                  </div>
                </div>
                <Separator />
              </React.Fragment>
            ))}
          </div>
          <div className="sticky bottom-3 left-3 col-span-2 h-72 w-fit border md:top-20 md:h-fit">
            <img
              src={features[activeFeature].image}
              alt={features[activeFeature].title}
              className="h-72 md:h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature199 };
