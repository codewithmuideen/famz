import { Globe2 } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import ImageReveal from "../common/ImageReveal";
import Button from "../common/Button";
import { regions } from "../../constants/locations";

export default function GlobalPresence() {
  return (
    <section className="bg-surface-white py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="UK & International"
            title="Based in the UK. Built for clients everywhere."
            description="Our core focus is UK individuals and businesses — but our technology-driven, remote-first model means we support clients with cross-border needs just as well."
          />
          <ul className="flex flex-col gap-4">
            {regions.map((r) => (
              <li key={r.region} className="flex items-start gap-3 border-t border-line pt-4 first:border-t-0 first:pt-0">
                <Globe2 size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-ink">{r.region}</p>
                  <p className="text-sm text-ink-muted">{r.summary}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button to="/locations" variant="outline" className="w-fit">
            Where we work
          </Button>
        </div>
        <ImageReveal
          src="global-london"
          alt="London skyline representing the firm's UK base"
          effect="clip-left"
          className="min-h-[22rem] w-full lg:min-h-full"
        />
      </div>
    </section>
  );
}
