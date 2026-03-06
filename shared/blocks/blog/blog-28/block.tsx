"use client";

import { cn } from "@/lib/utils";
interface Post {
  date: string;
  author: string;
  title: string;
  image: string;
  link: string;
  description: string;
}

const posts: Post[] = [
  {
    date: "June 15, 2024",
    author: "Alex Johnson",
    title: "The Future of AI: How Machine Learning is Transforming Industries",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Explore how artificial intelligence and machine learning technologies are revolutionizing various industries, from healthcare to manufacturing, and learn about the latest innovations shaping our future.",
  },
  {
    date: "June 12, 2024",
    author: "Maya Patel",
    title: "Principles of Minimalist Design: Less is More in Modern UX/UI",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Discover the principles of minimalist design and how they can help you create more intuitive and user-friendly interfaces.",
  },
  {
    date: "June 10, 2024",
    author: "David Chen",
    title:
      "Remote Work Revolution: How Companies are Adapting to the New Normal",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Explore the benefits and challenges of remote work and how companies are adapting to the new normal.",
  },
  {
    date: "June 8, 2024",
    author: "Sarah Williams",
    title: "Building Scalable Applications with Microservices Architecture",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Learn how microservices architecture can help you build scalable and maintainable applications.",
  },
  {
    date: "June 5, 2024",
    author: "James Rodriguez",
    title: "Content Marketing Strategies That Drive Organic Traffic in 2024",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Discover effective content marketing strategies that can help you drive organic traffic and grow your audience in 2024.",
  },
];

interface Blog28Props {
  className?: string;
}

const Blog28 = ({ className }: Blog28Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-12 text-center text-4xl font-medium md:text-7xl">
          Latest Tech Blog
        </h1>

        <div className="xs:grid-cols-1 mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative md:row-span-2 lg:col-span-2">
            <a
              href={posts[0].link}
              className="block h-fit rounded-lg p-3 md:top-0"
            >
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="h-48 w-full rounded-lg object-cover hover:opacity-80 md:h-80 lg:h-96"
              />
              <div className="mt-5">
                <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
                  <time>{posts[0].date}</time>·<span>{posts[0].author}</span>
                </div>
                <h3 className="text-lg md:text-3xl lg:text-4xl">
                  {posts[0].title}
                </h3>
                <p className="mt-4 text-muted-foreground">
                  {posts[0].description}
                </p>
              </div>
            </a>
          </div>
          {posts.slice(1).map((post, idx) => (
            <a key={idx} href={post.link} className="rounded-lg p-3">
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full rounded-lg object-cover hover:opacity-80"
              />
              <div className="mt-5">
                <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
                  <time>{post.date}</time>·<span>{post.author}</span>
                </div>
                <h3 className="text-lg">{post.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog28 };
