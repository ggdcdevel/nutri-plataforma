import { supabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AdminStats = {
  totalNutricionistas: number;
  leadsAguardando: number;
  totalPacientes: number;
  agendamentosHoje: number;
};

export type AdminNutricionista = {
  id: string;
  nome: string;
  crn: string;
  cidade: string;
  estado: string;
  especialidades: string[];
  nota: number;
  avaliacoes: number;
  preco: number;
  slug: string;
  whatsapp: string | null;
  bio: string | null;
  status: string;
  destaque: boolean;
  aprovado_em: string | null;
  created_at: string;
};

export type AdminLead = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  cidade: string;
  especialidades: string[];
  origem: string;
  status: string;
  created_at: string;
  objetivo: string | null;
  mensagem: string | null;
  nutricionista_id: string | null;
  paciente_email: string | null;
};

export type CadastrosDia = {
  dia: string;
  count: number;
};

export type AdminUser = {
  user_id: string;
  user_email: string;
  user_nome: string;
  user_role: string;
  user_created_at: string;
};

// ─── Stats overview ───────────────────────────────────────────────────────────

export async function getAdminStats(): Promise<AdminStats> {
  const db = supabase as any;

  const [nutri, leads, pacientes, agendamentos] = await Promise.all([
    db.from("nutricionistas").select("id", { count: "exact", head: true }).eq("status", "aprovado"),
    db.from("leads_nutricionistas").select("id", { count: "exact", head: true }).eq("status", "aguardando"),
    db.from("pacientes").select("id", { count: "exact", head: true }),
    db.from("leads_nutricionistas")
      .select("id", { count: "exact", head: true })
      .eq("origem", "perfil")
      .gte("created_at", new Date().toISOString().slice(0, 10)),
  ]);

  return {
    totalNutricionistas: nutri.count ?? 0,
    leadsAguardando: leads.count ?? 0,
    totalPacientes: pacientes.count ?? 0,
    agendamentosHoje: agendamentos.count ?? 0,
  };
}

// ─── Cadastros por dia (30 dias) ──────────────────────────────────────────────

export async function getCadastrosPorDia(): Promise<CadastrosDia[]> {
  const since = new Date();
  since.setDate(since.getDate() - 29);
  since.setHours(0, 0, 0, 0);

  const { data } = await (supabase as any)
    .from("pacientes")
    .select("created_at")
    .gte("created_at", since.toISOString());

  if (!data?.length) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    const dia = row.created_at.slice(0, 10);
    counts[dia] = (counts[dia] ?? 0) + 1;
  }

  // Fill gaps with 0
  const result: CadastrosDia[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    const dia = d.toISOString().slice(0, 10);
    result.push({ dia, count: counts[dia] ?? 0 });
  }
  return result;
}

// ─── Nutricionistas ───────────────────────────────────────────────────────────

export async function getAdminNutricionistas(): Promise<AdminNutricionista[]> {
  const { data, error } = await (supabase as any)
    .from("nutricionistas")
    .select("id, nome, crn, cidade, estado, especialidades, nota, avaliacoes, preco, slug, whatsapp, bio, status, destaque, aprovado_em, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as AdminNutricionista[];
}

export async function updateNutricionistaStatus(
  id: string,
  status: "aprovado" | "bloqueado" | "pendente"
): Promise<void> {
  await (supabase as any)
    .from("nutricionistas")
    .update({
      status,
      aprovado_em: status === "aprovado" ? new Date().toISOString() : null,
    })
    .eq("id", id);
}

export async function toggleDestaque(id: string, current: boolean): Promise<void> {
  await (supabase as any)
    .from("nutricionistas")
    .update({ destaque: !current })
    .eq("id", id);
}

// ─── Leads ────────────────────────────────────────────────────────────────────

export async function getAdminLeads(filters?: {
  origem?: string;
  status?: string;
}): Promise<AdminLead[]> {
  let query = (supabase as any)
    .from("leads_nutricionistas")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.origem) query = query.eq("origem", filters.origem);
  if (filters?.status) query = query.eq("status", filters.status);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as AdminLead[];
}

