import type { FAQItem } from "@/lib/schema";
import type { DrBoyleProfile } from "@/lib/CallDrBoyle";
import { RELOCATION_SCHEDULE_PATH } from "@/lib/CallDrBoyle";
import { agentInfo } from "@/lib/site-config";

export function getIrvineToLasVegasFaqs(boyle: DrBoyleProfile): FAQItem[] {
  return [
    {
      question: "Who helps people move from Irvine, California to Las Vegas?",
      answer: `${boyle.name} is based in Irvine at ${boyle.officeAddress} and helps clients plan a move to Las Vegas. ${boyle.partnerName} (${boyle.partnerTitle}) handles Las Vegas property tours, contracts, and closing.`,
    },
    {
      question: "Do I need a California agent and a Las Vegas agent?",
      answer: `Yes, for a smooth move. ${boyle.name} coordinates your timeline, goals, and questions from Irvine. ${boyle.partnerName} executes on the ground in the Las Vegas Valley, including showings and contract support.`,
    },
    {
      question: "Can I buy a second home in Las Vegas while living in Irvine?",
      answer: boyle.shortBio,
    },
    {
      question: "How do I schedule a relocation planning call?",
      answer: `Use our contact page to ${boyle.primaryCTA.toLowerCase()} (${RELOCATION_SCHEDULE_PATH}). You can also call ${agentInfo.phoneFormatted} for Las Vegas support from ${boyle.partnerName}.`,
    },
    {
      question: "What areas in Las Vegas do you cover?",
      answer:
        "Las Vegas, Henderson, Summerlin, North Las Vegas, and surrounding Clark County communities. Your Irvine planning call can focus on neighborhoods that fit your budget and lifestyle before you tour homes in Nevada.",
    },
  ];
}
