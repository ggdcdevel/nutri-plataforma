import { Star, GraduationCap, Briefcase, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { NutricionistaProfile } from "@/lib/types";

function getInitials(name: string) {
  const parts = name.split(" ");
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export function ProfileAbout({ nutri }: { nutri: NutricionistaProfile }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
          {getInitials(nutri.nome)}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">{nutri.nome}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{nutri.crn}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{nutri.cidade}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
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
      <div className="mt-4 flex flex-wrap gap-1.5">
        {nutri.especialidades.map((esp) => (
          <span
            key={esp}
            className="rounded-full bg-nutri-green/10 px-3 py-1 text-xs font-medium text-nutri-green"
          >
            {esp}
          </span>
        ))}
      </div>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(nutri.nota)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-foreground">
          {nutri.nota}
        </span>
        <span className="text-sm text-muted-foreground">
          ({nutri.avaliacoes} {"avaliações"})
        </span>
      </div>

      {/* Bio */}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {nutri.bio}
      </p>
    </div>
  );
}

export function ProfileFormacao({ nutri }: { nutri: NutricionistaProfile }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">
        {"Formação e experiência"}
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-nutri-green" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {"Formação"}
            </p>
            <p className="text-sm text-muted-foreground">
              {nutri.universidade} — {nutri.formacao}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-nutri-green" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {"Experiência"}
            </p>
            <p className="text-sm text-muted-foreground">
              {nutri.experienciaAnos} anos de {"atuação"}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className="mt-0.5 h-5 w-5 shrink-0 text-nutri-green" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Atendimentos realizados
            </p>
            <p className="text-sm text-muted-foreground">
              {nutri.atendimentos}+ atendimentos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileAvaliacoes({ nutri }: { nutri: NutricionistaProfile }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">
        O que dizem os pacientes
      </h2>
      <div className="mt-4 flex flex-col gap-5">
        {nutri.avaliacoesDetalhadas.map((av, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-nutri-surface text-xs font-semibold text-muted-foreground">
                  {av.iniciais}
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-3.5 w-3.5 ${
                        j < av.nota
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{av.tempo}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {av.texto}
            </p>
            {i < nutri.avaliacoesDetalhadas.length - 1 && (
              <div className="mt-1 border-b border-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
