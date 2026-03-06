import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface list {
  title: string;
  value: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
}

const LIST: Array<list> = [
  {
    title: "Edit your video simply by editing the text.",
    value: "1",
    summary:
      "transcribes your recordings automatically. To edit the video, just edit the transcript—hit delete to cut parts and copy-paste to rearrange segments. It’s that easy.",
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "",
    },
  },
  {
    title: "Crystal-clear audio delivered at lightning speed.",
    value: "2",
    summary:
      "Eliminate filler words, close awkward pauses, and make it sound like a professional studio recording—all with our AI and just a click or two.",
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      alt: "",
    },
  },
  {
    title: "No need to remember your lines—or tidy up your space.",
    value: "3",
    summary:
      "Keep your gaze fixed on the camera, even if you were reading your script the entire time. Use AI green screen to swap out your messy background for a more professional one.",
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      alt: "",
    },
  },
];
interface Feature213Props {
  className?: string;
}

const Feature213 = ({ className }: Feature213Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-8 flex max-w-[52.5rem] flex-col items-center justify-between gap-6 md:mb-20">
          <h2 className="text-center text-5xl text-foreground lg:text-7xl">
            Speed up production without sacrificing quality
          </h2>
        </div>
        <div>
          <Tabs defaultValue={LIST[0].value} className="gap-14 xl:flex-row">
            <TabsList className="h-fit w-fit flex-col gap-2.5 bg-transparent p-0">
              {LIST.map((item, i) => (
                <TabsTrigger
                  className="flex-col items-start rounded-[0.75rem] p-5 text-left whitespace-normal data-[state=active]:bg-muted xl:max-w-[34.0625rem]"
                  key={`tab-trigger-${i}`}
                  value={item.value}
                >
                  <div className="leading-normal font-bold">{item.title}</div>
                  <div className="leading-normal text-muted-foreground">
                    {item.summary}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {LIST.map((item, i) => (
              <TabsContent
                className="w-full"
                key={`tab-content-${i}`}
                value={item.value}
              >
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden rounded-[0.75rem]"
                >
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="block size-full object-cover object-center"
                  />
                </AspectRatio>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature213 };
