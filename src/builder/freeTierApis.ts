import { availableSections } from "@/builder/libraryData";
import type { BrandKit, CanvasSection, ThemeSettings } from "@/builder/types";
import type { DraftResponseBody } from "@/builder/draftTypes";
import {
  buildDraftFromPrompt,
  createCanvasSectionsFromBlueprintIds,
  normalizeBrandKit,
} from "@/builder/contentEngine";

type DraftSuggestion = {
  projectName?: string;
  summary?: string;
  brandKit?: Partial<BrandKit>;
  themePatch?: Partial<ThemeSettings>;
  blueprintIds?: string[];
  heroImageQuery?: string;
};

export type ImageAsset = {
  url: string;
  alt: string;
  source: "unsplash" | "pexels";
  credit: string;
  pageUrl?: string;
  photographerUrl?: string;
  query: string;
};

const freeSectionCatalog = availableSections.filter(
  (section) => section.marketplace.access === "free",
);

function withNodeTimeout(timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    done: () => clearTimeout(timer),
  };
}

function buildNormalizedBrandKit(brandKit: Partial<BrandKit>) {
  return normalizeBrandKit(brandKit);
}

function buildSectionCatalogPrompt() {
  return freeSectionCatalog
    .map((section) => `${section.id} | ${section.type} | ${section.name}`)
    .join("\n");
}

function buildDraftPrompt(prompt: string, brandKit: BrandKit) {
  return [
    "You are a senior product designer generating a website builder draft.",
    "Return JSON only. No markdown, no code fences, no commentary.",
    "The JSON must use these keys exactly:",
    "{ projectName, summary, brandKit, themePatch, blueprintIds, heroImageQuery }",
    "",
    "Rules:",
    "- blueprintIds must be an ordered array of allowed section ids.",
    "- Include a mobile-first flow with a Navbar, Hero, Features, Pricing, CTA, and Footer when possible.",
    "- Keep the content real, specific, and free of lorem ipsum.",
    "- Prefer concise copy that reads naturally on a phone.",
    "- Suggest a heroImageQuery that would produce a useful launch image if the page would benefit from one.",
    "",
    "Allowed section ids:",
    buildSectionCatalogPrompt(),
    "",
    "Current brand kit:",
    JSON.stringify(brandKit),
    "",
    "User prompt:",
    prompt,
  ].join("\n");
}

function stripCodeFences(text: string) {
  return text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
}

function extractJsonBlock(text: string) {
  const cleaned = stripCodeFences(text);
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

function parseSuggestion(text: string): DraftSuggestion | null {
  const jsonBlock = extractJsonBlock(text);

  if (!jsonBlock) {
    return null;
  }

  try {
    const parsed = JSON.parse(jsonBlock) as DraftSuggestion;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function sanitizeBlueprintIds(ids: unknown, fallback: string[]) {
  if (!Array.isArray(ids)) {
    return fallback;
  }

  const allowedIds = new Set(freeSectionCatalog.map((section) => section.id));
  const unique: string[] = [];

  for (const candidate of ids) {
    if (typeof candidate !== "string") {
      continue;
    }

    if (!allowedIds.has(candidate) || unique.includes(candidate)) {
      continue;
    }

    unique.push(candidate);
  }

  return unique.length > 0 ? unique : fallback;
}

function attachImageToFirstHero(
  sections: CanvasSection[],
  imageAsset: ImageAsset | null,
  fallbackQuery: string,
) {
  if (!imageAsset) {
    return sections;
  }

  let applied = false;

  return sections.map((section) => {
    if (applied || section.type !== "Hero") {
      return section;
    }

    applied = true;

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
        mediaQuery: fallbackQuery,
      },
    };
  });
}

function inferImageQuery(prompt: string, brandKit: BrandKit) {
  const normalized = `${brandKit.websiteTopic} ${brandKit.audience} ${prompt}`.toLowerCase();
  const candidates = [
    "product launch",
    "team dashboard",
    "website builder",
    "marketing workspace",
    "saas interface",
    "hero banner",
    "creative studio",
    "mobile app",
    "analytics dashboard",
  ];

  for (const candidate of candidates) {
    if (normalized.includes(candidate.split(" ")[0])) {
      return `${brandKit.websiteTopic} ${candidate}`;
    }
  }

  return `${brandKit.websiteTopic} launch preview`;
}

async function searchUnsplashImage(query: string): Promise<ImageAsset | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY?.trim();

  if (!accessKey) {
    return null;
  }

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "6");
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");
  url.searchParams.set("client_id", accessKey);

  const { signal, done } = withNodeTimeout(12_000);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal,
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      results?: Array<{
        alt_description?: string | null;
        urls?: { regular?: string; full?: string; small?: string };
        user?: {
          name?: string | null;
          links?: { html?: string | null };
        };
        links?: { html?: string | null };
      }>;
    };

    const photo = payload.results?.[0];

    if (!photo?.urls) {
      return null;
    }

    return {
      source: "unsplash",
      url: photo.urls.full || photo.urls.regular || photo.urls.small || "",
      alt: photo.alt_description?.trim() || query,
      credit: photo.user?.name
        ? `Photo by ${photo.user.name} on Unsplash`
        : "Photo on Unsplash",
      pageUrl: photo.links?.html ?? undefined,
      photographerUrl: photo.user?.links?.html ?? undefined,
      query,
    };
  } catch {
    return null;
  } finally {
    done();
  }
}

