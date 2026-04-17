"use client";

import { MoonStar, Palette, SunMedium, Type, X } from "lucide-react";
import { colorPresets, fontPairs } from "@/builder/theme";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";

interface ThemePanelProps {
  open: boolean;
  onClose: () => void;
}

export function ThemePanel({ open, onClose }: ThemePanelProps) {
  const theme = useBuilderStore((state) => state.theme);
  const updateTheme = useBuilderStore((state) => state.updateTheme);

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
        aria-label="Close theme panel"
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
              Theme panel
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Tune the whole site
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
            aria-label="Close theme panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-2 text-slate-500 shadow-sm">
                <Palette className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Primary color</h4>
                <p className="text-xs text-slate-500">
                  Recolor buttons, accents, and highlighted surfaces.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => updateTheme({ primaryColor: preset.value })}
                  className={cn(
                    "rounded-[20px] border bg-white p-2 text-left shadow-sm transition",
                    theme.primaryColor === preset.value
                      ? "border-slate-900"
                      : "border-slate-200 hover:border-slate-300",
                  )}
                >
                  <span
                    className="mb-2 block h-10 rounded-[14px]"
                    style={{ backgroundColor: preset.value }}
                  />
                  <span className="text-xs font-semibold text-slate-600">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Custom hex color
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(event) => updateTheme({ primaryColor: event.target.value })}
                className="h-10 w-10 rounded-full border-0 bg-transparent"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(event) => updateTheme({ primaryColor: event.target.value })}
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
              />
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-2 text-slate-500 shadow-sm">
                <Type className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Font pairing</h4>
                <p className="text-xs text-slate-500">
                  Swap the heading and body voice across the canvas.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {fontPairs.map((pair) => (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => updateTheme({ fontPairId: pair.id })}
                  className={cn(
                    "w-full rounded-[22px] border px-4 py-3 text-left transition",
                    theme.fontPairId === pair.id
                      ? "border-slate-900 bg-white shadow-sm"
                      : "border-slate-200 bg-white/80 hover:border-slate-300",
                  )}
                >
                  <div className="text-sm font-semibold text-slate-900">{pair.label}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-500">
                    {pair.description}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-2 text-slate-500 shadow-sm">
                {theme.mode === "dark" ? (
                  <MoonStar className="h-4 w-4" />
                ) : (
                  <SunMedium className="h-4 w-4" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Atmosphere</h4>
                <p className="text-xs text-slate-500">
                  Switch the preview between light and dark presentation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(["light", "dark"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => updateTheme({ mode })}
                  className={cn(
                    "rounded-[22px] border px-4 py-3 text-left transition",
                    theme.mode === mode
                      ? "border-slate-900 bg-white shadow-sm"
                      : "border-slate-200 bg-white/80 hover:border-slate-300",
                  )}
                >
                  <div className="text-sm font-semibold capitalize text-slate-900">
                    {mode}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {mode === "light"
                      ? "Bright and clean."
                      : "Moodier with stronger contrast."}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Radius
                </label>
                <select
                  value={theme.borderRadius}
                  onChange={(event) =>
                    updateTheme({
                      borderRadius: event.target.value as
                        | "none"
                        | "sm"
                        | "md"
                        | "lg"
                        | "full",
                    })
                  }
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                >
                  <option value="none">Sharp</option>
                  <option value="sm">Soft</option>
                  <option value="md">Rounded</option>
                  <option value="lg">Extra rounded</option>
                  <option value="full">Pill</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Density
                </label>
                <select
                  value={theme.spacing}
                  onChange={(event) =>
                    updateTheme({
                      spacing: event.target.value as "compact" | "normal" | "spacious",
                    })
                  }
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Balanced</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
