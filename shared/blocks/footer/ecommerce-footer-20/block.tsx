"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Plus } from "lucide-react";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";

type NewsletterData = {
  title?: string;
};

type NewsletterFormProps = NewsletterData;

type SocialIcon = {
  title: string;
  light: string;
  dark: string;
};

type SocialLink = {
  link: string;
  icon: SocialIcon;
};

type FooterLink = {
  text: string;
  link?: string;
};

type FooterLinksSection = {
  title: string;
  id: string;
  items: FooterLink[];
};

interface SocialMediaSectionProps {
  links: SocialLink[];
}

interface FooterLinksSectionProps {
  sections: FooterLinksSection[];
}

interface EcommerceFooter20Props {
  newsletter: NewsletterData;
  socialLinks: SocialLink[];
  footerLinks: FooterLinksSection[];
  paymentMethods: string[];
  submenuLinks: {
    text: string;
    link: string;
  }[];
  footerData: {
    image: {
      src: string;
      alt: string;
    };
    homeLink: {
      logo: {
        light: string;
        dark: string;
      };
      link: string;
    };
    title: string;
    description: string;
  };
  className?: string;
}

const NEWSLETTER_DATA = {
  title: "Get updates on offers and products and save 20% on your first order",
};

const SOCIAL_ICONS = {
  facebook: {
    title: "Facebook",
    light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg",
    dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg",
  },
  x: {
    title: "X",
    light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/x.svg",
    dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/x.svg",
  },
  instagram: {
    title: "Instagram",
    light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
    dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
  },
};

const SOCIAL_MEDIA_LINKS = [
  {
    icon: SOCIAL_ICONS.facebook,
    link: "#",
  },
  {
    icon: SOCIAL_ICONS.x,
    link: "#",
  },
  {
    icon: SOCIAL_ICONS.instagram,
    link: "#",
  },
];

const FOOTER_LINKS: FooterLinksSection[] = [
  {
    title: "Collections",
    id: "collections",
    items: [
      {
        text: "New Arrivals",
        link: "#",
      },
      {
        text: "Best Sellers",
        link: "#",
      },
      {
        text: "Seasonal Edits",
        link: "#",
      },
      {
        text: "Wardrobe Essentials",
        link: "#",
      },
    ],
  },
  {
    title: "Help",
    id: "help",
    items: [
      {
        text: "Contact Us",
        link: "#",
      },
      {
        text: "FAQs",
        link: "#",
      },
      {
        text: "Shipping & Tracking",
        link: "#",
      },
      {
        text: "Returns & Exchanges",
        link: "#",
      },
    ],
  },
  {
    title: "Information",
    id: "information",
    items: [
      {
        text: "Terms and Conditions",
        link: "#",
      },
      {
        text: "Privacy Policy",
        link: "#",
      },
      {
        text: "Warranty Policy",
        link: "#",
      },
      {
        text: "Terms of Service",
        link: "#",
      },
    ],
  },
];

const SUBMENU = [
  {
    text: "Shipping Policy",
    link: "#",
  },
  {
    text: "Returns Policy",
    link: "#",
  },
  {
    text: "Terms Of Service",
    link: "#",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
  {
    text: "Sustainability",
    link: "#",
  },
];

const FOOTER_DATA = {
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Modern-Portrait-of-a-Woman-and-Man-2.png",
    alt: "",
  },
  homeLink: {
    logo: {
      light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
      dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark-white.svg",
    },
    link: "#",
  },
  title: "Where Modern Fashion Meets Comfort",
  description:
    "We design clothing that empowers women to express their individuality through thoughtful details, flattering fits, and beautifully crafted essentials.",
};

const PAYMENT_METHODS = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/amazonpay.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/applepay.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/mastercard.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/paypal.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/visa.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/discover.svg",
];

