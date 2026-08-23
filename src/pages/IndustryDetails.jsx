import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowUpRight, AlertTriangle, Lightbulb } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import ScrollReveal from "../components/common/ScrollReveal";
import CTASection from "../components/sections/CTASection";
import InsightCard from "../components/cards/InsightCard";
import { getIndustryBySlug } from "../constants/industries";
import { services } from "../constants/services";
import { insights } from "../constants/insights";
import { getIcon } from "../constants/iconMap";

export default function IndustryDetails() {
  const { slug } = useParams();
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const Icon = getIcon(industry.icon);
  const related = services.filter((s) => industry.relatedServices?.includes(s.slug));
  const relatedInsights = insights.slice(0, 2);

  return (
    <>
      <Seo
        title={industry.title}
        description={industry.shortDescription}
        path={`/industries/${industry.slug}`}
        image={`/${industry.image}`}
        breadcrumbs={[
          { name: "Industries", url: "/industries" },
          { name: industry.title, url: `/industries/${industry.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Industry"
        title={industry.title}
        description={industry.shortDescription}
        image={industry.image}
        breadcrumbItems={[{ label: "Industries", to: "/industries" }, { label: industry.title }]}
      />

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page">
          <Icon className="mb-8 text-brand-gold" size={40} strokeWidth={1.25} aria-hidden="true" />
          <div className="grid gap-10 lg:grid-cols-2">
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-brand-navy" aria-hidden="true" />
                <h2 className="text-xl text-ink">Common challenges</h2>
              </div>
              <ul className="mt-6 flex flex-col gap-4 border-l-2 border-line pl-6">
                {industry.challenges.map((c) => (
                  <li key={c} className="text-sm leading-relaxed text-ink-muted">
                    {c}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-3">
                <Lightbulb size={20} className="text-brand-gold" aria-hidden="true" />
                <h2 className="text-xl text-ink">How we help</h2>
              </div>
              <ul className="mt-6 flex flex-col gap-4 border-l-2 border-brand-gold pl-6">
                {industry.solutions.map((s) => (
                  <li key={s} className="text-sm leading-relaxed text-ink-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface-cream py-20 sm:py-28">
          <div className="container-page">
            <h2 className="mb-10 text-2xl text-ink">Related services</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group flex items-center justify-between border border-line bg-surface-white p-6 transition-colors hover:border-brand-navy"
                >
                  <span className="text-sm font-medium text-ink">{s.title}</span>
                  <ArrowUpRight
                    size={16}
                    className="text-brand-navy transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page">
          <h2 className="mb-10 text-2xl text-ink">Related insights</h2>
          <div className="grid gap-10 sm:grid-cols-2">
            {relatedInsights.map((insight, i) => (
              <InsightCard key={insight.slug} insight={insight} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={industry.title}
        title={`Get advice built for ${industry.title.toLowerCase()} businesses`}
      />
    </>
  );
}
