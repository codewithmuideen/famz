// Centralised site configuration.
// Replace these values to re-brand the site for a different client.

export const siteConfig = {
  name: "Dieux Accounting & Advisory",
  shortName: "Dieux",
  tagline: "Accounting expertise. Commercial insight. Business growth.",
  description:
    "Dieux Accounting & Advisory is an ACCA-regulated accounting and advisory firm providing accounting, tax, finance and business advisory services to individuals, entrepreneurs, owner-managed businesses, SMEs and growing companies across the UK and internationally.",
  url: "https://www.dieuxltd.com",

  // NOTE: address is an illustrative placeholder — replace with verified
  // details before launch.
  contact: {
    email: "Info@dieux.co.uk",
    phoneDisplay: "020 3633 9182",
    phoneHref: "+442036339182",
    addressLine1: "London, United Kingdom",
    addressLine2: "UK-wide & international client service",
    country: "United Kingdom",
  },

  social: {
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },

  regulator: {
    name: "Association of Chartered Certified Accountants (ACCA)",
    short: "ACCA Regulated Firm",
  },

  stats: [
    { value: 12, suffix: "+", label: "Years of combined expertise" },
    { value: 500, suffix: "+", label: "Individuals & businesses supported" },
    { value: 20, suffix: "+", label: "Sectors served" },
    { value: 98, suffix: "%", label: "Client retention rate" },
  ],

  seoDefaults: {
    titleSuffix: " | Dieux Accounting & Advisory",
    defaultDescription:
      "ACCA-regulated accounting, tax, finance and business advisory services for individuals and ambitious businesses across the UK and internationally.",
    ogImage: "/og-image.jpg",
  },
};

export default siteConfig;
