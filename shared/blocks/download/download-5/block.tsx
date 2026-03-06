"use client";

import { Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { FaLinux, FaWindows } from "react-icons/fa";

import { cn } from "@/lib/utils";

import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/kibo-ui/snippet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";

interface Download5Props {
  className?: string;
}

const Download5 = ({ className }: Download5Props) => {
  const [linuxVersion, setLinuxVersion] = useState("stable");

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-16 md:flex-row md:items-start">
          <div className="rounded-lg border border-border bg-background p-1.5">
            <div className="rounded-md border border-border bg-primary p-8">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="logo"
                className="w-32 invert"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-medium tracking-tighter">
                  Download Version 2.2.5
                </h1>
                <time
                  dateTime="2025-08-22"
                  className="text-sm text-muted-foreground"
                >
                  August 22, 2025
                </time>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <FaLinux />
                  <p className="text-sm">Linux</p>
                </div>
                <Snippet
                  defaultValue="stable"
                  value={linuxVersion}
                  onValueChange={setLinuxVersion}
                >
                  <SnippetHeader>
                    <SnippetTabsList>
                      <SnippetTabsTrigger value="stable">
                        <span>Stable</span>
                      </SnippetTabsTrigger>
                      <SnippetTabsTrigger value="preview">
                        <span>Preview</span>
                      </SnippetTabsTrigger>
                    </SnippetTabsList>
                    <SnippetCopyButton
                      onCopy={() =>
                        console.log(
                          `Copied "curl -f https://shadcnblocks.com/install.sh | bash" to clipboard`,
                        )
                      }
                      onError={() =>
                        console.error(
                          `Failed to copy "curl -f https://shadcnblocks.com/install.sh | bash" to clipboard`,
                        )
                      }
                      value={
                        linuxVersion === "stable"
                          ? "curl -f https://shadcnblocks.com/install.sh | bash"
                          : "curl -f https://shadcnblocks.com/preview.sh | bash"
                      }
                    />
                  </SnippetHeader>
                  <SnippetTabsContent value="stable">
                    curl -f https://shadcnblocks.com/install.sh | bash
                  </SnippetTabsContent>
                  <SnippetTabsContent value="preview">
                    curl -f https://shadcnblocks.com/preview.sh | bash
                  </SnippetTabsContent>
                </Snippet>
                <p className="text-xs text-muted-foreground">
                  You can also download the package{" "}
                  <a href="https://shadcnblocks.com" className="underline">
                    manually
                  </a>
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/platforms/macos.png"
                    alt="macos"
                    className="h-4 w-4 grayscale"
                  />
                  <p className="text-sm">MacOS</p>
                </div>
                <Snippet defaultValue="apple-silicon">
                  <SnippetHeader>
                    <SnippetTabsList>
                      <SnippetTabsTrigger value="apple-silicon">
                        <span>Apple Silicon</span>
                      </SnippetTabsTrigger>
                      <SnippetTabsTrigger value="intel">
                        <span>Intel</span>
                      </SnippetTabsTrigger>
                    </SnippetTabsList>
                  </SnippetHeader>
                  <TabsContent
                    value="apple-silicon"
                    className="mt-0 bg-background text-sm"
                  >
                    <button className="flex h-[52px] w-full items-center justify-between px-4 text-left transition-colors hover:bg-accent">
                      <div className="flex flex-col">
                        <p className="font-bold">Download now</p>
                        <p className="text-xs">Apple Silicon</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs">1.2GB</p>
                        <Download className="size-4" />
                      </div>
                    </button>
                  </TabsContent>
                  <TabsContent
                    value="intel"
                    className="mt-0 bg-background text-sm"
                  >
                    <button className="flex h-[52px] w-full items-center justify-between px-4 text-left transition-colors hover:bg-accent">
                      <div className="flex flex-col">
                        <p className="font-bold">Download now</p>
                        <p className="text-xs">Intel</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs">1.2GB</p>
                        <Download className="size-4" />
                      </div>
                    </button>
                  </TabsContent>
                </Snippet>
                <p className="text-xs text-muted-foreground">
                  Requires version 10.15 or later
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <FaWindows />
                  <p className="text-sm">Windows</p>
                </div>
                <Button variant="outline" className="w-full justify-between">
                  Sign up for waitlist
                  <ExternalLink className="size-3.5" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Or you can build from{" "}
                  <a href="#" className="underline">
                    source
                  </a>
                </p>
              </div>
            </div>
            <div>
              <Separator />
              <p className="mt-4 text-xs text-muted-foreground">
                By downloading and using our software, you agree to its{" "}
                <a href="#" className="underline">
                  terms and conditions
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Download5 };
