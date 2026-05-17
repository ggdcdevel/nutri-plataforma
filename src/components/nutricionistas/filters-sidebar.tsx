"use client";

import { useState } from "react";
import { Search, LocateFixed, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";

type Filters = {
  modalidade: string;
  especialidades: string[];
  avaliacaoMinima: string;
  localizacao: string;
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
  const [detectando, setDetectando] = useState(false);
  const [erroGeo, setErroGeo] = useState("");

  function handleModalidade(value: string) {
    onChange({ ...filters, modalidade: value });
  }

  function handleEspecialidade(value: string) {
    const next = filters.especialidades.includes(value)
      ? filters.especialidades.filter((e) => e !== value)
      : [...filters.especialidades, value];
    onChange({ ...filters, especialidades: next });
  }

  function handleAvaliacao(value: string) {
    onChange({ ...filters, avaliacaoMinima: value });
  }

  async function detectarLocalizacao() {
    if (!navigator.geolocation) {
      setErroGeo("Seu navegador não suporta geolocalização.");
      return;
    }
    setDetectando(true);
    setErroGeo("");
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
        })
      );
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        { headers: { "Accept-Language": "pt-BR" } }
      );
      const data = await res.json();
      const cidade =
        data.address?.city ||
        data.address?.town ||
        data.address?.municipality ||
        data.address?.county ||
        "";
      if (cidade) {
        onChange({ ...filters, localizacao: cidade });
      } else {
        setErroGeo("Cidade não identificada. Digite manualmente.");
      }
    } catch {
      setErroGeo("Permissão negada. Digite sua cidade manualmente.");
    } finally {
      setDetectando(false);
    }
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

        {/* Localização */}
        <div className="mt-6">
          <p className="text-sm font-medium text-foreground">{"Localização"}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {"Filtra por cidade de atuação. Use Modalidade para ver só online."}
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <button
              onClick={detectarLocalizacao}
              disabled={detectando}
              className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-nutri-green/40 py-2 text-sm text-nutri-green transition-colors hover:bg-nutri-green/5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {detectando ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LocateFixed className="h-4 w-4" />
              )}
              {detectando ? "Detectando..." : "Usar minha localização"}
            </button>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Ex: São Paulo"
                value={filters.localizacao}
                onChange={(e) =>
                  onChange({ ...filters, localizacao: e.target.value })
                }
                className="pl-8 pr-8"
              />
              {filters.localizacao && (
                <button
                  onClick={() => onChange({ ...filters, localizacao: "" })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Limpar localização"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          {erroGeo && (
            <p className="mt-1.5 text-xs text-red-500">{erroGeo}</p>
          )}
        </div>
      </div>
    </aside>
  );
}
