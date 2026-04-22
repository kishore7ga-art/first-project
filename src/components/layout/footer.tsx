import Link from "next/link";
import { Blocks } from "lucide-react";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Builder", href: "/builder/demo-project" },
    ],
  },
  {
    title: "Creators",
    links: [
      { label: "Studio", href: "/studio" },
      { label: "Revenue share", href: "/marketplace" },
      { label: "Kits", href: "/marketplace" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Agency", href: "/agency" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090B] py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_repeat(3,0.8fr)] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <Blocks className="h-5 w-5" />
            </span>
            <span className="text-lg font-black text-white">Sections</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-500">
            A drag-and-drop website builder with a growing section marketplace,
            AI drafting tools, creator storefronts, and agency-ready workflows.
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-600">
              {group.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-zinc-500 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 pt-6 text-sm text-zinc-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>(c) 2026 Sections. Free forever beta.</p>
        <p>Free forever. No credit card. Publish instantly.</p>
      </div>
    </footer>
  );
}
