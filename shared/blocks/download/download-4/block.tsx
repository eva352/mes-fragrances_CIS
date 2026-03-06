import { Download, Monitor, Shield, Users, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Download4Props {
  heading?: string;
  description?: string;
  version?: string;
  fileSize?: string;
  features?: string[];
  downloadButton?: {
    text: string;
    url: string;
  };
  learnMoreButton?: {
    text: string;
    url: string;
  };
  className?: string;
}

const Download4 = ({
  heading = "Professional Desktop Suite",
  description = "Download our complete desktop application with enterprise-grade features and unlimited access.",
  version = "v3.2.1",
  fileSize = "230 MB",
  features = [
    "Advanced analytics and reporting",
    "Enterprise security and encryption",
    "Unlimited project management",
    "24/7 priority support access",
  ],
  downloadButton = {
    text: "Free Download",
    url: "#",
  },
  learnMoreButton = {
    text: "Documentation",
    url: "#",
  },
  className,
}: Download4Props) => {
  return (
    <section className={cn("bg-muted/30 py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">
              Latest Release
            </Badge>
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Main Download Card */}
          <Card className="border bg-background p-0 shadow-lg">
            <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center">
              {/* Left Side - App Info */}
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">Desktop Application</h3>
                    <p className="text-muted-foreground">
                      Windows • macOS • Linux
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {features.map((feature, index) => {
                    const icons = [Shield, Zap, Users, Monitor];
                    const Icon = icons[index % icons.length];
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                          <Icon className="h-4 w-4 text-foreground" />
                        </div>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side - Download */}
              <div className="lg:pl-8">
                <div className="rounded-2xl border bg-muted/50 p-6">
                  <div className="mb-6 text-center">
                    <div className="mb-2 flex items-center justify-center gap-4">
                      <span className="text-2xl font-bold">{version}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="font-medium text-muted-foreground">
                        {fileSize}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Latest stable release
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full" asChild>
                      <a href={downloadButton.url}>
                        <Download className="mr-2 h-5 w-5" />
                        {downloadButton.text}
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      asChild
                    >
                      <a href={learnMoreButton.url}>{learnMoreButton.text}</a>
                    </Button>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      No signup required • Instant download • 30-day trial
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Join 100,000+ teams already using our desktop application
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Download4 };
