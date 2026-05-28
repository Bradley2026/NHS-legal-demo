"use client";

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { formatCurrencyShort, computeStats, getYearValues, getPeerSet } from "@/lib/peer-stats";
import { peerOrgs, ANYTOWN_PEER_SPEND, YEAR_LABELS, YEARS, type CohortFilter } from "@/data/peer-benchmarks";

interface Props {
  cohort: CohortFilter;
}

interface ChartPoint {
  yearLabel: string;
  anytown: number;
  median: number | null;
  // Stacked area technique for IQR band: iqrBase is invisible (transparent fill),
  // iqrHeight is the visible band stacked on top. Together they render Q1–Q3.
  iqrBase: number | null;
  iqrHeight: number | null;
}

function buildChartData(cohort: CohortFilter): ChartPoint[] {
  const peers = getPeerSet(peerOrgs, cohort);
  return YEARS.map((year) => {
    const values = getYearValues(peers, year);
    const stats = computeStats(values);
    return {
      yearLabel: YEAR_LABELS[year],
      anytown: ANYTOWN_PEER_SPEND[year],
      median: stats?.median ?? null,
      iqrBase: stats?.q1 ?? null,
      iqrHeight: stats !== null ? stats.q3 - stats.q1 : null,
    };
  });
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number | null }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  const anytown = payload.find((p) => p.name === "anytown");
  const median = payload.find((p) => p.name === "median");
  const iqrBase = payload.find((p) => p.name === "iqrBase");
  const iqrHeight = payload.find((p) => p.name === "iqrHeight");

  const q1 = iqrBase?.value ?? null;
  const q3 = q1 !== null && iqrHeight?.value !== null ? q1 + (iqrHeight?.value ?? 0) : null;

  return (
    <div className="rounded-md border border-[#E2E8F0] bg-white px-3 py-2.5 shadow-md text-xs">
      <p className="mb-1.5 font-semibold text-[#1F3A5F]">{label}</p>
      {anytown?.value != null && (
        <p className="text-[#138989]">
          Anytown:{" "}
          <span className="font-semibold tabular-nums">{formatCurrency(anytown.value)}</span>
        </p>
      )}
      {median?.value != null && (
        <p className="text-[#1F3A5F]">
          Peer median:{" "}
          <span className="font-semibold tabular-nums">{formatCurrency(median.value)}</span>
        </p>
      )}
      {q1 !== null && q3 !== null && (
        <p className="text-[#334155]/60">
          IQR:{" "}
          <span className="tabular-nums">{formatCurrency(q1)}</span>
          {" – "}
          <span className="tabular-nums">{formatCurrency(q3)}</span>
        </p>
      )}
    </div>
  );
};

export default function PeerTrendChart({ cohort }: Props) {
  const data = buildChartData(cohort);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />

        <XAxis
          dataKey="yearLabel"
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatCurrencyShort}
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={false}
          tickLine={false}
          width={56}
        />

        <Tooltip content={<CustomTooltip />} />

        {/* IQR band: transparent base (Q1) + teal fill stacked on top (Q3–Q1).
            The combined stack renders a shaded band between Q1 and Q3. */}
        <Area
          type="monotone"
          dataKey="iqrBase"
          name="iqrBase"
          stackId="iqr"
          fill="transparent"
          stroke="none"
          connectNulls={false}
          legendType="none"
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="iqrHeight"
          name="iqrHeight"
          stackId="iqr"
          fill="#138989"
          fillOpacity={0.12}
          stroke="none"
          connectNulls={false}
          legendType="none"
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />

        {/* Peer median — dashed navy */}
        <Line
          type="monotone"
          dataKey="median"
          name="median"
          stroke="#1F3A5F"
          strokeWidth={1.5}
          strokeDasharray="5 3"
          dot={{ r: 3, fill: "#1F3A5F", strokeWidth: 0 }}
          activeDot={{ r: 4 }}
          connectNulls={false}
          isAnimationActive={false}
        />

        {/* Anytown — bold teal */}
        <Line
          type="monotone"
          dataKey="anytown"
          name="anytown"
          stroke="#138989"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#138989", stroke: "#fff", strokeWidth: 2 }}
          activeDot={{ r: 5, stroke: "#138989", strokeWidth: 2 }}
          connectNulls={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
