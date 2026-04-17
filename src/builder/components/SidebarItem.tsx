"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SectionBlueprint } from "@/builder/types";
import { cn } from "@/lib/utils";
import { SectionReferencePreview } from "./SectionReferencePreview";

interface SidebarItemProps {
  blueprint: SectionBlueprint;
}

export function SidebarItem({ blueprint }: SidebarItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `library-${blueprint.id}`,
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

  const iconMap = Icons as unknown as Record<string, LucideIcon>;
  const IconRender = iconMap[blueprint.thumbnail] ?? Icons.LayoutTemplate;

  return (
    <button
      ref={setNodeRef}
      style={style}
      type="button"
      {...listeners}
      {...attributes}
      className={cn(
        "group w-full rounded-[26px] border border-slate-200 bg-white p-3 text-left shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg",
        "active:cursor-grabbing",
        isDragging && "opacity-60 shadow-2xl",
      )}
    >
      <div className="relative overflow-hidden rounded-[20px]">
        <div className="aspect-[5/3]">
          <SectionReferencePreview blueprint={blueprint} />
        </div>

        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm backdrop-blur">
          {blueprint.preview.eyebrow}
        </div>

        <div className="pointer-events-none absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
          <IconRender className="h-4 w-4" />
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
          Reference preview
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 px-1 pt-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {blueprint.preview.title}
          </div>
          <div className="text-sm font-semibold text-slate-900">{blueprint.name}</div>
          <div className="mt-1 text-xs leading-5 text-slate-500">
            {blueprint.preview.detail}
          </div>
          <div className="mt-1 text-xs leading-5 text-slate-400">
            {blueprint.description}
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {blueprint.type}
        </span>
      </div>
    </button>
  );
}
