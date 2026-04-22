import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type FlexDirection = "row" | "col";
type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ResponsiveFlexProps extends PropsWithChildren {
  direction?: {
    mobile?: FlexDirection;
    desktop?: FlexDirection;
  };
  align?: FlexAlign;
  justify?: FlexJustify;
  gap?: GapSize;
  className?: string;
}

const alignClasses: Record<FlexAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses: Record<FlexJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const gapClasses: Record<GapSize, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
  11: "gap-11",
  12: "gap-12",
};

function resolveDirectionClasses(direction: ResponsiveFlexProps["direction"]) {
  const mobile = direction?.mobile ?? "col";
  const desktop = direction?.desktop ?? "row";

  if (mobile === "col" && desktop === "row") {
    return "flex-col lg:flex-row";
  }

  if (mobile === "row" && desktop === "col") {
    return "flex-row lg:flex-col";
  }

  return mobile === "col" ? "flex-col" : "flex-row";
}

export function ResponsiveFlex({
  children,
  direction,
  align = "center",
  justify = "between",
  gap = 4,
  className = "",
}: ResponsiveFlexProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        resolveDirectionClasses(direction),
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        className,
      )}
    >
      {children}
    </div>
  );
}
