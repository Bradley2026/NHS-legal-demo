export type OrgCategory = "Provider" | "ICB";
export type ProviderType = "Acute – Medium" | "Acute – Large" | "Mental Health" | "Specialist" | "ICB";
export type CohortFilter = "all" | "providers" | "icbs";
export type Year = "fy2223" | "fy2324" | "fy2425";

export interface PeerOrg {
  id: string;
  category: OrgCategory;
  type: ProviderType;
  fy2223: number | null;
  fy2324: number | null;
  fy2425: number | null;
  isAnytown: boolean;
  excludeFromBenchmark: boolean;
}

// Anytown's historical peer-comparable spend figures. Kept as a named
// constant so the benchmarking view can be updated independently of the
// current-year dashboard (spend-summary.ts covers FY25/26).
export const ANYTOWN_PEER_SPEND = {
  fy2223: 312000,
  fy2324: 382000,
  fy2425: 450000,
} as const;

export const YEAR_LABELS: Record<Year, string> = {
  fy2223: "FY22/23",
  fy2324: "FY23/24",
  fy2425: "FY24/25",
};

export const YEARS: Year[] = ["fy2223", "fy2324", "fy2425"];

// Dataset extracted and anonymised from FOI tracker.
// null = no figure returned for that year — never treat as £0.
// excludeFromBenchmark flag kept for future use (no org currently excluded).
export const peerOrgs: PeerOrg[] = [
  { id: "Anytown NHS Trust", category: "Provider", type: "Acute – Medium", fy2223: 312000, fy2324: 382000, fy2425: 450000, isAnytown: true,  excludeFromBenchmark: false },
  { id: "Trust 1",           category: "Provider", type: "Mental Health",  fy2223: 1053000, fy2324: 989000,  fy2425: 1263000, isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 2",           category: "Provider", type: "Acute – Medium", fy2223: 304715,  fy2324: 402752,  fy2425: 368297,  isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 3",           category: "Provider", type: "Acute – Large",  fy2223: 691210,  fy2324: 803930,  fy2425: 944570,  isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 4",           category: "Provider", type: "Mental Health",  fy2223: 783207,  fy2324: 208252,  fy2425: 409025,  isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 5",           category: "Provider", type: "Specialist",     fy2223: null,    fy2324: 344880,  fy2425: 289400,  isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 6",           category: "Provider", type: "Acute – Large",  fy2223: 1007460, fy2324: null,    fy2425: 1271060, isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 7",           category: "Provider", type: "Mental Health",  fy2223: 314901,  fy2324: 472702,  fy2425: 138417,  isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 8",           category: "Provider", type: "Mental Health",  fy2223: 299138,  fy2324: 357282,  fy2425: 368652,  isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 9",           category: "Provider", type: "Acute – Medium", fy2223: 391560,  fy2324: 370950,  fy2425: 444040,  isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 10",          category: "Provider", type: "Acute – Medium", fy2223: 284508,  fy2324: 316998,  fy2425: 393143,  isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 11",          category: "Provider", type: "Acute – Large",  fy2223: 615000,  fy2324: 872000,  fy2425: 450000,  isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 12",          category: "Provider", type: "Acute – Large",  fy2223: 1096000, fy2324: 942000,  fy2425: 1094000, isAnytown: false, excludeFromBenchmark: false },
  { id: "Trust 13",          category: "Provider", type: "Mental Health",  fy2223: 411940,  fy2324: 561336,  fy2425: 687459,  isAnytown: false, excludeFromBenchmark: false },
  { id: "ICB 1",             category: "ICB",      type: "ICB",            fy2223: 222000,  fy2324: 231000,  fy2425: 416000,  isAnytown: false, excludeFromBenchmark: false },
  { id: "ICB 2",             category: "ICB",      type: "ICB",            fy2223: 280000,  fy2324: 418000,  fy2425: 448000,  isAnytown: false, excludeFromBenchmark: false },
  { id: "ICB 3",             category: "ICB",      type: "ICB",            fy2223: 574970,  fy2324: 910552,  fy2425: 559977,  isAnytown: false, excludeFromBenchmark: false },
  { id: "ICB 4",             category: "ICB",      type: "ICB",            fy2223: 489000,  fy2324: 1576000, fy2425: 1570000, isAnytown: false, excludeFromBenchmark: false },
];
