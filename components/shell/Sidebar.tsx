"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

const spendNav: NavItem[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Panel Firms", href: "/panel-firms" },
  { label: "Benchmarking", href: "/benchmarking" },
  { label: "Reports", href: "/reports" },
];

const knowledgeNav: NavItem[] = [
  { label: "Search & Synthesis", href: "/knowledge" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isKnowledge = pathname.startsWith("/knowledge");
  const navItems = isKnowledge ? knowledgeNav : spendNav;
  const moduleColour = isKnowledge ? "#138989" : "#1F3A5F";

  return (
    <aside className="flex w-52 shrink-0 flex-col border-r border-[#E2E8F0] bg-white pt-6">
      <p
        className="mb-3 px-5 text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: moduleColour }}
      >
        {isKnowledge ? "Knowledge Centre" : "Spend Intelligence"}
      </p>

      <nav className="flex flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-[#1F3A5F]/8 font-medium text-[#1F3A5F]"
                  : "font-normal text-[#334155]/70 hover:bg-[#F8FAFC] hover:text-[#334155]"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
