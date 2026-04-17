"use client";

import { MoonStar, Palette, SunMedium, Type, X } from "lucide-react";
import { colorPresets, fontPairs } from "@/builder/theme";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn, normalizeHexColor } from "@/lib/utils";

interface ThemePanelProps {
  open: boolean;
  onClose: () => void;
}

interface ColorFieldProps {
  fallback: string;
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorField({
  fallback,
  label,
  description,
  value,
  onChange,
}: ColorFieldProps) {
  const safeValue = normalizeHexColor(value, fallback);

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{label}</div>
          <div className="mt-1 text-xs leading-5 text-slate-500">{description}</div>
        </div>
        <span
          className="mt-0.5 h-10 w-10 rounded-2xl border border-slate-200"
          style={{ backgroundColor: safeValue }}
        />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
        <input
          type="color"
          value={safeValue}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-10 rounded-full border-0 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={(event) => onChange(normalizeHexColor(event.target.value, fallback))}
          className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
        />
      </div>
    </div>
  );
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
              Global Theme
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
                <h4 className="text-sm font-semibold text-slate-900">Design tokens</h4>
                <p className="text-xs text-slate-500">
                  Primary and secondary colors map across every section instantly.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() =>
                    updateTheme({
                      primaryColor: preset.value,
                    })
                  }
                  className={cn(
                    "rounded-[20px] border bg-white p-2 text-left shadow-sm transition",
                    normalizeHexColor(theme.primaryColor, preset.value) === preset.value
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

            <div className="mt-4 grid gap-4">
              <ColorField
                fallback="#2563eb"
                label="Primary color"
                description="Buttons, emphasis, and active surfaces."
                value={theme.primaryColor}
                onChange={(value) => updateTheme({ primaryColor: value })}
              />
              <ColorField
                fallback="#14b8a6"
                label="Secondary color"
                description="Soft backgrounds, cards, and supporting accents."
                value={theme.secondaryColor}
                onChange={(value) => updateTheme({ secondaryColor: value })}
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
                  Set `--font-heading` and `--font-body` across the full canvas.
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
                  Control light or dark presentation plus density and radius tokens.
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
