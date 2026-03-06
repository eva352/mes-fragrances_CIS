import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Contact5Props {
  className?: string;
}

const Contact5 = ({ className }: Contact5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-14 text-center">
          <h1 className="mt-1 mb-3 text-3xl font-semibold md:text-4xl">
            Contact Us
          </h1>
        </div>
        <div className="mx-auto flex max-w-lg flex-col gap-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="firstname">
              First Name<span className="text-red-500">*</span>
            </Label>
            <Input type="text" id="firstname" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="lastname">
              Last Name<span className="text-red-500">*</span>
            </Label>
            <Input type="text" id="lastname" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">
              Email Address<span className="text-red-500">*</span>
            </Label>
            <Input type="email" id="email" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="phone">
              Phone Number<span className="text-red-500">*</span>
            </Label>
            <Input type="tel" id="phone" />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="message">
              Message<span className="text-red-500">*</span>
            </Label>
            <Textarea placeholder="Tell us about your inquiry" id="message" />
          </div>
          <Button className="w-full">Submit</Button>
        </div>
      </div>
    </section>
  );
};

export { Contact5 };
