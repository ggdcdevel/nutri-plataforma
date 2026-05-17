import type { Nutricionista } from "@/lib/types";

export type NutricionistaProfile = Nutricionista & {
  bio: string;
  formacao: string;
  universidade: string;
  experienciaAnos: number;
  atendimentos: number;
  idiomas: string[];
  membroDesde: number;
  avaliacoesDetalhadas: {
    iniciais: string;
    nota: number;
    texto: string;
    tempo: string;
  }[];
};

function toSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export const nutricionistasProfiles: Record<string, NutricionistaProfile> = {
  [toSlug("Ana Beatriz Moura")]: {
    nome: "Ana Beatriz Moura",
    crn: "CRN-3 12547",
    modalidade: "Online",
    cidade: "São Paulo",
    especialidades: [
      "Emagrecimento",
      "Nutrição esportiva",
      "Comportamento alimentar",
    ],
    nota: 4.9,
    avaliacoes: 87,
    preco: 180,
    slug: toSlug("Ana Beatriz Moura"),
    bio: "Especialista em comportamento alimentar e reeducação nutricional. Atuo há 8 anos com foco em emagrecimento sustentável e na melhora da relação com a comida. Acredito que a nutrição vai muito além de dietas — é sobre construir hábitos que cabem na sua vida real.",
    formacao: "Nutrição e Dietética",
    universidade: "USP — Universidade de São Paulo",
    experienciaAnos: 8,
    atendimentos: 800,
    idiomas: ["Português"],
    membroDesde: 2022,
    avaliacoesDetalhadas: [
      {
        iniciais: "M.S.",
        nota: 5,
        texto:
          "Mudou completamente minha relação com a comida. Super recomendo!",
        tempo: "há 2 semanas",
      },
      {
        iniciais: "L.R.",
        nota: 5,
        texto:
          "Profissional incrível, muito atenciosa e didática. Já perdi 8kg em 3 meses.",
        tempo: "há 1 mês",
      },
      {
        iniciais: "P.A.",
        nota: 4,
        texto:
          "Ótima profissional, consultas online muito práticas e objetivas.",
        tempo: "há 2 meses",
      },
    ],
  },
  [toSlug("Carlos Eduardo Lima")]: {
    nome: "Carlos Eduardo Lima",
    crn: "CRN-3 08931",
    modalidade: "Presencial",
    cidade: "Campinas",
    especialidades: ["Nutrição clínica", "Diabetes", "Hipertensão"],
    nota: 4.7,
    avaliacoes: 54,
    preco: 220,
    slug: toSlug("Carlos Eduardo Lima"),
    bio: "Nutricionista clínico com foco em doenças crônicas como diabetes e hipertensão. Minha abordagem é baseada em evidências científicas e no acompanhamento individualizado de cada paciente.",
    formacao: "Nutrição",
    universidade: "UNICAMP — Universidade Estadual de Campinas",
    experienciaAnos: 12,
    atendimentos: 650,
    idiomas: ["Português"],
    membroDesde: 2021,
    avaliacoesDetalhadas: [
      {
        iniciais: "R.M.",
        nota: 5,
        texto:
          "Consegui controlar minha glicemia em poucos meses. Excelente profissional.",
        tempo: "há 3 semanas",
      },
      {
        iniciais: "A.F.",
        nota: 5,
        texto:
          "Muito atencioso e paciente. Explica tudo com clareza.",
        tempo: "há 1 mês",
      },
      {
        iniciais: "T.S.",
        nota: 4,
        texto:
          "Bom profissional, mas o consultório fica um pouco difícil de estacionar.",
        tempo: "há 2 meses",
      },
    ],
  },
  [toSlug("Fernanda Costa")]: {
    nome: "Fernanda Costa",
    crn: "CRN-2 05412",
    modalidade: "Online",
    cidade: "Rio de Janeiro",
    especialidades: [
      "Nutrição materno-infantil",
      "Amamentação",
      "Introdução alimentar",
    ],
    nota: 4.8,
    avaliacoes: 112,
    preco: 160,
    slug: toSlug("Fernanda Costa"),
    bio: "Apaixonada por nutrição materno-infantil. Acompanho gestantes, lactantes e bebês na introdução alimentar, sempre com um olhar acolhedor e baseado em evidências.",
    formacao: "Nutrição",
    universidade: "UERJ — Universidade do Estado do Rio de Janeiro",
    experienciaAnos: 10,
    atendimentos: 1200,
    idiomas: ["Português", "Inglês"],
    membroDesde: 2020,
    avaliacoesDetalhadas: [
      {
        iniciais: "C.L.",
        nota: 5,
        texto:
          "Me ajudou muito na introdução alimentar do meu bebê. Recomendo demais!",
        tempo: "há 1 semana",
      },
      {
        iniciais: "B.P.",
        nota: 5,
        texto:
          "Atendimento online super prático. A Fernanda é muito querida e competente.",
        tempo: "há 3 semanas",
      },
      {
        iniciais: "D.M.",
        nota: 4,
        texto:
          "Boa profissional, me deu muita segurança durante a gestação.",
        tempo: "há 1 mês",
      },
    ],
  },
};
