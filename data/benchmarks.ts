// TODO: Replace with real anonymised peer benchmark data from David

export type BenchmarkDataPoint = {
  region: string;
  trustSize: "Small" | "Medium" | "Large" | "Teaching";
  grade: "Partner" | "Associate" | "Solicitor" | "Paralegal";
  specialism: string;
  p25Rate: number;
  p50Rate: number;
  p75Rate: number;
};

export const benchmarks: BenchmarkDataPoint[] = [];
