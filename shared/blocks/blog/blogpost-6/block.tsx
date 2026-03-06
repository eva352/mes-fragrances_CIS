"use client";
import { Linkedin, LucideIcon, Twitter } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface BreadcrumbBlogProps {
  breadcrumb: Array<BreadcrumbItem>;
}

interface AuthorType {
  image?: string;
  name: string;
  job: string;
  description: string;
  socials: {
    icon: LucideIcon;
    url: string;
  }[];
}

const AUTHOR: AuthorType = {
  image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  name: "Jane Doe",
  job: "CEO & Cofounder",
  description:
    "An avid storyteller with a passion for crafting compelling narratives, love to explore the human experience through vivid characters and thought-provoking themes. ",
  socials: [
    {
      icon: Twitter,
      url: "#",
    },
    {
      icon: Linkedin,
      url: "#",
    },
  ],
};

const BREADCRUMB: Array<BreadcrumbItem> = [
  {
    label: "Resources",
    link: "#",
  },
  {
    label: "Blogs",
    link: "#",
  },
];

const SHARE_LINKS = [
  {
    icon: Twitter,
    url: "#",
  },
  {
    icon: Linkedin,
    url: "#",
  },
];

const ARTICLE_DATE = "May 18, 2025";
const ARTICLE_DURATION = "10 min read";

interface Blogpost6Props {
  className?: string;
}

