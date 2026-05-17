import { supabase } from "@/lib/supabase";
import type { Nutricionista, NutricionistaProfile } from "@/lib/types";
import type { Database } from "@/lib/database.types";

type Row = Database["public"]["Tables"]["nutricionistas"]["Row"];

function rowToNutricionista(row: Row): Nutricionista {
  return {
    nome: row.nome,
    crn: row.crn,
    cidade: row.cidade,
    estado: row.estado,
    modalidade: row.modalidade,
    especialidades: row.especialidades,
    nota: Number(row.nota),
    avaliacoes: row.avaliacoes,
    preco: row.preco,
    slug: row.slug,
  };
}

function rowToProfile(row: Row): NutricionistaProfile {
  return {
    ...rowToNutricionista(row),
    bio: row.bio ?? "",
    formacao: row.formacao ?? "",
    universidade: row.universidade ?? "",
    experienciaAnos: row.experiencia_anos ?? 0,
    atendimentos: row.atendimentos ?? 0,
    idiomas: row.idiomas,
    membroDesde: row.membro_desde ?? 0,
    avaliacoesDetalhadas: row.avaliacoes_detalhadas,
  };
}

export async function getNutricionistas(): Promise<Nutricionista[]> {
  const { data, error } = await supabase
    .from("nutricionistas")
    .select(
      "nome, crn, cidade, estado, modalidade, especialidades, nota, avaliacoes, preco, slug"
    )
    .order("nota", { ascending: false });

  if (error) throw new Error(error.message);

  return (data as Row[]).map(rowToNutricionista);
}

export async function getNutricionistaBySlug(
  slug: string
): Promise<NutricionistaProfile | null> {
  const { data, error } = await supabase
    .from("nutricionistas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return rowToProfile(data as Row);
}
