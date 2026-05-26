import { cn } from "@/lib/utils";
import { firms, GRADES, type FirmGrade } from "@/data/firms";
import { gradeRateBenchmarks } from "@/data/benchmarks";
import { gradeScales, firmChartColours } from "@/data/benchmarking";

function pct(value: number, min: number, max: number) {
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

function variancePct(rate: number, p50: number) {
  return ((rate - p50) / p50) * 100;
}

function GradeSection({ grade }: { grade: FirmGrade }) {
  const bench = gradeRateBenchmarks[grade];
  const scale = gradeScales[grade];
  const p25Left  = pct(bench.p25, scale.min, scale.max);
  const p50Left  = pct(bench.p50, scale.min, scale.max);
  const p75Left  = pct(bench.p75, scale.min, scale.max);
  const bandWidth = p75Left - p25Left;

  return (
    <div>
      {/* Grade header */}
      <div className="mb-2 flex items-center gap-3">
        <span className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wider text-[#334155]/50">
          {grade}
        </span>
        <span className="text-[10px] text-[#334155]/30">
          £{scale.min} ← → £{scale.max}
        </span>
      </div>

      {/* Firm rows */}
      <div className="space-y-2.5 mb-5">
        {firms.map((firm) => {
          const rate    = firm.rateSchedule[grade];
          const dotLeft = pct(rate, scale.min, scale.max);
          const variance = variancePct(rate, bench.p50);
          const aboveP50 = rate > bench.p50;
          const colour  = firmChartColours[firm.id];

          return (
            <div key={firm.id} className="flex items-center gap-3">
              {/* Firm label */}
              <span className="w-36 shrink-0 text-xs text-[#334155]/80 truncate">
                {firm.name.replace(" LLP", "")}
              </span>

              {/* Track */}
              <div className="relative h-8 flex-1">
                {/* Baseline */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#E2E8F0]" />

                {/* P25–P75 band */}
                <div
                  className="absolute top-1/2 h-2.5 rounded-full bg-[#138989]/12"
                  style={{
                    left: `${p25Left}%`,
                    width: `${bandWidth}%`,
                    transform: "translateY(-50%)",
                  }}
                />

                {/* P50 tick */}
                <div
                  className="absolute top-1/2 w-px h-4 bg-[#138989]/50"
                  style={{
                    left: `${p50Left}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {/* Firm dot */}
                <div
                  className="absolute top-1/2 flex flex-col items-center"
                  style={{
                    left: `${dotLeft}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="h-3 w-3 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: colour }}
                  />
                </div>
              </div>

              {/* Rate + variance */}
              <div className="w-24 shrink-0 text-right">
                <span
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    aboveP50 ? "text-[#DC2626]" : "text-[#334155]"
                  )}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  £{rate}
                </span>
                {aboveP50 && (
                  <span className="ml-1 text-[10px] text-[#DC2626]">
                    +{variance.toFixed(0)}%
                  </span>
                )}
                {!aboveP50 && (
                  <span className="ml-1 text-[10px] text-[#059669]">
                    {variance.toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RatePositioningChart() {
  return (
    <div className="space-y-1">
      {GRADES.map((grade) => (
        <GradeSection key={grade} grade={grade} />
      ))}

      {/* Legend */}
      <div className="flex items-center gap-5 border-t border-[#E2E8F0] pt-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-6 rounded-full bg-[#138989]/12 border border-[#138989]/20" />
          <span className="text-[11px] text-[#334155]/50">Benchmark P25–P75 range</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-px bg-[#138989]/50" />
          <span className="text-[11px] text-[#334155]/50">P50 median</span>
        </div>
        {firms.map((f) => (
          <div key={f.id} className="flex items-center gap-1.5">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: firmChartColours[f.id] }}
            />
            <span className="text-[11px] text-[#334155]/50">{f.name.replace(" LLP", "")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
