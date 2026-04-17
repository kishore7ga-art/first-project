import { v4 as uuidv4 } from "uuid";
import { availableSections, sectionBlueprintMap } from "@/builder/libraryData";
import type {
  BrandKit,
  BrandTone,
  CanvasSection,
  SectionBlueprint,
  SectionType,
  ThemeSettings,
} from "@/builder/types";

type ThemePatch = Partial<ThemeSettings>;

const toneProfiles: Record<
  BrandTone,
  {
    badge: string;
    adjective: string;
    tempo: string;
    mood: string;
    proof: string;
  }
> = {
  professional: {
    badge: "Trusted by",
    adjective: "clear",
    tempo: "confidently",
    mood: "polished",
    proof: "credible",
  },
  friendly: {
    badge: "Loved by",
    adjective: "approachable",
    tempo: "comfortably",
    mood: "welcoming",
    proof: "human",
  },
  bold: {
    badge: "Built for",
    adjective: "high-impact",
    tempo: "fearlessly",
    mood: "bold",
    proof: "dramatic",
  },
  playful: {
    badge: "Made for",
    adjective: "joyful",
    tempo: "lightly",
    mood: "playful",
    proof: "memorable",
  },
};

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function hashValue(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 1000003;
  }

  return hash;
}

export function normalizeBrandKit(brandKit: Partial<BrandKit>): BrandKit {
  const companyName = brandKit.companyName?.trim() || "Northstar";
  const logoUrl = brandKit.logoUrl?.trim() || "";
  const websiteTopic = brandKit.websiteTopic?.trim() || "AI website builder";
  const audience = brandKit.audience?.trim() || "modern product teams";
  const uniqueValue =
    brandKit.uniqueValue?.trim() ||
    "turn ideas into polished launch pages without slowing engineering down";
  const ctaLabel = brandKit.ctaLabel?.trim() || "Start free";
  const brandTone = brandKit.brandTone ?? "professional";
  const metaTitle =
    brandKit.metaTitle?.trim() ||
    `${companyName} | ${titleCase(websiteTopic)} for ${audience}`;
  const metaDescription =
    brandKit.metaDescription?.trim() ||
    `${companyName} helps ${audience} ${uniqueValue}. Build a ${toneProfiles[brandTone].mood} website experience with reusable sections, cohesive themes, and faster publishing.`;

  return {
    companyName,
    logoUrl,
    websiteTopic,
    audience,
    uniqueValue,
    ctaLabel,
    brandTone,
    metaTitle,
    metaDescription,
  };
}

function topicNiche(brandKit: BrandKit) {
  return brandKit.websiteTopic.toLowerCase();
}

function audiencePhrase(brandKit: BrandKit) {
  return brandKit.audience.toLowerCase();
}

function pickColorForTone(brandTone: BrandTone) {
  switch (brandTone) {
    case "friendly":
      return "#059669";
    case "bold":
      return "#be185d";
    case "playful":
      return "#ec4899";
    default:
      return "#2563eb";
  }
}

function pickSecondaryColorForTone(brandTone: BrandTone) {
  switch (brandTone) {
    case "friendly":
      return "#14b8a6";
    case "bold":
      return "#6366f1";
    case "playful":
      return "#f59e0b";
    default:
      return "#14b8a6";
  }
}

function pickFontForTone(brandTone: BrandTone) {
  switch (brandTone) {
    case "friendly":
      return "craft";
    case "bold":
      return "contrast-slab";
    case "playful":
      return "geometric";
    default:
      return "monument";
  }
}

export function deriveThemePatchFromBrandKit(brandKit: BrandKit): ThemePatch {
  return {
    primaryColor: pickColorForTone(brandKit.brandTone),
    secondaryColor: pickSecondaryColorForTone(brandKit.brandTone),
    fontPairId: pickFontForTone(brandKit.brandTone),
    mode: brandKit.brandTone === "bold" ? "dark" : "light",
    borderRadius:
      brandKit.brandTone === "professional"
        ? "sm"
        : brandKit.brandTone === "playful"
          ? "lg"
          : "md",
  };
}

export function getMetaFromBrandKit(brandKit: Partial<BrandKit>) {
  const normalized = normalizeBrandKit(brandKit);
  return {
    metaTitle: normalized.metaTitle,
    metaDescription: normalized.metaDescription,
  };
}

