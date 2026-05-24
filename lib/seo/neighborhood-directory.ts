/** Feature-based neighborhood summaries for /neighborhoods (fair-housing neutral). */

export type NeighborhoodDirectoryEntry = {
  name: string;
  slug: string;
  medianPrice: string;
  priceChange: string;
  description: string;
  highlights: string[];
  /** Home styles, amenities, and commute — not demographic targeting */
  featureFocus: string;
};

export const NEIGHBORHOOD_DIRECTORY: NeighborhoodDirectoryEntry[] = [
  {
    name: "Summerlin",
    slug: "summerlin",
    medianPrice: "$625,000",
    priceChange: "+6.8%",
    description:
      "Master-planned west Las Vegas with 150+ parks, trail systems, Downtown Summerlin retail, and Red Rock Canyon access.",
    highlights: ["150+ Parks", "Red Rock Views", "Downtown Summerlin", "CCSD districts"],
    featureFocus: "Single-family, townhomes, and condos; golf and hiking access",
  },
  {
    name: "Henderson",
    slug: "henderson",
    medianPrice: "$485,000",
    priceChange: "+5.1%",
    description:
      "Nevada's second-largest city with Lake Las Vegas, Green Valley, and Anthem master plans plus a growing medical corridor.",
    highlights: ["Lake Las Vegas", "Green Valley", "Anthem", "Water Street District"],
    featureFocus: "Mix of 1980s–2020s builds; 15–25 min to Strip via I-515",
  },
  {
    name: "Green Valley",
    slug: "green-valley",
    medianPrice: "$520,000",
    priceChange: "+4.8%",
    description:
      "Established Henderson with mature landscaping, The District at Green Valley Ranch, and multiple golf courses.",
    highlights: ["Golf Courses", "Walking Trails", "The District", "Mature Trees"],
    featureFocus: "Ranch and two-story homes; strong resale inventory",
  },
  {
    name: "The Ridges",
    slug: "the-ridges",
    medianPrice: "$2,500,000",
    priceChange: "+8.5%",
    description:
      "Guard-gated Summerlin enclave with custom estates, Bear's Best Golf Club, and Strip and valley views.",
    highlights: ["Guard-Gated", "Custom Estates", "Bear's Best Golf", "Strip Views"],
    featureFocus: "Luxury custom and semi-custom; 20–30 min to Strip",
  },
  {
    name: "Southern Highlands",
    slug: "southern-highlands",
    medianPrice: "$750,000",
    priceChange: "+7.2%",
    description:
      "Southwest Las Vegas master plan with championship golf, mountain views, and newer guard-gated sections.",
    highlights: ["Golf Community", "Guard-Gated Options", "Mountain Views", "Newer Phases"],
    featureFocus: "Golf-course and view lots; 20 min to Strip via I-15",
  },
  {
    name: "North Las Vegas",
    slug: "north-las-vegas",
    medianPrice: "$385,000",
    priceChange: "+3.2%",
    description:
      "Fast-growing north valley with new construction from Lennar, DR Horton, and other national builders near Craig Road.",
    highlights: ["New Construction", "Lower Entry Price", "Aliante", "I-15 Access"],
    featureFocus: "Entry-level and move-up single-family; 25–35 min to Strip",
  },
  {
    name: "Skye Canyon",
    slug: "skye-canyon",
    medianPrice: "$550,000",
    priceChange: "+5.5%",
    description:
      "Northwest master plan with Skye Center amenity hub, trail network, and newer CCSD school facilities.",
    highlights: ["Skye Center", "Trail Network", "Newer Builds", "Mountain Views"],
    featureFocus: "2010s–2020s production homes; 25 min to Strip",
  },
  {
    name: "Centennial Hills",
    slug: "centennial-hills",
    medianPrice: "$495,000",
    priceChange: "+4.8%",
    description:
      "Northwest Las Vegas near Floyd Lamb Park and Centennial Hills Park with retail along Skye Canyon Drive.",
    highlights: ["Centennial Hills Park", "Floyd Lamb Park", "Retail Corridor", "I-215 Access"],
    featureFocus: "Single-family on larger lots; 30 min to Strip",
  },
  {
    name: "Inspirada",
    slug: "inspirada",
    medianPrice: "$525,000",
    priceChange: "+5.0%",
    description:
      "Henderson master plan with resort-style pools, walking paths, and builders including Toll Brothers and Lennar.",
    highlights: ["Resort Pools", "Walking Trails", "New Construction", "Henderson Location"],
    featureFocus: "2010s–2020s builds; 20 min to Strip via I-515",
  },
  {
    name: "Mountains Edge",
    slug: "mountains-edge",
    medianPrice: "$475,000",
    priceChange: "+4.5%",
    description:
      "Southwest Las Vegas community with mountain views, community parks, and proximity to Southern Highlands.",
    highlights: ["Mountain Views", "Community Parks", "Southwest Location", "Value Pricing"],
    featureFocus: "Production single-family; 25 min to Strip",
  },
];
