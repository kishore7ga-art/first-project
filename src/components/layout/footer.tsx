import Link from "next/link";
import { ArrowUpRight, LayoutDashboard, Rocket, SearchCheck, WandSparkles } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Builder", href: "/builder" },
    ],
  },
  {
    title: "Workflow",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/signup" },
    ],
  },
  {
    title: "Launch",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Published previews", href: "/dashboard" },
      { label: "Start editing", href: "/builder" },
    ],
  },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white/86 py-14 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_repeat(3,0.85fr)]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Nexus
                </div>
                <div className="text-lg font-semibold text-slate-950">Visual launch builder</div>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
              Build the page, tighten the brand story, publish a preview, and move from draft
              to launch without leaving one workspace.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
                <WandSparkles className="h-5 w-5 text-blue-600" />
                <div className="mt-3 text-sm font-semibold text-slate-900">Edit visually</div>
                <div className="mt-1 text-sm text-slate-500">Drag sections and tune the page.</div>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
                <SearchCheck className="h-5 w-5 text-emerald-600" />
                <div className="mt-3 text-sm font-semibold text-slate-900">Check launch basics</div>
                <div className="mt-1 text-sm text-slate-500">Keep SEO and brand details aligned.</div>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
                <Rocket className="h-5 w-5 text-violet-600" />
                <div className="mt-3 text-sm font-semibold text-slate-900">Publish fast</div>
                <div className="mt-1 text-sm text-slate-500">Share local previews in one click.</div>
              </div>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>(c) {currentYear} Nexus. Made for launch-ready website drafts.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/builder" className="transition hover:text-slate-900">
              Open builder
            </Link>
            <Link href="/dashboard" className="transition hover:text-slate-900">
              View dashboard
            </Link>
            <Link href="/signup" className="transition hover:text-slate-900">
              Create workspace
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
