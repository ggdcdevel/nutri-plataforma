"use client";

import { useState, useMemo } from "react";
import { Search, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FiltersSidebar from "@/components/nutricionistas/filters-sidebar";
import NutricionistaCard from "@/components/nutricionistas/nutricionista-card";
import type { Nutricionista } from "@/lib/types";

type Filters = {
  modalidade: string;
  especialidades: string[];
  avaliacaoMinima: string;
  localizacao: string;
};

const defaultFilters: Filters = {
  modalidade: "Todos",
  especialidades: [],
  avaliacaoMinima: "0",
  localizacao: "",
};

type Ordenacao = "relevantes" | "avaliados" | "preco";

function norm(str: string) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export default function NutricionistasListing({
  nutricionistas,
  initialBusca = "",
}: {
  nutricionistas: Nutricionista[];
  initialBusca?: string;
}) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [busca, setBusca] = useState(initialBusca);
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("relevantes");

  const filtered = useMemo(() => {
    let result = [...nutricionistas];

    // Busca por nome, especialidade ou cidade — com normalização de acentos
    if (busca.trim()) {
      const q = norm(busca);
      result = result.filter(
        (n) =>
          norm(n.nome).includes(q) ||
          norm(n.cidade).includes(q) ||
          n.especialidades.some((e) => norm(e).includes(q))
      );
    }

    // Modalidade
    if (filters.modalidade !== "Todos") {
      result = result.filter((n) => n.modalidade === filters.modalidade);
    }

    // Especialidades
    if (filters.especialidades.length > 0) {
      result = result.filter((n) =>
        filters.especialidades.some((e) => n.especialidades.includes(e))
      );
    }

    // Avaliação mínima
    const minRating = parseFloat(filters.avaliacaoMinima);
    if (minRating > 0) {
      result = result.filter((n) => n.nota >= minRating);
    }

    // Localização: online sempre aparece, presencial só se cidade bater
    if (filters.localizacao.trim()) {
      const locQ = norm(filters.localizacao);
      result = result.filter(
        (n) => n.modalidade === "Online" || norm(n.cidade).includes(locQ)
      );
    }

    // Ordenação
    if (ordenacao === "avaliados") {
      result.sort((a, b) => b.nota - a.nota);
    } else if (ordenacao === "preco") {
      result.sort((a, b) => a.preco - b.preco);
    }

    return result;
  }, [busca, filters, ordenacao, nutricionistas]);

  function handleClearFilters() {
    setFilters(defaultFilters);
    setBusca("");
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6 lg:flex-row">
      <FiltersSidebar
        filters={filters}
        onChange={setFilters}
        onClear={() => {
          setFilters(defaultFilters);
          setBusca("");
        }}
      />

      <div className="flex-1">
        {/* Search bar + sort */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, especialidade ou cidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="h-10 pl-9 text-sm"
            />
          </div>
          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value as Ordenacao)}
            className="h-10 rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
          >
            <option value="relevantes">Mais relevantes</option>
            <option value="avaliados">Melhor avaliados</option>
            <option value="preco">Menor preço</option>
          </select>
        </div>

        {/* Result count */}
        <p className="mt-3 text-sm text-muted-foreground">
          {filtered.length === 1
            ? "1 nutricionista encontrado"
            : `${filtered.length} nutricionistas encontrados`}
        </p>

        {/* Grid or empty state */}
        {filtered.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {filtered.map((nutri, i) => (
              <NutricionistaCard key={nutri.slug} nutri={nutri} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <SearchX className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-base text-muted-foreground">
              Nenhum nutricionista encontrado para esses filtros.
            </p>
            <Button
              onClick={handleClearFilters}
              className="bg-nutri-green text-white hover:bg-nutri-green-dark"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
