import { supabase } from "@/lib/supabase";
import type { Nutricionista } from "@/lib/types";

export async function getFavoritosIds(userId: string): Promise<string[]> {
  const { data, error } = await (supabase as any)
    .from("favoritos")
    .select("nutricionista_id")
    .eq("paciente_id", userId);

  if (error) return [];
  return data.map((r: { nutricionista_id: string }) => r.nutricionista_id);
}

export async function addFavorito(
  userId: string,
  nutricionistaId: string
): Promise<void> {
  await (supabase as any)
    .from("favoritos")
    .insert({ paciente_id: userId, nutricionista_id: nutricionistaId });
}

export async function removeFavorito(
  userId: string,
  nutricionistaId: string
): Promise<void> {
  await (supabase as any)
    .from("favoritos")
    .delete()
    .eq("paciente_id", userId)
    .eq("nutricionista_id", nutricionistaId);
}

export async function getFavoritosNutricionistas(
  userId: string
): Promise<Nutricionista[]> {
  const { data, error } = await (supabase as any)
    .from("favoritos")
    .select(
      `nutricionista_id, nutricionistas(id, nome, crn, cidade, estado, modalidade, especialidades, nota, avaliacoes, preco, slug)`
    )
    .eq("paciente_id", userId);

  if (error) return [];

  return (data as any[])
    .map((r) => r.nutricionistas)
    .filter(Boolean)
    .map((n: any) => ({
      id: n.id,
      nome: n.nome,
      crn: n.crn,
      cidade: n.cidade,
      estado: n.estado ?? "",
      modalidade: n.modalidade as "Online" | "Presencial",
      especialidades: n.especialidades as string[],
      nota: Number(n.nota),
      avaliacoes: n.avaliacoes as number,
      preco: n.preco as number,
      slug: n.slug,
    }));
}
