"use client";

import { Download } from "lucide-react";
import { FaApple, FaGooglePlay, FaLinux, FaWindows } from "react-icons/fa";
import { SiDebian } from "react-icons/si";

import { cn } from "@/lib/utils";

import { GlareCard } from "@/components/aceternity/glare-card";
import { Button } from "@/components/ui/button";

const downloadData = {
  ios: [{ icon: FaApple, label: "App Store" }],
  android: [
    { icon: FaGooglePlay, label: "Google Play" },
    { icon: Download, label: "APK (Direct)" },
  ],
  windows: [
    { icon: FaWindows, label: "Installer (.exe)" },
    { icon: Download, label: "Portable (.zip)" },
  ],
  mac: [
    { icon: FaApple, label: "DMG" },
    { icon: Download, label: "Universal (.zip)" },
  ],
  linux: [
    { icon: FaLinux, label: "AppImage" },
    { icon: SiDebian, label: "Debian (.deb)" },
    { icon: Download, label: "Tarball (.tar.gz)" },
  ],
};

interface Download8Props {
  className?: string;
}

const Download8 = ({ className }: Download8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-11">
          <div className="[&>div]:aspect-square [&>div]:size-56 sm:[&>div]:size-64 [&>div>div]:border-border">
            <GlareCard className="flex flex-col items-center justify-center bg-primary dark:bg-background">
              <div className="absolute inset-0 flex h-full w-full items-center justify-center p-8">
                <img
                  className="object-cover opacity-85 invert"
                  alt=""
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                />
              </div>
            </GlareCard>
          </div>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Shadcnblocks.com
          </h1>
        </div>
        <div className="mt-11 flex flex-col items-center justify-center gap-4">
          <Button size="lg">
            Download (Auto Detect)
            <Download />
          </Button>
          <p className="text-sm text-muted-foreground">
            Last updated September 23, 2025
          </p>
        </div>
        <div className="mt-8">
          <div className="mx-auto max-w-2xl">
            <div className="divide-y divide-border rounded-lg border border-border">
              {Object.entries(downloadData).map(([platform, variants], idx) => (
                <div key={idx} className="grid grid-cols-2 gap-4 px-4 py-3">
                  <span className="text-sm font-medium capitalize">
                    {platform}
                  </span>
                  <div className="flex flex-col gap-2">
                    {variants.map((variant, idx) => {
                      const IconComponent = variant.icon;
                      return (
                        <Button
                          key={idx}
                          size="sm"
                          variant="outline"
                          className="flex cursor-pointer items-center"
                        >
                          <IconComponent className="size-4" />
                          {variant.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Download8 };
