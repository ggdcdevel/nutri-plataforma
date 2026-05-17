"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CityAutocomplete from "@/components/ui/city-autocomplete";
import { CIDADES } from "@/lib/cidades";
import { Search, MapPin, Loader2 } from "lucide-react";

const tags = [
  "Emagrecimento",
  "Nutrição esportiva",
  "Vegetarianismo",
  "Diabetes",
  "Gestação",
];

function norm(str: string) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export default function Hero() {
  const [busca, setBusca] = useState("");
  const [cidade, setCidade] = useState("");
  const [detectando, setDetectando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    detectarLocalizacao();
  }, []);

  async function detectarLocalizacao() {
    if (!navigator.geolocation) return;
    setDetectando(true);
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
        })
      );
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
        { headers: { "Accept-Language": "pt-BR" } }
      );
      const data = await res.json();
      const c =
        data.address?.city ||
        data.address?.town ||
        data.address?.municipality ||
        data.address?.county ||
        "";
      if (c) {
        const match = CIDADES.find((o) => norm(o.cidade) === norm(c));
        setCidade(match ? `${match.cidade}, ${match.estado}` : c);
      }
    } catch {
      // silent fail — user pode digitar manualmente
    } finally {
      setDetectando(false);
    }
  }

  function handleBusca() {
    const params = new URLSearchParams();
    if (busca.trim()) params.set("busca", busca.trim());
    if (cidade.trim()) params.set("cidade", cidade.trim());
    const qs = params.toString();
    router.push(`/nutricionistas${qs ? "?" + qs : ""}`);
  }

  function handleTag(tag: string) {
    const params = new URLSearchParams();
    params.set("busca", tag);
    if (cidade.trim()) params.set("cidade", cidade.trim());
    router.push(`/nutricionistas?${params.toString()}`);
  }

  return (
    <section className="flex flex-col items-center px-6 pb-20 pt-32 text-center md:pb-28 md:pt-40">
      <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-nutri-text md:text-5xl lg:text-6xl">
        Encontre seu nutricionista ideal, online ou presencial
      </h1>
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-nutri-muted">
        Conectamos você a profissionais verificados em todo o Brasil.
      </p>

      {/* Search bar */}
      <div className="mt-10 flex w-full max-w-2xl flex-col rounded-xl border border-border bg-background shadow-sm sm:flex-row">
        {/* Especialidade */}
        <div className="flex flex-1 items-center gap-3 px-4 sm:border-r sm:border-border">
          <Search className="h-5 w-5 shrink-0 text-nutri-muted" />
          <input
            type="text"
            placeholder="Especialidade ou nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBusca()}
            className="w-full py-3.5 text-sm text-nutri-text placeholder:text-nutri-muted focus:outline-none"
          />
        </div>

        {/* Divisor mobile */}
        <div className="h-px bg-border sm:hidden" />

        {/* Cidade */}
        <div className="flex w-full items-center gap-2 px-4 sm:w-56">
          {detectando ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin text-nutri-muted" />
          ) : (
            <MapPin className="h-5 w-5 shrink-0 text-nutri-muted" />
          )}
          <CityAutocomplete
            value={cidade}
            onChange={setCidade}
            options={CIDADES}
            placeholder={detectando ? "Detectando..." : "Sua cidade..."}
            inputClassName="w-full py-3.5 text-sm text-nutri-text placeholder:text-nutri-muted focus:outline-none bg-transparent"
            onEnter={handleBusca}
          />
        </div>

        {/* Divisor mobile */}
        <div className="h-px bg-border sm:hidden" />

        <Button
          onClick={handleBusca}
          className="rounded-b-xl bg-nutri-green px-6 py-3.5 text-white hover:bg-nutri-green-dark sm:rounded-none sm:rounded-r-xl"
        >
          Buscar
        </Button>
      </div>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            onClick={() => handleTag(tag)}
            className="cursor-pointer px-3.5 py-1.5 text-sm font-normal text-nutri-muted transition-colors hover:bg-nutri-green/10 hover:text-nutri-green"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </section>
  );
}
