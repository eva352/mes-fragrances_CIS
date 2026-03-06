import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Feature9Props {
  className?: string;
}

const Feature9 = ({ className }: Feature9Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <Badge variant="outline">Badge</Badge>
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            This is where your feature goes
          </h2>
          <p className="text-muted-foreground lg:text-lg">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row">
            <Card className="flex flex-col justify-between gap-5 lg:w-1/3">
              <CardHeader className="items-start">
                <Badge variant="outline">Badge</Badge>
              </CardHeader>
              <CardContent className="text-lg lg:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                nostrum ullam. Voluptatibus.
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  Read more
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <div className="lg:w-1/3">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt=""
                className="h-full max-h-96 w-full rounded-md object-cover"
              />
            </div>
            <Card className="flex flex-col justify-between gap-5 lg:w-1/3">
              <CardHeader className="items-start">
                <Badge variant="outline">Badge</Badge>
              </CardHeader>
              <CardContent className="text-lg lg:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                nostrum ullam. Voluptatibus.
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  Read more
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature9 };
