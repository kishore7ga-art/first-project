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
    <article className="template-card group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 hover:border-indigo-500/30 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
        <div className="pointer-events-none h-full w-full opacity-80 group-hover:opacity-100 transition-opacity">
          <SectionReferencePreview blueprint={previewBlueprint} />
        </div>

        <div className="absolute right-3 top-3 z-10 rounded-lg bg-indigo-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-indigo-500/20">
          {kit.access === "free" ? "FREE" : kit.priceLabel}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-black text-white tracking-tight truncate">{kit.name}</h3>
            <p className="mt-1 text-xs leading-5 text-zinc-500 line-clamp-2">
              {kit.description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            {kit.sectionIds.length} blocks
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white/[0.03]">{kit.access}</span>
        </div>

        <button
          type="button"
          onClick={() => onUseTemplate(kit)}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-black transition-all hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98]"
        >
          Use Template
          <ArrowRight className="h-4 w-4" />
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
    <div className="flex-shrink-0 border-b border-white/5 bg-[#0F0F0F]/50 px-4 py-5 space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search blocks..."
          className="h-11 w-full rounded-xl border border-white/5 bg-zinc-900/50 pl-10 pr-10 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-indigo-500/30 focus:bg-zinc-900 focus:ring-1 focus:ring-indigo-500/20"
        />
        {search ? (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-500 hover:bg-white/5 hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Category</span>
          <span className="text-[10px] font-bold text-indigo-400">{activeCategory}</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mask-fade-right">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all",
                activeCategory === category
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/[0.03] text-zinc-500 border border-white/5 hover:bg-white/[0.06] hover:text-zinc-300",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Style</span>
          <span className="text-[10px] font-bold text-indigo-400">{activeStyle}</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mask-fade-right">
          {styles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setActiveStyle(style)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all",
                activeStyle === style
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/[0.03] text-zinc-500 border border-white/5 hover:bg-white/[0.06] hover:text-zinc-300",
              )}
            >
              {style}
            </button>
          ))}
        </div>
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
  const [activeView, setActiveView] = useState<"templates" | "sections">("templates");
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
      <aside className="hidden h-[calc(100dvh-60px)] w-full min-w-0 flex-col overflow-hidden border-r border-white/[0.06] bg-[#0A0A0A] lg:flex">
        <div className="flex flex-shrink-0 border-b border-white/10 bg-[#0F0F0F]">
          <button
            onClick={() => setActiveView("templates")}
            className={cn(
              "flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all",
              activeView === "templates" 
                ? "bg-white/5 text-white border-b-2 border-indigo-500" 
                : "text-zinc-600 hover:text-zinc-400"
            )}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveView("sections")}
            className={cn(
              "flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all",
              activeView === "sections" 
                ? "bg-white/5 text-white border-b-2 border-indigo-500" 
                : "text-zinc-600 hover:text-zinc-400"
            )}
          >
            Sections
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          {activeView === "templates" ? (
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
            />
          )}
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
