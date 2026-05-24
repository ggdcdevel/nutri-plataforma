"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import {
  getLeadsPorOrigem,
  getEspecialidadesDistribuicao,
  getCidadesNutricionistas,
  getFunnelConversao,
  getTopNutricionistasPorAgendamento,
} from "@/lib/queries/admin";

// ─── Gráfico de barras horizontal ────────────────────────────────────────────
function HBarChart({ data, color = "#1D9E75" }: { data: { label: string; count: number }[]; color?: string }) {
  if (!data.length) return <p className="text-sm text-nutri-muted">Sem dados</p>;
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex flex-col gap-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-36 shrink-0 truncate text-right text-xs text-nutri-muted">{d.label}</span>
          <div className="flex-1 rounded-full bg-muted/60 h-4 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(d.count / max) * 100}%`, backgroundColor: color }}
            />
          </div>
          <span className="w-7 shrink-0 text-xs font-semibold text-nutri-text text-right">{d.count}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Gráfico de rosca (origens) ───────────────────────────────────────────────
const DONUT_COLORS = ["#1D9E75", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"];

function DonutChart({ data }: { data: { origem: string; count: number }[] }) {
  if (!data.length) return <p className="text-sm text-nutri-muted">Sem dados</p>;
  const total = data.reduce((s, d) => s + d.count, 0);
  const R = 60; const CX = 80; const CY = 80;
  let angle = -Math.PI / 2;
  const slices: { path: string; color: string; label: string; pct: string }[] = [];

  for (let i = 0; i < data.length; i++) {
    const pct = data[i].count / total;
    const sweep = pct * 2 * Math.PI;
    const x1 = CX + R * Math.cos(angle);
    const y1 = CY + R * Math.sin(angle);
    angle += sweep;
    const x2 = CX + R * Math.cos(angle);
    const y2 = CY + R * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    const RI = 30;
    const ix1 = CX + RI * Math.cos(angle - sweep);
    const iy1 = CY + RI * Math.sin(angle - sweep);
    const ix2 = CX + RI * Math.cos(angle);
    const iy2 = CY + RI * Math.sin(angle);
    slices.push({
      path: `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${RI} ${RI} 0 ${large} 0 ${ix1} ${iy1} Z`,
      color: DONUT_COLORS[i % DONUT_COLORS.length],
      label: data[i].origem,
      pct: `${Math.round(pct * 100)}%`,
    });
  }

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 160" className="w-36 shrink-0">
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} />
        ))}
      </svg>
      <div className="flex flex-col gap-1.5">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-nutri-muted capitalize">{s.label}</span>
            <span className="ml-auto text-xs font-semibold text-nutri-text">{s.pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Funil de conversão ───────────────────────────────────────────────────────
function FunnelViz({ visitantes, leads, aprovados }: { visitantes: number; leads: number; aprovados: number }) {
  const steps = [
    { label: "Visitantes", value: visitantes, color: "bg-sky-100 text-sky-700", bar: "bg-sky-400" },
    { label: "Leads gerados", value: leads, color: "bg-amber-100 text-amber-700", bar: "bg-amber-400" },
    { label: "Aprovados", value: aprovados, color: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-400" },
  ];
  const max = Math.max(visitantes, 1);

  return (
    <div className="flex flex-col gap-3">
      {steps.map((s, i) => {
        const pct = Math.round((s.value / max) * 100);
        const convRate = i > 0 ? steps[i - 1].value > 0 ? `${Math.round((s.value / steps[i - 1].value) * 100)}% do anterior` : "—" : null;
        return (
          <div key={s.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.color}`}>{s.label}</span>
              <div className="flex items-center gap-2">
                {convRate && <span className="text-xs text-nutri-muted">{convRate}</span>}
                <span className="text-sm font-bold text-nutri-text">{s.value.toLocaleString("pt-BR")}</span>
              </div>
            </div>
            <div className="h-3 w-full rounded-full bg-muted/60 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${s.bar}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function AdminMetricasPage() {
  const [loading, setLoading] = useState(true);
  const [origens, setOrigens] = useState<{ origem: string; count: number }[]>([]);
  const [especialidades, setEspecialidades] = useState<{ especialidade: string; count: number }[]>([]);
  const [cidades, setCidades] = useState<{ cidade: string; count: number }[]>([]);
  const [funnel, setFunnel] = useState({ visitantes: 0, leads: 0, aprovados: 0 });
  const [topNutris, setTopNutris] = useState<{ nome: string; slug: string; count: number }[]>([]);

  useEffect(() => {
    Promise.all([
      getLeadsPorOrigem(),
      getEspecialidadesDistribuicao(),
      getCidadesNutricionistas(),
      getFunnelConversao(),
      getTopNutricionistasPorAgendamento(),
    ]).then(([o, e, c, f, t]) => {
      setOrigens(o);
      setEspecialidades(e);
      setCidades(c);
      setFunnel(f);
      setTopNutris(t);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nutri-green border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-nutri-text">Métricas</h1>

      {/* Linha 1: Especialidades + Origens */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Especialidades mais registradas */}
        <div className="rounded-xl border border-border bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-nutri-green" />
            <h2 className="text-sm font-semibold text-nutri-text">Especialidades — nutricionistas aprovados</h2>
          </div>
          <HBarChart
            data={especialidades.map((e) => ({ label: e.especialidade, count: e.count }))}
            color="#1D9E75"
          />
        </div>

        {/* Origem dos leads */}
        <div className="rounded-xl border border-border bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-sky-500" />
            <h2 className="text-sm font-semibold text-nutri-text">Origem dos leads</h2>
          </div>
          <DonutChart data={origens} />
        </div>
      </div>

      {/* Linha 2: Funil + Cidades */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Funil de conversão */}
        <div className="rounded-xl border border-border bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <h2 className="text-sm font-semibold text-nutri-text">Funil de conversão</h2>
          </div>
          <FunnelViz
            visitantes={funnel.visitantes}
            leads={funnel.leads}
            aprovados={funnel.aprovados}
          />
          {funnel.visitantes === 0 && (
            <p className="mt-3 text-xs text-nutri-muted">
              Pageviews ainda sem dados — a tabela <code>page_views</code> será preenchida conforme os usuários navegam.
            </p>
          )}
        </div>

        {/* Cidades com mais nutricionistas */}
        <div className="rounded-xl border border-border bg-white p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-nutri-text">Cidades — nutricionistas aprovados</h2>
          </div>
          <HBarChart
            data={cidades.map((c) => ({ label: c.cidade, count: c.count }))}
            color="#3B82F6"
          />
        </div>
      </div>

      {/* Linha 3: Top nutricionistas por agendamento */}
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-nutri-text">Nutricionistas com mais solicitações de agendamento</h2>
          <p className="text-xs text-nutri-muted">Baseado em leads com origem "perfil"</p>
        </div>
        {topNutris.length === 0 ? (
          <p className="text-sm text-nutri-muted">Nenhum agendamento registrado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-nutri-muted">
                  <th className="pb-2 font-medium">#</th>
                  <th className="pb-2 font-medium">Nutricionista</th>
                  <th className="pb-2 font-medium">Agendamentos</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {topNutris.map((n, i) => (
                  <tr key={n.slug} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 text-xs font-bold text-nutri-muted">{i + 1}</td>
                    <td className="py-2.5 font-medium text-nutri-text">{n.nome}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-2 rounded-full bg-nutri-green/20 flex-1 max-w-[120px] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-nutri-green"
                            style={{ width: `${(n.count / (topNutris[0]?.count || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-nutri-text">{n.count}</span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <Link
                        href={`/nutricionistas/${n.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs text-nutri-muted hover:text-nutri-text"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Ver perfil
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
