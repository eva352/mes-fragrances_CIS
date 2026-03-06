import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const integrations = [
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    text: "Our innovative budgeting tool helps users track their expenses and savings effortlessly, ensuring they stay on top of their financial goals.",
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    text: "With our investment platform, users can easily manage their portfolios and make informed decisions to grow their wealth over time.",
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    text: "Our secure payment solutions provide a seamless experience for both individuals and businesses, making transactions quick and reliable.",
  },
];

interface Feature158Props {
  className?: string;
}

const Feature158 = ({ className }: Feature158Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-12 flex flex-col items-center">
          <h4 className="mb-4 text-muted-foreground/50">
            Welcome to FinTech Innovations
          </h4>
          <h1 className="mb-6 text-center text-4xl font-semibold sm:text-5xl lg:text-[56px]">
            Transforming Finance for Everyone
          </h1>
          <h3 className="text-center text-xl">
            Discover how our solutions empower individuals and businesses to
            manage their finances effectively.
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-16 flex flex-col items-center justify-between gap-12 md:flex-row">
            {integrations.map((item, index) => (
              <div key={index}>
                <img
                  src={item.image}
                  alt="logo"
                  className="mb-8 aspect-[1.6] w-full rounded-2xl border border-dashed object-cover"
                />
                <p className="text-center text-sm">{item.text}</p>
              </div>
            ))}
          </div>
          <Button>View More</Button>
        </div>
      </div>
    </section>
  );
};

export { Feature158 };
