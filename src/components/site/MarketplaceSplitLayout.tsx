"use client";

import {
  type DragEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Blocks,
  Eye,
  GripVertical,
  Layers3,
  Plus,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionReferencePreview } from "@/builder/components/SectionReferencePreview";
import { createCanvasSectionsFromBlueprintIds } from "@/builder/contentEngine";
import { availableSections, sectionKits } from "@/builder/libraryData";
import type {
  SectionBlueprint,
  SectionKit,
  SectionType,
} from "@/builder/types";
import { cn, formatCompactNumber, formatRating } from "@/lib/utils";
import { useBuilderStore } from "@/store/useBuilderStore";

const templateCategories = ["All", "Business", "Portfolio", "SaaS", "Blog"] as const;
type TemplateCategory = (typeof templateCategories)[number];

const libraryCategories = [
  "All",
  "Headers",
  "Footers",
  "Hero sections",
  "Pricing",
  "Forms",
] as const;
type LibraryCategory = (typeof libraryCategories)[number];

const sectionKitById = Object.fromEntries(
  sectionKits.map((kit) => [kit.id, kit]),
) as Record<string, SectionKit>;

type TemplateEntry = {
  id: string;
  title: string;
  description: string;
  categories: TemplateCategory[];
  kit: SectionKit;
};

const templateEntries: TemplateEntry[] = [
  {
    id: "startup-kit",
    title: "Startup Blog",
    description:
      "A clean, editorial starter for product updates, launch notes, and business storytelling.",
    categories: ["Business", "Blog"],
    kit: sectionKitById["startup-kit"],
  },
  {
    id: "agency-kit",
    title: "Agency",
    description:
      "Sharper spacing and proof-first sections for service pages, pitch decks, and client sites.",
    categories: ["Business"],
    kit: sectionKitById["agency-kit"],
  },
  {
    id: "saas-dark-kit",
    title: "SaaS",
    description:
      "A bold dark system built for product launches, pricing pages, and trust-heavy conversion flows.",
    categories: ["Business", "SaaS"],
    kit: sectionKitById["saas-dark-kit"],
  },
  {
    id: "portfolio-kit",
    title: "Portfolio",
    description:
      "A calm, minimal stack for personal brands, studios, and polished portfolio pages.",
    categories: ["Portfolio"],
    kit: sectionKitById["portfolio-kit"],
  },
];

type LibraryGroup = {
  title: LibraryCategory;
  type: SectionType;
  description: string;
};

const libraryGroups: LibraryGroup[] = [
  {
    title: "Headers",
    type: "Navbar",
    description: "Navigation, announcement bars, and top-level page shells.",
  },
  {
    title: "Hero sections",
    type: "Hero",
    description: "Above-the-fold hero blocks and launch intros.",
  },
  {
    title: "Pricing",
    type: "Pricing",
    description: "Pricing cards, plans, and comparison layouts.",
  },
  {
    title: "Forms",
    type: "CTA",
    description: "Lead capture, signup prompts, and conversion blocks.",
  },
  {
    title: "Footers",
    type: "Footer",
    description: "Multi-column and minimal closing sections.",
  },
];

function useVisibilityOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "220px",
        threshold: 0.12,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return [ref, visible] as const;
}

