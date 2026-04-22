"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  GripVertical,
  Pencil,
  Trash2,
  WandSparkles,
} from "lucide-react";
import { personalizeSectionData } from "@/builder/contentEngine";
import { Registry } from "@/builder/registry";
import type { CanvasSection } from "@/builder/types";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/useBuilderStore";

interface SortableSectionProps {
  section: CanvasSection;
}

export function SortableSection({ section }: SortableSectionProps) {
  const [toast, setToast] = useState("");
  const sections = useBuilderStore((state) => state.canvasSections);
  const brandKit = useBuilderStore((state) => state.brandKit);
  const duplicateSection = useBuilderStore((state) => state.duplicateSection);
  const moveSectionByStep = useBuilderStore((state) => state.moveSectionByStep);
  const removeSection = useBuilderStore((state) => state.removeSection);
  const updateSectionData = useBuilderStore((state) => state.updateSectionData);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: section.id,
      data: { type: "canvas-section", section },
    });

  const Component = Registry[section.blueprintId];
  const index = sections.findIndex((candidate) => candidate.id === section.id);

  if (!Component) {
    return (
      <div className="m-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        Missing component for section &quot;{section.blueprintId}&quot;.
      </div>
    );
  }

  const remixSection = () => {
    updateSectionData(section.id, personalizeSectionData(section.blueprintId, brandKit));
    setToast("Section remixed with fresh brand-aware content");
    window.setTimeout(() => setToast(""), 2200);
  };

  const deleteSection = () => {
    removeSection(section.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "group relative border-y border-transparent transition-all",
        isDragging && "z-20 opacity-60 shadow-2xl",
        !isDragging && "hover:z-10 hover:border-blue-500/30",
      )}
    >
      <button
        type="button"
        className="absolute left-[-18px] top-1/2 z-30 hidden -translate-y-1/2 rounded-lg border border-white/10 bg-[#1A1A1A] p-2 text-zinc-400 opacity-0 shadow-xl transition group-hover:opacity-100 lg:block"
        aria-label={`Drag ${section.name}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <div className="pointer-events-none absolute left-1/2 top-[-44px] z-40 -translate-x-1/2 translate-y-1 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        <div className="pointer-events-auto flex items-center gap-1 rounded-[10px] border border-[#333] bg-[#1A1A1A] px-2 py-1 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
          <button
            type="button"
            onClick={() => moveSectionByStep(section.id, -1)}
            disabled={index <= 0}
            className="rounded-md p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Move section up"
            title="Move up"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => moveSectionByStep(section.id, 1)}
            disabled={index === sections.length - 1}
            className="rounded-md p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Move section down"
            title="Move down"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => duplicateSection(section.id)}
            className="rounded-md p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Duplicate section"
            title="Duplicate"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-md p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Edit section"
            title="Edit inline"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={remixSection}
            className="rounded-md p-2 text-zinc-400 transition hover:bg-white/10 hover:text-cyan-200"
            aria-label="AI remix section"
            title="AI remix"
          >
            <WandSparkles className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={deleteSection}
            className="rounded-md p-2 text-zinc-400 transition hover:bg-rose-500/10 hover:text-rose-300"
            aria-label="Delete section"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {toast ? (
        <div className="absolute right-4 top-4 z-40 rounded-lg bg-zinc-950 px-3 py-2 text-xs font-bold text-white shadow-xl">
          {toast}
        </div>
      ) : null}

      <Component
        data={section.data}
        updateData={(partialData) => updateSectionData(section.id, partialData)}
      />
    </div>
  );
}
