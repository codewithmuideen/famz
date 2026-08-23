import ImageReveal from "./ImageReveal";
import Breadcrumb from "./Breadcrumb";
import ScrollReveal from "./ScrollReveal";

/**
 * Shared hero used across interior pages (Services, Industries, About, etc.).
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbItems = [],
}) {
  return (
    <section className="relative overflow-hidden bg-surface-dark pt-32 pb-20 sm:pt-40 sm:pb-28">
      {image && (
        <div className="absolute inset-0">
          <ImageReveal
            src={image}
            alt=""
            effect="fade"
            className="h-full w-full"
            hoverZoom={false}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/85 to-surface-dark/60" />
        </div>
      )}
      <div className="container-page relative flex flex-col gap-6">
        <Breadcrumb items={breadcrumbItems} tone="dark" />
        <ScrollReveal>
          <div className="max-w-3xl">
            {eyebrow && (
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
                {eyebrow}
              </span>
            )}
            <h1 className="text-balance text-4xl leading-[1.05] text-ink-inverse sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-inverse-muted">
                {description}
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
