const HEADING_CLASSES = {
  h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight",
  h2: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
  h3: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug",
  p: "text-base sm:text-lg md:text-xl leading-relaxed",
} as const;

const RESPONSIVE_HELPERS = [
  'function ResponsiveContainer({ children, className = "" }) {',
  "  return (",
  '    <div className={`w-full min-w-0 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl ${className}`}>',
  "      {children}",
  "    </div>",
  "  );",
  "}",
  "",
  'function ResponsiveGrid({ children, cols = { mobile: 1, tablet: 2, desktop: 3 }, gap = 6, className = "" }) {',
  '  const columnMap = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6" };',
  '  const gapMap = { 0: "gap-0", 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 5: "gap-5", 6: "gap-6", 7: "gap-7", 8: "gap-8", 9: "gap-9", 10: "gap-10", 11: "gap-11", 12: "gap-12" };',
  "  const classes = [columnMap[cols.mobile ?? 1]];",
  "  if ((cols.tablet ?? 2) !== (cols.mobile ?? 1)) classes.push(`sm:${columnMap[cols.tablet ?? 2]}`);",
  "  if ((cols.desktop ?? 3) !== (cols.tablet ?? 2)) classes.push(`lg:${columnMap[cols.desktop ?? 3]}`);",
  "  return (",
  '    <div className={`grid w-full min-w-0 [&>*]:min-w-0 ${classes.join(" ")} ${gapMap[gap] ?? gapMap[6]} ${className}`}>',
  "      {children}",
  "    </div>",
  "  );",
  "}",
  "",
  'function ResponsiveFlex({ children, direction = { mobile: "col", desktop: "row" }, align = "center", justify = "between", gap = 4, className = "" }) {',
  '  const alignMap = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch", baseline: "items-baseline" };',
  '  const justifyMap = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between", around: "justify-around", evenly: "justify-evenly" };',
  '  const gapMap = { 0: "gap-0", 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 5: "gap-5", 6: "gap-6", 7: "gap-7", 8: "gap-8", 9: "gap-9", 10: "gap-10", 11: "gap-11", 12: "gap-12" };',
  '  const directionClass = direction.mobile === "col" && direction.desktop === "row" ? "flex-col lg:flex-row" : direction.mobile === "row" && direction.desktop === "col" ? "flex-row lg:flex-col" : direction.mobile === "col" ? "flex-col" : "flex-row";',
  "  return (",
  '    <div className={`flex w-full min-w-0 flex-wrap [&>*]:min-w-0 ${directionClass} ${alignMap[align]} ${justifyMap[justify]} ${gapMap[gap] ?? gapMap[4]} ${className}`}>',
  "      {children}",
  "    </div>",
  "  );",
  "}",
  "",
  'function ResponsiveButton({ children, variant = "primary", size = "auto", fullWidthOnMobile = true, className = "", href, ...rest }) {',
  '  const sizeMap = { auto: "px-4 py-2 text-sm sm:px-6 sm:py-3 md:px-8 md:py-4 sm:text-base md:text-lg", sm: "px-3 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };',
  '  const variantMap = { primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20", outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50", ghost: "text-current hover:bg-black/5" };',
  '  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] ${sizeMap[size]} ${fullWidthOnMobile ? "w-full sm:w-auto" : "w-auto"} ${variantMap[variant]} ${className}`;',
  '  if (href) {',
  '    return <a href={href} className={classes} {...rest}>{children}</a>;',
  "  }",
  '  return <button type={rest.type ?? "button"} className={classes} {...rest}>{children}</button>;',
  "}",
  "",
  'function ResponsiveImage({ src, alt, aspectRatio = "16 / 9", className = "", imageClassName = "", sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw", srcSet, loading = "lazy" }) {',
  "  return (",
  '    <div className={`relative w-full overflow-hidden rounded-lg ${className}`}>',
  '      <div style={{ aspectRatio }} className="relative w-full">',
  '        <img src={src} alt={alt} srcSet={srcSet} sizes={sizes} loading={loading} decoding="async" className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`} />',
  "      </div>",
  "    </div>",
  "  );",
  "}",
  "",
  'function ResponsiveNav({ logo, links, cta, brandHref }) {',
  "  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);",
  "  const logoNode = logo;",
  "  return (",
  '    <nav className="sticky top-0 z-50 w-full border-b border-black/10 bg-white">',
  "      <ResponsiveContainer>",
  '        <div className="flex flex-col flex-wrap items-center justify-between gap-4 px-4 py-3 sm:flex-row">',
  '          <div className="shrink-0">{brandHref ? <a href={brandHref} className="inline-flex items-center">{logoNode}</a> : logoNode}</div>',
  '          <div className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-4 sm:flex lg:gap-8">{links.map((link) => <a key={link.href} href={link.href} className="whitespace-nowrap font-medium text-gray-700 transition-colors hover:text-black">{link.label}</a>)}</div>',
  '          <div className="hidden shrink-0 sm:block">{cta.href ? <ResponsiveButton href={cta.href} className="whitespace-nowrap">{cta.label}</ResponsiveButton> : <ResponsiveButton onClick={cta.onClick} className="whitespace-nowrap">{cta.label}</ResponsiveButton>}</div>',
  '          <button type="button" onClick={() => setMobileMenuOpen((value) => !value)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-900 transition-colors hover:bg-black/5 sm:hidden" aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>{mobileMenuOpen ? "Close" : "Menu"}</button>',
  "        </div>",
  "      </ResponsiveContainer>",
  "      {mobileMenuOpen ? (",
  '        <div className="border-t border-black/10 bg-white sm:hidden">',
  "          <ResponsiveContainer>",
  '            <div className="space-y-3 py-4">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-gray-700 transition-colors hover:text-black">{link.label}</a>)}{cta.href ? <ResponsiveButton href={cta.href}>{cta.label}</ResponsiveButton> : <ResponsiveButton onClick={cta.onClick}>{cta.label}</ResponsiveButton>}</div>',
  "          </ResponsiveContainer>",
  "        </div>",
  "      ) : null}",
  "    </nav>",
  "  );",
  "}",
].join("\n");

