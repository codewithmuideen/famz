import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";
import ContentSplitSection from "../components/sections/ContentSplitSection";
import CTASection from "../components/sections/CTASection";
import { benefits, openRoles } from "../constants/careers";
import { siteConfig } from "../constants/siteConfig";
import { getIcon } from "../constants/iconMap";

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers"
        description="Join Dieux Accounting & Advisory. Explore open roles and see why our team chooses to build their careers here."
        path="/careers"
        breadcrumbs={[{ name: "Careers", url: "/careers" }]}
      />
      <PageHero
        eyebrow="Careers"
        title="Do the best work of your career here"
        description="We're a small, technology-driven team that gives people real responsibility early — and invests properly in their professional development."
        image="careers-culture"
        breadcrumbItems={[{ label: "Careers" }]}
      />

      <ContentSplitSection
        eyebrow="Why Join Us"
        title="A firm where your contribution is visible"
        paragraphs={[
          "We're intentionally small. That means client work isn't handed to you piecemeal after years of back-office tasks — you build real client relationships early, supported by senior colleagues who are genuinely invested in your growth.",
          "Our technology-driven approach means less time on repetitive manual work, and more time on the advisory work that actually develops your skills.",
        ]}
        image="careers-brainstorm"
      />

      <section className="bg-surface-cream py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Benefits" title="What you can expect" className="mb-14" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => {
              const Icon = getIcon(benefit.icon);
              return (
                <ScrollReveal key={benefit.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col gap-3 border border-line bg-surface-white p-8">
                    <Icon className="text-brand-gold" size={26} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="text-lg text-ink">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{benefit.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Open Roles" title="Current opportunities" className="mb-14" />
          {openRoles.length > 0 ? (
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {openRoles.map((role, i) => (
                <ScrollReveal key={role.slug} delay={i * 0.05}>
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                      `Application: ${role.title}`
                    )}`}
                    className="group flex flex-col gap-4 py-8 transition-colors hover:bg-surface-cream sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-gold">
                        {role.department}
                      </span>
                      <h3 className="mt-2 text-xl text-ink">{role.title}</h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
                        {role.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-soft">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} /> {role.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} /> {role.type}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-brand-navy">
                      Apply
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted">
              We don't have any open roles right now — but we'd still love to hear from you.
            </p>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Don't see the right role?"
        title="Send us a speculative application"
        description="We're always interested in hearing from talented, client-focused people."
        ctaLabel="Email us"
        ctaTo={`mailto:${siteConfig.contact.email}`}
      />
    </>
  );
}
