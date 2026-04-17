"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { previewWidths } from "@/builder/theme";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SortableSection } from "./SortableSection";

export function Canvas() {
  const canvasSections = useBuilderStore((state) => state.canvasSections);
  const previewMode = useBuilderStore((state) => state.previewMode);

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-droppable",
    data: { type: "canvas" },
  });

  const PreviewIcon =
    previewMode === "desktop" ? Monitor : previewMode === "tablet" ? Tablet : Smartphone;

  return (
    <div className="builder-dot-grid flex-1 overflow-auto bg-[#f3f1ea] p-4 sm:p-6 xl:p-8">
      <div className="mx-auto mb-5 flex max-w-[1180px] items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
        <div className="flex items-center gap-2">
          <PreviewIcon className="h-4 w-4" />
          {previewMode} preview
        </div>
        <div>{canvasSections.length} placed sections</div>
      </div>

      <div
        ref={setNodeRef}
        className="mx-auto transition-all duration-200"
        style={{ width: previewWidths[previewMode] }}
      >
        <div className="rounded-[32px] border border-white/70 bg-white/85 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="rounded-[24px] border border-slate-200 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-300" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Live canvas
              </div>
            </div>

            <SortableContext
              items={canvasSections.map((section) => section.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="relative min-h-[65vh] bg-[var(--builder-page)]">
                {canvasSections.length === 0 && (
                  <div className="absolute inset-6 flex items-center justify-center rounded-[26px] border-2 border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-400">
                    {isOver
                      ? "Drop the section here to start your page."
                      : "Drag a section from the library and drop it onto the canvas."}
                  </div>
                )}

                <div className="builder-theme min-h-[65vh]" data-over={isOver ? "true" : "false"}>
                  {canvasSections.map((section) => (
                    <SortableSection key={section.id} section={section} />
                  ))}
                </div>
              </div>
            </SortableContext>
          </div>
        </div>
      </div>
    </div>
  );
}
