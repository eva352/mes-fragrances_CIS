import { Copy, ExternalLink, GitPullRequest, Maximize2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const changes = [
  {
    title: "v3.0.0: Major UI Refresh & New Integrations",
    date: "May 15, 2025",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    excerpt:
      "This major release introduces a completely redesigned user interface for a more intuitive experience and adds powerful new integrations with popular third-party services.",
    contributors: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    ],
    link: "#",
    content: (
      <div className="prose dark:prose-invert">
        <h3>Revamped User Experience</h3>
        <p>
          We've listened to your feedback and rebuilt the UI from the ground up.
          The new design is cleaner, faster, and more accessible.
        </p>
        <p>Key visual and usability improvements include:</p>
        <ul>
          <li>Modernized iconography and typography</li>
          <li>Improved navigation and information architecture</li>
          <li>Enhanced dashboard customization options</li>
        </ul>
        <h4>Exciting New Integrations</h4>
        <p>
          Connect your favorite tools seamlessly. We've added direct
          integrations for Slack, Google Drive, and Trello to streamline your
          workflows.
        </p>
        <blockquote>
          "Simplicity is the ultimate sophistication." - Leonardo da Vinci
        </blockquote>
        <p>
          We believe these updates will significantly enhance your productivity.
        </p>
        <table>
          <thead>
            <tr>
              <th>Integration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Slack</td>
              <td>Released</td>
            </tr>
            <tr>
              <td>Google Drive</td>
              <td>Released</td>
            </tr>
            <tr>
              <td>Trello</td>
              <td>Beta</td>
            </tr>
          </tbody>
        </table>
        <p>
          Explore the full list of changes in our updated{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            RELEASE_NOTES.md
          </code>{" "}
          file.
        </p>
        <p className="small">
          Note: Some integrations are progressively rolling out.
        </p>
        <p className="text-sm text-muted-foreground">
          We can't wait to hear what you think!
        </p>
      </div>
    ),
  },
  {
    title: "v2.9.5: Performance Boost & API Enhancements",
    date: "April 02, 2025",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    excerpt:
      "This release focuses on significant performance improvements across the platform and introduces new API endpoints for greater developer flexibility.",
    contributors: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    ],
    link: "#",
    content: (
      <div className="prose dark:prose-invert">
        <h3>Lightning Fast Performance</h3>
        <p>
          We've optimized critical pathways and database queries, resulting in
          noticeably faster load times and a smoother overall user experience.
        </p>
        <p>Key performance metrics improved:</p>
        <ul>
          <li>Average page load time reduced by 30%</li>
          <li>API response times now 2x faster</li>
          <li>Reduced memory footprint for background processes</li>
        </ul>
        <h4>Expanded API Capabilities</h4>
        <p>
          Developers can now leverage new API endpoints for managing user roles
          and accessing advanced analytics data. Check out the updated API
          documentation.
        </p>
        <blockquote>
          "The bitterness of poor quality remains long after the sweetness of
          low price is forgotten." - Benjamin Franklin
        </blockquote>
        <p>Our commitment to quality and performance is unwavering.</p>
        <table>
          <thead>
            <tr>
              <th>Area</th>
              <th>Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dashboard Loading</td>
              <td>Significant Speedup</td>
            </tr>
            <tr>
              <td>Data Export</td>
              <td>Optimized</td>
            </tr>
          </tbody>
        </table>
        <p>
          Dive into the technical details in our engineering blog post:{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            EngineeringDeepDive_v2.9.5.pdf
          </code>
        </p>
        <p className="small">Note: API changes are backward compatible.</p>
        <p className="text-sm text-muted-foreground">
          Your continued support drives our innovation.
        </p>
      </div>
    ),
  },
];

interface Changelog6Props {
  className?: string;
}

const Changelog6 = ({ className }: Changelog6Props) => {
  return (
    <section className={cn("overflow-clip py-32", className)}>
      <div className="container border-x border-border">
        <div className="relative flex flex-col gap-3 py-8">
          <div className="flex items-center gap-2">
            <GitPullRequest className="size-4" />
            <p className="text-sm font-medium">Changelog</p>
          </div>
          <h1 className="text-3xl font-medium lg:text-4xl">
            Latest Enhancements
            <br /> & Platform News
          </h1>
          <div className="absolute right-0 bottom-0 left-0 h-px w-[200vw] -translate-x-1/2 bg-border" />
          <div className="absolute top-0 right-0 left-0 h-px w-[200vw] -translate-x-1/2 bg-border" />
        </div>
        <div className="flex flex-col">
          {changes.map((change, idx) => (
            <Dialog key={idx}>
              <div className="relative flex w-full flex-col gap-4 py-16 lg:flex-row lg:gap-0">
                <div className="top-2 left-0 mt-2 block h-fit lg:sticky">
                  <time className="w-36 text-sm font-medium text-muted-foreground lg:absolute">
                    {change.date}
                  </time>
                </div>
                <div className="flex max-w-prose flex-col gap-4 lg:mx-auto">
                  <h3 className="text-3xl font-medium lg:text-4xl">
                    {change.title}
                  </h3>
                  <DialogTrigger asChild>
                    <img
                      src={change.image}
                      alt={change.title}
                      className="max-h-96 w-full cursor-pointer rounded-lg border border-border object-cover"
                    />
                  </DialogTrigger>
                  <p className="text-sm font-medium text-muted-foreground">
                    {change.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center -space-x-2">
                        {change.contributors
                          .slice(0, 3)
                          .map((contributor, idx) => (
                            <img
                              key={idx}
                              src={contributor}
                              alt={change.title}
                              className="size-6 rounded-full border border-border"
                            />
                          ))}
                      </div>
                      {change.contributors.length > 3 && (
                        <span className="text-sm font-medium text-muted-foreground">
                          +{change.contributors.length - 3} contributors
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Maximize2 className="size-4" />
                              </Button>
                            </DialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Show full release</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Copy className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Open in new tab</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0 h-px w-[200vw] -translate-x-1/2 bg-border" />
              </div>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-prose">
                <DialogHeader>
                  <DialogTitle className="text-left">
                    {change.title}
                  </DialogTitle>
                  <DialogDescription className="text-left">
                    {change.excerpt}
                  </DialogDescription>
                </DialogHeader>
                <img
                  src={change.image}
                  alt={change.title}
                  className="max-h-96 w-full rounded-lg border border-border object-cover"
                />
                {change.content}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Changelog6 };
