import KpiCard from "@/components/spend/KpiCard";
import SpendTrendChart from "@/components/spend/SpendTrendChart";
import DepartmentBreakdown from "@/components/spend/DepartmentBreakdown";
import FirmSpendTable from "@/components/spend/FirmSpendTable";
import RateAlerts from "@/components/spend/RateAlerts";
import { kpis, FINANCIAL_YEAR } from "@/data/spend-summary";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const budgetRemaining = kpis.annualBudget - kpis.annualSpend;
  const yoyChange = ((kpis.annualSpend - kpis.priorYearSpend) / kpis.priorYearSpend) * 100;

  return (
    <div className="space-y-8">

      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <h1
            className="text-2xl font-semibold text-[#1F3A5F]"
            style={{ fontFamily: "var(--font-source-serif-4)" }}
          >
            Spend Intelligence
          </h1>
          <p className="mt-1 text-sm text-[#334155]/60">
            Anytown NHS Trust · Financial year {FINANCIAL_YEAR}
          </p>
        </div>
        <span className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-xs font-medium text-[#334155]/60">
          FY {FINANCIAL_YEAR} · Full year
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          label="Annual Legal Spend"
          value={formatCurrency(kpis.annualSpend)}
          sub={`Budget: ${formatCurrency(kpis.annualBudget)}`}
          trend={{
            label: `↑ ${yoyChange.toFixed(1)}% vs prior year`,
            intent: "warning",
          }}
          accent="navy"
        />
        <KpiCard
          label="Budget Position"
          value={formatCurrency(budgetRemaining)}
          sub="Remaining at year end"
          trend={{
            label: `${((kpis.annualSpend / kpis.annualBudget) * 100).toFixed(1)}% of budget utilised`,
            intent: "positive",
          }}
          accent="teal"
        />
        <KpiCard
          label="Active Matters"
          value={kpis.activeMatters.toString()}
          sub="Across 4 panel firms"
          accent="navy"
        />
        <KpiCard
          label="Rate Alerts"
          value={kpis.rateAlertCount.toString()}
          sub="Rates above benchmark"
          trend={{
            label: "Penrose Bell · action recommended",
            intent: "negative",
          }}
          accent="danger"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#1F3A5F]">Monthly Spend</h2>
              <p className="text-xs text-[#334155]/50">April 2025 — March 2026</p>
            </div>
          </div>
          <SpendTrendChart />
        </div>

        <div className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-[#1F3A5F]">By Department</h2>
            <p className="text-xs text-[#334155]/50">Actual vs budget</p>
          </div>
          <DepartmentBreakdown />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-[#1F3A5F]">Spend by Panel Firm</h2>
            <p className="text-xs text-[#334155]/50">Full year</p>
          </div>
          <FirmSpendTable />
        </div>

        <div className="col-span-3 rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#1F3A5F]">Rate Alerts</h2>
              <p className="text-xs text-[#334155]/50">
                Agreed rates materially above peer-Trust benchmark
              </p>
            </div>
            <span className="rounded-full bg-[#DC2626]/10 px-2.5 py-0.5 text-xs font-semibold text-[#DC2626]">
              {kpis.rateAlertCount} flagged
            </span>
          </div>
          <RateAlerts />
        </div>
      </div>

    </div>
  );
}
