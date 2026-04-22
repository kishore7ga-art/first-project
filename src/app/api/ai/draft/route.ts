import { generateDraftWithFallback } from "@/builder/freeTierApis";
import type { DraftRequestBody, DraftResponseBody } from "@/builder/draftTypes";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DraftRequestBody;
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return Response.json(
        { error: "A prompt is required to generate a draft." },
        { status: 400 },
      );
    }

    const draft: DraftResponseBody = await generateDraftWithFallback(
      prompt,
      body.brandKit ?? {},
    );

    return Response.json(draft);
  } catch (error) {
    console.error("Draft generation failed", error);

    return Response.json(
      { error: "The local AI draft engine could not finish this request." },
      { status: 500 },
    );
  }
}
