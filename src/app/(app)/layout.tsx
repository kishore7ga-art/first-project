import { Navbar } from "@/components/layout/navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1 bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef3ff_100%)]">
        {children}
      </main>
    </div>
  );
}
