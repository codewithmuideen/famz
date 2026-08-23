import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ImageReveal from "../common/ImageReveal";
import ScrollReveal from "../common/ScrollReveal";
import { getIcon } from "../../constants/iconMap";

export default function ServiceCard({ service, index = 0, variant = "image" }) {
  const Icon = getIcon(service.icon);

  if (variant === "compact") {
    return (
      <ScrollReveal delay={index * 0.06}>
        <Link
          to={`/services/${service.slug}`}
          className="group flex h-full flex-col justify-between gap-6 border border-line bg-surface-white p-8 transition-colors duration-300 hover:border-brand-navy"
        >
          <div className="flex flex-col gap-4">
            <Icon className="text-brand-gold" size={28} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-xl text-ink">{service.title}</h3>
            <p className="text-sm leading-relaxed text-ink-muted">{service.shortDescription}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy">
            Learn more
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </Link>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal delay={index * 0.06} className="h-full">
      <Link to={`/services/${service.slug}`} className="group flex h-full flex-col">
        <ImageReveal
          src={service.image}
          alt=""
          effect="scale"
          className="aspect-[4/3] w-full"
        />
        <div className="flex flex-1 flex-col gap-3 border border-t-0 border-line p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
            Service
          </span>
          <h3 className="text-xl text-ink">{service.title}</h3>
          <p className="text-sm leading-relaxed text-ink-muted">{service.shortDescription}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-brand-navy">
            Explore service
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </ScrollReveal>
  );
}
