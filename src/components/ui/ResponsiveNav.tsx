"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

import { ResponsiveButton } from "@/components/ui/ResponsiveButton";
import { ResponsiveContainer } from "@/lib/responsive/Container";
import { cn } from "@/lib/utils";

interface ResponsiveNavLink {
  href: string;
  label: string;
}

interface ResponsiveNavCta {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface ResponsiveNavProps {
  logo: ReactNode | string;
  links: ResponsiveNavLink[];
  cta: ResponsiveNavCta;
  brandHref?: string;
  className?: string;
}

function renderLogo(logo: ReactNode | string) {
  if (typeof logo !== "string") {
    return logo;
  }

  const looksLikeImage =
    /^(https?:\/\/|\/|data:)/.test(logo) ||
    /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(logo);

  if (looksLikeImage) {
    return (
      <img
        src={logo}
        alt="Logo"
        className="h-8 w-auto lg:h-10"
        loading="eager"
        decoding="async"
      />
    );
  }

  return <span className="text-lg font-semibold tracking-tight text-inherit">{logo}</span>;
}

export function ResponsiveNav({
  logo,
  links,
  cta,
  brandHref,
  className = "",
}: ResponsiveNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileCta = cta.href ? (
    <ResponsiveButton href={cta.href} size="auto" fullWidthOnMobile>
      {cta.label}
    </ResponsiveButton>
  ) : (
    <ResponsiveButton onClick={cta.onClick} size="auto" fullWidthOnMobile>
      {cta.label}
    </ResponsiveButton>
  );

  const logoNode = renderLogo(logo);

  return (
    <nav className={cn("sticky top-0 z-50 w-full border-b border-black/10 bg-white", className)}>
      <ResponsiveContainer>
        <div className="flex flex-col flex-wrap items-center justify-between gap-4 px-4 py-3 sm:flex-row">
          <div className="shrink-0">
            {brandHref ? (
              <a href={brandHref} className="inline-flex items-center">
                {logoNode}
              </a>
            ) : (
              logoNode
            )}
          </div>

          <div className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-4 sm:flex lg:gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap font-medium text-gray-700 transition-colors hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden shrink-0 sm:block">
            {cta.href ? (
              <ResponsiveButton href={cta.href} className="whitespace-nowrap">
                {cta.label}
              </ResponsiveButton>
            ) : (
              <ResponsiveButton onClick={cta.onClick} className="whitespace-nowrap">
                {cta.label}
              </ResponsiveButton>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-900 transition-colors hover:bg-black/5 sm:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </ResponsiveContainer>

      {mobileMenuOpen ? (
        <div className="border-t border-black/10 bg-white sm:hidden">
          <ResponsiveContainer>
            <div className="space-y-3 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-medium text-gray-700 transition-colors hover:text-black"
                >
                  {link.label}
                </a>
              ))}
              {mobileCta}
            </div>
          </ResponsiveContainer>
        </div>
      ) : null}
    </nav>
  );
}
