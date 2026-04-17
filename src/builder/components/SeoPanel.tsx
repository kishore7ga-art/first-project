"use client";

import { CircleAlert, ShieldCheck, Wand2, X } from "lucide-react";
import { analyzeSeo } from "@/builder/seo";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";

interface SeoPanelProps {
  open: boolean;
  onClose: () => void;
  onFixBasics: () => void;
}

export function SeoPanel({ open, onClose, onFixBasics }: SeoPanelProps) {
  const brandKit = useBuilderStore((state) => state.brandKit);
  const canvasSections = useBuilderStore((state) => state.canvasSections);
  const report = analyzeSeo(brandKit, canvasSections);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-40 flex justify-end bg-slate-950/20 transition",
        open ? "opacity-100" : "opacity-0",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={onClose}
        className={cn(
          "absolute inset-0 h-full w-full",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-label="Close SEO panel"
      />

      <aside
        className={cn(
          "pointer-events-auto relative h-full w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white p-6 shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Live SEO score
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Keep the basics sharp
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
            aria-label="Close SEO panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Overall score
                </div>
                <div className="mt-2 text-5xl font-semibold text-slate-950">
                  {report.score}
                </div>
              </div>
              <button
                type="button"
                onClick={onFixBasics}
                className="rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Wand2 className="mr-2 inline h-4 w-4" />
                Fix SEO basics
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {report.checks.map((check) => (
                <div
                  key={check.id}
                  className="flex items-start gap-3 rounded-[20px] border border-slate-200 bg-white px-4 py-3"
                >
                  {check.passed ? (
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
                  ) : (
                    <CircleAlert className="mt-0.5 h-4 w-4 text-amber-500" />
                  )}
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{check.label}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{check.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 text-sm font-semibold text-slate-900">Priority issues</div>
            <div className="space-y-3">
              {report.issues.length > 0 ? (
                report.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-[20px] border border-slate-200 bg-white px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-900">
                        {issue.title}
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                          issue.severity === "high"
                            ? "bg-rose-100 text-rose-600"
                            : issue.severity === "medium"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-slate-100 text-slate-500",
                        )}
                      >
                        {issue.severity}
                      </span>
                    </div>
                    <div className="mt-2 text-xs leading-5 text-slate-500">{issue.detail}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                  No major issues right now. The page has the core SEO basics in place.
                </div>
              )}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
