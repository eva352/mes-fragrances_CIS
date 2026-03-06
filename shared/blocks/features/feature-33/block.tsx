import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Feature33Props {
  className?: string;
}

const Feature33 = ({ className }: Feature33Props) => {
  const features = [
    {
      title: "One Click Copy Paste from the Block Library",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium nesciunt alias facere vitae necessitatibus quam obcaecati? Culpa praesentium consequuntur quasi.",
      linkText: "Try Blocks Now",
      linkHref: "#",
    },
    {
      title: "Build Your Website in Minutes with Blocks",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium nesciunt alias facere vitae necessitatibus quam obcaecati? Culpa praesentium consequuntur quasi.",
      linkText: "Try Blocks Now",
      linkHref: "#",
    },
    {
      title: "Get Started with Blocks Today and Save Time",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium nesciunt alias facere vitae necessitatibus quam obcaecati? Culpa praesentium consequuntur quasi.",
      linkText: "Try Blocks Now",
      linkHref: "#",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-8 text-4xl font-semibold lg:mb-12 lg:text-6xl">
            Get Started With Blocks Today
          </h2>
          <p className="font-medium text-muted-foreground lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            sint eos voluptatem, commodi hic ab ad maxime adipisci.
          </p>
        </div>
        <div className="mx-auto max-w-7xl rounded-lg bg-muted pt-10 pr-10 lg:pt-28 lg:pr-32">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
            alt="placeholder"
            className="h-full max-h-[600px] w-full rounded-tr-lg rounded-bl-lg object-cover"
          />
        </div>
        <div className="mx-auto mt-14 grid max-w-7xl gap-11 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 py-3 shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl font-medium">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
              <CardFooter className="px-0">
                <a
                  href={feature.linkHref}
                  className="font-semibold hover:underline"
                >
                  {feature.linkText}
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature33 };
