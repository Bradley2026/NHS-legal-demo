import KpiCard from "@/components/spend/KpiCard";
import RatePositioningChart from "@/components/spend/RatePositioningChart";
import OverpaymentBreakdown from "@/components/spend/OverpaymentBreakdown";
import BenchmarkingTabs from "@/components/spend/BenchmarkingTabs";
import PeerSpendBenchmarking from "@/components/spend/PeerSpendBenchmarking";
import { firms, GRADES } from "@/data/firms";
import { gradeRateBenchmarks } from "@/data/benchmarks";
import { firmHours } from "@/data/benchmarking";
import { cn, formatCurrency } from "@/lib/utils";

function computeTotalOverpayment(firmId: string) {
  const firm = firms.find((f) => f.id === firmId)!;
  const hours = firmHours[firmId];
  return GRADES.reduce((sum, grade) => {
    const excess = (firm.rateSchedule[grade] - gradeRateBenchmarks[grade].p50) * hours[grade];
    return sum + Math.max(0, excess);
  }, 0);
}

export default function BenchmarkingPage() {
  const firmsAbove = firms.filter((f) => {
    const avg = GRADES.reduce((sum, g) =>
      sum + (f.rateSchedule[g] - gradeRateBenchmarks[g].p50) / gradeRateBenchmarks[g].p50, 0
    ) / GRADES.length * 100;
    return avg > 5;
  });
  const penroseOverpayment = computeTotalOverpayment("penrose-bell");

  const firmSummary = firms.map((f) => {
    const variances = GRADES.map((g) =>
      ((f.rateSchedule[g] - gradeRateBenchmarks[g].p50) / gradeRateBenchmarks[g].p50) * 100
    );
    const avg = variances.reduce((s, v) => s + v, 0) / variances.length;
    return { firm: f, avg };
  });

  const rateBenchmarkingContent = (
    <div className="space-y-8">

      {/* Page header */}
      <div>
        <h1
          className="text-2xl font-semibold text-[#1F3A5F]"
          style={{ fontFamily: "var(--font-source-serif-4)" }}
        >
          Rate Benchmarking
        </h1>
        <p className="mt-1 text-sm text-[#334155]/60">
          Panel firm rates compared against anonymised peer-Trust data · 14 comparable NHS Trusts · North of England region
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          label="Firms above benchmark"
          value={`${firmsAbove.length} of ${firms.length}`}
          sub={firmsAbove.map((f) => f.name).join(", ")}
          trend={{ label: "Action recommended", intent: "negative" }}
          accent="danger"
        />
        <KpiCard
          label="Estimated FY overpayment"
          value={formatCurrency(penroseOverpayment)}
          sub="Penrose Bell vs P50 median"
          trend={{ label: "At FY 2025/26 utilisation", intent: "neutral" }}
          accent="danger"
        />
        <KpiCard
          label="Peer group size"
          value="14 Trusts"
          sub="Acute, North of England"
          accent="teal"
        />
        <KpiCard
          label="Benchmark updated"
          value="Jan 2026"
          sub="Annual refresh cycle"
          accent="navy"
        />
      </div>

      {/* Rate positioning chart */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#1F3A5F]">Rate Positioning</h2>
            <p className="mt-1 text-xs text-[#334155]/50">
              Each firm's agreed hourly rate mapped against the peer-Trust P25–P75 benchmark range, by grade
            </p>
          </div>
        </div>
        <RatePositioningChart />
      </div>

      {/* Panel value summary + overpayment side by side */}
      <div className="grid grid-cols-5 gap-6">

        {/* Panel value summary */}
        <div className="col-span-2 rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
          <h2 className="mb-1 text-sm font-semibold text-[#1F3A5F]">Panel Value Summary</h2>
          <p className="mb-4 text-xs text-[#334155]/50">Average variance vs P50 across all grades</p>
          <div className="space-y-3">
            {firmSummary.map(({ firm, avg }) => {
              const isOver = avg > 0;
              const isSignificant = Math.abs(avg) > 5;
              return (
                <div key={firm.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          firm.status === "Under Review" ? "#DC2626" : "#1F3A5F",
                      }}
                    />
                    <span className="truncate text-sm text-[#334155]">{firm.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="relative h-1.5 w-24 rounded-full bg-[#F1F5F9]">
                      {isOver ? (
                        <div
                          className="absolute left-1/2 top-0 h-full rounded-r-full"
                          style={{
                            width: `${Math.min(Math.abs(avg) * 2, 50)}%`,
                            backgroundColor: isSignificant ? "#DC2626" : "#F59E0B",
                          }}
                        />
                      ) : (
                        <div
                          className="absolute top-0 h-full rounded-l-full right-1/2"
                          style={{
                            width: `${Math.min(Math.abs(avg) * 2, 50)}%`,
                            backgroundColor: "#059669",
                          }}
                        />
                      )}
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#CBD5E1]" />
                    </div>
                    <span
                      className={cn(
                        "w-14 text-right text-sm font-semibold tabular-nums",
                        isOver && isSignificant
                          ? "text-[#DC2626]"
                          : isOver
                          ? "text-[#B45309]"
                          : "text-[#059669]"
                      )}
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {isOver ? "+" : ""}{avg.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[11px] text-[#334155]/40">
            Negative variance indicates rates below benchmark — favourable for the Trust.
          </p>
        </div>

        {/* Overpayment breakdown */}
        <div className="col-span-3 rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#1F3A5F]">
                Estimated Overpayment — Penrose Bell
              </h2>
              <p className="mt-1 text-xs text-[#334155]/50">
                FY 2025/26 hours at agreed rates vs benchmark P50 median
              </p>
            </div>
            <span className="rounded-full bg-[#DC2626]/10 px-2.5 py-0.5 text-xs font-semibold text-[#DC2626]">
              Under Review
            </span>
          </div>
          <OverpaymentBreakdown />
        </div>

      </div>
    </div>
  );

  return (
    <BenchmarkingTabs
      rateContent={rateBenchmarkingContent}
      peerContent={<PeerSpendBenchmarking />}
    />
  );
}
