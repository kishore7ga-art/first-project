"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Lock, MoonStar, Star } from "lucide-react";
import type { SectionBlueprint } from "@/builder/types";
import { cn, formatCompactNumber, formatRating } from "@/lib/utils";
import { SectionReferencePreview } from "./SectionReferencePreview";

interface SidebarItemProps {
  blueprint: SectionBlueprint;
}

export function SidebarItem({ blueprint }: SidebarItemProps) {
  const isLocked = blueprint.marketplace.access === "premium";
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

  const iconMap = Icons as unknown as Record<string, LucideIcon>;
  const IconRender = iconMap[blueprint.thumbnail] ?? Icons.LayoutTemplate;
  const dragProps = isLocked ? {} : { ...listeners, ...attributes };

  return (
    <button
      ref={setNodeRef}
      style={style}
      type="button"
      aria-disabled={isLocked}
      {...dragProps}
      className={cn(
        "group w-full rounded-[26px] border border-slate-200 bg-white p-3 text-left shadow-sm transition-all",
        isLocked
          ? "cursor-not-allowed"
          : "hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg active:cursor-grabbing",
        isDragging && "opacity-60 shadow-2xl",
      )}
    >
      <div className="relative overflow-hidden rounded-[20px]">
        <div className="aspect-[5/3] transition duration-300 group-hover:scale-[1.01]">
          <SectionReferencePreview blueprint={blueprint} />
        </div>

        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm backdrop-blur">
          {blueprint.preview.eyebrow}
        </div>

        <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-2">
          {blueprint.marketplace.darkMode ? (
            <span className="rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
              <MoonStar className="mr-1 inline h-3 w-3" />
              Dark ready
            </span>
          ) : null}
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
            <IconRender className="h-4 w-4" />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2">
          <div className="rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            Reference preview
          </div>
          {isLocked ? (
            <div className="rounded-full bg-amber-400/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 backdrop-blur">
              <Lock className="mr-1 inline h-3 w-3" />
              Premium
            </div>
          ) : (
            <div className="rounded-full bg-emerald-400/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 backdrop-blur">
              Free
            </div>
          )}
        </div>

        {isLocked ? (
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(15,23,42,0.26))]" />
        ) : null}
      </div>

      <div className="px-1 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {blueprint.preview.title}
            </div>
            <div className="text-sm font-semibold text-slate-900">{blueprint.name}</div>
            <div className="mt-1 text-xs leading-5 text-slate-500">
              {blueprint.preview.detail}
            </div>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {blueprint.type}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {blueprint.marketplace.styles.map((styleTag) => (
            <span
              key={styleTag}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              {styleTag}
            </span>
          ))}
          {blueprint.marketplace.kitIds.length > 0 ? (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {blueprint.marketplace.kitIds.length} kit
              {blueprint.marketplace.kitIds.length > 1 ? "s" : ""}
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-700">
              {formatRating(blueprint.marketplace.rating)}
            </span>
            <span>({blueprint.marketplace.reviews})</span>
          </div>
          <div>{formatCompactNumber(blueprint.marketplace.usageCount)} uses</div>
        </div>

        <div className="mt-3 text-xs leading-5 text-slate-400">
          {isLocked
            ? "Premium section preview only for now."
            : "Drag into the canvas to add this section."}
        </div>
      </div>
    </button>
  );
}