async function searchPexelsImage(query: string): Promise<ImageAsset | null> {
  const accessKey = process.env.PEXELS_API_KEY?.trim();

  if (!accessKey) {
    return null;
  }

  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "6");
  url.searchParams.set("orientation", "landscape");

  const { signal, done } = withNodeTimeout(12_000);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: accessKey,
      },
      cache: "no-store",
      signal,
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      photos?: Array<{
        alt?: string | null;
        url?: string;
        photographer?: string | null;
        photographer_url?: string | null;
        src?: {
          large2x?: string;
          large?: string;
          medium?: string;
        };
      }>;
    };

    const photo = payload.photos?.[0];

    if (!photo?.src) {
      return null;
    }

    return {
      source: "pexels",
      url: photo.src.large2x || photo.src.large || photo.src.medium || "",
      alt: photo.alt?.trim() || query,
      credit: photo.photographer
        ? `Photo by ${photo.photographer} on Pexels`
        : "Photo on Pexels",
      pageUrl: photo.url,
      photographerUrl: photo.photographer_url ?? undefined,
      query,
    };
  } catch {
    return null;
  } finally {
    done();
  }
}

export async function searchImageAsset(prompt: string, brandKit: Partial<BrandKit>) {
  const normalizedBrandKit = buildNormalizedBrandKit(brandKit);
  const query = inferImageQuery(prompt, normalizedBrandKit);

  const unsplash = await searchUnsplashImage(query);
  if (unsplash) {
    return unsplash;
  }

  return searchPexelsImage(query);
}

