import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Nutricionista = {
  nome: string;
  crn: string;
  modalidade: "Online" | "Presencial";
  cidade: string;
  especialidades: string[];
  nota: number;
  avaliacoes: number;
  preco: number;
  slug: string;
};

function getInitials(name: string) {
  const parts = name.split(" ");
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

const avatarColors = [
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-rose-100 text-rose-700",
  "bg-teal-100 text-teal-700",
];

export default function NutricionistaCard({
  nutri,
  index,
}: {
  nutri: Nutricionista;
  index: number;
}) {
  const color = avatarColors[index % avatarColors.length];

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-nutri-green/40">
      {/* Top row */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${color}`}
        >
          {getInitials(nutri.nome)}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold leading-tight text-foreground">
                {nutri.nome}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {nutri.crn}
              </p>
            </div>
            <span className="shrink-0 text-base font-bold text-foreground">
              {"R$ "}
              {nutri.preco}
            </span>
          </div>

          {/* Location + modality */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {nutri.cidade}
            </span>
            <Badge
              className={
                nutri.modalidade === "Online"
                  ? "border-nutri-green/20 bg-nutri-green/10 text-nutri-green"
                  : "border-amber-500/20 bg-amber-500/10 text-amber-600"
              }
            >
              {nutri.modalidade}
            </Badge>
          </div>
        </div>
      </div>

      {/* Specialties */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {nutri.especialidades.map((esp) => (
          <span
            key={esp}
            className="rounded-full bg-nutri-green/10 px-2.5 py-0.5 text-xs font-medium text-nutri-green"
          >
            {esp}
          </span>
        ))}
      </div>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.round(nutri.nota)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">
          {nutri.nota}
        </span>
        <span className="text-sm text-muted-foreground">
          ({nutri.avaliacoes})
        </span>
      </div>

      {/* CTA */}
      <Link href={`/nutricionistas/${nutri.slug}`} className="mt-4">
        <Button
          variant="outline"
          className="w-full border-nutri-green/30 text-nutri-green hover:bg-nutri-green/5 hover:text-nutri-green-dark"
        >
          Ver perfil
        </Button>
      </Link>
    </div>
  );
}
