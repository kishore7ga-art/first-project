import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  LayoutDashboard,
  Palette,
  Rocket,
  SearchCheck,
  WandSparkles,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BuilderQuickStart } from "@/components/site/BuilderQuickStart";
import { cn } from "@/lib/utils";

const featureCards = [
  {
    icon: WandSparkles,
    title: "Compose with reusable sections",
    description:
      "Start from structured blocks, drag them into place, and keep the page layout consistent while you iterate.",
  },
  {
    icon: Palette,
    title: "Adjust the brand system live",
    description:
      "Tune colors, typography, radius, and spacing in one place so the whole site responds together.",
  },
  {
    icon: SearchCheck,
    title: "Keep launch details visible",
    description:
      "Review SEO basics, project details, and preview status without losing the editing flow.",
  },
] as const;

const workflowSteps = [
  {
    number: "01",
    title: "Shape the page",
    detail: "Add hero, features, pricing, CTA, and footer blocks directly on the canvas.",
  },
  {
    number: "02",
    title: "Refine the message",
    detail: "Personalize headlines, supporting copy, and CTAs around your audience and offer.",
  },
  {
    number: "03",
    title: "Preview the launch",
    detail: "Publish a local preview link so you can review the full page before the next step.",
  },
] as const;

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "For quick concepts and early drafts.",
    features: ["Drag-and-drop canvas", "Live theme controls", "One active project"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$24",
    description: "For teams polishing launch pages every week.",
    features: ["Unlimited sections", "Brand kit workflows", "Dashboard and preview history"],
    featured: true,
  },
  {
    name: "Scale",
    price: "$79",
    description: "For operators building repeatable site systems.",
    features: ["Multiple launch tracks", "Structured review loops", "Priority support"],
    featured: false,
  },
] as const;

const faqs = [
  {
    question: "Can I edit the site without touching code?",
    answer:
      "Yes. The builder is designed so the layout, content, and theme can all be adjusted visually from the same workspace.",
  },
  {
    question: "Does the app keep track of my previews?",
    answer:
      "Yes. Published previews are stored locally in the browser and surfaced again on the dashboard so you can reopen them quickly.",
  },
  {
    question: "Who is this best for?",
    answer:
      "It fits founders, product teams, and marketers who want a polished website draft before turning the project into a full production launch.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f4f7fb_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Website builder workspace
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Build a full website draft that actually looks ready to ship.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Nexus gives you a visible canvas, brand controls, launch checks, and preview
              links in one flow so your web project feels complete instead of half-built.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/builder"
                className={buttonVariants({ size: "lg", className: "rounded-full px-6" })}
              >
                Open the builder
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/#pricing"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "rounded-full px-6",
                })}
              >
                See pricing
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { value: "20+", label: "section blueprints" },
                { value: "3", label: "core workspaces" },
                { value: "1", label: "clean launch flow" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-slate-200 bg-white/80 px-5 py-4 shadow-sm"
                >
                  <div className="text-2xl font-semibold text-slate-950">{item.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-300" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-300" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Live website view
                </div>
              </div>

              <div className="space-y-6 bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_55%)] p-5 sm:p-6">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Draft preview
                  </div>
                  <div className="mt-4 max-w-md text-3xl font-semibold leading-tight text-slate-950">
                    A launch page that stays aligned from headline to CTA.
                  </div>
                  <div className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                    The same builder controls update the layout, copy, and theme so the page
                    reads as one deliberate product story.
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                      Publish preview
                    </div>
                    <div className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
                      Refine brand kit
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Builder controls
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        "Section library",
                        "Theme panel",
                        "SEO review",
                        "Preview publish",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                        >
                          <span>{item}</span>
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Launch snapshot
                    </div>
                    <div className="mt-4 grid gap-3">
                      {[
                        { label: "SEO score", value: "92" },
                        { label: "Sections placed", value: "6" },
                        { label: "Latest preview", value: "Ready" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                        >
                          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                            {item.label}
                          </div>
                          <div className="mt-2 text-2xl font-semibold">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BuilderQuickStart />
        </div>
      </section>

      <section id="features" className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Built to make the whole web project visible
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              A cleaner path from blank page to something people can review.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Instead of jumping between scattered tools, the product keeps structure, styling,
              launch checks, and preview links inside one workflow.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-7 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Workflow
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Keep the build loop simple.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The goal is not just to generate blocks. It is to help you get a website into a
              state that feels coherent, reviewable, and ready for the next decision.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "mt-8 rounded-full px-6",
              })}
            >
              Open dashboard
            </Link>
          </div>

          <div className="grid gap-4">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-semibold text-blue-700">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                    <p className="mt-2 text-base leading-7 text-slate-600">{step.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Pricing
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Start small, then build a bigger web workflow.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Each tier is focused on clarity: build the draft, manage the process, and move
              the site forward with fewer loose ends.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={cn(
                  "rounded-[32px] border p-7 shadow-sm",
                  plan.featured
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-950",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  {plan.featured && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      Most used
                    </span>
                  )}
                </div>
                <div className="mt-5 text-5xl font-semibold">{plan.price}</div>
                <p
                  className={cn(
                    "mt-3 text-sm leading-6",
                    plan.featured ? "text-white/72" : "text-slate-500",
                  )}
                >
                  {plan.description}
                </p>
                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Blocks
                        className={cn(
                          "mt-1 h-4 w-4 shrink-0",
                          plan.featured ? "text-blue-300" : "text-blue-600",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm leading-6",
                          plan.featured ? "text-white/88" : "text-slate-600",
                        )}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href={plan.name === "Starter" ? "/signup" : "/builder"}
                  className={buttonVariants({
                    variant: plan.featured ? "outline" : "default",
                    className: cn(
                      "mt-8 w-full rounded-full",
                      plan.featured &&
                        "border-white/20 bg-white text-slate-950 hover:bg-slate-100",
                    ),
                  })}
                >
                  {plan.name === "Starter" ? "Create workspace" : "Start building"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="border-b border-slate-200 bg-slate-950 py-20 text-white sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              FAQ
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Answers for getting the web app into a usable state quickly.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The product is meant to reduce uncertainty, so the most common questions are
              answered right where the site starts.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_100%)] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
            <Rocket className="h-3.5 w-3.5 text-blue-600" />
            Ready to keep building
          </div>
          <h2 className="mt-6 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Make the site visible, working, and easy to keep improving.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Jump into the builder, review the dashboard, and turn the current draft into
            something you can actually share.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/builder"
              className={buttonVariants({ size: "lg", className: "rounded-full px-6" })}
            >
              Open builder
            </Link>
            <Link
              href="/dashboard"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "rounded-full px-6",
              })}
            >
              View dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
