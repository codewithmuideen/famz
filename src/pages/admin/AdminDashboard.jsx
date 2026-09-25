import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { siteConfig } from "../../constants/siteConfig";
import logoBlack from "../../assets/logos/logoblack.png";
import SiteContentEditor from "../../components/admin/SiteContentEditor";
import CollectionManager from "../../components/admin/CollectionManager";
import MediaLibrary from "../../components/admin/MediaLibrary";
import {
  servicesSchema,
  industriesSchema,
  insightsSchema,
  testimonialsSchema,
  careersSchema,
  regionsSchema,
  founderSchema,
  homeBaseSchema,
  valuesSchema,
  promisesSchema,
  audiencesSchema,
  faqsSchema,
  benefitsSchema,
} from "../../constants/adminSchemas";

const T = { text: "text", textarea: "textarea", list: "list", image: "image" };
const F = (key, label, type = T.text) => ({ key, label, type });

const groups = [
  {
    label: "Site-wide",
    tabs: [
      {
        key: "settings",
        label: "Site Settings",
        render: () => (
          <SiteContentEditor
            page="global"
            sectionKey="settings"
            title="Contact details & social links"
            schema={[
              F("description", "Company description", T.textarea),
              F("email", "Email"),
              F("phoneDisplay", "Phone (display)"),
              F("phoneHref", "Phone (dial number, no spaces, e.g. +442036339182)"),
              F("addressLine1", "Address line 1"),
              F("addressLine2", "Address line 2"),
              F("linkedin", "LinkedIn URL"),
              F("twitter", "Twitter / X URL"),
            ]}
            defaults={{
              description: siteConfig.description,
              email: siteConfig.contact.email,
              phoneDisplay: siteConfig.contact.phoneDisplay,
              phoneHref: siteConfig.contact.phoneHref,
              addressLine1: siteConfig.contact.addressLine1,
              addressLine2: siteConfig.contact.addressLine2,
              linkedin: siteConfig.social.linkedin,
              twitter: siteConfig.social.twitter,
            }}
          />
        ),
      },
      {
        key: "ctaDefault",
        label: "Default CTA banner",
        render: () => (
          <SiteContentEditor
            page="global"
            sectionKey="ctaDefault"
            title="Default 'Let's talk' banner (used on pages that don't override it)"
            schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]}
            defaults={{
              eyebrow: "Let's talk",
              title: "Let's talk about your finances and your future.",
              description: "Whether you need support with your accounts and tax compliance or require a strategic finance partner to help you or your business grow, our team is here to help.",
            }}
          />
        ),
      },
    ],
  },
  {
    label: "Home",
    tabs: [
      {
        key: "home",
        label: "Homepage",
        render: () => (
          <div className="flex flex-col gap-8">
            <SiteContentEditor
              page="home"
              sectionKey="hero"
              title="Hero"
              schema={[
                F("eyebrow", "Eyebrow"),
                F("tagline", "Headline"),
                F("description", "Subheading", T.textarea),
                F("image", "Background image", T.image),
              ]}
              defaults={{
                eyebrow: "Chartered Accountants · ACCA Regulated",
                tagline: siteConfig.tagline,
                description: "Practical accounting, tax and business advisory for individuals and ambitious businesses across the UK and internationally.",
                image: "about-office-glass",
              }}
            />
            <SiteContentEditor
              page="home"
              sectionKey="logoCloud"
              title="Scrolling sector strip"
              schema={[F("label", "Label"), F("items", "Sector names", T.list)]}
              defaults={{ label: "Sectors we work with", items: [] }}
            />
            <SiteContentEditor
              page="home"
              sectionKey="intro"
              title="Intro section"
              schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("paragraph1", "Paragraph 1", T.textarea), F("paragraph2", "Paragraph 2", T.textarea), F("image", "Image", T.image)]}
              defaults={{ eyebrow: "Our Approach", title: "Accounting should do more than tick a compliance box.", paragraph1: "", paragraph2: "", image: "intro-team-workplace" }}
            />
            <SiteContentEditor
              page="home"
              sectionKey="featuredServices"
              title="Featured services intro"
              schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]}
              defaults={{ eyebrow: "What We Do", title: "Services shaped around you and your business", description: "" }}
            />
            <SiteContentEditor
              page="home"
              sectionKey="statsSection"
              title="Stats intro"
              schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("image", "Background image", T.image)]}
              defaults={{ eyebrow: "By The Numbers", title: "A firm built on long-term relationships, not one-off filings", image: "stats-skyline" }}
            />
            <SiteContentEditor
              page="home"
              sectionKey="testimonialsIntro"
              title="Testimonials intro"
              schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]}
              defaults={{ eyebrow: "Client Feedback", title: "Trusted Voices, Proven Impact", description: "" }}
            />
            <SiteContentEditor
              page="home"
              sectionKey="industriesSection"
              title="Sectors intro"
              schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]}
              defaults={{ eyebrow: "Sectors", title: "Sector-aware advice, not generic guidance", description: "" }}
            />
            <SiteContentEditor
              page="home"
              sectionKey="insightsSection"
              title="Insights intro"
              schema={[F("eyebrow", "Eyebrow"), F("title", "Title")]}
              defaults={{ eyebrow: "Insights", title: "Practical thinking on tax, compliance and business finance" }}
            />
            <SiteContentEditor
              page="home"
              sectionKey="globalPresence"
              title="UK & International section"
              schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea), F("image", "Image", T.image)]}
              defaults={{ eyebrow: "UK & International", title: "Based in the UK. Built for clients everywhere.", description: "", image: "global-london" }}
            />
            <SiteContentEditor
              page="home"
              sectionKey="careersCTA"
              title="Careers banner"
              schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea), F("image", "Background image", T.image)]}
              defaults={{ eyebrow: "Careers", title: "Build your career with a firm that invests in you", description: "", image: "careers-brainstorm" }}
            />
          </div>
        ),
      },
    ],
  },
  {
    label: "Who We Are",
    tabs: [
      {
        key: "whoWeAre",
        label: "Page text",
        render: () => (
          <div className="flex flex-col gap-8">
            <SiteContentEditor page="who-we-are" sectionKey="hero" title="Hero" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Who We Are", title: "A modern accounting firm built on real relationships", description: "" }} />
            <SiteContentEditor page="who-we-are" sectionKey="story" title="Our Story" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("paragraph1", "Paragraph 1", T.textarea), F("paragraph2", "Paragraph 2", T.textarea)]} defaults={{ eyebrow: "Our Story", title: "More than accounts and tax returns", paragraph1: "", paragraph2: "" }} />
            <SiteContentEditor page="who-we-are" sectionKey="acca" title="Regulation badge text" schema={[F("eyebrow", "Eyebrow"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Regulated & Recognised", description: "" }} />
            <SiteContentEditor page="who-we-are" sectionKey="valuesIntro" title="Values section heading" schema={[F("eyebrow", "Eyebrow"), F("title", "Title")]} defaults={{ eyebrow: "Why Choose Dieux", title: "What guides how we work" }} />
            <SiteContentEditor page="who-we-are" sectionKey="directAccess" title="'Direct Access' section" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("paragraph", "Paragraph", T.textarea), F("bullets", "Bullets", T.list)]} defaults={{ eyebrow: "Direct Access, No Layers", title: "You'll always know exactly who you're working with", paragraph: "", bullets: [] }} />
            <SiteContentEditor page="who-we-are" sectionKey="approach" title="'Numbers. Guidance. Growth.' section" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("paragraph", "Paragraph", T.textarea), F("bullets", "Bullets", T.list)]} defaults={{ eyebrow: "Our Approach", title: "Numbers. Guidance. Growth.", paragraph: "", bullets: [] }} />
          </div>
        ),
      },
      { key: "values", label: "Values grid", render: () => <CollectionManager collectionName="values" schema={valuesSchema} titleField="title" emptyItem={{ title: "New value", description: "" }} /> },
    ],
  },
  {
    label: "About Us",
    tabs: [
      {
        key: "aboutUs",
        label: "Page text",
        render: () => (
          <div className="flex flex-col gap-8">
            <SiteContentEditor page="about-us" sectionKey="hero" title="Hero" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "About Us", title: "Straightforward accounting, built around you", description: "" }} />
            <SiteContentEditor page="about-us" sectionKey="promisesIntro" title="Promise section heading" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Our Promise", title: "What you can expect from us", description: "" }} />
            <SiteContentEditor page="about-us" sectionKey="audiencesIntro" title="Audiences section heading" schema={[F("eyebrow", "Eyebrow"), F("title", "Title")]} defaults={{ eyebrow: "Who We Work With", title: "Support for wherever you are right now" }} />
            <SiteContentEditor page="about-us" sectionKey="faqIntro" title="FAQ section heading" schema={[F("eyebrow", "Eyebrow"), F("title", "Title")]} defaults={{ eyebrow: "Getting Started", title: "Questions people ask us before switching" }} />
            <SiteContentEditor page="about-us" sectionKey="founder" title="Founder bio" schema={founderSchema} defaults={{ name: "", title: "", image: "", intro: [], approachHeading: "", approachParagraphs: [], expertiseHeading: "", expertiseItems: [], philosophyHeading: "", philosophyParagraphs: [] }} />
            <SiteContentEditor page="about-us" sectionKey="cta" title="Closing banner" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Ready when you are", title: "Let's have a straightforward conversation about your finances.", description: "" }} />
          </div>
        ),
      },
      { key: "promises", label: "Promises", render: () => <CollectionManager collectionName="promises" schema={promisesSchema} titleField="title" emptyItem={{ title: "New promise", description: "" }} /> },
      { key: "audiences", label: "Audiences", render: () => <CollectionManager collectionName="audiences" schema={audiencesSchema} titleField="title" emptyItem={{ title: "New audience", description: "" }} /> },
      { key: "faqs", label: "FAQs", render: () => <CollectionManager collectionName="faqs" schema={faqsSchema} titleField="question" emptyItem={{ question: "New question", answer: "" }} /> },
    ],
  },
  {
    label: "Services",
    tabs: [
      {
        key: "servicesPage",
        label: "Page text",
        render: () => (
          <div className="flex flex-col gap-8">
            <SiteContentEditor page="services" sectionKey="hero" title="Hero" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "What We Do", title: "End-to-end accounting and advisory support", description: "" }} />
            <SiteContentEditor page="services" sectionKey="cta" title="Closing banner" schema={[F("eyebrow", "Eyebrow"), F("title", "Title")]} defaults={{ eyebrow: "Not sure where to start?", title: "Tell us about your situation and we'll point you the right way." }} />
          </div>
        ),
      },
      { key: "services", label: "Services list", render: () => <CollectionManager collectionName="services" schema={servicesSchema} slugField="slug" titleField="title" emptyItem={{ title: "New service", slug: "new-service", offerings: [], relatedServices: [], relatedIndustries: [] }} /> },
    ],
  },
  {
    label: "Industries",
    tabs: [
      {
        key: "industriesPage",
        label: "Page text",
        render: () => (
          <div className="flex flex-col gap-8">
            <SiteContentEditor page="industries" sectionKey="hero" title="Hero" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Industries", title: "Advice shaped by how your sector actually works", description: "" }} />
            <SiteContentEditor page="industries" sectionKey="cta" title="Closing banner" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Don't see your sector?", title: "We work across many more industries than listed here.", description: "" }} />
          </div>
        ),
      },
      { key: "industries", label: "Industries list", render: () => <CollectionManager collectionName="industries" schema={industriesSchema} slugField="slug" titleField="title" emptyItem={{ title: "New industry", slug: "new-industry", challenges: [], solutions: [], relatedServices: [] }} /> },
    ],
  },
  {
    label: "Insights",
    tabs: [
      { key: "insightsPage", label: "Page text", render: () => <SiteContentEditor page="insights" sectionKey="hero" title="Hero" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Insights", title: "Practical thinking, not jargon", description: "" }} /> },
      { key: "insights", label: "Articles", render: () => <CollectionManager collectionName="insights" schema={insightsSchema} slugField="slug" titleField="title" emptyItem={{ title: "New article", slug: "new-article", content: [], relatedInsights: [] }} /> },
    ],
  },
  {
    label: "Careers",
    tabs: [
      {
        key: "careersPage",
        label: "Page text",
        render: () => (
          <div className="flex flex-col gap-8">
            <SiteContentEditor page="careers" sectionKey="hero" title="Hero" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Careers", title: "Do the best work of your career here", description: "" }} />
            <SiteContentEditor page="careers" sectionKey="whyJoin" title="'Why Join Us' section" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("paragraph1", "Paragraph 1", T.textarea), F("paragraph2", "Paragraph 2", T.textarea)]} defaults={{ eyebrow: "Why Join Us", title: "A firm where your contribution is visible", paragraph1: "", paragraph2: "" }} />
            <SiteContentEditor page="careers" sectionKey="benefitsIntro" title="Benefits heading" schema={[F("eyebrow", "Eyebrow"), F("title", "Title")]} defaults={{ eyebrow: "Benefits", title: "What you can expect" }} />
            <SiteContentEditor page="careers" sectionKey="rolesIntro" title="Open roles heading" schema={[F("eyebrow", "Eyebrow"), F("title", "Title")]} defaults={{ eyebrow: "Open Roles", title: "Current opportunities" }} />
            <SiteContentEditor page="careers" sectionKey="cta" title="Closing banner" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Don't see the right role?", title: "Send us a speculative application", description: "" }} />
          </div>
        ),
      },
      { key: "benefits", label: "Benefits", render: () => <CollectionManager collectionName="benefits" schema={benefitsSchema} titleField="title" emptyItem={{ title: "New benefit", description: "" }} /> },
      { key: "careersRoles", label: "Open roles", render: () => <CollectionManager collectionName="careers" schema={careersSchema} slugField="slug" titleField="title" emptyItem={{ title: "New role", slug: "new-role" }} /> },
    ],
  },
  {
    label: "Locations",
    tabs: [
      {
        key: "locationsPage",
        label: "Page text",
        render: () => (
          <div className="flex flex-col gap-8">
            <SiteContentEditor page="locations" sectionKey="hero" title="Hero" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Where We Work", title: "A UK base, with reach far beyond it", description: "" }} />
            <SiteContentEditor page="locations" sectionKey="homeBase" title="Home base" schema={homeBaseSchema} defaults={{ city: "London", country: "United Kingdom", image: "location-london", description: "" }} />
            <SiteContentEditor page="locations" sectionKey="baseIntro" title="Home base section eyebrow" schema={[F("eyebrow", "Eyebrow")]} defaults={{ eyebrow: "Our Base" }} />
            <SiteContentEditor page="locations" sectionKey="regionsIntro" title="Regions section heading" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Client Regions", title: "Who we support, wherever they are", description: "" }} />
            <SiteContentEditor page="locations" sectionKey="cta" title="Closing banner" schema={[F("eyebrow", "Eyebrow"), F("title", "Title")]} defaults={{ eyebrow: "Wherever you are", title: "Let's talk about how we can work together" }} />
          </div>
        ),
      },
      { key: "regions", label: "Regions", render: () => <CollectionManager collectionName="regions" schema={regionsSchema} titleField="region" emptyItem={{ region: "New region", coverage: [] }} /> },
    ],
  },
  {
    label: "Contact",
    tabs: [
      {
        key: "contactPage",
        label: "Page text",
        render: () => (
          <div className="flex flex-col gap-8">
            <SiteContentEditor page="contact" sectionKey="hero" title="Hero" schema={[F("eyebrow", "Eyebrow"), F("title", "Title"), F("description", "Description", T.textarea)]} defaults={{ eyebrow: "Contact", title: "Let's talk about your finances and your future", description: "" }} />
            <SiteContentEditor page="contact" sectionKey="regulation" title="Regulation note" schema={[F("label", "Label"), F("text", "Text", T.textarea)]} defaults={{ label: "Regulation", text: "" }} />
            <SiteContentEditor page="contact" sectionKey="thankYou" title="Form success message" schema={[F("title", "Title")]} defaults={{ title: "Thank you, your message is on its way" }} />
          </div>
        ),
      },
    ],
  },
  {
    label: "Other",
    tabs: [
      { key: "testimonials", label: "Testimonials", render: () => <CollectionManager collectionName="testimonials" schema={testimonialsSchema} titleField="author" emptyItem={{ author: "New testimonial", quote: "", role: "" }} /> },
      { key: "media", label: "Media Library", render: () => <MediaLibrary /> },
    ],
  },
];

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [activeGroup, setActiveGroup] = useState(groups[1].label);
  const [activeTab, setActiveTab] = useState(groups[1].tabs[0].key);

  const currentGroup = groups.find((g) => g.label === activeGroup);
  const currentTab = currentGroup?.tabs.find((t) => t.key === activeTab) || currentGroup?.tabs[0];

  return (
    <div className="min-h-screen bg-surface-mist">
      <header className="flex items-center justify-between border-b border-line bg-surface-white px-6 py-4 sm:px-10">
        <img src={logoBlack} alt="Dieux" className="h-8 w-auto object-contain" />
        <div className="flex items-center gap-4">
          <span className="text-sm text-ink-muted">{user?.email}</span>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-full border border-line px-4 py-1.5 text-sm text-ink transition-colors hover:border-brand-navy"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10 sm:px-10">
        <nav className="w-56 shrink-0">
          <ul className="flex flex-col gap-5">
            {groups.map((group) => (
              <li key={group.label}>
                <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-1">
                  {group.tabs.map((t) => (
                    <li key={t.key}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveGroup(group.label);
                          setActiveTab(t.key);
                        }}
                        className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          activeGroup === group.label && activeTab === t.key
                            ? "bg-brand-navy text-ink-inverse"
                            : "text-ink-muted hover:bg-surface-white"
                        }`}
                      >
                        {t.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 flex-1">{currentTab?.render()}</div>
      </div>
    </div>
  );
}
