import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature35Props {
  className?: string;
}

const Feature35 = ({ className }: Feature35Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-20">
          <h2 className="row-span-2 text-3xl font-semibold">
            Built by the best and brightest
          </h2>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold lg:mb-8">
                Technologies to scale
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit architecto atque consequuntur perferendis ratione
                dolorem vitae, doloribus facere.
              </p>
            </div>
            <a href="#" className="inline-flex items-center hover:underline">
              <span>Learn more</span>
              <MoveRight strokeWidth={1} className="ml-2 size-4" />
            </a>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold lg:mb-8">
                Proven methodologies
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit architecto atque consequuntur perferendis ratione
                dolorem vitae, doloribus facere.
              </p>
            </div>
            <a href="#" className="inline-flex items-center hover:underline">
              <span>Learn more</span>
              <MoveRight strokeWidth={1} className="ml-2 size-4" />
            </a>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold lg:mb-8">
                A culture of innovation
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit architecto atque consequuntur perferendis ratione
                dolorem vitae, doloribus facere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature35 };