const EcommerceFooter20 = ({
  newsletter = NEWSLETTER_DATA,
  socialLinks = SOCIAL_MEDIA_LINKS,
  footerLinks = FOOTER_LINKS,
  paymentMethods = PAYMENT_METHODS,
  submenuLinks = SUBMENU,
  footerData = FOOTER_DATA,
  className,
}: EcommerceFooter20Props) => {
  return (
    <footer className={cn("bg-muted", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="overflow-hidden max-lg:aspect-square">
          <img
            className="block size-full object-cover object-center"
            src={footerData.image.src}
            alt={footerData.image.alt}
          />
        </div>
        <div>
          <div className="px-6 py-8 md:p-12 lg:px-20 lg:pt-8 lg:pb-20">
            <div className="space-y-12">
              <div className="mt-12 max-w-125">
                <NewsletterSection {...newsletter} />
              </div>
              <div className="space-y-6">
                <a href="#" className="block">
                  <img
                    className="h-12 w-auto dark:hidden"
                    src={footerData.homeLink.logo.light}
                    alt="Logo"
                  />
                  <img
                    className="hidden h-12 w-auto dark:inline-block"
                    src={footerData.homeLink.logo.dark}
                    alt="Logo"
                  />
                </a>
                <div className="space-y-1">
                  <h3 className="font-bold">{footerData.title}</h3>
                  <p className="leading-relaxed text-balance">
                    {footerData.description}
                  </p>
                </div>
              </div>
              <SocialMediaSection links={socialLinks} />
              <Separator className="max-lg:hidden" />
              <FooterLinksSection sections={footerLinks} />
              <Separator className="max-lg:hidden" />
              <PaymentMethods cards={paymentMethods} />
              <Separator />
              <div className="space-y-8">
                <FooterSubMenu links={submenuLinks} />
                <p className="text-sm font-light">© 2025 Shadcnblocks.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-10 lg:px-20">
        <img
          className="w-full dark:hidden"
          src={footerData.homeLink.logo.light}
          alt="Logo"
        />
        <img
          className="hidden w-full dark:inline-block"
          src={footerData.homeLink.logo.dark}
          alt="Logo"
        />
      </div>
    </footer>
  );
};

const newsletterFormSchema = z.object({
  email: z.string().email(),
});

type newsletterFormType = z.infer<typeof newsletterFormSchema>;

const NewsletterSection = ({ title }: NewsletterFormProps) => {
  const form = useForm({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: newsletterFormType) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-light">{title}</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup
                className="rounded-none border-x-0 border-t-0 !border-b border-foreground shadow-none"
                aria-invalid={fieldState.invalid}
              >
                <InputGroupInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Email Address"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton type="submit" size="icon-xs">
                    <ArrowRight />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>
    </div>
  );
};

const SocialMediaSection = ({ links }: SocialMediaSectionProps) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {links.map(({ icon, link }) => (
        <li key={crypto.randomUUID()}>
          <Button size="icon" variant="ghost" asChild className="rounded-full">
            <a href={link}>
              <img
                className="size-6 dark:invert"
                alt={icon.title}
                src={icon.light}
              />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const FooterLinksSection = ({ sections }: FooterLinksSectionProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [value, setValue] = useState("");

  if (!sections) return;

  const allAccordionIds = sections.map(({ id }) => id);
  const handleOnValueChange = (value: string) => {
    setValue(value);
  };

  if (isDesktop) {
    return (
      <Accordion
        value={allAccordionIds}
        type="multiple"
        className="grid grid-cols-3 gap-4"
      >
        <AccordionItems sections={sections} />
      </Accordion>
    );
  } else {
    return (
      <Accordion
        value={value}
        type="single"
        collapsible={true}
        onValueChange={handleOnValueChange}
        className="border-y"
      >
        <AccordionItems sections={sections} />
      </Accordion>
    );
  }
};

const AccordionItems = ({ sections }: { sections: FooterLinksSection[] }) => {
  return (
    <Fragment>
      {sections.map(({ id, title, items }) => (
        <AccordionItem
          key={id}
          value={id}
          className="border-b lg:border-transparent"
        >
          <AccordionTrigger className="cursor-auto rounded-none pt-0 pb-2 text-base leading-normal font-bold hover:no-underline max-lg:py-4 [&>svg]:hidden">
            {title}
            <div className="lg:hidden">
              <Plus className="size-5" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-1 max-lg:py-4">
            <ul className="space-y-4 lg:space-y-2">
              {items.map(({ link, text }) => (
                <li
                  className="text-sm leading-tight font-light"
                  key={crypto.randomUUID()}
                >
                  <a
                    href={link}
                    className="hover:underline hover:underline-offset-3"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Fragment>
  );
};

const PaymentMethods = ({ cards }: { cards: string[] }) => {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {cards.map((card) => (
        <li key={crypto.randomUUID()}>
          <img className="w-9.5" src={card} alt="card" />
        </li>
      ))}
    </ul>
  );
};

const FooterSubMenu = ({ links }: { links: FooterLink[] }) => {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-4">
      {links.map(({ link, text }) => (
        <li key={crypto.randomUUID()}>
          <a href={link} className="text-sm font-light">
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export { EcommerceFooter20 };
