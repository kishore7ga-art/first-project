import type { CSSProperties } from "react";
import type {
  BuilderRadius,
  BuilderSpacing,
  FontPair,
  PreviewMode,
  ThemeSettings,
} from "@/builder/types";

export const fontPairs: FontPair[] = [
  {
    id: "studio-sans",
    label: "Studio Sans",
    description: "Clean product tone with crisp hierarchy.",
    headingFamily: '"Avenir Next", "Segoe UI", sans-serif',
    bodyFamily: '"Inter", "Segoe UI", sans-serif',
  },
  {
    id: "editorial",
    label: "Editorial Contrast",
    description: "High-end serif with modern body copy.",
    headingFamily: '"Baskerville", Georgia, serif',
    bodyFamily: '"Helvetica Neue", Arial, sans-serif',
  },
  {
    id: "friendly",
    label: "Friendly Humanist",
    description: "Warm and approachable for service brands.",
    headingFamily: '"Gill Sans", "Trebuchet MS", sans-serif',
    bodyFamily: '"Trebuchet MS", Arial, sans-serif',
  },
  {
    id: "geometric",
    label: "Geometric Signal",
    description: "Bold geometric headings with sturdy body text.",
    headingFamily: '"Century Gothic", "Futura", sans-serif',
    bodyFamily: 'Verdana, "Segoe UI", sans-serif',
  },
  {
    id: "newsroom",
    label: "Newsroom",
    description: "Smart editorial pairing for thought-leadership pages.",
    headingFamily: '"Palatino Linotype", "Book Antiqua", serif',
    bodyFamily: 'Arial, "Helvetica Neue", sans-serif',
  },
  {
    id: "monument",
    label: "Monument",
    description: "Solid enterprise voice with clear structure.",
    headingFamily: '"Franklin Gothic Medium", "Arial Narrow", sans-serif',
    bodyFamily: '"Segoe UI", Arial, sans-serif',
  },
  {
    id: "soft-serif",
    label: "Soft Serif",
    description: "Elegant top line with lightweight supporting copy.",
    headingFamily: '"Georgia", serif',
    bodyFamily: '"Tahoma", "Segoe UI", sans-serif',
  },
  {
    id: "craft",
    label: "Craft Modern",
    description: "Rounded and optimistic for creator products.",
    headingFamily: '"Trebuchet MS", "Gill Sans", sans-serif',
    bodyFamily: '"Verdana", "Segoe UI", sans-serif',
  },
  {
    id: "contrast-slab",
    label: "Contrast Slab",
    description: "Punchy landing pages with sturdy character.",
    headingFamily: '"Rockwell", "Georgia", serif',
    bodyFamily: '"Arial", "Helvetica Neue", sans-serif',
  },
  {
    id: "classic-ui",
    label: "Classic UI",
    description: "Neutral and versatile for general purpose builds.",
    headingFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif',
    bodyFamily: '"Segoe UI", Arial, sans-serif',
  },
];

export const colorPresets = [
  { name: "Ocean", value: "#2563eb" },
  { name: "Coral", value: "#ea580c" },
  { name: "Mint", value: "#059669" },
  { name: "Berry", value: "#be185d" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Amber", value: "#d97706" },
  { name: "Slate", value: "#334155" },
  { name: "Rose", value: "#e11d48" },
];

export const previewWidths: Record<PreviewMode, string> = {
  desktop: "min(100%, 1180px)",
  tablet: "min(100%, 820px)",
  mobile: "min(100%, 420px)",
};

const radiusScale: Record<BuilderRadius, { card: string; input: string }> = {
  none: { card: "10px", input: "10px" },
  sm: { card: "18px", input: "16px" },
  md: { card: "26px", input: "20px" },
  lg: { card: "34px", input: "26px" },
  full: { card: "999px", input: "999px" },
};

const spacingScale: Record<BuilderSpacing, { section: string; gap: string }> = {
  compact: { section: "4.5rem", gap: "1rem" },
  normal: { section: "6rem", gap: "1.5rem" },
  spacious: { section: "7.5rem", gap: "2rem" },
};

function clamp(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function normalizeHex(color: string) {
  const safe = color.startsWith("#") ? color.slice(1) : color;
  if (safe.length === 3) {
    return safe
      .split("")
      .map((segment) => segment + segment)
      .join("");
  }

  return safe.slice(0, 6);
}

function hexToRgb(color: string) {
  const normalized = normalizeHex(color);
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => clamp(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixHex(first: string, second: string, weight: number) {
  const start = hexToRgb(first);
  const end = hexToRgb(second);
  const ratio = Math.max(0, Math.min(1, weight));

  return rgbToHex(
    start.r + (end.r - start.r) * ratio,
    start.g + (end.g - start.g) * ratio,
    start.b + (end.b - start.b) * ratio,
  );
}

function shiftHex(color: string, amount: number) {
  const { r, g, b } = hexToRgb(color);
  return rgbToHex(r + amount, g + amount, b + amount);
}

export function getFontPair(fontPairId: string) {
  return fontPairs.find((pair) => pair.id === fontPairId) ?? fontPairs[0];
}

export function getBuilderThemeStyles(theme: ThemeSettings): CSSProperties {
  const fontPair = getFontPair(theme.fontPairId);
  const radius = radiusScale[theme.borderRadius];
  const spacing = spacingScale[theme.spacing];
  const isDark = theme.mode === "dark";
  const primary = theme.primaryColor;

  const page = isDark ? mixHex(primary, "#020617", 0.9) : mixHex(primary, "#f8fafc", 0.94);
  const surface = isDark ? mixHex(primary, "#0f172a", 0.85) : "#ffffff";
  const soft = isDark ? mixHex(primary, "#0f172a", 0.72) : mixHex(primary, "#eff6ff", 0.72);
  const softStrong = isDark ? mixHex(primary, "#172554", 0.68) : mixHex(primary, "#dbeafe", 0.65);
  const border = isDark ? "rgba(148, 163, 184, 0.22)" : "rgba(148, 163, 184, 0.26)";
  const foreground = isDark ? "#f8fafc" : "#0f172a";
  const muted = isDark ? "#cbd5e1" : "#475569";
  const editorHover = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)";
  const editorFocus = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)";
  const primaryStrong = isDark ? shiftHex(primary, 18) : shiftHex(primary, -16);
  const primarySoft = isDark ? mixHex(primary, "#ffffff", 0.16) : mixHex(primary, "#ffffff", 0.28);

  return {
    "--builder-primary": primary,
    "--builder-primary-strong": primaryStrong,
    "--builder-primary-soft": primarySoft,
    "--builder-page": page,
    "--builder-card": surface,
    "--builder-soft": soft,
    "--builder-soft-strong": softStrong,
    "--builder-border": border,
    "--builder-foreground": foreground,
    "--builder-muted": muted,
    "--builder-shadow": isDark
      ? "0 18px 48px rgba(2, 6, 23, 0.55)"
      : "0 20px 44px rgba(15, 23, 42, 0.08)",
    "--builder-editor-hover": editorHover,
    "--builder-editor-focus": editorFocus,
    "--builder-radius-card": radius.card,
    "--builder-radius-input": radius.input,
    "--builder-radius-pill": theme.borderRadius === "full" ? "999px" : "999px",
    "--builder-section-space": spacing.section,
    "--builder-grid-gap": spacing.gap,
    "--builder-heading-font": fontPair.headingFamily,
    "--builder-body-font": fontPair.bodyFamily,
  } as CSSProperties;
}
