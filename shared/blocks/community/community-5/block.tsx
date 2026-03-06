import { GitBranch, Star, Users } from "lucide-react";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

import { cn } from "@/lib/utils";

import { GridPattern } from "@/components/magicui/grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const GITHUB_PROFILE = {
  name: "shadcnblocks",
  url: "https://github.com/shadcnblocks",
  description: "Open-source UI blocks for your next project.",
  stats: {
    stars: "4.2k",
    forks: "1.1k",
    contributors: "120+",
  },
};

const socials = [
  {
    name: "Discord",
    icon: <FaDiscord className="h-6 w-6" />,
    url: "#",
  },
  {
    name: "Twitter",
    icon: <FaXTwitter className="h-6 w-6" />,
    url: "#",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="h-6 w-6" />,
    url: "#",
  },
];

interface Community5Props {
  className?: string;
}

const Community5 = ({ className }: Community5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center pb-10 md:pb-14 xl:pb-[60px]">
          <Badge>
            <FaGithub className="mr-1 h-4 w-4" />
            GitHub Community
          </Badge>
          <h5 className="mt-4 text-xl leading-7 font-semibold tracking-tight text-foreground md:text-center xl:text-3xl">
            Contribute to our community
          </h5>
          <p className="mt-2 text-lg text-muted-foreground md:text-center xl:mt-3 xl:text-lg">
            Dive into our code, contribute, and join a thriving open-source
            community.
          </p>

          {/* Expanded GitHub Card */}
          <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center">
            <Card className="relative flex w-full flex-col items-start gap-6 overflow-hidden rounded-2xl border border-border p-8 shadow-lg md:flex-row lg:items-center">
              {/* Grid Pattern in bottom right */}
              <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-2/3 w-2/3">
                <GridPattern
                  className="h-full w-full"
                  style={{
                    maskImage:
                      "radial-gradient(circle at 100% 100%, black 60%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 100% 100%, black 60%, transparent 100%)",
                    opacity: 0.4,
                  }}
                />
              </div>
              <div className="z-10 flex flex-shrink-0 flex-col items-start">
                <a
                  href={GITHUB_PROFILE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mb-2 h-16 w-16 text-foreground" />
                </a>
                <span className="text-xl font-semibold text-foreground">
                  {GITHUB_PROFILE.name}
                </span>
                <a
                  href={GITHUB_PROFILE.url}
                  target="_blank"
                  className="mt-1 text-sm text-muted-foreground underline hover:text-foreground"
                >
                  {GITHUB_PROFILE.url.replace("https://", "")}
                </a>
              </div>
              <div className="z-10 flex flex-1 flex-col items-start">
                <p className="mb-4 text-left text-muted-foreground">
                  {GITHUB_PROFILE.description}
                </p>
                <div className="flex flex-col gap-4 text-sm md:flex-row md:gap-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="font-semibold text-foreground">
                      {GITHUB_PROFILE.stats.stars}
                    </span>
                    <span className="ml-1 text-muted-foreground">Stars</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">
                      {GITHUB_PROFILE.stats.forks}
                    </span>
                    <span className="ml-1 text-muted-foreground">Forks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">
                      {GITHUB_PROFILE.stats.contributors}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      Contributors
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Smaller Social Options */}
          <div className="mt-8 flex justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-24 flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 transition-all hover:shadow-md"
              >
                {social.icon}
                <span className="text-xs font-medium text-muted-foreground">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Community5 };