function TemplateCard({
  template,
  onUseTemplate,
}: {
  template: TemplateEntry;
  onUseTemplate: (kit: SectionKit) => void;
}) {
  return (
    <article className="group rounded-[20px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-600">
            {template.categories.join(" / ")}
          </p>
          <h3 className="mt-2 text-lg font-black tracking-tight text-white">
            {template.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            {template.description}
          </p>
        </div>

        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em]",
            template.kit.access === "premium"
              ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
              : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
          )}
        >
          {template.kit.access}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {template.kit.styles.map((style) => (
          <span
            key={style}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500"
          >
            {style}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-zinc-600">
          {template.kit.sectionIds.length} sections
        </span>
        <Button
          type="button"
          onClick={() => onUseTemplate(template.kit)}
          className="rounded-full bg-white px-4 py-2.5 text-sm font-black text-black transition hover:bg-zinc-200"
        >
          Use Template
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}

function TemplatePanel({
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
  filteredTemplates,
  onUseTemplate,
  onClearSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
  activeCategory: TemplateCategory;
  setActiveCategory: (value: TemplateCategory) => void;
  filteredTemplates: TemplateEntry[];
  onUseTemplate: (kit: SectionKit) => void;
  onClearSearch: () => void;
}) {
  return (
    <div className="h-full min-h-0 overflow-y-auto scroll-smooth snap-y snap-mandatory p-4 sm:p-5 lg:p-6">
      <div className="snap-start rounded-[28px] border border-white/10 bg-[#101014]/90 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">
              <Blocks className="h-3.5 w-3.5 text-cyan-300" />
              Templates
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
              Starter stacks
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
              Apply a template to load a complete launch direction into the current workspace.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            {filteredTemplates.length} kits
          </span>
        </div>

        <div className="mt-5">
          <label htmlFor="template-search" className="sr-only">
            Search templates
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-zinc-500" />
            <Input
              id="template-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search templates..."
              className="h-auto border-0 bg-transparent p-0 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-0"
            />
            {search ? (
              <button
                type="button"
                onClick={onClearSearch}
                className="rounded-full px-2 py-1 text-xs font-bold text-zinc-600 transition hover:text-white"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {templateCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-bold transition",
                activeCategory === category
                  ? "border-white/20 bg-white text-black"
                  : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-white",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="snap-start">
            <TemplateCard template={template} onUseTemplate={onUseTemplate} />
          </div>
        ))}

        {filteredTemplates.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-white/10 bg-white/[0.03] p-6 text-sm leading-6 text-zinc-500">
            No templates matched. Try a different search or switch categories.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function LibraryDropZone({
  isDragging,
  onAddBlueprint,
}: {
  isDragging: boolean;
  onAddBlueprint: (blueprint: SectionBlueprint) => void;
}) {
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);

    const raw = event.dataTransfer.getData("application/x-section-blueprint");
    const fallback = event.dataTransfer.getData("text/plain");
    const blueprintId = raw || fallback;
    if (!blueprintId) {
      return;
    }

    const blueprint = availableSections.find((section) => section.id === blueprintId);
    if (blueprint) {
      onAddBlueprint(blueprint);
    }
  };

  return (
    <div
      onDragOver={(event) => {
        if (!isDragging) {
          return;
        }

        event.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={cn(
        "rounded-[24px] border border-dashed px-4 py-3 transition",
        isOver
          ? "border-cyan-300 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_0_40px_rgba(34,211,238,0.18)]"
          : "border-white/10 bg-white/[0.03]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-zinc-600">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            Drop to page
          </div>
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            Drag a block here to add it to the current workspace, or click Add to Page.
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
          Live sync
        </div>
      </div>
    </div>
  );
}

function LazyPreviewFrame({ blueprint }: { blueprint: SectionBlueprint }) {
  const [previewRef, previewVisible] = useVisibilityOnce<HTMLDivElement>();

  return (
    <div
      ref={previewRef}
      className="relative h-full overflow-hidden rounded-[18px] border border-white/10 bg-[#F4F4F5]"
    >
      {previewVisible ? (
        <div className="absolute left-0 top-0 h-[820px] w-[1280px] origin-top-left scale-[0.18]">
          <SectionReferencePreview blueprint={blueprint} />
        </div>
      ) : (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/20 via-white/10 to-transparent" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
    </div>
  );
}

function LibraryBlockCard({
  blueprint,
  onAddBlueprint,
  isDragging,
  onDragStart,
  onDragEnd,
}: {
  blueprint: SectionBlueprint;
  onAddBlueprint: (blueprint: SectionBlueprint) => void;
  isDragging: boolean;
  onDragStart: (blueprint: SectionBlueprint) => void;
  onDragEnd: () => void;
}) {
  const isLocked = blueprint.marketplace.access === "premium";

  const handleDragStart = (event: DragEvent<HTMLElement>) => {
    onDragStart(blueprint);
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("application/x-section-blueprint", blueprint.id);
    event.dataTransfer.setData("text/plain", blueprint.id);
  };

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className={cn(
        "group cursor-grab rounded-[20px] border border-white/10 bg-white/[0.03] p-3 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_24px_80px_rgba(0,0,0,0.35)] active:cursor-grabbing",
        isDragging && "scale-[0.98] opacity-75",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            <GripVertical className="h-3.5 w-3.5" />
            {blueprint.type}
          </div>
          <h3 className="mt-2 text-base font-black text-white">{blueprint.name}</h3>
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em]",
            isLocked
              ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
              : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
          )}
        >
          {isLocked ? "Premium" : "Free"}
        </span>
      </div>

      <div className="mt-3 h-44">
        <LazyPreviewFrame blueprint={blueprint} />
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-500">
        {blueprint.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
          {formatRating(blueprint.marketplace.rating)} ({blueprint.marketplace.reviews})
        </span>
        <span>{formatCompactNumber(blueprint.marketplace.usageCount)} uses</span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-white transition hover:bg-white/[0.08]"
        >
          <Eye className="mr-2 inline h-4 w-4" />
          Preview
        </button>
        <Button
          type="button"
          onClick={() => onAddBlueprint(blueprint)}
          className="flex-1 rounded-xl bg-white px-3 py-2 text-sm font-black text-black transition hover:bg-zinc-200"
        >
          <Plus className="mr-2 inline h-4 w-4" />
          Add to Page
        </Button>
      </div>
    </article>
  );
}

function LibraryPanel({
  activeCategory,
  setActiveCategory,
  filteredGroups,
  isDragging,
  onAddBlueprint,
  onDragStart,
  onDragEnd,
  workspaceCount,
}: {
  activeCategory: LibraryCategory;
  setActiveCategory: (value: LibraryCategory) => void;
  filteredGroups: LibraryGroup[];
  isDragging: boolean;
  onAddBlueprint: (blueprint: SectionBlueprint) => void;
  onDragStart: (blueprint: SectionBlueprint) => void;
  onDragEnd: () => void;
  workspaceCount: number;
}) {
  return (
    <div className="h-full min-h-0 overflow-y-auto scroll-smooth snap-y snap-mandatory p-4 sm:p-5 lg:p-6">
      <div className="space-y-4 rounded-[28px] border border-white/10 bg-[#101014]/90 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">
              <Layers3 className="h-3.5 w-3.5 text-cyan-300" />
              Library
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
              Reusable blocks
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              Browse headers, hero sections, pricing, forms, and footers. Drag a card onto the drop zone
              or click Add to Page to insert it into the workspace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              {workspaceCount} sections in workspace
            </span>
          </div>
        </div>

        <LibraryDropZone isDragging={isDragging} onAddBlueprint={onAddBlueprint} />

        <div className="flex flex-wrap gap-2">
          {libraryCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-bold transition",
                activeCategory === category
                  ? "border-white/20 bg-white text-black"
                  : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-white",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-6">
        {filteredGroups.map((group) => {
          const groupSections = availableSections.filter(
            (section) => !section.variantOf && section.type === group.type,
          );

          return (
            <section
              key={group.title}
              className="snap-start rounded-[28px] border border-white/10 bg-white/[0.02] p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-zinc-600">
                    {group.title}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                    {group.description}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  {groupSections.length} blocks
                </span>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {groupSections.map((section) => (
                  <div key={section.id} className="snap-start">
                    <LibraryBlockCard
                      blueprint={section}
                      onAddBlueprint={onAddBlueprint}
                      isDragging={isDragging}
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function MarketplaceSplitLayout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mobileTab, setMobileTab] = useState<"templates" | "library">("templates");
  const [search, setSearch] = useState("");
  const [activeTemplateCategory, setActiveTemplateCategory] =
    useState<TemplateCategory>("All");
  const [activeLibraryCategory, setActiveLibraryCategory] =
    useState<LibraryCategory>("All");
  const [draggingBlueprint, setDraggingBlueprint] = useState<SectionBlueprint | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("Ready");

  const brandKit = useBuilderStore((state) => state.brandKit);
  const addSection = useBuilderStore((state) => state.addSection);
  const replaceCanvasSections = useBuilderStore((state) => state.replaceCanvasSections);
  const updateTheme = useBuilderStore((state) => state.updateTheme);
  const canvasCount = useBuilderStore((state) => state.canvasSections.length);
  const projectName = useBuilderStore((state) => state.projectName);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return templateEntries.filter((template) => {
      const matchesCategory =
        activeTemplateCategory === "All" ||
        template.categories.includes(activeTemplateCategory);
      const haystack = [
        template.title,
        template.description,
        template.categories.join(" "),
        template.kit.name,
        template.kit.tagline,
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || haystack.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeTemplateCategory, search]);

  const filteredGroups = useMemo(() => {
    return libraryGroups.filter(
      (group) => activeLibraryCategory === "All" || group.title === activeLibraryCategory,
    );
  }, [activeLibraryCategory]);

  useEffect(() => {
    if (statusMessage === "Ready") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatusMessage("Ready");
    }, 1400);

    return () => window.clearTimeout(timeout);
  }, [statusMessage]);

  const handleUseTemplate = (kit: SectionKit) => {
    replaceCanvasSections(createCanvasSectionsFromBlueprintIds(kit.sectionIds, brandKit));
    updateTheme(kit.themePatch);
    setStatusMessage(`${kit.name} loaded into workspace`);

    startTransition(() => {
      router.push("/builder/demo-project");
    });
  };

  const handleAddBlueprint = (blueprint: SectionBlueprint) => {
    addSection(blueprint);
    setDraggingBlueprint(null);
    setStatusMessage(`${blueprint.name} added to workspace`);
  };

  const handleDropAdd = (blueprint: SectionBlueprint) => {
    handleAddBlueprint(blueprint);
  };

  const clearSearch = () => setSearch("");

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),transparent_24%),linear-gradient(180deg,#09090B_0%,#050506_100%)] text-white">
      <header className="shrink-0 border-b border-white/10 bg-[#09090B]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                <Blocks className="h-3.5 w-3.5 text-cyan-300" />
                Marketplace split view
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                  Templates on the left. Library on the right.
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500 sm:text-base">
                  Apply a starter stack to the current workspace, then drag or click blocks to build
                  faster with a calmer visual rhythm.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                {projectName}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                {canvasCount} sections
              </span>
              <span className="rounded-full border border-white/10 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                {statusMessage}
              </span>
              <Button
                type="button"
                onClick={() => router.push("/builder/demo-project")}
                className="rounded-full bg-white px-4 py-2.5 text-sm font-black text-black transition hover:bg-zinc-200"
              >
                Open workspace
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileTab("templates")}
              className={cn(
                "rounded-full border px-4 py-2.5 text-sm font-bold transition",
                mobileTab === "templates"
                  ? "border-white/20 bg-white text-black"
                  : "border-white/10 text-zinc-500",
              )}
            >
              Templates
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("library")}
              className={cn(
                "rounded-full border px-4 py-2.5 text-sm font-bold transition",
                mobileTab === "library"
                  ? "border-white/20 bg-white text-black"
                  : "border-white/10 text-zinc-500",
              )}
            >
              Library
            </button>
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1">
        <div className="hidden h-full min-h-0 md:grid md:grid-cols-[35%_65%] lg:grid-cols-[35%_65%]">
          <TemplatePanel
            search={search}
            setSearch={setSearch}
            activeCategory={activeTemplateCategory}
            setActiveCategory={setActiveTemplateCategory}
            filteredTemplates={filteredTemplates}
            onUseTemplate={handleUseTemplate}
            onClearSearch={clearSearch}
          />

          <LibraryPanel
            activeCategory={activeLibraryCategory}
            setActiveCategory={setActiveLibraryCategory}
            filteredGroups={filteredGroups}
            isDragging={Boolean(draggingBlueprint)}
            onAddBlueprint={handleDropAdd}
            onDragStart={(blueprint) => setDraggingBlueprint(blueprint)}
            onDragEnd={() => setDraggingBlueprint(null)}
            workspaceCount={canvasCount}
          />
        </div>

        <div className="h-full min-h-0 md:hidden">
          {mobileTab === "templates" ? (
            <TemplatePanel
              search={search}
              setSearch={setSearch}
              activeCategory={activeTemplateCategory}
              setActiveCategory={setActiveTemplateCategory}
              filteredTemplates={filteredTemplates}
              onUseTemplate={handleUseTemplate}
              onClearSearch={clearSearch}
            />
          ) : (
            <LibraryPanel
              activeCategory={activeLibraryCategory}
              setActiveCategory={setActiveLibraryCategory}
              filteredGroups={filteredGroups}
              isDragging={Boolean(draggingBlueprint)}
              onAddBlueprint={handleDropAdd}
              onDragStart={(blueprint) => setDraggingBlueprint(blueprint)}
              onDragEnd={() => setDraggingBlueprint(null)}
              workspaceCount={canvasCount}
            />
          )}
        </div>
      </div>

      {isPending ? <div className="sr-only">Opening workspace</div> : null}
    </div>
  );
}

export default MarketplaceSplitLayout;