export function createCanvasSectionFromBlueprintId(
  blueprintId: string,
  brandKit: Partial<BrandKit>,
): CanvasSection {
  const blueprint = sectionBlueprintMap[blueprintId];
  const normalizedBrandKit = normalizeBrandKit(brandKit);

  if (!blueprint) {
    throw new Error(`Missing blueprint: ${blueprintId}`);
  }

  return {
    id: uuidv4(),
    blueprintId,
    type: blueprint.type,
    name: blueprint.name,
    data: personalizeSectionData(blueprintId, normalizedBrandKit),
  };
}

export function createCanvasSectionsFromBlueprintIds(
  blueprintIds: string[],
  brandKit: Partial<BrandKit>,
) {
  return blueprintIds.map((blueprintId) =>
    createCanvasSectionFromBlueprintId(blueprintId, brandKit),
  );
}

function createFeatureSet(brandKit: BrandKit) {
  const tone = toneProfiles[brandKit.brandTone];
  const topic = topicNiche(brandKit);
  const audience = audiencePhrase(brandKit);

  return [
    {
      title: `Built for ${audience}`,
      description: `Every block is tuned for ${topic} teams that need a ${tone.adjective} buying experience.`,
    },
    {
      title: "Faster launch cycles",
      description: `Keep content, layout, and theme decisions aligned so ${audience} ship ${tone.tempo}.`,
    },
    {
      title: "Brand-ready sections",
      description: `Carry your tone, spacing, and primary CTA through every section without cleanup work.`,
    },
  ];
}

function createChecklistPoints(brandKit: BrandKit) {
  const topic = topicNiche(brandKit);
  return [
    `Homepage copy written specifically for ${topic} visitors`,
    "Shared brand system across every section and CTA",
    "Live preview that stays consistent on desktop, tablet, and mobile",
    "Publish-ready structure with pricing, proof, and conversion moments",
  ];
}

function createMetrics(brandKit: BrandKit) {
  const audience = audiencePhrase(brandKit);
  return [
    { value: "3x", label: `faster review cycles for ${audience}` },
    { value: "20+", label: "starter sections available on day one" },
    { value: "100%", label: "shared theme coverage across the page" },
  ];
}

function createPricingCards(brandKit: BrandKit) {
  return [
    {
      name: "Starter",
      price: "$0",
      description: `Great for solo teams exploring ${topicNiche(brandKit)} ideas.`,
      cta: "Start free",
      featured: false,
      features: ["3 projects", "Pre-built section library", "Browser publish previews"],
    },
    {
      name: "Pro",
      price: "$24",
      description: `Best for ${audiencePhrase(brandKit)} that publish every month.`,
      cta: brandKit.ctaLabel,
      featured: true,
      features: ["Unlimited pages", "Brand kit controls", "AI-style content refresh"],
    },
    {
      name: "Scale",
      price: "$79",
      description: "For teams with approvals, reviews, and multiple launch owners.",
      cta: "Talk to sales",
      featured: false,
      features: ["Review workflows", "Advanced publishing", "Priority support"],
    },
  ];
}

