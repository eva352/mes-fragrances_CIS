import { Users } from "lucide-react";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Community3Props {
  className?: string;
}

const Community3 = ({ className }: Community3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start pb-10 md:items-center md:pb-14 xl:pb-[60px]">
          <Badge>
            <Users className="h-4 w-4" />
            Community
          </Badge>

          {/* Heading */}
          <h4 className="mt-4 text-[28px] leading-[36px] font-semibold tracking-tight text-foreground md:text-center md:text-3xl xl:text-[48px] xl:leading-[56px]">
            Be part of our network
          </h4>

          {/* Description */}
          <p className="mt-2 text-lg text-muted-foreground md:text-center xl:mt-3 xl:text-xl">
            Engage, <span className="font-medium text-foreground">explore</span>
            , and <span className="font-medium text-foreground">evolve</span>{" "}
            with like-minded creators and coders.
          </p>

          {/* Social Cards */}
          <div className="mt-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:mt-12 xl:gap-6">
            <Card className="rounded-2xl transition-all hover:shadow-md">
              <a
                href="#"
                target="_blank"
                className="flex h-full flex-col items-center p-6 md:p-8 xl:p-10"
              >
                <FaXTwitter className="mb-4 h-8 w-8 md:h-12 md:w-12 xl:h-16 xl:w-16" />
                <div className="space-y-2 text-center">
                  <h5 className="text-sm font-medium md:text-lg">Twitter</h5>
                  <p className="text-sm text-balance text-muted-foreground">
                    Get the latest updates, insights, and news
                  </p>
                </div>
              </a>
            </Card>

            {/* GitHub Card */}
            <Card className="rounded-2xl transition-all hover:shadow-md">
              <a
                href="#"
                target="_blank"
                className="flex h-full flex-col items-center p-6 md:p-8 xl:p-10"
              >
                <FaGithub className="mb-4 h-8 w-8 md:h-12 md:w-12 xl:h-16 xl:w-16" />
                <div className="space-y-2 text-center">
                  <h5 className="text-sm font-medium md:text-lg">GitHub</h5>
                  <p className="text-sm text-balance text-muted-foreground">
                    Collaborate, report issues, and enhance the project
                  </p>
                </div>
              </a>
            </Card>

            {/* Discord Card */}
            <Card className="rounded-2xl transition-all hover:shadow-md">
              <a
                href="#"
                target="_blank"
                rel="noopener nofollow"
                className="flex h-full flex-col items-center p-6 md:p-8 xl:p-10"
              >
                <FaDiscord className="mb-4 h-8 w-8 md:h-12 md:w-12 xl:h-16 xl:w-16" />
                <div className="space-y-2 text-center">
                  <h5 className="text-sm font-medium md:text-lg">Discord</h5>
                  <p className="text-sm text-balance text-muted-foreground">
                    Chat, share ideas, and get support from the community
                  </p>
                </div>
              </a>
            </Card>
          </div>

          <div className="mt-8 hidden max-w-[330px] text-center text-muted-foreground xl:block">
            Join a network that collaborates, innovates, and thrives together.
          </div>
        </div>
      </div>
    </section>
  );
};

export { Community3 };
