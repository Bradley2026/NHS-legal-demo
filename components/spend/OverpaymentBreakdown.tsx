import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { GRADES } from "@/data/firms";
import { gradeRateBenchmarks } from "@/data/benchmarks";
import { firmHours } from "@/data/benchmarking";
import { firms } from "@/data/firms";

export default function OverpaymentBreakdown() {
  const firm = firms.find((f) => f.id === "penrose-bell")!;
  const hours = firmHours["penrose-bell"];

  const rows = GRADES.map((grade) => {
    const agreedRate = firm.rateSchedule[grade];
    const p50 = gradeRateBenchmarks[grade].p50;
    const excessPerHour = agreedRate - p50;
    const hrs = hours[grade];
    const totalExcess = excessPerHour * hrs;
    return { grade, agreedRate, p50, excessPerHour, hrs, totalExcess };
  });

  const totalOverpayment = rows.reduce((s, r) => s + r.totalExcess, 0);
  const totalHours = rows.reduce((s, r) => s + r.hrs, 0);

  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E2E8F0]">
            {["Grade", "Hours billed", "Agreed rate", "P50 median", "Excess / hr", "Est. overpayment"].map((h, i) => (
              <th
                key={h}
                className={cn(
                  "pb-2.5 text-xs font-semibold uppercase tracking-wider text-[#334155]/50",
                  i === 0 ? "text-left" : "text-right"
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]">
          {rows.map((row) => (
            <tr key={row.grade} className="hover:bg-[#F8FAFC] transition-colors">
              <td className="py-2.5 font-medium text-[#334155]">{row.grade}</td>
              <td className="py-2.5 text-right tabular-nums text-[#334155]/70"
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {row.hrs}
              </td>
              <td className="py-2.5 text-right tabular-nums text-[#334155]"
                style={{ fontVariantNumeric: "tabular-nums" }}>
                £{row.agreedRate}/hr
              </td>
              <td className="py-2.5 text-right tabular-nums text-[#334155]/60"
                style={{ fontVariantNumeric: "tabular-nums" }}>
                £{row.p50}/hr
              </td>
              <td className={cn(
                "py-2.5 text-right tabular-nums font-medium",
                row.excessPerHour > 0 ? "text-[#DC2626]" : "text-[#059669]"
              )}
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {row.excessPerHour > 0 ? `+£${row.excessPerHour}` : `-£${Math.abs(row.excessPerHour)}`}
              </td>
              <td className={cn(
                "py-2.5 text-right tabular-nums font-semibold",
                row.totalExcess > 0 ? "text-[#DC2626]" : "text-[#059669]"
              )}
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {row.totalExcess > 0 ? formatCurrency(row.totalExcess) : `−${formatCurrency(Math.abs(row.totalExcess))}`}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-[#E2E8F0]">
            <td className="pt-2.5 text-xs font-semibold text-[#334155]/50">Total</td>
            <td className="pt-2.5 text-right tabular-nums text-xs font-semibold text-[#334155]/50"
              style={{ fontVariantNumeric: "tabular-nums" }}>
              {totalHours}
            </td>
            <td colSpan={3} />
            <td className="pt-2.5 text-right tabular-nums text-base font-semibold text-[#DC2626]"
              style={{ fontVariantNumeric: "tabular-nums" }}>
              {formatCurrency(totalOverpayment)}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-4 rounded-md border border-[#DC2626]/15 bg-[#FEF2F2] px-4 py-3">
        <p className="text-sm leading-relaxed text-[#991B1B]">
          <span className="font-semibold">Estimated saving if renegotiated to P50:</span>{" "}
          {formatCurrency(totalOverpayment)} per annum at FY 2025/26 utilisation rates.{" "}
          Renegotiation is scheduled for Q1 2026/27.
        </p>
      </div>
    </div>
  );
}
