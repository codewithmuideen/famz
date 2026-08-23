import ImageReveal from "../common/ImageReveal";
import ScrollReveal from "../common/ScrollReveal";

/**
 * Generic editorial image card — used for locations, culture, and gallery-style grids.
 */
export default function ImageCard({ image, title, description, index = 0, tag }) {
  return (
    <ScrollReveal delay={index * 0.06} className="h-full">
      <div className="flex h-full flex-col gap-4">
        <div className="relative">
          <ImageReveal src={image} alt="" effect="scale" className="aspect-[4/3] w-full" />
          {tag && (
            <span className="absolute left-4 top-4 rounded-full bg-surface-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-navy">
              {tag}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg text-ink">{title}</h3>
          {description && (
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{description}</p>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
