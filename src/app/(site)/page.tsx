import Link from "next/link";
import {
  Blocks,
  Bot,
  Check,
  Code2,
  GalleryVerticalEnd,
  MousePointer2,
} from "lucide-react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: GalleryVerticalEnd,
    title: "Section Library",
    description:
      "Browse thousands of unique sections by category, style, color DNA, popularity, and creator.",
  },
  {
    icon: MousePointer2,
    title: "Drag and Drop Builder",
    description:
      "Start from an empty canvas, snap sections together perfectly, and edit content inline.",
  },
  {
    icon: Bot,
    title: "AI Powered",
    description:
      "Ask for a page, remix a block, autofill copy, or clone a layout direction from a URL.",
  },
] as const;

const stats = [
  "10,000+ sections",
  "50,000+ websites built",
  "20,000+ creators",
] as const;

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For first websites and early ideas.",
    features: ["3 websites", "50 sections", "Community support"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$12/mo",
    description: "For builders who publish regularly.",
    features: ["Unlimited websites", "Full library", "Custom domain", "Export code", "AI assistant"],
    featured: true,
  },
  {
    name: "Agency",
    price: "$49/mo",
    description: "For teams selling websites to clients.",
    features: ["White-label builder", "Client management", "Priority support"],
    featured: false,
  },
] as const;

function BrowserMockup() {
  return (
    <div className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D10] shadow-[0_40px_140px_rgba(0,0,0,0.55)]">
      <div className="flex h-12 items-center justify-between border-b border-white/10 bg-[#111113] px-4">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <div className="rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-xs text-zinc-500">
          sections.app/builder/spring-launch
        </div>
        <div className="h-5 w-16" />
      </div>
      <div className="grid min-h-[480px] grid-cols-1 md:grid-cols-[300px_1fr]">
        <div className="hidden border-r border-white/10 bg-[#111111] p-4 md:block">
          <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-2 text-sm text-zinc-500">
            Search sections...
          </div>
          <div className="mt-4 flex gap-2 overflow-hidden">
            {["All", "Heroes", "Pricing"].map((item, index) => (
              <span
                key={item}
                className={cn(
                  "rounded-full px-3 py-1 text-xs",
                  index === 0 ? "bg-white text-black" : "text-zinc-500",
                )}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {["AI Launch Hero", "Glass Feature Grid", "Stripe Pricing"].map((item, index) => (
              <div
                key={item}
                className="relative h-[118px] overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#1A1A1A]"
              >
                <div
                  className={cn(
                    "absolute inset-0",
                    index === 0 && "bg-[radial-gradient(circle_at_30%_20%,#7C3AED55,transparent_35%),linear-gradient(135deg,#111,#1e1b4b)]",
                    index === 1 && "bg-[radial-gradient(circle_at_80%_30%,#06B6D455,transparent_35%),linear-gradient(135deg,#0f172a,#111)]",
                    index === 2 && "bg-[radial-gradient(circle_at_70%_20%,#635BFF55,transparent_35%),linear-gradient(135deg,#18181b,#030712)]",
                  )}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-3">
                  <div className="text-xs font-semibold text-white">{item}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#F4F4F5] p-4 sm:p-6">
          <div className="mx-auto max-w-full bg-white shadow-[0_0_60px_rgba(0,0,0,0.14)] sm:max-w-[760px]">
            <section className="px-5 py-10 text-center sm:px-8 sm:py-16">
              <div className="mx-auto inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                AI-built launch page
              </div>
              <h2 className="mx-auto mt-5 max-w-xl text-3xl font-black tracking-tight text-zinc-950 sm:text-5xl">
                Build a premium site by dragging sections.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-zinc-500 sm:text-base">
                Every block inherits theme tokens, brand copy, and responsive structure.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <span className="rounded-lg bg-black px-4 py-2 text-sm font-bold text-white">
                  Start free
                </span>
                <span className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-bold text-zinc-700">
                  Browse sections
                </span>
              </div>
            </section>
            <section className="grid gap-px bg-zinc-200 sm:grid-cols-3">
              {["Library", "Canvas", "Publish"].map((item) => (
                <div key={item} className="bg-zinc-50 p-6">
                  <div className="text-sm font-black text-zinc-950">{item}</div>
                  <div className="mt-2 text-xs leading-5 text-zinc-500">
                    Polished defaults with inline editing and instant theme sync.
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-[#09090B] text-white">
      <HeroGeometric
        badge="Sections Studio"
        title1="Build websites with"
        title2="cinematic motion"
      />

      <section className="border-b border-white/10 bg-[#030303] px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <BrowserMockup />
      </section>

      <section id="features" className="border-y border-white/10 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="rounded-lg border border-white/10 bg-[#101014] p-7"
                >
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <h2 className="mt-5 text-xl font-black">{feature.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {stats.map((stat) => (
            <div key={stat} className="text-center">
              <div className="text-4xl font-black text-white">{stat.split(" ")[0]}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.24em] text-zinc-600">
                {stat.replace(stat.split(" ")[0], "").trim()}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">
              Pricing
            </div>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">Free to start. Built to scale.</h2>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={cn(
                  "rounded-lg border p-7",
                  plan.featured
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-[#101014] text-white",
                )}
              >
                <h3 className="text-xl font-black">{plan.name}</h3>
                <div className="mt-4 text-5xl font-black">{plan.price}</div>
                <p className={cn("mt-3 text-sm", plan.featured ? "text-zinc-600" : "text-zinc-500")}>
                  {plan.description}
                </p>
                <div className="mt-7 space-y-3">
                  {plan.features.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-medium">
                      <Check className="h-4 w-4 text-emerald-400" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/auth/signup"
                  className={cn(
                    "mt-8 inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-black",
                    plan.featured ? "bg-black text-white" : "bg-white text-black",
                  )}
                >
                  Get Started
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0D0D10] py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.24em] text-zinc-600">
              <Blocks className="h-4 w-4" />
              Export clean code
            </div>
            <h2 className="mt-4 max-w-2xl text-4xl font-black">
              Publish to a live URL or export React, Tailwind, HTML, and CSS.
            </h2>
          </div>
          <Link
            href="/builder/demo-project"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-sm font-black text-white hover:bg-white/5"
          >
            <Code2 className="mr-2 h-4 w-4" />
            Open Builder
          </Link>
        </div>
      </section>

    </div>
  );
}
