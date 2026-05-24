"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, loading, openAuthModal, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Conta";

  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-nutri-green shrink-0">
          NutriMatch
        </a>

        {/* Desktop: links centrais */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#como-funciona"
            className="text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
          >
            Como funciona
          </a>
          <a
            href="/cadastro-nutricionista?origem=navbar"
            className="text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
          >
            Para nutricionistas
          </a>
          <a
            href="/nutricionistas"
            className="text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
          >
            Encontrar nutricionista
          </a>
        </div>

        {/* Desktop: auth (lado direito) */}
        <div className="hidden items-center gap-3 md:flex">
          {!loading && (
            <>
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-nutri-text transition-colors hover:bg-muted"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-nutri-green text-xs font-semibold text-white">
                      {initials}
                    </div>
                    <span className="max-w-[120px] truncate">{displayName}</span>
                    <ChevronDown className="h-4 w-4 text-nutri-muted" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-white py-1 shadow-lg">
                      <a
                        href="/minha-conta"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-nutri-text transition-colors hover:bg-muted"
                      >
                        <User className="h-4 w-4 text-nutri-muted" />
                        Minha conta
                      </a>
                      <button
                        onClick={() => { signOut(); setDropdownOpen(false); }}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-nutri-text transition-colors hover:bg-muted"
                      >
                        <LogOut className="h-4 w-4 text-nutri-muted" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={openAuthModal}>
                    Entrar
                  </Button>
                  <a href="/nutricionistas">
                    <Button
                      size="sm"
                      className="bg-nutri-green text-white hover:bg-nutri-green-dark"
                    >
                      Encontrar nutricionista
                    </Button>
                  </a>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-nutri-text" />
          ) : (
            <Menu className="h-6 w-6 text-nutri-text" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            <a
              href="#como-funciona"
              className="text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
              onClick={() => setMobileOpen(false)}
            >
              Como funciona
            </a>
            <a
              href="/cadastro-nutricionista?origem=navbar"
              className="text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
              onClick={() => setMobileOpen(false)}
            >
              Para nutricionistas
            </a>

            {!loading && (
              <>
                {user ? (
                  <>
                    <a
                      href="/minha-conta"
                      className="text-sm font-medium text-nutri-text"
                      onClick={() => setMobileOpen(false)}
                    >
                      Minha conta
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => { signOut(); setMobileOpen(false); }}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => { openAuthModal(); setMobileOpen(false); }}
                    >
                      Entrar
                    </Button>
                    <a href="/nutricionistas">
                      <Button
                        size="sm"
                        className="w-full bg-nutri-green text-white hover:bg-nutri-green-dark"
                      >
                        Encontrar nutricionista
                      </Button>
                    </a>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
