import {
  createCanvasSectionFromBlueprintId,
  deriveThemePatchFromBrandKit,
  normalizeBrandKit,
} from "@/builder/contentEngine";
import { generateDraftWithFallback } from "@/builder/freeTierApis";
import type { BrandKit, CanvasSection } from "@/builder/types";

interface AssistantRequest {
  message?: string;
  brandKit?: Partial<BrandKit>;
  sections?: CanvasSection[];
}

export async function POST(request: Request) {
  const body = (await request.json()) as AssistantRequest;
  const message = body.message?.trim() ?? "";
  const brandKit = normalizeBrandKit(body.brandKit ?? {});
  const lower = message.toLowerCase();

  if (!message) {
    return Response.json({ error: "A message is required." }, { status: 400 });
  }

  if (lower.includes("add") && lower.includes("pricing")) {
    return Response.json({
      action: "insert_section",
      section: createCanvasSectionFromBlueprintId("pricing-2", brandKit),
      position: "after_features",
      message: "Added a concise pricing section after the feature story.",
    });
  }

  if (lower.includes("swap") && lower.includes("hero")) {
    return Response.json({
      action: "replace_hero",
      section: createCanvasSectionFromBlueprintId(lower.includes("minimal") ? "hero-5" : "hero-3", brandKit),
      message: "Swapped the hero to match the requested visual direction.",
    });
  }

  if (lower.includes("brand") || lower.includes("look more like")) {
    const nextBrandKit = normalizeBrandKit({
      ...brandKit,
      brandTone: lower.includes("playful") ? "playful" : lower.includes("bold") ? "bold" : "professional",
    });

    return Response.json({
      action: "theme_update",
      themeUpdates: deriveThemePatchFromBrandKit(nextBrandKit),
      brandKit: nextBrandKit,
      message: "Updated theme tokens and brand voice.",
    });
  }

  const draft = await generateDraftWithFallback(message, brandKit);
  return Response.json({
    action: "replace_page",
    ...draft,
    message: draft.summary,
  });
}
