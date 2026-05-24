import PageSeoExtras from "@/components/seo/PageSeoExtras";
import { AeoFaqSection } from "@/lib/seo/aeo-sections";
import { SELLER_PAGE_FAQS } from "@/lib/seo/seller-faqs";
import { generateFAQSchema } from "@/lib/schema";

type SellerSubpageSeoProps = {
  pageKey: keyof typeof SELLER_PAGE_FAQS;
  path: string;
  title: string;
  speakableSummary: string;
};

export function SellerPageSeoHead({
  pageKey,
  path,
  title,
  speakableSummary,
}: SellerSubpageSeoProps) {
  const faqs = SELLER_PAGE_FAQS[pageKey];

  return (
    <PageSeoExtras
      path={path}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Sellers", href: "/sellers" },
        { name: title, href: path },
      ]}
      speakable={{ headline: title, summary: speakableSummary }}
      schemas={[generateFAQSchema(faqs)]}
    />
  );
}

export function SellerPageSeoFaq({ pageKey }: { pageKey: keyof typeof SELLER_PAGE_FAQS }) {
  return <AeoFaqSection title="Seller questions" faqs={SELLER_PAGE_FAQS[pageKey]} />;
}
