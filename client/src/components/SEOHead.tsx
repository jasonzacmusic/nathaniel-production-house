import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
}

export default function SEOHead({ title, description, path = "" }: SEOHeadProps) {
  useEffect(() => {
    document.title = `${title} | Nathaniel Production House`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", `${title} | Nathaniel Production House`);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", `https://tech.nathanielschool.com${path}`);
    }
    
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", `${title} | Nathaniel Production House`);
    }
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute("content", description);
    }
    
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `https://tech.nathanielschool.com${path}`);
    }
  }, [title, description, path]);

  return null;
}
