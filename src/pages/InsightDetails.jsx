import { useParams, Navigate } from "react-router-dom";
import Seo from "../components/common/Seo";
import Breadcrumb from "../components/common/Breadcrumb";
import ImageReveal from "../components/common/ImageReveal";
import ScrollReveal from "../components/common/ScrollReveal";
import InsightCard from "../components/cards/InsightCard";
import CTASection from "../components/sections/CTASection";
import { getInsightBySlug, insights } from "../constants/insights";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function InsightDetails() {
  const { slug } = useParams();
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return <Navigate to="/insights" replace />;
  }

  const related = insights.filter((i) => insight.relatedInsights?.includes(i.slug));

  return (
    <>
      <Seo
        title={insight.title}
        description={insight.excerpt}
        path={`/insights/${insight.slug}`}
        image={`/${insight.image}`}
        breadcrumbs={[
          { name: "Insights", url: "/insights" },
          { name: insight.title, url: `/insights/${insight.slug}` },
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          datePublished: insight.date,
          author: { "@type": "Organization", name: insight.author },
          description: insight.excerpt,
        }}
      />

      <article className="bg-surface-white pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="container-page">
          <Breadcrumb
            items={[{ label: "Insights", to: "/insights" }, { label: insight.title }]}
          />

          <header className="mx-auto mt-8 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
              {insight.category}
            </span>
            <h1 className="mt-4 text-balance text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
              {insight.title}
            </h1>
            <div className="mt-6 flex items-center gap-3 text-sm text-ink-soft">
              <span>{insight.author}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={insight.date}>{formatDate(insight.date)}</time>
            </div>
          </header>

          <ImageReveal
            src={insight.image}
            alt=""
            effect="fade"
            hoverZoom={false}
            className="mx-auto mt-10 aspect-[16/9] w-full max-w-4xl"
          />

          <ScrollReveal>
            <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6">
              {insight.content.map((paragraph, i) => (
                <p key={i} className="text-balance leading-relaxed text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-surface-cream py-20 sm:py-28">
          <div className="container-page">
            <h2 className="mb-10 text-2xl text-ink">Related insights</h2>
            <div className="grid gap-10 sm:grid-cols-2">
              {related.map((r, i) => (
                <InsightCard key={r.slug} insight={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
