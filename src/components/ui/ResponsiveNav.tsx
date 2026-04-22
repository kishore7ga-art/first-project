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
        <div className="flex h-16 items-center justify-between lg:h-20">
          <div className="flex-shrink-0">
            {brandHref ? (
              <a href={brandHref} className="inline-flex items-center">
                {logoNode}
              </a>
            ) : (
              logoNode
            )}
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium text-gray-700 transition-colors hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            {cta.href ? (
              <ResponsiveButton href={cta.href}>{cta.label}</ResponsiveButton>
            ) : (
              <ResponsiveButton onClick={cta.onClick}>{cta.label}</ResponsiveButton>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-900 transition-colors hover:bg-black/5"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </ResponsiveContainer>

      {mobileMenuOpen ? (
        <div className="border-t border-black/10 bg-white lg:hidden">
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
