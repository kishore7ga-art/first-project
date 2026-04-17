import type { SectionBlueprint, SectionType } from "@/builder/types";

function buildSection(
  blueprint: Omit<SectionBlueprint, "description" | "tags" | "preview"> & {
    description: string;
    tags: string[];
    preview: SectionBlueprint["preview"];
  },
) {
  return blueprint;
}

export const availableSections: SectionBlueprint[] = [
  buildSection({
    id: "navbar-1",
    type: "Navbar",
    name: "Minimal Navbar",
    description: "Simple brand-left navigation with an action button.",
    thumbnail: "PanelTop",
    tags: ["clean", "saas", "starter"],
    preview: {
      eyebrow: "Navigation",
      title: "Simple product header",
      detail: "Brand, links, and one CTA in a balanced row.",
    },
    defaultData: {
      logo: "Northstar",
      links: ["Product", "Solutions", "Pricing", "Company"],
      cta: "Start free",
    },
  }),
  buildSection({
    id: "navbar-2",
    type: "Navbar",
    name: "Announcement Navbar",
    description: "Top announcement with centered navigation links.",
    thumbnail: "Rows3",
    tags: ["announcement", "modern", "launch"],
    preview: {
      eyebrow: "Navigation",
      title: "Header with launch banner",
      detail: "Pairs a release note strip with centered navigation.",
    },
    defaultData: {
      announcement: "Spring release: shared workspaces are live.",
      logo: "Pulsekit",
      links: ["Overview", "Templates", "Pricing"],
      cta: "Book demo",
    },
  }),
  buildSection({
    id: "navbar-3",
    type: "Navbar",
    name: "Pill Navbar",
    description: "Soft rounded navigation for editorial landing pages.",
    thumbnail: "Navigation",
    tags: ["rounded", "editorial", "friendly"],
    preview: {
      eyebrow: "Navigation",
      title: "Rounded navigation shell",
      detail: "Ideal when the page needs a softer, more premium tone.",
    },
    defaultData: {
      logo: "Luma",
      links: ["Home", "Work", "Journal", "Contact"],
      meta: "Available for select launches",
      cta: "See plans",
    },
  }),
  buildSection({
    id: "hero-1",
    type: "Hero",
    name: "Centered Hero",
    description: "High-clarity hero for product launches and SaaS pages.",
    thumbnail: "LayoutTemplate",
    tags: ["centered", "saas", "conversion"],
    preview: {
      eyebrow: "Hero",
      title: "Crisp launch message",
      detail: "Stacked headline, supporting copy, and dual CTAs.",
    },
    defaultData: {
      eyebrow: "Launch faster with less busywork",
      title: "Turn your team into a shipping machine.",
      subtitle:
        "Northstar combines planning, handoff, and publishing in one calm workspace.",
      primaryCta: "Start building",
      secondaryCta: "Watch preview",
    },
  }),
  buildSection({
    id: "hero-2",
    type: "Hero",
    name: "Split Hero",
    description: "Headline left with trust block and proof points on the right.",
    thumbnail: "Columns2",
    tags: ["split", "trust", "b2b"],
    preview: {
      eyebrow: "Hero",
      title: "Split layout with proof",
      detail: "Adds trust markers and bullet points beside the value prop.",
    },
    defaultData: {
      eyebrow: "Built for modern product teams",
      title: "Plan, write, and ship every launch from one space.",
      subtitle:
        "Bring briefs, assets, approvals, and publishing together so teams move with less friction.",
      primaryCta: "Get started",
      secondaryCta: "Talk to sales",
      statValue: "4.9/5",
      statLabel: "Average team satisfaction",
      bulletPoints: ["Shared briefs", "Approval flows", "Instant publish"],
    },
  }),
  buildSection({
    id: "hero-3",
    type: "Hero",
    name: "Gradient Hero",
    description: "Visually rich hero with quote callout and softer atmosphere.",
    thumbnail: "Sparkles",
    tags: ["premium", "gradient", "brand"],
    preview: {
      eyebrow: "Hero",
      title: "Atmospheric landing hero",
      detail: "Adds a testimonial-style pull quote to the fold.",
    },
    defaultData: {
      eyebrow: "More signal, less noise",
      title: "Build a website your launch deserves.",
      subtitle:
        "Compose polished sections in minutes and keep every block aligned to one design system.",
      primaryCta: "Create my page",
      secondaryCta: "Browse examples",
      quote:
        "We rebuilt our launch site in an afternoon and the new page converted 28% better.",
    },
  }),
  buildSection({
    id: "hero-4",
    type: "Hero",
    name: "Metrics Hero",
    description: "Hero with supporting metrics for confident B2B storytelling.",
    thumbnail: "BarChart3",
    tags: ["metrics", "enterprise", "proof"],
    preview: {
      eyebrow: "Hero",
      title: "Hero with KPI rail",
      detail: "Supports the message with quick operational proof.",
    },
    defaultData: {
      eyebrow: "Operating system for launches",
      title: "Keep every campaign moving from brief to publish.",
      subtitle:
        "A focused builder for teams that need a polished website without slowing engineering down.",
      primaryCta: "Start free",
      secondaryCta: "View template",
      metrics: [
        { value: "32%", label: "Faster launch cycles" },
        { value: "14 hrs", label: "Saved per campaign" },
        { value: "120+", label: "Reusable sections" },
      ],
    },
  }),
  buildSection({
    id: "hero-5",
    type: "Hero",
    name: "Minimal Hero",
    description: "Low-noise hero that feels editorial and precise.",
    thumbnail: "Badge",
    tags: ["minimal", "editorial", "focused"],
    preview: {
      eyebrow: "Hero",
      title: "Quiet, minimal headline",
      detail: "Ideal for premium products and creative portfolios.",
    },
    defaultData: {
      eyebrow: "For teams with taste",
      title: "A calmer way to shape your next homepage.",
      subtitle:
        "Choose a direction, edit the copy inline, and publish a focused landing page that feels considered.",
      primaryCta: "Start a draft",
    },
  }),
  buildSection({
    id: "features-1",
    type: "Features",
    name: "Feature Cards",
    description: "Three-card benefits grid with concise supporting copy.",
    thumbnail: "LayoutGrid",
    tags: ["grid", "product", "saas"],
    preview: {
      eyebrow: "Features",
      title: "Three key benefits",
      detail: "Balanced card layout for core product messaging.",
    },
    defaultData: {
      heading: "Why teams switch to Northstar",
      subheading:
        "Every section stays cohesive because the whole page runs on shared tokens.",
      features: [
        {
          title: "One visual system",
          description: "Mix sections freely and still get a coherent result.",
        },
        {
          title: "Inline editing",
          description: "Update headlines and body copy directly on the canvas.",
        },
        {
          title: "Polished by default",
          description: "Use thoughtful defaults instead of starting from blank space.",
        },
      ],
    },
  }),
  buildSection({
    id: "features-2",
    type: "Features",
    name: "Checklist Features",
    description: "Asymmetric checklist section with onboarding-style clarity.",
    thumbnail: "ListChecks",
    tags: ["checklist", "onboarding", "ops"],
    preview: {
      eyebrow: "Features",
      title: "Checklist-style proof",
      detail: "Works well when you want a guided, operational tone.",
    },
    defaultData: {
      heading: "Ship confidently with built-in structure",
      intro:
        "Use this layout when the product story is more about confidence and process than flashy visuals.",
      subheading:
        "Guide visitors through the workflow with a clean left-right explanation.",
      points: [
        "Curated sections for common landing page flows",
        "Theme controls for color, type, and density",
        "Drag-and-drop reordering with safe snapping",
        "Local autosave for every edit you make",
      ],
    },
  }),
  buildSection({
    id: "features-3",
    type: "Features",
    name: "Story Features",
    description: "Three-step storytelling section with numbered highlights.",
    thumbnail: "Milestone",
    tags: ["story", "process", "roadmap"],
    preview: {
      eyebrow: "Features",
      title: "Narrative product story",
      detail: "Turns product benefits into a guided three-part sequence.",
    },
    defaultData: {
      heading: "A builder that thinks like a launch team",
      subheading:
        "Move from structure to style to publishing without context-switching.",
      highlights: [
        {
          label: "Step 01",
          title: "Choose your sections",
          description: "Browse by category and start with strong defaults.",
        },
        {
          label: "Step 02",
          title: "Edit everything inline",
          description: "Fine-tune your copy without opening a settings maze.",
        },
        {
          label: "Step 03",
          title: "Publish a preview link",
          description: "Share a polished browser-local prototype in seconds.",
        },
      ],
    },
  }),
  buildSection({
    id: "features-4",
    type: "Features",
    name: "Metrics Strip",
    description: "Feature section anchored by stats and concise detail cards.",
    thumbnail: "ChartNoAxesColumnIncreasing",
    tags: ["metrics", "trust", "results"],
    preview: {
      eyebrow: "Features",
      title: "Outcomes and proof points",
      detail: "A strong option for performance-focused messaging.",
    },
    defaultData: {
      heading: "Built to keep momentum high",
      subheading:
        "Use a metrics-led section when visitors care about operational proof.",
      stats: [
        {
          value: "90 sec",
          label: "to drop your first hero section",
          detail: "Start with a polished top fold instead of a blank canvas.",
        },
        {
          value: "20",
          label: "starter sections included",
          detail: "Cover the common marketing page patterns right away.",
        },
        {
          value: "0",
          label: "extra setup for local publishing",
          detail: "Prototype the publish flow without wiring a backend first.",
        },
      ],
    },
  }),
  buildSection({
    id: "pricing-1",
    type: "Pricing",
    name: "Three Tier Pricing",
    description: "Classic pricing cards with one featured option.",
    thumbnail: "CreditCard",
    tags: ["pricing", "tiers", "saas"],
    preview: {
      eyebrow: "Pricing",
      title: "Three pricing cards",
      detail: "Reliable layout for self-serve or hybrid SaaS offers.",
    },
    defaultData: {
      eyebrow: "Pricing",
      heading: "Choose the pace that fits your team",
      subtitle: "Start free, move fast, and scale when the workflow clicks.",
      cards: [
        {
          name: "Starter",
          price: "$0",
          description: "For solo builders shaping their first site.",
          cta: "Start free",
          featured: false,
          features: ["3 projects", "All free sections", "Local publish previews"],
        },
        {
          name: "Pro",
          price: "$24",
          description: "For small teams that publish regularly.",
          cta: "Upgrade to Pro",
          featured: true,
          features: ["Unlimited drafts", "Premium themes", "Collaboration handoff"],
        },
        {
          name: "Scale",
          price: "$79",
          description: "For launch-heavy teams with approvals and reviews.",
          cta: "Talk to sales",
          featured: false,
          features: ["Review flows", "Workspace roles", "Priority support"],
        },
      ],
    },
  }),
  buildSection({
    id: "pricing-2",
    type: "Pricing",
    name: "Comparison Pricing",
    description: "Two-plan pricing with concise differentiation.",
    thumbnail: "BadgeDollarSign",
    tags: ["comparison", "startup", "simple"],
    preview: {
      eyebrow: "Pricing",
      title: "Two-plan comparison",
      detail: "Great for simple product lines and clean decision-making.",
    },
    defaultData: {
      heading: "Simple pricing for focused teams",
      subtitle: "Keep the decision easy with just enough contrast.",
      plans: [
        {
          name: "Core",
          price: "$18",
          audience: "For designers and makers",
          features: ["5 active sites", "Theme customization", "Preview publishing"],
        },
        {
          name: "Studio",
          price: "$42",
          audience: "For small internal teams",
          features: ["Unlimited sites", "Client previews", "Priority onboarding"],
        },
      ],
    },
  }),
  buildSection({
    id: "pricing-3",
    type: "Pricing",
    name: "Spotlight Pricing",
    description: "Single featured plan with benefit checklist.",
    thumbnail: "Gem",
    tags: ["single-plan", "premium", "focus"],
    preview: {
      eyebrow: "Pricing",
      title: "Featured plan spotlight",
      detail: "Best when there is one primary offer to highlight.",
    },
    defaultData: {
      heading: "Everything you need in one plan",
      subtitle:
        "Lead with the default recommendation and remove pricing clutter.",
      planName: "Launch Pro",
      price: "$29/mo",
      billing: "Billed monthly, cancel anytime.",
      cta: "Start 14-day trial",
      benefits: [
        "Unlimited sections on every project",
        "Global theme controls",
        "Reusable published previews",
        "Faster campaign iteration",
      ],
    },
  }),
  buildSection({
    id: "cta-1",
    type: "CTA",
    name: "Banner CTA",
    description: "Centered banner CTA for end-of-page conversion.",
    thumbnail: "Megaphone",
    tags: ["banner", "conversion", "footer-prep"],
    preview: {
      eyebrow: "CTA",
      title: "Centered call to action",
      detail: "A clean conversion block before the footer.",
    },
    defaultData: {
      eyebrow: "Ready when you are",
      title: "Build your next launch page in one sitting.",
      subtitle:
        "Choose your sections, tune the theme, and share a polished preview today.",
      primaryCta: "Open builder",
      secondaryCta: "Browse sections",
    },
  }),
  buildSection({
    id: "cta-2",
    type: "CTA",
    name: "Split CTA",
    description: "High-contrast CTA with proof and concise support text.",
    thumbnail: "AppWindow",
    tags: ["split", "high-contrast", "trust"],
    preview: {
      eyebrow: "CTA",
      title: "Proof-driven CTA",
      detail: "Combines a direct ask with a confidence-building note.",
    },
    defaultData: {
      badge: "Trusted by fast-moving teams",
      title: "Give your team a calmer publishing workflow.",
      subtitle:
        "This split CTA works when the page needs one last confident push before the footer.",
      proof: "Used by product, growth, and brand teams across 120+ launches.",
      primaryCta: "Start a new project",
    },
  }),
  buildSection({
    id: "footer-1",
    type: "Footer",
    name: "Multi Column Footer",
    description: "Structured footer with grouped navigation columns.",
    thumbnail: "TableOfContents",
    tags: ["footer", "columns", "product"],
    preview: {
      eyebrow: "Footer",
      title: "Classic grouped footer",
      detail: "Organized columns for product, company, and resources.",
    },
    defaultData: {
      logo: "Northstar",
      tagline: "A website builder made for teams who care about craft and momentum.",
      groups: [
        { title: "Product", links: ["Builder", "Templates", "Themes"] },
        { title: "Company", links: ["About", "Customers", "Contact"] },
        { title: "Resources", links: ["Guides", "Changelog", "Help center"] },
      ],
      copyright: "(c) 2026 Northstar. All rights reserved.",
    },
  }),
  buildSection({
    id: "footer-2",
    type: "Footer",
    name: "Minimal Footer",
    description: "Compact footer for sharper editorial pages.",
    thumbnail: "AlignJustify",
    tags: ["minimal", "footer", "editorial"],
    preview: {
      eyebrow: "Footer",
      title: "Minimal footer strip",
      detail: "A concise footer with one summary line and links.",
    },
    defaultData: {
      logo: "Luma",
      summary: "Designed for polished launches, built for fast-moving teams.",
      links: ["Privacy", "Terms", "Status", "Contact"],
      note: "Now serving creative teams in 18 countries.",
    },
  }),
  buildSection({
    id: "footer-3",
    type: "Footer",
    name: "Newsletter Footer",
    description: "Footer with newsletter framing and secondary links.",
    thumbnail: "Mail",
    tags: ["newsletter", "community", "footer"],
    preview: {
      eyebrow: "Footer",
      title: "Footer with newsletter ask",
      detail: "Best for media, creator, and product-led brands.",
    },
    defaultData: {
      logo: "Pulsekit",
      summary: "Weekly ideas for better product pages, sharper launches, and calmer workflows.",
      cta: "Join newsletter",
      columns: [
        { title: "Explore", links: ["Sections", "Pricing"] },
        { title: "Community", links: ["Stories", "Twitter"] },
      ],
      copyright: "(c) 2026 Pulsekit Studio. Built with care.",
    },
  }),
];

export const starterBlueprintIds = [
  "navbar-1",
  "hero-2",
  "features-1",
  "pricing-1",
  "cta-2",
  "footer-1",
] as const;

export const sectionCategoryOrder: SectionType[] = [
  "Navbar",
  "Hero",
  "Features",
  "Pricing",
  "CTA",
  "Footer",
];

export const sectionBlueprintMap = Object.fromEntries(
  availableSections.map((section) => [section.id, section]),
) as Record<string, SectionBlueprint>;
