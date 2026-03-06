import React from "react";

import { cn } from "@/lib/utils";

import { EvervaultCard } from "@/components/aceternity/evervault-card";

interface Feature282Props {
  className?: string;
}

const Feature282 = ({ className }: Feature282Props) => {
  return (
    <section className={cn("w-screen overflow-hidden py-32", className)}>
      <div className="container grid h-full w-full grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="mx-auto flex h-full w-full flex-col gap-4 rounded-lg border border-primary/20 bg-primary p-4 md:max-w-sm">
            <div className="h-full w-full rounded-md border border-border/50 bg-background p-4">
              <EvervaultCard
                text="Hover to Encrypt"
                className="w-full text-center text-xl font-medium tracking-tight"
              />
            </div>
            <div className="space-y-2 p-4">
              <p className="font-mono text-sm text-muted-foreground">
                AES-256 Encryption
              </p>
              <p className="text-lg font-semibold text-primary-foreground">
                Block-Grade Security
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-2 font-mono text-sm text-muted-foreground">
            Enterprise Security Solutions
          </h2>
          <h2 className="text-3xl font-semibold tracking-tight md:max-w-lg">
            Advanced Encryption Technology for Modern Applications
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground md:max-w-lg">
            Our encryption infrastructure utilizes state-of-the-art
            cryptographic algorithms to ensure your data remains secure at rest
            and in transit. With AES-256 encryption, RSA key exchange, and
            perfect forward secrecy, we provide enterprise-grade protection for
            your most sensitive information.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground md:max-w-lg">
            Built with zero-knowledge architecture, our security framework
            ensures that only authorized users can access encrypted data.
            Multi-layer authentication, hardware security modules, and
            continuous monitoring provide comprehensive protection against
            modern security threats.
          </p>
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span className="font-mono text-sm text-muted-foreground">
                256-bit encryption keys
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span className="font-mono text-sm text-muted-foreground">
                End-to-end encryption
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span className="font-mono text-sm text-muted-foreground">
                Zero-knowledge architecture
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export { Feature282 };
