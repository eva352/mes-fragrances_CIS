import { ArrowRight, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const slides = [
  {
    id: 1,
    tabName: "Products",
    title: "Pre-built Components for Rapid Development",
    description:
      "Accelerate your workflow with our library of ready-to-use, fully customizable UI components designed for modern web applications.",
    features: [
      "Cross-platform Integrations",
      "Responsive Components",
      "Accessible Blocks",
      "Customizable Templates",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: 2,
    tabName: "Services",
    title: "Expert Solutions for Every Challenge",
    description:
      "Our comprehensive services help you build, scale, and optimize your digital presence with expert guidance every step of the way.",
    features: [
      "Technical Consulting",
      "Implementation Support",
      "Performance Optimization",
      "Ongoing Maintenance",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: 3,
    tabName: "Company",
    title: "We Build the Future of Web Development",
    description:
      "Founded by industry experts, we're committed to creating tools that empower developers to build better digital experiences faster.",
    features: [
      "Remote-first Culture",
      "Open Source Contributors",
      "Community-driven",
      "Continuous Innovation",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    id: 4,
    tabName: "Portfolio",
    title: "Showcasing Client Success Stories",
    description:
      "Explore our diverse portfolio of successful implementations across industries, from startups to enterprise-level organizations.",
    features: [
      "Case Studies",
      "Implementation Examples",
      "Success Metrics",
      "Client Testimonials",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    id: 5,
    tabName: "Resources",
    title: "Knowledge to Power Your Development",
    description:
      "Access our comprehensive collection of tutorials, guides, and best practices to help you get the most from our platform.",
    features: [
      "Developer Guides",
      "Video Tutorials",
      "API Documentation",
      "Community Forums",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
];

interface Feature19Props {
  className?: string;
}

const Feature19 = ({ className }: Feature19Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h2 className="text-center text-3xl font-semibold lg:text-5xl">
            Building Better Digital Experiences
          </h2>
          <p className="text-center text-balance text-muted-foreground lg:text-xl">
            Discover how our platform empowers developers and businesses to
            create exceptional web applications with less code and more
            creativity.
          </p>
        </div>
        <div className="mt-12">
          <Tabs
            defaultValue="1"
            className="mx-auto flex w-fit flex-col items-center gap-8 md:gap-12"
          >
            <TabsList className="flex h-auto gap-x-2 p-2">
              {slides.map((slide) => (
                <TabsTrigger
                  key={slide.id}
                  value={slide.id.toString()}
                  className="text-sm hover:bg-background md:text-base"
                >
                  {slide.tabName}
                </TabsTrigger>
              ))}
            </TabsList>
            {slides.map((slide) => (
              <TabsContent
                value={slide.id.toString()}
                key={slide.id}
                className="max-w-5xl"
              >
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                  <div>
                    <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="text-muted-foreground lg:text-xl">
                      {slide.description}
                    </p>
                    <ul className="mt-8 grid grid-cols-1 gap-2 lg:grid-cols-2">
                      {slide.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" asChild>
                      <a href={slide.link} className="mt-8">
                        Explore {slide.tabName}
                        <ArrowRight className="w-4" />
                      </a>
                    </Button>
                  </div>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="order-first max-h-[400px] w-full rounded-lg object-cover md:order-last"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature19 };
