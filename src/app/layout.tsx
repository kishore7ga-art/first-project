import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sections | Drag and drop website builder",
  description:
    "Browse beautiful sections, drag them onto a canvas, remix with AI, and publish polished websites without code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-[#09090B] font-sans text-zinc-50">{children}</body>
    </html>
  );
}
