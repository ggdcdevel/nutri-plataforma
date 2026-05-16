"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Filters = {
  modalidade: string;
  especialidades: string[];
  avaliacaoMinima: string;
  cidade: string;
};

interface FiltersSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
}

const especialidadesList = [
  "Emagrecimento",
  "Nutrição esportiva",
  "Diabetes",
  "Vegetarianismo",
  "Nutrição materno-infantil",
  "Oncologia",
  "Saúde intestinal",
];

export default function FiltersSidebar({
  filters,
  onChange,
  onClear,
}: FiltersSidebarProps) {
  function handleModalidade(value: string) {
    onChange({ ...filters, modalidade: value });
  }

  function handleEspecialidade(value: string) {
    const current = filters.especialidades;
    const next = current.includes(value)
      ? current.filter((e) => e !== value)
      : [...current, value];
    onChange({ ...filters, especialidades: next });
  }

  function handleAvaliacao(value: string) {
    onChange({ ...filters, avaliacaoMinima: value });
  }

  function handleCidade(value: string) {
    onChange({ ...filters, cidade: value });
  }

  return (
    <aside className="w-full shrink-0 lg:w-[280px]">
      <div className="rounded-xl border border-border bg-card p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Filtros</h2>
          <button
            onClick={onClear}
            className="text-sm font-medium text-nutri-green transition-colors hover:text-nutri-green-dark"
          >
            Limpar tudo
          </button>
        </div>

        {/* Modalidade */}
        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-foreground">
            Modalidade
          </legend>
          <div className="mt-2 flex flex-col gap-2">
            {["Todos", "Online", "Presencial"].map((opt) => (
              <label
                key={opt}
                className="flex cursor-pointer items-center gap-2 text-sm text-nutri-text"
              >
                <input
                  type="radio"
                  name="modalidade"
                  value={opt}
                  checked={filters.modalidade === opt}
                  onChange={() => handleModalidade(opt)}
                  className="h-4 w-4 accent-nutri-green"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Especialidade */}
        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-foreground">
            Especialidade
          </legend>
          <div className="mt-2 flex flex-col gap-2">
            {especialidadesList.map((esp) => (
              <label
                key={esp}
                className="flex cursor-pointer items-center gap-2 text-sm text-nutri-text"
              >
                <input
                  type="checkbox"
                  checked={filters.especialidades.includes(esp)}
                  onChange={() => handleEspecialidade(esp)}
                  className="h-4 w-4 rounded accent-nutri-green"
                />
                {esp}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Avaliação mínima */}
        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-foreground">
            {"Avaliação mínima"}
          </legend>
          <div className="mt-2 flex flex-col gap-2">
            {[
              { label: "4.5+", value: "4.5" },
              { label: "4.0+", value: "4.0" },
              { label: "Qualquer", value: "0" },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2 text-sm text-nutri-text"
              >
                <input
                  type="radio"
                  name="avaliacao"
                  value={opt.value}
                  checked={filters.avaliacaoMinima === opt.value}
                  onChange={() => handleAvaliacao(opt.value)}
                  className="h-4 w-4 accent-nutri-green"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Cidade */}
        <div className="mt-6">
          <label className="text-sm font-medium text-foreground">Cidade</label>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Ex: São Paulo"
              value={filters.cidade}
              onChange={(e) => handleCidade(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
