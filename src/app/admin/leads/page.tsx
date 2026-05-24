"use client";

import { useEffect, useState, useMemo } from "react";
import { MessageCircle, Clock } from "lucide-react";
import { getAdminLeads, updateLeadStatus, type AdminLead } from "@/lib/queries/admin";

const STATUSES = ["aguardando", "contatado", "aprovado", "inativo", "agendamento_pendente"];

const STATUS_STYLE: Record<string, string> = {
  aguardando:          "bg-amber-100 text-amber-700",
  contatado:           "bg-sky-100 text-sky-700",
  aprovado:            "bg-emerald-100 text-emerald-700",
  inativo:             "bg-gray-100 text-gray-500",
  agendamento_pendente:"bg-violet-100 text-violet-700",
};

const ORIGENS = ["instagram", "facebook", "navbar", "footer", "direto", "perfil", "organico"];

function horasSince(iso: string) {
  return (Date.now() - new Date(iso).getTime()) / 3_600_000;
}

export default function AdminLeadsPage() {
  const [data, setData] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOrigem, setFilterOrigem] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    getAdminLeads().then((d) => { setData(d); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return data.filter((l) => {
      const matchOrigem = !filterOrigem || l.origem === filterOrigem;
      const matchStatus = !filterStatus || l.status === filterStatus;
      return matchOrigem && matchStatus;
    });
  }, [data, filterOrigem, filterStatus]);

  async function handleStatus(id: string, status: string) {
    await updateLeadStatus(id, status);
    setData((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
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
        <h1 className="text-xl font-semibold text-nutri-text">Leads</h1>
        <span className="text-sm text-nutri-muted">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterOrigem}
          onChange={(e) => setFilterOrigem(e.target.value)}
          className="h-9 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-nutri-green"
        >
          <option value="">Todas as origens</option>
          {ORIGENS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-9 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-nutri-green"
        >
          <option value="">Todos os status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/30">
            <tr className="text-left text-xs text-nutri-muted">
              <th className="px-4 py-3 font-medium">Nome / E-mail</th>
              <th className="px-4 py-3 font-medium">Cidade</th>
              <th className="px-4 py-3 font-medium">Origem</th>
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => {
              const atrasado = l.status === "aguardando" && horasSince(l.created_at) > 48;
              return (
                <tr key={l.id} className={`border-b border-border/50 last:border-0 hover:bg-muted/20 ${atrasado ? "bg-amber-50/40" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-nutri-text">{l.nome}</p>
                    <p className="text-xs text-nutri-muted">{l.email}</p>
                    {l.objetivo && (
                      <p className="mt-0.5 text-xs text-violet-600 italic truncate max-w-[180px]">{l.objetivo}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-nutri-muted">{l.cidade}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-nutri-text">
                      {l.origem || "direto"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-nutri-muted">
                      {new Date(l.created_at).toLocaleDateString("pt-BR")}
                    </div>
                    {atrasado && (
                      <div className="flex items-center gap-1 text-xs text-amber-600">
                        <Clock className="h-3 w-3" /> +48h
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[l.status] ?? "bg-gray-100 text-gray-500"}`}>
                      {l.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={l.status}
                        onChange={(e) => handleStatus(l.id, e.target.value)}
                        className="h-7 rounded border border-border bg-white px-1.5 text-xs outline-none focus:border-nutri-green"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {l.whatsapp && (
                        <a
                          href={`https://api.whatsapp.com/send?phone=55${l.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-7 w-7 items-center justify-center rounded border border-border text-nutri-muted hover:border-green-300 hover:text-green-600"
                          title="Abrir WhatsApp"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-nutri-muted">Nenhum lead encontrado.</p>
        )}
      </div>
    </div>
  );
}
