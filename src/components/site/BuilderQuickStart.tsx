"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const starterPrompts = [
  "Make me a landing page for a fitness app",
  "Build me a bold website for a coffee brand",
  "Make me a minimal portfolio website for a designer",
] as const;

export function BuilderQuickStart() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>(starterPrompts[0]);

  const launchBuilder = (nextPrompt: string) => {
    const trimmed = nextPrompt.trim();

    if (!trimmed) {
      return;
    }

    startTransition(() => {
      router.push(`/builder?prompt=${encodeURIComponent(trimmed)}`);
    });
  };

  return (
    <div className="rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_100%)] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            <Sparkles className="h-3.5 w-3.5" />
            Build a site inside Nexus
          </div>
          <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
            Describe the website you want and jump straight into the builder.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
            Use your own idea, start from one of the presets, and let the builder open with
            a matching website draft already prepared.
          </p>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/8 p-5 backdrop-blur sm:p-6">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
              Website prompt
            </span>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={4}
              className="mt-3 w-full resize-none rounded-[24px] border border-white/10 bg-slate-950/35 px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/40 focus:border-white/20 focus:bg-slate-950/45"
              placeholder="Make me a landing page for..."
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-2">
            {starterPrompts.map((starterPrompt) => (
              <button
                key={starterPrompt}
                type="button"
                onClick={() => setPrompt(starterPrompt)}
                className={cn(
                  "rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition",
                  prompt === starterPrompt
                    ? "bg-white text-slate-950"
                    : "bg-white/10 text-white/75 hover:bg-white/16 hover:text-white",
                )}
              >
                {starterPrompt.replace(/^Make me a |^Build me a /i, "")}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-white/65">
              The builder will generate a draft, theme direction, and starter sections.
            </p>
            <button
              type="button"
              onClick={() => launchBuilder(prompt)}
              className={buttonVariants({
                className:
                  "h-11 rounded-full bg-white px-5 text-slate-950 hover:bg-slate-100",
              })}
            >
              Build this website
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
