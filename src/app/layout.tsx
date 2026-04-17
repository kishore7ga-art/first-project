import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus | Next Gen SaaS",
  description: "Modern boilerplate for SaaS projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-white font-sans text-slate-900">{children}</body>
    </html>
  );
}
