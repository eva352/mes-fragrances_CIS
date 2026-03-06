"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const OfferModal1 = () => {
  return (
    <Dialog defaultOpen modal={false}>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="duration-300 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full max-w-[460px] bottom-4 left-auto right-4 top-auto block h-fit max-h-dvh translate-x-0 translate-y-0 space-y-2.5 rounded-sm p-10"
      >
        <div className="absolute end-1.5 top-1.5">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="text-muted-foreground text-xs uppercase"
              size="sm"
            >
              Close
            </Button>
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className="text-start font-serif text-2xl font-normal leading-snug">
            Join our newsletter and enjoy 35% off your first order
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2.5">
          <Input type="email" placeholder="Email" />
          <Button className="w-full text-xs uppercase">subscribe</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { OfferModal1 };
