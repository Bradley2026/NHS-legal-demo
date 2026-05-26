"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const modules = [
  { label: "Spend Intelligence", href: "/dashboard" },
  { label: "Knowledge Centre", href: "/knowledge" },
];

export default function TopNav() {
  const pathname = usePathname();

  const activeModule = modules.find((m) =>
    m.href === "/dashboard"
      ? pathname.startsWith("/dashboard") ||
        pathname.startsWith("/panel-firms") ||
        pathname.startsWith("/benchmarking") ||
        pathname.startsWith("/reports")
      : pathname.startsWith(m.href)
  );

  return (
    <header className="flex h-14 shrink-0 items-center border-b border-[#E2E8F0] bg-[#1F3A5F] px-6">
      <span
        className="mr-8 text-base font-semibold text-white"
        style={{ fontFamily: "var(--font-source-serif-4)" }}
      >
        NHS Legal Management Platform
      </span>

      <nav className="flex items-center gap-1">
        {modules.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={cn(
              "rounded px-3 py-1.5 text-sm font-medium transition-colors",
              activeModule?.href === m.href
                ? "bg-white/15 text-white"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            {m.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <span className="text-xs text-white/50">Anytown NHS Trust</span>
      </div>
    </header>
  );
}
