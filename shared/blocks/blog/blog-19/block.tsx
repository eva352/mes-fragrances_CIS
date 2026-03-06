import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const data = [
  {
    id: 1,
    title: "Getting Started with Modern Web Development",
    description:
      "Discover the essential tools and frameworks needed for modern web development. Learn about the latest technologies, best practices, and workflow optimization techniques for building robust web applications.",
    date: "March 15, 2024",
    category: "Web Development",
    link: "#",
  },
  {
    id: 2,
    title: "Understanding Frontend Design Principles",
    description:
      "Explore fundamental principles of frontend design and development. Learn about responsive layouts, user interface patterns, accessibility standards, and how to create engaging user experiences.",
    date: "March 12, 2024",
    category: "Frontend",
    link: "#",
  },
  {
    id: 3,
    title: "Backend Development Fundamentals Guide",
    description:
      "Master the core concepts of backend development including database design, API architecture, and server management. Learn how to build secure, efficient, and scalable backend systems.",
    date: "March 8, 2024",
    category: "Backend",
    link: "#",
  },
  {
    id: 4,
    title: "Advanced JavaScript Programming Concepts",
    description:
      "Deep dive into advanced JavaScript concepts including async programming, design patterns, and modern ES6+ features. Learn how to write clean, maintainable, and efficient JavaScript code.",
    date: "March 5, 2024",
    category: "Frontend",
    link: "#",
  },
];

interface Blog19Props {
  className?: string;
}

const Blog19 = ({ className }: Blog19Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-1">
          <h1 className="text-2xl font-semibold md:text-4xl">
            Related articles
          </h1>
          <Button
            variant="outline"
            className="md:h-10 md:px-4 md:py-2"
            size="sm"
          >
            See all articles
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {data.map((item) => (
            <a key={item.id} href={item.link} className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {item.category}
              </span>
              <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {item.description}
              </p>
              <span className="text-sm font-medium text-muted-foreground">
                {item.date}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog19 };
