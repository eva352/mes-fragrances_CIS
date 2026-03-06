import { CheckCircle, Download } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Download3Props {
  heading?: string;
  description?: string;
  version?: string;
  fileSize?: string;
  requirements?: string[];
  downloadButton?: {
    text: string;
    url: string;
    className?: string;
  };
  secondaryButton?: {
    text: string;
    url: string;
  };
  className?: string;
}

const Download3 = ({
  heading = "Download for Desktop",
  description = "Get the full desktop experience with our powerful application. Compatible with Windows, macOS, and Linux.",
  version = "Version 2.1.0",
  fileSize = "145 MB",
  requirements = [
    "Windows 10+ / macOS 10.15+ / Ubuntu 18.04+",
    "4GB RAM minimum",
    "1GB free disk space",
    "Internet connection required",
  ],
  downloadButton = {
    text: "Download Now",
    url: "#",
  },
  secondaryButton = {
    text: "View Release Notes",
    url: "#",
  },
  className,
}: Download3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          {/* Header */}
          <div className="mb-12 flex flex-col items-center gap-4">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo.svg"
              alt="Download on the App Store"
              className="h-14"
            />
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>

          {/* Download Card */}
          <Card className="p-8 text-left">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Desktop Application</h3>
                <p className="text-muted-foreground">PC / Mac / Linux</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{version}</p>
                <p className="text-sm text-muted-foreground">{fileSize}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-2">
              <h4 className="mb-4 font-semibold">System Requirements:</h4>
              <div className="space-y-2">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-sm text-muted-foreground">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1" asChild>
                <a href={downloadButton.url}>
                  <Download className="mr-2 h-5 w-5" />
                  {downloadButton.text}
                </a>
              </Button>
              <Button variant="outline" size="lg" className="flex-1" asChild>
                <a href={secondaryButton.url}>{secondaryButton.text}</a>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Free download • No registration required • 30-day free trial
              </p>
            </div>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Trusted by 50,000+ professionals worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Download3 };
