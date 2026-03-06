import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Feature120Props {
  className?: string;
}

const Feature120 = ({ className }: Feature120Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-10 md:gap-20 lg:grid-cols-2">
          <div className="flex flex-col gap-2.5 py-8">
            <h1 className="text-4xl font-bold lg:text-5xl">
              Empower your business with the best tools
            </h1>
            <p className="text-muted-foreground">
              Explore our cutting-edge tools that help streamline processes and
              maximize efficiency.
            </p>
            <div className="flex flex-col gap-6 py-10 sm:flex-row sm:gap-16">
              <div className="flex gap-4 leading-5">
                <Avatar className="size-9 rounded-full ring-1 ring-input">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" alt="avatar" />
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Emily Watson</p>
                  <p className="text-muted-foreground">CEO, Visionary Tech</p>
                </div>
              </div>
              <div className="flex gap-4 leading-5">
                <Avatar className="size-9 rounded-full ring-1 ring-input">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" alt="avatar" />
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Michael Lee</p>
                  <p className="text-muted-foreground">CTO, Visionary Tech</p>
                </div>
              </div>
            </div>
            <Button className="w-fit">Start your free trial</Button>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="h-full max-h-[420px] w-full rounded-xl object-cover"
          />
        </div>
        <Separator className="my-12" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-2 text-4xl font-semibold md:text-6xl">20+</h2>
            <p className="text-muted-foreground">
              Years of delivering excellence
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-4xl font-semibold md:text-6xl">100+</h2>
            <p className="text-muted-foreground">
              Countries where our services are available
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-4xl font-semibold md:text-6xl">25</h2>
            <p className="text-muted-foreground">
              Prestigious awards for innovation
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-4xl font-semibold md:text-6xl">&gt;30k</h2>
            <p className="text-muted-foreground">
              Thriving businesses using our platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature120 };
