"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CardContainerProps {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export function CardContainer({ className, containerClassName, children }: CardContainerProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("relative", className)}>{children}</div>;
}

type CardItemProps = {
  as?: React.ElementType;
  translateZ?: string | number;
  className?: string;
  children?: React.ReactNode;
};

export function CardItem({ as: Comp = "div", translateZ, className, children }: CardItemProps) {
  const style = translateZ ? { transform: `translateZ(${translateZ}px)` } : undefined;
  return (
    <Comp className={cn("relative", className)} style={style}>
      {children}
    </Comp>
  );
}
