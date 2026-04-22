import { availableSections } from "@/builder/libraryData";
import { makeResponsive } from "@/lib/ai/responsiveTransformer";
import { selectSectionById } from "@/lib/supabaseRest";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderFallbackHtml(sectionId: string) {
  const section = availableSections.find((item) => item.id === sectionId);
  const name = section?.name ?? "Generated Section";
  const category = section?.type ?? "Section";

  return `<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://cdn.tailwindcss.com"></script>
<style>*{margin:0;padding:0;box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}body{overflow-x:hidden;overflow-y:auto;font-family:Inter,Arial,sans-serif}img,video,iframe{max-width:100%;height:auto}</style>
</head><body>
<section class="min-h-screen bg-[#09090B] text-white flex items-center justify-center p-16">
  <div class="max-w-4xl text-center">
    <div class="inline-flex rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-200">${escapeHtml(category)}</div>
    <h1 class="mt-8 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">${escapeHtml(name)}</h1>
    <p class="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg md:text-xl">${escapeHtml(section?.description ?? "A premium marketplace section ready for the builder canvas.")}</p>
    <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">Brand DNA</div>
      <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">Responsive</div>
      <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">Editable</div>
    </div>
  </div>
</section>
</body></html>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sectionId: string }> },
) {
  const { sectionId } = await params;

  try {
    const data = await selectSectionById(sectionId);

    if (!data?.code) {
      return new Response(renderFallbackHtml(sectionId), {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "public,max-age=3600",
        },
      });
    }

    const rawCode = data.code.replace(/^export\s+default\s+/m, "");
    const code = rawCode.includes("function ResponsiveContainer(")
      ? rawCode
      : makeResponsive(rawCode);
    const html = `<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700&family=Space+Grotesk:wght@700;800&family=Syne:wght@700;800&family=JetBrains+Mono:wght@700&family=Outfit:wght@700;800&family=Raleway:wght@700&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}body{overflow-x:hidden;overflow-y:auto}img,video,iframe{max-width:100%;height:auto}</style>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head><body><div id="root"></div>
<script type="text/babel">
${code}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Section));
</script></body></html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public,max-age=3600",
      },
    });
  } catch (error) {
    console.error("Preview failed", error);
    return new Response(renderFallbackHtml(sectionId), {
      headers: { "Content-Type": "text/html" },
    });
  }
}
