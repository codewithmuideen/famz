import { CheckCircle2 } from "lucide-react";
import ImageReveal from "../common/ImageReveal";
import ScrollReveal from "../common/ScrollReveal";
import { founder } from "../../constants/founder";
import { useSiteContent } from "../../hooks/useSiteContent";

const defaults = {
  name: founder.name,
  title: founder.title,
  image: founder.image,
  intro: founder.intro,
  approachHeading: founder.approach.heading,
  approachParagraphs: founder.approach.paragraphs,
  expertiseHeading: founder.expertise.heading,
  expertiseItems: founder.expertise.items,
  philosophyHeading: founder.philosophy.heading,
  philosophyParagraphs: founder.philosophy.paragraphs,
};

export default function FounderBio() {
  const { content: f } = useSiteContent("about-us", "founder", defaults);

  return (
    <section className="bg-surface-white py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ImageReveal
              src={f.image}
              alt={`Portrait of ${f.name}`}
              effect="scale"
              className="aspect-[3/4] w-full max-w-sm"
            />
            <div className="mt-6">
              <h3 className="text-xl text-ink">{f.name}</h3>
              <p className="text-sm text-brand-gold">{f.title}</p>
            </div>
          </div>

          <ScrollReveal className="flex flex-col gap-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Founder &amp; Director
            </span>
            <h2 className="text-balance text-3xl leading-[1.1] text-ink sm:text-4xl">
              Meet the founder
            </h2>

            {f.intro.map((p, i) => (
              <p key={i} className="leading-relaxed text-ink-muted">
                {p}
              </p>
            ))}

            <h3 className="mt-4 text-xl text-ink">{f.approachHeading}</h3>
            {f.approachParagraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-ink-muted">
                {p}
              </p>
            ))}

            <h3 className="mt-4 text-xl text-ink">{f.expertiseHeading}</h3>
            <ul className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
              {f.expertiseItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-brand-gold"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-4 text-xl text-ink">{f.philosophyHeading}</h3>
            {f.philosophyParagraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-ink-muted">
                {p}
              </p>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
