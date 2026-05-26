type ReportStatus = "ready" | "pending";

type Props = {
  title: string;
  description: string;
  period: string;
  lastGenerated?: string;
  dueDate?: string;
  status: ReportStatus;
  csvHref?: string;
  onView?: () => void;
  isInline?: boolean;
};

export default function ReportCard({
  title,
  description,
  period,
  lastGenerated,
  dueDate,
  status,
  csvHref,
  onView,
  isInline,
}: Props) {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-semibold text-[#1F3A5F]">{title}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                status === "ready"
                  ? "bg-[#F0FDF4] text-[#10B981]"
                  : "bg-[#FFF7ED] text-[#F59E0B]"
              }`}
            >
              {status === "ready" ? "Ready" : "Pending"}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#334155]/60">{description}</p>
          <p className="mt-2 text-[11px] text-[#334155]/40">
            {period}
            {lastGenerated && ` · Generated ${lastGenerated}`}
            {dueDate && ` · Due ${dueDate}`}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {status === "ready" && csvHref && (
            <a
              href={csvHref}
              download
              className="rounded-md border border-[#E2E8F0] px-3 py-1.5 text-xs font-medium text-[#334155]/70 transition-colors hover:border-[#138989]/40 hover:text-[#138989]"
            >
              Export CSV
            </a>
          )}
          {status === "ready" && onView && !isInline && (
            <button
              onClick={onView}
              className="rounded-md bg-[#138989] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0f7070]"
            >
              View report
            </button>
          )}
          {isInline && (
            <span className="text-[11px] text-[#334155]/40">See below</span>
          )}
          {status === "pending" && (
            <button
              disabled
              className="rounded-md bg-[#F1F5F9] px-3 py-1.5 text-xs font-medium text-[#334155]/40 cursor-not-allowed"
            >
              Not yet available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
