import FirmCard from "@/components/spend/FirmCard";
import RateScheduleTable from "@/components/spend/RateScheduleTable";
import { firms } from "@/data/firms";
import { firmSpend, FINANCIAL_YEAR } from "@/data/spend-summary";

export default function PanelFirmsPage() {
  const activeCount = firms.filter((f) => f.status === "Active").length;
  const underReviewCount = firms.filter((f) => f.status === "Under Review").length;

  return (
    <div className="space-y-8">

      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <h1
            className="text-2xl font-semibold text-[#1F3A5F]"
            style={{ fontFamily: "var(--font-source-serif-4)" }}
          >
            Panel Firms
          </h1>
          <p className="mt-1 text-sm text-[#334155]/60">
            Anytown NHS Trust · {activeCount} active
            {underReviewCount > 0 && (
              <span className="ml-2 font-medium text-[#B45309]">
                · {underReviewCount} under review
              </span>
            )}
          </p>
        </div>
        <span className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-xs font-medium text-[#334155]/60">
          FY {FINANCIAL_YEAR} spend shown
        </span>
      </div>

      {/* Firm cards */}
      <div className="grid grid-cols-4 gap-5">
        {firms.map((firm) => {
          const spendRow = firmSpend.find((s) => s.id === firm.id);
          return (
            <FirmCard
              key={firm.id}
              firm={firm}
              spend={spendRow?.amount ?? 0}
              matters={spendRow?.matters ?? 0}
            />
          );
        })}
      </div>

      {/* Rate schedule comparison */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#1F3A5F]">
              Rate Schedule Comparison
            </h2>
            <p className="mt-1 text-xs text-[#334155]/50">
              Agreed hourly rates vs anonymised peer-Trust benchmark · North of England region
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#334155]/50">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#FEF9EC] border border-[#F59E0B]/30" />
              Above P50
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#FEF2F2] border border-[#DC2626]/20" />
              Above P75
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#138989]/10 border border-[#138989]/20" />
              Benchmark
            </span>
          </div>
        </div>
        <RateScheduleTable />
      </div>

    </div>
  );
}
