"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/ui/header-05";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { BackgroundWatermark } from "@/components/ui/background-watermark";
const fullScreenRoutes = ["/", "/about", "/gallery", "/features", "/marketplace", "/motion-footer"] as const;

function isFullScreenRoute(pathname: string) {
  return fullScreenRoutes.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fullScreen = isFullScreenRoute(pathname);

  if (fullScreen) {
    return (
      <div className="min-h-dvh overflow-x-hidden bg-[#09090B] text-white relative">
        <BackgroundWatermark />
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col overflow-x-hidden bg-[#09090B] text-white relative">
      <BackgroundWatermark />
      <Header />
      <main className="flex-1 overflow-x-hidden bg-[#09090B] text-white">{children}</main>
      <CinematicFooter />
    </div>
  );
}
