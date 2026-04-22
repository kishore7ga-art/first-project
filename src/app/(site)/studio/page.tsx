import Link from "next/link";
import { BoxSelect, CheckCircle2, Image, MousePointer2, Type, Upload } from "lucide-react";

const palette = [
  { label: "Text", icon: Type },
  { label: "Image", icon: Image },
  { label: "Button", icon: MousePointer2 },
  { label: "Grid", icon: BoxSelect },
] as const;

export default function StudioPage() {
  return (
    <div className="min-h-dvh bg-[#09090B] text-white">
      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
            Creator Studio
          </div>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">
            Build section products visually and submit them to the marketplace.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-500">
            A no-code studio shell for creators: component palette, canvas,
            properties editor, automated quality checks, and marketplace review.
          </p>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-0 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr_280px] lg:px-8">
        <aside className="rounded-t-2xl border border-white/10 bg-[#101014] p-4 lg:rounded-l-2xl lg:rounded-tr-none">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
            Components
          </h2>
          <div className="mt-4 grid gap-2">
            {palette.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-left text-sm font-bold text-zinc-300 hover:bg-white/[0.06]"
                >
                  <Icon className="h-4 w-4 text-cyan-300" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="min-h-[560px] border-x border-white/10 bg-[#F4F4F5] p-6">
          <div className="mx-auto h-full max-w-3xl border-2 border-dashed border-zinc-300 bg-white p-8 text-zinc-900 shadow-[0_0_60px_rgba(0,0,0,0.12)]">
            <div className="rounded-2xl border border-zinc-200 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                <Upload className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-3xl font-black">Creator canvas</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
                Drag components here, tune their properties, then submit the
                section for automated review and creator revenue share.
              </p>
            </div>
          </div>
        </section>

        <aside className="rounded-b-2xl border border-white/10 bg-[#101014] p-4 lg:rounded-r-2xl lg:rounded-bl-none">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
            Properties
          </h2>
          <div className="mt-4 space-y-4">
            {["Section name", "Category", "Price", "Style tags"].map((label) => (
              <label key={label} className="block">
                <span className="mb-2 block text-xs font-bold text-zinc-600">{label}</span>
                <input className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none" />
              </label>
            ))}
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Quality checks
              </div>
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Responsive layout, no placeholder copy, accessible labels, and
                safe CSS are checked before review.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="inline-flex w-full justify-center rounded-lg bg-white px-4 py-3 text-sm font-black text-black"
            >
              Submit for review
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}
