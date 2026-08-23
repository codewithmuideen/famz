import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";
import ContentSplitSection from "../components/sections/ContentSplitSection";
import FounderBio from "../components/sections/FounderBio";
import StatCounter from "../components/common/StatCounter";
import TeamCard from "../components/cards/TeamCard";
import CTASection from "../components/sections/CTASection";
import ImageReveal from "../components/common/ImageReveal";
import { siteConfig } from "../constants/siteConfig";
import { team } from "../constants/team";
import { CheckCircle2 } from "lucide-react";
import accaBadge from "../assets/images/acca-badge.jpg";

const values = [
  {
    title: "Qualified Expertise",
    description: "Professional accounting expertise backed by ACCA regulation.",
  },
  {
    title: "Commercial Approach",
    description: "We focus on understanding the individual or business behind the numbers.",
  },
  {
    title: "Technology-Driven",
    description: "Modern accounting technology and digital processes for efficient financial management.",
  },
  {
    title: "Personalised Service",
    description: "Every client receives advice tailored to their circumstances and objectives.",
  },
  {
    title: "Proactive Advice",
    description: "We aim to identify opportunities and potential issues before they become problems.",
  },
  {
    title: "Long-Term Relationships",
    description: "We aim to become a trusted financial partner, not just a compliance provider.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="Who We Are"
        description="Dieux Accounting & Advisory is an ACCA-regulated accounting and advisory firm. Learn about our approach, values and team."
        path="/about"
        breadcrumbs={[{ name: "Who We Are", url: "/about" }]}
      />
      <PageHero
        eyebrow="Who We Are"
        title="A modern accounting firm built on real relationships"
        description="ACCA-regulated, technology-driven, and genuinely invested in the individuals and businesses we work with."
        image="about-office-glass"
        breadcrumbItems={[{ label: "Who We Are" }]}
      />

      <ContentSplitSection
        eyebrow="Our Story"
        title="More than accounts and tax returns"
        paragraphs={[
          siteConfig.description,
          "We work as an extension of our clients' businesses, providing clear financial information, proactive advice and practical solutions that help individuals and businesses understand their finances and achieve their objectives.",
        ]}
        image="intro-team-workplace"
      />

      <FounderBio />

      <section className="border-y border-line bg-surface-cream py-16">
        <div className="container-page flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          <img
            src={accaBadge}
            alt="ACCA — The Association of Chartered Certified Accountants"
            className="h-40 w-40 shrink-0 rounded-xl border border-line bg-surface-white p-3 shadow-card sm:h-48 sm:w-48"
          />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Regulated &amp; Recognised
            </span>
            <h2 className="text-2xl text-ink sm:text-3xl">{siteConfig.regulator.name}</h2>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted">
              {siteConfig.name} is an {siteConfig.regulator.short} — registration details are
              available on request for verification purposes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-cream py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Choose Dieux"
            title="What guides how we work"
            align="left"
            className="mb-14"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.05}>
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

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Team"
            title="The people behind your advice"
            description="A small, senior team — so you always know exactly who you're working with."
            className="mb-14"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
