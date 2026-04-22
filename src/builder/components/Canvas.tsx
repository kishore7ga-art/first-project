"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";
import { SortableSection } from "./SortableSection";

const exactPreviewWidths = {
  desktop: "1280px",
  tablet: "768px",
  mobile: "390px",
} as const;

interface CanvasProps {
  onOpenLibrary?: () => void;
}

export function Canvas({ onOpenLibrary }: CanvasProps) {
  const canvasSections = useBuilderStore((state) => state.canvasSections);
  const previewMode = useBuilderStore((state) => state.previewMode);

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-droppable",
    data: { type: "canvas" },
  });

  return (
    <div className="h-[calc(100dvh-60px)] overflow-auto bg-[#F4F4F5] px-3 py-5 sm:px-4 sm:py-8">
      <div
        ref={setNodeRef}
        className="mx-auto min-h-[calc(100dvh-124px)] bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)] transition-all duration-200"
        style={{ width: `min(100%, ${exactPreviewWidths[previewMode]})` }}
      >
        <SortableContext
          items={canvasSections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="builder-theme relative min-h-[calc(100dvh-124px)] bg-white">
            {canvasSections.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div
                  className={cn(
                    "max-w-lg rounded-2xl border-2 border-dashed border-zinc-300 bg-white px-10 py-14 text-center transition",
                    isOver && "border-blue-500 shadow-[0_0_32px_rgba(59,130,246,0.35)]",
                  )}
                >
                  <Sparkles className="mx-auto h-10 w-10 text-zinc-300" />
                  <h2 className="mt-5 text-xl font-black text-zinc-900">
                    Start building your website
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    Drag sections from the left panel and drop them here.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenLibrary}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-bold text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Open section library
                  </button>
                </div>
              </div>
            ) : null}

            {isOver && canvasSections.length > 0 ? (
              <div className="pointer-events-none sticky top-0 z-20 h-10 animate-pulse bg-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.8)]" />
            ) : null}

            {canvasSections.map((section) => (
              <SortableSection key={section.id} section={section} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
