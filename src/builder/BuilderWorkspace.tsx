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
  Blocks,
  ChartNoAxesColumnIncreasing,
  CheckCircle2,
  Clock3,
  Code2,
  Copy,
  Eye,
  Globe2,
  Link2,
  Monitor,
  Menu,
  Palette,
  Redo2,
  Send,
  Smartphone,
  Tablet,
  Undo2,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BrandKitPanel } from "@/builder/components/BrandKitPanel";
import { BuilderAssistant } from "@/builder/components/BuilderAssistant";
import { Canvas } from "@/builder/components/Canvas";
import { LeftPanel } from "@/builder/components/LeftPanel";
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
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/useBuilderStore";

const previewOptions = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
] as const;

interface BuilderWorkspaceProps {
  initialPrompt?: string;
  projectId?: string;
}

interface PublishModalProps {
  open: boolean;
  onClose: () => void;
}

function PublishModal({ open, onClose }: PublishModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"link" | "code" | "domain" | "integrations">(
    "link",
  );
  const [latestSlug, setLatestSlug] = useState("");
  const projectName = useBuilderStore((state) => state.projectName);
  const publishProject = useBuilderStore((state) => state.publishProject);

  if (!open) {
    return null;
  }

  const publish = () => {
    const slug = publishProject();
    setLatestSlug(slug);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#101014] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-600">
              Publish and export
            </div>
            <h2 className="mt-1 text-xl font-black">{projectName}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
            aria-label="Close publish modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-0 md:grid-cols-[190px_1fr]">
          <div className="border-b border-white/10 p-3 md:border-b-0 md:border-r">
            {(
              [
                { id: "link", label: "Publish to link", icon: Globe2 },
                { id: "code", label: "Export code", icon: Code2 },
                { id: "domain", label: "Custom domain", icon: Link2 },
                { id: "integrations", label: "Integrations", icon: Send },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-bold transition",
                    activeTab === tab.id
                      ? "bg-white text-black"
                      : "text-zinc-500 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="min-h-[340px] p-6">
            {activeTab === "link" ? (
              <div>
                <h3 className="text-lg font-black">Publish to a shareable link</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  This MVP stores published previews in the browser. A Supabase/Vercel
                  publish target can replace this without changing the builder flow.
                </p>
                <div className="mt-5 rounded-lg border border-white/10 bg-black/30 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                    Live URL
                  </div>
                  <div className="mt-2 break-all text-sm text-zinc-300">
                    {latestSlug
                      ? `${typeof window !== "undefined" ? window.location.origin : ""}/published/${latestSlug}`
                      : "Publish once to generate a preview URL."}
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={publish}
                    className="rounded-lg bg-white px-4 py-3 text-sm font-black text-black"
                  >
                    Republish
                  </button>
                  {latestSlug ? (
                    <button
                      type="button"
                      onClick={() => router.push(`/published/${latestSlug}`)}
                      className="rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/5"
                    >
                      Open link
                    </button>
                  ) : null}
                </div>
                <div className="mt-5 grid gap-3 text-sm text-zinc-400 sm:grid-cols-2">
                  <label className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                    Password protect
                    <input type="checkbox" className="h-4 w-4 accent-cyan-300" />
                  </label>
                  <label className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                    Built with badge
                    <input type="checkbox" className="h-4 w-4 accent-cyan-300" defaultChecked />
                  </label>
                </div>
              </div>
            ) : null}

            {activeTab === "code" ? (
              <div>
                <h3 className="text-lg font-black">Export clean code</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  The export action is scaffolded for React + Tailwind and static HTML
                  bundles. The UI is ready for a ZIP generation route.
                </p>
                <div className="mt-5 grid gap-3">
                  {["React + Tailwind ZIP", "HTML + CSS ZIP"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-bold text-white hover:bg-white/[0.06]"
                    >
                      {item}
                      <Copy className="h-4 w-4 text-zinc-500" />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === "domain" ? (
              <div>
                <h3 className="text-lg font-black">Custom domain</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Pro teams can point a CNAME at the platform publish host and verify DNS.
                </p>
                <input
                  className="mt-5 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none"
                  placeholder="www.example.com"
                />
                <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
                  CNAME: `sites.sections.app`
                </div>
              </div>
            ) : null}

            {activeTab === "integrations" ? (
              <div>
                <h3 className="text-lg font-black">Analytics integrations</h3>
                <div className="mt-5 grid gap-4">
                  {["Google Analytics GA4 ID", "Meta Pixel ID", "Hotjar Site ID"].map((label) => (
                    <label key={label} className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                        {label}
                      </span>
                      <input className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function VersionPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lastEditedAt = useBuilderStore((state) => state.lastEditedAt);
  const history = useBuilderStore((state) => state.history);
  const undo = useBuilderStore((state) => state.undo);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-40 flex justify-end bg-black/30 transition",
        open ? "opacity-100" : "opacity-0",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={onClose}
        className={cn("absolute inset-0", open ? "pointer-events-auto" : "pointer-events-none")}
        aria-label="Close version history"
      />
      <aside
        className={cn(
          "pointer-events-auto relative h-full w-[280px] border-l border-white/10 bg-zinc-950 p-4 shadow-2xl transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-600">
              Versions
            </div>
            <h3 className="mt-1 text-lg font-black text-white">History</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
            aria-label="Close version history"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="h-20 rounded-md bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.25),transparent_35%),#111]" />
            <div className="mt-3 text-sm font-bold text-white">Current autosave</div>
            <div className="mt-1 text-xs text-zinc-500">
              {new Date(lastEditedAt).toLocaleString()}
            </div>
          </div>
          {history.slice(-9).reverse().map((version, index) => (
            <div key={`${version.lastEditedAt}-${index}`} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="h-14 rounded-md bg-zinc-900" />
              <div className="mt-2 text-sm font-bold text-white">
                Before change {history.length - index}
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                {new Date(version.lastEditedAt).toLocaleString()}
              </div>
              {index === 0 ? (
                <button
                  type="button"
                  onClick={undo}
                  className="mt-3 w-full rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-white/5"
                >
                  Restore previous
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export function BuilderWorkspace({
  initialPrompt = "",
  projectId = "demo-project",
}: BuilderWorkspaceProps) {
  const router = useRouter();
  const [activeBlueprint, setActiveBlueprint] = useState<SectionBlueprint | null>(null);
  const [activeSectionName, setActiveSectionName] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<"theme" | "brand" | "seo" | "versions" | null>(
    null,
  );
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const appliedPromptRef = useRef<string | null>(null);

  const hydrated = useBuilderStore((state) => state.hydrated);
  const projectName = useBuilderStore((state) => state.projectName);
  const previewMode = useBuilderStore((state) => state.previewMode);
  const theme = useBuilderStore((state) => state.theme);
  const brandKit = useBuilderStore((state) => state.brandKit);
  const canvasSections = useBuilderStore((state) => state.canvasSections);
  const lastEditedAt = useBuilderStore((state) => state.lastEditedAt);
  const history = useBuilderStore((state) => state.history);
  const future = useBuilderStore((state) => state.future);
  const addSection = useBuilderStore((state) => state.addSection);
  const moveSection = useBuilderStore((state) => state.moveSection);
  const replaceCanvasSections = useBuilderStore((state) => state.replaceCanvasSections);
  const setPreviewMode = useBuilderStore((state) => state.setPreviewMode);
  const setProjectName = useBuilderStore((state) => state.setProjectName);
  const updateTheme = useBuilderStore((state) => state.updateTheme);
  const updateBrandKit = useBuilderStore((state) => state.updateBrandKit);
  const publishProject = useBuilderStore((state) => state.publishProject);
  const resetToStarter = useBuilderStore((state) => state.resetToStarter);
  const undo = useBuilderStore((state) => state.undo);
  const redo = useBuilderStore((state) => state.redo);

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
  const currentPreviewOption = previewOptions.find((option) => option.id === previewMode) ?? previewOptions[0];

  const cyclePreviewMode = () => {
    const currentIndex = previewOptions.findIndex((option) => option.id === previewMode);
    const nextOption = previewOptions[(currentIndex + 1) % previewOptions.length];
    setPreviewMode(nextOption.id);
  };

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
      router.replace(`/builder/${projectId}`);
    });
  }, [
    brandKit,
    hydrated,
    initialPrompt,
    projectId,
    replaceCanvasSections,
    router,
    setProjectName,
    updateBrandKit,
    updateTheme,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifier = event.ctrlKey || event.metaKey;

      if (!isModifier) {
        return;
      }

      if (event.key.toLowerCase() === "z") {
        event.preventDefault();
        undo();
      }

      if (event.key.toLowerCase() === "y") {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [redo, undo]);

  const generateContentPass = () => {
    const currentState = useBuilderStore.getState();
    replaceCanvasSections(
      personalizeCanvasSections(currentState.canvasSections, currentState.brandKit),
    );
    updateBrandKit(getMetaFromBrandKit(currentState.brandKit));
  };

  const applyBrandIdentity = () => {
    const currentState = useBuilderStore.getState();
    replaceCanvasSections(syncBrandIdentity(currentState.canvasSections, currentState.brandKit));
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

    if (activeData.type === "sidebar-item") {
      setActiveBlueprint(activeData.blueprint as SectionBlueprint);
      return;
    }

    if (activeData.type === "canvas-section") {
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
      <div className="flex h-dvh items-center justify-center bg-[#09090B] text-white">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-sm text-zinc-400">
          Loading your last builder session...
        </div>
      </div>
    );
  }

  const seoBadge =
    seoReport.score >= 70
      ? "bg-emerald-400 text-black"
      : seoReport.score >= 40
        ? "bg-amber-300 text-black"
        : "bg-rose-500 text-white";

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="relative h-dvh overflow-hidden bg-[#0A0A0A] text-white">
        <header className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between border-b border-white/[0.08] bg-[#0A0A0A] px-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setLibraryOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:bg-white/[0.06] lg:hidden"
              aria-label="Open section library"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
              <Blocks className="h-4 w-4" />
            </div>
            <div className="hidden font-black sm:block">Sections</div>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 px-2 sm:gap-3 sm:px-4">
            <input
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              className="min-w-0 max-w-[118px] rounded-lg border border-transparent bg-transparent px-2 py-2 text-center text-[11px] font-bold text-zinc-200 outline-none transition hover:border-white/10 hover:bg-white/[0.03] focus:border-cyan-300/40 focus:bg-white/[0.05] sm:max-w-[280px] sm:px-3 sm:text-sm"
              aria-label="Project name"
            />
            <div className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1 md:flex">
              {previewOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPreviewMode(option.id)}
                    title={option.label}
                    className={cn(
                      "rounded-md p-2 transition",
                      previewMode === option.id
                        ? "bg-white text-black"
                        : "text-zinc-500 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={cyclePreviewMode}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-[11px] font-bold text-zinc-300 transition hover:bg-white/[0.06] md:hidden"
              aria-label={`Preview mode ${currentPreviewOption.label}`}
              title={`Preview mode: ${currentPreviewOption.label}`}
            >
              {(() => {
                const Icon = currentPreviewOption.icon;
                return <Icon className="h-4 w-4" />;
              })()}
              <span className="hidden sm:inline">{currentPreviewOption.label}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={undo}
              disabled={history.length === 0}
              title="Undo"
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:p-2.5"
            >
              <Undo2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={future.length === 0}
              title="Redo"
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:p-2.5"
            >
              <Redo2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActivePanel("versions")}
              title="Version history"
              className="hidden rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              <Clock3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActivePanel("seo")}
              title="SEO"
              className="relative hidden rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              <ChartNoAxesColumnIncreasing className="h-4 w-4" />
              <span
                className={cn(
                  "absolute -right-1 -top-1 rounded-full px-1.5 py-0.5 text-[10px] font-black leading-none",
                  seoBadge,
                )}
              >
                {seoReport.score}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActivePanel("theme")}
              title="Theme"
              className="hidden rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              <Palette className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                const slug = publishProject();
                router.push(`/published/${slug}`);
              }}
              className="hidden rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-zinc-300 transition hover:bg-white/5 hover:text-white lg:inline-flex"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setPublishOpen(true)}
              className="inline-flex items-center rounded-lg bg-cyan-300 px-2 py-2 text-xs font-black text-black transition hover:bg-cyan-200 sm:px-3 sm:text-sm"
              aria-label="Publish project"
            >
              <Upload className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Publish</span>
            </button>
            <div className="hidden items-center -space-x-2 pl-2 lg:flex">
              {["K", "A", "M"].map((initial, index) => (
                <span
                  key={initial}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0A0A0A] text-xs font-black text-white"
                  style={{ backgroundColor: ["#7C3AED", "#06B6D4", "#F97316"][index] }}
                >
                  {initial}
                </span>
              ))}
            </div>
            <div className="hidden items-center gap-1 rounded-full px-2 text-xs font-bold text-emerald-300 lg:flex">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Saved {saveTime}
            </div>
          </div>
        </header>

        <div
          className="grid h-dvh grid-cols-1 pt-[60px] lg:grid-cols-[600px_minmax(0,1fr)]"
          style={themeStyles}
        >
          <LeftPanel mobileOpen={libraryOpen} onMobileClose={() => setLibraryOpen(false)} />
          <div className="relative min-h-0 overflow-hidden">
            <Canvas onOpenLibrary={() => setLibraryOpen(true)} />
            <ThemePanel open={activePanel === "theme"} onClose={() => setActivePanel(null)} />
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
            <VersionPanel
              open={activePanel === "versions"}
              onClose={() => setActivePanel(null)}
            />
            <BuilderAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />

            <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLibraryOpen(true)}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/15 bg-white text-black shadow-2xl transition hover:bg-zinc-200 lg:hidden"
                aria-label="Open sections library"
              >
                <Blocks className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("brand")}
                className="hidden rounded-full border border-white/10 bg-zinc-900 px-4 py-3 text-sm font-bold text-zinc-300 shadow-2xl transition hover:bg-zinc-800 hover:text-white sm:inline-flex"
              >
                Brand kit
              </button>
              <button
                type="button"
                onClick={() => setAssistantOpen((current) => !current)}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-white shadow-2xl transition hover:bg-zinc-800"
                aria-label="Open AI assistant"
              >
                <WandSparkles className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => resetToStarter()}
          className="fixed bottom-5 left-5 z-30 hidden rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-bold text-zinc-500 backdrop-blur transition hover:text-white lg:block"
        >
          Reset starter
        </button>
      </div>

      <PublishModal open={publishOpen} onClose={() => setPublishOpen(false)} />

      <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
        {activeBlueprint ? (
          <div className="h-[90px] w-[138px] rounded-lg border border-cyan-300/40 bg-[#1A1A1A] opacity-70 shadow-2xl">
            <div className="p-3 text-xs font-black text-white">{activeBlueprint.name}</div>
          </div>
        ) : activeSectionName ? (
          <div className="rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm font-bold text-white shadow-xl">
            Reordering {activeSectionName}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
