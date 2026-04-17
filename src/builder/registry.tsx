import type { FC, ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Layers3,
  Sparkles,
  Star,
} from "lucide-react";
import type { PageAnchor } from "@/builder/navigation";
import { resolveSectionHref } from "@/builder/navigation";
import { EditableText } from "@/builder/components/EditableText";
import { cn } from "@/lib/utils";

export interface SectionProps {
  anchors?: PageAnchor[];
  data: Record<string, unknown>;
  updateData: (partial: Record<string, unknown>) => void;
  readOnly?: boolean;
}

function updateStringArray(items: string[], index: number, value: string) {
  return items.map((item, itemIndex) => (itemIndex === index ? value : item));
}

function updateObjectArray<T extends object>(
  items: T[],
  index: number,
  partial: Partial<T>,
) {
  return items.map((item, itemIndex) =>
    itemIndex === index ? { ...item, ...partial } : item,
  );
}

function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "builder-section border-b border-[var(--builder-border)] bg-[var(--builder-card)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}>
      {children}
    </div>
  );
}

function Eyebrow({
  value,
  onChange,
  readOnly = false,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="builder-pill inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
      <span className="h-2 w-2 rounded-full bg-[var(--builder-primary)]" />
      <EditableText value={value} onChange={onChange} readOnly={readOnly} />
    </div>
  );
}

