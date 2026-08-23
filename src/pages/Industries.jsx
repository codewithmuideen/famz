import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import IndustryCard from "../components/cards/IndustryCard";
import CTASection from "../components/sections/CTASection";
import { industries } from "../constants/industries";

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries"
        description="Sector-aware accounting and advisory support across technology, e-commerce, property, construction, healthcare, retail and more."
        path="/industries"
        breadcrumbs={[{ name: "Industries", url: "/industries" }]}
      />
      <PageHero
        eyebrow="Industries"
        title="Advice shaped by how your sector actually works"
        description="We work with individuals and businesses across a wide range of sectors — bringing sector-specific context to every engagement."
        image="industry-consultancy"
        breadcrumbItems={[{ label: "Industries" }]}
      />

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <IndustryCard key={industry.slug} industry={industry} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Don't see your sector?"
        title="We work across many more industries than listed here."
        description="Get in touch and tell us about your business — we'll let you know how we can help."
      />
    </>
  );
}
