export const sectionTypes = [
  "Navbar",
  "Hero",
  "Features",
  "Pricing",
  "CTA",
  "Footer",
] as const;

export type SectionType = (typeof sectionTypes)[number];
export const sectionStyles = [
  "minimal",
  "bold",
  "dark",
  "playful",
  "corporate",
  "gradient",
  "light",
  "terminal",
  "gold",
  "glassmorphism",
  "colorful",
] as const;
export type SectionStyle = (typeof sectionStyles)[number];
export type SectionAccess = "free" | "premium";
export type SectionFramework = "React" | "Tailwind" | "HTML";

export const previewModes = ["desktop", "tablet", "mobile"] as const;
export type PreviewMode = (typeof previewModes)[number];

export type BuilderRadius = "none" | "sm" | "md" | "lg" | "full";
export type BuilderSpacing = "compact" | "normal" | "spacious";
export type BuilderMode = "light" | "dark";
export type BrandTone = "professional" | "friendly" | "bold" | "playful";

export interface SectionPreviewMeta {
  eyebrow: string;
  title: string;
  detail: string;
}

export interface SectionMarketplaceMeta {
  access: SectionAccess;
  styles: SectionStyle[];
  frameworks: SectionFramework[];
  darkMode: boolean;
  rating: number;
  reviews: number;
  usageCount: number;
  kitIds: string[];
}

export interface SectionBlueprint {
  id: string;
  variantOf?: string;
  type: SectionType;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  preview: SectionPreviewMeta;
  defaultData: Record<string, unknown>;
  marketplace: SectionMarketplaceMeta;
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
  secondaryColor: string;
  fontPairId: string;
  borderRadius: BuilderRadius;
  spacing: BuilderSpacing;
  mode: BuilderMode;
}

export interface BrandKit {
  companyName: string;
  logoUrl: string;
  websiteTopic: string;
  audience: string;
  uniqueValue: string;
  ctaLabel: string;
  brandTone: BrandTone;
  metaTitle: string;
  metaDescription: string;
}

export interface SectionKit {
  id: string;
  name: string;
  description: string;
  tagline: string;
  access: SectionAccess;
  styles: SectionStyle[];
  sectionIds: string[];
  priceLabel: string;
  themePatch: Partial<ThemeSettings>;
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
