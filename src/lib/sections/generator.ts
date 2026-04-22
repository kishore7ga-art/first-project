import { makeResponsive } from "@/lib/ai/responsiveTransformer";

type SectionCategory = string;

interface ColorDna {
  bg: string;
  p: string;
  t: string;
  s: string;
  h: string;
}

interface FontDna {
  h: string;
  b: string;
  w: string;
  sz: string;
  s: string;
}

interface GeneratedSection {
  code: string;
  hash: string;
  dna: {
    color: string;
    colorHex: string;
    font: string;
  };
}

const LAYOUTS = [
  "centered hero 96px display heading floating gradient orbs",
  "left text right glassmorphism card with dashboard screenshot",
  "full bleed background large product screenshot below headline",
  "50 50 split dark left text panel light right image panel",
  "bento grid one large card top-left four smaller cards rest",
  "horizontal row three feature cards icon title description",
  "stacked overlapping cards with z-depth shadow layers",
  "diagonal slant divider content above and below the slant",
  "floating UI elements absolutely positioned around headline",
  "editorial large image left text right column with pull quote",
  "terminal window code mockup with headline and CTA below",
  "timeline vertical center line items alternate left right",
  "masonry irregular grid five cards varying heights",
  "ultra minimal full width giant headline two buttons only",
  "dashboard stat cards and chart placeholder grid layout",
];

const COLORS: ColorDna[] = [
  { bg: "#000000", p: "#3B82F6", t: "#FFFFFF", s: "electric-blue", h: "#3B82F6" },
  { bg: "#0F172A", p: "#10B981", t: "#FFFFFF", s: "emerald-navy", h: "#10B981" },
  { bg: "#1C1C1E", p: "#F97316", t: "#FFFFFF", s: "dark-orange", h: "#F97316" },
  { bg: "#09090B", p: "#A855F7", t: "#FFFFFF", s: "purple-pink", h: "#A855F7" },
  { bg: "#FAFAF9", p: "#111111", t: "#000000", s: "light-minimal", h: "#EF4444" },
  { bg: "#052E16", p: "#84CC16", t: "#FFFFFF", s: "dark-green", h: "#84CC16" },
  { bg: "#0F172A", p: "#06B6D4", t: "#FFFFFF", s: "cyan-indigo", h: "#06B6D4" },
  { bg: "#0C0A09", p: "#F59E0B", t: "#FFFFFF", s: "luxury-gold", h: "#F59E0B" },
  { bg: "#1C1917", p: "#F43F5E", t: "#FFFFFF", s: "dark-rose", h: "#F43F5E" },
  { bg: "#0C4A6E", p: "#0EA5E9", t: "#FFFFFF", s: "sky-blue", h: "#0EA5E9" },
  {
    bg: "linear-gradient(135deg,#4F46E5,#7C3AED)",
    p: "#FFFFFF",
    t: "#FFFFFF",
    s: "purple-gradient",
    h: "#7C3AED",
  },
  { bg: "#000000", p: "#00FF41", t: "#00FF41", s: "terminal-green", h: "#00FF41" },
  { bg: "#FFFFFF", p: "#000000", t: "#000000", s: "newspaper", h: "#DC2626" },
  { bg: "#0A0A0F", p: "#818CF8", t: "#FFFFFF", s: "deep-space", h: "#818CF8" },
  { bg: "#18181B", p: "#FB923C", t: "#FFFFFF", s: "sunset-dark", h: "#FB923C" },
];

const ANIMATIONS = [
  "fadeInUp stagger children from bottom 0.1s delays @keyframes",
  "splitText each word slides in from alternating sides",
  "particles twenty dots float upward infinitely @keyframes float",
  "glitch heading digital flicker effect @keyframes clip-path",
  "morphBlob organic blob background shifts slowly @keyframes",
  "typewriter text appears character by character cursor blinks",
  "card3DTilt cards tilt in 3D perspective on mousemove",
  "gradientSpin border gradient rotates 360deg continuously",
  "countUp numbers animate zero to value on scroll trigger",
  "infiniteMarquee row scrolls left endlessly @keyframes",
  "cursorSpotlight bright circle follows cursor on dark bg",
  "breathePulse element scales 1 to 1.03 on infinite loop",
];

