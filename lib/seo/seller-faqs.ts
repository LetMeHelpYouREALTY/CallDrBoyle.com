import type { FAQItem } from "@/lib/schema";
import { agentInfo } from "@/lib/site-config";

const phone = agentInfo.phoneFormatted;

export const SELLER_PAGE_FAQS: Record<string, FAQItem[]> = {
  "move-up": [
    {
      question: "Can I sell my Las Vegas home and buy a larger one at the same time?",
      answer: `Yes. A coordinated sell-and-buy plan helps you use equity toward your next home. Call ${phone} to discuss timing and neighborhoods.`,
    },
    {
      question: "How do move-up sellers avoid owning two homes at once?",
      answer:
        "Options include contingent offers, bridge financing, or staging your sale before you buy. The right approach depends on your equity, lender approval, and market conditions.",
    },
  ],
  downsizing: [
    {
      question: "When does downsizing make sense in Las Vegas?",
      answer:
        "Many homeowners downsize after kids leave home, when maintenance becomes too much, or to reduce monthly costs. We help you compare net proceeds and lifestyle fit.",
    },
    {
      question: "Can I downsize and stay in the same area?",
      answer: `Often yes — condos, townhomes, and smaller single-family homes are available across Las Vegas and Henderson. Call ${phone} to review options.`,
    },
  ],
  "divorce-probate": [
    {
      question: "Do you handle divorce or probate home sales in Las Vegas?",
      answer:
        "Sensitive sales require clear communication, timeline planning, and coordination with attorneys when needed. Contact us for a private consultation.",
    },
    {
      question: "How is a home valued for divorce or probate?",
      answer:
        "We provide market analysis based on recent comparable sales and property condition. Final decisions may also involve attorneys or court requirements.",
    },
  ],
  relocation: [
    {
      question: "I am leaving Las Vegas — how do I sell from out of state?",
      answer:
        "We coordinate showings, offers, and closing remotely with secure document signing and regular updates so you do not need to be local for every step.",
    },
    {
      question: "How fast can I sell before my job relocation deadline?",
      answer: `Timing depends on pricing, condition, and market demand. Call ${phone} for a realistic timeline based on your neighborhood.`,
    },
  ],
};
