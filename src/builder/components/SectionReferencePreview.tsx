"use client";

import type { ReactNode } from "react";
import type { SectionBlueprint } from "@/builder/types";
import { cn } from "@/lib/utils";

interface SectionReferencePreviewProps {
  blueprint: SectionBlueprint;
}

type PreviewPalette = {
  shell: string;
  card: string;
  accent: string;
  support: string;
  muted: string;
};

const previewPalettes: PreviewPalette[] = [
  {
    shell: "from-white via-slate-50 to-slate-100",
    card: "bg-white/90",
    accent: "bg-slate-900",
    support: "bg-slate-300",
    muted: "bg-slate-200",
  },
  {
    shell: "from-emerald-50 via-teal-50 to-cyan-50",
    card: "bg-white/85",
    accent: "bg-emerald-500",
    support: "bg-emerald-200",
    muted: "bg-teal-100",
  },
  {
    shell: "from-slate-950 via-indigo-950 to-violet-900",
    card: "bg-white/[0.12]",
    accent: "bg-amber-300",
    support: "bg-white/45",
    muted: "bg-white/20",
  },
  {
    shell: "from-rose-50 via-orange-50 to-white",
    card: "bg-white/[0.88]",
    accent: "bg-rose-500",
    support: "bg-rose-200",
    muted: "bg-orange-100",
  },
];

function hashValue(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33 + value.charCodeAt(index)) % 997;
  }

  return hash;
}

function getPalette(blueprint: SectionBlueprint) {
  const styles = new Set(blueprint.marketplace.styles);

  if (
    styles.has("dark") ||
    styles.has("bold") ||
    styles.has("terminal") ||
    blueprint.tags.includes("premium")
  ) {
    return previewPalettes[2];
  }

  if (
    styles.has("playful") ||
    styles.has("gradient") ||
    styles.has("colorful") ||
    blueprint.tags.includes("community") ||
    blueprint.tags.includes("gradient") ||
    blueprint.tags.includes("colorful")
  ) {
    return previewPalettes[1];
  }

  if (
    styles.has("minimal") ||
    styles.has("light") ||
    styles.has("glassmorphism") ||
    blueprint.tags.includes("editorial") ||
    blueprint.tags.includes("glass") ||
    blueprint.tags.includes("blur")
  ) {
    return previewPalettes[0];
  }

  if (
    styles.has("corporate") ||
    styles.has("gold") ||
    blueprint.tags.includes("launch") ||
    blueprint.tags.includes("gold") ||
    blueprint.tags.includes("luxury")
  ) {
    return previewPalettes[3];
  }

  return previewPalettes[hashValue(blueprint.id) % previewPalettes.length];
}

function MiniLine({
  width,
  className,
}: {
  width: string;
  className?: string;
}) {
  return <div className={cn("h-2 rounded-full", width, className)} />;
}

function MiniCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionReferencePreview({ blueprint }: SectionReferencePreviewProps) {
  const palette = getPalette(blueprint);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[22px] border border-slate-200/70 bg-gradient-to-br p-3",
        palette.shell,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_70%)]" />
      <div className="relative h-full rounded-[18px] border border-white/60 bg-white/[0.35] p-3 backdrop-blur-[2px]">
        {blueprint.type === "Navbar" && (
          <MiniCard className={cn("h-full p-3", palette.card)}>
            <div className="flex items-center justify-between">
              <div className={cn("h-3 w-14 rounded-full", palette.accent)} />
              <div className="flex gap-2">
                <div className={cn("h-2 w-8 rounded-full", palette.muted)} />
                <div className={cn("h-2 w-8 rounded-full", palette.muted)} />
                <div className={cn("h-2 w-8 rounded-full", palette.muted)} />
              </div>
              <div className={cn("h-7 w-16 rounded-full", palette.support)} />
            </div>
            <div className="mt-5 grid gap-3">
              <MiniLine width="w-10/12" className={palette.muted} />
              <MiniLine width="w-7/12" className={palette.support} />
              <div className="flex gap-2 pt-1">
                <div className={cn("h-7 w-20 rounded-full", palette.accent)} />
                <div className={cn("h-7 w-16 rounded-full", palette.muted)} />
              </div>
            </div>
          </MiniCard>
        )}

        {blueprint.type === "Hero" && (
          <MiniCard className={cn("h-full p-3", palette.card)}>
            {blueprint.id === "hero-2" ? (
              <div className="grid h-full grid-cols-[1.3fr_0.8fr] gap-3">
                <div className="space-y-2">
                  <div className={cn("h-5 w-24 rounded-full", palette.support)} />
                  <MiniLine width="w-11/12" className={palette.accent} />
                  <MiniLine width="w-9/12" className={palette.accent} />
                  <MiniLine width="w-8/12" className={palette.muted} />
                  <div className="flex gap-2 pt-2">
                    <div className={cn("h-7 w-20 rounded-full", palette.accent)} />
                    <div className={cn("h-7 w-16 rounded-full", palette.muted)} />
                  </div>
                </div>
                <div className="space-y-2 rounded-[14px] border border-white/60 bg-white/70 p-3">
                  <div className={cn("h-8 w-12 rounded-2xl", palette.accent)} />
                  <MiniLine width="w-full" className={palette.support} />
                  <MiniLine width="w-10/12" className={palette.muted} />
                  <MiniLine width="w-8/12" className={palette.muted} />
                </div>
              </div>
            ) : blueprint.id === "hero-4" ? (
              <div className="grid h-full gap-3">
                <div className="space-y-2">
                  <div className={cn("h-5 w-28 rounded-full", palette.support)} />
                  <MiniLine width="w-10/12" className={palette.accent} />
                  <MiniLine width="w-8/12" className={palette.accent} />
                  <MiniLine width="w-9/12" className={palette.muted} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((item) => (
                    <div
                      key={item}
                      className="rounded-[14px] border border-white/60 bg-white/70 p-2"
                    >
                      <div className={cn("h-5 w-8 rounded-full", palette.accent)} />
                      <div className={cn("mt-2 h-2 w-full rounded-full", palette.muted)} />
                    </div>
                  ))}
                </div>
              </div>
            ) : blueprint.id === "hero-5" ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className={cn("h-5 w-20 rounded-full", palette.support)} />
                <MiniLine width="mt-4 w-10/12" className={palette.accent} />
                <MiniLine width="w-8/12" className={palette.accent} />
                <MiniLine width="mt-2 w-7/12" className={palette.muted} />
                <div className={cn("mt-4 h-8 w-24 rounded-full", palette.accent)} />
              </div>
            ) : (
              <div className="grid h-full gap-3">
                <div className="space-y-2">
                  <div className={cn("h-5 w-24 rounded-full", palette.support)} />
                  <MiniLine width="w-11/12" className={palette.accent} />
                  <MiniLine width="w-9/12" className={palette.accent} />
                  <MiniLine width="w-8/12" className={palette.muted} />
                </div>
                <div className="flex items-end gap-3">
                  <div className={cn("h-7 w-20 rounded-full", palette.accent)} />
                  <div className={cn("h-7 w-16 rounded-full", palette.muted)} />
                  <div className="ml-auto h-14 w-24 rounded-[16px] border border-white/50 bg-white/70" />
                </div>
              </div>
            )}
          </MiniCard>
        )}

        {blueprint.type === "Features" && (
          <MiniCard className={cn("h-full p-3", palette.card)}>
            {blueprint.id === "features-2" ? (
              <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-3">
                <div className="space-y-2">
                  <MiniLine width="w-9/12" className={palette.accent} />
                  <MiniLine width="w-7/12" className={palette.muted} />
                </div>
                <div className="space-y-2 rounded-[14px] border border-white/60 bg-white/70 p-3">
                  {[0, 1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className={cn("h-3 w-3 rounded-full", palette.accent)} />
                      <div className={cn("h-2 flex-1 rounded-full", palette.muted)} />
                    </div>
                  ))}
                </div>
              </div>
            ) : blueprint.id === "features-3" ? (
              <div className="grid h-full grid-cols-3 gap-2">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="rounded-[14px] border border-white/60 bg-white/70 p-2"
                  >
                    <div className={cn("h-5 w-8 rounded-full", palette.support)} />
                    <div className={cn("mt-2 h-2 w-10/12 rounded-full", palette.accent)} />
                    <div className={cn("mt-2 h-2 w-full rounded-full", palette.muted)} />
                    <div className={cn("mt-1 h-2 w-8/12 rounded-full", palette.muted)} />
                  </div>
                ))}
              </div>
            ) : blueprint.id === "features-4" ? (
              <div className="grid h-full gap-3">
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((item) => (
                    <div
                      key={item}
                      className="rounded-[14px] border border-white/60 bg-white/70 p-2"
                    >
                      <div className={cn("h-5 w-8 rounded-full", palette.accent)} />
                      <div className={cn("mt-2 h-2 w-full rounded-full", palette.support)} />
                    </div>
                  ))}
                </div>
                <MiniLine width="w-10/12" className={palette.muted} />
                <MiniLine width="w-8/12" className={palette.muted} />
              </div>
            ) : (
              <div className="grid h-full grid-cols-3 gap-2">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="rounded-[14px] border border-white/60 bg-white/70 p-2"
                  >
                    <div className={cn("h-8 w-8 rounded-2xl", palette.support)} />
                    <div className={cn("mt-3 h-2 w-10/12 rounded-full", palette.accent)} />
                    <div className={cn("mt-2 h-2 w-full rounded-full", palette.muted)} />
                    <div className={cn("mt-1 h-2 w-8/12 rounded-full", palette.muted)} />
                  </div>
                ))}
              </div>
            )}
          </MiniCard>
        )}

        {blueprint.type === "Pricing" && (
          <MiniCard className={cn("h-full p-3", palette.card)}>
            <div
              className={cn(
                "grid h-full gap-2",
                blueprint.id === "pricing-2" ? "grid-cols-2" : "grid-cols-3",
              )}
            >
              {Array.from({
                length: blueprint.id === "pricing-2" ? 2 : 3,
              }).map((_, item) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-[14px] border border-white/60 bg-white/75 p-2",
                    blueprint.id === "pricing-3" && item === 1 && "ring-2 ring-white/60",
                  )}
                >
                  <div className={cn("h-2 w-8 rounded-full", palette.support)} />
                  <div className={cn("mt-3 h-6 w-10 rounded-full", palette.accent)} />
                  <div className={cn("mt-2 h-2 w-full rounded-full", palette.muted)} />
                  <div className={cn("mt-1 h-2 w-9/12 rounded-full", palette.muted)} />
                  <div className={cn("mt-3 h-7 w-full rounded-full", palette.support)} />
                </div>
              ))}
            </div>
          </MiniCard>
        )}

        {blueprint.type === "CTA" && (
          <MiniCard className={cn("h-full p-3", palette.card)}>
            {blueprint.id === "cta-2" ? (
              <div className="grid h-full grid-cols-[1.2fr_0.8fr] gap-3">
                <div className="space-y-2">
                  <div className={cn("h-5 w-24 rounded-full", palette.support)} />
                  <MiniLine width="w-10/12" className={palette.accent} />
                  <MiniLine width="w-8/12" className={palette.muted} />
                  <div className={cn("mt-3 h-7 w-24 rounded-full", palette.accent)} />
                </div>
                <div className="rounded-[16px] border border-white/60 bg-white/70 p-3">
                  <MiniLine width="w-full" className={palette.support} />
                  <MiniLine width="mt-2 w-9/12" className={palette.muted} />
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className={cn("h-5 w-20 rounded-full", palette.support)} />
                <MiniLine width="mt-4 w-10/12" className={palette.accent} />
                <MiniLine width="w-8/12" className={palette.muted} />
                <div className="mt-4 flex gap-2">
                  <div className={cn("h-7 w-20 rounded-full", palette.accent)} />
                  <div className={cn("h-7 w-16 rounded-full", palette.support)} />
                </div>
              </div>
            )}
          </MiniCard>
        )}

        {blueprint.type === "Footer" && (
          <MiniCard className={cn("h-full p-3", palette.card)}>
            {blueprint.id === "footer-2" ? (
              <div className="flex h-full flex-col justify-between">
                <div className={cn("h-3 w-16 rounded-full", palette.accent)} />
                <div className="space-y-2">
                  <MiniLine width="w-full" className={palette.support} />
                  <MiniLine width="w-8/12" className={palette.muted} />
                </div>
                <div className="flex gap-2">
                  <div className={cn("h-2 w-10 rounded-full", palette.muted)} />
                  <div className={cn("h-2 w-10 rounded-full", palette.muted)} />
                  <div className={cn("h-2 w-10 rounded-full", palette.muted)} />
                </div>
              </div>
            ) : (
              <div className="grid h-full gap-3">
                <div className={cn("h-3 w-16 rounded-full", palette.accent)} />
                <div
                  className={cn(
                    "grid gap-2",
                    blueprint.id === "footer-3" ? "grid-cols-2" : "grid-cols-3",
                  )}
                >
                  {Array.from({
                    length: blueprint.id === "footer-3" ? 2 : 3,
                  }).map((_, item) => (
                    <div key={item} className="space-y-2 rounded-[14px] bg-white/60 p-2">
                      <div className={cn("h-2 w-8 rounded-full", palette.support)} />
                      <div className={cn("h-2 w-full rounded-full", palette.muted)} />
                      <div className={cn("h-2 w-8/12 rounded-full", palette.muted)} />
                    </div>
                  ))}
                </div>
                {blueprint.id === "footer-3" && (
                  <div className={cn("h-7 w-24 rounded-full", palette.support)} />
                )}
              </div>
            )}
          </MiniCard>
        )}
      </div>
    </div>
  );
}
