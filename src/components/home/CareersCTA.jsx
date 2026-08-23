import ImageReveal from "../common/ImageReveal";
import ScrollReveal from "../common/ScrollReveal";
import Button from "../common/Button";

export default function CareersCTA() {
  return (
    <section className="relative overflow-hidden bg-surface-dark py-24 sm:py-32">
      <div className="absolute inset-0">
        <ImageReveal
          src="careers-brainstorm"
          alt=""
          effect="fade"
          className="h-full w-full"
          hoverZoom={false}
        />
        <div className="absolute inset-0 bg-brand-navy-dark/70" />
      </div>
      <div className="container-page relative">
        <ScrollReveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
            Careers
          </span>
          <h2 className="text-balance text-3xl leading-[1.1] text-ink-inverse sm:text-4xl lg:text-5xl">
            Build your career with a firm that invests in you
          </h2>
          <p className="text-balance text-lg leading-relaxed text-ink-inverse-muted">
            We're a small, technology-driven team that gives people real client exposure early —
            with structured support toward ACCA qualification.
          </p>
          <Button to="/careers" variant="secondary" size="lg" className="mt-2">
            View open roles
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
