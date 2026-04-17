export const sectionTypes = [
  "Navbar",
  "Hero",
  "Features",
  "Pricing",
  "CTA",
  "Footer",
] as const;

export type SectionType = (typeof sectionTypes)[number];

export const previewModes = ["desktop", "tablet", "mobile"] as const;
export type PreviewMode = (typeof previewModes)[number];

export type BuilderRadius = "none" | "sm" | "md" | "lg" | "full";
export type BuilderSpacing = "compact" | "normal" | "spacious";
export type BuilderMode = "light" | "dark";
export type BrandTone = "professional" | "friendly" | "bold";

export interface SectionPreviewMeta {
  eyebrow: string;
  title: string;
  detail: string;
}

export interface SectionBlueprint {
  id: string;
  type: SectionType;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  preview: SectionPreviewMeta;
  defaultData: Record<string, unknown>;
}

export interface CanvasSection {
  id: string;
  blueprintId: string;
  type: SectionType;
  name: string;
  data: Record<string, unknown>;
}

export interface ThemeSettings {
  primaryColor: string;
  fontPairId: string;
  borderRadius: BuilderRadius;
  spacing: BuilderSpacing;
  mode: BuilderMode;
}

export interface BrandKit {
  companyName: string;
  websiteTopic: string;
  audience: string;
  uniqueValue: string;
  ctaLabel: string;
  brandTone: BrandTone;
  metaTitle: string;
  metaDescription: string;
}

export interface PublishedProject {
  slug: string;
  projectName: string;
  sections: CanvasSection[];
  theme: ThemeSettings;
  brandKit: BrandKit;
  publishedAt: string;
}

export interface FontPair {
  id: string;
  label: string;
  description: string;
  headingFamily: string;
  bodyFamily: string;
}

export interface SeoIssue {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
}

export interface SeoReport {
  score: number;
  issues: SeoIssue[];
  checks: Array<{
    id: string;
    label: string;
    passed: boolean;
    detail: string;
  }>;
}
