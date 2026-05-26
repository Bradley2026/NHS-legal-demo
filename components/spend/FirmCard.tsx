import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { PanelFirm } from "@/data/firms";

type Props = {
  firm: PanelFirm;
  spend: number;
  matters: number;
};

const statusStyles = {
  Active:       { badge: "bg-[#10B981]/10 text-[#059669]", border: "border-l-[#1F3A5F]" },
  "Under Review": { badge: "bg-[#F59E0B]/10 text-[#B45309]", border: "border-l-[#F59E0B]" },
  Inactive:     { badge: "bg-[#334155]/10 text-[#334155]/60", border: "border-l-[#334155]/30" },
};

export default function FirmCard({ firm, spend, matters }: Props) {
  const styles = statusStyles[firm.status];

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-[#E2E8F0] bg-white border-l-4 px-5 py-5",
        styles.border
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h2
          className="text-base font-semibold text-[#1F3A5F] leading-snug"
          style={{ fontFamily: "var(--font-source-serif-4)" }}
        >
          {firm.name}
        </h2>
        <span
          className={cn(
            "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            styles.badge
          )}
        >
          {firm.status}
        </span>
      </div>

      <p className="mt-1 text-xs text-[#334155]/50">
        Panel since {formatDate(firm.panelSince)} · {firm.leadPartner}
      </p>

      <p className="mt-2 text-xs leading-relaxed text-[#334155]/70">
        {firm.description}
      </p>

      {/* Specialisms */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {firm.specialisms.map((s) => (
          <span
            key={s}
            className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-medium text-[#334155]/70"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Review note */}
      {firm.reviewNote && (
        <div className="mt-3 rounded-md bg-[#FEF9EC] border border-[#F59E0B]/20 px-3 py-2.5">
          <p className="text-[11px] leading-relaxed text-[#92400E]">
            {firm.reviewNote}
          </p>
        </div>
      )}

      {/* Stats footer */}
      <div className="mt-auto pt-4 grid grid-cols-3 gap-2 border-t border-[#E2E8F0] text-center">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#334155]/40">FY spend</p>
          <p
            className="mt-0.5 text-sm font-semibold tabular-nums text-[#1F3A5F]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {formatCurrency(spend)}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#334155]/40">Matters</p>
          <p className="mt-0.5 text-sm font-semibold text-[#1F3A5F]">{matters}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#334155]/40">Partner rate</p>
          <p
            className={cn(
              "mt-0.5 text-sm font-semibold tabular-nums",
              firm.status === "Under Review" ? "text-[#DC2626]" : "text-[#1F3A5F]"
            )}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            £{firm.rateSchedule.Partner}/hr
          </p>
        </div>
      </div>
    </div>
  );
}
