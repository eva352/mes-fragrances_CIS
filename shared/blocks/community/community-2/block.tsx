import { ArrowUpRight } from "lucide-react";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

import { cn } from "@/lib/utils";

interface Community2Props {
  className?: string;
}

const Community2 = ({ className }: Community2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-5 text-2xl font-semibold md:text-3xl">
          Join our community
        </h2>
        <p className="font-medium text-muted-foreground md:text-xl">
          Connect with others, share experiences, and stay in the loop.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <a className="group rounded-md border border-border p-6" href="#">
            <div className="flex items-center justify-between gap-4">
              <FaXTwitter className="size-5" />
              <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold">Twitter</h3>
              <p className="text-sm text-muted-foreground">
                Follow our latest updates and announcements.
              </p>
            </div>
          </a>
          <a className="group rounded-md border border-border p-6" href="#">
            <div className="flex items-center justify-between gap-4">
              <FaLinkedin className="size-5" />
              <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold">LinkedIn</h3>
              <p className="text-sm text-muted-foreground">
                Connect with us and explore career opportunities.
              </p>
            </div>
          </a>
          <a className="group rounded-md border border-border p-6" href="#">
            <div className="flex items-center justify-between gap-4">
              <FaGithub className="size-5" />
              <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold">Github</h3>
              <p className="text-sm text-muted-foreground">
                Contribute to our open-source projects.
              </p>
            </div>
          </a>
          <a className="group rounded-md border border-border p-6" href="#">
            <div className="flex items-center justify-between gap-4">
              <FaDiscord className="size-5" />
              <ArrowUpRight className="size-4 -translate-x-2 translate-y-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold">Discord</h3>
              <p className="text-sm text-muted-foreground">
                Join our Discord server and connect with other developers.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Community2 };
