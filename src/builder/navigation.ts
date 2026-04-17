import type { CanvasSection, SectionType } from "@/builder/types";

export interface PageAnchor {
  id: string;
  index: number;
  label: string;
  sectionId: string;
  type: SectionType;
}

export function buildSectionAnchors(
  sections: Array<Pick<CanvasSection, "id" | "name" | "type">>,
) {
  const counts = new Map<SectionType, number>();

  return sections.map((section, index) => {
    const count = (counts.get(section.type) ?? 0) + 1;
    counts.set(section.type, count);

    return {
      id: `${section.type.toLowerCase()}-${count}`,
      index,
      label: section.name,
      sectionId: section.id,
      type: section.type,
    } satisfies PageAnchor;
  });
}

function firstMatchingAnchor(anchors: PageAnchor[], types: SectionType[]) {
  return anchors.find((anchor) => types.includes(anchor.type));
}

export function resolveSectionHref(
  label: string,
  anchors: PageAnchor[],
  fallbackIndex = 0,
) {
  const targets = anchors.filter((anchor) => anchor.type !== "Navbar");

  if (targets.length === 0) {
    return undefined;
  }

  const normalized = label.trim().toLowerCase();

  if (!normalized) {
    return `#${targets[Math.min(fallbackIndex, targets.length - 1)].id}`;
  }

  const directTypeMatch =
    (/(pricing|plan|plans|quote|cost)/.test(normalized) &&
      firstMatchingAnchor(targets, ["Pricing", "CTA", "Footer"])) ||
    (/(preview|watch|example|examples|browse|feature|features|overview|product|solution|service|process|work|story)/.test(
      normalized,
    ) &&
      firstMatchingAnchor(targets, ["Features", "Hero", "Pricing"])) ||
    (/(contact|company|about|support|resource|resources|newsletter|community|privacy|terms|status|help|twitter|sales|demo|book|talk)/.test(
      normalized,
    ) &&
      firstMatchingAnchor(targets, ["Footer", "CTA", "Pricing"])) ||
    (/(start|build|get|launch|trial|draft|create|free|open|join)/.test(normalized) &&
      firstMatchingAnchor(targets, ["CTA", "Pricing", "Footer"])) ||
    (/(home)/.test(normalized) && targets[0]);

  if (directTypeMatch) {
    return `#${directTypeMatch.id}`;
  }

  const fallbackTarget = targets[Math.min(fallbackIndex, targets.length - 1)] ?? targets[0];
  return `#${fallbackTarget.id}`;
}