export function personalizeSectionData(blueprintId: string, partialBrandKit: Partial<BrandKit>) {
  const brandKit = normalizeBrandKit(partialBrandKit);
  const tone = toneProfiles[brandKit.brandTone];
  const topic = topicNiche(brandKit);
  const audience = audiencePhrase(brandKit);

  switch (blueprintId) {
    case "navbar-1":
      return {
        logo: brandKit.companyName,
        logoUrl: brandKit.logoUrl,
        links: ["Overview", "Use cases", "Pricing", "Contact"],
        cta: brandKit.ctaLabel,
      };
    case "navbar-2":
      return {
        announcement: `${tone.badge} ${audience} building ${topic} websites faster this season.`,
        logo: brandKit.companyName,
        logoUrl: brandKit.logoUrl,
        links: ["Product", "Templates", "Pricing"],
        cta: brandKit.ctaLabel,
      };
    case "navbar-3":
      return {
        logo: brandKit.companyName,
        logoUrl: brandKit.logoUrl,
        links: ["Work", "Process", "Pricing", "Contact"],
        meta: `${titleCase(brandKit.brandTone)} tone active`,
        cta: brandKit.ctaLabel,
      };
    case "hero-1":
      return {
        eyebrow: `${tone.badge} ${audience}`,
        title: `${brandKit.companyName} helps ${audience} launch ${topic} pages faster.`,
        subtitle: `${brandKit.companyName} exists to ${brandKit.uniqueValue}. The result is a ${tone.mood} website experience that feels ready from the first draft.`,
        primaryCta: brandKit.ctaLabel,
        secondaryCta: "See example page",
      };
    case "hero-2":
      return {
        eyebrow: `${titleCase(topic)} for ${audience}`,
        title: `Make ${topic} feel ${tone.proof}, focused, and easy to choose.`,
        subtitle: `${brandKit.companyName} gives ${audience} a faster way to present the right offer, structure proof, and publish a page that converts.`,
        primaryCta: brandKit.ctaLabel,
        secondaryCta: "Book a walkthrough",
        statValue: "4.9/5",
        statLabel: `Average rating from ${audience}`,
        bulletPoints: [
          "Brand-ready landing page sections",
          "Instant theme and copy alignment",
          "Cleaner launches with less review churn",
        ],
      };
    case "hero-3":
      return {
        eyebrow: `A ${tone.mood} home for ${topic}`,
        title: `Build the page your ${topic} launch actually deserves.`,
        subtitle: `${brandKit.companyName} keeps structure, voice, and styling in sync so ${audience} can move faster without making the site feel generic.`,
        primaryCta: brandKit.ctaLabel,
        secondaryCta: "Browse sections",
        quote: `"${brandKit.companyName} gave us a ${tone.proof} way to explain our ${topic} offer and launch with less friction."`,
      };
    case "hero-4":
      return {
        eyebrow: `${titleCase(brandKit.brandTone)} launch system`,
        title: `Give ${audience} a faster path from brief to published page.`,
        subtitle: `${brandKit.companyName} brings layout, copy, and theme decisions into one builder so ${topic} campaigns stay aligned.`,
        primaryCta: brandKit.ctaLabel,
        secondaryCta: "View live preview",
        metrics: createMetrics(brandKit),
      };
    case "hero-5":
      return {
        eyebrow: `${titleCase(topic)} with less noise`,
        title: `A ${tone.adjective} way to present ${brandKit.companyName}.`,
        subtitle: `${brandKit.companyName} helps ${audience} shape a homepage that feels focused, intentional, and easy to trust.`,
        primaryCta: brandKit.ctaLabel,
      };
    case "features-1":
      return {
        heading: `Why ${audience} choose ${brandKit.companyName}`,
        subheading: `Every section is tuned for ${topic} teams that want a ${tone.mood} experience without rebuilding the design system each time.`,
        features: createFeatureSet(brandKit),
      };
    case "features-2":
      return {
        heading: `A calmer workflow for ${topic} launches`,
        intro: `${brandKit.companyName} gives ${audience} a single place to shape layout, styling, and messaging.`,
        subheading: `Use the checklist flow when you want to communicate confidence, process, and clarity instead of visual noise.`,
        points: createChecklistPoints(brandKit),
      };
    case "features-3":
      return {
        heading: `How ${brandKit.companyName} helps teams move ${tone.tempo}`,
        subheading: `Turn your ${topic} story into a guided sequence that visitors can understand in seconds.`,
        highlights: [
          {
            label: "Step 01",
            title: `Frame the ${topic} offer`,
            description: `Choose sections that make the offer feel ${tone.proof} and relevant to ${audience}.`,
          },
          {
            label: "Step 02",
            title: "Tune the brand system",
            description: `Apply tone, CTA language, and theme decisions once so the full page stays aligned.`,
          },
          {
            label: "Step 03",
            title: "Publish with confidence",
            description: `Share a live preview and move into launch reviews without rebuilding the page.`,
          },
        ],
      };
    case "features-4":
      return {
        heading: `${brandKit.companyName} keeps momentum high`,
        subheading: `Use a metrics-led story when ${audience} need proof that the builder can support real ${topic} campaigns.`,
        stats: [
          {
            value: "90 sec",
            label: "to place your first high-conversion hero",
            detail: `Start with a ${tone.mood} top fold instead of a blank canvas.`,
          },
          {
            value: "20",
            label: "starter sections ready for reuse",
            detail: `Cover the core ${topic} landing page patterns immediately.`,
          },
          {
            value: "1",
            label: "shared brand system across the site",
            detail: "Keep spacing, typography, and CTA treatment consistent from top to bottom.",
          },
        ],
      };
    case "pricing-1":
      return {
        eyebrow: "Pricing",
        heading: `Choose the plan that matches your ${topic} workflow`,
        subtitle: `Start simple, then scale into collaboration once the page process clicks for ${audience}.`,
        cards: createPricingCards(brandKit),
      };
    case "pricing-2":
      return {
        heading: `Simple pricing for ${audience}`,
        subtitle: `Keep the decision clear while still presenting a ${tone.proof} offer.`,
        plans: [
          {
            name: "Core",
            price: "$18",
            audience: `For solo operators shaping ${topic} pages`,
            features: ["5 active sites", "Theme controls", "Live preview sharing"],
          },
          {
            name: "Studio",
            price: "$42",
            audience: `For ${audience} working together`,
            features: ["Unlimited pages", "Brand kit sync", "Assistant-driven page drafts"],
          },
        ],
      };
    case "pricing-3":
      return {
        heading: `Everything ${audience} need in one plan`,
        subtitle: `Use a single highlighted offer when you want the pricing section to feel focused and ${tone.proof}.`,
        planName: `${brandKit.companyName} Pro`,
        price: "$29/mo",
        billing: `Built for ${audience}. Cancel whenever you need.`,
        cta: brandKit.ctaLabel,
        benefits: [
          "Unlimited sections on every page",
          "Shared brand kit and content refresh tools",
          "Live publish previews for stakeholder review",
          `A ${tone.mood} structure for every new ${topic} launch`,
        ],
      };
    case "cta-1":
      return {
        eyebrow: `${titleCase(brandKit.brandTone)} launch flow`,
        title: `Build your next ${topic} page with less back-and-forth.`,
        subtitle: `${brandKit.companyName} helps ${audience} move from rough idea to polished page in a workflow that feels ${tone.adjective} from the start.`,
        primaryCta: brandKit.ctaLabel,
        secondaryCta: "See the section library",
      };
    case "cta-2":
      return {
        badge: `${tone.badge} ${audience}`,
        title: `Make your ${topic} website feel ${tone.proof} before launch day.`,
        subtitle: `${brandKit.companyName} keeps layout, styling, and conversion moments aligned so the page feels intentional.`,
        proof: `Built for ${audience} that want a ${tone.mood} launch process and a cleaner final site.`,
        primaryCta: brandKit.ctaLabel,
      };
    case "footer-1":
      return {
        logo: brandKit.companyName,
        logoUrl: brandKit.logoUrl,
        tagline: `${brandKit.companyName} helps ${audience} present ${topic} offers with a ${tone.adjective} story and a faster publishing workflow.`,
        groups: [
          { title: "Product", links: ["Builder", "Themes", "Publishing"] },
          { title: "Company", links: ["About", "Customers", "Contact"] },
          { title: "Resources", links: ["Guides", "Templates", "Support"] },
        ],
        copyright: `(c) 2026 ${brandKit.companyName}. All rights reserved.`,
      };
    case "footer-2":
      return {
        logo: brandKit.companyName,
        logoUrl: brandKit.logoUrl,
        summary: `${brandKit.companyName} brings a ${tone.mood} system to ${topic} pages for ${audience}.`,
        links: ["Privacy", "Terms", "Status", "Contact"],
        note: `${titleCase(brandKit.brandTone)} tone configured for this project.`,
      };
    case "footer-3":
      return {
        logo: brandKit.companyName,
        logoUrl: brandKit.logoUrl,
        summary: `Insights, examples, and launch ideas for ${audience} building better ${topic} websites.`,
        cta: "Join the newsletter",
        columns: [
          { title: "Explore", links: ["Sections", "Pricing"] },
          { title: "Community", links: ["Stories", "Support"] },
        ],
        copyright: `(c) 2026 ${brandKit.companyName}. Built with care.`,
      };
    default:
      return deepClone(sectionBlueprintMap[blueprintId]?.defaultData ?? {});
  }
}

