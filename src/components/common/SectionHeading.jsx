import ScrollReveal from "./ScrollReveal";

/**
 * Editorial section heading: small eyebrow + large heading + optional supporting copy.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
}) {
  const alignClasses = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const eyebrowTone = tone === "dark" ? "text-brand-gold-light" : "text-brand-gold";
  const titleTone = tone === "dark" ? "text-ink-inverse" : "text-ink";
  const descTone = tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted";

  return (
    <ScrollReveal>
      <div className={`flex max-w-2xl flex-col gap-4 ${alignClasses} ${className}`}>
        {eyebrow && (
          <span
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowTone}`}
          >
            {eyebrow}
          </span>
        )}
        <h2
          className={`text-balance text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${titleTone}`}
        >
          {title}
        </h2>
        {description && (
          <p className={`text-balance text-base leading-relaxed sm:text-lg ${descTone}`}>
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
