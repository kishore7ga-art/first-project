import Link from "next/link";
import { ArrowRight, Layers3, Sparkles, WandSparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_100%)]">
      <div className="mx-auto grid min-h-dvh max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden px-8 py-10 lg:flex lg:flex-col">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur"
            >
              <Layers3 className="h-4 w-4 text-blue-600" />
              Nexus
            </Link>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Open Builder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-1 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Website Builder Platform
              </div>
              <h1 className="mt-8 text-5xl font-semibold leading-tight text-slate-950">
                Build, refine, and publish your next landing page without the usual chaos.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                The builder already supports live theming, inline editing, smart content
                generation, and publish previews. These auth flows now match the product
                you&apos;re actually shipping.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <WandSparkles className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-semibold text-slate-900">
                    AI-assisted drafting
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Generate a page from a prompt, refresh copy, or tune the visual tone.
                  </p>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Layers3 className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-semibold text-slate-900">
                    Structured launches
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Keep sections, branding, SEO basics, and publish previews aligned in one flow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
