import type { FirmGrade } from "./firms";

export type GradeBenchmark = { p25: number; p50: number; p75: number };

// Anonymised rate data from 14 comparable acute NHS Trusts, North of England region.
// Grade benchmarks are specialism-agnostic; used for panel rate review and alerting.
export const gradeRateBenchmarks: Record<FirmGrade, GradeBenchmark> = {
  Partner:   { p25: 478, p50: 510, p75: 548 },
  Associate: { p25: 352, p50: 375, p75: 402 },
  Solicitor: { p25: 262, p50: 285, p75: 315 },
  Paralegal: { p25: 178, p50: 195, p75: 215 },
};
