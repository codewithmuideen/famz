// Dieux operates a remote-first, technology-driven service model from a UK base,
// serving clients across these regions. Data here drives the /locations page.

export const homeBase = {
  city: "London",
  country: "United Kingdom",
  image: "location-london",
  description:
    "Our team is based in the UK and works with clients directly wherever they are — in person where useful, and remotely via secure cloud tools as standard.",
};

export const regions = [
  {
    region: "United Kingdom",
    image: "location-building-1",
    summary: "Our core market — UK individuals, landlords, contractors and businesses of every size.",
    coverage: ["England", "Scotland", "Wales", "Northern Ireland"],
  },
  {
    region: "Europe",
    image: "location-building-2",
    summary: "Cross-border tax and accounting support for EU-connected individuals and businesses.",
    coverage: ["Ireland", "France", "Germany", "Netherlands", "Spain"],
  },
  {
    region: "North America",
    image: "global-hongkong",
    summary: "Advisory for US and Canadian businesses with UK entities, tax or trading obligations.",
    coverage: ["United States", "Canada"],
  },
  {
    region: "Middle East & Asia-Pacific",
    image: "global-london",
    summary: "Support for international clients with UK tax residency or business interests.",
    coverage: ["United Arab Emirates", "Singapore", "Hong Kong"],
  },
];

export default regions;
