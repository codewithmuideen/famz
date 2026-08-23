import ScrollReveal from "../common/ScrollReveal";
import Button from "../common/Button";

export default function CTASection({
  eyebrow = "Let's talk",
  title = "Let's talk about your finances and your future.",
  description = "Whether you need support with your accounts and tax compliance or require a strategic finance partner to help you or your business grow, our team is here to help.",
  ctaLabel = "Get in touch",
  ctaTo = "/contact",
  tone = "dark",
}) {
  const bg = tone === "dark" ? "bg-surface-dark" : "bg-surface-cream";
  const titleColor = tone === "dark" ? "text-ink-inverse" : "text-ink";
  const descColor = tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted";

  return (
    <section className={`${bg} py-20 sm:py-28`}>
      <div className="container-page">
        <ScrollReveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            {eyebrow}
          </span>
          <h2 className={`text-balance text-3xl leading-[1.1] sm:text-4xl lg:text-5xl ${titleColor}`}>
            {title}
          </h2>
          <p className={`text-balance text-base leading-relaxed sm:text-lg ${descColor}`}>
            {description}
          </p>
          <Button to={ctaTo} variant="secondary" size="lg" className="mt-2">
            {ctaLabel}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
