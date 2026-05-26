import SearchInterface from "@/components/knowledge/SearchInterface";
import { adviceDocs } from "@/data/advice-docs";

const departments = [...new Set(adviceDocs.map((d) => d.department))];

export default function KnowledgePage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <h1
            className="text-2xl font-semibold text-[#1F3A5F]"
            style={{ fontFamily: "var(--font-source-serif-4)" }}
          >
            Knowledge Centre
          </h1>
          <p className="mt-1 text-sm text-[#334155]/60">
            Search and synthesise prior legal advice from the Trust's document corpus
          </p>
        </div>
        <span className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-xs font-medium text-[#334155]/60">
          {adviceDocs.length} documents · Updated Jan 2026
        </span>
      </div>

      {/* Corpus stats strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Advice documents", value: adviceDocs.length.toString() },
          { label: "Practice areas", value: departments.length.toString() },
          { label: "Panel firms", value: "4" },
          { label: "Date range", value: "2024 – 2025" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-[#E2E8F0] bg-white px-5 py-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#334155]/40">
              {stat.label}
            </p>
            <p className="mt-1.5 text-2xl font-semibold tabular-nums text-[#138989]"
              style={{ fontVariantNumeric: "tabular-nums" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search interface */}
      <div>
        <SearchInterface />
      </div>
    </div>
  );
}
