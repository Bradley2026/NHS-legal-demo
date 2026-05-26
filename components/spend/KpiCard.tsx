import { cn } from "@/lib/utils";

type Intent = "positive" | "negative" | "warning" | "neutral";

type Props = {
  label: string;
  value: string;
  sub?: string;
  trend?: { label: string; intent: Intent };
  accent?: "navy" | "teal" | "warning" | "danger";
};

const intentClasses: Record<Intent, string> = {
  positive: "text-[#10B981]",
  negative: "text-[#DC2626]",
  warning:  "text-[#F59E0B]",
  neutral:  "text-[#334155]/50",
};

const accentClasses = {
  navy:    "border-l-[#1F3A5F]",
  teal:    "border-l-[#138989]",
  warning: "border-l-[#F59E0B]",
  danger:  "border-l-[#DC2626]",
};

export default function KpiCard({ label, value, sub, trend, accent = "navy" }: Props) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#E2E8F0] bg-white px-6 py-5 border-l-4",
        accentClasses[accent]
      )}
    >
      <p className="text-xs font-medium uppercase tracking-widest text-[#334155]/50">
        {label}
      </p>
      <p
        className="mt-2 text-3xl font-semibold tabular-nums text-[#1F3A5F]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </p>
      {sub && (
        <p className="mt-1 text-xs text-[#334155]/60">{sub}</p>
      )}
      {trend && (
        <p className={cn("mt-2 text-xs font-medium", intentClasses[trend.intent])}>
          {trend.label}
        </p>
      )}
    </div>
  );
}
