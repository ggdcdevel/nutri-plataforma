"use client";

import { useState } from "react";
import { Search, ShieldCheck, User, Stethoscope, Loader2 } from "lucide-react";
import { adminGetUserByEmail, adminSetUserRole, type AdminUser } from "@/lib/queries/admin";

const ROLE_STYLE: Record<string, string> = {
  admin:          "bg-violet-100 text-violet-700",
  nutricionista:  "bg-sky-100 text-sky-700",
  paciente:       "bg-emerald-100 text-emerald-700",
};

const ROLE_ICON: Record<string, React.ReactNode> = {
  admin:         <ShieldCheck className="h-3.5 w-3.5" />,
  nutricionista: <Stethoscope className="h-3.5 w-3.5" />,
  paciente:      <User className="h-3.5 w-3.5" />,
};

const ROLES = ["paciente", "nutricionista", "admin"] as const;
type Role = typeof ROLES[number];

export default function AdminUsuariosPage() {
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<AdminUser | null | "not_found">(null);
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSearching(true);
    setResult(null);
    setSuccessMsg("");
    const user = await adminGetUserByEmail(email.trim());
    setResult(user ?? "not_found");
    setSearching(false);
  }

  async function handleRoleChange(userId: string, newRole: Role) {
    setUpdating(true);
    setSuccessMsg("");
    await adminSetUserRole(userId, newRole);
    setResult((prev) =>
      prev && prev !== "not_found" ? { ...prev, user_role: newRole } : prev
    );
    setSuccessMsg(`Role atualizado para "${newRole}" com sucesso.`);
    setUpdating(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-nutri-text">Configurações — Usuários</h1>
        <p className="mt-1 text-sm text-nutri-muted">Busque um usuário por e-mail para visualizar e alterar seu role.</p>
      </div>

      {/* Busca */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nutri-muted" />
          <input
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm outline-none focus:border-nutri-green focus:ring-2 focus:ring-nutri-green/20"
          />
        </div>
        <button
          type="submit"
          disabled={searching || !email.trim()}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-nutri-green px-4 text-sm font-medium text-white transition-colors hover:bg-nutri-green/90 disabled:opacity-50"
        >
          {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Buscar
        </button>
      </form>

      {/* Resultado */}
      {result === "not_found" && (
        <div className="rounded-xl border border-border bg-white p-6 text-center">
          <p className="text-sm text-nutri-muted">Nenhum usuário encontrado com esse e-mail.</p>
        </div>
      )}

      {result && result !== "not_found" && (
        <div className="rounded-xl border border-border bg-white p-6 space-y-5">
          {/* Info do usuário */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-nutri-green/10 text-lg font-bold text-nutri-green">
                {(result.user_nome || result.user_email).charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-nutri-text">{result.user_nome || "—"}</p>
                <p className="text-sm text-nutri-muted">{result.user_email}</p>
                <p className="text-xs text-nutri-muted">
                  Cadastrado em {new Date(result.user_created_at).toLocaleDateString("pt-BR", { dateStyle: "medium" })}
                </p>
              </div>
            </div>
            <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${ROLE_STYLE[result.user_role] ?? "bg-gray-100 text-gray-500"}`}>
              {ROLE_ICON[result.user_role]}
              {result.user_role}
            </span>
          </div>

          {/* Alterar role */}
          <div>
            <p className="mb-3 text-sm font-medium text-nutri-text">Alterar role</p>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  disabled={updating || result.user_role === r}
                  onClick={() => handleRoleChange(result.user_id, r)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors
                    ${result.user_role === r
                      ? "border-nutri-green/40 bg-nutri-green/5 text-nutri-green cursor-default"
                      : "border-border bg-white text-nutri-text hover:border-nutri-green/40 hover:bg-muted"}
                    disabled:opacity-50`}
                >
                  {ROLE_ICON[r]}
                  <span className="capitalize">{r}</span>
                  {result.user_role === r && (
                    <span className="ml-1 rounded-full bg-nutri-green/20 px-1.5 py-0.5 text-xs">atual</span>
                  )}
                </button>
              ))}
              {updating && <Loader2 className="h-5 w-5 animate-spin text-nutri-muted self-center" />}
            </div>
          </div>

          {successMsg && (
            <p className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
              {successMsg}
            </p>
          )}

          {/* Aviso de segurança para promoção a admin */}
          {result.user_role !== "admin" && (
            <p className="rounded-lg bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
              Ao promover um usuário para <strong>admin</strong>, ele terá acesso completo ao painel administrativo. Use com cautela.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
