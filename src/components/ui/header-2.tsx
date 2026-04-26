'use client';

import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { cn } from "@/lib/utils";

const links = [
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Launch", href: "#launch" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50 md:top-4 md:max-w-4xl md:shadow":
            scrolled && !open,
          "bg-background/90": open,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          { "md:px-2": scrolled },
        )}
      >
        <Link href="/" className="text-lg font-bold tracking-tight text-white md:text-foreground">
          Sections
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              className={buttonVariants({ variant: "ghost" })}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <Button asChild variant="outline">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/builder">Get Started</Link>
          </Button>
        </div>

        <Button
          size="icon"
          variant="outline"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <div
        id="mobile-nav-drawer"
        className={cn(
          "fixed inset-x-0 bottom-0 top-14 z-50 flex flex-col overflow-hidden border-y bg-background/90 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 flex h-full w-full flex-col justify-between gap-y-2 p-4 ease-out",
          )}
        >
          <div className="grid gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({
                  variant: "ghost",
                  className: "justify-start",
                })}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/login" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/builder" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
