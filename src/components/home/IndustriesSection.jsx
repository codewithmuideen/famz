import SectionHeading from "../common/SectionHeading";
import IndustryCard from "../cards/IndustryCard";
import Button from "../common/Button";
import { industries } from "../../constants/industries";

export default function IndustriesSection() {
  const featured = industries.slice(0, 6);

  return (
    <section className="bg-surface-cream py-20 sm:py-28">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Sectors"
            title="Sector-aware advice, not generic guidance"
            description="We work with individuals and businesses across a wide range of sectors — here are a few we know especially well."
          />
          <Button to="/industries" variant="outline" className="shrink-0">
            All industries
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((industry, i) => (
            <IndustryCard key={industry.slug} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
