import StatCounter from "../common/StatCounter";
import ImageReveal from "../common/ImageReveal";
import { siteConfig } from "../../constants/siteConfig";
import { useSiteContent } from "../../hooks/useSiteContent";

const defaults = {
  eyebrow: "By The Numbers",
  title: "A firm built on long-term relationships, not one-off filings",
  image: "stats-skyline",
};

export default function StatsSection() {
  const { content } = useSiteContent("home", "statsSection", defaults);

  return (
    <section className="relative overflow-hidden bg-surface-dark py-20 sm:py-28">
      <div className="absolute inset-0 opacity-20">
        <ImageReveal src={content.image} alt="" effect="fade" className="h-full w-full" hoverZoom={false} />
      </div>
      <div className="container-page relative">
        <div className="mb-14 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-3xl leading-[1.1] text-ink-inverse sm:text-4xl">
            {content.title}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-10 border-t border-line-dark pt-10 sm:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} tone="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