export function personalizeCanvasSections(
  sections: CanvasSection[],
  brandKit: Partial<BrandKit>,
) {
  return sections.map((section) => ({
    ...section,
    data: personalizeSectionData(section.blueprintId, brandKit),
  }));
}

export function syncBrandIdentity(sections: CanvasSection[], partialBrandKit: Partial<BrandKit>) {
  const brandKit = normalizeBrandKit(partialBrandKit);

  return sections.map((section) => {
    const nextData = deepClone(section.data) as Record<string, unknown>;

    if ("logo" in nextData) {
      nextData.logo = brandKit.companyName;
      nextData.logoUrl = brandKit.logoUrl;
    }

    if ("cta" in nextData && typeof nextData.cta === "string") {
      nextData.cta = brandKit.ctaLabel;
    }

    if ("primaryCta" in nextData && typeof nextData.primaryCta === "string") {
      nextData.primaryCta = brandKit.ctaLabel;
    }

    return {
      ...section,
      data: nextData,
    };
  });
}

export function extractTopicFromPrompt(prompt: string) {
  const match =
    prompt.match(/(?:landing page|website|site)\s+for\s+(.+)$/i) ??
    prompt.match(/for\s+(.+)$/i) ??
    prompt.match(/about\s+(.+)$/i);

  if (!match) {
    return "";
  }

  return match[1]
    .replace(/[.?!]+$/, "")
    .split(/\b(with|including|featuring|using|that has|plus)\b/i)[0]
    .trim();
}

