"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const changelogs = [
  {
    title: "Introducing Pixiol Cloud Storage",
    category: "New feature",
    date: "Mar 20, 2025",
    author: "Emily Chen",
    role: "Product Manager",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    description: (
      <div className="prose dark:prose-invert">
        <p>
          We've launched a new unified cloud storage system for managing all
          your creative assets (Media tab) and project files (Projects tab).
          This centralized hub allows you to access and organize all your
          creative resources from anywhere, on any device.
        </p>
        <ul>
          <li>
            The <a href="#">Asset Library</a> is now integrated within Cloud
            Storage.
          </li>
          <li>
            The Media tab includes advanced filtering and tagging options for
            better organization.
          </li>
          <li>
            When working on a project, you can access cloud assets
            <strong> by pressing</strong> ⌘+F or using the resource panel
          </li>
          <li>
            When creating a new project, you can choose to:
            <ul>
              <li>Start with templates from the Gallery</li>
              <li>Import assets from your Cloud Storage</li>
              <li>Collaborate on shared team projects</li>
            </ul>
          </li>
        </ul>
        <p>
          At launch, we're offering 50GB free storage for all users. Premium
          plans with expanded storage are available. We're also planning more
          integrations soon. If there's a specific feature you'd like to see,
          <a href="#">submit your idea</a> to our feedback portal.
        </p>
      </div>
    ),
  },
  {
    title: "AI-Powered Design Assistant",
    category: "Improvement",
    date: "Mar 15, 2025",
    author: "Alex Rivera",
    role: "AI Research Lead",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    description: (
      <div className="prose dark:prose-invert">
        <p>
          We're thrilled to announce major enhancements to our AI Design
          Assistant. These updates deliver smarter suggestions and more
          intuitive creative assistance across all Pixiol applications.
        </p>
        <ul>
          <li>40% faster rendering for AI-generated content suggestions</li>
          <li>
            New style recognition algorithm for more consistent design themes
          </li>
          <li>Expanded creative prompt capabilities with style parameters</li>
          <li>
            Specialized assistants for illustration, typography, and layout
          </li>
        </ul>
        <p>
          These improvements are rolling out to all subscription tiers
          automatically. No additional setup required to access these enhanced
          capabilities. For in-depth tutorials on maximizing the AI Assistant,
          visit our <a href="#">learning center</a>.
        </p>
      </div>
    ),
  },
  {
    title: "Creative Team Collaboration Tools",
    category: "Update",
    date: "Mar 10, 2025",
    author: "Sam Washington",
    role: "Lead Product Designer",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    description: (
      <div className="prose dark:prose-invert">
        <p>
          We've revamped our collaboration features to streamline creative
          teamwork within Pixiol. These updates focus on improving feedback
          loops and creative approval workflows.
        </p>
        <ul>
          <li>Live co-editing with cursor presence for team members</li>
          <li>Contextual commenting with visual annotation tools</li>
          <li>Version history with visual comparison and branching</li>
          <li>Client review portals with approval tracking</li>
        </ul>
        <p>
          To explore these new collaboration capabilities and integrate them
          into your creative workflow, check out our
          <a href="#">team collaboration guide</a>.
        </p>
      </div>
    ),
  },
];

interface Changelog5Props {
  className?: string;
}

const Changelog5 = ({ className }: Changelog5Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      },
    );

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="bg-muted/60 py-20 lg:py-28">
        <div className="container">
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <span className="flex w-[16%] items-center gap-3 pt-1 text-sm">
              <span className="size-2 shrink-0 rounded-full bg-primary" />
              Changelog
            </span>
            <div>
              <h2 className="text-4xl">
                Latest features and enhancements <br />{" "}
                <span className="text-muted-foreground">Pixiol</span>
              </h2>
              <div className="mt-10 flex items-center gap-4 text-sm">
                <a href="#" className="group flex items-center gap-1 underline">
                  Subscribe to updates
                  <ArrowUpRight className="size-4 transition-all group-hover:rotate-45" />
                </a>
                <a href="#" className="group flex items-center gap-1 underline">
                  Follow on Twitter
                  <ArrowUpRight className="size-4 transition-all group-hover:rotate-45" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-10 lg:mt-20">
        <div className="relative flex">
          <div className="sticky top-10 hidden h-fit w-[16%] text-sm lg:block">
            <p className="mb-2">Timeline</p>
            <ul className="flex flex-col gap-2">
              {changelogs.map((changelog, idx) => (
                <li key={changelog.title}>
                  <a
                    href={`#section-${idx + 1}`}
                    className={cn(
                      "transition-colors duration-200",
                      activeSection === `section-${idx + 1}`
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    {changelog.date}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Separator
            orientation="vertical"
            className="hidden h-auto data-[orientation=vertical]:h-auto lg:block"
          />
          <div className="mx-auto flex max-w-prose flex-col gap-16 lg:gap-24">
            {changelogs.map((changelog, idx) => (
              <div
                key={idx}
                id={`section-${idx + 1}`}
                ref={(ref) => addSectionRef(`section-${idx + 1}`, ref)}
                className="scroll-m-20"
              >
                <img
                  src={changelog.image}
                  alt={changelog.title}
                  className="mb-8 aspect-video w-full object-cover"
                />
                <span className="flex items-center gap-2">
                  <span className="size-2 shrink-0 rounded-full border border-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {changelog.category}
                  </p>
                </span>
                <h3 className="mt-2 mb-6 text-3xl">{changelog.title}</h3>
                {changelog.description}
                <div className="mt-6 flex items-end justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-10 border border-border">
                      <AvatarImage src={changelog.avatar} />
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{changelog.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {changelog.role}
                      </p>
                    </div>
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {changelog.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Changelog5 };
