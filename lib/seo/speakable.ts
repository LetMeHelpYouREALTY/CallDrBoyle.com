export type SpeakableBlock = {
  headline: string;
  summary: string;
  cssSelectors?: string[];
};

export function generateSpeakableSchema(
  baseUrl: string,
  pagePath: string,
  block: SpeakableBlock
) {
  const pageUrl = `${baseUrl.replace(/\/$/, "")}${pagePath.startsWith("/") ? pagePath : `/${pagePath}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: block.headline,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: block.cssSelectors ?? ["#speakable-summary", "h1"],
    },
    description: block.summary,
  };
}
