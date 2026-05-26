export type FirmGrade = "Partner" | "Associate" | "Solicitor" | "Paralegal";

export type RateSchedule = Record<FirmGrade, number>;

export type PanelFirm = {
  id: string;
  name: string;
  description: string;
  leadPartner: string;
  specialisms: string[];
  rateSchedule: RateSchedule;
  panelSince: string;
  status: "Active" | "Under Review" | "Inactive";
  reviewNote?: string;
};

export const GRADES: FirmGrade[] = ["Partner", "Associate", "Solicitor", "Paralegal"];

export const firms: PanelFirm[] = [
  {
    id: "hartwell-vine",
    name: "Hartwell & Vine LLP",
    description:
      "Lead panel firm for employment and healthcare matters; longest-standing relationship on the panel.",
    leadPartner: "Sarah Hartwell",
    specialisms: ["Employment", "Healthcare", "Governance & Public Law"],
    rateSchedule: { Partner: 520, Associate: 380, Solicitor: 290, Paralegal: 195 },
    panelSince: "2019-04-01",
    status: "Active",
  },
  {
    id: "bramley-sterling",
    name: "Bramley Sterling",
    description:
      "Specialist commercial and property practice; handles the majority of estate and procurement matters.",
    leadPartner: "James Bramley",
    specialisms: ["Contract & Commercial", "Property & Estates"],
    rateSchedule: { Partner: 480, Associate: 360, Solicitor: 270, Paralegal: 180 },
    panelSince: "2021-01-01",
    status: "Active",
  },
  {
    id: "marston-carey",
    name: "Marston Carey",
    description:
      "Niche mental health and primary care practice; strong track record across NHS statutory and commissioning work.",
    leadPartner: "Priya Marston",
    specialisms: ["Mental Health", "Primary Care"],
    rateSchedule: { Partner: 440, Associate: 340, Solicitor: 260, Paralegal: 185 },
    panelSince: "2020-07-01",
    status: "Active",
  },
  {
    id: "penrose-bell",
    name: "Penrose Bell",
    description:
      "Employment and commercial practice appointed at the 2022 panel refresh; currently under rate review.",
    leadPartner: "Daniel Penrose",
    specialisms: ["Employment", "Contract & Commercial"],
    rateSchedule: { Partner: 580, Associate: 420, Solicitor: 310, Paralegal: 210 },
    panelSince: "2022-04-01",
    status: "Under Review",
    reviewNote:
      "Partner and senior associate rates are 12–14% above the benchmark median for comparable NHS Trusts in the North of England. Rate renegotiation scheduled for Q1 2026/27.",
  },
];
