import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";
import FounderBio from "../components/sections/FounderBio";
import CTASection from "../components/sections/CTASection";
import { siteConfig } from "../constants/siteConfig";
import { getIcon } from "../constants/iconMap";
import { useSiteContent } from "../hooks/useSiteContent";
import { useCollection } from "../hooks/useCollection";

const fallbackPromises = [
  { icon: "UserRound", title: "A senior accountant on every account", description: "No junior hand-offs. The person you speak to is the person doing the work." },
  { icon: "Banknote", title: "Fixed fees, agreed upfront", description: "You'll know what things cost before we start, with no surprise bills later." },
  { icon: "BellRing", title: "We reach out first", description: "Proactive check-ins ahead of deadlines, not just once-a-year contact." },
  { icon: "Clock", title: "A response within one business day", description: "Questions get answered quickly, by someone who already knows your situation." },
];

const fallbackAudiences = [
  { icon: "UserRound", title: "Individuals", description: "Personal tax returns, property income, and everyday financial decisions." },
  { icon: "Rocket", title: "Entrepreneurs & start-ups", description: "From first incorporation to your first set of statutory accounts." },
  { icon: "Building2", title: "Owner-managed businesses & SMEs", description: "Day-to-day compliance alongside advice that helps you plan ahead." },
  { icon: "Globe2", title: "Growing & international companies", description: "Outsourced finance support that scales as your business does." },
];

const fallbackFaqs = [
  { question: "How do I switch to Dieux from my current accountant?", answer: "We handle the process for you, known as 'professional clearance', contacting your current accountant on your behalf and requesting the information we need. Most switches cause no disruption to your filings." },
  { question: "What information will you need from me to get started?", answer: "Typically your last set of accounts or tax returns, access to your existing bookkeeping records, and basic details about your business or personal situation. We'll give you a clear checklist before we begin." },
  { question: "Do you work with clients outside the UK?", answer: "Yes. We're a remote-first, technology-driven firm, so distance isn't a barrier. We support a number of clients with cross-border needs using secure cloud tools." },
  { question: "How are your fees structured?", answer: "We agree a fixed fee upfront based on the scope of work, so you always know what to expect. Fees are reviewed with you before any additional work begins." },
  { question: "Can you help if I'm behind on my accounts or tax filings?", answer: "Yes, this is something we help clients with regularly. We'll assess where things stand, get you back up to date, and liaise with HMRC on your behalf where needed." },
];

const heroDefaults = {
  eyebrow: "About Us",
  title: "Straightforward accounting, built around you",
  description: "No jargon, no surprises, no account-manager layers. Just clear advice from the people actually doing the work.",
};

const promisesIntroDefaults = {
  eyebrow: "Our Promise",
  title: "What you can expect from us",
  description: "These aren't values on a wall, they're commitments we hold ourselves to on every engagement.",
};

const audiencesIntroDefaults = { eyebrow: "Who We Work With", title: "Support for wherever you are right now" };
const faqIntroDefaults = { eyebrow: "Getting Started", title: "Questions people ask us before switching" };

const ctaDefaults = {
  eyebrow: "Ready when you are",
  title: "Let's have a straightforward conversation about your finances.",
  description: `Email ${siteConfig.contact.email} or send us a message, we'll usually reply within one business day.`,
};

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-lg text-ink">{item.question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-brand-gold transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <p className="min-h-0 max-w-2xl leading-relaxed text-ink-muted">{item.answer}</p>
      </div>
    </div>
  );
}

export default function AboutUs() {
  const [openIndex, setOpenIndex] = useState(0);

  const { content: hero } = useSiteContent("about-us", "hero", heroDefaults);
  const { content: promisesIntro } = useSiteContent("about-us", "promisesIntro", promisesIntroDefaults);
  const { items: promises } = useCollection("promises", fallbackPromises);
  const { content: audiencesIntro } = useSiteContent("about-us", "audiencesIntro", audiencesIntroDefaults);
  const { items: audiences } = useCollection("audiences", fallbackAudiences);
  const { content: faqIntro } = useSiteContent("about-us", "faqIntro", faqIntroDefaults);
  const { items: faqs } = useCollection("faqs", fallbackFaqs);
  const { content: cta } = useSiteContent("about-us", "cta", ctaDefaults);

  return (
    <>
      <Seo
        title="About Us"
        description="What you can expect when you work with Dieux Accounting & Advisory: who we serve, what we promise, and answers to common questions."
        path="/about"
        breadcrumbs={[{ name: "About Us", url: "/about" }]}
      />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image="office-interior"
        breadcrumbItems={[{ label: "About Us" }]}
      />

      <FounderBio />

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={promisesIntro.eyebrow}
            title={promisesIntro.title}
            description={promisesIntro.description}
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((promise, i) => {
              const Icon = getIcon(promise.icon);
              return (
                <ScrollReveal key={promise.id || promise.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col gap-3 border border-line bg-surface-white p-7">
                    <Icon className="text-brand-gold" size={26} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="text-base text-ink">{promise.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{promise.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-cream py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={audiencesIntro.eyebrow}
            title={audiencesIntro.title}
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, i) => {
              const Icon = getIcon(audience.icon);
              return (
                <ScrollReveal key={audience.id || audience.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col gap-3 bg-surface-white p-7 shadow-card">
                    <Icon className="text-brand-navy" size={26} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="text-base text-ink">{audience.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{audience.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={faqIntro.eyebrow}
            title={faqIntro.title}
            align="left"
            className="mb-10"
          />
          <div className="max-w-3xl border-t border-line">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.id || item.question}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((v) => (v === i ? -1 : i))}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow={cta.eyebrow} title={cta.title} description={cta.description} />
    </>
  );
}
