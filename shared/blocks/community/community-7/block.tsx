import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaSlack,
  FaXTwitter,
} from "react-icons/fa6";
import { SiBluesky } from "react-icons/si";

import { cn } from "@/lib/utils";

interface Community7Props {
  className?: string;
}

const Community7 = ({ className }: Community7Props) => {
  const communityCards = [
    {
      icon: <FaXTwitter className="h-8 w-8 text-foreground/80" />,
      title: "Twitter",
      description: "Follow us for updates, insights, and news",
      link: "https://x.com/shadcnblocks",
      status: "online",
      followers: 12000,
    },
    {
      icon: <FaGithub className="h-8 w-8 text-foreground/80" />,
      title: "GitHub",
      description: "Contribute, report issues, and star the project",
      link: "https://github.com/shadcn/blocks",
      status: "offline",
      followers: 8000,
    },
    {
      icon: <FaDiscord className="h-8 w-8 text-foreground/80" />,
      title: "Discord",
      description: "Chat, share ideas, and get support from the community",
      link: "https://discord.gg",
      status: "online",
      followers: 3500,
    },
    {
      icon: <FaLinkedin className="h-8 w-8 text-foreground/80" />,
      title: "LinkedIn",
      description: "Connect with us professionally and grow your network",
      link: "https://www.linkedin.com/company/shadcn",
      status: "online",
      followers: 5000,
    },
    {
      icon: <FaSlack className="h-8 w-8 text-foreground/80" />,
      title: "Slack",
      description: "Join our Slack for real-time collaboration",
      link: "https://slack.com/shadcn",
      status: "offline",
      followers: 1200,
    },
    {
      icon: <SiBluesky className="h-8 w-8 text-foreground/80" />,
      title: "Bluesky",
      description: "Connect with us on Bluesky for open social networking",
      link: "https://bsky.app/profile/shadcn.bsky.social",
      status: "online",
      followers: 900,
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center justify-center">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
          Find Us Online
        </h2>
        <p className="mb-8 max-w-2xl text-center text-lg font-normal text-muted-foreground md:text-xl">
          Connect with us on our social media platforms.
        </p>
        <div className="mb-10 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {communityCards.map((card) => (
            <div
              key={card.title}
              className="group flex flex-1 flex-col items-center gap-2 rounded-2xl border-0 bg-background p-8 transition-colors duration-200 hover:bg-muted"
            >
              <div className="flex flex-col items-center gap-2">
                {card.icon}
                <h5 className="mb-1 text-lg font-semibold">{card.title}</h5>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-1 text-xs break-all underline"
                >
                  {card.link}
                </a>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${card.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                    title={card.status === "online" ? "Online" : "Offline"}
                  />
                  <span className="text-xs text-muted-foreground">
                    {card.status === "online" ? "Online" : "Offline"}
                  </span>
                  <span className="mx-2 text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-foreground">
                    {card.followers.toLocaleString()} followers
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Community7 };
