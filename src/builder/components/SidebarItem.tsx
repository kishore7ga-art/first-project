"use client";

import { Expand, Lock, Plus } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import type { SectionBlueprint } from "@/builder/types";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SectionReferencePreview } from "./SectionReferencePreview";

interface SidebarItemProps {
  blueprint: SectionBlueprint;
  onPreview: () => void;
  compact?: boolean;
}

function colorFromBlueprint(blueprint: SectionBlueprint) {
  const palette = ["#3B82F6", "#10B981", "#F97316", "#A855F7", "#06B6D4", "#F59E0B"];
  const value = blueprint.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[value % palette.length];
}

export function SidebarItem({ blueprint, onPreview, compact = false }: SidebarItemProps) {
  const addSection = useBuilderStore((state) => state.addSection);
  const isLocked = blueprint.marketplace.access === "premium";
  const color = colorFromBlueprint(blueprint);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `library-${blueprint.id}`,
    disabled: isLocked,
    data: {
      type: "sidebar-item",
      blueprint,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const dragProps = isLocked ? {} : { ...listeners, ...attributes };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...dragProps}
      className={cn(
        "section-card group relative w-full overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#1A1A1A]",
        compact ? "h-[180px]" : "h-[180px] 2xl:h-[196px]",
        isLocked ? "cursor-not-allowed" : "cursor-grab hover:border-white/20",
        isDragging && "opacity-50",
      )}
      onClick={
        compact
          ? () => {
              if (!isLocked) {
                onPreview();
              }
            }
          : undefined
      }
    >
      <div
        className={cn(
          "absolute left-0 top-0 origin-top-left pointer-events-none",
          compact
            ? "h-[820px] w-[1280px] scale-[0.18]"
            : "h-[820px] w-[1280px] scale-[0.215] 2xl:scale-[0.225]",
        )}
      >
        <SectionReferencePreview blueprint={blueprint} />
      </div>

      {compact ? (
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/90 to-transparent p-2 pt-10">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-[11px] font-bold text-white">{blueprint.name}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                {blueprint.type}
              </div>
            </div>
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>

          <div
            className="mt-2 grid grid-cols-2 gap-1.5"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => addSection(blueprint)}
              disabled={isLocked}
              className="rounded-md bg-white px-2 py-1.5 text-[10px] font-bold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLocked ? (
                <>
                  <Lock className="mr-1 inline h-3 w-3" />
                  Locked
                </>
              ) : (
                <>
                  <Plus className="mr-1 inline h-3 w-3" />
                  Add
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onPreview}
              className="rounded-md border border-white/40 px-2 py-1.5 text-[10px] font-bold text-white transition hover:bg-white/10"
            >
              <Expand className="mr-1 inline h-3 w-3" />
              Preview
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-10">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[11px] font-bold text-white">{blueprint.name}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  {blueprint.type}
                </div>
              </div>
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>

          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/75 opacity-0 transition group-hover:opacity-100">
            <div
              className="grid gap-2"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => addSection(blueprint)}
                disabled={isLocked}
                className="rounded-md bg-white px-4 py-1.5 text-xs font-bold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLocked ? (
                  <>
                    <Lock className="mr-1 inline h-3.5 w-3.5" />
                    Locked
                  </>
                ) : (
                  <>
                    <Plus className="mr-1 inline h-3.5 w-3.5" />
                    Add to Canvas
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onPreview}
                className="rounded-md border border-white/40 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <Expand className="mr-1 inline h-3.5 w-3.5" />
                Preview
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
