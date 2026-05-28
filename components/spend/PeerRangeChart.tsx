import { formatCurrency } from "@/lib/utils";
import { formatCurrencyShort } from "@/lib/peer-stats";
import type { PeerStats, AnytownPosition } from "@/lib/peer-stats";
import type { PeerOrg, Year } from "@/data/peer-benchmarks";

interface Props {
  peers: PeerOrg[];
  year: Year;
  stats: PeerStats;
  anytown: AnytownPosition;
}

function pct(value: number, min: number, max: number) {
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

// Pad the axis range slightly beyond min/max so markers don't clip the edges.
function axisRange(stats: PeerStats, anytownValue: number) {
  const allMin = Math.min(stats.min, anytownValue);
  const allMax = Math.max(stats.max, anytownValue);
  const pad = (allMax - allMin) * 0.06;
  return { axisMin: allMin - pad, axisMax: allMax + pad };
}

export default function PeerRangeChart({ peers, year, stats, anytown }: Props) {
  const { axisMin, axisMax } = axisRange(stats, anytown.value);

  const q1Left    = pct(stats.q1, axisMin, axisMax);
  const q3Left    = pct(stats.q3, axisMin, axisMax);
  const medLeft   = pct(stats.median, axisMin, axisMax);
  const minLeft   = pct(stats.min, axisMin, axisMax);
  const maxLeft   = pct(stats.max, axisMin, axisMax);
  const atLeft    = pct(anytown.value, axisMin, axisMax);
  const iqrWidth  = q3Left - q1Left;

  // Axis tick positions
  const ticks = [stats.min, stats.q1, stats.median, stats.q3, stats.max, anytown.value];
  const uniqueTicks = [...new Set(ticks)].sort((a, b) => a - b);

  return (
    <div>
      {/* Track */}
      <div className="relative mx-1" style={{ height: "80px" }}>
        {/* Baseline */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#E2E8F0]" style={{ transform: "translateY(-50%)" }} />

        {/* Min whisker */}
        <div
          className="absolute top-1/2 h-3 w-px bg-[#94A3B8]"
          style={{ left: `${minLeft}%`, transform: "translate(-50%, -50%)" }}
        />
        {/* Max whisker */}
        <div
          className="absolute top-1/2 h-3 w-px bg-[#94A3B8]"
          style={{ left: `${maxLeft}%`, transform: "translate(-50%, -50%)" }}
        />
        {/* Min–Max line */}
        <div
          className="absolute top-1/2 h-px bg-[#CBD5E1]"
          style={{
            left: `${minLeft}%`,
            width: `${maxLeft - minLeft}%`,
            transform: "translateY(-50%)",
          }}
        />

        {/* IQR band */}
        <div
          className="absolute top-1/2 h-5 rounded bg-[#138989]/15"
          style={{
            left: `${q1Left}%`,
            width: `${iqrWidth}%`,
            transform: "translateY(-50%)",
          }}
        />

        {/* Median tick */}
        <div
          className="absolute top-1/2 h-6 w-0.5 rounded-full bg-[#138989]/70"
          style={{ left: `${medLeft}%`, transform: "translate(-50%, -50%)" }}
        />

        {/* Peer dots */}
        {peers.map((org) => {
          const val = org[year];
          if (val === null) return null;
          const left = pct(val, axisMin, axisMax);
          return (
            <div
              key={org.id}
              title={`${org.id} (${org.type}): ${formatCurrency(val)}`}
              className="absolute top-1/2 h-2.5 w-2.5 rounded-full bg-[#94A3B8] border border-white shadow-sm transition-opacity hover:opacity-70 cursor-default"
              style={{
                left: `${left}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}

        {/* Anytown diamond */}
        <div
          className="absolute top-1/2 flex flex-col items-center"
          style={{ left: `${atLeft}%`, transform: "translate(-50%, -50%)" }}
        >
          <div
            className="h-4 w-4 rotate-45 bg-[#138989] border-2 border-white shadow-md"
            style={{ boxShadow: "0 0 0 1.5px #138989" }}
          />
        </div>

        {/* Anytown label — above */}
        <div
          className="absolute flex flex-col items-center"
          style={{ left: `${atLeft}%`, top: "4px", transform: "translateX(-50%)" }}
        >
          <span className="whitespace-nowrap text-[10px] font-semibold text-[#138989]">
            Anytown
          </span>
        </div>
        {/* Anytown value — below */}
        <div
          className="absolute flex flex-col items-center"
          style={{ left: `${atLeft}%`, bottom: "4px", transform: "translateX(-50%)" }}
        >
          <span className="whitespace-nowrap text-[10px] font-semibold text-[#138989] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
            {formatCurrency(anytown.value)}
          </span>
        </div>
      </div>

      {/* Axis */}
      <div className="relative mx-1 mt-2 border-t border-[#E2E8F0] pt-1">
        {uniqueTicks.map((val) => {
          const left = pct(val, axisMin, axisMax);
          const isAnytown = val === anytown.value;
          return (
            <div
              key={val}
              className="absolute text-[10px] tabular-nums"
              style={{
                left: `${left}%`,
                transform: "translateX(-50%)",
                color: isAnytown ? "#138989" : "#94A3B8",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatCurrencyShort(val)}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-[#E2E8F0] pt-3">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#94A3B8]" />
          <span className="text-[11px] text-[#334155]/50">Peer organisation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 rotate-45 bg-[#138989]" />
          <span className="text-[11px] text-[#334155]/50">Anytown NHS Trust</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-6 rounded bg-[#138989]/15 border border-[#138989]/25" />
          <span className="text-[11px] text-[#334155]/50">Interquartile range (Q1–Q3)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-0.5 bg-[#138989]/70" />
          <span className="text-[11px] text-[#334155]/50">Median</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-px w-6 bg-[#CBD5E1]" />
          <span className="text-[11px] text-[#334155]/50">Min–Max range</span>
        </div>
      </div>
    </div>
  );
}
