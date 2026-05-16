import type { Nutricionista } from "@/components/nutricionistas/nutricionista-card";

function toSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export const nutricionistas: Nutricionista[] = [
  {
    nome: "Ana Beatriz Moura",
    crn: "CRN-3 12547",
    modalidade: "Online",
    cidade: "São Paulo",
    especialidades: ["Emagrecimento", "Nutrição esportiva"],
    nota: 4.9,
    avaliacoes: 87,
    preco: 180,
    slug: toSlug("Ana Beatriz Moura"),
  },
  {
    nome: "Carlos Eduardo Lima",
    crn: "CRN-3 08931",
    modalidade: "Presencial",
    cidade: "Campinas",
    especialidades: ["Nutrição clínica", "Diabetes"],
    nota: 4.7,
    avaliacoes: 54,
    preco: 220,
    slug: toSlug("Carlos Eduardo Lima"),
  },
  {
    nome: "Fernanda Costa",
    crn: "CRN-2 05412",
    modalidade: "Online",
    cidade: "Rio de Janeiro",
    especialidades: ["Nutrição materno-infantil", "Amamentação"],
    nota: 4.8,
    avaliacoes: 112,
    preco: 160,
    slug: toSlug("Fernanda Costa"),
  },
  {
    nome: "Rafael Mendes",
    crn: "CRN-3 19084",
    modalidade: "Presencial",
    cidade: "São Paulo",
    especialidades: ["Alto desempenho", "Suplementação"],
    nota: 4.6,
    avaliacoes: 39,
    preco: 250,
    slug: toSlug("Rafael Mendes"),
  },
  {
    nome: "Juliana Pires",
    crn: "CRN-4 07763",
    modalidade: "Online",
    cidade: "Belo Horizonte",
    especialidades: ["Vegetarianismo", "Saúde intestinal"],
    nota: 5.0,
    avaliacoes: 28,
    preco: 200,
    slug: toSlug("Juliana Pires"),
  },
  {
    nome: "Marcos Alves",
    crn: "CRN-3 22110",
    modalidade: "Presencial",
    cidade: "São Paulo",
    especialidades: ["Nutrição clínica", "Oncologia"],
    nota: 4.8,
    avaliacoes: 61,
    preco: 230,
    slug: toSlug("Marcos Alves"),
  },
];
