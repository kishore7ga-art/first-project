'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { cn } from "@/lib/utils";

const links = [
  { label: "Features", href: "/#features" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About Us", href: "/about" },
  { label: "Testimonials", href: "/#testimonials" },
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
        "sticky top-0 z-50 mx-auto w-full max-w-[95%] border-b border-transparent md:rounded-2xl md:border md:transition-all md:ease-out mt-4",
        {
          "border-white/10 bg-black/80 backdrop-blur-2xl md:top-8 md:max-w-[90%] md:shadow-2xl":
            scrolled && !open,
          "bg-black": open,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-24 w-full items-center justify-between px-8 md:h-32 md:transition-all md:ease-out",
          { "md:px-6": scrolled },
        )}
      >
        <Link href="/" className="flex items-center gap-4 text-3xl font-black tracking-tighter text-white md:text-4xl">
          <Image src="/logo.png" alt="Zelmora Logo" width={64} height={64} className="rounded-xl" />
          <span>Zelmora</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              className={cn(buttonVariants({ variant: "ghost" }), "text-xl font-bold px-6 py-4")}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <Button asChild variant="outline" size="lg" className="text-xl px-8 py-8 rounded-full">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild size="lg" className="text-xl px-8 py-8 rounded-full">
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
