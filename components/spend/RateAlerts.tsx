import { rateAlerts } from "@/data/spend-summary";

export default function RateAlerts() {
  return (
    <div className="space-y-3">
      {rateAlerts.map((alert, i) => {
        const excess = alert.agreedRate - alert.benchmarkP50;
        return (
          <div
            key={i}
            className="rounded-md border border-[#DC2626]/20 bg-[#FEF2F2] px-4 py-3.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#1F3A5F]">
                    {alert.firmName}
                  </span>
                  <span className="rounded-full bg-[#DC2626]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#DC2626]">
                    Under Review
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#334155]/70">
                  {alert.grade} · {alert.specialism}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-lg font-semibold tabular-nums text-[#DC2626]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  +{alert.variancePct.toFixed(1)}%
                </p>
                <p className="text-[10px] text-[#334155]/50">above benchmark</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3 border-t border-[#DC2626]/10 pt-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#334155]/40">
                  Agreed rate
                </p>
                <p
                  className="mt-0.5 text-sm font-semibold tabular-nums text-[#334155]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  £{alert.agreedRate}/hr
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#334155]/40">
                  Benchmark median
                </p>
                <p
                  className="mt-0.5 text-sm font-semibold tabular-nums text-[#334155]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  £{alert.benchmarkP50}/hr
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#334155]/40">
                  Excess per hour
                </p>
                <p
                  className="mt-0.5 text-sm font-semibold tabular-nums text-[#DC2626]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  £{excess}/hr
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <p className="text-[11px] leading-relaxed text-[#334155]/50">
        Benchmark based on anonymised data from 14 comparable NHS Trusts in the
        North of England. Rates are compared at the same grade and specialism.
      </p>
    </div>
  );
}
