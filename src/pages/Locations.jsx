import { Globe2 } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import ImageCard from "../components/cards/ImageCard";
import ContentSplitSection from "../components/sections/ContentSplitSection";
import CTASection from "../components/sections/CTASection";
import { regions as fallbackRegions, homeBase as fallbackHomeBase } from "../constants/locations";
import { useCollection } from "../hooks/useCollection";
import { useSiteContent } from "../hooks/useSiteContent";

const heroDefaults = {
  eyebrow: "Where We Work",
  title: "A UK base, with reach far beyond it",
  description: "Our remote-first, technology-driven service model means location is rarely a barrier to working together.",
};

const baseIntroDefaults = { eyebrow: "Our Base" };

const regionsIntroDefaults = {
  eyebrow: "Client Regions",
  title: "Who we support, wherever they are",
  description: "Both UK-based and international clients, particularly those with a UK connection.",
};

const ctaDefaults = {
  eyebrow: "Wherever you are",
  title: "Let's talk about how we can work together",
  description: "",
};

export default function Locations() {
  const { items: regions } = useCollection("regions", fallbackRegions);
  const { content: homeBase } = useSiteContent("locations", "homeBase", fallbackHomeBase);
  const { content: hero } = useSiteContent("locations", "hero", heroDefaults);
  const { content: baseIntro } = useSiteContent("locations", "baseIntro", baseIntroDefaults);
  const { content: regionsIntro } = useSiteContent("locations", "regionsIntro", regionsIntroDefaults);
  const { content: cta } = useSiteContent("locations", "cta", ctaDefaults);

  return (
    <>
      <Seo
        title="Locations"
        description="Dieux Accounting & Advisory is based in the UK, supporting individuals and businesses across the UK and internationally."
        path="/locations"
        breadcrumbs={[{ name: "Locations", url: "/locations" }]}
      />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image="location-london"
        breadcrumbItems={[{ label: "Locations" }]}
      />

      <ContentSplitSection
        eyebrow={baseIntro.eyebrow}
        title={`${homeBase.city}, ${homeBase.country}`}
        paragraphs={[homeBase.description]}
        image={homeBase.image}
      />

      <section className="bg-surface-cream py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={regionsIntro.eyebrow}
            title={regionsIntro.title}
            description={regionsIntro.description}
            className="mb-14"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region, i) => (
              <div key={region.id || region.region} className="flex flex-col gap-4">
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

      <CTASection eyebrow={cta.eyebrow} title={cta.title} description={cta.description || undefined} />
    </>
  );
}
