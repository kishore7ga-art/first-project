import { generateUniqueSection } from "../src/lib/sections/generator";
import { insertSection, selectSectionHashes } from "../src/lib/supabaseRest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) {
    return;
  }

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    if (!key || process.env[key]) {
      continue;
    }

    process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
  }
}

loadEnvLocal();

const QUEUE = [
  ...Array(12).fill("hero"),
  ...Array(10).fill("features"),
  ...Array(8).fill("pricing"),
  ...Array(8).fill("testimonials"),
  ...Array(6).fill("navbar"),
  ...Array(8).fill("cta"),
  ...Array(6).fill("footer"),
  ...Array(6).fill("stats"),
  ...Array(4).fill("logos"),
  ...Array(6).fill("faq"),
  ...Array(4).fill("team"),
  ...Array(4).fill("blog"),
  ...Array(4).fill("contact"),
  ...Array(6).fill("background"),
  ...Array(4).fill("timeline"),
  ...Array(4).fill("gallery"),
];

async function seed() {
  const used = await selectSectionHashes();
  let ok = 0;

  for (let index = 0; index < QUEUE.length; index += 1) {
    const category = QUEUE[index];
    process.stdout.write(`[${index + 1}/${QUEUE.length}] ${category}... `);

    try {
      const result = await generateUniqueSection(category, used);
      used.push(result.hash);
      await insertSection({
        name: `${category} - ${result.dna.color} ${result.dna.font}`,
        category,
        code: result.code,
        dna_hash: result.hash,
        dna_color: result.dna.color,
        dna_color_hex: result.dna.colorHex,
        dna_font: result.dna.font,
        is_free: true,
        ai_generated: true,
      });
      ok += 1;
      console.log("ok");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.log(`failed: ${message}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 4200));
  }

  console.log(`Done. ${ok} sections generated.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
