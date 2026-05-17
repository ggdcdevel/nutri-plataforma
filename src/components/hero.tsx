"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const tags = [
  "Emagrecimento",
  "Nutrição esportiva",
  "Vegetarianismo",
  "Diabetes",
  "Gestação",
];

export default function Hero() {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  function handleBusca() {
    const q = busca.trim();
    router.push(
      q ? `/nutricionistas?busca=${encodeURIComponent(q)}` : "/nutricionistas"
    );
  }

  function handleTag(tag: string) {
    router.push(`/nutricionistas?busca=${encodeURIComponent(tag)}`);
  }

  return (
    <section className="flex flex-col items-center px-6 pb-20 pt-32 text-center md:pt-40 md:pb-28">
      <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-nutri-text text-balance md:text-5xl lg:text-6xl">
        Encontre seu nutricionista ideal, online ou presencial
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-nutri-muted text-pretty">
        Conectamos você a profissionais verificados em todo o Brasil.
      </p>

      {/* Search bar */}
      <div className="mt-10 flex w-full max-w-xl items-center gap-0 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        <div className="flex flex-1 items-center gap-3 px-4">
          <Search className="h-5 w-5 shrink-0 text-nutri-muted" />
          <input
            type="text"
            placeholder="Busque por especialidade ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBusca()}
            className="w-full py-3.5 text-sm text-nutri-text placeholder:text-nutri-muted focus:outline-none"
          />
        </div>
        <Button
          onClick={handleBusca}
          className="h-full rounded-none bg-nutri-green px-6 text-white hover:bg-nutri-green-dark"
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
