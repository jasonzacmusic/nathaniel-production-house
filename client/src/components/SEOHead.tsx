import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SITE_NAME = "Nathaniel Production House";
const BASE_URL = "https://studio.nathanielschool.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export default function SEOHead({
  title,
  description,
  path = "",
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  jsonLd,
}: SEOHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Basic meta
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_IN");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:url", canonicalUrl);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // JSON-LD structured data
    document.querySelectorAll('script[data-seo="page"]').forEach((el) => el.remove());

    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((data) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo", "page");
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.querySelectorAll('script[data-seo="page"]').forEach((el) => el.remove());
    };
  }, [fullTitle, description, path, ogType, ogImage, keywords, canonicalUrl, jsonLd]);

  return null;
}

// Reusable JSON-LD schema builders
export const schemas = {
  breadcrumb: (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }),

  faq: (questions: { q: string; a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }),

  service: (name: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Nathaniel Production House",
      url: BASE_URL,
    },
    areaServed: { "@type": "City", name: "Bangalore" },
  }),

  softwareApp: (name: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@type": "Organization", name: "Nathaniel Production House" },
  }),

  article: (title: string, description: string, path: string) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}${path}`,
    publisher: {
      "@type": "Organization",
      name: "Nathaniel Production House",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-full.png` },
    },
    author: { "@type": "Organization", name: "Nathaniel School of Music" },
  }),
};
