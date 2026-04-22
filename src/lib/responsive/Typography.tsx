import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface TypographyProps extends PropsWithChildren {
  className?: string;
}

export function H1({ children, className = "" }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className = "" }: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className = "" }: TypographyProps) {
  return (
    <h3
      className={cn(
        "text-xl font-semibold leading-snug sm:text-2xl md:text-3xl lg:text-4xl",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function Paragraph({
  children,
  className = "",
  size = "base",
}: TypographyProps & { size?: "sm" | "base" | "lg" }) {
  const sizes = {
    sm: "text-sm sm:text-base",
    base: "text-base sm:text-lg md:text-xl",
    lg: "text-lg sm:text-xl md:text-2xl",
  } as const;

  return (
    <p
      className={cn(
        sizes[size],
        "leading-relaxed sm:leading-relaxed md:leading-relaxed text-gray-600 dark:text-gray-300",
        className,
      )}
    >
      {children}
    </p>
  );
}
