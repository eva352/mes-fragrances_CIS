import { Infinity as InfinityIcon, MessagesSquare, Target } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Feature93Props {
  className?: string;
}

const Feature93 = ({ className }: Feature93Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <span className="flex items-end justify-center -space-x-4">
            <Avatar className="size-16 border">
              <AvatarImage
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                alt="placeholder"
              />
            </Avatar>
            <Avatar className="size-24 border">
              <AvatarImage
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp"
                alt="placeholder"
              />
            </Avatar>
            <Avatar className="size-16 border">
              <AvatarImage
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"
                alt="placeholder"
              />
            </Avatar>
          </span>
          <h2 className="mt-12 text-4xl font-bold lg:text-5xl">
            Outstanding customer care
          </h2>
          <div className="mt-20 grid justify-center gap-16 lg:grid-cols-3">
            <div className="max-w-md">
              <MessagesSquare
                className="mx-auto mb-6 size-12"
                strokeWidth={1.5}
              />
              <h3 className="mb-4 text-2xl font-medium lg:text-2xl">
                Dedicated support for your team
              </h3>
              <p className="text-muted-foreground">
                Our team consists of experts who ensure that your questions are
                answered promptly and accurately.
              </p>
            </div>
            <div className="max-w-md">
              <Target className="mx-auto mb-6 size-12" strokeWidth={1.5} />
              <h3 className="mb-4 text-2xl font-medium lg:text-2xl">
                Quick and precise solutions to your problems
              </h3>
              <p className="text-muted-foreground">
                We know the importance of timely answers, which is why we
                prioritize fast, reliable responses.
              </p>
            </div>
            <div className="max-w-md">
              <InfinityIcon
                className="mx-auto mb-6 size-12"
                strokeWidth={1.5}
              />
              <h3 className="mb-4 text-2xl font-medium lg:text-2xl">
                Continuous improvement through feedback
              </h3>
              <p className="text-muted-foreground">
                Your input helps us grow. We regularly update and enhance our
                services based on what matters to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature93 };
