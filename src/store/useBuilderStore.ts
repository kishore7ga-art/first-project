"use client";

import { create, type StoreApi } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import {
  sectionBlueprintMap,
  starterBlueprintIds,
} from "@/builder/libraryData";
import type {
  BrandKit,
  CanvasSection,
  PreviewMode,
  PublishedProject,
  SectionBlueprint,
  ThemeSettings,
} from "@/builder/types";

interface BuilderState {
  hydrated: boolean;
  projectName: string;
  previewMode: PreviewMode;
  canvasSections: CanvasSection[];
  theme: ThemeSettings;
  brandKit: BrandKit;
  lastEditedAt: string;
  publishedProjects: Record<string, PublishedProject>;
  addSection: (blueprint: SectionBlueprint, index?: number) => void;
  duplicateSection: (id: string) => void;
  removeSection: (id: string) => void;
  moveSection: (oldIndex: number, newIndex: number) => void;
  moveSectionByStep: (id: string, direction: -1 | 1) => void;
  replaceCanvasSections: (sections: CanvasSection[]) => void;
  updateSectionData: (id: string, partialData: Record<string, unknown>) => void;
  updateTheme: (partialTheme: Partial<ThemeSettings>) => void;
  updateBrandKit: (partialBrandKit: Partial<BrandKit>) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setProjectName: (name: string) => void;
  clearCanvas: () => void;
  resetToStarter: () => void;
  publishProject: () => string;
}

type PersistedBuilderState = Pick<
  BuilderState,
  | "projectName"
  | "previewMode"
  | "canvasSections"
  | "theme"
  | "brandKit"
  | "lastEditedAt"
  | "publishedProjects"
>;

let builderStoreApi: StoreApi<BuilderState> | null = null;

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createCanvasSection(blueprint: SectionBlueprint): CanvasSection {
  return {
    id: uuidv4(),
    blueprintId: blueprint.id,
    type: blueprint.type,
    name: blueprint.name,
    data: deepClone(blueprint.defaultData),
  };
}

function createStarterSections() {
  return starterBlueprintIds
    .map((id) => sectionBlueprintMap[id])
    .filter(Boolean)
    .map((blueprint) => createCanvasSection(blueprint));
}

function touchState() {
  return new Date().toISOString();
}

function slugifyProjectName(projectName: string) {
  return projectName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";
}

const defaultTheme: ThemeSettings = {
  primaryColor: "#2563eb",
  secondaryColor: "#14b8a6",
  fontPairId: "studio-sans",
  borderRadius: "md",
  spacing: "normal",
  mode: "light",
};

const defaultBrandKit: BrandKit = {
  companyName: "Northstar",
  logoUrl: "",
  websiteTopic: "AI website builder",
  audience: "modern product teams",
  uniqueValue: "turn ideas into polished launch pages without slowing engineering down",
  ctaLabel: "Start free",
  brandTone: "professional",
  metaTitle: "Northstar | AI website builder for modern product teams",
  metaDescription:
    "Build polished landing pages with reusable sections, live previews, fast editing, and a design system that stays cohesive from first draft to publish.",
};

const initialCanvasSections = createStarterSections();
const builderStorageKey = "northstar-builder";
const builderStorage = createJSONStorage<PersistedBuilderState>(() => localStorage);

const initialState = {
  hydrated: false,
  projectName: "Spring launch page",
  previewMode: "desktop" as PreviewMode,
  canvasSections: initialCanvasSections,
  theme: defaultTheme,
  brandKit: defaultBrandKit,
  lastEditedAt: touchState(),
  publishedProjects: {} as Record<string, PublishedProject>,
};

function getHydratedCanvasSections(
  state?: Pick<BuilderState, "canvasSections">,
): CanvasSection[] {
  if (!Array.isArray(state?.canvasSections)) {
    return createStarterSections();
  }

  const validSections = state.canvasSections.filter((section) => {
    if (!section || typeof section !== "object") {
      return false;
    }

    return (
      typeof section.id === "string" &&
      typeof section.blueprintId === "string" &&
      Boolean(sectionBlueprintMap[section.blueprintId])
    );
  });

  return validSections.length > 0 ? deepClone(validSections) : createStarterSections();
}

function getHydratedTheme(state?: Pick<BuilderState, "theme">): ThemeSettings {
  return {
    ...defaultTheme,
    ...(state?.theme ?? {}),
  };
}

function getHydratedBrandKit(state?: Pick<BuilderState, "brandKit">): BrandKit {
  return {
    ...defaultBrandKit,
    ...(state?.brandKit ?? {}),
  };
}

