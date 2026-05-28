"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "rate" | "peer";

interface Props {
  rateContent: React.ReactNode;
  peerContent: React.ReactNode;
}

export default function BenchmarkingTabs({ rateContent, peerContent }: Props) {
  const [active, setActive] = useState<Tab>("rate");

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-[#E2E8F0]">
        {(
          [
            { id: "rate" as Tab, label: "Rate Benchmarking" },
            { id: "peer" as Tab, label: "Peer Spend Benchmarking" },
          ] as const
        ).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors",
              active === id
                ? "border-b-2 border-[#1F3A5F] text-[#1F3A5F]"
                : "text-[#334155]/60 hover:text-[#334155]"
            )}
            style={{ marginBottom: "-1px" }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {active === "rate" ? rateContent : peerContent}
      </div>
    </div>
  );
}