function PrimaryButton({
  anchors = [],
  href,
  value,
  onChange,
  readOnly = false,
  icon = false,
}: {
  anchors?: PageAnchor[];
  href?: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  icon?: boolean;
}) {
  const resolvedHref = href ?? resolveSectionHref(value, anchors);

  if (readOnly) {
    const Element = resolvedHref ? "a" : "span";

    return (
      <Element
        {...(resolvedHref ? { href: resolvedHref } : {})}
        className="builder-primary-button inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
      >
        <span>{value}</span>
        {icon && <ArrowRight className="h-4 w-4" />}
      </Element>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => event.preventDefault()}
      className="builder-primary-button inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
    >
      <EditableText value={value} onChange={onChange} readOnly={readOnly} />
      {icon && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}

function SecondaryButton({
  anchors = [],
  href,
  value,
  onChange,
  readOnly = false,
}: {
  anchors?: PageAnchor[];
  href?: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  const resolvedHref = href ?? resolveSectionHref(value, anchors);

  if (readOnly) {
    const Element = resolvedHref ? "a" : "span";

    return (
      <Element
        {...(resolvedHref ? { href: resolvedHref } : {})}
        className="builder-secondary-button inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
      >
        <span>{value}</span>
      </Element>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => event.preventDefault()}
      className="builder-secondary-button inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
    >
      <EditableText value={value} onChange={onChange} readOnly={readOnly} />
    </button>
  );
}

function TextLink({
  className,
  fallbackIndex = 0,
  onChange,
  readOnly = false,
  tagName = "span",
  value,
  anchors = [],
}: {
  anchors?: PageAnchor[];
  className?: string;
  fallbackIndex?: number;
  onChange: (value: string) => void;
  readOnly?: boolean;
  tagName?: keyof React.JSX.IntrinsicElements;
  value: string;
}) {
  const href = resolveSectionHref(value, anchors, fallbackIndex);

  if (readOnly && href) {
    return (
      <a href={href} className={className}>
        {value}
      </a>
    );
  }

  return (
    <EditableText
      tagName={tagName}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={className}
    />
  );
}

function Heading({
  value,
  onChange,
  readOnly = false,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  className?: string;
}) {
  return (
    <EditableText
      tagName="h2"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={cn(
        "builder-heading text-4xl font-semibold leading-tight text-[var(--builder-foreground)] md:text-5xl",
        className,
      )}
    />
  );
}

function Body({
  value,
  onChange,
  readOnly = false,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  className?: string;
}) {
  return (
    <EditableText
      tagName="p"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={cn("text-base leading-7 text-[var(--builder-muted)]", className)}
    />
  );
}

function Hero1({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };

  return (
    <Section>
      <Container className="py-[var(--builder-section-space)] text-center">
        <Eyebrow
          value={content.eyebrow}
          onChange={(value) => updateData({ eyebrow: value })}
          readOnly={readOnly}
        />
        <EditableText
          tagName="h1"
          value={content.title}
          onChange={(value) => updateData({ title: value })}
          readOnly={readOnly}
          className="builder-heading mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1.04] text-[var(--builder-foreground)] md:text-7xl"
        />
        <Body
          value={content.subtitle}
          onChange={(value) => updateData({ subtitle: value })}
          readOnly={readOnly}
          className="mx-auto mt-6 max-w-2xl text-lg"
        />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton
            anchors={anchors}
            value={content.primaryCta}
            onChange={(value) => updateData({ primaryCta: value })}
            readOnly={readOnly}
            icon
          />
          <SecondaryButton
            anchors={anchors}
            value={content.secondaryCta}
            onChange={(value) => updateData({ secondaryCta: value })}
            readOnly={readOnly}
          />
        </div>
      </Container>
    </Section>
  );
}

function Hero2({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    statValue: string;
    statLabel: string;
    bulletPoints: string[];
  };

  return (
    <Section>
      <Container className="grid items-center gap-10 py-[var(--builder-section-space)] lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow
            value={content.eyebrow}
            onChange={(value) => updateData({ eyebrow: value })}
            readOnly={readOnly}
          />
          <EditableText
            tagName="h1"
            value={content.title}
            onChange={(value) => updateData({ title: value })}
            readOnly={readOnly}
            className="builder-heading mt-6 text-5xl font-semibold leading-[1.04] text-[var(--builder-foreground)] md:text-6xl"
          />
          <Body
            value={content.subtitle}
            onChange={(value) => updateData({ subtitle: value })}
            readOnly={readOnly}
            className="mt-6 max-w-2xl text-lg"
          />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton
              anchors={anchors}
              value={content.primaryCta}
              onChange={(value) => updateData({ primaryCta: value })}
              readOnly={readOnly}
            />
            <SecondaryButton
              anchors={anchors}
              value={content.secondaryCta}
              onChange={(value) => updateData({ secondaryCta: value })}
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="builder-card grid gap-5 p-6">
          <div className="rounded-[24px] bg-[var(--builder-soft)] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--builder-muted)]">
              Customer proof
            </div>
            <EditableText
              tagName="div"
              value={content.statValue}
              onChange={(value) => updateData({ statValue: value })}
              readOnly={readOnly}
              className="builder-heading mt-3 text-5xl font-semibold text-[var(--builder-foreground)]"
            />
            <Body
              value={content.statLabel}
              onChange={(value) => updateData({ statLabel: value })}
              readOnly={readOnly}
              className="mt-2"
            />
          </div>

          <div className="space-y-3">
            {content.bulletPoints.map((point, index) => (
              <div
                key={`${point}-${index}`}
                className="flex items-start gap-3 rounded-[22px] border border-[var(--builder-border)] bg-[var(--builder-card)] p-4"
              >
                <BadgeCheck className="mt-1 h-5 w-5 text-[var(--builder-primary)]" />
                <EditableText
                  tagName="p"
                  value={point}
                  onChange={(value) =>
                    updateData({
                      bulletPoints: updateStringArray(content.bulletPoints, index, value),
                    })
                  }
                  readOnly={readOnly}
                  className="text-sm leading-6 text-[var(--builder-muted)]"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Hero3({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    quote: string;
  };

  return (
    <Section className="bg-[linear-gradient(135deg,var(--builder-soft),var(--builder-card))]">
      <Container className="grid gap-10 py-[var(--builder-section-space)] lg:grid-cols-[1fr_0.72fr]">
        <div>
          <Eyebrow
            value={content.eyebrow}
            onChange={(value) => updateData({ eyebrow: value })}
            readOnly={readOnly}
          />
          <EditableText
            tagName="h1"
            value={content.title}
            onChange={(value) => updateData({ title: value })}
            readOnly={readOnly}
            className="builder-heading mt-6 max-w-3xl text-5xl font-semibold leading-[1.02] text-[var(--builder-foreground)] md:text-6xl"
          />
          <Body
            value={content.subtitle}
            onChange={(value) => updateData({ subtitle: value })}
            readOnly={readOnly}
            className="mt-6 max-w-2xl text-lg"
          />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton
              anchors={anchors}
              value={content.primaryCta}
              onChange={(value) => updateData({ primaryCta: value })}
              readOnly={readOnly}
            />
            <SecondaryButton
              anchors={anchors}
              value={content.secondaryCta}
              onChange={(value) => updateData({ secondaryCta: value })}
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="builder-card flex flex-col justify-between gap-6 p-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--builder-soft)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--builder-primary-strong)]">
            <Sparkles className="h-4 w-4" />
            Customer note
          </div>
          <EditableText
            tagName="p"
            value={content.quote}
            onChange={(value) => updateData({ quote: value })}
            readOnly={readOnly}
            className="builder-heading text-2xl leading-[1.45] text-[var(--builder-foreground)]"
          />
          <div className="rounded-[22px] bg-[var(--builder-soft)] p-4 text-sm leading-6 text-[var(--builder-muted)]">
            Refine the copy inline, then reuse the same theme controls across the
            rest of the page.
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Hero4({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: Array<{ value: string; label: string }>;
  };

  return (
    <Section>
      <Container className="py-[var(--builder-section-space)]">
        <div className="max-w-3xl">
          <Eyebrow
            value={content.eyebrow}
            onChange={(value) => updateData({ eyebrow: value })}
            readOnly={readOnly}
          />
          <EditableText
            tagName="h1"
            value={content.title}
            onChange={(value) => updateData({ title: value })}
            readOnly={readOnly}
            className="builder-heading mt-6 text-5xl font-semibold leading-[1.04] text-[var(--builder-foreground)] md:text-6xl"
          />
          <Body
            value={content.subtitle}
            onChange={(value) => updateData({ subtitle: value })}
            readOnly={readOnly}
            className="mt-6 max-w-2xl text-lg"
          />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton
              anchors={anchors}
              value={content.primaryCta}
              onChange={(value) => updateData({ primaryCta: value })}
              readOnly={readOnly}
            />
            <SecondaryButton
              anchors={anchors}
              value={content.secondaryCta}
              onChange={(value) => updateData({ secondaryCta: value })}
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="mt-12 grid gap-[var(--builder-grid-gap)] md:grid-cols-3">
          {content.metrics.map((metric, index) => (
            <div key={`${metric.label}-${index}`} className="builder-card p-6">
              <EditableText
                tagName="div"
                value={metric.value}
                onChange={(value) =>
                  updateData({
                    metrics: updateObjectArray(content.metrics, index, { value }),
                  })
                }
                readOnly={readOnly}
                className="builder-heading text-5xl font-semibold text-[var(--builder-foreground)]"
              />
              <EditableText
                tagName="p"
                value={metric.label}
                onChange={(value) =>
                  updateData({
                    metrics: updateObjectArray(content.metrics, index, { label: value }),
                  })
                }
                readOnly={readOnly}
                className="mt-3 text-sm leading-6 text-[var(--builder-muted)]"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Hero5({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
  };

  return (
    <Section>
      <Container className="py-[calc(var(--builder-section-space)_+_1rem)]">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow
            value={content.eyebrow}
            onChange={(value) => updateData({ eyebrow: value })}
            readOnly={readOnly}
          />
          <EditableText
            tagName="h1"
            value={content.title}
            onChange={(value) => updateData({ title: value })}
            readOnly={readOnly}
            className="builder-heading mt-6 text-5xl font-semibold leading-[1.06] text-[var(--builder-foreground)] md:text-6xl"
          />
          <Body
            value={content.subtitle}
            onChange={(value) => updateData({ subtitle: value })}
            readOnly={readOnly}
            className="mx-auto mt-6 max-w-2xl text-lg"
          />
          <div className="mt-10 flex justify-center">
            <PrimaryButton
              anchors={anchors}
              value={content.primaryCta}
              onChange={(value) => updateData({ primaryCta: value })}
              readOnly={readOnly}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Navbar1({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as { logo: string; links: string[]; cta: string };

  return (
    <Section className="py-4">
      <Container>
        <div className="flex flex-col gap-4 rounded-[24px] border border-[var(--builder-border)] bg-[var(--builder-card)] px-5 py-4 md:flex-row md:items-center md:justify-between">
          <EditableText
            value={content.logo}
            onChange={(value) => updateData({ logo: value })}
            readOnly={readOnly}
            className="builder-heading text-xl font-semibold text-[var(--builder-foreground)]"
          />
          <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-[var(--builder-muted)]">
            {content.links.map((link, index) => (
              <TextLink
                key={`${link}-${index}`}
                value={link}
                fallbackIndex={index}
                onChange={(value) =>
                  updateData({ links: updateStringArray(content.links, index, value) })
                }
                anchors={anchors}
                readOnly={readOnly}
                className="transition hover:text-[var(--builder-foreground)]"
              />
            ))}
          </div>
          <PrimaryButton
            anchors={anchors}
            value={content.cta}
            onChange={(value) => updateData({ cta: value })}
            readOnly={readOnly}
          />
        </div>
      </Container>
    </Section>
  );
}

function Navbar2({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    announcement: string;
    logo: string;
    links: string[];
    cta: string;
  };

  return (
    <Section className="py-4">
      <Container>
        <div className="rounded-[28px] border border-[var(--builder-border)] bg-[var(--builder-card)]">
          <div className="rounded-t-[28px] border-b border-[var(--builder-border)] bg-[var(--builder-soft)] px-5 py-3 text-center text-sm font-medium text-[var(--builder-primary-strong)]">
            <EditableText
              value={content.announcement}
              onChange={(value) => updateData({ announcement: value })}
              readOnly={readOnly}
            />
          </div>
          <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <EditableText
              value={content.logo}
              onChange={(value) => updateData({ logo: value })}
              readOnly={readOnly}
              className="builder-heading text-xl font-semibold text-[var(--builder-foreground)]"
            />
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-[var(--builder-muted)]">
              {content.links.map((link, index) => (
                <TextLink
                  key={`${link}-${index}`}
                  value={link}
                  fallbackIndex={index}
                  onChange={(value) =>
                    updateData({ links: updateStringArray(content.links, index, value) })
                  }
                  anchors={anchors}
                  readOnly={readOnly}
                  className="transition hover:text-[var(--builder-foreground)]"
                />
              ))}
            </div>
            <SecondaryButton
              anchors={anchors}
              value={content.cta}
              onChange={(value) => updateData({ cta: value })}
              readOnly={readOnly}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Navbar3({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    logo: string;
    links: string[];
    meta: string;
    cta: string;
  };

  return (
    <Section className="py-5">
      <Container>
        <div className="builder-soft-card flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--builder-primary)] text-white">
              <Star className="h-4 w-4" />
            </div>
            <EditableText
              value={content.logo}
              onChange={(value) => updateData({ logo: value })}
              readOnly={readOnly}
              className="builder-heading text-xl font-semibold text-[var(--builder-foreground)]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-[var(--builder-muted)]">
            {content.links.map((link, index) => (
              <TextLink
                key={`${link}-${index}`}
                value={link}
                fallbackIndex={index}
                onChange={(value) =>
                  updateData({ links: updateStringArray(content.links, index, value) })
                }
                anchors={anchors}
                readOnly={readOnly}
                className="transition hover:text-[var(--builder-foreground)]"
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--builder-border)] bg-[var(--builder-card)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--builder-muted)]">
              <EditableText
                value={content.meta}
                onChange={(value) => updateData({ meta: value })}
                readOnly={readOnly}
              />
            </span>
            <PrimaryButton
              anchors={anchors}
              value={content.cta}
              onChange={(value) => updateData({ cta: value })}
              readOnly={readOnly}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Features1({ data, updateData, readOnly = false }: SectionProps) {
  const content = data as {
    heading: string;
    subheading: string;
    features: Array<{ title: string; description: string }>;
  };

  return (
    <Section>
      <Container className="py-[var(--builder-section-space)]">
        <div className="max-w-3xl">
          <Heading
            value={content.heading}
            onChange={(value) => updateData({ heading: value })}
            readOnly={readOnly}
          />
          <Body
            value={content.subheading}
            onChange={(value) => updateData({ subheading: value })}
            readOnly={readOnly}
            className="mt-4 text-lg"
          />
        </div>

        <div className="mt-12 grid gap-[var(--builder-grid-gap)] md:grid-cols-3">
          {content.features.map((feature, index) => (
            <div key={`${feature.title}-${index}`} className="builder-card p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--builder-soft)] text-[var(--builder-primary)]">
                <Layers3 className="h-5 w-5" />
              </div>
              <EditableText
                tagName="h3"
                value={feature.title}
                onChange={(value) =>
                  updateData({
                    features: updateObjectArray(content.features, index, { title: value }),
                  })
                }
                readOnly={readOnly}
                className="builder-heading text-2xl font-semibold text-[var(--builder-foreground)]"
              />
              <EditableText
                tagName="p"
                value={feature.description}
                onChange={(value) =>
                  updateData({
                    features: updateObjectArray(content.features, index, {
                      description: value,
                    }),
                  })
                }
                readOnly={readOnly}
                className="mt-3 text-sm leading-6 text-[var(--builder-muted)]"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Features2({ data, updateData, readOnly = false }: SectionProps) {
  const content = data as {
    heading: string;
    intro: string;
    subheading: string;
    points: string[];
  };

  return (
    <Section>
      <Container className="grid gap-10 py-[var(--builder-section-space)] lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Heading
            value={content.heading}
            onChange={(value) => updateData({ heading: value })}
            readOnly={readOnly}
          />
          <Body
            value={content.intro}
            onChange={(value) => updateData({ intro: value })}
            readOnly={readOnly}
            className="mt-4 text-lg"
          />
          <Body
            value={content.subheading}
            onChange={(value) => updateData({ subheading: value })}
            readOnly={readOnly}
            className="mt-6"
          />
        </div>
        <div className="space-y-4">
          {content.points.map((point, index) => (
            <div
              key={`${point}-${index}`}
              className="builder-card flex items-start gap-4 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--builder-soft)] font-semibold text-[var(--builder-primary-strong)]">
                {index + 1}
              </div>
              <EditableText
                tagName="p"
                value={point}
                onChange={(value) =>
                  updateData({ points: updateStringArray(content.points, index, value) })
                }
                readOnly={readOnly}
                className="text-base leading-7 text-[var(--builder-foreground)]"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Features3({ data, updateData, readOnly = false }: SectionProps) {
  const content = data as {
    heading: string;
    subheading: string;
    highlights: Array<{ label: string; title: string; description: string }>;
  };

  return (
    <Section className="bg-[linear-gradient(180deg,var(--builder-card),var(--builder-soft))]">
      <Container className="py-[var(--builder-section-space)]">
        <div className="max-w-3xl">
          <Heading
            value={content.heading}
            onChange={(value) => updateData({ heading: value })}
            readOnly={readOnly}
          />
          <Body
            value={content.subheading}
            onChange={(value) => updateData({ subheading: value })}
            readOnly={readOnly}
            className="mt-4 text-lg"
          />
        </div>

        <div className="mt-12 grid gap-[var(--builder-grid-gap)] md:grid-cols-3">
          {content.highlights.map((highlight, index) => (
            <div
              key={`${highlight.label}-${index}`}
              className="builder-card flex flex-col gap-5 p-6"
            >
              <EditableText
                value={highlight.label}
                onChange={(value) =>
                  updateData({
                    highlights: updateObjectArray(content.highlights, index, {
                      label: value,
                    }),
                  })
                }
                readOnly={readOnly}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--builder-primary-strong)]"
              />
              <EditableText
                tagName="h3"
                value={highlight.title}
                onChange={(value) =>
                  updateData({
                    highlights: updateObjectArray(content.highlights, index, {
                      title: value,
                    }),
                  })
                }
                readOnly={readOnly}
                className="builder-heading text-2xl font-semibold text-[var(--builder-foreground)]"
              />
              <EditableText
                tagName="p"
                value={highlight.description}
                onChange={(value) =>
                  updateData({
                    highlights: updateObjectArray(content.highlights, index, {
                      description: value,
                    }),
                  })
                }
                readOnly={readOnly}
                className="text-sm leading-6 text-[var(--builder-muted)]"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Features4({ data, updateData, readOnly = false }: SectionProps) {
  const content = data as {
    heading: string;
    subheading: string;
    stats: Array<{ value: string; label: string; detail: string }>;
  };

  return (
    <Section>
      <Container className="py-[var(--builder-section-space)]">
        <div className="max-w-3xl">
          <Heading
            value={content.heading}
            onChange={(value) => updateData({ heading: value })}
            readOnly={readOnly}
          />
          <Body
            value={content.subheading}
            onChange={(value) => updateData({ subheading: value })}
            readOnly={readOnly}
            className="mt-4 text-lg"
          />
        </div>

        <div className="mt-12 grid gap-[var(--builder-grid-gap)] lg:grid-cols-3">
          {content.stats.map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              className="builder-card flex flex-col gap-3 p-6"
            >
              <EditableText
                tagName="div"
                value={stat.value}
                onChange={(value) =>
                  updateData({
                    stats: updateObjectArray(content.stats, index, { value }),
                  })
                }
                readOnly={readOnly}
                className="builder-heading text-5xl font-semibold text-[var(--builder-foreground)]"
              />
              <EditableText
                tagName="h3"
                value={stat.label}
                onChange={(value) =>
                  updateData({
                    stats: updateObjectArray(content.stats, index, { label: value }),
                  })
                }
                readOnly={readOnly}
                className="builder-heading text-xl font-semibold text-[var(--builder-foreground)]"
              />
              <EditableText
                tagName="p"
                value={stat.detail}
                onChange={(value) =>
                  updateData({
                    stats: updateObjectArray(content.stats, index, { detail: value }),
                  })
                }
                readOnly={readOnly}
                className="text-sm leading-6 text-[var(--builder-muted)]"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Pricing1({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    eyebrow: string;
    heading: string;
    subtitle: string;
    cards: Array<{
      name: string;
      price: string;
      description: string;
      cta: string;
      featured: boolean;
      features: string[];
    }>;
  };

  return (
    <Section>
      <Container className="py-[var(--builder-section-space)]">
        <div className="max-w-3xl text-center mx-auto">
          <Eyebrow
            value={content.eyebrow}
            onChange={(value) => updateData({ eyebrow: value })}
            readOnly={readOnly}
          />
          <Heading
            value={content.heading}
            onChange={(value) => updateData({ heading: value })}
            readOnly={readOnly}
            className="mt-6"
          />
          <Body
            value={content.subtitle}
            onChange={(value) => updateData({ subtitle: value })}
            readOnly={readOnly}
            className="mt-4 text-lg"
          />
        </div>

        <div className="mt-12 grid gap-[var(--builder-grid-gap)] lg:grid-cols-3">
          {content.cards.map((card, index) => (
            <div
              key={`${card.name}-${index}`}
              className={cn(
                "builder-card flex flex-col gap-6 p-6",
                card.featured && "bg-[var(--builder-soft)]",
              )}
            >
              <div>
                <EditableText
                  tagName="h3"
                  value={card.name}
                  onChange={(value) =>
                    updateData({
                      cards: updateObjectArray(content.cards, index, { name: value }),
                    })
                  }
                  readOnly={readOnly}
                  className="builder-heading text-2xl font-semibold text-[var(--builder-foreground)]"
                />
                <EditableText
                  tagName="div"
                  value={card.price}
                  onChange={(value) =>
                    updateData({
                      cards: updateObjectArray(content.cards, index, { price: value }),
                    })
                  }
                  readOnly={readOnly}
                  className="builder-heading mt-4 text-5xl font-semibold text-[var(--builder-foreground)]"
                />
                <EditableText
                  tagName="p"
                  value={card.description}
                  onChange={(value) =>
                    updateData({
                      cards: updateObjectArray(content.cards, index, {
                        description: value,
                      }),
                    })
                  }
                  readOnly={readOnly}
                  className="mt-3 text-sm leading-6 text-[var(--builder-muted)]"
                />
              </div>

              <PrimaryButton
                anchors={anchors}
                value={card.cta}
                onChange={(value) =>
                  updateData({
                    cards: updateObjectArray(content.cards, index, { cta: value }),
                  })
                }
                readOnly={readOnly}
              />

              <div className="space-y-3">
                {card.features.map((feature, featureIndex) => (
                  <div key={`${feature}-${featureIndex}`} className="flex gap-3">
                    <BadgeCheck className="mt-1 h-4 w-4 text-[var(--builder-primary)]" />
                    <EditableText
                      tagName="p"
                      value={feature}
                      onChange={(value) => {
                        const nextFeatures = updateStringArray(
                          card.features,
                          featureIndex,
                          value,
                        );
                        updateData({
                          cards: updateObjectArray(content.cards, index, {
                            features: nextFeatures,
                          }),
                        });
                      }}
                      readOnly={readOnly}
                      className="text-sm leading-6 text-[var(--builder-muted)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Pricing2({ data, updateData, readOnly = false }: SectionProps) {
  const content = data as {
    heading: string;
    subtitle: string;
    plans: Array<{
      name: string;
      price: string;
      audience: string;
      features: string[];
    }>;
  };

  return (
    <Section>
      <Container className="py-[var(--builder-section-space)]">
        <div className="max-w-3xl">
          <Heading
            value={content.heading}
            onChange={(value) => updateData({ heading: value })}
            readOnly={readOnly}
          />
          <Body
            value={content.subtitle}
            onChange={(value) => updateData({ subtitle: value })}
            readOnly={readOnly}
            className="mt-4 text-lg"
          />
        </div>

        <div className="mt-12 grid gap-[var(--builder-grid-gap)] md:grid-cols-2">
          {content.plans.map((plan, index) => (
            <div key={`${plan.name}-${index}`} className="builder-card p-6">
              <EditableText
                tagName="h3"
                value={plan.name}
                onChange={(value) =>
                  updateData({
                    plans: updateObjectArray(content.plans, index, { name: value }),
                  })
                }
                readOnly={readOnly}
                className="builder-heading text-3xl font-semibold text-[var(--builder-foreground)]"
              />
              <EditableText
                tagName="div"
                value={plan.price}
                onChange={(value) =>
                  updateData({
                    plans: updateObjectArray(content.plans, index, { price: value }),
                  })
                }
                readOnly={readOnly}
                className="builder-heading mt-4 text-5xl font-semibold text-[var(--builder-foreground)]"
              />
              <EditableText
                tagName="p"
                value={plan.audience}
                onChange={(value) =>
                  updateData({
                    plans: updateObjectArray(content.plans, index, { audience: value }),
                  })
                }
                readOnly={readOnly}
                className="mt-3 text-sm leading-6 text-[var(--builder-muted)]"
              />
              <div className="mt-6 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={`${feature}-${featureIndex}`} className="flex gap-3">
                    <BriefcaseBusiness className="mt-1 h-4 w-4 text-[var(--builder-primary)]" />
                    <EditableText
                      tagName="p"
                      value={feature}
                      onChange={(value) => {
                        const nextFeatures = updateStringArray(
                          plan.features,
                          featureIndex,
                          value,
                        );
                        updateData({
                          plans: updateObjectArray(content.plans, index, {
                            features: nextFeatures,
                          }),
                        });
                      }}
                      readOnly={readOnly}
                      className="text-sm leading-6 text-[var(--builder-muted)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Pricing3({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    heading: string;
    subtitle: string;
    planName: string;
    price: string;
    billing: string;
    cta: string;
    benefits: string[];
  };

  return (
    <Section className="bg-[linear-gradient(180deg,var(--builder-soft),var(--builder-card))]">
      <Container className="py-[var(--builder-section-space)]">
        <div className="mx-auto max-w-4xl text-center">
          <Heading
            value={content.heading}
            onChange={(value) => updateData({ heading: value })}
            readOnly={readOnly}
          />
          <Body
            value={content.subtitle}
            onChange={(value) => updateData({ subtitle: value })}
            readOnly={readOnly}
            className="mt-4 text-lg"
          />
        </div>

        <div className="builder-card mx-auto mt-12 max-w-2xl p-8 text-center">
          <EditableText
            tagName="h3"
            value={content.planName}
            onChange={(value) => updateData({ planName: value })}
            readOnly={readOnly}
            className="builder-heading text-3xl font-semibold text-[var(--builder-foreground)]"
          />
          <EditableText
            tagName="div"
            value={content.price}
            onChange={(value) => updateData({ price: value })}
            readOnly={readOnly}
            className="builder-heading mt-4 text-6xl font-semibold text-[var(--builder-foreground)]"
          />
          <Body
            value={content.billing}
            onChange={(value) => updateData({ billing: value })}
            readOnly={readOnly}
            className="mt-3"
          />
          <div className="mt-8 flex justify-center">
            <PrimaryButton
              anchors={anchors}
              value={content.cta}
              onChange={(value) => updateData({ cta: value })}
              readOnly={readOnly}
            />
          </div>

          <div className="mt-8 grid gap-3 text-left">
            {content.benefits.map((benefit, index) => (
              <div
                key={`${benefit}-${index}`}
                className="builder-soft-card flex items-start gap-3 px-4 py-3"
              >
                <BadgeCheck className="mt-1 h-4 w-4 text-[var(--builder-primary)]" />
                <EditableText
                  tagName="p"
                  value={benefit}
                  onChange={(value) =>
                    updateData({
                      benefits: updateStringArray(content.benefits, index, value),
                    })
                  }
                  readOnly={readOnly}
                  className="text-sm leading-6 text-[var(--builder-muted)]"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Cta1({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };

  return (
    <Section>
      <Container className="py-[var(--builder-section-space)]">
        <div className="builder-card mx-auto max-w-4xl px-8 py-10 text-center">
          <Eyebrow
            value={content.eyebrow}
            onChange={(value) => updateData({ eyebrow: value })}
            readOnly={readOnly}
          />
          <EditableText
            tagName="h2"
            value={content.title}
            onChange={(value) => updateData({ title: value })}
            readOnly={readOnly}
            className="builder-heading mt-6 text-4xl font-semibold text-[var(--builder-foreground)] md:text-5xl"
          />
          <Body
            value={content.subtitle}
            onChange={(value) => updateData({ subtitle: value })}
            readOnly={readOnly}
            className="mx-auto mt-4 max-w-2xl text-lg"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton
              anchors={anchors}
              value={content.primaryCta}
              onChange={(value) => updateData({ primaryCta: value })}
              readOnly={readOnly}
            />
            <SecondaryButton
              anchors={anchors}
              value={content.secondaryCta}
              onChange={(value) => updateData({ secondaryCta: value })}
              readOnly={readOnly}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Cta2({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    badge: string;
    title: string;
    subtitle: string;
    proof: string;
    primaryCta: string;
  };

  return (
    <Section className="bg-[var(--builder-foreground)] text-white">
      <Container className="grid gap-8 py-[var(--builder-section-space)] lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            <EditableText
              value={content.badge}
              onChange={(value) => updateData({ badge: value })}
              readOnly={readOnly}
            />
          </div>
          <EditableText
            tagName="h2"
            value={content.title}
            onChange={(value) => updateData({ title: value })}
            readOnly={readOnly}
            className="builder-heading mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl"
          />
          <EditableText
            tagName="p"
            value={content.subtitle}
            onChange={(value) => updateData({ subtitle: value })}
            readOnly={readOnly}
            className="mt-4 max-w-2xl text-lg leading-7 text-white/75"
          />
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <EditableText
            tagName="p"
            value={content.proof}
            onChange={(value) => updateData({ proof: value })}
            readOnly={readOnly}
            className="text-base leading-7 text-white/75"
          />
          <div className="mt-8">
            {readOnly ? (
              <a
                href={resolveSectionHref(content.primaryCta, anchors)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
              >
                <span>{content.primaryCta}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={(event) => event.preventDefault()}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
              >
                <EditableText
                  value={content.primaryCta}
                  onChange={(value) => updateData({ primaryCta: value })}
                  readOnly={readOnly}
                />
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Footer1({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    logo: string;
    tagline: string;
    groups: Array<{ title: string; links: string[] }>;
    copyright: string;
  };

  return (
    <Section className="bg-[var(--builder-soft)]">
      <Container className="py-[calc(var(--builder-section-space)_-_1rem)]">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,0.8fr)]">
          <div>
            <EditableText
              value={content.logo}
              onChange={(value) => updateData({ logo: value })}
              readOnly={readOnly}
              className="builder-heading text-2xl font-semibold text-[var(--builder-foreground)]"
            />
            <Body
              value={content.tagline}
              onChange={(value) => updateData({ tagline: value })}
              readOnly={readOnly}
              className="mt-4 max-w-sm"
            />
          </div>

          {content.groups.map((group, index) => (
            <div key={`${group.title}-${index}`}>
              <EditableText
                tagName="h4"
                value={group.title}
                onChange={(value) =>
                  updateData({
                    groups: updateObjectArray(content.groups, index, { title: value }),
                  })
                }
                readOnly={readOnly}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--builder-muted)]"
              />
              <div className="mt-4 space-y-3">
                {group.links.map((link, linkIndex) => (
                  <TextLink
                    key={`${link}-${linkIndex}`}
                    value={link}
                    fallbackIndex={linkIndex}
                    onChange={(value) => {
                      const nextLinks = updateStringArray(group.links, linkIndex, value);
                      updateData({
                        groups: updateObjectArray(content.groups, index, { links: nextLinks }),
                      });
                    }}
                    anchors={anchors}
                    readOnly={readOnly}
                    className="text-sm text-[var(--builder-foreground)] transition hover:text-[var(--builder-primary-strong)]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--builder-border)] pt-6 text-sm text-[var(--builder-muted)]">
          <EditableText
            value={content.copyright}
            onChange={(value) => updateData({ copyright: value })}
            readOnly={readOnly}
          />
        </div>
      </Container>
    </Section>
  );
}

function Footer2({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    logo: string;
    summary: string;
    links: string[];
    note: string;
  };

  return (
    <Section className="bg-[var(--builder-card)]">
      <Container className="py-[calc(var(--builder-section-space)_-_1.5rem)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <EditableText
              value={content.logo}
              onChange={(value) => updateData({ logo: value })}
              readOnly={readOnly}
              className="builder-heading text-2xl font-semibold text-[var(--builder-foreground)]"
            />
            <Body
              value={content.summary}
              onChange={(value) => updateData({ summary: value })}
              readOnly={readOnly}
              className="mt-4"
            />
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-medium text-[var(--builder-muted)]">
            {content.links.map((link, index) => (
              <TextLink
                key={`${link}-${index}`}
                value={link}
                fallbackIndex={index}
                onChange={(value) =>
                  updateData({ links: updateStringArray(content.links, index, value) })
                }
                anchors={anchors}
                readOnly={readOnly}
                className="transition hover:text-[var(--builder-foreground)]"
              />
            ))}
          </div>
        </div>
        <div className="mt-6 text-sm text-[var(--builder-muted)]">
          <EditableText
            value={content.note}
            onChange={(value) => updateData({ note: value })}
            readOnly={readOnly}
          />
        </div>
      </Container>
    </Section>
  );
}

function Footer3({ data, updateData, readOnly = false, anchors = [] }: SectionProps) {
  const content = data as {
    logo: string;
    summary: string;
    cta: string;
    columns: Array<{ title: string; links: string[] }>;
    copyright: string;
  };

  return (
    <Section className="bg-[var(--builder-soft)]">
      <Container className="py-[calc(var(--builder-section-space)_-_1rem)]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="max-w-md">
            <EditableText
              value={content.logo}
              onChange={(value) => updateData({ logo: value })}
              readOnly={readOnly}
              className="builder-heading text-2xl font-semibold text-[var(--builder-foreground)]"
            />
            <Body
              value={content.summary}
              onChange={(value) => updateData({ summary: value })}
              readOnly={readOnly}
              className="mt-4"
            />
            <div className="mt-6">
              <PrimaryButton
                anchors={anchors}
                value={content.cta}
                onChange={(value) => updateData({ cta: value })}
                readOnly={readOnly}
              />
            </div>
          </div>

          {content.columns.map((column, index) => (
            <div key={`${column.title}-${index}`}>
              <EditableText
                tagName="h4"
                value={column.title}
                onChange={(value) =>
                  updateData({
                    columns: updateObjectArray(content.columns, index, { title: value }),
                  })
                }
                readOnly={readOnly}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--builder-muted)]"
              />
              <div className="mt-4 space-y-3">
                {column.links.map((link, linkIndex) => (
                  <TextLink
                    key={`${link}-${linkIndex}`}
                    value={link}
                    fallbackIndex={linkIndex}
                    onChange={(value) => {
                      const nextLinks = updateStringArray(column.links, linkIndex, value);
                      updateData({
                        columns: updateObjectArray(content.columns, index, {
                          links: nextLinks,
                        }),
                      });
                    }}
                    anchors={anchors}
                    readOnly={readOnly}
                    className="text-sm text-[var(--builder-foreground)] transition hover:text-[var(--builder-primary-strong)]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--builder-border)] pt-6 text-sm text-[var(--builder-muted)]">
          <EditableText
            value={content.copyright}
            onChange={(value) => updateData({ copyright: value })}
            readOnly={readOnly}
          />
        </div>
      </Container>
    </Section>
  );
}

export const Registry: Record<string, FC<SectionProps>> = {
  "navbar-1": Navbar1,
  "navbar-2": Navbar2,
  "navbar-3": Navbar3,
  "hero-1": Hero1,
  "hero-2": Hero2,
  "hero-3": Hero3,
  "hero-4": Hero4,
  "hero-5": Hero5,
  "features-1": Features1,
  "features-2": Features2,
  "features-3": Features3,
  "features-4": Features4,
  "pricing-1": Pricing1,
  "pricing-2": Pricing2,
  "pricing-3": Pricing3,
  "cta-1": Cta1,
  "cta-2": Cta2,
  "footer-1": Footer1,
  "footer-2": Footer2,
  "footer-3": Footer3,
};
