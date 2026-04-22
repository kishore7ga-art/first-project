"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/ui/header-05";
import { Footer as AnimatedFooter } from "@/components/ui/modem-animated-footer";

const fullScreenRoutes = ["/marketplace"] as const;

function isFullScreenRoute(pathname: string) {
  return fullScreenRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fullScreen = isFullScreenRoute(pathname);

  if (fullScreen) {
    return (
      <div className="min-h-dvh overflow-x-hidden bg-[#09090B] text-white">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col overflow-x-hidden bg-[#09090B] text-white">
      <Header />
      <main className="flex-1 overflow-x-hidden bg-[#09090B] text-white">{children}</main>
      <AnimatedFooter
        brandName="Sections"
        brandDescription="A drag-and-drop website builder with a growing section marketplace, AI drafting tools, creator storefronts, and agency-ready workflows."
        navLinks={[
          { label: "Features", href: "/#features" },
          { label: "Marketplace", href: "/marketplace" },
          { label: "Builder", href: "/builder/demo-project" },
          { label: "Studio", href: "/studio" },
          { label: "Agency", href: "/agency" },
        ]}
      />
    </div>
  );
}