export async function updateLeadStatus(id: string, status: string): Promise<void> {
  await (supabase as any)
    .from("leads_nutricionistas")
    .update({ status })
    .eq("id", id);
}

// ─── Métricas ─────────────────────────────────────────────────────────────────

export async function getLeadsPorOrigem(): Promise<{ origem: string; count: number }[]> {
  const { data } = await (supabase as any)
    .from("leads_nutricionistas")
    .select("origem");

  if (!data?.length) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    const o = row.origem || "direto";
    counts[o] = (counts[o] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([origem, count]) => ({ origem, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getEspecialidadesDistribuicao(): Promise<{ especialidade: string; count: number }[]> {
  const { data } = await (supabase as any)
    .from("nutricionistas")
    .select("especialidades")
    .eq("status", "aprovado");

  if (!data?.length) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    for (const esp of row.especialidades ?? []) {
      counts[esp] = (counts[esp] ?? 0) + 1;
    }
  }

  return Object.entries(counts)
    .map(([especialidade, count]) => ({ especialidade, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export async function getCidadesNutricionistas(): Promise<{ cidade: string; count: number }[]> {
  const { data } = await (supabase as any)
    .from("nutricionistas")
    .select("cidade")
    .eq("status", "aprovado");

  if (!data?.length) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    counts[row.cidade] = (counts[row.cidade] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([cidade, count]) => ({ cidade, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export async function getFunnelConversao(): Promise<{
  visitantes: number;
  leads: number;
  aprovados: number;
}> {
  const db = supabase as any;
  const [views, leads, aprovados] = await Promise.all([
    db.from("page_views").select("id", { count: "exact", head: true }),
    db.from("leads_nutricionistas").select("id", { count: "exact", head: true }),
    db.from("leads_nutricionistas").select("id", { count: "exact", head: true }).eq("status", "aprovado"),
  ]);

  return {
    visitantes: views.count ?? 0,
    leads: leads.count ?? 0,
    aprovados: aprovados.count ?? 0,
  };
}

export async function getTopNutricionistasPorAgendamento(): Promise<
  { nome: string; slug: string; count: number }[]
> {
  const { data } = await (supabase as any)
    .from("leads_nutricionistas")
    .select("nutricionista_id, nome")
    .eq("origem", "perfil")
    .not("nutricionista_id", "is", null);

  if (!data?.length) return [];

  const counts: Record<string, { nome: string; count: number }> = {};
  for (const row of data) {
    if (!row.nutricionista_id) continue;
    counts[row.nutricionista_id] = {
      nome: row.nome ?? "",
      count: (counts[row.nutricionista_id]?.count ?? 0) + 1,
    };
  }

  // Buscar slugs
  const ids = Object.keys(counts);
  if (!ids.length) return [];

  const { data: nutris } = await (supabase as any)
    .from("nutricionistas")
    .select("id, nome, slug")
    .in("id", ids);

  return (nutris ?? [])
    .map((n: any) => ({
      nome: n.nome,
      slug: n.slug,
      count: counts[n.id]?.count ?? 0,
    }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 10);
}

// ─── Gestão de usuários ───────────────────────────────────────────────────────

export async function adminGetUserByEmail(email: string): Promise<AdminUser | null> {
  const { data, error } = await (supabase as any).rpc("admin_get_user_by_email", {
    search_email: email.trim().toLowerCase(),
  });

  if (error || !data?.length) return null;
  return data[0] as AdminUser;
}

export async function adminSetUserRole(userId: string, newRole: string): Promise<void> {
  await (supabase as any).rpc("admin_set_user_role", {
    target_user_id: userId,
    new_role: newRole,
  });
}
