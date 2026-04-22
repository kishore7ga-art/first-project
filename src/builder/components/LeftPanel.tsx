"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { availableSections, sectionBlueprintMap, sectionKits } from "@/builder/libraryData";
import { createCanvasSectionsFromBlueprintIds } from "@/builder/contentEngine";
import type { SectionBlueprint, SectionKit } from "@/builder/types";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SidebarItem } from "./SidebarItem";
import { SectionReferencePreview } from "./SectionReferencePreview";

const categories = [
  "All",
  "Heroes",
  "Navbars",
  "Features",
  "Pricing",
  "Testimonials",
  "CTA",
  "FAQ",
  "Footer",
  "Team",
  "Blog",
  "Contact",
  "Stats",
  "Logos",
  "Gallery",
  "Timeline",
  "Backgrounds",
  "Animations",
  "Effects",
  "Banners",
] as const;

const styles = [
  "All",
  "Dark",
  "Light",
  "Gradient",
  "Minimal",
  "Bold",
  "Colorful",
  "Terminal",
  "Gold",
  "Glassmorphism",
] as const;

const mobileTabs = [
  { id: "templates", label: "Templates" },
  { id: "sections", label: "Sections" },
] as const;

function normalizeCategory(category: string) {
  if (category === "Heroes") return "Hero";
  if (category === "Navbars") return "Navbar";
  return category.replace(/s$/, "");
}

function normalizeStyle(style: string) {
  return style.toLowerCase();
}

