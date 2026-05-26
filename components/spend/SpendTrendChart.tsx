"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { monthlySpend } from "@/data/spend-summary";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-[#E2E8F0] bg-white px-3 py-2 shadow-sm">
      <p className="text-xs font-medium text-[#334155]/60">{label} 2025</p>
      <p className="mt-0.5 text-sm font-semibold tabular-nums text-[#1F3A5F]">
        {formatCurrency(payload[0].value ?? 0)}
      </p>
    </div>
  );
}

export default function SpendTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={monthlySpend} barSize={28} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="0" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#334155", opacity: 0.5 }}
        />
        <YAxis hide domain={[0, 110000]} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
        <Bar dataKey="amount" fill="#1F3A5F" radius={[3, 3, 0, 0]} opacity={0.85} />
      </BarChart>
    </ResponsiveContainer>
  );
}
