/**
 * Compact global hero banner config — shown on every page via root layout.
 * Distinct from full-bleed PageHero (homepage / page-level heroes).
 */

export type GlobalHeroConfig = {
  src: string;
  alt: string;
  tagline: string;
  phoneDisplay?: string;
  phoneTel?: string;
};

export const GLOBAL_HERO: GlobalHeroConfig = {
  src: "/images/global-hero/call-dr-boyle.jpg",
  alt: "Scenic highway vista overlooking arid valley and mountains near Las Vegas, NV",
  tagline: "Call Dr. Gene Boyle — Irvine to Las Vegas Relocation",
  phoneDisplay: "(702) 222-1964",
  phoneTel: "tel:+17022221964",
};