function TemplateCard({
  kit,
  onUseTemplate,
}: {
  kit: SectionKit;
  onUseTemplate: (kit: SectionKit) => void;
}) {
  const previewBlueprint = sectionBlueprintMap[kit.sectionIds[0]] ?? availableSections[0]!;

  return (
    <article className="template-card group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900 hover:border-white/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        <div className="pointer-events-none absolute left-0 top-0 h-[820px] w-[1280px] origin-top-left scale-[0.19] 2xl:scale-[0.205]">
          <SectionReferencePreview blueprint={previewBlueprint} />
        </div>

        <div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          {kit.access === "free" ? "FREE" : kit.priceLabel}
        </div>
      </div>

      <div className="p-3 2xl:p-4">
        <h3 className="text-sm font-semibold text-white">{kit.name}</h3>
        <p className="mt-1 max-h-10 overflow-hidden text-xs leading-5 text-white/50">
          {kit.description}
        </p>

        <div className="mt-3 flex items-center justify-between text-[11px] text-white/45">
          <span>{kit.sectionIds.length} sections</span>
          <span className="uppercase tracking-[0.18em]">{kit.access}</span>
        </div>

        <button
          type="button"
          onClick={() => onUseTemplate(kit)}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
        >
          Use template
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}

function TemplatesPanel({
  onUseTemplate,
  showHeader = true,
}: {
  onUseTemplate: (kit: SectionKit) => void;
  showHeader?: boolean;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {showHeader ? (
        <div className="flex-shrink-0 border-b border-white/10 px-4 py-3">
          <h2 className="text-xs font-semibold tracking-wider text-white/60">TEMPLATES</h2>
        </div>
      ) : null}

      <div className="scrollable-column flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3 2xl:space-y-4">
        {sectionKits.map((kit) => (
          <TemplateCard key={kit.id} kit={kit} onUseTemplate={onUseTemplate} />
        ))}
      </div>
    </div>
  );
}

function SectionFilters({
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
  activeStyle,
  setActiveStyle,
}: {
  search: string;
  setSearch: (value: string) => void;
  activeCategory: (typeof categories)[number];
  setActiveCategory: (value: (typeof categories)[number]) => void;
  activeStyle: (typeof styles)[number];
  setActiveStyle: (value: (typeof styles)[number]) => void;
}) {
  return (
    <div className="flex-shrink-0 border-b border-white/10 px-4 py-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#555]" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search sections..."
          className="h-10 w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] pl-9 pr-9 text-sm text-white outline-none placeholder:text-[#555] focus:border-white/20"
        />
        {search ? (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#555] hover:bg-white/5 hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="mt-3 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition",
              activeCategory === category
                ? "bg-white text-black"
                : "bg-transparent text-zinc-500 hover:text-zinc-200",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-[#555]">
          Style:
        </span>
        {styles.map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => setActiveStyle(style)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition",
              activeStyle === style
                ? "bg-white text-black"
                : "bg-transparent text-zinc-500 hover:text-zinc-200",
            )}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionGrid({
  filteredSections,
  compact = false,
  onPreview,
}: {
  filteredSections: SectionBlueprint[];
  compact?: boolean;
  onPreview: (blueprint: SectionBlueprint) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 2xl:gap-4">
      {filteredSections.map((blueprint) => (
        <SidebarItem
          key={blueprint.id}
          blueprint={blueprint}
          compact={compact}
          onPreview={() => onPreview(blueprint)}
        />
      ))}
    </div>
  );
}

function SectionsPanel({
  filteredSections,
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
  activeStyle,
  setActiveStyle,
  onPreview,
  showHeader = true,
  compactCards = false,
}: {
  filteredSections: SectionBlueprint[];
  search: string;
  setSearch: (value: string) => void;
  activeCategory: (typeof categories)[number];
  setActiveCategory: (value: (typeof categories)[number]) => void;
  activeStyle: (typeof styles)[number];
  setActiveStyle: (value: (typeof styles)[number]) => void;
  onPreview: (blueprint: SectionBlueprint) => void;
  showHeader?: boolean;
  compactCards?: boolean;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {showHeader ? (
        <div className="flex-shrink-0 border-b border-white/10 px-4 py-3">
          <h2 className="text-xs font-semibold tracking-wider text-white/60">
            SECTIONS LIBRARY
          </h2>
        </div>
      ) : null}

      <SectionFilters
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeStyle={activeStyle}
        setActiveStyle={setActiveStyle}
      />

      <div className="flex-shrink-0 px-4 py-2">
        <p className="text-xs font-semibold tracking-wider text-white/40">
          {filteredSections.length} SECTIONS FOUND
        </p>
      </div>

      <div className="scrollable-column flex-1 min-h-0 overflow-y-auto px-4 pb-4">
        <SectionGrid
          filteredSections={filteredSections}
          compact={compactCards}
          onPreview={onPreview}
        />

        {filteredSections.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-white/10 p-5 text-center text-sm leading-6 text-zinc-600">
            No sections matched. Clear filters or search another style.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PreviewModal({
  blueprint,
  onClose,
}: {
  blueprint: SectionBlueprint | null;
  onClose: () => void;
}) {
  if (!blueprint) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-600">
              Fullscreen preview
            </div>
            <h2 className="mt-1 text-lg font-black text-white">{blueprint.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="bg-[#F4F4F5] p-8">
          <div className="mx-auto max-w-4xl overflow-hidden bg-white shadow-[0_0_60px_rgba(0,0,0,0.16)]">
            <SectionReferencePreview blueprint={blueprint} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface LeftPanelProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function LeftPanel({ mobileOpen = false, onMobileClose }: LeftPanelProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [activeStyle, setActiveStyle] = useState<(typeof styles)[number]>("All");
  const [previewBlueprint, setPreviewBlueprint] = useState<SectionBlueprint | null>(null);
  const activeTab = useBuilderStore((state) => state.activeTab);
  const brandKit = useBuilderStore((state) => state.brandKit);
  const replaceCanvasSections = useBuilderStore((state) => state.replaceCanvasSections);
  const updateTheme = useBuilderStore((state) => state.updateTheme);
  const setActiveTab = useBuilderStore((state) => state.setActiveTab);

  const filteredSections = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();
    const category = normalizeCategory(activeCategory);
    const style = normalizeStyle(activeStyle);

    return availableSections.filter((section) => {
      const matchesCategory = activeCategory === "All" || section.type === category;
      const matchesStyle =
        activeStyle === "All" ||
        section.marketplace.styles.some((candidate) => candidate === style);
      const haystack = [
        section.name,
        section.description,
        section.type,
        section.tags.join(" "),
        section.marketplace.styles.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);

      return matchesCategory && matchesStyle && matchesSearch;
    });
  }, [activeCategory, activeStyle, search]);

  const applyTemplate = (kit: SectionKit) => {
    replaceCanvasSections(createCanvasSectionsFromBlueprintIds(kit.sectionIds, brandKit));
    updateTheme(kit.themePatch);
    onMobileClose?.();
  };

  return (
    <>
      <aside className="hidden h-[calc(100dvh-60px)] w-[600px] min-w-[600px] flex-col overflow-hidden border-r border-white/[0.06] bg-[#111111] lg:flex">
        <div className="flex h-full w-full">
          <div className="w-1/2 min-w-0 overflow-hidden border-r border-white/10">
            <TemplatesPanel onUseTemplate={applyTemplate} />
          </div>

          <div className="w-1/2 min-w-0 overflow-hidden">
            <SectionsPanel
              filteredSections={filteredSections}
              search={search}
              setSearch={setSearch}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeStyle={activeStyle}
              setActiveStyle={setActiveStyle}
              onPreview={(blueprint) => setPreviewBlueprint(blueprint)}
            />
          </div>
        </div>
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-[65] lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          onClick={onMobileClose}
          className={cn(
            "absolute inset-0 bg-black/60 transition",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close section library"
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-[78dvh] overflow-hidden rounded-t-[28px] border-t border-white/10 bg-[#111111] shadow-[0_-24px_80px_rgba(0,0,0,0.45)] transition-transform",
            mobileOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-600">
                  Section library
                </div>
                <div className="mt-1 text-sm text-zinc-400">Browse templates or sections</div>
              </div>
              <button
                type="button"
                onClick={onMobileClose}
                className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
                aria-label="Close library drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex border-b border-white/10">
              {mobileTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 py-3 text-sm font-semibold transition-colors",
                    activeTab === tab.id
                      ? "border-b-2 border-white text-white"
                      : "text-white/50",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-0 flex-1 overflow-hidden">
              {activeTab === "templates" ? (
                <TemplatesPanel onUseTemplate={applyTemplate} showHeader={false} />
              ) : (
                <SectionsPanel
                  filteredSections={filteredSections}
                  search={search}
                  setSearch={setSearch}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  activeStyle={activeStyle}
                  setActiveStyle={setActiveStyle}
                  onPreview={(blueprint) => setPreviewBlueprint(blueprint)}
                  showHeader={false}
                  compactCards
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <PreviewModal blueprint={previewBlueprint} onClose={() => setPreviewBlueprint(null)} />
    </>
  );
}
