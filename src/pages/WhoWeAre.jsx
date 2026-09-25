import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";
import ContentSplitSection from "../components/sections/ContentSplitSection";
import StatCounter from "../components/common/StatCounter";
import CTASection from "../components/sections/CTASection";
import ImageReveal from "../components/common/ImageReveal";
import { siteConfig } from "../constants/siteConfig";
import { CheckCircle2 } from "lucide-react";
import accaBadge from "../assets/images/acca-badge.jpg";
import { useSiteContent } from "../hooks/useSiteContent";
import { useCollection } from "../hooks/useCollection";

const fallbackValues = [
  { title: "Qualified Expertise", description: "Professional accounting expertise backed by ACCA regulation." },
  { title: "Commercial Approach", description: "We focus on understanding the individual or business behind the numbers." },
  { title: "Technology-Driven", description: "Modern accounting technology and digital processes for efficient financial management." },
  { title: "Personalised Service", description: "Every client receives advice tailored to their circumstances and objectives." },
  { title: "Proactive Advice", description: "We aim to identify opportunities and potential issues before they become problems." },
  { title: "Long-Term Relationships", description: "We aim to become a trusted financial partner, not just a compliance provider." },
];

const heroDefaults = {
  eyebrow: "Who We Are",
  title: "A modern accounting firm built on real relationships",
  description: "ACCA-regulated, technology-driven, and genuinely invested in the individuals and businesses we work with.",
};

const storyDefaults = {
  eyebrow: "Our Story",
  title: "More than accounts and tax returns",
  paragraph1: "From day-to-day bookkeeping and statutory compliance through to tax planning and strategic business advisory, we cover the full range of financial support a growing business needs, without you having to juggle multiple advisers.",
  paragraph2: "We work as an extension of our clients' businesses, providing clear financial information, proactive advice and practical solutions that help individuals and businesses understand their finances and achieve their objectives.",
};

const accaDefaults = {
  eyebrow: "Regulated & Recognised",
  description: `${siteConfig.name} is an ${siteConfig.regulator.short}, registration details are available on request for verification purposes.`,
};

const valuesIntroDefaults = { eyebrow: "Why Choose Dieux", title: "What guides how we work" };

const directAccessDefaults = {
  eyebrow: "Direct Access, No Layers",
  title: "You'll always know exactly who you're working with",
  paragraph: "There's no account-manager layer between you and the person doing the work. You deal directly with the people advising you, whether that's a quick question by email or a more involved planning conversation.",
  bullets: [
    "Direct access to the person handling your work, not a call centre",
    "Serving individuals, entrepreneurs and growing businesses",
    "UK-wide, with international client experience",
  ],
};

const approachDefaults = {
  eyebrow: "Our Approach",
  title: "Numbers. Guidance. Growth.",
  paragraph: "Our brand reflects how we work: three principles that guide every engagement, from a first tax return to a full outsourced finance function.",
  bullets: [
    "Numbers: accurate accounting, compliance and tax services",
    "Guidance: proactive business advisory and finance & consultancy",
    "Growth: specialist services for ambitious, scaling businesses",
  ],
};

export default function WhoWeAre() {
  const { content: hero } = useSiteContent("who-we-are", "hero", heroDefaults);
  const { content: story } = useSiteContent("who-we-are", "story", storyDefaults);
  const { content: acca } = useSiteContent("who-we-are", "acca", accaDefaults);
  const { content: valuesIntro } = useSiteContent("who-we-are", "valuesIntro", valuesIntroDefaults);
  const { items: values } = useCollection("values", fallbackValues);
  const { content: directAccess } = useSiteContent("who-we-are", "directAccess", directAccessDefaults);
  const { content: approach } = useSiteContent("who-we-are", "approach", approachDefaults);

  return (
    <>
      <Seo
        title="Who We Are"
        description="Dieux Accounting & Advisory is an ACCA-regulated accounting and advisory firm. Learn about our story, approach and values."
        path="/who-we-are"
        breadcrumbs={[{ name: "Who We Are", url: "/who-we-are" }]}
      />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image="about-office-glass"
        breadcrumbItems={[{ label: "Who We Are" }]}
      />

      <ContentSplitSection
        eyebrow={story.eyebrow}
        title={story.title}
        paragraphs={[story.paragraph1, story.paragraph2]}
        image="intro-team-workplace"
      />

      <section className="border-y border-line bg-surface-cream py-16">
        <div className="container-page flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          <img
            src={accaBadge}
            alt="ACCA: The Association of Chartered Certified Accountants"
            className="h-40 w-40 shrink-0 rounded-xl border border-line bg-surface-white p-3 shadow-card sm:h-48 sm:w-48"
          />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              {acca.eyebrow}
            </span>
            <h2 className="text-2xl text-ink sm:text-3xl">{siteConfig.regulator.name}</h2>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted">{acca.description}</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-cream py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={valuesIntro.eyebrow}
            title={valuesIntro.title}
            align="left"
            className="mb-14"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <ScrollReveal key={value.id || value.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-3 border border-line bg-surface-white p-8">
                  <CheckCircle2 className="text-brand-gold" size={24} strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="text-lg text-ink">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContentSplitSection
        eyebrow={directAccess.eyebrow}
        title={directAccess.title}
        paragraphs={[directAccess.paragraph]}
        bullets={directAccess.bullets}
        image="branda"
        reverse
      />

      <ContentSplitSection
        eyebrow={approach.eyebrow}
        title={approach.title}
        paragraphs={[approach.paragraph]}
        bullets={approach.bullets}
        image="brandb"
      />

      <section className="relative overflow-hidden bg-surface-dark py-20 sm:py-28">
        <div className="absolute inset-0 opacity-15">
          <ImageReveal src="stats-skyline" alt="" effect="fade" className="h-full w-full" hoverZoom={false} />
        </div>
        <div className="container-page relative grid grid-cols-2 gap-10 sm:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} tone="dark" />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