const sectionTypeFlow: SectionType[] = [
  "Navbar",
  "Hero",
  "Features",
  "Pricing",
  "CTA",
  "Footer",
];

const promptProfiles = [
  {
    keywords: ["minimal", "clean", "quiet", "simple", "focused"],
    tags: ["minimal", "clean", "focused", "editorial", "simple"],
    ids: ["navbar-1", "hero-5", "features-2", "pricing-2", "footer-2"],
  },
  {
    keywords: ["premium", "luxury", "editorial", "elegant", "fashion"],
    tags: ["premium", "editorial", "brand", "single-plan"],
    ids: ["navbar-3", "hero-3", "pricing-3", "footer-3"],
  },
  {
    keywords: ["trust", "proof", "results", "metrics", "b2b", "enterprise"],
    tags: ["trust", "proof", "metrics", "enterprise", "b2b"],
    ids: ["navbar-2", "hero-2", "hero-4", "features-4", "cta-2"],
  },
  {
    keywords: ["story", "process", "workflow", "roadmap", "journey"],
    tags: ["story", "process", "roadmap", "ops", "checklist"],
    ids: ["features-3", "features-2"],
  },
  {
    keywords: ["friendly", "community", "human", "creator", "newsletter"],
    tags: ["friendly", "community", "newsletter"],
    ids: ["navbar-3", "features-2", "footer-3"],
  },
  {
    keywords: ["playful", "fun", "joyful", "colorful", "creative"],
    tags: ["friendly", "community", "rounded", "editorial"],
    ids: ["navbar-3", "hero-5", "features-2", "footer-3"],
  },
  {
    keywords: ["corporate", "professional", "executive", "serious"],
    tags: ["trust", "saas", "product", "metrics", "b2b"],
    ids: ["navbar-1", "hero-2", "features-4", "pricing-1", "footer-1"],
  },
  {
    keywords: ["saas", "software", "app", "startup", "product"],
    tags: ["saas", "product", "conversion", "tiers", "grid"],
    ids: ["navbar-1", "hero-1", "features-1", "pricing-1", "cta-1"],
  },
  {
    keywords: ["comparison", "compare", "two plan", "simple pricing"],
    tags: ["comparison", "simple"],
    ids: ["pricing-2"],
  },
  {
    keywords: ["single plan", "one plan", "spotlight", "featured offer"],
    tags: ["single-plan", "premium", "focus"],
    ids: ["pricing-3"],
  },
  {
    keywords: ["bold", "dark", "dramatic"],
    tags: ["high-contrast", "gradient", "premium"],
    ids: ["hero-3", "cta-2"],
  },
] as const;

function promptIncludes(prompt: string, values: string[]) {
  return values.some((value) => prompt.includes(value));
}

