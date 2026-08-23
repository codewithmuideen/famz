import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import ServiceCard from "../components/cards/ServiceCard";
import CTASection from "../components/sections/CTASection";
import { services } from "../constants/services";

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Accounting, tax, finance and business advisory services for individuals and businesses across the UK and internationally."
        path="/services"
        breadcrumbs={[{ name: "Services", url: "/services" }]}
      />
      <PageHero
        eyebrow="What We Do"
        title="End-to-end accounting and advisory support"
        description="From day-to-day compliance to strategic financial advisory — practical expertise for individuals, entrepreneurs, owner-managed businesses and growing companies."
        image="service-advisory"
        breadcrumbItems={[{ label: "Services" }]}
      />

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Not sure where to start?"
        title="Tell us about your situation and we'll point you the right way."
      />
    </>
  );
}
