"use client";

import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface ResponsiveContainerProps extends PropsWithChildren {
  className?: string;
}

export function ResponsiveContainer({
  children,
  className = "",
}: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
