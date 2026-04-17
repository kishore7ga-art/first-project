import type { Metadata } from "next";
import { PublishedSitePage } from "@/builder/PublishedSitePage";

export const metadata: Metadata = {
  title: "Published Preview | Nexus",
  description: "Browser-local published preview for the website builder MVP.",
};

export default async function PublishedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <PublishedSitePage slug={slug} />;
}
