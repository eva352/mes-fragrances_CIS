import { MessageCircleQuestion } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const DATA = [
  {
    question: "Is there a free version?",
    answer:
      "Yes! We offer a Free Plan with essential features. You can upgrade anytime for advanced tools and integrations.",
  },
  {
    question: "What apps can I integrate?",
    answer:
      "Our platform supports integration with various popular apps and services. The specific integrations available depend on your plan level.",
  },
  {
    question: "How does the AI work?",
    answer:
      "Our AI technology uses advanced machine learning algorithms to analyze and process your data, providing intelligent insights and automation capabilities.",
  },
  {
    question: "Can I use this with a team?",
    answer:
      "Absolutely! Our platform is designed for both individual and team use. You can easily collaborate and share resources with team members.",
  },
  {
    question: "Is my data safe?",
    answer:
      "We take data security seriously. All data is encrypted and stored securely following industry best practices and compliance standards.",
  },
  {
    question: "How do I manage my subscription?",
    answer:
      "You can manage your subscription easily through your account dashboard, where you can upgrade, downgrade, or modify your plan settings.",
  },
];

interface Faq10Props {
  className?: string;
}

const Faq10 = ({ className }: Faq10Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <MessageCircleQuestion className="size-4" />

            <span>FAQ</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Everything You Need to Know
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Looking for quick answers? Check out our{" "}
            <span className="underline">FAQ section</span>.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="mx-auto max-w-3xl pt-8 pb-4 md:pb-8 lg:pt-[3.75rem] lg:pb-[50px]">
          <Accordion type="single" collapsible className="space-y-4">
            {DATA.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-[7px] border px-6 text-primary data-[state=open]:pb-2"
              >
                <AccordionTrigger className="py-5 text-start text-base tracking-[-0.32px]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base tracking-[-0.32px] text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export { Faq10 };
