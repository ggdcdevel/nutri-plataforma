"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold text-nutri-green">
          NutriMatch
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#como-funciona"
            className="text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
          >
            Como funciona
          </a>
          <a
            href="#para-nutricionistas"
            className="text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
          >
            Para nutricionistas
          </a>
          <Button variant="outline" size="sm">
            Entrar
          </Button>
          <Button
            size="sm"
            className="bg-nutri-green text-white hover:bg-nutri-green-dark"
          >
            Encontrar nutricionista
          </Button>
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
              href="#para-nutricionistas"
              className="text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
              onClick={() => setMobileOpen(false)}
            >
              Para nutricionistas
            </a>
            <Button variant="outline" size="sm" className="w-full">
              Entrar
            </Button>
            <Button
              size="sm"
              className="w-full bg-nutri-green text-white hover:bg-nutri-green-dark"
            >
              Encontrar nutricionista
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
