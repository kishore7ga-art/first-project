"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Eye,
  FileText,
  Globe2,
  Layers3,
  Palette,
  Rocket,
  SearchCheck,
  WandSparkles,
} from "lucide-react";
import { analyzeSeo } from "@/builder/seo";
import { useBuilderStore } from "@/store/useBuilderStore";
import { buttonVariants } from "@/components/ui/button";

export default function DashboardPage() {
  const hydrated = useBuilderStore((state) => state.hydrated);
  const projectName = useBuilderStore((state) => state.projectName);
  const theme = useBuilderStore((state) => state.theme);
  const brandKit = useBuilderStore((state) => state.brandKit);
  const canvasSections = useBuilderStore((state) => state.canvasSections);
  const lastEditedAt = useBuilderStore((state) => state.lastEditedAt);
  const publishedProjects = useBuilderStore((state) => state.publishedProjects);

  const seoReport = analyzeSeo(brandKit, canvasSections);

  const publishedList = useMemo(
    () =>
      Object.values(publishedProjects).sort(
        (first, second) =>
          new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
      ),
    [publishedProjects],
  );

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-4 w-32 rounded-full bg-slate-200" />
          <div className="mt-5 h-12 max-w-2xl rounded-2xl bg-slate-200" />
          <div className="mt-4 h-5 max-w-3xl rounded-full bg-slate-100" />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div className="h-4 w-28 rounded-full bg-slate-200" />
                <div className="mt-5 h-8 w-16 rounded-full bg-slate-300" />
                <div className="mt-3 h-4 w-24 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Sections on current page",
      value: String(canvasSections.length),
      detail: "Live blocks in your draft",
      icon: Layers3,
    },
    {
      label: "Published previews",
      value: String(publishedList.length),
      detail: "Browser-local launch links",
      icon: Globe2,
    },
    {
      label: "SEO score",
      value: `${seoReport.score}`,
      detail: "Live page-health snapshot",
      icon: SearchCheck,
    },
    {
      label: "Theme mode",
      value: theme.mode === "dark" ? "Dark" : "Light",
      detail: `${brandKit.brandTone} tone active`,
      icon: Palette,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_100%)] px-6 py-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              <Rocket className="h-3.5 w-3.5" />
              Builder workspace
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
              {projectName}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Your current site is aimed at {brandKit.audience} and positioned around{" "}
              {brandKit.websiteTopic}. Use the dashboard to jump back into editing, review
              publish previews, and keep the page launch-ready.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/builder"
              className={buttonVariants({
                className: "h-11 rounded-full bg-white px-5 text-slate-950 hover:bg-slate-100",
              })}
            >
              <WandSparkles className="mr-2 h-4 w-4" />
              Continue editing
            </Link>
            {publishedList[0] && (
              <Link
                href={`/published/${publishedList[0].slug}`}
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "h-11 rounded-full border-white/20 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white",
                })}
              >
                <Eye className="mr-2 h-4 w-4" />
                View latest preview
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-5 text-3xl font-semibold text-slate-950">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-500">{stat.detail}</div>
            </div>
          );
        })}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Current draft</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Last edited {new Date(lastEditedAt).toLocaleString()}.
                </p>
              </div>
              <Link
                href="/builder"
                className={buttonVariants({ variant: "outline", className: "rounded-full px-5" })}
              >
                Open draft
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-slate-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Brand story
                </div>
                <div className="mt-3 text-lg font-semibold text-slate-900">
                  {brandKit.companyName}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">{brandKit.uniqueValue}</p>
              </div>

              <div className="rounded-[24px] bg-slate-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Metadata
                </div>
                <div className="mt-3 text-sm font-semibold text-slate-900">
                  {brandKit.metaTitle}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {brandKit.metaDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Published previews</h2>
            <p className="mt-1 text-sm text-slate-500">
              Keep track of the launch links you generated from the builder.
            </p>

            <div className="mt-6 space-y-4">
              {publishedList.length > 0 ? (
                publishedList.map((project) => (
                  <div
                    key={project.slug}
                    className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="text-base font-semibold text-slate-900">
                        {project.projectName}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        Published {new Date(project.publishedAt).toLocaleString()}
                      </div>
                    </div>
                    <Link
                      href={`/published/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Open preview
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                  No previews published yet. Open the builder and use &quot;Publish preview&quot; to create one.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Launch checklist</h2>
            <div className="mt-5 space-y-4">
              {[
                {
                  label: "Brand kit configured",
                  detail: `${brandKit.companyName} / ${brandKit.brandTone} tone`,
                  done: brandKit.companyName.trim().length > 0 && brandKit.websiteTopic.trim().length > 0,
                },
                {
                  label: "Core page structure ready",
                  detail: `${canvasSections.length} sections on the canvas`,
                  done: canvasSections.length >= 4,
                },
                {
                  label: "SEO basics covered",
                  detail: `Score is currently ${seoReport.score}`,
                  done: seoReport.score >= 80,
                },
                {
                  label: "Preview published",
                  detail: `${publishedList.length} launch links available`,
                  done: publishedList.length > 0,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-[22px] bg-slate-50 px-4 py-4"
                >
                  <CheckCircle2
                    className={`mt-0.5 h-5 w-5 ${
                      item.done ? "text-emerald-500" : "text-slate-300"
                    }`}
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Quick actions</h2>
            <div className="mt-5 grid gap-3">
              <Link
                href="/builder"
                className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Open builder</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">
                      Continue working on your current draft and theme.
                    </div>
                  </div>
                  <WandSparkles className="h-5 w-5 text-slate-400" />
                </div>
              </Link>

              <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Theme direction</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">
                      {theme.fontPairId} / {theme.spacing} spacing / {theme.borderRadius} radius
                    </div>
                  </div>
                  <Palette className="h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Content posture</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">
                      CTA: {brandKit.ctaLabel} / Audience: {brandKit.audience}
                    </div>
                  </div>
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
