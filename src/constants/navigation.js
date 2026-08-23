// Central navigation + mega menu data.
// Header.jsx and MegaMenu.jsx map over this — do not hard-code links in components.

export const primaryNav = [
  {
    label: "Services",
    path: "/services",
    megaMenu: "services",
  },
  {
    label: "Industries",
    path: "/industries",
    megaMenu: "industries",
  },
  {
    label: "Insights",
    path: "/insights",
  },
  {
    label: "Careers",
    path: "/careers",
  },
  {
    label: "Who We Are",
    path: "/about",
    megaMenu: "about",
  },
];

export const servicesMenu = {
  heading: "Our Services",
  description:
    "Practical, end-to-end accounting and advisory support — from everyday compliance to strategic financial guidance.",
  columns: [
    {
      title: "All Services",
      items: [
        { label: "Services for Individuals", to: "/services/individuals" },
        { label: "Accounting & Compliance", to: "/services/accounting-compliance" },
        { label: "Tax Services", to: "/services/tax" },
        { label: "Business Advisory", to: "/services/business-advisory" },
        { label: "Finance & Consultancy", to: "/services/finance-consultancy" },
        { label: "Specialist Services", to: "/services/specialist-services" },
      ],
    },
    {
      title: "Popular Solutions",
      items: [
        { label: "Self Assessment Tax Returns", to: "/services/individuals" },
        { label: "VAT Returns & Advisory", to: "/services/tax" },
        { label: "Payroll Services", to: "/services/accounting-compliance" },
        { label: "Cloud Accounting & Bookkeeping", to: "/services/accounting-compliance" },
        { label: "Cash Flow Forecasting", to: "/services/business-advisory" },
        { label: "R&D Tax Relief Support", to: "/services/specialist-services" },
        { label: "Outsourced Finance / Fractional CFO", to: "/services/finance-consultancy" },
        { label: "HMRC Enquiries & Investigations", to: "/services/tax" },
      ],
    },
  ],
  featured: {
    label: "Not sure where to start?",
    title: "Talk to our team about your goals",
    image: "service-advisory",
    to: "/contact",
    cta: "Get in touch",
  },
};

export const industriesMenu = {
  heading: "Industries We Serve",
  description:
    "Sector-aware advice shaped by how your industry actually operates, not generic guidance.",
  columns: [
    {
      title: "Sectors We Know Well",
      items: [
        { label: "Technology & Software", to: "/industries/technology-software" },
        { label: "E-commerce", to: "/industries/ecommerce" },
        { label: "Financial Services", to: "/industries/financial-services" },
        { label: "Property & Real Estate", to: "/industries/property-real-estate" },
        { label: "Construction", to: "/industries/construction" },
        { label: "Healthcare", to: "/industries/healthcare" },
        { label: "Retail & Hospitality", to: "/industries/retail-hospitality" },
        { label: "Professional Services & Consultancy", to: "/industries/professional-services-consultancy" },
      ],
    },
    {
      title: "Also Supporting",
      items: [
        { label: "Start-ups & Scale-ups", to: "/industries" },
        { label: "Contractors & Freelancers", to: "/industries" },
        { label: "Creative Industries", to: "/industries" },
        { label: "Financial Services Firms", to: "/industries" },
        { label: "International Businesses", to: "/industries" },
      ],
    },
  ],
  featured: {
    label: "View all sectors",
    title: "See every industry we support",
    image: "industry-consultancy",
    to: "/industries",
    cta: "Explore industries",
  },
};

export const aboutMenu = {
  heading: "Who We Are",
  description:
    "A modern, ACCA-regulated accounting and advisory firm — get to know how we work and who we work with.",
  columns: [
    {
      title: "The Firm",
      items: [
        { label: "About Us", to: "/about" },
        { label: "Our Approach", to: "/about" },
        { label: "Our Team", to: "/about" },
        { label: "Careers", to: "/careers" },
      ],
    },
    {
      title: "Explore",
      items: [
        { label: "Insights", to: "/insights" },
        { label: "Locations", to: "/locations" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
  ],
  featured: {
    label: "Get in touch",
    title: "Let's talk about your finances and your future",
    image: "about-office-glass",
    to: "/contact",
    cta: "Contact us",
  },
};

export const footerNav = {
  services: [
    { label: "Services for Individuals", to: "/services/individuals" },
    { label: "Accounting & Compliance", to: "/services/accounting-compliance" },
    { label: "Tax Services", to: "/services/tax" },
    { label: "Business Advisory", to: "/services/business-advisory" },
    { label: "Finance & Consultancy", to: "/services/finance-consultancy" },
    { label: "Specialist Services", to: "/services/specialist-services" },
  ],
  industries: [
    { label: "Technology & Software", to: "/industries/technology-software" },
    { label: "E-commerce", to: "/industries/ecommerce" },
    { label: "Financial Services", to: "/industries/financial-services" },
    { label: "Property & Real Estate", to: "/industries/property-real-estate" },
    { label: "Construction", to: "/industries/construction" },
    { label: "Healthcare", to: "/industries/healthcare" },
  ],
  company: [
    { label: "Who We Are", to: "/about" },
    { label: "Insights", to: "/insights" },
    { label: "Careers", to: "/careers" },
    { label: "Locations", to: "/locations" },
    { label: "Contact", to: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms of Use", to: "/terms" },
    { label: "Cookie Preferences", to: "#cookie-preferences" },
  ],
};

// Dieux is UK-based with a remote-first, technology-driven service model —
// these are client regions served, not a claim of physical branch offices.
export const locationSelectorData = [
  {
    region: "United Kingdom",
    description: "UK-wide client service, based in London.",
    countries: ["England", "Scotland", "Wales", "Northern Ireland"],
  },
  {
    region: "Europe",
    description: "Cross-border tax & accounting support for EU-connected clients.",
    countries: ["Ireland", "France", "Germany", "Netherlands"],
  },
  {
    region: "North America",
    description: "Support for US/Canada businesses with UK operations.",
    countries: ["United States", "Canada"],
  },
  {
    region: "Middle East & Asia-Pacific",
    description: "Advisory for international clients with UK tax obligations.",
    countries: ["United Arab Emirates", "Singapore", "Hong Kong"],
  },
];
