import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataItem {
  title: string;
  value: string;
  description: string;
}

const DATA: DataItem[] = [
  {
    title: "Projects Delivered",
    value: "150",
    description: "Total projects successfully delivered to clients",
  },
  {
    title: "Revenue Generated",
    value: "20M",
    description: "Total revenue generated from all projects",
  },
  {
    title: "Client Satisfaction",
    value: "95",
    description: "Overall client satisfaction rate",
  },
];

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  className?: string;
}

const StatCard = ({ title, value, description, className }: StatCardProps) => {
  return (
    <div className={cn("flex max-w-52 flex-col gap-4", className)}>
      <span className="font-medium">{title}</span>
      <div className="text-7xl font-bold">
        {value}
        <span className="text-muted-foreground">+</span>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface Feature183Props {
  className?: string;
}

const Feature183 = ({ className }: Feature183Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="w-full shrink-0">
          <div className="relative mx-auto h-[24rem] w-full rounded-3xl bg-muted bg-cover bg-center bg-no-repeat sm:h-[24rem]">
            {/* SVG pattern */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 4200 1080"
              fill="none"
              className="absolute top-0 right-0 bottom-0 left-0 z-0 [mask-image:linear-gradient(to_bottom,transparent,white,transparent,transparent)] opacity-50"
            >
              <g clipPath="url(#clip0_4_5)">
                <rect width="100%" height="1080" fill="none" />
                {/* Horizontal lines */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <line
                    key={`horizontal-${index}`}
                    y1={(index + 1) * 200 - 0.5}
                    x2="100%" // Extend to full width
                    y2={(index + 1) * 200 - 0.5}
                    className="stroke-muted-foreground"
                    strokeWidth="1"
                  />
                ))}
                {/* Vertical lines */}
                {Array.from({ length: 4000 }).map((_, index) => (
                  <line
                    key={`vertical-${index}`}
                    x1={(index + 1) * 200 - 0.5}
                    y1="0"
                    x2={(index + 1) * 200 - 0.5}
                    y2="1080"
                    className="stroke-muted-foreground"
                    strokeWidth="1"
                  />
                ))}
              </g>
              <defs>
                <clipPath id="clip0_4_5">
                  <rect width="100%" height="1080" fill="white" />
                </clipPath>
              </defs>
            </svg>

            {/* Phone container aligned to the bottom */}
            <div className="absolute -top-32 bottom-0 left-1/2 z-10 mt-12 w-[12.5rem] -translate-x-1/2 transform overflow-hidden sm:w-[18.75rem]">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/hero108/iphone.png"
                alt=""
                className="absolute top-0 z-20 block w-full"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg"
                alt=""
                className="absolute top-0 block w-full rounded-[50px]"
              />
            </div>

            {/* Left card */}
            <div className="absolute top-12 left-1/4 z-20 hidden w-60 transform rounded-2xl border bg-background p-4 shadow-md md:rotate-12 lg:block">
              <div className="flex flex-row">
                <h3 className="text-lg font-semibold">Top Product</h3>
                <Badge variant="secondary" className="ml-auto rounded-sm">
                  Product
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  EcoSmart Water Bottle made from 100% recycled materials.
                  Durable, eco-friendly, and available in multiple colors and
                  sizes.
                </p>
              </div>
            </div>

            {/* Right card */}
            <div className="absolute top-12 right-1/4 z-20 hidden w-60 transform rounded-lg border bg-background p-4 shadow-md lg:block">
              <div className="flex flex-row border-b pb-4">
                <h3 className="text-lg font-semibold">Add Product</h3>
                <div className="relative ml-auto">
                  <Badge variant="secondary" className="rounded-sm px-1">
                    <Plus className="size-4" />
                  </Badge>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                    <SelectItem value="category3">Category 3</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-col gap-2">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category1">Size SM</SelectItem>
                      <SelectItem value="category2">Size MD</SelectItem>
                      <SelectItem value="category3">Size XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Static cards */}
        <div className="mt-14 flex flex-col items-center justify-center gap-x-24 gap-y-8 lg:flex-row">
          {DATA.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature183 };
