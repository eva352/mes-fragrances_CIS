import {
  FaDiscord,
  FaLinkedin,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

import { cn } from "@/lib/utils";

interface Feature92Props {
  className?: string;
}

const Feature92 = ({ className }: Feature92Props) => {
  return (
    <section className={cn("border-y bg-muted/50 py-32", className)}>
      <div className="container">
        <div>
          <h2 className="text-3xl font-bold lg:text-4xl">
            Versatile connections.
          </h2>
          <p className="text-3xl text-muted-foreground lg:text-4xl">
            Sync all communications and tasks with active projects.
          </p>
        </div>
        <div className="mt-10 mb-8 grid gap-7 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg"
                alt="shadcn"
                className="h-5 w-auto"
              />
              Figma
            </div>
            <p>
              Utilize live-updated thumbnails and synced feedback in tasks to
              maintain alignment between your teams and projects.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg"
                alt="shadcn"
                className="h-5 w-auto"
              />
              TailwindCSS
            </div>
            <p>
              Automate actions using commits and pull requests, linking related
              tasks directly across platforms for a seamless workflow.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg"
                alt="shadcn"
                className="h-5 w-auto"
              />
              shadcn/ui
            </div>
            <p>
              Receive insights on linked items, and associate conversations to
              tasks for streamlined collaboration and project management.
            </p>
          </div>
        </div>
        <ul className="grid grid-cols-2 items-center gap-7 text-muted-foreground md:grid-cols-3 lg:grid-cols-6">
          <li className="flex items-center gap-2 font-medium">
            <FaDiscord className="size-6 shrink-0" />
            Discord
          </li>
          <li className="flex items-center gap-2 font-medium">
            <FaRedditAlien className="size-6 shrink-0" />
            Reddit
          </li>
          <li className="flex items-center gap-2 font-medium">
            <FaTwitter className="size-6 shrink-0" />
            Twitter
          </li>
          <li className="flex items-center gap-2 font-medium">
            <FaTelegramPlane className="size-6 shrink-0" />
            Telegram
          </li>
          <li className="flex items-center gap-2 font-medium">
            <FaLinkedin className="size-6 shrink-0" />
            LinkedIn
          </li>
        </ul>
      </div>
    </section>
  );
};

export { Feature92 };