const unsafeBreakClass = "break" + "-all";
const unsafeWordBreakPattern = new RegExp(`word-break\\s*:\\s*${unsafeBreakClass};?`, "gi");
const unsafeWordBreakPropPattern = new RegExp(
  `\\bwordBreak\\s*:\\s*["'\`]${unsafeBreakClass}["'\`],?\\s*`,
  "g",
);
const unsafeBreakClassPattern = new RegExp(`\\b${unsafeBreakClass}\\b`, "g");

function stripCodeFences(value: string) {
  return value.replace(/```(?:tsx?|jsx?|javascript|typescript)?/gi, "").replace(/```/g, "").trim();
}

function stripImports(value: string) {
  return value.replace(/^\s*import\s+.*$/gm, "").trim();
}

function stripFixedInlineLayoutStyles(code: string) {
  return code
    .replace(/\sstyle="([^"]*)"/g, (_match, styles: string) => {
      const cleaned = styles
        .replace(/\b(?:width|height|min-width|min-height|max-width|max-height)\s*:\s*\d+px;?/gi, "")
        .replace(unsafeWordBreakPattern, "overflow-wrap: anywhere;")
        .replace(/\s+/g, " ")
        .trim();

      return cleaned ? ` style="${cleaned}"` : "";
    })
    .replace(/\sstyle=\{\{([^}]*)\}\}/g, (_match, styles: string) => {
      const cleaned = styles
        .replace(
          /\b(?:width|height|minWidth|minHeight|maxWidth|maxHeight)\s*:\s*["'`]\d+px["'`],?\s*/g,
          "",
        )
        .replace(unsafeWordBreakPropPattern, 'overflowWrap: "anywhere", ')
        .replace(/,\s*,/g, ",")
        .replace(/^\s*,|,\s*$/g, "")
        .trim();

      return cleaned ? ` style={{ ${cleaned} }}` : "";
    });
}

function stripFixedLayoutClasses(code: string) {
  return code
    .replace(unsafeBreakClassPattern, "break-words")
    .replace(/\bw-\[\d+px\]\b/g, "w-full")
    .replace(/\bmin-w-\[\d+px\]\b/g, "min-w-0")
    .replace(/\bmax-w-\[\d+px\]\b/g, "max-w-full")
    .replace(/\bh-\[\d+px\]\b/g, "h-auto")
    .replace(/\bmin-h-\[\d+px\]\b/g, "min-h-0")
    .replace(/\bmax-h-\[\d+px\]\b/g, "max-h-none");
}

