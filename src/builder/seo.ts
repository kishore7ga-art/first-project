import { getMetaFromBrandKit, normalizeBrandKit } from "@/builder/contentEngine";
import type { BrandKit, CanvasSection, SeoIssue, SeoReport } from "@/builder/types";

function getStringValue(
  data: Record<string, unknown>,
  key: string,
  fallback = "",
) {
  const value = data[key];
  return typeof value === "string" ? value : fallback;
}

function hasMeaningfulValue(value: string, min = 3) {
  return value.trim().length >= min;
}

export function analyzeSeo(
  partialBrandKit: Partial<BrandKit>,
  sections: CanvasSection[],
): SeoReport {
  const brandKit = normalizeBrandKit(partialBrandKit);
  const heroSection = sections.find((section) => section.type === "Hero");
  const footerSection = sections.find((section) => section.type === "Footer");
  const title = brandKit.metaTitle.trim();
  const description = brandKit.metaDescription.trim();
  const h1 = heroSection ? getStringValue(heroSection.data, "title") : "";

  const checks = [
    {
      id: "meta-title",
      label: "Meta title",
      passed: title.length >= 30 && title.length <= 60,
      detail: title
        ? `${title.length} characters`
        : "Add a meta title between 30 and 60 characters.",
    },
    {
      id: "meta-description",
      label: "Meta description",
      passed: description.length >= 80 && description.length <= 160,
      detail: description
        ? `${description.length} characters`
        : "Add a meta description between 80 and 160 characters.",
    },
    {
      id: "hero-h1",
      label: "Primary H1 section",
      passed: hasMeaningfulValue(h1, 12),
      detail: h1 ? "Hero headline is present." : "Add a clear hero title for the page.",
    },
    {
      id: "page-depth",
      label: "Page depth",
      passed: sections.length >= 4,
      detail:
        sections.length >= 4
          ? `${sections.length} sections on the page.`
          : "Aim for at least 4 sections to cover the full story.",
    },
    {
      id: "conversion-path",
      label: "Conversion path",
      passed: sections.some((section) => section.type === "CTA" || section.type === "Pricing"),
      detail: sections.some((section) => section.type === "CTA" || section.type === "Pricing")
        ? "A CTA or pricing section is present."
        : "Add a CTA or pricing section to give visitors a next step.",
    },
    {
      id: "footer-trust",
      label: "Footer and trust layer",
      passed: Boolean(footerSection),
      detail: footerSection
        ? "Footer section found."
        : "Add a footer to strengthen trust and navigation.",
    },
  ];

  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round((checks.filter((check) => check.passed).length / checks.length) * 100),
    ),
  );

  const issues: SeoIssue[] = [];

  if (!checks[0].passed) {
    issues.push({
      id: "title-length",
      severity: "high",
      title: "Meta title needs work",
      detail: "Keep it between 30 and 60 characters and lead with the core offer.",
    });
  }

  if (!checks[1].passed) {
    issues.push({
      id: "description-length",
      severity: "high",
      title: "Meta description is missing or weak",
      detail: "Aim for 80 to 160 characters that explain the value clearly.",
    });
  }

  if (!checks[2].passed) {
    issues.push({
      id: "hero-headline",
      severity: "medium",
      title: "Your page needs a stronger H1",
      detail: "Use the hero headline to say what the site is about in one sharp sentence.",
    });
  }

  if (!checks[4].passed) {
    issues.push({
      id: "missing-cta",
      severity: "medium",
      title: "No clear conversion section found",
      detail: "Add a CTA or pricing section so visitors have an obvious next step.",
    });
  }

  if (!checks[5].passed) {
    issues.push({
      id: "missing-footer",
      severity: "low",
      title: "Footer is missing",
      detail: "A footer helps with trust, navigation, and completeness.",
    });
  }

  return { score, issues, checks };
}

export function getSeoFixes(partialBrandKit: Partial<BrandKit>) {
  const { metaTitle, metaDescription } = getMetaFromBrandKit(partialBrandKit);
  return { metaTitle, metaDescription };
}
