import { FINANCIAL_YEAR, kpis, departmentSpend, firmSpend } from "@/data/spend-summary";

export async function GET() {
  const rows: string[] = [];

  rows.push(`Anytown NHS Trust — Annual Legal Spend Summary FY ${FINANCIAL_YEAR}`);
  rows.push("");

  rows.push("EXPENDITURE BY PRACTICE AREA");
  rows.push("Practice Area,Budget (£),Actual Spend (£),Variance (£),% of Total");
  for (const d of departmentSpend) {
    const variance = d.actual - d.budget;
    const pct = ((d.actual / kpis.annualSpend) * 100).toFixed(1);
    rows.push(`"${d.name}",${d.budget},${d.actual},${variance},${pct}%`);
  }
  const deptVariance = kpis.annualSpend - kpis.annualBudget;
  rows.push(`Total,${kpis.annualBudget},${kpis.annualSpend},${deptVariance},100.0%`);

  rows.push("");
  rows.push("EXPENDITURE BY PANEL FIRM");
  rows.push("Firm,Active Matters,Total Spend (£),% of Total,Avg per Matter (£)");
  for (const f of firmSpend) {
    const pct = ((f.amount / kpis.annualSpend) * 100).toFixed(1);
    const avg = Math.round(f.amount / f.matters);
    rows.push(`"${f.name}",${f.matters},${f.amount},${pct}%,${avg}`);
  }
  const totalMatters = firmSpend.reduce((s, r) => s + r.matters, 0);
  rows.push(`Total,${totalMatters},${kpis.annualSpend},100.0%,`);

  const csv = rows.join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="anytown-legal-spend-fy${FINANCIAL_YEAR.replace("/", "")}.csv"`,
    },
  });
}
