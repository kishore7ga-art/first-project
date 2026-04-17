"use client";

import { useState } from "react";
import { LoaderCircle, Search, Sparkles, WandSparkles } from "lucide-react";
import { availableSections, sectionCategoryOrder } from "@/builder/libraryData";
import type { SectionType } from "@/builder/types";
import { requestDraftFromPrompt } from "@/builder/draftApi";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SidebarItem } from "./SidebarItem";
import { cn } from "@/lib/utils";

export function LeftPanel() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<SectionType | "All">("All");
  const [activeStyle, setActiveStyle] = useState<string>("All");
  const [ideaPrompt, setIdeaPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorMessage, setGeneratorMessage] = useState(
    "Describe any style or niche and the builder will remix the full section set into a fresh draft.",
  );

  const brandKit = useBuilderStore((state) => state.brandKit);
  const setProjectName = useBuilderStore((state) => state.setProjectName);
  const updateBrandKit = useBuilderStore((state) => state.updateBrandKit);
  const updateTheme = useBuilderStore((state) => state.updateTheme);
  const replaceCanvasSections = useBuilderStore((state) => state.replaceCanvasSections);

  const styleOptions = [
    "All",
    ...Array.from(
      new Set(
        availableSections.flatMap((section) =>
          section.tags.filter((tag) =>
            ["minimal", "premium", "editorial", "trust", "saas", "bold", "friendly"].includes(
              tag,
            ),
          ),
        ),
      ),
    ),
  ];
  const aiPresets = [
    "Build a bold landing page for a fitness coach with proof and pricing",
    "Create a minimal editorial homepage for a design studio",
    "Make a friendly SaaS site for remote hiring teams",
  ];

  const filteredSections = availableSections.filter((section) => {
    const matchesCategory =
      activeCategory === "All" ? true : section.type === activeCategory;
    const matchesStyle = activeStyle === "All" ? true : section.tags.includes(activeStyle);
    const haystack = `${section.name} ${section.description} ${section.tags.join(" ")}`.toLowerCase();
    const matchesSearch = haystack.includes(search.toLowerCase());

    return matchesCategory && matchesStyle && matchesSearch;
  });

  const runAIMix = async (promptOverride?: string) => {
    const prompt = (promptOverride ?? ideaPrompt).trim();

    if (!prompt || isGenerating) {
      return;
    }

    try {
      setIsGenerating(true);
      setGeneratorMessage("Generating a fresh section mix for your page...");

      const draft = await requestDraftFromPrompt(prompt, brandKit);
      setProjectName(draft.projectName);
      updateBrandKit(draft.brandKit);
      updateTheme(draft.themePatch);
      replaceCanvasSections(draft.sections);
      setIdeaPrompt(prompt);
      setGeneratorMessage(draft.summary);
    } catch (error) {
      console.error(error);
      setGeneratorMessage(
        "The local AI mix could not finish just now. Try a shorter prompt or run it again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <aside className="flex w-full flex-col border-b border-slate-200 bg-[#f8f6f1] xl:h-[calc(100dvh-4.5rem)] xl:w-[400px] xl:min-w-[400px] xl:border-r xl:border-b-0">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Section Library
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Mix blocks with confidence
            </h2>
          </div>
          <div className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm">
            {filteredSections.length} results
          </div>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search sections, styles, or use cases"
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition",
              activeCategory === "All"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-500 shadow-sm hover:bg-slate-100",
            )}
          >
            All
          </button>
          {sectionCategoryOrder.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition",
                activeCategory === category
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-500 shadow-sm hover:bg-slate-100",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {styleOptions.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setActiveStyle(style)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition",
                activeStyle === style
                  ? "bg-slate-200 text-slate-900"
                  : "bg-white text-slate-500 shadow-sm hover:bg-slate-100",
              )}
            >
              {style}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-[28px] border border-slate-900/10 bg-slate-950 text-white shadow-[0_20px_40px_rgba(15,23,42,0.16)]">
          <div className="border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
              <Sparkles className="h-3.5 w-3.5" />
              AI Mix Engine
            </div>
            <p className="mt-2 text-sm leading-6 text-white/70">{generatorMessage}</p>
          </div>

          <div className="space-y-3 px-4 py-4">
            <textarea
              value={ideaPrompt}
              onChange={(event) => setIdeaPrompt(event.target.value)}
              rows={3}
              className="w-full resize-none rounded-[22px] border border-white/10 bg-white/[0.08] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/[0.35] focus:border-white/30 focus:bg-white/[0.12]"
              placeholder="Build a premium website for a real estate agency with trust, comparison pricing, and a minimal footer..."
            />

            <div className="flex flex-wrap gap-2">
              {aiPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setIdeaPrompt(preset);
                    void runAIMix(preset);
                  }}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:bg-white/[0.16]"
                >
                  {preset.includes("fitness")
                    ? "Fitness"
                    : preset.includes("editorial")
                      ? "Editorial"
                      : "SaaS"}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => void runAIMix()}
              disabled={isGenerating || ideaPrompt.trim().length === 0}
              className={cn(
                "w-full rounded-full px-4 py-3 text-sm font-semibold transition",
                isGenerating || ideaPrompt.trim().length === 0
                  ? "cursor-not-allowed bg-white/10 text-white/40"
                  : "bg-white text-slate-950 hover:bg-slate-100",
              )}
            >
              {isGenerating ? (
                <>
                  <LoaderCircle className="mr-2 inline h-4 w-4 animate-spin" />
                  Generating fresh draft...
                </>
              ) : (
                <>
                  <WandSparkles className="mr-2 inline h-4 w-4" />
                  Generate unlimited-style mix
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-5 py-5 xl:flex-1 xl:overflow-y-auto">
        {sectionCategoryOrder.map((category) => {
          if (activeCategory !== "All" && category !== activeCategory) {
            return null;
          }

          const group =
            activeCategory === "All"
              ? filteredSections.filter((section) => section.type === category)
              : filteredSections;

          if (group.length === 0) {
            return null;
          }

          return (
            <section key={category}>
              {activeCategory === "All" && (
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {category}
                  </h3>
                  <span className="text-xs text-slate-400">{group.length}</span>
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                {group.map((blueprint) => (
                  <SidebarItem key={blueprint.id} blueprint={blueprint} />
                ))}
              </div>
            </section>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-sm text-slate-500">
            No sections matched your search. Try a broader term or switch categories.
          </div>
        )}
      </div>
    </aside>
  );
}
