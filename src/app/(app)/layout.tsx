import { Navbar } from "@/components/layout/navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-[#09090B] text-white">
      <Navbar />
      <main className="flex-1 bg-[#09090B]">
        {children}
      </main>
    </div>
  );
}
