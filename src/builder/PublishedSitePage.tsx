"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { buildSectionAnchors } from "@/builder/navigation";
import { Registry } from "@/builder/registry";
import { getBuilderThemeStyles } from "@/builder/theme";
import { useBuilderStore } from "@/store/useBuilderStore";

interface PublishedSitePageProps {
  slug: string;
}

export function PublishedSitePage({ slug }: PublishedSitePageProps) {
  const hydrated = useBuilderStore((state) => state.hydrated);
  const project = useBuilderStore((state) => state.publishedProjects[slug]);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-950 px-4 text-white">
        Loading preview...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-950 px-4">
        <div className="max-w-lg rounded-[32px] border border-slate-800 bg-slate-900 p-8 text-center text-white shadow-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Preview unavailable
          </div>
          <h1 className="mt-3 text-3xl font-semibold">This local preview was not found.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Published previews are stored in this browser only for the MVP. Open the
            builder, publish again, and then revisit the generated link.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to builder
          </Link>
        </div>
      </div>
    );
  }

  const anchors = buildSectionAnchors(project.sections);

  return (
    <div className="builder-theme min-h-dvh overflow-x-hidden" style={getBuilderThemeStyles(project.theme)}>
      <div className="sticky top-0 z-30 border-b border-[var(--builder-border)] bg-[var(--builder-card)]/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--builder-muted)]">
              Local published preview
            </div>
            <h1 className="builder-heading mt-1 text-2xl font-semibold text-[var(--builder-foreground)]">
              {project.projectName}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--builder-muted)]">
            <span className="rounded-full border border-[var(--builder-border)] bg-[var(--builder-soft)] px-3 py-1.5">
              {project.sections.length} sections
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--builder-border)] bg-[var(--builder-soft)] px-3 py-1.5">
              <CalendarDays className="h-4 w-4" />
              {new Date(project.publishedAt).toLocaleString()}
            </span>
            <Link
              href="/builder"
              className="rounded-full bg-slate-900 px-4 py-2.5 font-semibold text-white"
            >
              Open builder
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="overflow-hidden rounded-[32px] border border-[var(--builder-border)] bg-[var(--builder-card)] shadow-[var(--builder-shadow)]">
          {project.sections.map((section) => {
            const Component = Registry[section.blueprintId];
            const anchor = anchors.find((item) => item.sectionId === section.id);

            if (!Component) {
              return null;
            }

            return (
              <div key={section.id} id={anchor?.id} className="scroll-mt-28">
                <Component
                  data={section.data}
                  readOnly
                  anchors={anchors}
                  updateData={() => undefined}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
