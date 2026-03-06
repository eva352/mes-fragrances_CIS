import { Check } from "lucide-react";
import {
  FaAndroid,
  FaApple,
  FaAppStoreIos,
  FaChrome,
  FaEdge,
  FaFirefoxBrowser,
  FaLinux,
  FaWindows,
} from "react-icons/fa";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "Windows",
    icon: FaWindows,
    link: "#",
  },
  {
    name: "MacOS",
    icon: FaApple,
    link: "#",
  },
  {
    name: "Linux",
    icon: FaLinux,
    link: "#",
  },
  {
    name: "Android",
    icon: FaAndroid,
    link: "#",
  },
  {
    name: "iOS",
    icon: FaAppStoreIos,
    link: "#",
  },
  {
    name: "Chrome",
    icon: FaChrome,
    link: "#",
  },
  {
    name: "Firefox",
    icon: FaFirefoxBrowser,
    link: "#",
  },
  {
    name: "Edge",
    icon: FaEdge,
    link: "#",
  },
];

interface Download9Props {
  className?: string;
}

const Download9 = ({ className }: Download9Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold">Download Software</h1>
            <p className="max-w-md text-muted-foreground">
              Create stunning designs, collaborate seamlessly, and bring your
              ideas to life on any device. Start designing in seconds with our
              intuitive design platform.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0" />
                Create professional designs with advanced vector tools
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0" />
                Collaborate in real-time with your design team
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0" />
                Export to multiple formats with one-click publishing
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0" />
                Unlimited cloud storage for all your projects
              </li>
            </ul>
            <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto">
                Buy Now
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Download
              </Button>
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="w-full max-w-lg rounded-lg border border-border"
          />
        </div>
        <div className="mt-16 flex items-center gap-10 md:mt-20 md:gap-20">
          <hr className="h-[1px] w-full bg-muted"></hr>
          <span className="text-sm whitespace-nowrap">Available on</span>
          <hr className="h-[1px] w-full bg-muted"></hr>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 md:mt-10">
          {platforms.map((platform, idx) => (
            <a
              href={platform.link}
              key={idx}
              className="flex w-20 flex-col items-center gap-2 rounded-lg p-2 text-sm hover:bg-muted"
            >
              <platform.icon className="size-5" />
              {platform.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Download9 };
