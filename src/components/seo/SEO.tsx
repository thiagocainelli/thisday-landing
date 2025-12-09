import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Componente para gerenciar meta tags dinamicamente por página
 * Melhora o SEO e permite diferentes títulos/descrições por rota
 */
const SEO = ({
  title = "thisday - Reúna todas as fotos do seu evento com QR Code",
  description = "Centralize todas as fotos e vídeos do seu evento em um único lugar usando apenas um QR Code. Simples, rápido e temporário.",
  keywords = "fotos evento, vídeos evento, QR code fotos, compartilhar fotos evento, casamento fotos, festa fotos",
  image = "https://thisday.app/og-image.jpg",
  url = "https://thisday.app",
  type = "website",
  noindex = false,
  nofollow = false,
}: SEOProps) => {
  useEffect(() => {
    // Atualizar título
    document.title = title;

    // Meta tags básicas
    updateMetaTag("name", "title", title);
    updateMetaTag("name", "description", description);
    updateMetaTag("name", "keywords", keywords);

    // Robots
    const robotsContent = [
      noindex ? "noindex" : "index",
      nofollow ? "nofollow" : "follow",
    ].join(", ");
    updateMetaTag("name", "robots", robotsContent);

    // Open Graph
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:image", image);
    updateMetaTag("property", "og:url", url);
    updateMetaTag("property", "og:type", type);

    // Twitter Card
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", image);
    updateMetaTag("name", "twitter:url", url);

    // Canonical URL
    updateCanonical(url);
  }, [title, description, keywords, image, url, type, noindex, nofollow]);

  const updateMetaTag = (
    attribute: "name" | "property",
    value: string,
    content: string
  ) => {
    let element = document.querySelector(
      `meta[${attribute}="${value}"]`
    ) as HTMLMetaElement;

    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, value);
      document.head.appendChild(element);
    }

    element.setAttribute("content", content);
  };

  const updateCanonical = (url: string) => {
    let element = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;

    if (!element) {
      element = document.createElement("link");
      element.setAttribute("rel", "canonical");
      document.head.appendChild(element);
    }

    element.setAttribute("href", url);
  };

  return null;
};

export default SEO;
