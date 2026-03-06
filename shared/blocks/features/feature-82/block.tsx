import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const integrartions = [
  {
    title: "Slack",
    description:
      "Seamlessly communicate with your team, share updates, and streamline project discussions all in one place.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  },
  {
    title: "Google Drive",
    description:
      "Store, access, and collaborate on files with ease. Keep all your important documents organized in the cloud.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
  },
  {
    title: "Dropbox",
    description:
      "A reliable solution for file storage and sharing, perfect for teams needing to collaborate from anywhere.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
  },
  {
    title: "Github",
    description:
      "Manage your code repositories and collaborate on development projects with powerful version control.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg",
  },
];

interface Feature82Props {
  className?: string;
}

const Feature82 = ({ className }: Feature82Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid place-items-center items-center gap-4 lg:grid-cols-5 lg:gap-16">
          <h1 className="text-center text-4xl font-semibold text-balance lg:col-span-2 lg:text-left lg:text-5xl">
            Unify Your flow with Integrations
          </h1>
          <p className="text-center text-lg text-muted-foreground lg:col-span-2 lg:text-left">
            Streamline your processes and enhance productivity by connecting all
            your favorite apps into one unified platform.
          </p>
          <Button className="mx-auto w-fit lg:mx-0 lg:ml-auto">
            Explore Integrations
          </Button>
        </div>
        <Separator className="mt-8 mb-12" />
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-20">
          {integrartions.map((integration, i) => (
            <li key={i}>
              <div>
                <img
                  src={integration.image}
                  alt={integration.title}
                  className="h-auto w-16"
                />
                <h3 className="my-2 text-2xl font-bold">{integration.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="mt-12 flex items-center justify-center gap-1 text-lg font-semibold underline"
        >
          Discover All Integrations
          <ArrowRight className="h-auto w-4" />
        </a>
      </div>
    </section>
  );
};

export { Feature82 };
