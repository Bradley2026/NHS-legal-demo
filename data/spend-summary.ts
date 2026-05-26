export const FINANCIAL_YEAR = "2025/26";

export const kpis = {
  annualSpend: 947200,
  annualBudget: 950000,
  priorYearSpend: 892400,
  activeMatters: 23,
  rateAlertCount: 2,
};

export const monthlySpend = [
  { month: "Apr", amount: 72400 },
  { month: "May", amount: 68900 },
  { month: "Jun", amount: 84200 },
  { month: "Jul", amount: 76500 },
  { month: "Aug", amount: 61300 },
  { month: "Sep", amount: 79800 },
  { month: "Oct", amount: 91400 },
  { month: "Nov", amount: 83600 },
  { month: "Dec", amount: 54200 },
  { month: "Jan", amount: 87100 },
  { month: "Feb", amount: 94700 },
  { month: "Mar", amount: 93100 },
];

export const departmentSpend = [
  { name: "Employment",             actual: 318400, budget: 325000 },
  { name: "Healthcare",             actual: 184600, budget: 185000 },
  { name: "Governance & Public Law",actual: 141300, budget: 140000 },
  { name: "Contract & Commercial",  actual: 108900, budget: 110000 },
  { name: "Primary Care",           actual:  94700, budget:  95000 },
  { name: "Mental Health",          actual:  65400, budget:  70000 },
  { name: "Property & Estates",     actual:  33900, budget:  25000 },
];

export const firmSpend = [
  { id: "hartwell-vine",   name: "Hartwell & Vine LLP", amount: 421800, matters: 11 },
  { id: "bramley-sterling",name: "Bramley Sterling",     amount: 201400, matters:  5 },
  { id: "marston-carey",   name: "Marston Carey",        amount: 182700, matters:  6 },
  { id: "penrose-bell",    name: "Penrose Bell",         amount: 141300, matters:  4 },
];

export type RateAlert = {
  firmId: string;
  firmName: string;
  grade: string;
  specialism: string;
  agreedRate: number;
  benchmarkP50: number;
  variancePct: number;
};

export const rateAlerts: RateAlert[] = [
  {
    firmId: "penrose-bell",
    firmName: "Penrose Bell",
    grade: "Partner",
    specialism: "Employment",
    agreedRate: 580,
    benchmarkP50: 510,
    variancePct: 13.7,
  },
  {
    firmId: "penrose-bell",
    firmName: "Penrose Bell",
    grade: "Senior Associate",
    specialism: "Employment",
    agreedRate: 420,
    benchmarkP50: 375,
    variancePct: 12.0,
  },
];
