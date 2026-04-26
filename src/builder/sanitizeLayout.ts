import type { CanvasSection } from "@/builder/types";

const fixedWidthClassPattern = /\b(?:w|min-w|max-w)-\[\d+px\]\b/g;
const fixedHeightClassPattern = /\b(?:h|min-h|max-h)-\[\d+px\]\b/g;
const fixedGridClassPattern = /\b(?<!:)grid-cols-(2|3|4|5|6)\b/g;
const unsafeBreakClass = "break" + "-all";
const fixedStyleDeclarationPattern =
  /\b(?:width|height|min-width|min-height|max-width|max-height)\s*:\s*\d+px;?/gi;
const unsafeWordBreakPattern = new RegExp(`word-break\\s*:\\s*${unsafeBreakClass};?`, "gi");
const unsafeBreakClassPattern = new RegExp(`\\b${unsafeBreakClass}\\b`, "g");

export function sanitizeClassName(value: string) {
  return value
    .replace(unsafeBreakClassPattern, "break-normal overflow-wrap-anywhere whitespace-normal hyphens-none")
    .replace(fixedWidthClassPattern, (match) => {
      if (match.startsWith("min-w")) return "min-w-0 flex-1";
      if (match.startsWith("max-w")) return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
      return "w-full";
    })
    .replace(fixedHeightClassPattern, "h-auto")
    .replace(fixedGridClassPattern, (_match, count: string) => {
      if (count === "2") return "grid-cols-1 sm:grid-cols-2";
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    })
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeStyleAttribute(value: string) {
  return value
    .replace(unsafeWordBreakPattern, "word-break: normal; overflow-wrap: break-word;")
    .replace(fixedStyleDeclarationPattern, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeString(value: string) {
  let result = value;

  // If the string looks like an HTML tag with inline styles
  if (/style="[^"]*(?:width|height|min-width|min-height|max-width|max-height)\s*:\s*\d+px/i.test(result)) {
    // Add class="w-full" or append to existing class
    if (/class(?:Name)?="/i.test(result)) {
      result = result.replace(/(class(?:Name)?=")([^"]*)(")/i, "$1$2 w-full flex-1 min-w-0$3");
    } else {
      result = result.replace(/(style="[^"]*")/i, 'class="w-full flex-1 min-w-0" $1');
    }
  }

  if (
    new RegExp(
      `(?:class(?:Name)?=|style=|\\b${unsafeBreakClass}\\b|\\bgrid-cols-[2-6]\\b|\\b(?:w|min-w|max-w|h|min-h|max-h)-\\[\\d+px\\]\\b|word-break\\s*:|width\\s*:|height\\s*:)`,
      "i",
    ).test(result)
  ) {
    return sanitizeClassName(sanitizeStyleAttribute(result));
  }

  return result;
}

export function sanitizeResponsiveLayoutValue<T>(value: T): T {
  if (typeof value === "string") {
    return sanitizeString(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeResponsiveLayoutValue(item)) as T;
  }

  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    let addedClasses = "";

    if (Object.prototype.hasOwnProperty.call(value, "style")) {
      const entry = (value as any).style;
      if (entry && typeof entry === "object" && !Array.isArray(entry)) {
        next["style"] = Object.fromEntries(
          Object.entries(entry).filter(([styleKey, styleValue]) => {
            const isWidth = /^(width|minWidth|maxWidth)$/.test(styleKey);
            const isHeight = /^(height|minHeight|maxHeight)$/.test(styleKey);
            const isFixed = typeof styleValue === "string" && /^\d+px$/i.test(styleValue);
            
            if (isWidth && isFixed) {
              addedClasses += " w-full flex-1 min-w-0";
              return false;
            }
            if (isHeight && isFixed) {
              addedClasses += " h-auto";
              return false;
            }
            return true;
          }),
        );
      } else {
        next["style"] = entry;
      }
    }

    for (const [key, entry] of Object.entries(value)) {
      if (key === "style") continue;

      if (key === "className" || key === "class") {
        next[key] = typeof entry === "string" ? sanitizeClassName(entry) : entry;
        continue;
      }

      next[key] = sanitizeResponsiveLayoutValue(entry);
    }

    if (addedClasses) {
      const classKey = Object.prototype.hasOwnProperty.call(value, "className") ? "className" : "class";
      const existing = next[classKey];
      if (typeof existing === "string") {
        next[classKey] = sanitizeClassName(existing + addedClasses);
      } else if (!existing) {
        next[classKey] = sanitizeClassName(addedClasses);
      }
    }

    return next as T;
  }

  return value;
}

export function sanitizeCanvasSection(section: CanvasSection): CanvasSection {
  return {
    ...section,
    data: sanitizeResponsiveLayoutValue(section.data),
  };
}
