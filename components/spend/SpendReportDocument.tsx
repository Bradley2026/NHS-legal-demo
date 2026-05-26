import {
  FINANCIAL_YEAR,
  kpis,
  departmentSpend,
  firmSpend,
  rateAlerts,
} from "@/data/spend-summary";
import { formatCurrency } from "@/lib/utils";
import PrintButton from "./PrintButton";

const variantPct = (actual: number, prior: number) => {
  const pct = ((actual - prior) / prior) * 100;
  return (pct >= 0 ? "+" : "") + pct.toFixed(1) + "%";
};

const overBudget = (actual: number, budget: number) => actual > budget;

export default function SpendReportDocument() {
  const totalBudgetVariance = kpis.annualSpend - kpis.annualBudget;
  const yoyChange = kpis.annualSpend - kpis.priorYearSpend;
  const yoyPct = ((yoyChange / kpis.priorYearSpend) * 100).toFixed(1);

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white">
      {/* Document header */}
      <div className="border-b border-[#E2E8F0] px-8 py-6 print:border-b-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#334155]/40">
              Anytown NHS Trust — Legal Services
            </p>
            <h2
              className="mt-1 text-xl font-semibold text-[#1F3A5F]"
              style={{ fontFamily: "var(--font-source-serif-4)" }}
            >
              Annual Legal Spend Summary
            </h2>
            <p className="mt-0.5 text-sm text-[#334155]/60">
              Financial Year {FINANCIAL_YEAR} · April 2025 – March 2026
            </p>
          </div>
          <div className="flex items-center gap-3 print:hidden">
            <PrintButton />
            <a
              href="/api/reports/spend-csv"
              download="anytown-legal-spend-fy2526.csv"
              className="rounded-md bg-[#138989] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0f7070]"
            >
              Export CSV
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-8 px-8 py-7">
        {/* Executive summary */}
        <section>
          <h3
            className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#334155]/50"
          >
            Executive Summary
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                label: "Total legal spend",
                value: formatCurrency(kpis.annualSpend),
                sub: `Budget: ${formatCurrency(kpis.annualBudget)}`,
                accent:
                  totalBudgetVariance > 0 ? "#DC2626" : "#10B981",
                badge:
                  totalBudgetVariance > 0
                    ? `${formatCurrency(Math.abs(totalBudgetVariance))} over budget`
                    : `${formatCurrency(Math.abs(totalBudgetVariance))} under budget`,
              },
              {
                label: "Year-on-year change",
                value: `+${formatCurrency(yoyChange)}`,
                sub: `Prior year: ${formatCurrency(kpis.priorYearSpend)}`,
                accent: "#F59E0B",
                badge: `+${yoyPct}% vs FY 2024/25`,
              },
              {
                label: "Active matters",
                value: kpis.activeMatters.toString(),
                sub: "Across 4 panel firms",
                accent: "#138989",
                badge: null,
              },
              {
                label: "Rate alerts",
                value: kpis.rateAlertCount.toString(),
                sub: "Grades above benchmark",
                accent: "#DC2626",
                badge: "Penrose Bell",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-md border border-[#E2E8F0] px-4 py-3"
                style={{ borderLeftColor: item.accent, borderLeftWidth: 3 }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#334155]/40">
                  {item.label}
                </p>
                <p className="mt-1 text-2xl font-semibold tabular-nums text-[#1F3A5F]">
                  {item.value}
                </p>
                <p className="mt-0.5 text-[11px] text-[#334155]/50">{item.sub}</p>
                {item.badge && (
                  <p
                    className="mt-1.5 text-[10px] font-medium"
                    style={{ color: item.accent }}
                  >
                    {item.badge}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Spend by department */}
        <section>
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#334155]/50">
            Expenditure by Practice Area
          </h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                {["Practice area", "Budget", "Actual spend", "Variance", "% of total"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`py-2 text-[10px] font-semibold uppercase tracking-wider text-[#334155]/40 ${
                        i === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {departmentSpend.map((row) => {
                const variance = row.actual - row.budget;
                const pct = ((row.actual / kpis.annualSpend) * 100).toFixed(1);
                const over = overBudget(row.actual, row.budget);
                return (
                  <tr
                    key={row.name}
                    className="border-b border-[#E2E8F0]/60 transition-colors hover:bg-[#F8FAFC]"
                  >
                    <td className="py-2.5 text-[#334155]">{row.name}</td>
                    <td className="py-2.5 text-right tabular-nums text-[#334155]/70">
                      {formatCurrency(row.budget)}
                    </td>
                    <td className="py-2.5 text-right tabular-nums font-medium text-[#1F3A5F]">
                      {formatCurrency(row.actual)}
                    </td>
                    <td
                      className="py-2.5 text-right tabular-nums text-xs font-medium"
                      style={{ color: over ? "#DC2626" : "#10B981" }}
                    >
                      {variance >= 0 ? "+" : ""}
                      {formatCurrency(variance)}
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-[#334155]/60">
                      {pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#E2E8F0]">
                <td className="py-2.5 text-xs font-semibold text-[#334155]">
                  Total
                </td>
                <td className="py-2.5 text-right tabular-nums text-xs font-semibold text-[#334155]/70">
                  {formatCurrency(kpis.annualBudget)}
                </td>
                <td className="py-2.5 text-right tabular-nums text-xs font-semibold text-[#1F3A5F]">
                  {formatCurrency(kpis.annualSpend)}
                </td>
                <td
                  className="py-2.5 text-right tabular-nums text-xs font-semibold"
                  style={{
                    color: totalBudgetVariance > 0 ? "#DC2626" : "#10B981",
                  }}
                >
                  {totalBudgetVariance >= 0 ? "+" : ""}
                  {formatCurrency(totalBudgetVariance)}
                </td>
                <td className="py-2.5 text-right tabular-nums text-xs font-semibold text-[#334155]/60">
                  100.0%
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Spend by panel firm */}
        <section>
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#334155]/50">
            Expenditure by Panel Firm
          </h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                {["Panel firm", "Active matters", "Total spend", "% of total", "Avg per matter"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`py-2 text-[10px] font-semibold uppercase tracking-wider text-[#334155]/40 ${
                        i === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {firmSpend.map((row) => {
                const pct = ((row.amount / kpis.annualSpend) * 100).toFixed(1);
                const avg = Math.round(row.amount / row.matters);
                return (
                  <tr
                    key={row.id}
                    className="border-b border-[#E2E8F0]/60 transition-colors hover:bg-[#F8FAFC]"
                  >
                    <td className="py-2.5 font-medium text-[#1F3A5F]">
                      {row.name}
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-[#334155]/70">
                      {row.matters}
                    </td>
                    <td className="py-2.5 text-right tabular-nums font-medium text-[#1F3A5F]">
                      {formatCurrency(row.amount)}
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-[#334155]/60">
                      {pct}%
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-[#334155]/70">
                      {formatCurrency(avg)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#E2E8F0]">
                <td className="py-2.5 text-xs font-semibold text-[#334155]">
                  Total
                </td>
                <td className="py-2.5 text-right tabular-nums text-xs font-semibold text-[#334155]/70">
                  {firmSpend.reduce((s, r) => s + r.matters, 0)}
                </td>
                <td className="py-2.5 text-right tabular-nums text-xs font-semibold text-[#1F3A5F]">
                  {formatCurrency(kpis.annualSpend)}
                </td>
                <td className="py-2.5 text-right tabular-nums text-xs font-semibold text-[#334155]/60">
                  100.0%
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Rate alerts */}
        {rateAlerts.length > 0 && (
          <section>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#334155]/50">
              Rate Compliance Alerts
            </h3>
            <div className="rounded-md border border-[#FEE2E2] bg-[#FFF5F5] px-5 py-4">
              <p className="mb-3 text-xs font-medium text-[#DC2626]">
                {rateAlerts.length} grade{rateAlerts.length !== 1 ? "s" : ""} from Penrose Bell are currently above the panel benchmark P50. The Trust should seek a rate adjustment at the next panel review.
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#FCA5A5]/40">
                    {["Firm", "Grade", "Agreed rate", "Benchmark P50", "Variance"].map(
                      (h, i) => (
                        <th
                          key={h}
                          className={`py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#DC2626]/60 ${
                            i === 0 ? "text-left" : "text-right"
                          }`}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rateAlerts.map((alert) => (
                    <tr
                      key={`${alert.firmId}-${alert.grade}`}
                      className="border-b border-[#FCA5A5]/20"
                    >
                      <td className="py-2 text-[#334155]">{alert.firmName}</td>
                      <td className="py-2 text-right text-[#334155]">
                        {alert.grade}
                      </td>
                      <td className="py-2 text-right tabular-nums font-medium text-[#DC2626]">
                        £{alert.agreedRate}/hr
                      </td>
                      <td className="py-2 text-right tabular-nums text-[#334155]/70">
                        £{alert.benchmarkP50}/hr
                      </td>
                      <td className="py-2 text-right tabular-nums font-semibold text-[#DC2626]">
                        +{alert.variancePct.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="border-t border-[#E2E8F0] pt-5">
          <p className="text-[10px] text-[#334155]/40">
            This report was generated by the Anytown NHS Trust Legal Spend Management Platform. Data covers
            the period 1 April 2025 to 31 March 2026. Rate benchmarks are drawn from an anonymised sample
            of NHS trusts on comparable panel arrangements. For queries contact the Company Secretary's office.
          </p>
        </div>
      </div>
    </div>
  );
}