function mergeClassName(attrs: string, addition: string) {
  const classNamePattern = /\bclassName\s*=\s*("([^"]*)"|'([^']*)'|{`([^`]*)`})/;
  const match = attrs.match(classNamePattern);

  if (!match) {
    return `${attrs} className="${addition}"`;
  }

  const existing = match[2] ?? match[3] ?? match[4] ?? "";
  const merged = Array.from(new Set(`${existing} ${addition}`.trim().split(/\s+/))).join(" ");

  if (match[2] !== undefined) {
    return attrs.replace(match[0], `className="${merged}"`);
  }

  if (match[3] !== undefined) {
    return attrs.replace(match[0], `className='${merged}'`);
  }

  return attrs.replace(match[0], `className={\`${merged}\`}`);
}

function transformOpeningTag(code: string, tagName: keyof typeof HEADING_CLASSES, addition: string) {
  const pattern = new RegExp(`<${tagName}\\b([^>]*)>`, "g");

  return code.replace(pattern, (_match, attrs: string) => `<${tagName}${mergeClassName(attrs, addition)}>`); // NOSONAR
}

function addResponsiveSections(code: string) {
  const sectionPattern = /<section\b([^>]*)>/g;

  return code.replace(sectionPattern, (_match, attrs: string) =>
    `<section${mergeClassName(
      attrs,
      "w-full overflow-x-hidden px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 xl:py-32",
    )}>`,
  );
}

function addResponsiveImages(code: string) {
  const imagePattern = /<img\b([^>]*)>/g;

  return code.replace(imagePattern, (_match, attrs: string) => {
    const nextAttrs = mergeClassName(attrs, "w-full h-auto object-cover");
    const withLoading = /\bloading=/.test(nextAttrs) ? nextAttrs : `${nextAttrs} loading="lazy"`;
    const withDecoding = /\bdecoding=/.test(withLoading) ? withLoading : `${withLoading} decoding="async"`;
    const withSizes = /\bsizes=/.test(withDecoding)
      ? withDecoding
      : `${withDecoding} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`;
    return `<img${withSizes}>`;
  });
}

function addResponsiveGrids(code: string) {
  return code
    .replace(/(?<!:)grid-cols-4\b/g, "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")
    .replace(/(?<!:)grid-cols-3\b/g, "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")
    .replace(/(?<!:)grid-cols-2\b/g, "grid-cols-1 sm:grid-cols-2");
}

function addResponsiveButtons(code: string) {
  const buttonPattern = /<button\b([^>]*)>/g;

  return code.replace(buttonPattern, (_match, attrs: string) =>
    `<button${mergeClassName(
      attrs,
      "w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg",
    )}>`,
  );
}

function addResponsiveTypography(code: string) {
  const withTextSafety = code.replace(/<(p|h1|h2|h3|h4|h5|h6)\b([^>]*)>/g, (_match, tagName, attrs: string) =>
    `<${tagName}${mergeClassName(
      attrs,
      "min-w-0 whitespace-normal break-words hyphens-none",
    )}>`,
  );

  return Object.entries(HEADING_CLASSES).reduce(
    (acc, [tagName, classes]) => transformOpeningTag(acc, tagName as keyof typeof HEADING_CLASSES, classes),
    withTextSafety,
  );
}

function injectPrelude(code: string) {
  if (code.includes("function ResponsiveContainer(")) {
    return code;
  }

  return `${RESPONSIVE_HELPERS}\n\n${code}`;
}

export function makeResponsive(html: string) {
  let transformed = stripCodeFences(html);
  transformed = stripImports(transformed);
  transformed = stripFixedInlineLayoutStyles(transformed);
  transformed = stripFixedLayoutClasses(transformed);
  transformed = addResponsiveSections(transformed);
  transformed = addResponsiveTypography(transformed);
  transformed = addResponsiveImages(transformed);
  transformed = addResponsiveGrids(transformed);
  transformed = addResponsiveButtons(transformed);
  transformed = transformed.replace(/\n{3,}/g, "\n\n");
  return injectPrelude(transformed);
}
