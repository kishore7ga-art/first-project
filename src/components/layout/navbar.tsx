"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blocks, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Pricing", href: "/#pricing" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href !== "/" && !href.startsWith("/#") && pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#09090B]/78 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col flex-wrap items-center justify-between gap-4 px-4 py-3 sm:flex-row sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white text-black">
            <Blocks className="h-5 w-5" />
          </span>
          <span className="text-lg font-black tracking-tight text-white">Sections</span>
        </Link>

        <div className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-4 sm:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-sm font-medium text-zinc-400 transition hover:text-white",
                isActive(link.href) && "text-white",
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 flex-wrap items-center gap-3 sm:flex">
          <Link
            href="/login"
            className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-zinc-200"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-lg border border-white/10 p-2 text-zinc-300 sm:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#09090B] px-4 py-4 sm:hidden">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="whitespace-nowrap rounded-lg px-3 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="whitespace-nowrap rounded-lg px-3 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="whitespace-nowrap rounded-lg bg-white px-3 py-3 text-center text-sm font-bold text-black"
            >
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
