import { Box, Globe, Rocket, ShieldUser, User, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { Safari } from "@/components/magicui/safari";

const features = [
  {
    title: "Repository (Central Data Hub)",
    icon: Globe,
  },
  {
    title: "Contributor Network (Authors, Maintainers, Editors)",
    icon: User,
  },
  {
    title: "Archives (Database, File Storage, Collections)",
    icon: Box,
  },
  {
    title: "Destinations (APIs, Services, Platforms)",
    icon: Rocket,
  },
  {
    title: "Authorization (Roles, Policies, Controls)",
    icon: ShieldUser,
  },
  {
    title: "Partnership (Networks, Communities, Alliances)",
    icon: Users,
  },
];

interface Feature299Props {
  className?: string;
}

const Feature299 = ({ className }: Feature299Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col gap-10 md:gap-16">
        <p className="mx-auto max-w-5xl text-center text-2xl md:text-4xl">
          Understand how your system connects. See relationships, data flows,
          and dependencies in one view. Track these components of your
          infrastructure:
        </p>
        <ul className="mx-auto grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-2">
              <feature.icon className="mt-1 size-4 shrink-0" />
              <h3>{feature.title}</h3>
            </li>
          ))}
        </ul>
        <div className="mx-auto w-full max-w-5xl">
          <Safari
            url="https://www.shadcnblocks.com"
            mode="simple"
            imageSrc="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/dashboard-1.png"
          />
        </div>
      </div>
    </section>
  );
};

export { Feature299 };
