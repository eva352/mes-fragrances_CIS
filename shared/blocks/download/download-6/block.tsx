import { Download } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const downloads = [
  {
    version: "2.0.1",
    platforms: [
      {
        name: "macOS",
        variant: "Mac Universal",
        link: "#",
      },
      {
        name: "macOS",
        variant: "Mac Arm64",
        link: "#",
      },
      {
        name: "macOS",
        variant: "Mac x64",
        link: "#",
      },
      {
        name: "Windows",
        variant: "Windows 10/11 (Arm64)",
        link: "#",
      },
      {
        name: "Windows",
        variant: "Windows 10/11 (x64)",
        link: "#",
      },
      {
        name: "Linux",
        variant: "AppImage (Arm64)",
        link: "#",
      },
      {
        name: "Linux",
        variant: "AppImage (x64)",
        link: "#",
      },
    ],
  },
  {
    version: "1.2.3",
    platforms: [
      {
        name: "macOS",
        variant: "Mac Universal",
        link: "#",
      },
      {
        name: "macOS",
        variant: "Mac Arm64",
        link: "#",
      },
      {
        name: "macOS",
        variant: "Mac x64",
        link: "#",
      },
      {
        name: "Windows",
        variant: "Windows 10/11 (Arm64)",
        link: "#",
      },
      {
        name: "Windows",
        variant: "Windows 10/11 (x64)",
        link: "#",
      },
      {
        name: "Linux",
        variant: "AppImage (Arm64)",
        link: "#",
      },
      {
        name: "Linux",
        variant: "AppImage (x64)",
        link: "#",
      },
    ],
  },
];

interface Download6Props {
  className?: string;
}

const Download6 = ({ className }: Download6Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold md:text-5xl">Download</h1>
          <p className="text-muted-foreground md:text-lg">
            Select your operating system to access the newest release.
          </p>
        </div>
        <div className="mt-12 space-y-8 md:mt-16">
          {downloads.map((download, idx) => (
            <div key={idx}>
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
                {download.version}
                {idx === 0 && <Badge variant="outline">Latest</Badge>}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {download.platforms.map((platform, idx) => (
                  <a
                    href={platform.link}
                    key={idx}
                    className="group flex justify-between rounded-lg border border-border p-4 transition-all duration-200 hover:border-primary hover:bg-muted"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{platform.name}</h3>
                      <p className="font-mono text-sm text-muted-foreground">
                        {platform.variant}
                      </p>
                    </div>
                    <div>
                      <Download className="size-4 transition-transform duration-200 group-hover:translate-y-1" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Download6 };
