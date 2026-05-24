"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart2,
  Settings,
} from "lucide-react";

const NAV = [
  { label: "Visão Geral",     href: "/admin",                       icon: LayoutDashboard },
  { label: "Nutricionistas",  href: "/admin/nutricionistas",        icon: Users },
  { label: "Leads",           href: "/admin/leads",                 icon: UserPlus },
  { label: "Métricas",        href: "/admin/metricas",              icon: BarChart2 },
  { label: "Configurações",   href: "/admin/configuracoes/usuarios",icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <span className="text-lg font-bold text-nutri-green">NutriMatch</span>
        <span className="rounded-full bg-nutri-green/10 px-2 py-0.5 text-xs font-semibold text-nutri-green">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-nutri-green/10 text-nutri-green"
                  : "text-nutri-muted hover:bg-muted hover:text-nutri-text"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
