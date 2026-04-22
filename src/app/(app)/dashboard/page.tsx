"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Plus,
  Rocket,
  Trash2,
} from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { analyzeSeo } from "@/builder/seo";

export default function DashboardPage() {
  const router = useRouter();
  const hydrated = useBuilderStore((state) => state.hydrated);
  const projectName = useBuilderStore((state) => state.projectName);
  const brandKit = useBuilderStore((state) => state.brandKit);
  const canvasSections = useBuilderStore((state) => state.canvasSections);
  const lastEditedAt = useBuilderStore((state) => state.lastEditedAt);
  const publishedProjects = useBuilderStore((state) => state.publishedProjects);
  const resetToStarter = useBuilderStore((state) => state.resetToStarter);

  const seoReport = analyzeSeo(brandKit, canvasSections);
  const publishedList = useMemo(
    () =>
      Object.values(publishedProjects).sort(
        (first, second) =>
          new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
      ),
    [publishedProjects],
  );

  const createProject = () => {
    resetToStarter();
    router.push(`/builder/${crypto.randomUUID()}`);
  };

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]" />
      </div>
    );
  }

  const projects = [
    {
      id: "current",
      name: projectName,
      lastEdited: lastEditedAt,
      sections: canvasSections.length,
      score: seoReport.score,
      published: publishedList.length > 0,
      href: "/builder/current-project",
    },
    ...publishedList.slice(0, 5).map((project) => ({
      id: project.slug,
      name: project.projectName,
      lastEdited: project.publishedAt,
      sections: project.sections.length,
      score: analyzeSeo(project.brandKit, project.sections).score,
      published: true,
      href: `/published/${project.slug}`,
    })),
  ];

  return (
    <div className="min-h-[calc(100dvh-72px)] bg-[#09090B] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
              <Rocket className="h-3.5 w-3.5 text-cyan-300" />
              Dashboard
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              My Projects
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-500">
              Manage drafts, previews, published links, and agency-ready client sites.
            </p>
          </div>
          <button
            type="button"
            onClick={createProject}
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-black text-black transition hover:bg-zinc-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </button>
        </div>

        {projects.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101014] transition hover:border-white/25"
              >
                <div className="relative h-44 border-b border-white/10 bg-[radial-gradient(circle_at_22%_18%,rgba(168,85,247,0.32),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(6,182,212,0.26),transparent_30%),linear-gradient(135deg,#18181b,#09090b)] p-4">
                  <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                    {project.published ? "Published" : "Draft"}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/35 p-4 backdrop-blur">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                      Thumbnail
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <span
                          key={index}
                          className="h-7 rounded-md bg-white/10"
                          style={{ opacity: 0.22 + index * 0.08 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black text-white">{project.name}</h2>
                      <p className="mt-1 text-sm text-zinc-500">
                        Last edited {new Date(project.lastEdited).toLocaleString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
                      aria-label="Project options"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                      <div className="text-zinc-600">Sections</div>
                      <div className="mt-1 font-black text-white">{project.sections}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                      <div className="text-zinc-600">SEO</div>
                      <div className="mt-1 font-black text-white">{project.score}</div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                    <Link
                      href={project.href}
                      className="inline-flex flex-1 items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-black text-black"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="rounded-lg border border-white/10 px-3 py-2 text-zinc-400 hover:text-white"
                      aria-label="Duplicate project"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-white/10 px-3 py-2 text-zinc-400 hover:text-rose-300"
                      aria-label="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black">
              <Plus className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-2xl font-black">Create your first website</h2>
            <button
              type="button"
              onClick={createProject}
              className="mt-6 rounded-lg bg-white px-5 py-3 text-sm font-black text-black"
            >
              Create your first website
            </button>
          </div>
        )}

        {publishedList[0] ? (
          <Link
            href={`/published/${publishedList[0].slug}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-white"
          >
            Open latest published preview
            <ExternalLink className="h-4 w-4" />
          </Link>
        ) : null}

        <Link
          href="/dashboard/motion-footer-demo"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-white"
        >
          View the motion footer demo
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
