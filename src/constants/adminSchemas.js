// Field schemas for the generic admin CollectionManager / SchemaForm.

export const servicesSchema = [
  { key: "slug", label: "Slug (used in the URL)", type: "text" },
  { key: "icon", label: "Icon", type: "icon" },
  { key: "image", label: "Image", type: "image" },
  { key: "title", label: "Title", type: "text" },
  { key: "shortDescription", label: "Short description (card summary)", type: "textarea" },
  { key: "fullDescription", label: "Full description (detail page)", type: "textarea" },
  { key: "featured", label: "Featured on homepage", type: "boolean" },
  { key: "offerings", label: "Offerings list", type: "list" },
  { key: "relatedServices", label: "Related service slugs", type: "tags" },
  { key: "relatedIndustries", label: "Related industry slugs", type: "tags" },
];

export const industriesSchema = [
  { key: "slug", label: "Slug (used in the URL)", type: "text" },
  { key: "icon", label: "Icon", type: "icon" },
  { key: "image", label: "Image", type: "image" },
  { key: "title", label: "Title", type: "text" },
  { key: "shortDescription", label: "Short description (card summary)", type: "textarea" },
  { key: "challenges", label: "Challenges list", type: "list" },
  { key: "solutions", label: "Solutions list", type: "list" },
  { key: "relatedServices", label: "Related service slugs", type: "tags" },
];

export const insightsSchema = [
  { key: "slug", label: "Slug (used in the URL)", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "category", label: "Category", type: "text" },
  { key: "date", label: "Date (YYYY-MM-DD)", type: "text" },
  { key: "author", label: "Author", type: "text" },
  { key: "image", label: "Image", type: "image" },
  { key: "featured", label: "Featured", type: "boolean" },
  { key: "excerpt", label: "Excerpt", type: "textarea" },
  { key: "content", label: "Article paragraphs", type: "list" },
  { key: "relatedInsights", label: "Related insight slugs", type: "tags" },
];

export const testimonialsSchema = [
  { key: "quote", label: "Quote", type: "textarea" },
  { key: "author", label: "Author", type: "text" },
  { key: "role", label: "Role", type: "text" },
];

export const careersSchema = [
  { key: "slug", label: "Slug", type: "text" },
  { key: "title", label: "Role title", type: "text" },
  { key: "department", label: "Department", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "type", label: "Employment type", type: "text" },
  { key: "summary", label: "Summary", type: "textarea" },
];

export const regionsSchema = [
  { key: "region", label: "Region name", type: "text" },
  { key: "image", label: "Image", type: "image" },
  { key: "summary", label: "Summary", type: "textarea" },
  { key: "coverage", label: "Countries covered", type: "tags" },
];

export const founderSchema = [
  { key: "name", label: "Name", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "image", label: "Photo", type: "image" },
  { key: "intro", label: "Intro paragraphs", type: "list" },
  { key: "approachHeading", label: "Approach: heading", type: "text" },
  { key: "approachParagraphs", label: "Approach: paragraphs", type: "list" },
  { key: "expertiseHeading", label: "Expertise: heading", type: "text" },
  { key: "expertiseItems", label: "Expertise: items list", type: "list" },
  { key: "philosophyHeading", label: "Philosophy: heading", type: "text" },
  { key: "philosophyParagraphs", label: "Philosophy: paragraphs", type: "list" },
];

export const homeBaseSchema = [
  { key: "city", label: "City", type: "text" },
  { key: "country", label: "Country", type: "text" },
  { key: "image", label: "Image", type: "image" },
  { key: "description", label: "Description", type: "textarea" },
];

export const valuesSchema = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
];

export const promisesSchema = [
  { key: "icon", label: "Icon", type: "icon" },
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
];

export const audiencesSchema = [
  { key: "icon", label: "Icon", type: "icon" },
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
];

export const faqsSchema = [
  { key: "question", label: "Question", type: "text" },
  { key: "answer", label: "Answer", type: "textarea" },
];

export const benefitsSchema = [
  { key: "icon", label: "Icon", type: "icon" },
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
];
