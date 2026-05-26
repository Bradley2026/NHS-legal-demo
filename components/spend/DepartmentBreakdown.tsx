import { departmentSpend } from "@/data/spend-summary";
import { formatCurrency } from "@/lib/utils";

export default function DepartmentBreakdown() {
  const maxActual = Math.max(...departmentSpend.map((d) => d.actual));

  return (
    <div className="space-y-3">
      {departmentSpend.map((dept) => {
        const pctOfMax = (dept.actual / maxActual) * 100;
        const pctOfBudget = dept.actual / dept.budget;
        const overBudget = pctOfBudget > 1;

        return (
          <div key={dept.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-[#334155]/80">{dept.name}</span>
              <span
                className="text-xs font-medium tabular-nums text-[#1F3A5F]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatCurrency(dept.actual)}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
              {/* budget marker */}
              <span
                className="absolute top-0 h-full w-px bg-[#94A3B8]"
                style={{ left: `${(dept.budget / maxActual) * 100}%` }}
              />
              {/* actual bar */}
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${pctOfMax}%`,
                  backgroundColor: overBudget ? "#DC2626" : "#1F3A5F",
                  opacity: 0.8,
                }}
              />
            </div>
            {overBudget && (
              <p className="mt-0.5 text-right text-[10px] text-[#DC2626]">
                {formatCurrency(dept.actual - dept.budget)} over budget
              </p>
            )}
          </div>
        );
      })}
      <p className="pt-1 text-[10px] text-[#334155]/40">
        Vertical mark indicates budget. Red bar = over budget.
      </p>
    </div>
  );
}
