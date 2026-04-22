import { generateUniqueSection } from "@/lib/sections/generator";
import { insertSection, selectSectionHashes } from "@/lib/supabaseRest";

export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const cats = [
    "hero",
    "features",
    "pricing",
    "testimonials",
    "cta",
    "footer",
    "stats",
    "logos",
    "faq",
    "background",
  ];
  const used = await selectSectionHashes();
  let generated = 0;

  for (const category of cats) {
    try {
      const result = await generateUniqueSection(category, used);
      used.push(result.hash);
      await insertSection({
        name: `${category} ${result.dna.color} ${result.dna.font}`,
        category,
        code: result.code,
        dna_hash: result.hash,
        dna_color: result.dna.color,
        dna_color_hex: result.dna.colorHex,
        dna_font: result.dna.font,
        is_free: true,
        ai_generated: true,
      });
      generated += 1;
    } catch (error) {
      console.error(`Cron generation failed for ${category}`, error);
    }

    await new Promise((resolve) => setTimeout(resolve, 4200));
  }

  return Response.json({ generated, total: used.length });
}
