import SectionHeading from "../common/SectionHeading";
import InsightCard from "../cards/InsightCard";
import Button from "../common/Button";
import { insights as fallbackInsights } from "../../constants/insights";
import { useCollection } from "../../hooks/useCollection";
import { useSiteContent } from "../../hooks/useSiteContent";

const defaults = {
  eyebrow: "Insights",
  title: "Practical thinking on tax, compliance and business finance",
};

export default function InsightsSection() {
  const { items: insights } = useCollection("insights", fallbackInsights);
  const { content } = useSiteContent("home", "insightsSection", defaults);
  const latest = insights.slice(0, 3);

  return (
    <section className="bg-surface-white py-20 sm:py-28">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
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
