import { CircleCheckBig } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature227Props {
  className?: string;
}

const Feature227 = ({ className }: Feature227Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-5xl font-medium text-balance lg:text-7xl">
              Transform an Idea into Reality
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Unleash your creativity and break through barriers. Our platform
              brings all your ideas together in one intuitive workspace.
              Eliminate creative blocks and empower your team to imagine,
              design, and deliver.
            </p>
            <ul className="grid max-w-xl gap-5 sm:grid-cols-2">
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Advanced Design Templates</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Collaborative Editing</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Resource Libraries</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Real-time Feedback Tools</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Custom Asset Export</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Version History</p>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent to-30%" />
            <div className="absolute inset-0 bg-linear-to-l from-background to-transparent to-30%" />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="max-h-[500px] w-full rounded-2xl border border-border object-cover lg:max-h-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature227 };
