import ReportCard from "@/components/spend/ReportCard";
import SpendReportDocument from "@/components/spend/SpendReportDocument";

const REPORTS = [
  {
    id: "annual-spend",
    title: "Annual Legal Spend Summary",
    description:
      "Full-year expenditure by practice area and panel firm, with rate compliance alerts and year-on-year comparison.",
    period: "FY 2025/26 · April 2025 – March 2026",
    lastGenerated: "26 May 2026",
    status: "ready" as const,
    csvHref: "/api/reports/spend-csv",
    isInline: true,
  },
  {
    id: "benchmark",
    title: "Panel Rate Benchmark Report",
    description:
      "Agreed hourly rates for all panel firms compared against anonymised NHS peer benchmarks at P25, P50, and P75.",
    period: "FY 2025/26 benchmark data",
    lastGenerated: "January 2026",
    status: "ready" as const,
  },
  {
    id: "q4-update",
    title: "Q4 Spend Update",
    description:
      "Quarter four expenditure summary (January – March 2026) with variance analysis against quarterly budget.",
    period: "Q4 FY 2025/26 · January – March 2026",
    lastGenerated: "April 2026",
    status: "ready" as const,
  },
  {
    id: "audit-committee",
    title: "Audit Committee Report Q4 FY 2025/26",
    description:
      "Formal quarterly report for the Audit Committee covering legal spend, rate compliance, and panel performance.",
    period: "Q4 FY 2025/26",
    lastGenerated: "April 2026",
    status: "ready" as const,
  },
  {
    id: "panel-review",
    title: "Panel Review Pack 2026/27",
    description:
      "Comprehensive pack for the annual panel review, including firm performance scorecards and rate negotiation briefings.",
    period: "FY 2026/27 preparation",
    dueDate: "June 2026",
    status: "pending" as const,
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <h1
            className="text-2xl font-semibold text-[#1F3A5F]"
            style={{ fontFamily: "var(--font-source-serif-4)" }}
          >
            Reports &amp; Exports
          </h1>
          <p className="mt-1 text-sm text-[#334155]/60">
            Formal spend reports, benchmark summaries, and committee papers for Anytown NHS Trust
          </p>
        </div>
        <span className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-xs font-medium text-[#334155]/60">
          FY 2025/26 data
        </span>
      </div>

      {/* Report cards */}
      <section className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#334155]/40">
          Available reports
        </p>
        {REPORTS.map((r) => (
          <ReportCard
            key={r.id}
            title={r.title}
            description={r.description}
            period={r.period}
            lastGenerated={r.lastGenerated}
            dueDate={r.dueDate}
            status={r.status}
            csvHref={r.csvHref}
            isInline={r.isInline}
          />
        ))}
      </section>

      {/* Inline annual spend report */}
      <section>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#334155]/40">
          Annual Legal Spend Summary — FY 2025/26
        </p>
        <SpendReportDocument />
      </section>
    </div>
  );
}
