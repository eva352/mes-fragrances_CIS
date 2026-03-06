import React from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Contact14Props {
  className?: string;
}

const Contact14 = ({ className }: Contact14Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <Card className="w-full rounded-4xl border-none bg-muted">
          <CardContent className="relative overflow-hidden py-12 lg:px-18 lg:py-24">
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-6">
                <p className="text-sm font-semibold tracking-tight text-muted-foreground">
                  SHADCNBLOCKS.COM
                </p>
                <div className="relative flex size-30 items-center justify-center rounded-3xl bg-foreground p-2.5 shadow-xl">
                  <div className="flex size-full items-center justify-center rounded-2xl bg-background p-4">
                    <Avatar className="size-full">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                        alt="avatar"
                        className="object-cover"
                      />
                      <AvatarFallback>Shadcn</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <h1 className="text-5xl font-bold tracking-tighter text-foreground">
                  Contact Us
                </h1>

                <ul className="max-w-lg space-y-2 tracking-tight">
                  <li className="flex items-center">
                    <span className="mr-2 font-bold">Email:</span>{" "}
                    <span className="text-foreground/80 underline">
                      example@shadcnblocks.com
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 font-bold">Phone:</span>{" "}
                    <span className="text-foreground/80">
                      +1 (555) 123-4567
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 font-bold">Address:</span>
                    <span className="text-foreground/80">
                      123 Design Street, UI City
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 font-bold">Hours:</span>{" "}
                    <span className="text-foreground/80">
                      Mon-Fri, 9am-5pm EST
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex h-auto flex-col gap-2 space-y-3 md:pl-3">
                <Input placeholder="Name" className="bg-background p-6" />
                <Input placeholder="Phone" className="bg-background p-6" />

                <Button className="h-10 w-fit">Contact Us</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export { Contact14 };
