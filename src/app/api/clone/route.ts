import { createCanvasSectionsFromBlueprintIds, normalizeBrandKit } from "@/builder/contentEngine";

interface CloneRequest {
  url?: string;
}

function inferBlueprintFlow(html: string) {
  const lower = html.toLowerCase();
  const ids = ["navbar-1", "hero-2", "features-1"];

  if (lower.includes("pricing") || lower.includes("plans")) {
    ids.push("pricing-1");
  }

  if (lower.includes("testimonial") || lower.includes("customers")) {
    ids.push("features-4");
  }

  ids.push("cta-1", "footer-1");
  return ids;
}

export async function POST(request: Request) {
  const body = (await request.json()) as CloneRequest;

  if (!body.url) {
    return Response.json({ error: "A URL is required." }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(body.url);
  } catch {
    return Response.json({ error: "Enter a valid URL." }, { status: 400 });
  }

  const response = await fetch(target, { cache: "no-store" });
  const html = await response.text();
  const brandKit = normalizeBrandKit({
    companyName: target.hostname.replace(/^www\./, "").split(".")[0] || "Cloned Site",
    websiteTopic: "website inspired by a cloned layout",
    audience: "visitors from the source website",
    uniqueValue: "start from a recreated section order and customize the result visually",
  });
  const blueprintIds = inferBlueprintFlow(html);

  return Response.json({
    blueprintIds,
    sections: createCanvasSectionsFromBlueprintIds(blueprintIds, brandKit),
    brandKit,
    message: `Analysed ${target.hostname} and recreated a ${blueprintIds.length}-section starting layout.`,
  });
}
