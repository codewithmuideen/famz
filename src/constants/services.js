// Data-driven service catalogue. Components map over this array —
// add/remove/edit a service here and it updates /services and /services/:slug automatically.

export const services = [
  {
    slug: "individuals",
    icon: "UserRound",
    image: "service-individuals",
    title: "Services for Individuals",
    shortDescription:
      "Personal tax and financial support for private individuals, contractors and high-income professionals.",
    fullDescription:
      "We help private individuals stay on top of their personal tax affairs with clear, timely advice — whether you're filing a Self Assessment return, managing rental income, or planning around a significant life or financial event. Our approach is personal: every client receives advice tailored to their specific circumstances, not a one-size-fits-all checklist.",
    featured: true,
    offerings: [
      "Self Assessment Tax Returns",
      "Personal Tax Planning",
      "Income Tax Advice",
      "Capital Gains Tax",
      "Property & Rental Income Tax",
      "Tax Compliance",
      "HMRC Enquiries & Tax Investigations",
      "Personal Financial Reporting",
      "Contractor & Freelancer Accounting",
      "Tax Advice for High-Income Individuals",
      "International & Cross-Border Tax Support",
    ],
    relatedServices: ["tax", "accounting-compliance"],
    relatedIndustries: ["property-real-estate", "professional-services-consultancy"],
  },
  {
    slug: "accounting-compliance",
    icon: "FileSpreadsheet",
    image: "service-accounting",
    title: "Accounting & Compliance",
    shortDescription:
      "Statutory accounts, bookkeeping, VAT and payroll — accurate, on time, every time.",
    fullDescription:
      "Reliable compliance is the foundation of good financial management. We keep your accounting records accurate and up to date using modern cloud accounting tools, so you always have a clear, current view of your financial position and never miss a filing deadline.",
    featured: true,
    offerings: [
      "Statutory Accounts Preparation",
      "Management Accounts",
      "Monthly & Quarterly Accounting",
      "Bookkeeping",
      "Cloud Accounting",
      "Financial Reporting",
      "Corporation Tax Returns",
      "Self Assessment Tax Returns",
      "VAT Returns & VAT Advisory",
      "Payroll Services",
      "Construction Industry Scheme (CIS)",
      "Making Tax Digital (MTD)",
      "Companies House Filings",
      "Confirmation Statements",
      "Company Secretarial Services",
    ],
    relatedServices: ["tax", "finance-consultancy"],
    relatedIndustries: ["construction", "retail-hospitality"],
  },
  {
    slug: "tax",
    icon: "Receipt",
    image: "service-tax",
    title: "Tax Services",
    shortDescription:
      "Corporation tax, personal tax, VAT and tax planning for individuals and businesses.",
    fullDescription:
      "Tax legislation is complex and constantly changing. We provide clear, practical tax advice that keeps you compliant while making sure you aren't paying more than you need to — from routine compliance through to more involved tax planning and HMRC enquiries.",
    featured: true,
    offerings: [
      "Corporation Tax",
      "Personal Tax",
      "Self Assessment",
      "VAT Advisory",
      "Capital Gains Tax",
      "Tax Planning",
      "Tax Investigations & HMRC Enquiries",
      "Tax Compliance",
      "R&D Tax Relief Support",
      "Property Tax",
      "International & Cross-Border Tax Support",
    ],
    relatedServices: ["individuals", "accounting-compliance"],
    relatedIndustries: ["technology-software", "property-real-estate"],
  },
  {
    slug: "business-advisory",
    icon: "LineChart",
    image: "service-advisory",
    title: "Business Advisory",
    shortDescription:
      "Business planning, forecasting and strategic financial advisory for growing businesses.",
    fullDescription:
      "Beyond compliance, we work as a strategic partner to owner-managed businesses and SMEs — helping you plan, forecast and make informed decisions with confidence. From start-up structuring to acquisition support, we're focused on your commercial outcomes, not just your paperwork.",
    featured: true,
    offerings: [
      "Business Planning",
      "Financial Forecasting",
      "Budgeting & Cash Flow Forecasting",
      "Management Information",
      "Business Performance Reviews",
      "Financial Modelling",
      "Strategic Financial Advisory",
      "Business Process Improvement",
      "Finance Function Advisory",
      "Growth & Expansion Planning",
      "Business Start-Up Advisory",
      "Company Formation & Structuring",
      "Business Acquisition & Disposal Support",
    ],
    relatedServices: ["finance-consultancy", "specialist-services"],
    relatedIndustries: ["technology-software", "ecommerce"],
  },
  {
    slug: "finance-consultancy",
    icon: "Briefcase",
    image: "service-finance",
    title: "Finance & Consultancy",
    shortDescription:
      "Outsourced finance function and fractional CFO-level advisory support.",
    fullDescription:
      "Not every growing business needs a full-time finance department. Our fractional finance and consultancy services give you access to senior financial expertise — from finance director-level insight to systems and process improvement — at a cost that scales with your business.",
    featured: false,
    offerings: [
      "Fractional Finance Support",
      "Outsourced Finance Services",
      "Finance Director / CFO Advisory",
      "Financial Due Diligence",
      "Financial Analysis",
      "Cost Reduction & Profit Improvement",
      "Financial Systems & Process Improvement",
      "Accounting Systems Implementation",
      "Finance Transformation",
      "Management Reporting",
    ],
    relatedServices: ["business-advisory", "specialist-services"],
    relatedIndustries: ["financial-services", "professional-services-consultancy"],
  },
  {
    slug: "specialist-services",
    icon: "Sparkles",
    image: "service-specialist",
    title: "Specialist Services",
    shortDescription:
      "Sector-specific accounting for property, e-commerce, contractors and technology businesses.",
    fullDescription:
      "Some sectors have accounting and tax considerations that generic advice simply doesn't cover. Our specialist services are shaped around the specific commercial realities of property, e-commerce, contracting, technology and financial services businesses.",
    featured: false,
    offerings: [
      "Property Accounting & Tax",
      "E-commerce Accounting",
      "Contractor & Consultant Accounting",
      "Technology & Software Business Accounting",
      "Financial Services Accounting",
      "International Business Support",
    ],
    relatedServices: ["business-advisory", "tax"],
    relatedIndustries: ["ecommerce", "technology-software"],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
export const getFeaturedServices = () => services.filter((s) => s.featured);

export default services;
