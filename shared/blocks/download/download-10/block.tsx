import {
  FaApple,
  FaChrome,
  FaFirefox,
  FaSafari,
  FaWindows,
} from "react-icons/fa";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Download10Props {
  className?: string;
}

const Download10 = ({ className }: Download10Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-5xl font-semibold md:text-7xl">
            Get Started Today
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            Transform your workflow with powerful tools designed to boost
            productivity, streamline collaboration, and help you achieve your
            goals faster than ever before.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 place-items-center gap-6 lg:grid-cols-3">
          <div className="flex h-full w-full max-w-md flex-col justify-between gap-6 rounded-xl border border-border p-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Desktop App</h2>
              <p className="text-muted-foreground">
                Experience the full power of our platform on all your devices
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="lg">
                <FaApple /> Download for Mac
              </Button>
              <Button variant="outline" size="lg">
                <FaWindows /> Download for Windows
              </Button>
            </div>
          </div>
          <div className="flex h-full w-full max-w-md flex-col justify-between gap-6 rounded-xl border border-border p-8">
            <div className="flex w-full flex-col gap-2">
              <h2 className="text-2xl font-semibold">Mobile App</h2>
              <p className="text-muted-foreground">
                Take your productivity on the go with our mobile application
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Available on your favorite app stores:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a href="#">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/badges/appstore.png"
                    alt="Download for iOS"
                    className="h-auto w-full"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/badges/googleplay.png"
                    alt="Download for Android"
                    className="h-auto w-full"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="flex h-full w-full max-w-md flex-col justify-between gap-6 rounded-xl border border-border p-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Web Extension</h2>
              <p className="text-muted-foreground">
                Access our tools directly from your web browser
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="lg"
                className="h-19 w-20 flex-col p-3"
              >
                <FaChrome className="size-6" /> Chrome
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-19 w-20 flex-col p-3"
              >
                <FaFirefox className="size-6" /> Firefox
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-19 w-20 flex-col p-3"
              >
                <FaSafari className="size-6" /> Safari
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Download10 };
