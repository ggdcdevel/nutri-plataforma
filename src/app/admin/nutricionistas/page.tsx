"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Star, ExternalLink, CheckCircle2, XCircle, Sparkles, AlertCircle } from "lucide-react";
import {
  getAdminNutricionistas,
  updateNutricionistaStatus,
  toggleDestaque,
  type AdminNutricionista,
} from "@/lib/queries/admin";

const STATUS_STYLE: Record<string, string> = {
  aprovado: "bg-emerald-100 text-emerald-700",
  pendente:  "bg-amber-100  text-amber-700",
  bloqueado: "bg-red-100    text-red-600",
};

function perfilCompleto(n: AdminNutricionista) {
  return !!(n.bio && n.whatsapp);
}

export default function AdminNutricionistasPage() {
  const [data, setData] = useState<AdminNutricionista[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");

  useEffect(() => {
    getAdminNutricionistas().then((d) => { setData(d); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return data.filter((n) => {
      const matchSearch =
        !search ||
        n.nome.toLowerCase().includes(search.toLowerCase()) ||
        n.cidade.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "todos" || n.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [data, search, filterStatus]);

  async function handleStatus(id: string, status: "aprovado" | "bloqueado" | "pendente") {
    await updateNutricionistaStatus(id, status);
    setData((prev) => prev.map((n) => n.id === id
      ? { ...n, status, aprovado_em: status === "aprovado" ? new Date().toISOString() : n.aprovado_em }
      : n
    ));
  }

  async function handleDestaque(id: string, current: boolean) {
    await toggleDestaque(id, current);
    setData((prev) => prev.map((n) => n.id === id ? { ...n, destaque: !current } : n));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nutri-green border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-nutri-text">Nutricionistas</h1>
        <span className="text-sm text-nutri-muted">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Buscar por nome ou cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-nutri-green focus:ring-2 focus:ring-nutri-green/20"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-9 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-nutri-green"
        >
          <option value="todos">Todos os status</option>
          <option value="aprovado">Aprovado</option>
          <option value="pendente">Pendente</option>
          <option value="bloqueado">Bloqueado</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/30">
            <tr className="text-left text-xs text-nutri-muted">
              <th className="px-4 py-3 font-medium">Nutricionista</th>
              <th className="px-4 py-3 font-medium">Cidade</th>
              <th className="px-4 py-3 font-medium">Especialidades</th>
              <th className="px-4 py-3 font-medium">Nota</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Perfil</th>
              <th className="px-4 py-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => {
              const completo = perfilCompleto(n);
              return (
                <tr key={n.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nutri-green/10 text-xs font-semibold text-nutri-green">
                        {n.nome.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-nutri-text">
                          {n.nome}
                          {n.destaque && <Sparkles className="ml-1 inline h-3 w-3 text-amber-400" />}
                        </p>
                        <p className="text-xs text-nutri-muted">{n.crn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-nutri-muted">{n.cidade}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {n.especialidades.slice(0, 2).map((e) => (
                        <span key={e} className="rounded-full bg-nutri-green/10 px-2 py-0.5 text-xs text-nutri-green">
                          {e}
                        </span>
                      ))}
                      {n.especialidades.length > 2 && (
                        <span className="text-xs text-nutri-muted">+{n.especialidades.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{n.nota}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[n.status] ?? "bg-gray-100 text-gray-500"}`}>
                      {n.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {completo ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Completo
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <AlertCircle className="h-3.5 w-3.5" /> Incompleto
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {n.status !== "aprovado" && (
                        <button
                          onClick={() => handleStatus(n.id, "aprovado")}
                          className="rounded px-2 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-50"
                          title="Aprovar"
                        >
                          Aprovar
                        </button>
                      )}
                      {n.status !== "bloqueado" && (
                        <button
                          onClick={() => handleStatus(n.id, "bloqueado")}
                          className="rounded px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50"
                          title="Bloquear"
                        >
                          Bloquear
                        </button>
                      )}
                      <button
                        onClick={() => handleDestaque(n.id, n.destaque)}
                        className={`rounded px-2 py-1 text-xs font-medium hover:bg-amber-50 ${n.destaque ? "text-amber-600" : "text-nutri-muted"}`}
                        title={n.destaque ? "Remover destaque" : "Destacar"}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                      </button>
                      <Link
                        href={`/nutricionistas/${n.slug}`}
                        target="_blank"
                        className="rounded p-1 text-nutri-muted hover:bg-muted"
                        title="Ver perfil público"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-nutri-muted">Nenhum nutricionista encontrado.</p>
        )}
      </div>
    </div>
  );
}