function getTypePreferredIds(type: SectionType, prompt: string) {
  switch (type) {
    case "Navbar":
      if (promptIncludes(prompt, ["announcement", "trust", "enterprise", "proof"])) {
        return ["navbar-2"];
      }
      if (promptIncludes(prompt, ["premium", "editorial", "friendly", "creator"])) {
        return ["navbar-3"];
      }
      return ["navbar-1"];
    case "Hero":
      if (promptIncludes(prompt, ["minimal", "clean", "quiet"])) {
        return ["hero-5"];
      }
      if (promptIncludes(prompt, ["metrics", "results", "dashboard", "stats"])) {
        return ["hero-4", "hero-2"];
      }
      if (promptIncludes(prompt, ["premium", "bold", "dark", "luxury"])) {
        return ["hero-3", "hero-2"];
      }
      if (promptIncludes(prompt, ["trust", "proof", "b2b", "enterprise"])) {
        return ["hero-2", "hero-4"];
      }
      return ["hero-1", "hero-2"];
    case "Features":
      if (promptIncludes(prompt, ["story", "process", "workflow"])) {
        return ["features-3", "features-2"];
      }
      if (promptIncludes(prompt, ["checklist", "operations", "ops", "onboarding"])) {
        return ["features-2", "features-1"];
      }
      if (promptIncludes(prompt, ["metrics", "proof", "results", "performance"])) {
        return ["features-4", "features-1"];
      }
      return ["features-1", "features-3"];
    case "Pricing":
      if (promptIncludes(prompt, ["comparison", "compare", "two plan", "simple pricing"])) {
        return ["pricing-2"];
      }
      if (promptIncludes(prompt, ["single plan", "one plan", "spotlight", "premium"])) {
        return ["pricing-3"];
      }
      return ["pricing-1"];
    case "CTA":
      return promptIncludes(prompt, ["split", "trust", "proof", "dark", "bold"])
        ? ["cta-2"]
        : ["cta-1"];
    case "Footer":
      if (promptIncludes(prompt, ["newsletter", "community", "creator", "media"])) {
        return ["footer-3"];
      }
      if (promptIncludes(prompt, ["minimal", "editorial", "quiet"])) {
        return ["footer-2"];
      }
      return ["footer-1"];
    default:
      return [];
  }
}

function scoreBlueprintForPrompt(
  blueprint: SectionBlueprint,
  prompt: string,
  preferredIds: string[],
  brandKit: BrandKit,
) {
  const haystack = `${blueprint.name} ${blueprint.description} ${blueprint.preview.title} ${blueprint.preview.detail} ${blueprint.tags.join(" ")}`.toLowerCase();
  const promptWords = prompt.split(/[^a-z0-9]+/).filter((word) => word.length > 2);
  let score = 0;

  for (const word of promptWords) {
    if (haystack.includes(word)) {
      score += 2;
    }
  }

  for (const profile of promptProfiles) {
    if (!promptIncludes(prompt, [...profile.keywords])) {
      continue;
    }

    if (profile.ids.some((id) => id === blueprint.id)) {
      score += 8;
    }

    score += blueprint.tags.filter((tag) => profile.tags.some((value) => value === tag)).length * 3;
  }

  if (preferredIds.includes(blueprint.id)) {
    score += 12;
  }

  if (promptIncludes(prompt, blueprint.marketplace.styles)) {
    score += 5;
  }

  if (brandKit.brandTone === "bold") {
    score += blueprint.tags.some((tag) => ["premium", "gradient", "high-contrast"].includes(tag))
      ? 3
      : 0;
  }

  if (brandKit.brandTone === "friendly") {
    score += blueprint.tags.some((tag) => ["friendly", "community", "editorial"].includes(tag))
      ? 3
      : 0;
  }

  if (brandKit.brandTone === "professional") {
    score += blueprint.tags.some((tag) => ["trust", "saas", "product", "metrics"].includes(tag))
      ? 3
      : 0;
  }

  if (brandKit.brandTone === "playful") {
    score += blueprint.tags.some((tag) => ["friendly", "community", "editorial"].includes(tag))
      ? 3
      : 0;
  }

  score += (hashValue(`${prompt}:${blueprint.id}`) % 7) / 10;

  return score;
}

