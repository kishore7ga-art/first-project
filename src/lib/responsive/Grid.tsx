import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type GridCount = 1 | 2 | 3 | 4 | 5 | 6;
type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ResponsiveGridProps extends PropsWithChildren {
  cols?: {
    mobile?: GridCount;
    tablet?: GridCount;
    desktop?: GridCount;
  };
  gap?: GapSize;
  className?: string;
}

const columnClasses: Record<GridCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
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

function resolveGridColumns({
  mobile = 1,
  tablet = 2,
  desktop = 3,
}: NonNullable<ResponsiveGridProps["cols"]>) {
  const classes = [columnClasses[mobile]];

  if (tablet !== mobile) {
    classes.push(`sm:${columnClasses[tablet]}`);
  }

  if (desktop !== tablet) {
    classes.push(`lg:${columnClasses[desktop]}`);
  }

  return classes.join(" ");
}

export function ResponsiveGrid({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 6,
  className = "",
}: ResponsiveGridProps) {
  return (
    <div className={cn("grid w-full", resolveGridColumns(cols), gapClasses[gap], className)}>
      {children}
    </div>
  );
}
