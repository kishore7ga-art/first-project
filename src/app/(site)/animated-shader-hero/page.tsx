"use client";

import { useRouter } from "next/navigation";
import Hero from "@/components/ui/animated-shader-hero";

export default function AnimatedShaderHeroDemoPage() {
  const router = useRouter();

  return (
    <div className="bg-black text-white">
      <Hero
        trustBadge={{
          text: "Trusted by forward-thinking teams.",
        }}
        headline={{
          line1: "Launch Your",
          line2: "Workflow Into Orbit",
        }}
        subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams - fast, seamless, and limitless."
        buttons={{
          primary: {
            text: "Get Started for Free",
            onClick: () => router.push("/builder/demo-project"),
          },
          secondary: {
            text: "Explore Features",
            onClick: () => router.push("/marketplace"),
          },
        }}
      />

      <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            How to use the hero component
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Pass a badge, two headline lines, a subtitle, and optional button handlers.
            The shader background runs on the client and the content stays responsive on
            desktop and mobile.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-zinc-300">
            <pre>{`<Hero
  trustBadge={{ text: "Trusted by forward-thinking teams." }}
  headline={{ line1: "Launch Your", line2: "Workflow Into Orbit" }}
  subtitle="Supercharge productivity..."
  buttons={{
    primary: { text: "Get Started", onClick: () => {} },
    secondary: { text: "Explore Features", onClick: () => {} }
  }}
/>`}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}
