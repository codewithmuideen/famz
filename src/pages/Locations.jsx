import { Globe2 } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import ImageCard from "../components/cards/ImageCard";
import ContentSplitSection from "../components/sections/ContentSplitSection";
import CTASection from "../components/sections/CTASection";
import { regions, homeBase } from "../constants/locations";

export default function Locations() {
  return (
    <>
      <Seo
        title="Locations"
        description="Dieux Accounting & Advisory is based in the UK, supporting individuals and businesses across the UK and internationally."
        path="/locations"
        breadcrumbs={[{ name: "Locations", url: "/locations" }]}
      />
      <PageHero
        eyebrow="Where We Work"
        title="A UK base, with reach far beyond it"
        description="Our remote-first, technology-driven service model means location is rarely a barrier to working together."
        image="location-london"
        breadcrumbItems={[{ label: "Locations" }]}
      />

      <ContentSplitSection
        eyebrow="Our Base"
        title={`${homeBase.city}, ${homeBase.country}`}
        paragraphs={[homeBase.description]}
        image={homeBase.image}
      />

      <section className="bg-surface-cream py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Client Regions"
            title="Who we support, wherever they are"
            description="Both UK-based and international clients — particularly those with a UK connection."
            className="mb-14"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region, i) => (
              <div key={region.region} className="flex flex-col gap-4">
                <ImageCard image={region.image} title={region.region} description={region.summary} index={i} />
                <ul className="flex flex-wrap gap-2">
                  {region.coverage.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-1.5 rounded-full border border-line bg-surface-white px-3 py-1 text-xs text-ink-muted"
                    >
                      <Globe2 size={11} className="text-brand-gold" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Wherever you are"
        title="Let's talk about how we can work together"
      />
    </>
  );
}
