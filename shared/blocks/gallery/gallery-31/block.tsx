import { cn } from "@/lib/utils";

import { DirectionAwareHover } from "@/components/aceternity/direction-aware-hover";

interface FeatureData {
  imgClass: string;
  imgsrc: string;
  ptitle: string;
  pdes: string;
}

interface Gallery31Props {
  featureData?: FeatureData[];
  className?: string;
}

const defaultFeatureData: FeatureData[] = [
  {
    imgClass: "md:h-70 w-full rounded-3xl md:w-full",
    imgsrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
    ptitle: "Gaming Controller",
    pdes: "$199",
  },
  {
    imgClass: "md:h-70 w-full rounded-3xl md:w-full lg:col-span-2",
    imgsrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img6.jpeg",
    ptitle: "Wireless Headphones",
    pdes: "$189",
  },
  {
    imgClass:
      "md:h-70 col-span-1 h-full w-full rounded-3xl md:w-full lg:row-span-2 lg:h-full",
    imgsrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg",
    ptitle: "Smart Watch",
    pdes: "$249",
  },
  {
    imgClass: "md:h-70 w-full rounded-3xl md:w-full lg:col-span-2",
    imgsrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img14.jpeg",
    ptitle: "Bluetooth Speaker",
    pdes: "$179",
  },
  {
    imgClass: "md:h-70 w-full rounded-3xl md:w-full",
    imgsrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg",
    ptitle: "Mechanical Keyboard",
    pdes: "$219",
  },
];

const Gallery31: React.FC<Gallery31Props> = ({
  featureData = defaultFeatureData,
  className,
}) => {
  return (
    <section className={cn("relative h-full overflow-hidden py-32", className)}>
      <div className="relative container flex h-full w-full flex-col items-center justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center gap-5">
          <p className="rounded-full bg-muted px-2 py-1 text-xs uppercase">
            CATALOG
          </p>
          <h2 className="text-center font-calSans text-5xl font-medium md:text-6xl">
            Exclusive shadcnblocks
          </h2>
          <p className="text-center text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </p>
        </div>
        <div className="relative mt-[34px] grid w-full grid-cols-1 justify-center gap-[10px] md:grid-cols-2 lg:grid-cols-4">
          {featureData.map((item, index) => (
            <DirectionAwareHover
              key={index}
              className={item.imgClass}
              imageUrl={item.imgsrc}
            >
              <p className="text-xl font-bold">{item.ptitle}</p>
              <p className="text-sm font-normal">{item.pdes}</p>
            </DirectionAwareHover>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery31 };
