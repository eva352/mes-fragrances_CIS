"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const data = [
  {
    id: 1,
    title: "Getting Started with Modern Web Development: A Complete Guide",
    description:
      "Dive into the fundamentals of modern web development. Learn about essential tools, frameworks, and best practices that will help you build robust and scalable web applications in today's fast-paced development environment.",
    author: "Sarah Chen",
    date: "March 15, 2024",
    category: "Web Development",
    link: "#",
  },
  {
    id: 2,
    title: "The Ultimate Guide to State Management in Frontend Applications",
    description:
      "Explore different approaches to managing state in frontend applications. From local state to global solutions, learn how to choose the right strategy for your project's specific needs and complexity.",
    author: "James Wilson",
    date: "March 12, 2024",
    category: "Frontend",
    link: "#",
  },
  {
    id: 3,
    title: "Building Scalable Backend Systems: Best Practices and Patterns",
    description:
      "Learn how to design and implement backend systems that can grow with your application. Discover architectural patterns, optimization techniques, and infrastructure considerations for modern backend development.",
    author: "Michael Rodriguez",
    date: "March 8, 2024",
    category: "Backend",
    link: "#",
  },
  {
    id: 4,
    title: "Mastering Component Architecture in Frontend Development",
    description:
      "Deep dive into building maintainable and reusable components. Learn about component design patterns, state management, and best practices for creating scalable frontend architectures.",
    author: "Emily Zhang",
    date: "March 5, 2024",
    category: "Frontend",
    link: "#",
  },
  {
    id: 5,
    title: "Optimizing Application Performance: From Theory to Practice",
    description:
      "Discover practical techniques for improving your application's performance. From code-level optimizations to infrastructure tuning, learn how to deliver a faster and more efficient user experience.",
    author: "David Park",
    date: "March 3, 2024",
    category: "Web Development",
    link: "#",
  },
  {
    id: 6,
    title: "Security Best Practices for Backend Development",
    description:
      "Explore essential security concepts and implementation strategies for protecting your backend systems. Learn about common vulnerabilities, authentication methods, and data protection techniques.",
    author: "Lisa Thompson",
    date: "February 28, 2024",
    category: "Backend",
    link: "#",
  },
  {
    id: 7,
    title: "Modern Frontend Testing Strategies",
    description:
      "Learn comprehensive testing approaches for frontend applications. From unit testing components to end-to-end testing, discover how to ensure your frontend code is reliable and maintainable.",
    author: "Alex Kumar",
    date: "February 25, 2024",
    category: "Frontend",
    link: "#",
  },
  {
    id: 8,
    title: "Database Design and Optimization for Backend Systems",
    description:
      "Master the fundamentals of database design and optimization for backend applications. Learn about schema design, indexing strategies, and query optimization techniques.",
    author: "Rachel Martinez",
    date: "February 22, 2024",
    category: "Backend",
    link: "#",
  },
  {
    id: 9,
    title: "Building Responsive Web Interfaces",
    description:
      "Master the art of creating responsive and adaptive web interfaces. Learn about modern CSS techniques, mobile-first design, and performance optimization strategies.",
    author: "Chris Anderson",
    date: "February 19, 2024",
    category: "Web Development",
    link: "#",
  },
  {
    id: 10,
    title: "API Design and Integration Patterns",
    description:
      "Explore best practices for designing and integrating APIs in your applications. Learn about RESTful principles, authentication strategies, and error handling patterns.",
    author: "Nina Patel",
    date: "February 15, 2024",
    category: "Backend",
    link: "#",
  },
];

interface Blog17Props {
  className?: string;
}

const Blog17 = ({ className }: Blog17Props) => {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");

  const categories = [
    "All Articles",
    ...Array.from(new Set(data.map((item) => item.category))),
  ];

  const filteredData =
    selectedCategory === "All Articles"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary">Blog</Badge>
          <h1 className="text-4xl font-bold lg:text-7xl">
            Latest Insights & Updates
          </h1>
          <p className="text-balance lg:text-xl">
            Stay up to date with the latest trends, tutorials, and best
            practices in software development. Our experts share their knowledge
            to help you build better applications.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-4">
          <div className="hidden flex-col gap-2 lg:flex">
            {categories.map((category) => (
              <Button
                variant="ghost"
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "justify-start text-left",
                  selectedCategory === category &&
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="lg:col-span-3">
            {filteredData.map((item) => (
              <React.Fragment key={item.id}>
                <a href={item.link} className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-semibold text-balance lg:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="font-medium">{item.author}</span>
                    <span className="text-muted-foreground">
                      on {item.date}
                    </span>
                  </div>
                </a>
                <Separator className="my-8" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog17 };
