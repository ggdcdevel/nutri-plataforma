"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LogOut, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

function AdminHeader() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Admin";

  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      <p className="text-sm text-nutri-muted">Painel Administrativo</p>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-nutri-text transition-colors hover:bg-muted"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-nutri-green text-xs font-semibold text-white">
            {initials}
          </div>
          <span className="max-w-[120px] truncate">{displayName}</span>
          <ChevronDown className="h-4 w-4 text-nutri-muted" />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border bg-white py-1 shadow-lg">
            <button
              onClick={() => { signOut(); setOpen(false); }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-nutri-text hover:bg-muted"
            >
              <LogOut className="h-4 w-4 text-nutri-muted" />
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== null && (!user || role !== "admin")) {
      router.push("/");
    }
  }, [user, loading, role, router]);

  if (loading || role === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F5F0]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nutri-green border-t-transparent" />
      </div>
    );
  }

  if (role !== "admin") return null;

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <AdminSidebar />
      <div className="ml-60 flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
