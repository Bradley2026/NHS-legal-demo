"use client";

import { useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import {
  getPeerSet,
  getYearValues,
  computeStats,
  anytownPosition,
} from "@/lib/peer-stats";
import {
  peerOrgs,
  ANYTOWN_PEER_SPEND,
  YEAR_LABELS,
  YEARS,
  type CohortFilter,
  type Year,
} from "@/data/peer-benchmarks";
import PeerRangeChart from "@/components/spend/PeerRangeChart";
import PeerTrendChart from "@/components/spend/PeerTrendChart";
import PeerSummaryTable from "@/components/spend/PeerSummaryTable";

const COHORT_OPTIONS: { value: CohortFilter; label: string }[] = [
  { value: "providers", label: "Providers only" },
  { value: "all",       label: "All organisations" },
  { value: "icbs",      label: "ICBs only" },
];

export default function PeerSpendBenchmarking() {
  const [cohort, setCohort] = useState<CohortFilter>("providers");
  const [year, setYear] = useState<Year>("fy2425");

  // Peer set and stats for selected year
  const peers = getPeerSet(peerOrgs, cohort);
  const yearValues = getYearValues(peers, year);
  const stats = computeStats(yearValues);
  const anytownValue = ANYTOWN_PEER_SPEND[year];
  const position = anytownPosition(anytownValue, yearValues);

  // Variance vs median
  const medianVariance = stats ? anytownValue - stats.median : null;
  const medianVariancePct = stats ? (medianVariance! / stats.median) * 100 : null;

  // Summary rows for the table (all years, selected cohort)
  const tableRows = YEARS.map((y) => {
    const peerVals = getYearValues(peers, y);
    const s = computeStats(peerVals);
    const at = anytownPosition(ANYTOWN_PEER_SPEND[y], peerVals);
    return { year: y, stats: s, anytown: at };
  });

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <h1
          className="text-2xl font-semibold text-[#1F3A5F]"
          style={{ fontFamily: "var(--font-source-serif-4)" }}
        >
          Peer Spend Benchmarking
        </h1>
        <p className="mt-1 text-sm text-[#334155]/60">
          Anytown NHS Trust total external legal spend compared against anonymised peer NHS organisations · FOI dataset
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-[#E2E8F0] bg-white px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Cohort</span>
          <div className="flex gap-1">
            {COHORT_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setCohort(value)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  cohort === value
                    ? "bg-[#1F3A5F] text-white"
                    : "text-[#334155]/70 hover:bg-[#F8FAFC] hover:text-[#334155] border border-[#E2E8F0]"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-5 w-px bg-[#E2E8F0]" />

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Year</span>
          <div className="flex gap-1">
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  year === y
                    ? "bg-[#1F3A5F] text-white"
                    : "text-[#334155]/70 hover:bg-[#F8FAFC] hover:text-[#334155] border border-[#E2E8F0]"
                )}
              >
                {YEAR_LABELS[y]}
              </button>
            ))}
          </div>
        </div>

        {stats && (
          <span className="ml-auto text-xs text-[#334155]/40">
            {stats.n} peer{stats.n !== 1 ? "s" : ""} with data · {YEAR_LABELS[year]}
          </span>
        )}
      </div>

      {/* KPI cards */}
      {stats ? (
        <div className="grid grid-cols-3 gap-4">
          {/* Anytown spend */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-5 border-l-4 border-l-[#138989]">
            <p className="text-xs font-medium uppercase tracking-widest text-[#334155]/50">
              Anytown spend · {YEAR_LABELS[year]}
            </p>
            <p
              className="mt-2 text-3xl font-semibold tabular-nums text-[#1F3A5F]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatCurrency(anytownValue)}
            </p>
            <p className="mt-1 text-xs text-[#334155]/60">Total external advisory legal spend</p>
          </div>

          {/* Position within peer cohort */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-5 border-l-4 border-l-[#1F3A5F]">
            <p className="text-xs font-medium uppercase tracking-widest text-[#334155]/50">
              Position in cohort
            </p>
            <p
              className="mt-2 text-3xl font-semibold tabular-nums text-[#1F3A5F]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {Math.round(position.percentile)}
              <span className="text-xl text-[#334155]/50">th percentile</span>
            </p>
            <p className="mt-1 text-xs text-[#334155]/60">
              Lower than {position.countBelow} of {position.totalPeers} peer
              {position.totalPeers !== 1 ? "s" : ""} with data
            </p>
          </div>

          {/* Variance vs median */}
          <div className={cn(
            "rounded-lg border border-[#E2E8F0] bg-white px-6 py-5 border-l-4",
            medianVariance !== null && medianVariance < 0 ? "border-l-[#10B981]" : "border-l-[#F59E0B]"
          )}>
            <p className="text-xs font-medium uppercase tracking-widest text-[#334155]/50">
              vs peer median
            </p>
            <p
              className={cn(
                "mt-2 text-3xl font-semibold tabular-nums",
                medianVariance !== null && medianVariance < 0 ? "text-[#059669]" : "text-[#B45309]"
              )}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {medianVariance !== null && medianVariancePct !== null ? (
                <>
                  {medianVariance < 0 ? "−" : "+"}
                  {Math.round(Math.abs(medianVariancePct))}
                  <span className="text-xl">%</span>
                </>
              ) : "—"}
            </p>
            <p className="mt-1 text-xs text-[#334155]/60">
              {medianVariance !== null ? (
                <>
                  {medianVariance < 0 ? "−" : "+"}
                  {formatCurrency(Math.abs(medianVariance))} vs median of{" "}
                  {formatCurrency(stats.median)}
                </>
              ) : "No data"}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-8 text-center text-sm text-[#334155]/50">
          No peer data available for the selected cohort and year.
        </div>
      )}

      {/* Range chart */}
      {stats && (
        <div className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#1F3A5F]">
                Spend Distribution · {YEAR_LABELS[year]}
              </h2>
              <p className="mt-1 text-xs text-[#334155]/50">
                Each marker is a peer organisation · hover for details · Anytown shown as teal diamond
              </p>
            </div>
          </div>
          <PeerRangeChart peers={peers} year={year} stats={stats} anytown={position} />
        </div>
      )}

      {/* Three-year trend chart */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#1F3A5F]">Three-Year Trend</h2>
            <p className="mt-1 text-xs text-[#334155]/50">
              Anytown vs peer median and interquartile range · FY22/23 to FY24/25 · selected cohort
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-6 bg-[#138989] rounded" />
            <span className="text-[11px] text-[#334155]/50">Anytown NHS Trust</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-6 bg-[#1F3A5F] rounded" style={{ borderTop: "1.5px dashed #1F3A5F" }} />
            <span className="text-[11px] text-[#334155]/50">Peer median</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-6 rounded bg-[#138989]/10" />
            <span className="text-[11px] text-[#334155]/50">Peer IQR (Q1–Q3)</span>
          </div>
        </div>
        <PeerTrendChart cohort={cohort} />
      </div>

      {/* Summary table */}
      <PeerSummaryTable rows={tableRows} />

      {/* Methodology note */}
      <p className="text-[11px] text-[#334155]/40 pb-2">
        Peer data sourced via Freedom of Information requests. Organisations shown anonymised.
        Statistics computed over peers with a valid return for each year; nulls excluded from all calculations.
        Anytown excluded from peer statistics in all calculations.
      </p>
    </div>
  );
}
