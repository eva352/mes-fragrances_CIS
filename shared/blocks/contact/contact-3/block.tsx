import {
  MessageCircleDashed,
  MessagesSquare,
  ScanFace,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Contact3Props {
  className?: string;
}

const Contact3 = ({ className }: Contact3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <h1 className="mb-7 text-4xl font-bold md:text-6xl">Get in Touch</h1>
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button size="lg">Request a demo</Button>
            <Button variant="outline" size="lg">
              Start your free trial
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No payment details needed
          </p>
        </div>
        <div className="mt-28 grid gap-16 md:grid-cols-2">
          <div>
            <MessagesSquare className="mb-5 h-8 w-auto" />
            <p className="mb-2 font-bold md:text-xl">Support</p>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              Need help or have questions? Our support team is here for you
              24/7. Feel free to reach out via email or live chat.
            </p>
            <a href="#" className="font-semibold hover:underline">
              Contact support
            </a>
          </div>
          <div>
            <Users className="mb-5 h-8 w-auto" />
            <p className="mb-2 font-bold md:text-xl">Sales</p>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              Have questions about our services or need a demo? Our sales team
              can assist you with personalized solutions.
            </p>
            <a href="#" className="font-semibold hover:underline">
              Talk to sales
            </a>
          </div>
          <div>
            <MessageCircleDashed className="mb-5 h-8 w-auto" />
            <p className="mb-2 font-bold md:text-xl">Inquiries</p>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              For any general inquiries, partnership requests, or media
              questions, fill out the form and we’ll get back to you shortly.
            </p>
            <a href="#" className="font-semibold hover:underline">
              Contact us
            </a>
          </div>
          <div>
            <ScanFace className="mb-5 h-8 w-auto" />
            <p className="mb-2 font-bold md:text-xl">Verification</p>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              To verify employment or confirm income, please reach out to our
              third-party verification provider.
            </p>
            <a href="#" className="font-semibold hover:underline">
              Get verified
            </a>
          </div>
        </div>
        <div className="mt-28">
          <h1 className="mb-16 text-center text-2xl font-bold md:text-4xl">
            Our Global Offices
          </h1>
          <div className="mx-auto grid max-w-7xl gap-7 sm:grid-cols-2 md:grid-cols-3 lg:px-14">
            <div className="rounded-lg border p-5">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-5 w-7 rounded-sm bg-blue-500"></div>
                <p className="font-bold sm:text-lg">New York, USA</p>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                123 5th Ave, New York, NY 10001
              </p>
            </div>
            <div className="rounded-lg border p-5">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-5 w-7 rounded-sm bg-red-500"></div>
                <p className="font-bold sm:text-lg">London, UK</p>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                50 Oxford St, London W1D 1BS, United Kingdom
              </p>
            </div>
            <div className="rounded-lg border p-5">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-5 w-7 rounded-sm bg-green-500"></div>
                <p className="font-bold sm:text-lg">Tokyo, Japan</p>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                2-7-5 Kyobashi, Chuo-ku, Tokyo 104-0031, Japan
              </p>
            </div>
            <div className="rounded-lg border p-5">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-5 w-7 rounded-sm bg-yellow-500"></div>
                <p className="font-bold sm:text-lg">Sydney, Australia</p>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                100 George St, Sydney NSW 2000, Australia
              </p>
            </div>
            <div className="rounded-lg border p-5">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-5 w-7 rounded-sm bg-purple-500"></div>
                <p className="leading-3 font-bold sm:text-lg">
                  Berlin, Germany
                </p>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                Unter den Linden 52, 10117 Berlin, Germany
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact3 };
