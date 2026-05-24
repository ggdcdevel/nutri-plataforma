import { supabase } from "@/lib/supabase";

export type AgendamentoLeadInput = {
  nutricionistaId: string;
  nutricionistaEmail?: string;
  nutricionistaNome: string;
  nutricionistaCrn: string;
  nutricionistaCidade: string;
  nutricionistaEspecialidades: string[];
  nutricionistaWhatsapp: string;
  modalidadeEscolhida: string;
  objetivo: string;
  mensagem: string;
  pacienteId?: string | null;
  pacienteEmail?: string | null;
};

export async function saveAgendamentoLead(input: AgendamentoLeadInput): Promise<void> {
  await (supabase as any).from("leads_nutricionistas").insert({
    // Campos legados preenchidos com dados do nutricionista como referência
    nome: input.nutricionistaNome,
    email: input.nutricionistaEmail ?? "",
    whatsapp: input.nutricionistaWhatsapp,
    crn: input.nutricionistaCrn,
    cidade: input.nutricionistaCidade,
    modalidade: input.modalidadeEscolhida,
    especialidades: input.nutricionistaEspecialidades,
    status: "agendamento_pendente",
    origem: "perfil",
    // Campos de agendamento
    nutricionista_id: input.nutricionistaId,
    nutricionista_email: input.nutricionistaEmail ?? null,
    modalidade_escolhida: input.modalidadeEscolhida,
    objetivo: input.objetivo,
    mensagem: input.mensagem,
    paciente_id: input.pacienteId ?? null,
    paciente_email: input.pacienteEmail ?? null,
  });
}
