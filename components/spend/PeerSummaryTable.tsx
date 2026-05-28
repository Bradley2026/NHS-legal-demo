import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { formatCurrencyShort } from "@/lib/peer-stats";
import type { PeerStats, AnytownPosition } from "@/lib/peer-stats";
import { YEAR_LABELS, YEARS, type Year } from "@/data/peer-benchmarks";

interface RowData {
  year: Year;
  stats: PeerStats | null;
  anytown: AnytownPosition;
}

interface Props {
  rows: RowData[];
}

function cell(value: number | null | undefined) {
  if (value == null) return <span className="text-[#334155]/30">—</span>;
  return (
    <span className="tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
      {formatCurrencyShort(value)}
    </span>
  );
}

export default function PeerSummaryTable({ rows }: Props) {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-5">
      <h2 className="mb-1 text-sm font-semibold text-[#1F3A5F]">Cohort Summary — All Years</h2>
      <p className="mb-4 text-xs text-[#334155]/50">
        Peer statistics per financial year for the selected cohort. Anytown excluded from peer statistics.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2E8F0]">
              <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Year</th>
              <th className="pb-2 text-center text-xs font-semibold uppercase tracking-wider text-[#334155]/50">n</th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Min</th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Q1</th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Median</th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Q3</th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Max</th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Anytown</th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">Percentile</th>
            </tr>
          </thead>
          <tbody>
            {YEARS.map((year) => {
              const row = rows.find((r) => r.year === year);
              const stats = row?.stats ?? null;
              const anytown = row?.anytown;
              const isLatest = year === "fy2425";

              return (
                <tr
                  key={year}
                  className={cn(
                    "border-b border-[#E2E8F0] last:border-0",
                    isLatest ? "bg-[#138989]/5" : "hover:bg-[#F8FAFC]"
                  )}
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      {isLatest && (
                        <div className="h-2 w-2 rounded-full bg-[#138989] shrink-0" />
                      )}
                      <span className={cn("font-medium", isLatest ? "text-[#1F3A5F]" : "text-[#334155]")}>
                        {YEAR_LABELS[year]}
                      </span>
                      {isLatest && (
                        <span className="text-[10px] text-[#138989] font-medium">latest</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 text-center text-[#334155]/70">{stats?.n ?? "—"}</td>
                  <td className="py-3 text-right text-[#334155]/70">{cell(stats?.min)}</td>
                  <td className="py-3 text-right text-[#334155]/70">{cell(stats?.q1)}</td>
                  <td className="py-3 text-right font-medium text-[#334155]">{cell(stats?.median)}</td>
                  <td className="py-3 text-right text-[#334155]/70">{cell(stats?.q3)}</td>
                  <td className="py-3 text-right text-[#334155]/70">{cell(stats?.max)}</td>
                  <td className="py-3 text-right font-semibold text-[#138989] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {anytown ? formatCurrency(anytown.value) : "—"}
                  </td>
                  <td className="py-3 text-right tabular-nums text-[#334155]/70" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {anytown && stats ? (
                      <span>
                        {Math.round(anytown.percentile)}
                        <span className="text-[#334155]/40">th</span>
                      </span>
                    ) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] text-[#334155]/40">
        Percentile computed by linear interpolation over peers with data in that year.
        n reflects the number of peers with a valid return for each year.
      </p>
    </div>
  );
}
