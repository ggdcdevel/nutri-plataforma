-- Cria tabela de nutricionistas
CREATE TABLE IF NOT EXISTS public.nutricionistas (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome            text NOT NULL,
  crn             text NOT NULL,
  cidade          text NOT NULL,
  modalidade      text NOT NULL CHECK (modalidade IN ('Online', 'Presencial')),
  especialidades  text[] NOT NULL DEFAULT '{}',
  nota            numeric(3, 1) NOT NULL,
  avaliacoes      integer NOT NULL DEFAULT 0,
  preco           integer NOT NULL,
  slug            text NOT NULL UNIQUE,
  bio             text,
  formacao        text,
  universidade    text,
  experiencia_anos integer,
  atendimentos    integer,
  idiomas         text[] NOT NULL DEFAULT '{"Português"}',
  membro_desde    integer,
  avaliacoes_detalhadas jsonb NOT NULL DEFAULT '[]',
  created_at      timestamptz DEFAULT now()
);

-- Habilita leitura pública (anon key)
ALTER TABLE public.nutricionistas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura pública de nutricionistas"
  ON public.nutricionistas
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed: 6 nutricionistas
INSERT INTO public.nutricionistas (
  nome, crn, cidade, modalidade, especialidades,
  nota, avaliacoes, preco, slug,
  bio, formacao, universidade, experiencia_anos, atendimentos,
  idiomas, membro_desde, avaliacoes_detalhadas
) VALUES
(
  'Ana Beatriz Moura',
  'CRN-3 12547',
  'São Paulo',
  'Online',
  ARRAY['Emagrecimento', 'Nutrição esportiva', 'Comportamento alimentar'],
  4.9, 87, 180, 'ana-beatriz-moura',
  'Especialista em comportamento alimentar e reeducação nutricional. Atuo há 8 anos com foco em emagrecimento sustentável e na melhora da relação com a comida. Acredito que a nutrição vai muito além de dietas — é sobre construir hábitos que cabem na sua vida real.',
  'Nutrição e Dietética',
  'USP — Universidade de São Paulo',
  8, 800,
  ARRAY['Português'],
  2022,
  '[
    {"iniciais": "M.S.", "nota": 5, "texto": "Mudou completamente minha relação com a comida. Super recomendo!", "tempo": "há 2 semanas"},
    {"iniciais": "L.R.", "nota": 5, "texto": "Profissional incrível, muito atenciosa e didática. Já perdi 8kg em 3 meses.", "tempo": "há 1 mês"},
    {"iniciais": "P.A.", "nota": 4, "texto": "Ótima profissional, consultas online muito práticas e objetivas.", "tempo": "há 2 meses"}
  ]'::jsonb
),
(
  'Carlos Eduardo Lima',
  'CRN-3 08931',
  'Campinas',
  'Presencial',
  ARRAY['Nutrição clínica', 'Diabetes', 'Hipertensão'],
  4.7, 54, 220, 'carlos-eduardo-lima',
  'Nutricionista clínico com foco em doenças crônicas como diabetes e hipertensão. Minha abordagem é baseada em evidências científicas e no acompanhamento individualizado de cada paciente.',
  'Nutrição',
  'UNICAMP — Universidade Estadual de Campinas',
  12, 650,
  ARRAY['Português'],
  2021,
  '[
    {"iniciais": "R.M.", "nota": 5, "texto": "Consegui controlar minha glicemia em poucos meses. Excelente profissional.", "tempo": "há 3 semanas"},
    {"iniciais": "A.F.", "nota": 5, "texto": "Muito atencioso e paciente. Explica tudo com clareza.", "tempo": "há 1 mês"},
    {"iniciais": "T.S.", "nota": 4, "texto": "Bom profissional, mas o consultório fica um pouco difícil de estacionar.", "tempo": "há 2 meses"}
  ]'::jsonb
),
(
  'Fernanda Costa',
  'CRN-2 05412',
  'Rio de Janeiro',
  'Online',
  ARRAY['Nutrição materno-infantil', 'Amamentação', 'Introdução alimentar'],
  4.8, 112, 160, 'fernanda-costa',
  'Apaixonada por nutrição materno-infantil. Acompanho gestantes, lactantes e bebês na introdução alimentar, sempre com um olhar acolhedor e baseado em evidências.',
  'Nutrição',
  'UERJ — Universidade do Estado do Rio de Janeiro',
  10, 1200,
  ARRAY['Português', 'Inglês'],
  2020,
  '[
    {"iniciais": "C.L.", "nota": 5, "texto": "Me ajudou muito na introdução alimentar do meu bebê. Recomendo demais!", "tempo": "há 1 semana"},
    {"iniciais": "B.P.", "nota": 5, "texto": "Atendimento online super prático. A Fernanda é muito querida e competente.", "tempo": "há 3 semanas"},
    {"iniciais": "D.M.", "nota": 4, "texto": "Boa profissional, me deu muita segurança durante a gestação.", "tempo": "há 1 mês"}
  ]'::jsonb
),
(
  'Rafael Mendes',
  'CRN-3 19084',
  'São Paulo',
  'Presencial',
  ARRAY['Alto desempenho', 'Suplementação', 'Nutrição esportiva'],
  4.6, 39, 250, 'rafael-mendes',
  'Especialista em nutrição para atletas e praticantes de atividade física de alto rendimento. Trabalho com periodização nutricional e estratégias de suplementação baseadas em ciência, sempre alinhadas ao objetivo e à rotina de cada atleta.',
  'Nutrição Esportiva',
  'UNIFESP — Universidade Federal de São Paulo',
  6, 420,
  ARRAY['Português', 'Inglês'],
  2023,
  '[
    {"iniciais": "G.O.", "nota": 5, "texto": "Melhorei muito minha performance nas corridas após seguir o plano do Rafael.", "tempo": "há 2 semanas"},
    {"iniciais": "F.N.", "nota": 5, "texto": "Muito técnico e atualizado. Explica o porquê de cada escolha nutricional.", "tempo": "há 1 mês"},
    {"iniciais": "H.B.", "nota": 4, "texto": "Ótimo profissional, mas os horários disponíveis são limitados.", "tempo": "há 2 meses"}
  ]'::jsonb
),
(
  'Juliana Pires',
  'CRN-4 07763',
  'Belo Horizonte',
  'Online',
  ARRAY['Vegetarianismo', 'Saúde intestinal', 'Nutrição funcional'],
  5.0, 28, 200, 'juliana-pires',
  'Nutricionista funcional com especialização em dietas plant-based e saúde do intestino. Acredito que um intestino saudável é a base de tudo — energia, imunidade e bem-estar. Atendo online com foco na personalização total do plano alimentar.',
  'Nutrição Funcional',
  'PUC Minas — Pontifícia Universidade Católica de Minas Gerais',
  5, 310,
  ARRAY['Português'],
  2023,
  '[
    {"iniciais": "V.S.", "nota": 5, "texto": "Minha digestão melhorou absurdamente em 2 meses. Incrível!", "tempo": "há 1 semana"},
    {"iniciais": "K.L.", "nota": 5, "texto": "Juliana é maravilhosa! Consegui ter uma dieta vegetariana equilibrada de verdade.", "tempo": "há 3 semanas"},
    {"iniciais": "M.C.", "nota": 5, "texto": "Super atenciosa e sempre disponível para tirar dúvidas. Recomendo!", "tempo": "há 1 mês"}
  ]'::jsonb
),
(
  'Marcos Alves',
  'CRN-3 22110',
  'São Paulo',
  'Presencial',
  ARRAY['Nutrição clínica', 'Oncologia', 'Cuidados paliativos'],
  4.8, 61, 230, 'marcos-alves',
  'Nutricionista clínico com pós-graduação em oncologia. Atendo pacientes em tratamento oncológico e em cuidados paliativos, com foco na manutenção da qualidade de vida e no suporte nutricional durante todas as fases do tratamento.',
  'Nutrição Clínica e Oncológica',
  'USP — Universidade de São Paulo',
  9, 540,
  ARRAY['Português'],
  2021,
  '[
    {"iniciais": "E.R.", "nota": 5, "texto": "O Marcos foi fundamental durante o meu tratamento. Muito humano e competente.", "tempo": "há 2 semanas"},
    {"iniciais": "C.M.", "nota": 5, "texto": "Profissional excepcional. Ajudou minha mãe a manter o peso durante a quimioterapia.", "tempo": "há 1 mês"},
    {"iniciais": "A.P.", "nota": 4, "texto": "Muito cuidadoso e atencioso. Faz uma diferença enorme no tratamento.", "tempo": "há 2 meses"}
  ]'::jsonb
);
