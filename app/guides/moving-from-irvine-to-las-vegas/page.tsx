import type { Metadata } from "next";
import IrvineToLasVegasPageContent from "@/components/relocation/IrvineToLasVegasPageContent";
import { generateMarketingMetadata } from "@/lib/seo/generate-marketing-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateMarketingMetadata("/guides/moving-from-irvine-to-las-vegas", {
    title: "Moving from Irvine to Las Vegas — Guide",
    description:
      "Step-by-step guide for moving from Irvine, California to Las Vegas: planning in Irvine with Dr. Gene Boyle and Las Vegas execution with Dr. Jan Duffy.",
    keywords: [
      "moving from Irvine to Las Vegas guide",
      "Irvine to Las Vegas checklist",
      "relocate Irvine to Nevada",
    ],
  });
}

export default function MovingGuidePage() {
  return (
    <IrvineToLasVegasPageContent
      path="/guides/moving-from-irvine-to-las-vegas"
      h1="Guide: Moving from Irvine to Las Vegas"
      breadcrumbLabel="Moving guide"
    />
  );
}
