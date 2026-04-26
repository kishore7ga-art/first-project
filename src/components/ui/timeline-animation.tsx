"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

type TimelineTag = "div" | "p" | "span" | "section" | "article";

type TimelineContentProps = Omit<
  HTMLMotionProps<"div">,
  "as" | "variants" | "initial" | "animate" | "whileInView" | "custom"
> & {
  as?: TimelineTag;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
};

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.12,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

export function TimelineContent({
  as,
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  children,
  viewport,
  ...props
}: TimelineContentProps) {
  const Component = (motion[as ?? "div"] ?? motion.div) as React.ElementType;
  void timelineRef;

  return (
    <Component
      className={cn(className)}
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? { once: true, amount: 0.2 }}
      variants={customVariants ?? defaultVariants}
      {...props}
    >
      {children}
    </Component>
  );
}