async function requestOpenRouterSuggestion(prompt: string, brandKit: BrandKit) {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }

  const model = process.env.OPENROUTER_MODEL?.trim() || "openrouter/free";
  const referer = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  const title = process.env.NEXT_PUBLIC_APP_NAME?.trim() || "AI Website Builder";
  const { signal, done } = withNodeTimeout(18_000);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": referer,
      "X-Title": title,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You generate strict JSON drafts for a mobile-first website builder. Return only valid JSON.",
        },
        {
          role: "user",
          content: buildDraftPrompt(prompt, brandKit),
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1400,
    }),
    signal,
  }).finally(done);

  if (!response.ok) {
    throw new Error(`OpenRouter request failed: ${response.status}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = payload.choices?.[0]?.message?.content?.trim() || "";
  if (!content) {
    return null;
  }

  return parseSuggestion(content);
}

async function requestHuggingFaceSuggestion(prompt: string, brandKit: BrandKit) {
  const apiKey = process.env.HUGGINGFACE_API_KEY?.trim() || process.env.HF_TOKEN?.trim();
  if (!apiKey) {
    return null;
  }

  const model = process.env.HUGGINGFACE_MODEL?.trim() || "google/gemma-2-2b-it";
  const endpoint = `https://api-inference.huggingface.co/models/${encodeURIComponent(model)}`;
  const requestBody = buildDraftPrompt(prompt, brandKit);

  type HuggingFaceResult = DraftSuggestion | { retryAfter: number; error: string } | null;

  const doRequest = async (): Promise<HuggingFaceResult> => {
    const { signal, done } = withNodeTimeout(18_000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: requestBody,
          parameters: {
            max_new_tokens: 1400,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
        signal,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
          estimated_time?: number;
        };

        if (response.status === 503 && typeof payload.estimated_time === "number") {
          return {
            retryAfter: Math.ceil(payload.estimated_time * 1000),
            error: payload.error || "Hugging Face model is loading.",
          } as const;
        }

        throw new Error(payload.error || `Hugging Face request failed: ${response.status}`);
      }

      const payload = (await response.json()) as
        | Array<{ generated_text?: string }>
        | { generated_text?: string };

      const generatedText = Array.isArray(payload)
        ? payload[0]?.generated_text?.trim() || ""
        : payload.generated_text?.trim() || "";

      if (!generatedText) {
        return null;
      }

      return parseSuggestion(generatedText);
    } finally {
      done();
    }
  };

  const firstAttempt = await doRequest();
  if (firstAttempt && "retryAfter" in firstAttempt) {
    await new Promise((resolve) => setTimeout(resolve, Math.min(firstAttempt.retryAfter, 8_000)));
    const secondAttempt = await doRequest();
    if (secondAttempt && typeof secondAttempt === "object" && "retryAfter" in secondAttempt) {
      return null;
    }

    return secondAttempt;
  }

  return firstAttempt;
}

async function generateRemoteSuggestion(prompt: string, brandKit: BrandKit) {
  const providers = [requestOpenRouterSuggestion, requestHuggingFaceSuggestion];

  for (const provider of providers) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const result = await provider(prompt, brandKit);
        if (result) {
          return result;
        }
      } catch (error) {
        console.warn(`AI provider failed, falling back to the next provider.`, error);
        if (attempt === 0) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          continue;
        }
      }
    }
  }

  return null;
}

function mergeSectionData(
  localDraft: DraftResponseBody,
  suggestion: DraftSuggestion,
  prompt: string,
  imageAsset: ImageAsset | null,
): DraftResponseBody {
  const nextBrandKit = normalizeBrandKit({
    ...localDraft.brandKit,
    ...(suggestion.brandKit ?? {}),
  });

  const blueprintIds = sanitizeBlueprintIds(suggestion.blueprintIds, localDraft.blueprintIds);
  const sections = createCanvasSectionsFromBlueprintIds(blueprintIds, nextBrandKit);
  const heroImage = imageAsset || null;
  const nextSections = attachImageToFirstHero(sections, heroImage, suggestion.heroImageQuery || prompt);

  return {
    projectName: suggestion.projectName?.trim() || localDraft.projectName,
    brandKit: nextBrandKit,
    sections: nextSections,
    themePatch: {
      ...localDraft.themePatch,
      ...(suggestion.themePatch ?? {}),
    },
    blueprintIds,
    summary: suggestion.summary?.trim() || localDraft.summary,
  };
}

export async function generateDraftWithFallback(
  prompt: string,
  brandKit: Partial<BrandKit>,
): Promise<DraftResponseBody> {
  const normalizedBrandKit = buildNormalizedBrandKit(brandKit);
  const localDraft = buildDraftFromPrompt(prompt, normalizedBrandKit);

  const suggestion = await generateRemoteSuggestion(prompt, normalizedBrandKit);

  if (!suggestion) {
    const localImage = await searchImageAsset(prompt, normalizedBrandKit);
    return {
      ...localDraft,
      sections: attachImageToFirstHero(localDraft.sections, localImage, prompt),
    };
  }

  const mergedDraft = mergeSectionData(localDraft, suggestion, prompt, null);
  const imageQuery = suggestion.heroImageQuery?.trim() || prompt;
  const imageAsset = await searchImageAsset(imageQuery, mergedDraft.brandKit);

  if (!imageAsset) {
    return mergedDraft;
  }

  return {
    ...mergedDraft,
    sections: attachImageToFirstHero(mergedDraft.sections, imageAsset, imageQuery),
  };
}
