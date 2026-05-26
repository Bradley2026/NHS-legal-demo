import { cn } from "@/lib/utils";
import { firms, GRADES, type FirmGrade } from "@/data/firms";
import { gradeRateBenchmarks } from "@/data/benchmarks";

function variancePct(rate: number, p50: number) {
  return ((rate - p50) / p50) * 100;
}

function avgVariancePct(firm: (typeof firms)[number]) {
  const total = GRADES.reduce((sum, g) => sum + variancePct(firm.rateSchedule[g], gradeRateBenchmarks[g].p50), 0);
  return total / GRADES.length;
}

export default function RateScheduleTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-[#334155]/50 w-28">
              Grade
            </th>
            {firms.map((f) => (
              <th
                key={f.id}
                className={cn(
                  "pb-3 text-right text-xs font-semibold uppercase tracking-wider",
                  f.status === "Under Review"
                    ? "text-[#B45309]"
                    : "text-[#334155]/50"
                )}
              >
                <span className="block">{f.name}</span>
                {f.status === "Under Review" && (
                  <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-wide text-[#F59E0B]">
                    Under Review
                  </span>
                )}
              </th>
            ))}
            <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-[#138989]/70 w-28">
              Benchmark
              <span className="block text-[9px] font-normal normal-case tracking-normal text-[#138989]/50">
                P50 median
              </span>
            </th>
            <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/40 w-24">
              P25 – P75
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E2E8F0]">
          {GRADES.map((grade) => {
            const bench = gradeRateBenchmarks[grade];
            return (
              <tr key={grade} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3 text-sm font-medium text-[#334155]">{grade}</td>

                {firms.map((f) => {
                  const rate = f.rateSchedule[grade];
                  const variance = variancePct(rate, bench.p50);
                  const aboveP75 = rate > bench.p75;
                  const aboveP50 = rate > bench.p50;

                  return (
                    <td
                      key={f.id}
                      className={cn(
                        "py-3 text-right tabular-nums font-medium",
                        aboveP75
                          ? "text-[#DC2626]"
                          : aboveP50
                          ? "text-[#B45309]"
                          : "text-[#334155]"
                      )}
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      <span
                        className={cn(
                          "inline-block rounded px-1.5 py-0.5",
                          aboveP75
                            ? "bg-[#FEF2F2]"
                            : aboveP50
                            ? "bg-[#FEF9EC]"
                            : ""
                        )}
                      >
                        £{rate}
                        {aboveP50 && (
                          <span className="ml-1 text-[10px]">
                            {variance > 0 ? "+" : ""}
                            {variance.toFixed(0)}%
                          </span>
                        )}
                      </span>
                    </td>
                  );
                })}

                <td
                  className="py-3 text-right tabular-nums font-semibold text-[#138989]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  £{bench.p50}
                </td>
                <td
                  className="py-3 text-right text-xs tabular-nums text-[#334155]/40"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  £{bench.p25}–£{bench.p75}
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr className="border-t-2 border-[#E2E8F0]">
            <td className="pt-3 text-xs font-semibold uppercase tracking-wider text-[#334155]/50">
              Avg vs P50
            </td>
            {firms.map((f) => {
              const avg = avgVariancePct(f);
              const isPositive = avg > 0;
              return (
                <td
                  key={f.id}
                  className={cn(
                    "pt-3 text-right text-sm font-semibold tabular-nums",
                    avg > 5
                      ? "text-[#DC2626]"
                      : avg > 0
                      ? "text-[#B45309]"
                      : "text-[#059669]"
                  )}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {isPositive ? "+" : ""}
                  {avg.toFixed(1)}%
                </td>
              );
            })}
            <td colSpan={2} className="pt-3 text-right text-xs text-[#334155]/30">
              14 trusts · North of England
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
