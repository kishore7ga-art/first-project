"use client";

import { useMemo, useState } from "react";
import { CornerDownLeft, LoaderCircle, Sparkles, X } from "lucide-react";
import {
  createCanvasSectionFromBlueprintId,
  deriveThemePatchFromBrandKit,
  normalizeBrandKit,
  personalizeCanvasSections,
} from "@/builder/contentEngine";
import { requestDraftFromPrompt } from "@/builder/draftApi";
import { useBuilderStore } from "@/store/useBuilderStore";
import { cn } from "@/lib/utils";

interface BuilderAssistantProps {
  open: boolean;
  onClose: () => void;
}

interface AssistantMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

export function BuilderAssistant({ open, onClose }: BuilderAssistantProps) {
  const projectName = useBuilderStore((state) => state.projectName);
  const brandKit = useBuilderStore((state) => state.brandKit);
  const canvasSections = useBuilderStore((state) => state.canvasSections);
  const replaceCanvasSections = useBuilderStore((state) => state.replaceCanvasSections);
  const updateTheme = useBuilderStore((state) => state.updateTheme);
  const updateBrandKit = useBuilderStore((state) => state.updateBrandKit);
  const setProjectName = useBuilderStore((state) => state.setProjectName);

  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "intro",
      role: "assistant",
      text: "Describe the page you want, ask for a visual direction, or tell me to add, swap, or regenerate sections with a fresh AI mix.",
    },
  ]);

  const normalizedBrandKit = useMemo(() => normalizeBrandKit(brandKit), [brandKit]);

  const appendMessage = (message: AssistantMessage) => {
    setMessages((current) => [...current, message]);
  };

  const runPrompt = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || isRunning) {
      return;
    }

    setErrorMessage("");
    setLastPrompt(trimmed);
    const lower = trimmed.toLowerCase();
    appendMessage({
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    });

    if (lower.includes("swap") && lower.includes("hero")) {
      const nextHeroId = lower.includes("minimal") ? "hero-5" : "hero-3";
      const heroIndex = canvasSections.findIndex((section) => section.type === "Hero");

      if (heroIndex === -1) {
        const nextSections = [...canvasSections];
        nextSections.splice(
          Math.min(1, nextSections.length),
          0,
          createCanvasSectionFromBlueprintId(nextHeroId, normalizedBrandKit),
        );
        replaceCanvasSections(nextSections);
      } else {
        const nextSections = [...canvasSections];
        nextSections.splice(
          heroIndex,
          1,
          createCanvasSectionFromBlueprintId(nextHeroId, normalizedBrandKit),
        );
        replaceCanvasSections(nextSections);
      }

      appendMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: `I swapped the hero to a ${nextHeroId === "hero-5" ? "minimal" : "more atmospheric"} direction.`,
      });
      setPrompt("");
      return;
    }

    if (lower.includes("add") && lower.includes("pricing")) {
      const featuresIndex = canvasSections.findIndex((section) => section.type === "Features");
      const nextSections = [...canvasSections];
      nextSections.splice(
        featuresIndex === -1 ? canvasSections.length : featuresIndex + 1,
        0,
        createCanvasSectionFromBlueprintId("pricing-2", normalizedBrandKit),
      );
      replaceCanvasSections(nextSections);

      appendMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: "I added a pricing section after the features block so the conversion path feels more complete.",
      });
      setPrompt("");
      return;
    }

    if (lower.includes("professional") || lower.includes("corporate")) {
      const nextBrandKit = normalizeBrandKit({ ...normalizedBrandKit, brandTone: "professional" });
      updateBrandKit({ brandTone: "professional" });
      updateTheme(deriveThemePatchFromBrandKit(nextBrandKit));
      replaceCanvasSections(personalizeCanvasSections(canvasSections, nextBrandKit));
      appendMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: "I tightened the page toward a more professional tone with clearer copy and a calmer theme direction.",
      });
      setPrompt("");
      return;
    }

    if (lower.includes("playful") || lower.includes("creative")) {
      const nextBrandKit = normalizeBrandKit({ ...normalizedBrandKit, brandTone: "playful" });
      updateBrandKit({ brandTone: "playful" });
      updateTheme(deriveThemePatchFromBrandKit(nextBrandKit));
      replaceCanvasSections(personalizeCanvasSections(canvasSections, nextBrandKit));
      appendMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: "I pushed the page toward a more playful direction with brighter styling and more expressive copy.",
      });
      setPrompt("");
      return;
    }

    if (lower.includes("dark") || lower.includes("bold")) {
      const nextTone = lower.includes("bold") ? "bold" : normalizedBrandKit.brandTone;
      const nextBrandKit = normalizeBrandKit({
        ...normalizedBrandKit,
        brandTone: nextTone,
      });
      updateBrandKit({ brandTone: nextTone });
      updateTheme({
        ...deriveThemePatchFromBrandKit(nextBrandKit),
        mode: "dark",
      });
      appendMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: "I shifted the site into a darker, stronger visual direction.",
      });
      setPrompt("");
      return;
    }

    if (
      lower.includes("rewrite") ||
      lower.includes("autofill") ||
      lower.includes("regenerate")
    ) {
      replaceCanvasSections(personalizeCanvasSections(canvasSections, normalizedBrandKit));
      appendMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: `I regenerated the section copy around ${normalizedBrandKit.websiteTopic} for ${normalizedBrandKit.audience}.`,
      });
      setPrompt("");
      return;
    }

    if (
      lower.includes("landing page") ||
      lower.includes("homepage") ||
      lower.includes("website for") ||
      lower.includes("site for") ||
      lower.startsWith("make me") ||
      lower.startsWith("build me") ||
      lower.startsWith("create a") ||
      lower.startsWith("generate a")
    ) {
      try {
        setIsRunning(true);
        const draft = await requestDraftFromPrompt(trimmed, normalizedBrandKit);
        setProjectName(draft.projectName);
        updateBrandKit(draft.brandKit);
        updateTheme(draft.themePatch);
        replaceCanvasSections(draft.sections);
        appendMessage({
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: draft.summary,
        });
      } catch (error) {
        console.error(error);
        setErrorMessage(
          "The AI provider hit a snag, so the builder kept your current page in place.",
        );
        appendMessage({
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: "I hit a problem generating that draft. The current page stayed intact, and you can try again with a shorter prompt.",
        });
      } finally {
        setIsRunning(false);
        setPrompt("");
      }

      return;
    }

    appendMessage({
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: "Try prompts like: build me a premium landing page for a fitness app, swap my hero to something minimal, add a pricing section after the features, or make my site look more professional.",
    });
    setPrompt("");
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-4 left-3 right-3 z-40 w-auto transition sm:bottom-24 sm:left-auto sm:right-6 sm:w-[min(92vw,420px)]",
        open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="pointer-events-auto overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Builder Assistant
            </div>
            <div className="mt-1 text-base font-semibold text-slate-900">
              Working on {projectName}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
            aria-label="Close builder assistant"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[360px] space-y-4 overflow-y-auto px-5 py-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "rounded-[22px] px-4 py-3 text-sm leading-6",
                message.role === "assistant"
                  ? "bg-slate-100 text-slate-700"
                  : "ml-8 bg-slate-900 text-white",
              )}
            >
              {message.role === "assistant" && (
                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Assistant
                </div>
              )}
              {message.text}
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 px-5 py-4">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-3">
            {errorMessage ? (
              <div className="mb-3 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                <div>{errorMessage}</div>
                {lastPrompt ? (
                  <button
                    type="button"
                    onClick={() => setPrompt(lastPrompt)}
                    className="mt-2 font-semibold text-rose-800 underline decoration-rose-300 underline-offset-2"
                  >
                    Restore last prompt
                  </button>
                ) : null}
              </div>
            ) : null}
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={3}
              className="w-full resize-none bg-transparent text-sm leading-6 text-slate-700 outline-none"
              placeholder="Make me a landing page for a fitness app..."
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Prompts can change layout, theme, section mix, or content.
              </div>
              <button
                type="button"
                onClick={() => void runPrompt()}
                disabled={isRunning}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-semibold text-white transition",
                  isRunning
                    ? "cursor-not-allowed bg-slate-500"
                    : "bg-slate-900 hover:bg-slate-800",
                )}
              >
                {isRunning ? (
                  <>
                    <LoaderCircle className="mr-2 inline h-4 w-4 animate-spin" />
                    Generating
                  </>
                ) : (
                  <>
                    <CornerDownLeft className="mr-2 inline h-4 w-4" />
                    Generate Website
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
