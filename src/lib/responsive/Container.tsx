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
        "mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
