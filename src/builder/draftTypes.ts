import type { BrandKit, CanvasSection, ThemeSettings } from "@/builder/types";

export interface DraftRequestBody {
  prompt: string;
  brandKit?: Partial<BrandKit>;
}

export interface DraftResponseBody {
  projectName: string;
  brandKit: BrandKit;
  sections: CanvasSection[];
  themePatch: Partial<ThemeSettings>;
  blueprintIds: string[];
  summary: string;
}
