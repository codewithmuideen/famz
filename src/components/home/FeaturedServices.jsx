import SectionHeading from "../common/SectionHeading";
import ServiceCard from "../cards/ServiceCard";
import Button from "../common/Button";
import { getFeaturedServices } from "../../constants/services";

export default function FeaturedServices() {
  const featured = getFeaturedServices();

  return (
    <section className="bg-surface-white py-20 sm:py-28">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What We Do"
            title="Services shaped around you and your business"
            description="From personal tax to strategic finance advisory — practical support at every stage."
          />
          <Button to="/services" variant="outline" className="shrink-0">
            All services
          </Button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
