import Link from "next/link";
import { BadgeDollarSign, Building2, Palette, UsersRound } from "lucide-react";

const agencyFeatures = [
  {
    icon: Palette,
    title: "White-label builder",
    detail: "Replace platform logo, colors, domain, and client-facing product language.",
  },
  {
    icon: UsersRound,
    title: "Client management",
    detail: "Manage client accounts, permissions, previews, and published websites from one dashboard.",
  },
  {
    icon: BadgeDollarSign,
    title: "Resell under your brand",
    detail: "Agencies set their own pricing and package the builder as a recurring client service.",
  },
] as const;

const plans = [
  ["Starter", "$99/mo", "Up to 10 clients"],
  ["Pro", "$199/mo", "Up to 50 clients"],
  ["Enterprise", "$299/mo", "Unlimited clients"],
] as const;

export default function AgencyPage() {
  return (
    <div className="min-h-dvh bg-[#09090B] text-white">
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
              <Building2 className="h-3.5 w-3.5 text-cyan-300" />
              Agency white label
            </div>
            <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
              Sell a website builder as your own product.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-500">
              Give clients a branded section marketplace, visual editing canvas,
              publish workflow, and controlled collaboration experience.
            </p>
            <Link
              href="/auth/signup"
              className="mt-8 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-black text-black"
            >
              Start agency workspace
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101014] p-5">
            <div className="rounded-xl border border-white/10 bg-black/30 p-5">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                builder.youragency.com
              </div>
              <div className="mt-5 grid gap-3">
                {["Acme Agency", "12 active clients", "47 websites managed", "White-label live"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-zinc-300"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {agencyFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-2xl border border-white/10 bg-[#101014] p-6">
                <Icon className="h-6 w-6 text-cyan-300" />
                <h2 className="mt-5 text-xl font-black">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{feature.detail}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map(([name, price, limit]) => (
            <article key={name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-black">{name}</h3>
              <div className="mt-4 text-4xl font-black">{price}</div>
              <p className="mt-3 text-sm text-zinc-500">{limit}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
