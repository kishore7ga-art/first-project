import type { BrandKit } from "@/builder/types";
import type { DraftRequestBody, DraftResponseBody } from "@/builder/draftTypes";

export async function requestDraftFromPrompt(
  prompt: string,
  brandKit: Partial<BrandKit>,
): Promise<DraftResponseBody> {
  const payload: DraftRequestBody = {
    prompt,
    brandKit,
  };

  const response = await fetch("/api/ai/draft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as DraftResponseBody | { error?: string };

  if (!response.ok) {
    const errorMessage = "error" in result ? result.error : undefined;
    throw new Error(errorMessage || "Could not generate a draft right now.");
  }

  return result as DraftResponseBody;
}
