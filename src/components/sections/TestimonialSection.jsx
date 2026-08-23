import { Quote } from "lucide-react";
import ScrollReveal from "../common/ScrollReveal";
import ImageReveal from "../common/ImageReveal";
import { testimonials } from "../../constants/testimonials";

export default function TestimonialSection() {
  const testimonial = testimonials[0];
  if (!testimonial) return null;

  return (
    <section className="bg-surface-cream py-20 sm:py-28">
      <div className="container-page">
        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-16">
            <ImageReveal
              src={testimonial.image}
              alt=""
              effect="scale"
              className="aspect-square w-full max-w-xs"
            />
            <div>
              <Quote className="mb-6 text-brand-gold" size={40} strokeWidth={1.25} aria-hidden="true" />
              <blockquote>
                <p className="text-balance font-display text-2xl leading-snug text-ink sm:text-3xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>
              <footer className="mt-6 text-sm text-ink-muted">
                <span className="font-medium text-ink">{testimonial.author}</span>
                {" — "}
                {testimonial.role}
              </footer>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