const Blogpost6 = ({ className }: Blogpost6Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Query all h2 elements with IDs that match the chapter anchors
    const chapterIds = ["heading-1", "heading-2", "heading-3"];
    const headingElements = chapterIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "0px 0px -30% 0px",
        threshold: 0.1,
      },
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={cn("pb-32", className)}>
      <div className="bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat py-20">
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex w-full flex-col items-center justify-center gap-12">
            <div className="flex w-full max-w-[36rem] flex-col items-center justify-center gap-8">
              <BreadcrumbBlog breadcrumb={BREADCRUMB} />
              <div className="flex w-full flex-col gap-5">
                <div className="flex items-center justify-center gap-2.5 text-sm font-medium text-foreground/60">
                  <div>{ARTICLE_DURATION}</div>
                  <div>|</div>
                  <div>{ARTICLE_DATE}</div>
                </div>
                <h1 className="text-center text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl">
                  Building Better Components
                </h1>
                <p className="text-center text-xl leading-[1.4] font-semibold text-foreground">
                  The best blog is one that captivates readers with engaging,
                  well-researched content presented in a clear and relatable
                  way.
                </p>
                <div className="flex items-center justify-center gap-2.5">
                  {SHARE_LINKS.map((link, index) => (
                    <Button asChild key={`share-link-${index}`} size="icon">
                      <a href={link.url}>
                        <link.icon />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-20">
        <div className="relative mx-auto w-full max-w-5xl items-start justify-between gap-20 lg:flex">
          {/* Chapters */}
          <div className="top-20 flex-1 bg-background pb-10 lg:sticky lg:pb-0">
            <div className="text-xl leading-snug font-medium">Chapters</div>
            <div className="flex flex-col gap-2 pt-2 pl-2">
              <a
                href="#heading-1"
                className={`block text-sm leading-normal font-medium text-muted-foreground transition duration-300 ${activeId === "heading-1" ? "lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:!text-primary" : "text-muted-foreground"}`}
              >
                The Role of UI Components in Development
              </a>
              <a
                href="#heading-2"
                className={`block text-sm leading-normal font-medium text-muted-foreground transition duration-300 ${activeId === "heading-2" ? "lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:!text-primary" : "text-muted-foreground"}`}
              >
                Core Types of UI Components
              </a>
              <a
                href="#heading-3"
                className={`block text-sm leading-normal font-medium text-muted-foreground transition duration-300 ${activeId === "heading-3" ? "lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:!text-primary" : "text-muted-foreground"}`}
              >
                End Paragraph
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="flex w-full max-w-[40rem] flex-col gap-10">
            <Author author={AUTHOR} />
            <div className="prose dark:prose-invert">
              <h2>Key Takeaways</h2>
              <p>
                • UI components are foundational, reusable elements in web
                development that encapsulate both design and behavior to promote
                consistency and efficiency.
              </p>
              <p>
                • Leveraging component libraries and frameworks streamlines the
                development process and ensures accessibility and cross-device
                compatibility.
              </p>
              <p>
                • Understanding different types of UI components enables
                developers to create structured, scalable, and maintainable user
                interfaces.
              </p>

              <p>
                In the evolving landscape of modern web development, UI
                components have emerged as indispensable tools for crafting
                user-friendly interfaces. These components, ranging from simple
                buttons to complex data tables, are the building blocks that
                help shape the overall user experience. By modularizing the
                interface into smaller, manageable pieces, UI components not
                only streamline the development process but also promote
                consistency across an application's design. As digital products
                become more complex, the role of well-structured UI components
                becomes even more critical in meeting user expectations and
                maintaining code quality.
              </p>
              <h2 id="heading-1" className="scroll-mt-24">
                The Role of UI Components in Development
              </h2>
              <p>
                UI components serve as self-contained units of functionality and
                presentation, often designed to be reused across multiple parts
                of an application. By encapsulating both logic and styling,
                components reduce duplication and improve the maintainability of
                codebases. For example, a single button component can be reused
                with different props or styles, ensuring a uniform look and feel
                throughout the application. This modular approach also allows
                for parallel development, where teams can work on separate
                components without interfering with each other's work.
              </p>
              <p>
                Popular frameworks like React, Vue, and Angular are built around
                component-based architectures, encouraging developers to think
                in terms of reusable blocks rather than monolithic pages. This
                shift not only enhances scalability but also simplifies testing
                and debugging. Additionally, many UI libraries such as Material
                UI, Chakra UI, and Radix UI provide pre-built, accessible
                components that accelerate development and ensure consistency
                with design systems. Embracing components as first-class
                citizens in frontend architecture leads to better code
                organization, faster prototyping, and a more seamless user
                experience.
              </p>
              <h2 id="heading-2" className="scroll-mt-24">
                Core Types of UI Components
              </h2>
              <h3>1. Input Components</h3>
              <p>
                Input components are interactive elements that allow users to
                provide information. These include text inputs, checkboxes,
                radio buttons, sliders, and file upload fields. They are
                essential in forms and user settings, enabling data collection
                and customization. A well-designed input component handles
                validation, displays feedback, and provides a seamless
                experience across different devices and screen readers, ensuring
                inclusivity and usability.
              </p>
              <a href="#">Explore more</a>
              <div className="w-full max-w-[40rem] overflow-hidden">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <h3>2. Navigation Components</h3>
              <p>
                Navigation components guide users through an application's
                structure. These include elements like top bars, side menus,
                breadcrumbs, tabs, and pagination. Effective navigation improves
                discoverability and helps users find the content they need
                without friction. Good navigation design considers user flow,
                accessibility (such as keyboard navigation and ARIA labels), and
                responsiveness, ensuring the interface is intuitive and adaptive
                to various screen sizes.
              </p>
              <div className="w-full max-w-[40rem] overflow-hidden">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <h3>3. Feedback Components</h3>
              <p>
                Feedback components provide users with visual or textual cues in
                response to their actions. Examples include modals, toast
                notifications, progress bars, and tooltips. These elements
                inform users about the success or failure of their operations or
                alert them to required actions. They enhance interactivity and
                reduce confusion, especially when performing asynchronous
                actions like form submissions or file uploads.
              </p>
              <div className="w-full max-w-[40rem] overflow-hidden">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <h3>4. Layout Components</h3>
              <p>
                Layout components organize content visually on the page. Common
                examples include containers, rows, columns, and grid systems.
                These components help define the structure of a page and control
                the spacing, alignment, and responsiveness of child elements. A
                strong layout system ensures consistency in visual hierarchy and
                supports scalability as the application grows in complexity.
              </p>
              <div className="w-full max-w-[40rem] overflow-hidden">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <h2 id="heading-3" className="scroll-mt-24">
                End Paragraph
              </h2>
              <p>
                Mastering the use of UI components is a key step toward building
                reliable, scalable, and aesthetically consistent web
                applications. By breaking down interfaces into smaller parts,
                developers can achieve greater flexibility, encourage reuse, and
                reduce the likelihood of errors. UI components also bridge the
                gap between design and development, creating a more
                collaborative and efficient workflow that benefits both
                developers and end users.
              </p>
            </div>

            {/* Conclusion */}
            <div className="prose rounded-lg bg-muted p-5 dark:prose-invert [&>h2]:mt-0">
              <h2>Conclusion</h2>
              <p>
                UI components are more than just visual elements—they are
                strategic assets in a modern developer's toolkit. When designed
                thoughtfully and used effectively, they empower teams to deliver
                high-quality interfaces with speed, consistency, and confidence.
                As frontend development continues to evolve, investing in
                reusable, accessible, and well-documented UI components will
                remain essential for building user-centric, maintainable digital
                products.
              </p>
            </div>

            {/* Author */}
            <div className="flex flex-col gap-4 rounded-lg bg-muted p-5">
              <Author author={AUTHOR} />
              <p>{AUTHOR.description}</p>
              <div className="flex items-center gap-2.5">
                {AUTHOR.socials.map((link, index) => (
                  <Button asChild key={`author-socials-${index}`} size="icon">
                    <a href={link.url}>
                      <link.icon />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Author = ({ author }: { author: AuthorType }) => {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar className="size-12 border">
        <AvatarImage src={author.image} alt={author.name} />
        <AvatarFallback>{author.name}</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm leading-normal font-normal">{author.name}</div>
        <div className="text-sm leading-normal font-normal text-muted-foreground">
          {author.job}
        </div>
      </div>
    </div>
  );
};

const BreadcrumbBlog = ({ breadcrumb }: BreadcrumbBlogProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, i) => {
          return (
            <Fragment key={`${item.label}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i < breadcrumb.length - 1 ? (
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
              ) : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { Blogpost6 };
