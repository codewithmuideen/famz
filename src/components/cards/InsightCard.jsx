import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ImageReveal from "../common/ImageReveal";
import ScrollReveal from "../common/ScrollReveal";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function InsightCard({ insight, index = 0, featured = false }) {
  if (featured) {
    return (
      <ScrollReveal>
        <Link
          to={`/insights/${insight.slug}`}
          className="group grid gap-8 lg:grid-cols-2 lg:items-center"
        >
          <ImageReveal
            src={insight.image}
            alt=""
            effect="clip-left"
            className="aspect-[16/11] w-full"
          />
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
              {insight.category}
            </span>
            <h3 className="text-balance text-2xl leading-tight text-ink sm:text-3xl">
              {insight.title}
            </h3>
            <p className="leading-relaxed text-ink-muted">{insight.excerpt}</p>
            <div className="flex items-center gap-3 text-sm text-ink-soft">
              <span>{insight.author}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={insight.date}>{formatDate(insight.date)}</time>
            </div>
            <span className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-brand-navy">
              Read article
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

  return (
    <ScrollReveal delay={index * 0.06} className="h-full">
      <Link to={`/insights/${insight.slug}`} className="group flex h-full flex-col gap-4">
        <ImageReveal src={insight.image} alt="" effect="scale" className="aspect-[4/3] w-full" />
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
            {insight.category}
          </span>
          <h3 className="text-lg leading-snug text-ink">{insight.title}</h3>
          <time dateTime={insight.date} className="mt-auto pt-2 text-sm text-ink-soft">
            {formatDate(insight.date)}
          </time>
        </div>
      </Link>
    </ScrollReveal>
  );
}
