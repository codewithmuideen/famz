import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ImageReveal from "../common/ImageReveal";
import ScrollReveal from "../common/ScrollReveal";
import { getIcon } from "../../constants/iconMap";

export default function IndustryCard({ industry, index = 0 }) {
  const Icon = getIcon(industry.icon);

  return (
    <ScrollReveal delay={index * 0.06} className="h-full">
      <Link
        to={`/industries/${industry.slug}`}
        className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden"
      >
        <ImageReveal
          src={industry.image}
          alt=""
          effect="fade"
          className="absolute inset-0"
          hoverZoom
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/40 to-transparent transition-opacity duration-300 group-hover:from-brand-navy-dark/95" />
        <div className="relative flex flex-col gap-3 p-6 text-ink-inverse">
          <Icon size={22} strokeWidth={1.5} className="text-brand-gold-light" aria-hidden="true" />
          <h3 className="text-xl">{industry.title}</h3>
          <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-ink-inverse-muted opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
            {industry.shortDescription}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            View sector
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
