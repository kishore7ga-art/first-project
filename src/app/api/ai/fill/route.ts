import {
  getMetaFromBrandKit,
  normalizeBrandKit,
  personalizeCanvasSections,
} from "@/builder/contentEngine";
import { searchImageAsset } from "@/builder/freeTierApis";
import type { BrandKit, CanvasSection } from "@/builder/types";

interface FillRequest {
  brandKit?: Partial<BrandKit>;
  sections?: CanvasSection[];
  niche?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as FillRequest;
  const brandKit = normalizeBrandKit({
    ...(body.brandKit ?? {}),
    websiteTopic: body.niche || body.brandKit?.websiteTopic,
  });
  const imageAsset = await searchImageAsset(body.niche || brandKit.websiteTopic, brandKit);
  let appliedImage = false;
  const personalizedSections = personalizeCanvasSections(body.sections ?? [], brandKit).map(
    (section) => {
      if (appliedImage || !imageAsset || section.type !== "Hero") {
        return section;
      }

      appliedImage = true;

      return {
        ...section,
        data: {
          ...section.data,
          mediaUrl: imageAsset.url,
          mediaAlt: imageAsset.alt,
          mediaCredit: imageAsset.credit,
          mediaSource: imageAsset.source,
          mediaPageUrl: imageAsset.pageUrl,
          mediaPhotographerUrl: imageAsset.photographerUrl,
          mediaQuery: imageAsset.query,
        },
      };
    },
  );

  return Response.json({
    brandKit: {
      ...brandKit,
      ...getMetaFromBrandKit(brandKit),
    },
    sections: personalizedSections,
    imageQuery: imageAsset?.query || brandKit.websiteTopic,
    imageAsset,
    message: `Filled sections with real ${brandKit.websiteTopic} content using a ${brandKit.brandTone} voice.`,
  });
}
