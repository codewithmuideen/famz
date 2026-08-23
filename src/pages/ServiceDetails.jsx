import { useParams, Navigate, Link } from "react-router-dom";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import ScrollReveal from "../components/common/ScrollReveal";
import CTASection from "../components/sections/CTASection";
import { getServiceBySlug, services } from "../constants/services";
import { industries } from "../constants/industries";
import { getIcon } from "../constants/iconMap";

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = getIcon(service.icon);
  const related = services.filter((s) => service.relatedServices?.includes(s.slug));
  const relatedIndustries = industries.filter((i) =>
    service.relatedIndustries?.includes(i.slug)
  );

  return (
    <>
      <Seo
        title={service.title}
        description={service.shortDescription}
        path={`/services/${service.slug}`}
        image={`/${service.image}`}
        breadcrumbs={[
          { name: "Services", url: "/services" },
          { name: service.title, url: `/services/${service.slug}` },
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.fullDescription,
          provider: { "@type": "ProfessionalService", name: "Dieux Accounting & Advisory" },
        }}
      />
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.shortDescription}
        image={service.image}
        breadcrumbItems={[{ label: "Services", to: "/services" }, { label: service.title }]}
      />

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-[2fr_1fr]">
          <div>
            <ScrollReveal>
              <Icon className="mb-6 text-brand-gold" size={40} strokeWidth={1.25} aria-hidden="true" />
              <p className="max-w-2xl text-balance text-lg leading-relaxed text-ink-muted">
                {service.fullDescription}
              </p>
            </ScrollReveal>

            <div className="mt-12">
              <h2 className="mb-6 text-xl text-ink">What's included</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {service.offerings.map((item, i) => (
                  <ScrollReveal key={item} delay={i * 0.03} as="li">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                      <span className="text-sm text-ink-muted">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </div>

          <aside className="flex flex-col gap-8">
            {related.length > 0 && (
              <div className="border border-line p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-ink-soft">
                  Related services
                </h3>
                <ul className="flex flex-col gap-3">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="group flex items-center justify-between text-sm text-ink transition-colors hover:text-brand-navy"
                      >
                        {s.title}
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedIndustries.length > 0 && (
              <div className="border border-line p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-ink-soft">
                  Relevant industries
                </h3>
                <ul className="flex flex-col gap-3">
                  {relatedIndustries.map((ind) => (
                    <li key={ind.slug}>
                      <Link
                        to={`/industries/${ind.slug}`}
                        className="group flex items-center justify-between text-sm text-ink transition-colors hover:text-brand-navy"
                      >
                        {ind.title}
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}
