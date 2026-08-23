import { useEffect } from "react";
import { siteConfig } from "../../constants/siteConfig";

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setStructuredData(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Renders no DOM — manages document.head tags for the active route.
 * Usage: <Seo title="Services" description="..." breadcrumbs={[{name, url}]} />
 */
export default function Seo({
  title,
  description,
  path = "",
  image,
  breadcrumbs = [],
  structuredData,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title}${siteConfig.seoDefaults.titleSuffix}` : siteConfig.name;
    const desc = description || siteConfig.seoDefaults.defaultDescription;
    const url = `${siteConfig.url}${path}`;
    const ogImage = image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.seoDefaults.ogImage}`;

    document.title = fullTitle;
    setMetaTag("name", "description", desc);
    setLinkTag("canonical", url);

    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", desc);
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:type", "website");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", desc);

    setStructuredData(
      "structured-data-organization",
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        email: siteConfig.contact.email,
        areaServed: "GB",
      }
    );

    if (breadcrumbs.length > 0) {
      setStructuredData("structured-data-breadcrumb", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: `${siteConfig.url}${crumb.url}`,
        })),
      });
    }

    if (structuredData) {
      setStructuredData("structured-data-page", structuredData);
    }
  }, [title, description, path, image, breadcrumbs, structuredData]);

  return null;
}
