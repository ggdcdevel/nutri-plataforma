"use client";

import { useEffect, useState } from "react";
import { Users, Clock, Heart, MessageCircle, CheckCircle2, Star } from "lucide-react";
import {
  getAdminStats,
  getCadastrosPorDia,
  getAdminLeads,
  getAdminNutricionistas,
  updateNutricionistaStatus,
  type AdminStats,
  type CadastrosDia,
  type AdminLead,
  type AdminNutricionista,
} from "@/lib/queries/admin";

// ─── Mini gráfico de linha ────────────────────────────────────────────────────
function LineChart({ data }: { data: CadastrosDia[] }) {
  if (!data.length) return <p className="text-sm text-muted-foreground">Sem dados</p>;
  const max = Math.max(...data.map((d) => d.count), 1);
  const W = 560; const H = 80; const PL = 8; const PR = 8; const PT = 8; const PB = 4;

  const pts = data.map((d, i) => {
    const x = PL + (i / (data.length - 1)) * (W - PL - PR);
    const y = PT + (1 - d.count / max) * (H - PT - PB);
    return { x, y, ...d };
  });

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pts[0].x},${H} ${polyline} ${pts[pts.length - 1].x},${H}`;

  const labelEvery = Math.ceil(data.length / 6);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D9E75" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1D9E75" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#lg)" />
        <polyline points={polyline} fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) =>
          i % labelEvery === 0 ? (
            <text key={i} x={p.x} y={H} textAnchor="middle" fontSize="9" fill="#9CA3AF">
              {p.dia.slice(5)}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
}

// ─── Badge de status do lead ──────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  aguardando: "bg-amber-100 text-amber-700",
  contatado: "bg-sky-100 text-sky-700",
  aprovado: "bg-emerald-100 text-emerald-700",
  inativo: "bg-gray-100 text-gray-500",
  agendamento_pendente: "bg-violet-100 text-violet-700",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[status] ?? "bg-gray-100 text-gray-500"}`}>
      {status.replace("_", " ")}
    </span>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function AdminOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [chart, setChart] = useState<CadastrosDia[]>([]);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [nutris, setNutris] = useState<AdminNutricionista[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminStats(),
      getCadastrosPorDia(),
      getAdminLeads({ status: "aguardando" }),
      getAdminNutricionistas(),
    ]).then(([s, c, l, n]) => {
      setStats(s);
      setChart(c);
      setLeads(l.filter((x) => x.origem !== "perfil").slice(0, 5));
      setNutris(n.slice(0, 5));
      setLoading(false);
    });
  }, []);

  async function handleAprovar(id: string) {
    await updateNutricionistaStatus(id, "aprovado");
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nutri-green border-t-transparent" />
      </div>
    );
  }

  const CARDS = [
    { label: "Nutricionistas aprovados", value: stats?.totalNutricionistas ?? 0, icon: Users, color: "text-nutri-green bg-nutri-green/10" },
    { label: "Leads aguardando",          value: stats?.leadsAguardando ?? 0,     icon: Clock,  color: "text-amber-600 bg-amber-100" },
    { label: "Pacientes cadastrados",     value: stats?.totalPacientes ?? 0,      icon: Heart,  color: "text-rose-500 bg-rose-100" },
    { label: "Agendamentos hoje",         value: stats?.agendamentosHoje ?? 0,    icon: MessageCircle, color: "text-sky-600 bg-sky-100" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-nutri-text">Visão Geral</h1>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-border bg-white p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-nutri-text">{value}</p>
            <p className="mt-0.5 text-sm text-nutri-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-nutri-text">Novos cadastros — últimos 30 dias</h2>
        <LineChart data={chart} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Últimos leads */}
        <div className="rounded-xl border border-border bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-nutri-text">Últimos leads de nutricionistas</h2>
          {leads.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum lead pendente.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-nutri-muted">
                    <th className="pb-2 font-medium">Nome</th>
                    <th className="pb-2 font-medium">Cidade</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5 font-medium text-nutri-text">{l.nome}</td>
                      <td className="py-2.5 text-nutri-muted">{l.cidade}</td>
                      <td className="py-2.5"><StatusBadge status={l.status} /></td>
                      <td className="py-2.5">
                        <button
                          onClick={() => handleAprovar(l.id)}
                          className="flex items-center gap-1 rounded-lg border border-nutri-green/30 px-2 py-1 text-xs font-medium text-nutri-green hover:bg-nutri-green/5"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Aprovar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Nutricionistas top */}
        <div className="rounded-xl border border-border bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-nutri-text">Nutricionistas mais bem avaliados</h2>
          <div className="flex flex-col gap-2">
            {nutris.map((n, i) => (
              <div key={n.id} className="flex items-center gap-3">
                <span className="w-5 text-center text-xs font-bold text-nutri-muted">{i + 1}</span>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nutri-green/10 text-xs font-semibold text-nutri-green">
                  {n.nome.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-nutri-text">{n.nome}</p>
                  <p className="text-xs text-nutri-muted">{n.cidade}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{n.nota}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
