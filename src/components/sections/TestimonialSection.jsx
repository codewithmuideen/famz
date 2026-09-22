import { Quote } from "lucide-react";
import ScrollReveal from "../common/ScrollReveal";
import { testimonials } from "../../constants/testimonials";

export default function TestimonialSection() {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-surface-cream py-16 sm:py-24">
      <div className="container-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
              Client Feedback
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-display text-ink font-semibold tracking-tight">
              Trusted Voices, Proven Impact
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-muted">
              Discover how our tailored advisory and accounting services empower UK businesses to thrive.
            </p>
          </div>

          {/* 3-Column Straight Line Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-ink/5 p-6 sm:p-7 lg:p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <Quote
                    className="mb-4 sm:mb-5 text-brand-gold opacity-80"
                    size={30}
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  <blockquote>
                    <p className="font-display text-sm sm:text-base leading-relaxed text-ink/90">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </blockquote>
                </div>

                <footer className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-ink/10">
                  <div className="font-semibold text-ink text-sm sm:text-base">
                    {item.author}
                  </div>
                  <div className="text-xs text-ink-muted mt-0.5">
                    {item.role}
                  </div>
                </footer>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}