function pickBlueprintForType(
  type: SectionType,
  prompt: string,
  brandKit: BrandKit,
  usedIds: Set<string>,
) {
  const preferredIds = getTypePreferredIds(type, prompt);
  const candidates = availableSections.filter(
    (section) =>
      section.marketplace.access === "free" &&
      section.type === type &&
      !usedIds.has(section.id),
  );

  return candidates.sort((first, second) => {
    const secondScore = scoreBlueprintForPrompt(second, prompt, preferredIds, brandKit);
    const firstScore = scoreBlueprintForPrompt(first, prompt, preferredIds, brandKit);

    return secondScore - firstScore || first.name.localeCompare(second.name);
  })[0];
}

function hasUnusedEligibleSection(type: SectionType, usedIds: Set<string>) {
  return availableSections.some(
    (section) =>
      section.marketplace.access === "free" &&
      section.type === type &&
      !usedIds.has(section.id),
  );
}

function buildBlueprintIdsFromPrompt(prompt: string, brandKit: BrandKit) {
  const usedIds = new Set<string>();
  const selectedIds: string[] = [];
  const wantsDetailed =
    promptIncludes(prompt, ["detailed", "complete", "long", "full", "super"]) ||
    prompt.split(/\s+/).length > 14;
  const wantsStory = promptIncludes(prompt, ["story", "workflow", "process", "journey"]);
  const wantsProof = promptIncludes(prompt, ["proof", "trust", "results", "metrics"]);

  for (const type of sectionTypeFlow) {
    const picked = pickBlueprintForType(type, prompt, brandKit, usedIds);

    if (!picked) {
      continue;
    }

    selectedIds.push(picked.id);
    usedIds.add(picked.id);

    if (
      type === "Features" &&
      (wantsDetailed || wantsStory || wantsProof) &&
      hasUnusedEligibleSection("Features", usedIds)
    ) {
      const extraFeature = pickBlueprintForType("Features", prompt, brandKit, usedIds);

      if (extraFeature) {
        selectedIds.push(extraFeature.id);
        usedIds.add(extraFeature.id);
      }
    }

    if (
      type === "CTA" &&
      wantsDetailed &&
      hasUnusedEligibleSection("CTA", usedIds)
    ) {
      const extraCta = pickBlueprintForType("CTA", prompt, brandKit, usedIds);

      if (extraCta) {
        selectedIds.push(extraCta.id);
        usedIds.add(extraCta.id);
      }
    }
  }

  return selectedIds;
}

export function buildDraftFromPrompt(prompt: string, brandKit: Partial<BrandKit>) {
  const detectedTopic = extractTopicFromPrompt(prompt) || brandKit.websiteTopic || "AI product";
  const lowerPrompt = prompt.toLowerCase();
  const nextBrandKit = normalizeBrandKit({
    ...brandKit,
    websiteTopic: detectedTopic,
    companyName:
      brandKit.companyName && brandKit.companyName !== "Northstar"
        ? brandKit.companyName
        : titleCase(detectedTopic.split(" ").slice(0, 2).join(" ")) || "Northstar",
    brandTone: lowerPrompt.includes("playful") || lowerPrompt.includes("creative")
      ? "playful"
      : lowerPrompt.includes("friendly")
        ? "friendly"
        : lowerPrompt.includes("bold")
          ? "bold"
          : lowerPrompt.includes("corporate") || lowerPrompt.includes("professional")
            ? "professional"
            : brandKit.brandTone,
  });

  const dark = lowerPrompt.includes("dark");
  const blueprintIds = buildBlueprintIdsFromPrompt(lowerPrompt, nextBrandKit);
  const draftTheme = deriveThemePatchFromBrandKit(nextBrandKit);

  const themePatch: ThemePatch = {
    ...draftTheme,
    mode: dark ? "dark" : draftTheme.mode,
  };

  const sectionNames = blueprintIds
    .map((blueprintId) => sectionBlueprintMap[blueprintId]?.name)
    .filter(Boolean);

  return {
    projectName: `${titleCase(detectedTopic)} landing page`,
    brandKit: nextBrandKit,
    sections: createCanvasSectionsFromBlueprintIds(blueprintIds, nextBrandKit),
    themePatch,
    blueprintIds,
    summary: `Built a ${nextBrandKit.brandTone} ${detectedTopic} draft with ${sectionNames.join(", ")}.`,
  };
}
