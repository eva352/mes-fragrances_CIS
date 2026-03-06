"use client";

import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const integrations = [
  {
    title: "CRM Solutions for Your Business",
    description:
      "Streamline your customer relationships and boost productivity with our powerful CRM software.",
    image:
      "https://images.unsplash.com/photo-1647715360138-33fb6fe68539?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonTitle: "Learn More",
  },
  {
    title: "Empowering Customer Engagement",
    description:
      "Engage with your customers like never before and drive sales with our intuitive CRM tools.",
    image:
      "https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonTitle: "Get Started",
  },
];

interface Feature150Props {
  className?: string;
}

const Feature150 = ({ className }: Feature150Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="grid min-h-[400px] grid-cols-1 gap-1 lg:grid-cols-2">
        {integrations.map((item, index) => (
          <a
            key={index}
            className={`relative flex ${index === 0 ? "lg:justify-center" : "lg:justify-start"} group cursor-pointer items-center justify-start bg-muted-foreground/10 p-10`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute top-0 left-0 z-[-1] h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="flex max-w-sm flex-col items-start justify-center gap-10">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl text-black duration-500 group-hover:text-white">
                  {item.title}
                </h1>
                <p className="text-lg text-black duration-500 group-hover:text-white">
                  {item.description}
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full transition-all duration-300 outline-none group-hover:bg-transparent group-hover:text-white"
              >
                {item.buttonTitle} <ArrowUpRight strokeWidth="1" />
              </Button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export { Feature150 };
