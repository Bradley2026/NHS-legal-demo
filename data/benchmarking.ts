import type { FirmGrade } from "./firms";

// Estimated hours billed per firm per grade in FY 2025/26.
// Derived from invoice spend and agreed hourly rates.
export const firmHours: Record<string, Record<FirmGrade, number>> = {
  "hartwell-vine":    { Partner: 487, Associate: 278, Solicitor: 145, Paralegal: 108 },
  "bramley-sterling": { Partner: 210, Associate: 168, Solicitor: 112, Paralegal:  56 },
  "marston-carey":    { Partner: 228, Associate: 161, Solicitor:  70, Paralegal:  49 },
  "penrose-bell":     { Partner: 146, Associate: 101, Solicitor:  23, Paralegal:  34 },
};

// Chart scale bounds per grade (rates shown on positioning chart).
export const gradeScales: Record<FirmGrade, { min: number; max: number }> = {
  Partner:   { min: 380, max: 640 },
  Associate: { min: 300, max: 460 },
  Solicitor: { min: 220, max: 350 },
  Paralegal: { min: 150, max: 240 },
};

// Colour assigned to each firm in charts and dots.
export const firmChartColours: Record<string, string> = {
  "hartwell-vine":    "#1F3A5F",
  "bramley-sterling": "#475569",
  "marston-carey":    "#138989",
  "penrose-bell":     "#DC2626",
};
