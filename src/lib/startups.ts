export interface Startup {
  id: string;
  name: string;
  tagline: string;
  category: "AI" | "FinTech" | "Health" | "Climate" | "Web3" | "Robotics";
  stage: "Pre-Seed" | "Seed" | "Series A";
  minEntry: number;
  projectedROI: { from: number; to: number };
  riskLevel: "Low" | "Medium" | "High";
  metric: { label: string; value: string | number };
  location: string;
  founder: string;
  description: string;
  highlights: string[];
  createdAt: string; // ISO date for sorting
  trendingScore: number; // 0-100
}

export const startups: Startup[] = [
  {
    id: "1",
    name: "AeroPulse Robotics",
    tagline: "Autonomous drone delivery for last-mile logistics.",
    category: "Robotics",
    stage: "Series A",
    minEntry: 100,
    projectedROI: { from: 18, to: 45 },
    riskLevel: "Medium",
    metric: { label: "Active Drones", value: 450 },
    location: "Austin, TX",
    founder: "Sarah Chen",
    description:
      "AeroPulse builds AI-driven drones capable of navigating complex urban environments for rapid medical and e-commerce delivery. Their proprietary 'SwarmOS' allows single-operator control of up to 50 units.",
    highlights: ["FAA Approved", "Partnership with MedLife", "200% YoY Growth"],
    createdAt: "2023-11-15T00:00:00Z",
    trendingScore: 95,
  },
  {
    id: "2",
    name: "FrostByte AI",
    tagline: "Generative AI for enterprise cold storage optimization.",
    category: "AI",
    stage: "Seed",
    minEntry: 100,
    projectedROI: { from: 25, to: 80 },
    riskLevel: "High",
    metric: { label: "Energy Saved", value: "30 GWh" },
    location: "Reykjavik, Iceland",
    founder: "Magnus Jónsson",
    description:
      "FrostByte uses deep learning to predict thermal loads in industrial freezers, reducing energy consumption by up to 40%.",
    highlights: [
      "Global Cold Chain Partner",
      "Patent Pending",
      "Carbon Neutral",
    ],
    createdAt: "2024-01-10T00:00:00Z",
    trendingScore: 88,
  },
  {
    id: "3",
    name: "MedMint Health",
    tagline: "Decentralized patient data exchange protocol.",
    category: "Health",
    stage: "Pre-Seed",
    minEntry: 100,
    projectedROI: { from: 50, to: 150 },
    riskLevel: "High",
    metric: { label: "Waitlist", value: "12k+" },
    location: "Boston, MA",
    founder: "Dr. Emily Vance",
    description:
      "MedMint empowers patients to own their health records and monetize anonymized data for research using blockchain technology.",
    highlights: [
      "HIPAA Compliant",
      "Top 50 Digital Health",
      "Harvard Innovation Lab",
    ],
    createdAt: "2024-02-01T00:00:00Z",
    trendingScore: 92,
  },
  {
    id: "4",
    name: "CarbonHalo",
    tagline: "Personal carbon credit tracking and offsetting.",
    category: "Climate",
    stage: "Seed",
    minEntry: 100,
    projectedROI: { from: 15, to: 35 },
    riskLevel: "Low",
    metric: { label: "Credits Retired", value: "500t" },
    location: "Berlin, Germany",
    founder: "Lucas Weber",
    description:
      "CarbonHalo integrates with banking APIs to calculate real-time carbon footprints and automatically purchase verified offsets.",
    highlights: ["EU Banking License", "B-Corp Certified", "10k Active Users"],
    createdAt: "2023-12-05T00:00:00Z",
    trendingScore: 78,
  },
  {
    id: "5",
    name: "VaultSprout Finance",
    tagline: "Micro-investing for emerging market small businesses.",
    category: "FinTech",
    stage: "Series A",
    minEntry: 100,
    projectedROI: { from: 12, to: 28 },
    riskLevel: "Medium",
    metric: { label: "AUM", value: "$4.2M" },
    location: "Lagos, Nigeria",
    founder: "Adewale Okafor",
    description:
      "VaultSprout connects global capital with high-growth SMEs in Africa, providing transparent lending yields via stablecoins.",
    highlights: [
      "Y-Combinator Alumni",
      "Default Rate < 2%",
      "Regulated Entity",
    ],
    createdAt: "2023-10-20T00:00:00Z",
    trendingScore: 85,
  },
  {
    id: "6",
    name: "ChainLoom Labs",
    tagline: "Interoperability layer for private blockchains.",
    category: "Web3",
    stage: "Seed",
    minEntry: 100,
    projectedROI: { from: 40, to: 120 },
    riskLevel: "High",
    metric: { label: "Transactions", value: "1.5M" },
    location: "Singapore",
    founder: "Wei Zhang",
    description:
      "ChainLoom allows secure message passing between permissioned enterprise blockchains and public Ethereum networks.",
    highlights: ["Mainnet Live", "Enterprise Clients", "$2M TVL"],
    createdAt: "2024-01-15T00:00:00Z",
    trendingScore: 90,
  },
  {
    id: "7",
    name: "NovaCart Commerce",
    tagline: "AI-powered cart abandonment recovery.",
    category: "AI",
    stage: "Series A",
    minEntry: 100,
    projectedROI: { from: 20, to: 50 },
    riskLevel: "Medium",
    metric: { label: "Recovered Rev", value: "$850k" },
    location: "San Francisco, CA",
    founder: "Jessica Lee",
    description:
      "NovaCart uses predictive NLP to send hyper-personalized SMS and emails that recover up to 35% of abandoned carts.",
    highlights: ["Shopify Plus Partner", "Black Friday Record", " profitable"],
    createdAt: "2023-09-01T00:00:00Z",
    trendingScore: 82,
  },
  {
    id: "8",
    name: "TerraGrid Systems",
    tagline: "Peer-to-peer solar energy trading platform.",
    category: "Climate",
    stage: "Seed",
    minEntry: 100,
    projectedROI: { from: 18, to: 42 },
    riskLevel: "Medium",
    metric: { label: "Homes Powered", value: 1200 },
    location: "Melbourne, Australia",
    founder: "Liam O'Connor",
    description:
      "TerraGrid hardware enables neighbors to sell excess solar power to each other, bypassing centralized grid fees.",
    highlights: ["Government Grant", "Hardware Patent", "Community Led"],
    createdAt: "2024-02-10T00:00:00Z",
    trendingScore: 89,
  },
  {
    id: "9",
    name: "SignalNest",
    tagline: "Social sentiment analysis for retail traders.",
    category: "FinTech",
    stage: "Pre-Seed",
    minEntry: 100,
    projectedROI: { from: 30, to: 90 },
    riskLevel: "High",
    metric: { label: "Daily Users", value: 8500 },
    location: "London, UK",
    founder: "James Harwood",
    description:
      "SignalNest aggregates data from Reddit, Twitter, and Discord to identify trending assets before they break out.",
    highlights: ["Viral Growth", "Freemium Model", "Beta Access"],
    createdAt: "2024-02-20T00:00:00Z",
    trendingScore: 97,
  },
  {
    id: "10",
    name: "NanoBloom Bio",
    tagline: "Synthetic biology for crop yields.",
    category: "Health",
    stage: "Series A",
    minEntry: 100,
    projectedROI: { from: 15, to: 45 },
    riskLevel: "Medium",
    metric: { label: "Acres Deployed", value: "25k" },
    location: "Tel Aviv, Israel",
    founder: "Noa Cohen",
    description:
      "NanoBloom engineers microbes that naturally fix nitrogen, reducing fertilizer dependancy by 50%.",
    highlights: ["FDA Approved", "Series A Closed", "Global Impact"],
    createdAt: "2023-08-15T00:00:00Z",
    trendingScore: 75,
  },
];
