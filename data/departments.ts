// TODO: Replace with real synthetic department budget data from David

export type Department = {
  id: string;
  name: string;
  annualBudget: number;
  ytdSpend: number;
  primaryFirmId: string;
};

export const departments: Department[] = [
  { id: "employment", name: "Employment", annualBudget: 320000, ytdSpend: 0, primaryFirmId: "hartwell-vine" },
  { id: "healthcare", name: "Healthcare", annualBudget: 180000, ytdSpend: 0, primaryFirmId: "hartwell-vine" },
  { id: "governance", name: "Governance & Public Law", annualBudget: 140000, ytdSpend: 0, primaryFirmId: "hartwell-vine" },
  { id: "primary-care", name: "Primary Care", annualBudget: 90000, ytdSpend: 0, primaryFirmId: "marston-carey" },
  { id: "commercial", name: "Contract & Commercial", annualBudget: 110000, ytdSpend: 0, primaryFirmId: "bramley-sterling" },
  { id: "mental-health", name: "Mental Health", annualBudget: 70000, ytdSpend: 0, primaryFirmId: "marston-carey" },
  { id: "property", name: "Property & Estates", annualBudget: 40000, ytdSpend: 0, primaryFirmId: "bramley-sterling" },
];
