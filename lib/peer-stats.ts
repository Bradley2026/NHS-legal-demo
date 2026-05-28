import type { PeerOrg, CohortFilter, Year } from "@/data/peer-benchmarks";

export interface PeerStats {
  n: number;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

export interface AnytownPosition {
  value: number;
  percentile: number; // 0–100
  countBelow: number;
  totalPeers: number;
}

// Linear interpolation percentile (C = 1 method / "Excel PERCENTILE.INC").
// p is 0–100. Operates on a pre-sorted ascending array.
function percentileLinear(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0];
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (idx - lo) * (sorted[hi] - sorted[lo]);
}

// Returns orgs eligible as peers: excludes Anytown, excluded orgs, and applies cohort filter.
export function getPeerSet(orgs: PeerOrg[], cohort: CohortFilter): PeerOrg[] {
  return orgs.filter((o) => {
    if (o.isAnytown) return false;
    if (o.excludeFromBenchmark) return false;
    if (cohort === "providers") return o.category === "Provider";
    if (cohort === "icbs") return o.category === "ICB";
    return true; // "all"
  });
}

// Non-null values for a given year from a peer set.
export function getYearValues(peers: PeerOrg[], year: Year): number[] {
  return peers.map((p) => p[year]).filter((v): v is number => v !== null);
}

export function computeStats(values: number[]): PeerStats | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return {
    n: sorted.length,
    min: sorted[0],
    q1: percentileLinear(sorted, 25),
    median: percentileLinear(sorted, 50),
    q3: percentileLinear(sorted, 75),
    max: sorted[sorted.length - 1],
  };
}

// Returns Anytown's percentile rank within the peer values for a year.
// Peers with null for that year are excluded from the base (n reflects data availability).
export function anytownPosition(anytownValue: number, peerValues: number[]): AnytownPosition {
  if (peerValues.length === 0) {
    return { value: anytownValue, percentile: 0, countBelow: 0, totalPeers: 0 };
  }
  const countBelow = peerValues.filter((v) => v < anytownValue).length;
  // Percentile = proportion of peers strictly below Anytown, expressed as 0–100
  const percentile = (countBelow / peerValues.length) * 100;
  return {
    value: anytownValue,
    percentile,
    countBelow,
    totalPeers: peerValues.length,
  };
}

// Abbreviated currency for axis ticks: £1.2m / £450k / £90k
export function formatCurrencyShort(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `£${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}m`;
  }
  const k = value / 1_000;
  return `£${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
}
