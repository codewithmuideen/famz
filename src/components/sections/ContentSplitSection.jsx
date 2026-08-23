import ImageReveal from "../common/ImageReveal";
import ScrollReveal from "../common/ScrollReveal";
import Button from "../common/Button";

/**
 * Asymmetric image + text editorial section. `reverse` flips image/text order.
 */
export default function ContentSplitSection({
  eyebrow,
  title,
  paragraphs = [],
  image,
  reverse = false,
  cta,
  tone = "light",
  bullets = [],
}) {
  const bg = tone === "dark" ? "bg-surface-dark" : "bg-surface-white";
  const titleColor = tone === "dark" ? "text-ink-inverse" : "text-ink";
  const textColor = tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted";

  return (
    <section className={`${bg} py-20 sm:py-28`}>
      <div className="container-page">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <ImageReveal
            src={image}
            alt=""
            effect={reverse ? "clip-left" : "clip-bottom"}
            className="aspect-[4/3] w-full"
          />
          <ScrollReveal className="flex flex-col gap-6">
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                {eyebrow}
              </span>
            )}
            <h2 className={`text-balance text-3xl leading-[1.1] sm:text-4xl ${titleColor}`}>
              {title}
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className={`leading-relaxed ${textColor}`}>
                {p}
              </p>
            ))}
            {bullets.length > 0 && (
              <ul className="flex flex-col gap-3 border-t border-line pt-6">
                {bullets.map((b) => (
                  <li key={b} className={`flex items-start gap-3 text-sm ${textColor}`}>
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <Button to={cta.to} variant={tone === "dark" ? "light" : "outline"} className="mt-2 w-fit">
                {cta.label}
              </Button>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
