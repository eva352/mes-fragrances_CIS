"use client";

import {
  Eye,
  FileText,
  Languages,
  Mic,
  MonitorSmartphone,
  Scissors,
  Subtitles,
  XCircle,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: "clips",
    title: "Clips",
    description:
      "Let AI find the clips most likely to go viral, then use your creativity and Descript's easy editing to make them pop.",
    icon: <Scissors className="h-5 w-5" />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "translation",
    title: "Translation",
    description:
      "Take your content to new markets with blazing-fast AI translation.",
    icon: <Languages className="h-5 w-5" />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: "eye-contact",
    title: "Eye Contact",
    description:
      "Go ahead, read your script. AI will make it seem like you were looking at the camera the whole time.",
    icon: <Eye className="h-5 w-5" />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    id: "studio-sound",
    title: "Studio Sound",
    description:
      "Use regenerative AI to remove noise and enhance voices. No pricey mics or soundproofing required.",
    icon: <Mic className="h-5 w-5" />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    id: "remove-filler",
    title: "Remove filler words",
    description:
      'Instantly cut all your "ums," "uhs" and other filler words. You\'ll save hours.',
    icon: <XCircle className="h-5 w-5" />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    id: "green-screen",
    title: "Green Screen",
    description:
      "Don't bother straightening up. Descript's AI will scrub out your background. You pick a new one.",
    icon: <MonitorSmartphone className="h-5 w-5" />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    id: "transcription",
    title: "Transcription",
    description:
      "Drag in an audio or video file; AI will transcribe it in moments. Now the magic starts.",
    icon: <FileText className="h-5 w-5" />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "captions",
    title: "Captions",
    description:
      "Add captions — and accessibility, and views, and pizazz — in a couple clicks.",
    icon: <Subtitles className="h-5 w-5" />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
];

interface Feature225Props {
  className?: string;
}

const Feature225 = ({ className }: Feature225Props) => {
  const [activeTab, setActiveTab] = useState<string>(FEATURES[0].id);

  return (
    <section
      className={cn("w-full bg-background py-12 md:py-24 lg:py-32", className)}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            AI superpowers at every step
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Descript's AI editorial assistant tackles the tedium and leaves the
            creative stuff to you.
          </p>
        </div>

        <div className="mt-16">
          <Tabs
            defaultValue={FEATURES[0].id}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((feature) => (
                <Card
                  key={feature.id}
                  className={cn(
                    "cursor-pointer overflow-hidden transition-all hover:shadow-md",
                    activeTab === feature.id ? "ring-2 ring-primary" : "",
                  )}
                  onClick={() => setActiveTab(feature.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-left text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Hidden TabsList with TabsTriggers for accessibility */}
            <div className="sr-only">
              <TabsList>
                {FEATURES.map((feature) => (
                  <TabsTrigger key={feature.id} value={feature.id}>
                    {feature.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="mt-8">
              {FEATURES.map((feature) => (
                <TabsContent
                  key={feature.id}
                  value={feature.id}
                  className="mt-0 rounded-lg border bg-card p-0 shadow-sm"
                >
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    {feature.image ? (
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <p className="text-muted-foreground">
                          Image placeholder
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature225 };
