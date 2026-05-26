import { firmSpend, kpis } from "@/data/spend-summary";
import { formatCurrency } from "@/lib/utils";

export default function FirmSpendTable() {
  const total = kpis.annualSpend;

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-[#E2E8F0]">
          <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-[#334155]/50">
            Panel Firm
          </th>
          <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">
            Matters
          </th>
          <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">
            Spend
          </th>
          <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-[#334155]/50">
            Share
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#E2E8F0]">
        {firmSpend.map((firm) => {
          const share = (firm.amount / total) * 100;
          return (
            <tr key={firm.id} className="group transition-colors hover:bg-[#F8FAFC]">
              <td className="py-2.5 pr-4">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-[#1F3A5F]">{firm.name}</span>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                    <div
                      className="h-full rounded-full bg-[#1F3A5F] opacity-70"
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="py-2.5 text-right tabular-nums text-[#334155]/70">
                {firm.matters}
              </td>
              <td className="py-2.5 text-right tabular-nums font-medium text-[#334155]"
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {formatCurrency(firm.amount)}
              </td>
              <td className="py-2.5 pl-4 text-right tabular-nums text-[#334155]/60"
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {share.toFixed(1)}%
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="border-t-2 border-[#E2E8F0]">
          <td className="pt-2.5 text-xs font-semibold text-[#334155]/50">Total</td>
          <td className="pt-2.5 text-right tabular-nums text-xs font-semibold text-[#334155]/50">
            {firmSpend.reduce((s, f) => s + f.matters, 0)}
          </td>
          <td className="pt-2.5 text-right tabular-nums text-sm font-semibold text-[#1F3A5F]"
            style={{ fontVariantNumeric: "tabular-nums" }}>
            {formatCurrency(total)}
          </td>
          <td className="pt-2.5 text-right text-xs font-semibold text-[#334155]/50">100%</td>
        </tr>
      </tfoot>
    </table>
  );
}