function getHydratedPublishedProjects(
  state?: Pick<BuilderState, "publishedProjects">,
): Record<string, PublishedProject> {
  const projects = state?.publishedProjects ?? {};

  return Object.fromEntries(
    Object.entries(projects).map(([slug, project]) => [
      slug,
      {
        ...project,
        theme: {
          ...defaultTheme,
          ...project.theme,
        },
        brandKit: {
          ...defaultBrandKit,
          ...project.brandKit,
        },
      },
    ]),
  );
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, _get, api) => {
      builderStoreApi = api;

      return {
        ...initialState,

        addSection: (blueprint, index) =>
          set((state) => {
            const nextSections = [...state.canvasSections];
            const nextSection = createCanvasSection(blueprint);

            if (typeof index === "number" && index >= 0) {
              nextSections.splice(index, 0, nextSection);
            } else {
              nextSections.push(nextSection);
            }

            return {
              canvasSections: nextSections,
              lastEditedAt: touchState(),
            };
          }),

        duplicateSection: (id) =>
          set((state) => {
            const index = state.canvasSections.findIndex((section) => section.id === id);
            if (index === -1) {
              return state;
            }

            const duplicate = deepClone(state.canvasSections[index]);
            duplicate.id = uuidv4();
            const nextSections = [...state.canvasSections];
            nextSections.splice(index + 1, 0, duplicate);

            return {
              canvasSections: nextSections,
              lastEditedAt: touchState(),
            };
          }),

        removeSection: (id) =>
          set((state) => ({
            canvasSections: state.canvasSections.filter((section) => section.id !== id),
            lastEditedAt: touchState(),
          })),

        moveSection: (oldIndex, newIndex) =>
          set((state) => {
            if (
              oldIndex < 0 ||
              newIndex < 0 ||
              oldIndex >= state.canvasSections.length ||
              newIndex >= state.canvasSections.length
            ) {
              return state;
            }

            const nextSections = [...state.canvasSections];
            const [moved] = nextSections.splice(oldIndex, 1);
            nextSections.splice(newIndex, 0, moved);

            return {
              canvasSections: nextSections,
              lastEditedAt: touchState(),
            };
          }),

        moveSectionByStep: (id, direction) =>
          set((state) => {
            const index = state.canvasSections.findIndex((section) => section.id === id);
            const targetIndex = index + direction;

            if (
              index === -1 ||
              targetIndex < 0 ||
              targetIndex >= state.canvasSections.length
            ) {
              return state;
            }

            const nextSections = [...state.canvasSections];
            const [moved] = nextSections.splice(index, 1);
            nextSections.splice(targetIndex, 0, moved);

            return {
              canvasSections: nextSections,
              lastEditedAt: touchState(),
            };
          }),

        replaceCanvasSections: (sections) =>
          set({
            canvasSections: deepClone(sections),
            lastEditedAt: touchState(),
          }),

        updateSectionData: (id, partialData) =>
          set((state) => ({
            canvasSections: state.canvasSections.map((section) =>
              section.id === id
                ? { ...section, data: { ...section.data, ...deepClone(partialData) } }
                : section,
            ),
            lastEditedAt: touchState(),
          })),

        updateTheme: (partialTheme) =>
          set((state) => ({
            theme: { ...state.theme, ...partialTheme },
            lastEditedAt: touchState(),
          })),

        updateBrandKit: (partialBrandKit) =>
          set((state) => ({
            brandKit: { ...state.brandKit, ...partialBrandKit },
            lastEditedAt: touchState(),
          })),

        setPreviewMode: (mode) => set({ previewMode: mode }),

        setProjectName: (name) =>
          set({
            projectName: name || "Untitled project",
            lastEditedAt: touchState(),
          }),

        clearCanvas: () =>
          set({
            canvasSections: [],
            lastEditedAt: touchState(),
          }),

        resetToStarter: () =>
          set({
            canvasSections: createStarterSections(),
            theme: defaultTheme,
            brandKit: defaultBrandKit,
            previewMode: "desktop",
            projectName: "Spring launch page",
            lastEditedAt: touchState(),
          }),

        publishProject: () => {
          let slug = "";

          set((state) => {
            slug = `${slugifyProjectName(state.projectName)}-${Math.random()
              .toString(36)
              .slice(2, 8)}`;

            const snapshot: PublishedProject = {
              slug,
              projectName: state.projectName,
              sections: deepClone(state.canvasSections),
              theme: deepClone(state.theme),
              brandKit: deepClone(state.brandKit),
              publishedAt: touchState(),
            };

            return {
              publishedProjects: {
                ...state.publishedProjects,
                [slug]: snapshot,
              },
              lastEditedAt: touchState(),
            };
          });

          return slug;
        },
      };
    },
    {
      name: builderStorageKey,
      storage: builderStorage,
      partialize: (state) => ({
        projectName: state.projectName,
        previewMode: state.previewMode,
        canvasSections: state.canvasSections,
        theme: state.theme,
        brandKit: state.brandKit,
        lastEditedAt: state.lastEditedAt,
        publishedProjects: state.publishedProjects,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn(
            "Builder session could not be restored. Starting with a fresh draft.",
            error,
          );
          builderStorage?.removeItem(builderStorageKey);
        }

        builderStoreApi?.setState({
          hydrated: true,
          canvasSections: getHydratedCanvasSections(state),
          theme: getHydratedTheme(state),
          brandKit: getHydratedBrandKit(state),
          publishedProjects: getHydratedPublishedProjects(state),
        });
      },
    },
  ),
);
