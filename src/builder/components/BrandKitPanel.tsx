"use client";

import { BadgeInfo, Sparkles, WandSparkles, X } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";

interface BrandKitPanelProps {
  open: boolean;
  onClose: () => void;
  onGenerateContent: () => void;
  onApplyIdentity: () => void;
}

export function BrandKitPanel({
  open,
  onClose,
  onGenerateContent,
  onApplyIdentity,
}: BrandKitPanelProps) {
  const brandKit = useBuilderStore((state) => state.brandKit);
  const updateBrandKit = useBuilderStore((state) => state.updateBrandKit);

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
        aria-label="Close brand kit panel"
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
              Auto Brand Kit
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Set the brand once
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
            aria-label="Close brand kit panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-2 text-slate-500 shadow-sm">
                <BadgeInfo className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Business context</h4>
                <p className="text-xs text-slate-500">
                  This is the source of truth for tone, CTA language, and smart copy.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Company name
                </span>
                <input
                  type="text"
                  value={brandKit.companyName}
                  onChange={(event) => updateBrandKit({ companyName: event.target.value })}
                  className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  What is the site about?
                </span>
                <input
                  type="text"
                  value={brandKit.websiteTopic}
                  onChange={(event) => updateBrandKit({ websiteTopic: event.target.value })}
                  className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  placeholder="Fitness app, design agency, AI SaaS..."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Target audience
                </span>
                <input
                  type="text"
                  value={brandKit.audience}
                  onChange={(event) => updateBrandKit({ audience: event.target.value })}
                  className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  placeholder="Founders, local businesses, product teams..."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Unique value
                </span>
                <textarea
                  value={brandKit.uniqueValue}
                  onChange={(event) => updateBrandKit({ uniqueValue: event.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  placeholder="Explain the main value in one sentence."
                />
              </label>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-2 text-slate-500 shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Voice and action</h4>
                <p className="text-xs text-slate-500">
                  Guide the assistant so every section sounds like one product.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(["professional", "friendly", "bold"] as const).map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => updateBrandKit({ brandTone: tone })}
                  className={cn(
                    "rounded-[20px] border px-3 py-3 text-left transition",
                    brandKit.brandTone === tone
                      ? "border-slate-900 bg-white shadow-sm"
                      : "border-slate-200 bg-white/80 hover:border-slate-300",
                  )}
                >
                  <div className="text-sm font-semibold capitalize text-slate-900">
                    {tone}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {tone === "professional"
                      ? "Clear and credible"
                      : tone === "friendly"
                        ? "Warm and approachable"
                        : "Confident and punchy"}
                  </div>
                </button>
              ))}
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Primary CTA label
              </span>
              <input
                type="text"
                value={brandKit.ctaLabel}
                onChange={(event) => updateBrandKit({ ctaLabel: event.target.value })}
                className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                placeholder="Start free, Book demo, Join now..."
              />
            </label>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-2 text-slate-500 shadow-sm">
                <WandSparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Apply to the builder</h4>
                <p className="text-xs text-slate-500">
                  Choose whether to sync identity only or rewrite the whole page with smart copy.
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              <button
                type="button"
                onClick={onApplyIdentity}
                className="rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-slate-300"
              >
                <div className="text-sm font-semibold text-slate-900">Apply brand identity</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">
                  Sync company name and CTA labels across the current sections.
                </div>
              </button>

              <button
                type="button"
                onClick={onGenerateContent}
                className="rounded-[22px] bg-slate-900 px-4 py-3 text-left text-white shadow-sm transition hover:bg-slate-800"
              >
                <div className="text-sm font-semibold">Generate site copy</div>
                <div className="mt-1 text-xs leading-5 text-white/75">
                  Rewrite the current page so the content matches this brand kit.
                </div>
              </button>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-2 text-slate-500 shadow-sm">
                <BadgeInfo className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">SEO metadata</h4>
                <p className="text-xs text-slate-500">
                  Keep the page title and description aligned with the same brand story.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Meta title
                </span>
                <input
                  type="text"
                  value={brandKit.metaTitle}
                  onChange={(event) => updateBrandKit({ metaTitle: event.target.value })}
                  className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Meta description
                </span>
                <textarea
                  value={brandKit.metaDescription}
                  onChange={(event) =>
                    updateBrandKit({ metaDescription: event.target.value })
                  }
                  rows={4}
                  className="w-full resize-none rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                />
              </label>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
