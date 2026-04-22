import {
  createCanvasSectionFromBlueprintId,
  normalizeBrandKit,
  personalizeSectionData,
} from "@/builder/contentEngine";
import { availableSections } from "@/builder/libraryData";
import type { BrandKit } from "@/builder/types";

interface RemixRequest {
  blueprintId?: string;
  prompt?: string;
  brandKit?: Partial<BrandKit>;
}

export async function POST(request: Request) {
  const body = (await request.json()) as RemixRequest;
  const brandKit = normalizeBrandKit(body.brandKit ?? {});
  const blueprint = availableSections.find((section) => section.id === body.blueprintId);

  if (!blueprint) {
    return Response.json({ error: "A valid blueprintId is required." }, { status: 400 });
  }

  const sameType = availableSections
    .filter((section) => section.type === blueprint.type && section.marketplace.access === "free")
    .slice(0, 3);

  return Response.json({
    variants: sameType.map((section) => ({
      id: section.id,
      name: section.name,
      section: {
        ...createCanvasSectionFromBlueprintId(section.id, brandKit),
        data: personalizeSectionData(section.id, brandKit),
      },
    })),
    message: body.prompt
      ? `Generated three ${blueprint.type.toLowerCase()} remix options for: ${body.prompt}`
      : `Generated three ${blueprint.type.toLowerCase()} remix options.`,
  });
}
