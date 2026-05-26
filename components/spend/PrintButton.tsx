"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-md border border-[#E2E8F0] px-3 py-1.5 text-xs font-medium text-[#334155]/70 transition-colors hover:border-[#138989]/40 hover:text-[#138989] print:hidden"
    >
      Print / Save PDF
    </button>
  );
}
