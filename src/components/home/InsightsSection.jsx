import SectionHeading from "../common/SectionHeading";
import InsightCard from "../cards/InsightCard";
import Button from "../common/Button";
import { insights } from "../../constants/insights";

export default function InsightsSection() {
  const latest = insights.slice(0, 3);

  return (
    <section className="bg-surface-white py-20 sm:py-28">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Insights"
            title="Practical thinking on tax, compliance and business finance"
          />
          <Button to="/insights" variant="outline" className="shrink-0">
            All insights
          </Button>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {latest.map((insight, i) => (
            <InsightCard key={insight.slug} insight={insight} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
