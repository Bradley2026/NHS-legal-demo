// TODO: Replace with real synthetic firm and rate schedule data from David

export type FirmGrade = "Partner" | "Associate" | "Solicitor" | "Paralegal";

export type RateSchedule = Record<FirmGrade, number>;

export type PanelFirm = {
  id: string;
  name: string;
  specialisms: string[];
  rateSchedule: RateSchedule;
  panelSince: string;
  status: "Active" | "Under Review" | "Inactive";
};

export const firms: PanelFirm[] = [
  {
    id: "hartwell-vine",
    name: "Hartwell & Vine LLP",
    specialisms: ["Employment", "Healthcare", "Governance & Public Law"],
    rateSchedule: { Partner: 520, Associate: 380, Solicitor: 290, Paralegal: 195 },
    panelSince: "2019-04-01",
    status: "Active",
  },
  {
    id: "bramley-sterling",
    name: "Bramley Sterling",
    specialisms: ["Contract & Commercial", "Property & Estates"],
    rateSchedule: { Partner: 480, Associate: 360, Solicitor: 270, Paralegal: 180 },
    panelSince: "2021-01-01",
    status: "Active",
  },
  {
    id: "marston-carey",
    name: "Marston Carey",
    specialisms: ["Mental Health", "Primary Care"],
    rateSchedule: { Partner: 440, Associate: 340, Solicitor: 260, Paralegal: 185 },
    panelSince: "2020-07-01",
    status: "Active",
  },
  {
    id: "penrose-bell",
    name: "Penrose Bell",
    specialisms: ["Employment", "Contract & Commercial"],
    rateSchedule: { Partner: 580, Associate: 420, Solicitor: 310, Paralegal: 210 },
    panelSince: "2022-04-01",
    status: "Under Review",
  },
];
