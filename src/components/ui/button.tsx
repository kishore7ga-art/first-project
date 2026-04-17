import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function buttonVariants({
  className,
  variant = "default",
  size = "default",
}: {
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
} = {}) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-blue-600 text-white shadow-sm hover:bg-blue-700": variant === "default",
      "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-100":
        variant === "outline",
      "text-slate-600 hover:bg-slate-100 hover:text-slate-900": variant === "ghost",
      "text-blue-600 underline-offset-4 hover:underline": variant === "link",
      "h-9 px-4 py-2": size === "default",
      "h-8 rounded-md px-3 text-xs": size === "sm",
      "h-11 rounded-md px-8 text-sm": size === "lg",
      "h-9 w-9": size === "icon",
    },
    className,
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ className, variant, size })}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
