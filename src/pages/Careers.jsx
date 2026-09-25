import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";
import ContentSplitSection from "../components/sections/ContentSplitSection";
import CTASection from "../components/sections/CTASection";
import { benefits as fallbackBenefits, openRoles as fallbackOpenRoles } from "../constants/careers";
import { getIcon } from "../constants/iconMap";
import { useCollection } from "../hooks/useCollection";
import { useSiteContent } from "../hooks/useSiteContent";
import { useSiteSettings } from "../hooks/useSiteSettings";

const heroDefaults = {
  eyebrow: "Careers",
  title: "Do the best work of your career here",
  description: "We're a small, technology-driven team that gives people real responsibility early, and invests properly in their professional development.",
};

const whyJoinDefaults = {
  eyebrow: "Why Join Us",
  title: "A firm where your contribution is visible",
  paragraph1: "We're intentionally small. That means client work isn't handed to you piecemeal after years of back-office tasks. You build real client relationships early, supported by senior colleagues who are genuinely invested in your growth.",
  paragraph2: "Our technology-driven approach means less time on repetitive manual work, and more time on the advisory work that actually develops your skills.",
};

const benefitsIntroDefaults = { eyebrow: "Benefits", title: "What you can expect" };
const rolesIntroDefaults = { eyebrow: "Open Roles", title: "Current opportunities" };

const ctaDefaults = {
  eyebrow: "Don't see the right role?",
  title: "Send us a speculative application",
  description: "We're always interested in hearing from talented, client-focused people.",
};

export default function Careers() {
  const { items: openRoles } = useCollection("careers", fallbackOpenRoles);
  const { items: benefits } = useCollection("benefits", fallbackBenefits);
  const { content: hero } = useSiteContent("careers", "hero", heroDefaults);
  const { content: whyJoin } = useSiteContent("careers", "whyJoin", whyJoinDefaults);
  const { content: benefitsIntro } = useSiteContent("careers", "benefitsIntro", benefitsIntroDefaults);
  const { content: rolesIntro } = useSiteContent("careers", "rolesIntro", rolesIntroDefaults);
  const { content: cta } = useSiteContent("careers", "cta", ctaDefaults);
  const { content: settings } = useSiteSettings();

  return (
    <>
      <Seo
        title="Careers"
        description="Join Dieux Accounting & Advisory. Explore open roles and see why our team chooses to build their careers here."
        path="/careers"
        breadcrumbs={[{ name: "Careers", url: "/careers" }]}
      />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image="careers-culture"
        breadcrumbItems={[{ label: "Careers" }]}
      />

      <ContentSplitSection
        eyebrow={whyJoin.eyebrow}
        title={whyJoin.title}
        paragraphs={[whyJoin.paragraph1, whyJoin.paragraph2]}
        image="careers-brainstorm"
      />

      <section className="bg-surface-cream py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow={benefitsIntro.eyebrow} title={benefitsIntro.title} className="mb-14" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => {
              const Icon = getIcon(benefit.icon);
              return (
                <ScrollReveal key={benefit.id || benefit.title} delay={i * 0.06}>
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
          <SectionHeading eyebrow={rolesIntro.eyebrow} title={rolesIntro.title} className="mb-14" />
          {openRoles.length > 0 ? (
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {openRoles.map((role, i) => (
                <ScrollReveal key={role.slug} delay={i * 0.05}>
                  <a
                    href={`mailto:${settings.email}?subject=${encodeURIComponent(
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
              We don't have any open roles right now, but we'd still love to hear from you.
            </p>
          )}
        </div>
      </section>

      <CTASection
        eyebrow={cta.eyebrow}
        title={cta.title}
        description={cta.description}
        ctaLabel="Email us"
        ctaTo={`mailto:${settings.email}`}
      />
    </>
  );
}
