"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, WandSparkles, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pageLinks = [
  { name: "Home", href: "/" },
  { name: "Builder", href: "/builder" },
  { name: "Dashboard", href: "/dashboard" },
] as const;

const sectionLinks = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "FAQ", href: "/#faq" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Nexus
            </div>
            <div className="text-sm font-semibold text-slate-900">Visual launch builder</div>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm">
            {pageLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  isActive(link.href)
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-1 xl:flex">
            {sectionLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/builder"
            className={buttonVariants({
              variant: "outline",
              className: "rounded-full border-blue-200 text-blue-700 hover:bg-blue-50",
            })}
          >
            <WandSparkles className="mr-2 h-4 w-4" />
            Open builder
          </Link>
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost", className: "rounded-full" })}
          >
            Log in
          </Link>
          <Link href="/signup" className={buttonVariants({ className: "rounded-full px-5" })}>
            Start free
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-5 shadow-lg lg:hidden">
          <div className="space-y-2">
            {[...pageLinks, ...sectionLinks].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive(link.href)
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 grid gap-2 border-t border-slate-200 pt-4">
            <Link
              href="/builder"
              className={buttonVariants({
                variant: "outline",
                className: "w-full rounded-full border-blue-200 text-blue-700 hover:bg-blue-50",
              })}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Open builder
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "ghost",
                className: "w-full rounded-full",
              })}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ className: "w-full rounded-full" })}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
