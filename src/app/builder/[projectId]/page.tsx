import type { Metadata } from "next";
import { BuilderWorkspace } from "@/builder/BuilderWorkspace";

export const metadata: Metadata = {
  title: "Builder | Sections",
  description: "Drag sections onto a live canvas and publish a website.",
};

export default async function ProjectBuilderPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ prompt?: string | string[] }>;
}) {
  const [{ projectId }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const initialPrompt = Array.isArray(resolvedSearchParams.prompt)
    ? resolvedSearchParams.prompt[0] ?? ""
    : resolvedSearchParams.prompt ?? "";

  return <BuilderWorkspace initialPrompt={initialPrompt} projectId={projectId} />;
}
