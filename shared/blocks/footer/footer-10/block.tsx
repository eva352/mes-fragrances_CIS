"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface Footer10Props {
  className?: string;
}

const Footer10 = ({ className }: Footer10Props) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateLondonTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/London",
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
      };
      const londonTime = new Intl.DateTimeFormat("en-GB", options).format(
        new Date(),
      );
      setTime(londonTime);
    };

    updateLondonTime();
    const intervalId = setInterval(updateLondonTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/shadcnblocks-giant-black-text.svg"
              alt="footer"
              className="aspect-[13.7] w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-between py-12 text-muted-foreground md:flex-row">
            <div>© Shadcnblocks.com 2024</div>
            <div>Time → {time}</div>
            <div>example@shadcnblocks.com</div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer10 };
