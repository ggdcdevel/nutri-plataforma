import type { AvaliacaoDetalhada } from "./database.types";

export type Nutricionista = {
  id: string;
  nome: string;
  crn: string;
  modalidade: "Online" | "Presencial";
  cidade: string;
  estado: string;
  especialidades: string[];
  nota: number;
  avaliacoes: number;
  preco: number;
  slug: string;
};

export type NutricionistaProfile = Nutricionista & {
  bio: string;
  formacao: string;
  universidade: string;
  experienciaAnos: number;
  atendimentos: number;
  idiomas: string[];
  membroDesde: number;
  avaliacoesDetalhadas: AvaliacaoDetalhada[];
};
