import { useMemo, useState } from "react";
import { FileSearch } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import InsightCard from "../components/cards/InsightCard";
import { insights, insightCategories } from "../constants/insights";

const PAGE_SIZE = 6;

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return insights.filter((insight) => {
      const matchesCategory = activeCategory === "All" || insight.category === activeCategory;
      const matchesQuery =
        query.trim() === "" || insight.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const visible = filtered.slice(0, visibleCount);
  const featured = insights[0];

  return (
    <>
      <Seo
        title="Insights"
        description="Practical thinking on tax planning, compliance, business advisory and technology from the Dieux Accounting & Advisory team."
        path="/insights"
        breadcrumbs={[{ name: "Insights", url: "/insights" }]}
      />
      <PageHero
        eyebrow="Insights"
        title="Practical thinking, not jargon"
        description="Timely, readable articles on tax, compliance and business finance — written for people running businesses, not accountants."
        image="insight-2"
        breadcrumbItems={[{ label: "Insights" }]}
      />

      <section className="bg-surface-white py-16">
        <div className="container-page">
          <InsightCard insight={featured} featured />
        </div>
      </section>

      <section className="bg-surface-cream py-20 sm:py-28">
        <div className="container-page">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {["All", ...insightCategories].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    activeCategory === cat
                      ? "border-brand-navy bg-brand-navy text-ink-inverse"
                      : "border-line bg-surface-white text-ink-muted hover:border-brand-navy"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search insights…"
              aria-label="Search insights"
              className="w-full max-w-xs border border-line bg-surface-white px-4 py-2.5 text-sm outline-none focus:border-brand-navy"
            />
          </div>

          {visible.length > 0 ? (
            <>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((insight, i) => (
                  <InsightCard key={insight.slug} insight={insight} index={i} />
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="mt-14 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="rounded-full border border-brand-navy px-8 py-3 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-navy hover:text-ink-inverse"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <FileSearch size={40} className="text-ink-soft" aria-hidden="true" />
              <p className="text-ink-muted">No insights match your search. Try a different term or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