const FONTS: FontDna[] = [
  { h: "Inter", b: "Inter", w: "900", sz: "text-7xl", s: "ultra-bold" },
  { h: "Playfair Display", b: "Inter", w: "700", sz: "text-6xl", s: "elegant-serif" },
  { h: "JetBrains Mono", b: "Inter", w: "700", sz: "text-5xl", s: "monospace" },
  { h: "Space Grotesk", b: "DM Sans", w: "800", sz: "text-6xl", s: "geometric" },
  { h: "Syne", b: "Inter", w: "800", sz: "text-7xl", s: "editorial" },
  { h: "Outfit", b: "Inter", w: "800", sz: "text-6xl", s: "rounded" },
  { h: "Inter", b: "Inter", w: "900", sz: "text-8xl", s: "massive-display" },
  { h: "Raleway", b: "Inter", w: "700", sz: "text-5xl", s: "sophisticated" },
];

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeHash(layout: string, color: ColorDna, animation: string, font: FontDna) {
  return Buffer.from(`${layout.slice(0, 12)}${color.s}${animation.slice(0, 12)}${font.s}`)
    .toString("base64")
    .replace(/\W/g, "");
}

function cleanCode(value: string) {
  return value.replace(/```[a-z]*/gi, "").replace(/```/g, "").trim();
}

function buildPrompt({
  animation,
  category,
  color,
  font,
  layout,
}: {
  animation: string;
  category: SectionCategory;
  color: ColorDna;
  font: FontDna;
  layout: string;
}) {
  return `You are a world-class React and Tailwind CSS developer.
Build a single ${category} website section component.

DESIGN DNA - follow every detail exactly, zero exceptions:
Layout pattern: ${layout}
Page background: ${color.bg}
Primary accent color: ${color.p}
All text color: ${color.t}
Animation to implement: ${animation}
Heading font: ${font.h} weight ${font.w} size ${font.sz}
Body font: ${font.b}

TEN MANDATORY RULES:
1. Tailwind classes for layout. style={{}} for exact hex colors.
2. Include <style> JSX tag with all @keyframes for the animation.
3. Heroes: style={{minHeight:'100vh'}}. Others: minHeight:'70vh'.
4. Must look like a real premium funded startup website.
5. Real content about a SaaS tech product. Zero lorem ipsum.
6. Heading minimum ${font.sz} at desktop breakpoint.
7. At least 3 elements with hover: and transition: states.
8. Fully responsive using sm: md: lg: Tailwind breakpoints.
9. No grey placeholder boxes. Use real cards, icons, buttons, text.
10. Design must look completely unique, not a basic template.
11. Use ResponsiveContainer, ResponsiveGrid, ResponsiveFlex, ResponsiveButton, and ResponsiveImage whenever they simplify the layout.
12. Keep layouts mobile-first. Stack on phones, collapse grids, and avoid fixed-width desktop-only assumptions.
13. Typography and buttons should scale automatically across breakpoints, with full-width mobile CTAs by default.

Start response with exactly: export default function Section() {
Nothing before that line. No markdown. No imports. Just JSX.`;
}

async function callGemini(prompt: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 4096, temperature: 0.95 },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty section.");
  }

  return cleanCode(text);
}

async function callGroq(prompt: string) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4096,
      temperature: 0.95,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned an empty section.");
  }

  return cleanCode(text);
}

export async function generateUniqueSection(
  category: SectionCategory,
  usedHashes: string[] = [],
): Promise<GeneratedSection> {
  let layout = pick(LAYOUTS);
  let color = pick(COLORS);
  let animation = pick(ANIMATIONS);
  let font = pick(FONTS);
  let hash = makeHash(layout, color, animation, font);
  let tries = 0;

  while (usedHashes.includes(hash) && tries < 500) {
    layout = pick(LAYOUTS);
    color = pick(COLORS);
    animation = pick(ANIMATIONS);
    font = pick(FONTS);
    hash = makeHash(layout, color, animation, font);
    tries += 1;
  }

  const prompt = buildPrompt({ animation, category, color, font, layout });

  try {
    const code = makeResponsive(await callGemini(prompt));
    return {
      code,
      hash,
      dna: { color: color.s, colorHex: color.h, font: font.s },
    };
  } catch {
    const code = makeResponsive(await callGroq(prompt));
    return {
      code,
      hash,
      dna: { color: color.s, colorHex: color.h, font: font.s },
    };
  }
}
