import { formatDateShort } from "@/lib/utils";
import { firms } from "@/data/firms";

export type SourceMeta = {
  id: string;
  title: string;
  department: string;
  firmId: string;
  date: string;
};

type Props = { source: SourceMeta; index: number };

export default function SourceCard({ source, index }: Props) {
  const firm = firms.find((f) => f.id === source.firmId);
  return (
    <div className="rounded-md border border-[#E2E8F0] bg-white px-4 py-3">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#138989] text-[10px] font-semibold text-white">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug text-[#1F3A5F]">
            {source.title}
          </p>
          <p className="mt-1 text-xs text-[#334155]/60">
            {source.department} · {firm?.name ?? source.firmId}
          </p>
          <p className="mt-0.5 text-xs text-[#334155]/40">
            {formatDateShort(source.date)}
          </p>
        </div>
      </div>
    </div>
  );
}
