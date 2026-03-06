"use client";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature141Props {
  className?: string;
}

const Feature141 = ({ className }: Feature141Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-center text-5xl">Welcome to Our Website</h2>
        <p className="mt-3 text-center text-2xl text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
          doloremque mollitia fugiat
        </p>

        <div className="mt-20 flex flex-col items-center justify-center gap-16 md:flex-row">
          <div className="grid w-full max-w-md grid-cols-[1fr_2fr_1fr] grid-rows-[1fr_2fr_1fr] rounded-lg bg-linear-to-br from-red-100 to-blue-100 md:max-w-xl">
            <div className="border-r-2 border-b-2 border-muted-foreground/30 p-4" />
            <div className="border-b-2 border-muted-foreground/30 p-4" />
            <div className="border-b-2 border-l-2 border-muted-foreground/30 p-4" />
            <div className="border-r-2 border-muted-foreground/30 p-4" />
            <div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="max-h-[740px] w-full rounded-xl object-cover"
              />
            </div>
            <div className="border-l-2 border-muted-foreground/30 p-4" />
            <div className="border-t-2 border-r-2 border-muted-foreground/30 p-4" />
            <div className="border-t-2 border-muted-foreground/30 p-4" />
            <div className="border-t-2 border-l-2 border-muted-foreground/30 p-4" />
          </div>

          <div className="w-full max-w-sm">
            <h6 className="text-3xl">
              Get your team on the same page, literally
            </h6>
            <Badge variant="outline" className="mt-8 bg-muted px-3 py-2">
              Badge
            </Badge>

            <div className="mt-16 mb-4 h-px w-full bg-muted-foreground" />

            <p className="mb-10 text-lg text-muted-foreground">
              &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Rerum alias unde et doloremque dignissimos error temporibus
              quisquam porro ducimus esse quod, a officiis.&quot;
            </p>

            <p className="text-lg">John Doe</p>
            <p className="text-lg text-muted-foreground">
              CET, Company Example
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature141 };
