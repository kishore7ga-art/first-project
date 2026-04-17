"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  Monitor,
  PaintBucket,
  Palette,
  RotateCcw,
  SearchCheck,
  Smartphone,
  Tablet,
  Upload,
  WandSparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BrandKitPanel } from "@/builder/components/BrandKitPanel";
import { LeftPanel } from "@/builder/components/LeftPanel";
import { Canvas } from "@/builder/components/Canvas";
import { BuilderAssistant } from "@/builder/components/BuilderAssistant";
import { SeoPanel } from "@/builder/components/SeoPanel";
import { ThemePanel } from "@/builder/components/ThemePanel";
import {
  buildDraftFromPrompt,
  getMetaFromBrandKit,
  personalizeCanvasSections,
  syncBrandIdentity,
} from "@/builder/contentEngine";
import { analyzeSeo } from "@/builder/seo";
import { getBuilderThemeStyles } from "@/builder/theme";
import type { SectionBlueprint } from "@/builder/types";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";

const previewOptions = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
] as const;

interface BuilderWorkspaceProps {
  initialPrompt?: string;
}

export function BuilderWorkspace({ initialPrompt = "" }: BuilderWorkspaceProps) {
  const router = useRouter();
  const [activeBlueprint, setActiveBlueprint] = useState<SectionBlueprint | null>(null);
  const [activeSectionName, setActiveSectionName] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<"theme" | "brand" | "seo" | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const appliedPromptRef = useRef<string | null>(null);

  const hydrated = useBuilderStore((state) => state.hydrated);
  const projectName = useBuilderStore((state) => state.projectName);
  const previewMode = useBuilderStore((state) => state.previewMode);
  const theme = useBuilderStore((state) => state.theme);
  const brandKit = useBuilderStore((state) => state.brandKit);
  const canvasSections = useBuilderStore((state) => state.canvasSections);
  const lastEditedAt = useBuilderStore((state) => state.lastEditedAt);
  const addSection = useBuilderStore((state) => state.addSection);
  const moveSection = useBuilderStore((state) => state.moveSection);
  const replaceCanvasSections = useBuilderStore((state) => state.replaceCanvasSections);
  const setPreviewMode = useBuilderStore((state) => state.setPreviewMode);
  const setProjectName = useBuilderStore((state) => state.setProjectName);
  const updateTheme = useBuilderStore((state) => state.updateTheme);
  const updateBrandKit = useBuilderStore((state) => state.updateBrandKit);
  const publishProject = useBuilderStore((state) => state.publishProject);
  const resetToStarter = useBuilderStore((state) => state.resetToStarter);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const themeStyles = getBuilderThemeStyles(theme);
  const saveTime = new Date(lastEditedAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const seoReport = analyzeSeo(brandKit, canvasSections);

  useEffect(() => {
    if (!initialPrompt) {
      appliedPromptRef.current = null;
      return;
    }

    if (!hydrated || appliedPromptRef.current === initialPrompt) {
      return;
    }

    appliedPromptRef.current = initialPrompt;

    const draft = buildDraftFromPrompt(initialPrompt, brandKit);
    setProjectName(draft.projectName);
    updateBrandKit(draft.brandKit);
    updateTheme(draft.themePatch);
    replaceCanvasSections(draft.sections);

    startTransition(() => {
      router.replace("/builder");
    });
  }, [
    brandKit,
    hydrated,
    initialPrompt,
    replaceCanvasSections,
    router,
    setProjectName,
    updateBrandKit,
    updateTheme,
  ]);

  const generateContentPass = () => {
    const currentState = useBuilderStore.getState();
    replaceCanvasSections(
      personalizeCanvasSections(currentState.canvasSections, currentState.brandKit),
    );
    updateBrandKit(getMetaFromBrandKit(currentState.brandKit));
  };

  const applyBrandIdentity = () => {
    const currentState = useBuilderStore.getState();
    replaceCanvasSections(
      syncBrandIdentity(currentState.canvasSections, currentState.brandKit),
    );
    updateBrandKit(getMetaFromBrandKit(currentState.brandKit));
  };

  const fixSeoBasics = () => {
    const currentState = useBuilderStore.getState();
    updateBrandKit(getMetaFromBrandKit(currentState.brandKit));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeData = event.active.data.current;
    if (!activeData) {
      return;
    }

    const type = activeData.type;

    if (type === "sidebar-item") {
      setActiveBlueprint(activeData.blueprint as SectionBlueprint);
      return;
    }

    if (type === "canvas-section") {
      const section = activeData.section as { name?: string };
      setActiveSectionName(section.name ?? null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeData = active.data.current;

    setActiveBlueprint(null);
    setActiveSectionName(null);

    if (!over || !activeData) {
      return;
    }

    const isDroppedBelow =
      typeof active.rect.current.translated?.top === "number"
        ? active.rect.current.translated.top > over.rect.top + over.rect.height / 2
        : false;

    if (activeData.type === "sidebar-item") {
      const blueprint = activeData.blueprint as SectionBlueprint;

      if (over.id === "canvas-droppable") {
        addSection(blueprint);
        return;
      }

      const overIndex = canvasSections.findIndex((section) => section.id === over.id);
      if (overIndex === -1) {
        addSection(blueprint);
        return;
      }

      addSection(blueprint, overIndex + (isDroppedBelow ? 1 : 0));
      return;
    }

    if (activeData.type === "canvas-section" && active.id !== over.id) {
      const oldIndex = canvasSections.findIndex((section) => section.id === active.id);
      const overIndex = canvasSections.findIndex((section) => section.id === over.id);

      if (oldIndex === -1 || overIndex === -1) {
        return;
      }

      const newIndex = overIndex + (isDroppedBelow ? 1 : 0) - (oldIndex < overIndex ? 1 : 0);
      moveSection(oldIndex, Math.max(0, Math.min(canvasSections.length - 1, newIndex)));
    }
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#f3f1ea]">
        <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-5 text-sm text-slate-500 shadow-lg">
          Loading your last builder session...
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="builder-theme relative flex min-h-[calc(100dvh-4.5rem)] flex-col xl:flex-row"
        style={themeStyles}
      >
        <LeftPanel />

        <div className="relative flex min-h-[60vh] flex-1 flex-col overflow-hidden xl:min-h-[calc(100dvh-4.5rem)]">
          <header className="border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                <div className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Pro Builder MVP
                </div>
                <input
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  className="w-full max-w-md rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  placeholder="Project name"
                />
                <div className="text-sm text-slate-500">
                  Autosaved locally at <span className="font-medium text-slate-700">{saveTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                  {previewOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setPreviewMode(option.id)}
                        className={cn(
                          "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition",
                          previewMode === option.id
                            ? "bg-slate-900 text-white"
                            : "text-slate-500 hover:bg-slate-100",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setActivePanel("brand")}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <PaintBucket className="h-4 w-4" />
                  Brand kit
                </button>
                <button
                  type="button"
                  onClick={() => setActivePanel("theme")}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <Palette className="h-4 w-4" />
                  Theme
                </button>
                <button
                  type="button"
                  onClick={() => setActivePanel("seo")}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <SearchCheck className="h-4 w-4" />
                  SEO {seoReport.score}
                </button>
                <button
                  type="button"
                  onClick={generateContentPass}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <WandSparkles className="h-4 w-4" />
                  Autofill copy
                </button>
                <button
                  type="button"
                  onClick={() => resetToStarter()}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset starter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const slug = publishProject();
                    router.push(`/published/${slug}`);
                  }}
                  className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  <Upload className="h-4 w-4" />
                  Publish preview
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                {canvasSections.length} sections on canvas
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                {brandKit.companyName} • {brandKit.websiteTopic}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                Tone: {brandKit.brandTone}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                SEO score: {seoReport.score}
              </span>
            </div>
          </header>

          <Canvas />

          <ThemePanel
            open={activePanel === "theme"}
            onClose={() => setActivePanel(null)}
          />
          <BrandKitPanel
            open={activePanel === "brand"}
            onClose={() => setActivePanel(null)}
            onGenerateContent={generateContentPass}
            onApplyIdentity={applyBrandIdentity}
          />
          <SeoPanel
            open={activePanel === "seo"}
            onClose={() => setActivePanel(null)}
            onFixBasics={fixSeoBasics}
          />
          <BuilderAssistant
            open={assistantOpen}
            onClose={() => setAssistantOpen(false)}
          />

          <button
            type="button"
            onClick={() => setAssistantOpen((current) => !current)}
            className="fixed bottom-6 right-6 z-30 flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl transition hover:bg-slate-800"
          >
            <WandSparkles className="h-4 w-4" />
            Builder assistant
          </button>
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
        {activeBlueprint ? (
          <div className="w-72 rounded-[28px] border border-slate-200 bg-white p-4 shadow-2xl">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {activeBlueprint.type}
              </div>
              <div className="mt-2 text-base font-semibold text-slate-900">
                {activeBlueprint.name}
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-500">
                {activeBlueprint.preview.detail}
              </div>
            </div>
          </div>
        ) : activeSectionName ? (
          <div className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-xl">
            Reordering {activeSectionName}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
