import Link from "next/link";
import { Blocks } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-[#09090B] px-4 py-8 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
            <Blocks className="h-5 w-5" />
          </span>
          <span className="text-lg font-black">Sections</span>
        </Link>
        <Link
          href="/builder/demo-project"
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white"
        >
          Open builder
        </Link>
      </div>

      <main className="mx-auto flex min-h-[calc(100dvh-96px)] max-w-lg items-center">
        {children}
      </main>
    </div>
  );
}
