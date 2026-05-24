import type { Metadata } from "next";
import IrvineToLasVegasPageContent from "@/components/relocation/IrvineToLasVegasPageContent";
import { generateMarketingMetadata } from "@/lib/seo/generate-marketing-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateMarketingMetadata("/irvine-to-las-vegas", {
    title: "Irvine to Las Vegas Relocation | Dr. Gene Boyle",
    description:
      "Dr. Gene Boyle helps people move from Irvine, California to Las Vegas. Plan in Irvine; Dr. Jan Duffy supports tours and closing in Nevada.",
    keywords: [
      "Irvine to Las Vegas",
      "move from Irvine to Las Vegas",
      "Irvine California relocation",
      "Las Vegas relocation from Orange County",
      "Dr Gene Boyle",
    ],
  });
}

export default function IrvineToLasVegasPage() {
  return (
    <IrvineToLasVegasPageContent
      path="/irvine-to-las-vegas"
      h1="Move from Irvine, California to Las Vegas"
      breadcrumbLabel="Irvine to Las Vegas"
    />
  );
}
