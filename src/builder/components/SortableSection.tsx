"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  GripVertical,
  Trash2,
} from "lucide-react";
import { Registry } from "@/builder/registry";
import type { CanvasSection } from "@/builder/types";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";

interface SortableSectionProps {
  section: CanvasSection;
}

export function SortableSection({ section }: SortableSectionProps) {
  const sections = useBuilderStore((state) => state.canvasSections);
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
      <div className="m-4 rounded-[22px] border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        Missing component for section &quot;{section.blueprintId}&quot;.
      </div>
    );
  }

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
        !isDragging && "hover:border-[var(--builder-border)]",
      )}
    >
      <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex items-start justify-between opacity-0 transition group-hover:opacity-100">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
          <button
            type="button"
            className="cursor-grab rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 active:cursor-grabbing"
            aria-label={`Drag ${section.name}`}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {section.type}
            </div>
            <div className="text-sm font-semibold text-slate-900">{section.name}</div>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-slate-200 bg-white/95 p-1 shadow-lg backdrop-blur">
          <button
            type="button"
            onClick={() => moveSectionByStep(section.id, -1)}
            disabled={index <= 0}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Move section up"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => moveSectionByStep(section.id, 1)}
            disabled={index === sections.length - 1}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Move section down"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => duplicateSection(section.id)}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="Duplicate section"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => removeSection(section.id)}
            className="rounded-full p-2 text-rose-500 transition hover:bg-rose-50"
            aria-label="Delete section"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Component
        data={section.data}
        updateData={(partialData) => updateSectionData(section.id, partialData)}
      />
    </div>
  );
}
