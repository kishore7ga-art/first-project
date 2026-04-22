"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "auto" | "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidthOnMobile?: boolean;
  className?: string;
};

type ResponsiveButtonProps =
  | (SharedButtonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
      })
  | (SharedButtonProps &
      AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      });

const sizeClasses: Record<ButtonSize, string> = {
  auto: "px-4 py-2 text-sm sm:px-6 sm:py-3 md:px-8 md:py-4 sm:text-base md:text-lg",
  sm: "px-3 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
  outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  ghost: "text-current hover:bg-black/5",
};

export function ResponsiveButton(props: ResponsiveButtonProps) {
  const {
    children,
    variant = "primary",
    size = "auto",
    fullWidthOnMobile = true,
    className = "",
    ...rest
  } = props;

  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
    sizeClasses[size],
    fullWidthOnMobile ? "w-full sm:w-auto" : "w-auto",
    variantClasses[variant],
    className,
  );

  if ("href" in props && props.href) {
    const {
      href,
      target,
      rel,
      onClick,
      onMouseEnter,
      onFocus,
      onBlur,
      ...anchorRest
    } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    const nextRel = target === "_blank" ? rel ?? "noreferrer" : rel;

    return (
      <a
        href={href}
        target={target}
        rel={nextRel}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        onBlur={onBlur}
        className={baseClasses}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={baseClasses}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
