import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1 bg-white text-slate-900">{children}</main>
      <Footer />
    </div>
  );
}
