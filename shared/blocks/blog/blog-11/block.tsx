import { FileText } from "lucide-react";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

const blogs = [
  {
    title: "How to design a website from scratch",
    image:
      "https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
    date: "May 20, 2024",
  },
  {
    title: "The best tools for web development and design",
    image:
      "https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "June 12, 2024",
  },
  {
    title: "How to market your website and get more traffic",
    image:
      "https://images.unsplash.com/photo-1572733438515-8f143a854f72?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "July 5, 2024",
  },
  {
    title: "The future of web development and design",
    image:
      "https://images.unsplash.com/photo-1546414701-81cc6963c67f?q=80&w=2144&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "August 18, 2024",
  },
  {
    title: "The difference between UI and UX and how to design for both",
    image:
      "https://images.unsplash.com/photo-1647715360138-33fb6fe68539?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "September 7, 2024",
  },
  {
    title:
      "Optimizing your website for SEO and getting more traffic from search engines",
    image:
      "https://images.unsplash.com/photo-1623496258831-091279081ac5?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "September 23, 2024",
  },
  {
    title: "The best tools for web development and design",
    image:
      "https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "October 12, 2024",
  },
];

interface Blog11Props {
  className?: string;
}

const Blog11 = ({ className }: Blog11Props) => {
  return (
    <section className={cn("bg-muted/60 py-32", className)}>
      <div className="container">
        <div className="relative mx-auto flex max-w-7xl flex-col gap-20 lg:flex-row">
          <header className="top-10 flex h-fit flex-col items-center gap-5 text-center lg:sticky lg:max-w-80 lg:items-start lg:gap-8 lg:text-left">
            <FileText className="h-full w-14" strokeWidth={1} />
            <h1 className="text-4xl font-extrabold lg:text-5xl">Blog Posts</h1>
            <p className="text-muted-foreground lg:text-xl">
              Blog posts are a great way to share your knowledge and expertise
              with the world.
            </p>
            <Separator />
            <nav>
              <ul className="flex flex-wrap items-center justify-center gap-4 lg:flex-col lg:items-start lg:gap-2">
                <li className="font-medium">
                  <a href="#">All</a>
                </li>
                <li className="text-muted-foreground hover:text-primary">
                  <a href="#">Design</a>
                </li>
                <li className="text-muted-foreground hover:text-primary">
                  <a href="#">Development</a>
                </li>
                <li className="text-muted-foreground hover:text-primary">
                  <a href="#">Marketing</a>
                </li>
              </ul>
            </nav>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {blogs.map((blog, index) => (
              <a
                href="#"
                key={index}
                className="group relative isolate h-80 rounded-lg bg-background"
              >
                <div className="z-10 flex h-full flex-col justify-between p-6">
                  <p className="text-muted-foreground transition-colors duration-500 group-hover:text-background">
                    {blog.date}
                  </p>
                  <h2 className="line-clamp-2 text-xl font-medium transition-colors duration-500 group-hover:text-background">
                    {blog.title}
                  </h2>
                </div>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog11 };
