export const insightCategories = [
  "Tax Planning",
  "Business Advisory",
  "Compliance",
  "Property",
  "Technology",
];

export const insights = [
  {
    slug: "self-assessment-deadline-checklist",
    title: "Self Assessment: a practical checklist before the January deadline",
    category: "Tax Planning",
    date: "2026-11-04",
    author: "Dieux Advisory Team",
    image: "insight-1",
    featured: true,
    excerpt:
      "The Self Assessment deadline has a way of arriving faster than expected. Here's what to gather, check and file before the 31 January cut-off.",
    content: [
      "Every year, the same avoidable issues cause last-minute Self Assessment stress: missing UTRs, unreconciled income from multiple sources, and unclaimed allowable expenses.",
      "Start by confirming your Unique Taxpayer Reference (UTR) is active and that you're registered for Self Assessment if this is your first filing year. Then gather income records from all sources — employment, self-employment, property, dividends and savings interest.",
      "Review allowable expenses carefully. For self-employed individuals and contractors, this includes home office costs, professional subscriptions and business travel. Property owners should account for mortgage interest relief restrictions and allowable maintenance costs.",
      "Finally, don't leave payment planning to the last minute. If you expect a large liability, consider whether a Time to Pay arrangement or advance planning around payments on account makes sense for your cash flow.",
    ],
    relatedInsights: ["property-tax-changes-landlords", "hmrc-enquiry-what-to-expect"],
  },
  {
    slug: "making-tax-digital-for-landlords",
    title: "Making Tax Digital for landlords: what changes and when",
    category: "Compliance",
    date: "2026-09-18",
    author: "Dieux Advisory Team",
    image: "insight-2",
    featured: true,
    excerpt:
      "MTD for Income Tax is being phased in for landlords and the self-employed. Here's how to prepare your record-keeping now, before it becomes mandatory.",
    content: [
      "Making Tax Digital for Income Tax Self Assessment (MTD for ITSA) requires digital record-keeping and quarterly updates to HMRC for qualifying landlords and self-employed individuals above the relevant income threshold.",
      "The shift moves reporting from a single annual return to quarterly digital submissions, followed by an end-of-period statement and final declaration.",
      "The most important step now is moving to compatible cloud accounting software well before your mandation date, so your records are clean and quarterly submissions become routine rather than a scramble.",
      "We're helping clients move onto MTD-ready platforms now, giving them a full reporting cycle to adjust before the requirement becomes mandatory for their income bracket.",
    ],
    relatedInsights: ["property-tax-changes-landlords", "cloud-accounting-benefits"],
  },
  {
    slug: "rd-tax-relief-eligibility",
    title: "R&D tax relief: is your software business leaving money on the table?",
    category: "Tax Planning",
    date: "2026-08-02",
    author: "Dieux Advisory Team",
    image: "insight-3",
    featured: true,
    excerpt:
      "R&D tax relief remains one of the most under-claimed reliefs among technology and software businesses. Here's how to assess whether your work qualifies.",
    content: [
      "Many founders assume R&D relief only applies to laboratory-style research. In practice, a significant share of software development work — resolving genuine technical uncertainty, building novel functionality, or solving integration challenges — can qualify.",
      "Eligibility rests on demonstrating technical uncertainty and a systematic process to resolve it, not simply that development work took place.",
      "Recent changes to the scheme have tightened evidence requirements, including mandatory additional information forms. Claims now require more contemporaneous documentation than in previous years.",
      "We work with technology clients to identify qualifying activity as it happens, rather than reconstructing a claim retrospectively at year-end.",
    ],
    relatedInsights: ["cloud-accounting-benefits", "business-forecasting-basics"],
  },
  {
    slug: "cloud-accounting-benefits",
    title: "Why moving to cloud accounting pays for itself within a year",
    category: "Technology",
    date: "2026-07-14",
    author: "Dieux Advisory Team",
    image: "insight-4",
    featured: false,
    excerpt:
      "Cloud accounting isn't just about compliance readiness — done well, it changes how quickly you can make decisions about your business.",
    content: [
      "The most immediate benefit of cloud accounting is timeliness: real-time bank feeds and automated reconciliation mean your numbers are current, not six weeks stale.",
      "Beyond compliance, cloud platforms give business owners a live view of cash position, outstanding invoices and upcoming liabilities — the kind of visibility that supports faster, better decisions.",
      "The transition is usually smoother than owners expect, particularly with historic data migrated carefully and staff trained on the new workflow from day one.",
    ],
    relatedInsights: ["rd-tax-relief-eligibility", "business-forecasting-basics"],
  },
  {
    slug: "business-forecasting-basics",
    title: "Cash flow forecasting: the habit that keeps growing businesses solvent",
    category: "Business Advisory",
    date: "2026-06-09",
    author: "Dieux Advisory Team",
    image: "insight-5",
    featured: false,
    excerpt:
      "Profitable businesses fail from cash flow problems more often than from a lack of demand. A rolling forecast is the simplest safeguard.",
    content: [
      "Profit and cash are not the same thing, and the gap between them is where many otherwise healthy businesses run into trouble.",
      "A rolling 13-week cash flow forecast, updated weekly against actuals, gives owners an early warning system for pinch points — long before they become a crisis.",
      "We build forecasting into our management accounting service for growth-stage clients, pairing the numbers with practical commentary on what's driving the variance.",
    ],
    relatedInsights: ["rd-tax-relief-eligibility", "hmrc-enquiry-what-to-expect"],
  },
  {
    slug: "hmrc-enquiry-what-to-expect",
    title: "Received an HMRC enquiry letter? Here's what happens next",
    category: "Compliance",
    date: "2026-05-21",
    author: "Dieux Advisory Team",
    image: "insight-6",
    featured: false,
    excerpt:
      "An HMRC enquiry letter can be unsettling, but the process is more procedural than most people expect. Here's how to respond calmly and correctly.",
    content: [
      "HMRC enquiries range from routine checks on a single return to more detailed compliance investigations. The scope of the letter usually indicates which type you're facing.",
      "The most important early step is not to respond directly without review — gather the relevant records first and have your accountant assess exactly what's being asked.",
      "Response deadlines matter, but so does accuracy. A rushed, incomplete response can extend an enquiry far longer than a considered one.",
      "We handle correspondence directly with HMRC on behalf of clients facing an enquiry, keeping the process as low-stress and short as possible.",
    ],
    relatedInsights: ["self-assessment-deadline-checklist", "making-tax-digital-for-landlords"],
  },
];

export const getInsightBySlug = (slug) => insights.find((i) => i.slug === slug);
export const getFeaturedInsights = () => insights.filter((i) => i.featured);

export default insights;
