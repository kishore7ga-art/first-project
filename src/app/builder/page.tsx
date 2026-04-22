import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BuilderWorkspace } from "@/builder/BuilderWorkspace";

export const metadata: Metadata = {
  title: "Builder | Nexus",
  description: "Compose a polished landing page with drag-and-drop sections.",
};

export default async function BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const initialPrompt = Array.isArray(resolvedSearchParams.prompt)
    ? resolvedSearchParams.prompt[0] ?? ""
    : resolvedSearchParams.prompt ?? "";

  if (!initialPrompt) {
    redirect("/builder/demo-project");
  }

  return <BuilderWorkspace initialPrompt={initialPrompt} />;
}
