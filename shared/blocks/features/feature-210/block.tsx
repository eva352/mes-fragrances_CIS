import {
  ChevronRight,
  ClipboardCheck,
  Component,
  Files,
  FormInput,
  KeyRound,
  LayoutDashboard,
  Mail,
  Megaphone,
  Newspaper,
  Rocket,
  ScrollText,
  Sparkles,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    title: "Blog Templates",
    description: "Professional blog layouts",
    icon: Newspaper,
    link: "#",
  },
  {
    title: "Portfolio",
    description: "Showcase your creative work",
    icon: Files,
    link: "#",
  },
  {
    title: "Dashboard UI",
    description: "Modern admin interfaces",
    icon: LayoutDashboard,
    link: "#",
  },
  {
    title: "Landing Pages",
    description: "High-converting designs",
    icon: Rocket,
    link: "#",
  },
  {
    title: "Documentation",
    description: "Knowledge base layouts",
    icon: ClipboardCheck,
    link: "#",
  },
  {
    title: "Authentication",
    description: "Sign-in and signup flows",
    icon: KeyRound,
    link: "#",
  },
  {
    title: "Marketing Sites",
    description: "Promote your products",
    icon: Megaphone,
    link: "#",
  },
  {
    title: "Social Media",
    description: "Community platforms",
    icon: Users,
    link: "#",
  },
  {
    title: "Forms",
    description: "Input and survey layouts",
    icon: FormInput,
    link: "#",
  },
  {
    title: "Email Templates",
    description: "Responsive email designs",
    icon: Mail,
    link: "#",
  },
  {
    title: "Components",
    description: "Reusable UI elements",
    icon: Component,
    link: "#",
  },
  {
    title: "Animations",
    description: "Interactive transitions",
    icon: Sparkles,
    link: "#",
  },
];

interface Feature210Props {
  className?: string;
}

const Feature210 = ({ className }: Feature210Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 md:flex-row md:items-end md:gap-12">
          <div className="flex basis-1/2 flex-col gap-3">
            <div className="flex items-center gap-2">
              <ScrollText className="size-4" />
              <p className="text-sm font-medium">Templates</p>
            </div>
            <h2 className="text-3xl font-medium text-balance md:text-4xl">
              Build beautiful websites in minutes.
            </h2>
          </div>
          <p className="w-fit basis-1/2 font-medium text-muted-foreground">
            Jump start your next project with our professionally designed
            templates. Choose from various categories to match your needs
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 sm:gap-8 md:mt-32 md:gap-y-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-10 xl:grid-cols-4">
          {features.map((feature, idx) => (
            <a
              key={idx}
              href={feature.link}
              className="group flex flex-col gap-1 rounded-lg transition-colors md:p-4 md:hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                <feature.icon className="size-4 shrink-0" />
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">{feature.title}</p>
                  <ChevronRight className="size-4 shrink-0 transition-transform md:group-hover:translate-x-0.5" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature210 };
