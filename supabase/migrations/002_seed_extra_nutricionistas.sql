-- Seed adicional: 24 nutricionistas para testes com massa maior
INSERT INTO public.nutricionistas (
  nome, crn, cidade, modalidade, especialidades,
  nota, avaliacoes, preco, slug,
  bio, formacao, universidade, experiencia_anos, atendimentos,
  idiomas, membro_desde, avaliacoes_detalhadas
) VALUES

-- 7. Beatriz Oliveira Santos | Emagrecimento + Saúde intestinal | Online | Porto Alegre
(
  'Beatriz Oliveira Santos',
  'CRN-2 14302',
  'Porto Alegre',
  'Online',
  ARRAY['Emagrecimento', 'Saúde intestinal', 'Nutrição funcional'],
  4.8, 73, 175, 'beatriz-oliveira-santos',
  'Acredito que emagrecimento de verdade começa pelo intestino. Trabalho com uma abordagem funcional que une reeducação alimentar e cuidado com a microbiota, de forma personalizada e sustentável.',
  'Nutrição',
  'UFRGS — Universidade Federal do Rio Grande do Sul',
  7, 680,
  ARRAY['Português'],
  2022,
  '[
    {"iniciais": "S.P.", "nota": 5, "texto": "Perdi 6kg e minha digestão melhorou completamente. Nunca imaginei que eram tão ligadas.", "tempo": "há 1 semana"},
    {"iniciais": "L.M.", "nota": 5, "texto": "Atendimento online muito bem estruturado. Ela acompanha de perto cada semana.", "tempo": "há 3 semanas"},
    {"iniciais": "G.T.", "nota": 4, "texto": "Muito competente. O plano foi desafiador no início mas valeu muito.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 8. Diego Ferreira Costa | Nutrição esportiva | Presencial | Curitiba
(
  'Diego Ferreira Costa',
  'CRN-8 09241',
  'Curitiba',
  'Presencial',
  ARRAY['Nutrição esportiva', 'Alto desempenho', 'Suplementação'],
  4.9, 115, 270, 'diego-ferreira-costa',
  'Especialista em nutrição esportiva para atletas amadores e de alto rendimento. Trabalho com periodização nutricional integrada ao treino, garantindo máxima performance e recuperação.',
  'Nutrição Esportiva',
  'UFPR — Universidade Federal do Paraná',
  11, 920,
  ARRAY['Português', 'Inglês', 'Espanhol'],
  2020,
  '[
    {"iniciais": "M.A.", "nota": 5, "texto": "Minha performance no crossfit melhorou muito em 2 meses de acompanhamento.", "tempo": "há 2 semanas"},
    {"iniciais": "T.F.", "nota": 5, "texto": "O melhor nutricionista esportivo que já tive. Muito técnico e atualizado.", "tempo": "há 1 mês"},
    {"iniciais": "R.V.", "nota": 5, "texto": "Quebrei meu recorde pessoal na maratona depois de seguir o plano dele.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 9. Camila Rodrigues Almeida | Diabetes + Hipertensão | Online | Brasília
(
  'Camila Rodrigues Almeida',
  'CRN-1 06718',
  'Brasília',
  'Online',
  ARRAY['Diabetes', 'Hipertensão', 'Nutrição clínica'],
  4.7, 88, 190, 'camila-rodrigues-almeida',
  'Nutricionista clínica especializada em síndrome metabólica e doenças cardiovasculares. Ofereço atendimento online com planos alimentares individualizados, baseados em evidências e adaptados à rotina real de cada paciente.',
  'Nutrição Clínica',
  'UnB — Universidade de Brasília',
  9, 750,
  ARRAY['Português'],
  2021,
  '[
    {"iniciais": "O.B.", "nota": 5, "texto": "Minha hemoglobina glicada caiu muito com o acompanhamento dela. Excelente!", "tempo": "há 3 semanas"},
    {"iniciais": "N.C.", "nota": 5, "texto": "Muito didática. Aprendi a comer de forma inteligente para controlar a pressão.", "tempo": "há 1 mês"},
    {"iniciais": "E.S.", "nota": 4, "texto": "Bom atendimento online, bastante atenciosa com as dúvidas.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 10. Luísa Mendonça Ferraz | Vegetarianismo + Veganismo | Online | Florianópolis
(
  'Luísa Mendonça Ferraz',
  'CRN-4 11532',
  'Florianópolis',
  'Online',
  ARRAY['Vegetarianismo', 'Saúde intestinal', 'Nutrição funcional'],
  5.0, 46, 185, 'luisa-mendonca-ferraz',
  'Sou vegana há 10 anos e nutricionista há 7. Minha missão é mostrar que dietas plant-based são nutritivamente completas e deliciosas. Atendo pessoas em transição para o vegetarianismo ou veganismo, garantindo toda a segurança nutricional.',
  'Nutrição',
  'UFSC — Universidade Federal de Santa Catarina',
  7, 490,
  ARRAY['Português', 'Inglês'],
  2022,
  '[
    {"iniciais": "A.D.", "nota": 5, "texto": "A Luísa me ajudou a fazer a transição para o veganismo sem nenhuma deficiência. Incrível!", "tempo": "há 1 semana"},
    {"iniciais": "C.K.", "nota": 5, "texto": "Super atenciosa e com um conhecimento imenso sobre alimentação plant-based.", "tempo": "há 2 semanas"},
    {"iniciais": "F.O.", "nota": 5, "texto": "Recomendo 1000%. Ela muda a vida das pessoas!", "tempo": "há 1 mês"}
  ]'::jsonb
),

-- 11. Paulo Henrique Gomes | Emagrecimento + Comportamento alimentar | Presencial | BH
(
  'Paulo Henrique Gomes',
  'CRN-4 17890',
  'Belo Horizonte',
  'Presencial',
  ARRAY['Emagrecimento', 'Nutrição clínica'],
  4.5, 42, 155, 'paulo-henrique-gomes',
  'Atendo pacientes que buscam emagrecimento com saúde, sem dietas restritivas e sem sofrimento. Minha abordagem é prática, focada em mudanças graduais que se encaixam na vida real.',
  'Nutrição',
  'UFMG — Universidade Federal de Minas Gerais',
  5, 360,
  ARRAY['Português'],
  2023,
  '[
    {"iniciais": "J.C.", "nota": 5, "texto": "Finalmente um nutricionista que não manda comer só frango e brócolis!", "tempo": "há 2 semanas"},
    {"iniciais": "M.L.", "nota": 4, "texto": "Muito bom profissional. Cumpri o plano sem passar fome.", "tempo": "há 1 mês"},
    {"iniciais": "T.B.", "nota": 4, "texto": "Boa experiência, consultório bem estruturado e profissional dedicado.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 12. Tatiana Borges Lima | Materno-infantil + Amamentação | Online | Recife
(
  'Tatiana Borges Lima',
  'CRN-5 08341',
  'Recife',
  'Online',
  ARRAY['Nutrição materno-infantil', 'Amamentação', 'Emagrecimento'],
  4.8, 97, 165, 'tatiana-borges-lima',
  'Especialista em nutrição da mulher: da gestação ao pós-parto. Acompanho gestantes, puérperas e mães que desejam emagrecer com segurança durante a amamentação. Cada fase tem sua nutrição ideal.',
  'Nutrição Materno-Infantil',
  'UFPE — Universidade Federal de Pernambuco',
  8, 830,
  ARRAY['Português'],
  2021,
  '[
    {"iniciais": "P.R.", "nota": 5, "texto": "Me ajudou durante toda a gestação e no pós-parto. Apoio essencial!", "tempo": "há 1 semana"},
    {"iniciais": "R.A.", "nota": 5, "texto": "Consegui emagrecer sem parar de amamentar, com total segurança.", "tempo": "há 3 semanas"},
    {"iniciais": "Y.M.", "nota": 5, "texto": "Tatiana é muito cuidadosa e acolhedora. Recomendo para todas as mães!", "tempo": "há 1 mês"}
  ]'::jsonb
),

-- 13. André Lopes Pereira | Oncologia | Presencial | São Paulo
(
  'André Lopes Pereira',
  'CRN-3 25601',
  'São Paulo',
  'Presencial',
  ARRAY['Oncologia', 'Nutrição clínica', 'Cuidados paliativos'],
  4.9, 78, 280, 'andre-lopes-pereira',
  'Nutricionista oncológico com 13 anos de experiência em hospitais e clínicas de referência. Acompanho pacientes em todas as fases do tratamento oncológico, com foco em manutenção de peso, força e qualidade de vida.',
  'Nutrição Oncológica',
  'USP — Universidade de São Paulo',
  13, 1050,
  ARRAY['Português', 'Inglês'],
  2019,
  '[
    {"iniciais": "S.N.", "nota": 5, "texto": "O acompanhamento do André foi fundamental durante a quimioterapia da minha esposa.", "tempo": "há 2 semanas"},
    {"iniciais": "F.C.", "nota": 5, "texto": "Profissional excepcional. Humano, competente e sempre disponível.", "tempo": "há 1 mês"},
    {"iniciais": "K.P.", "nota": 5, "texto": "Mudou completamente a forma como lidamos com a alimentação durante o tratamento.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 14. Renata Souza Braga | Saúde intestinal | Online | Rio de Janeiro
(
  'Renata Souza Braga',
  'CRN-2 13047',
  'Rio de Janeiro',
  'Online',
  ARRAY['Saúde intestinal', 'Vegetarianismo', 'Nutrição funcional'],
  4.6, 59, 195, 'renata-souza-braga',
  'Nutricionista funcional com foco no eixo intestino-cérebro. Trabalho com protocolos de modulação da microbiota para tratar desde síndrome do intestino irritável até questões de ansiedade e imunidade.',
  'Nutrição Funcional e Integrativa',
  'UFF — Universidade Federal Fluminense',
  8, 560,
  ARRAY['Português'],
  2022,
  '[
    {"iniciais": "B.O.", "nota": 5, "texto": "Minha síndrome do intestino irritável melhorou absurdamente. Gratidão!", "tempo": "há 1 semana"},
    {"iniciais": "L.K.", "nota": 5, "texto": "Muito conhecimento em microbiota. Aprendi coisas que nenhum médico tinha me explicado.", "tempo": "há 1 mês"},
    {"iniciais": "A.W.", "nota": 4, "texto": "Boa profissional, o protocolo é rigoroso mas os resultados aparecem.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 15. Guilherme Faria Neto | Nutrição esportiva | Presencial | Campinas
(
  'Guilherme Faria Neto',
  'CRN-3 20188',
  'Campinas',
  'Presencial',
  ARRAY['Nutrição esportiva', 'Suplementação', 'Emagrecimento'],
  4.4, 31, 240, 'guilherme-faria-neto',
  'Atendo atletas e praticantes de musculação que buscam ganho de massa muscular ou definição. Elaboro planos com periodização nutricional e protocolos de suplementação baseados em ciência.',
  'Nutrição Esportiva',
  'UNICAMP — Universidade Estadual de Campinas',
  6, 310,
  ARRAY['Português'],
  2023,
  '[
    {"iniciais": "V.L.", "nota": 5, "texto": "Ganhei 4kg de massa muscular em 3 meses seguindo o plano dele. Incrível!", "tempo": "há 3 semanas"},
    {"iniciais": "H.S.", "nota": 4, "texto": "Bom profissional. As orientações sobre suplementação foram muito claras.", "tempo": "há 1 mês"},
    {"iniciais": "D.R.", "nota": 4, "texto": "Competente, mas agenda lotada e às vezes demora para responder.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 16. Patrícia Lima Costa | Emagrecimento + Diabetes | Online | Salvador
(
  'Patrícia Lima Costa',
  'CRN-5 10293',
  'Salvador',
  'Online',
  ARRAY['Emagrecimento', 'Diabetes', 'Saúde intestinal'],
  4.7, 66, 170, 'patricia-lima-costa',
  'Trabalho com pacientes que têm resistência à insulina ou diabetes tipo 2 e desejam emagrecer com segurança. Minha abordagem equilibra controle glicêmico e prazer alimentar, sem dietas extremas.',
  'Nutrição Clínica',
  'UFBA — Universidade Federal da Bahia',
  8, 590,
  ARRAY['Português'],
  2021,
  '[
    {"iniciais": "C.A.", "nota": 5, "texto": "Consegui reduzir a metformina com o acompanhamento dela. Resultado incrível.", "tempo": "há 2 semanas"},
    {"iniciais": "I.F.", "nota": 5, "texto": "Muito atenciosa e faz um plano que realmente dá pra seguir na vida real.", "tempo": "há 1 mês"},
    {"iniciais": "W.B.", "nota": 4, "texto": "Ótima profissional, o atendimento online funciona muito bem.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 17. Rodrigo Barros Vieira | Vegetarianismo + Saúde intestinal | Online | São Paulo
(
  'Rodrigo Barros Vieira',
  'CRN-3 18742',
  'São Paulo',
  'Online',
  ARRAY['Vegetarianismo', 'Saúde intestinal', 'Nutrição esportiva'],
  4.3, 24, 160, 'rodrigo-barros-vieira',
  'Vegetariano há 12 anos, nutricionista há 6. Especialista em conciliar dietas plant-based com performance esportiva e saúde digestiva. Atendo online atletas e praticantes de atividade física que adotam ou consideram o vegetarianismo.',
  'Nutrição',
  'USP — Universidade de São Paulo',
  6, 290,
  ARRAY['Português', 'Inglês'],
  2023,
  '[
    {"iniciais": "E.M.", "nota": 5, "texto": "Me ajudou a manter o rendimento no esporte sendo vegetariano. Top!", "tempo": "há 2 semanas"},
    {"iniciais": "B.N.", "nota": 4, "texto": "Muito conhecimento sobre proteína vegetal. Recomendo!", "tempo": "há 1 mês"},
    {"iniciais": "J.H.", "nota": 4, "texto": "Bom profissional, às vezes demora para responder mas o conteúdo é ótimo.", "tempo": "há 3 meses"}
  ]'::jsonb
),

-- 18. Amanda Cunha Silveira | Materno-infantil | Presencial | Fortaleza
(
  'Amanda Cunha Silveira',
  'CRN-3 22847',
  'Fortaleza',
  'Presencial',
  ARRAY['Nutrição materno-infantil', 'Amamentação', 'Introdução alimentar'],
  4.9, 103, 150, 'amanda-cunha-silveira',
  'Apaixonada pelo universo da nutrição infantil. Acompanho bebês desde a introdução alimentar até os 5 anos, além de gestantes e lactantes. Minha abordagem é acolhedora, prática e sempre baseada em evidências.',
  'Nutrição Pediátrica',
  'UFC — Universidade Federal do Ceará',
  9, 870,
  ARRAY['Português'],
  2020,
  '[
    {"iniciais": "T.L.", "nota": 5, "texto": "A Amanda é maravilhosa! Meu filho aceitou todos os alimentos na introdução.", "tempo": "há 1 semana"},
    {"iniciais": "R.C.", "nota": 5, "texto": "Muito atenciosa e paciente com as dúvidas de mãe de primeira viagem.", "tempo": "há 2 semanas"},
    {"iniciais": "G.S.", "nota": 5, "texto": "Consultório incrível, ela coloca as crianças completamente à vontade.", "tempo": "há 1 mês"}
  ]'::jsonb
),

-- 19. Leonardo Cardoso Melo | Nutrição esportiva | Online | Porto Alegre
(
  'Leonardo Cardoso Melo',
  'CRN-2 15921',
  'Porto Alegre',
  'Online',
  ARRAY['Nutrição esportiva', 'Alto desempenho', 'Emagrecimento'],
  4.6, 51, 210, 'leonardo-cardoso-melo',
  'Trabalho com atletas de endurance — corredores, triatletas e ciclistas — que buscam otimizar a nutrição para competição e recuperação. Atendo online com acompanhamento frequente e planos que evoluem junto com a periodização do treino.',
  'Nutrição Esportiva',
  'UFRGS — Universidade Federal do Rio Grande do Sul',
  7, 470,
  ARRAY['Português', 'Inglês'],
  2022,
  '[
    {"iniciais": "P.M.", "nota": 5, "texto": "Completei meu primeiro Ironman com um plano nutricional impecável do Leo.", "tempo": "há 3 semanas"},
    {"iniciais": "A.S.", "nota": 5, "texto": "Melhorei muito meu pace na meia maratona após 2 meses de acompanhamento.", "tempo": "há 1 mês"},
    {"iniciais": "C.V.", "nota": 4, "texto": "Muito bom, mas às vezes o plano muda muito rápido para acompanhar.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 20. Isabela Freitas Duarte | Emagrecimento | Online | São Paulo
(
  'Isabela Freitas Duarte',
  'CRN-3 29034',
  'São Paulo',
  'Online',
  ARRAY['Emagrecimento', 'Nutrição clínica', 'Saúde intestinal'],
  4.8, 134, 145, 'isabela-freitas-duarte',
  'Ajudo mulheres a emagrecer de forma definitiva, sem contar calorias e sem abrir mão do prazer alimentar. Minha abordagem une ciência da nutrição com psicologia do comportamento alimentar para resultados que duram.',
  'Nutrição',
  'UNIFESP — Universidade Federal de São Paulo',
  6, 1100,
  ARRAY['Português'],
  2022,
  '[
    {"iniciais": "M.R.", "nota": 5, "texto": "Perdi 12kg em 5 meses sem sofrimento. Aprendi a comer de novo!", "tempo": "há 1 semana"},
    {"iniciais": "K.A.", "nota": 5, "texto": "A Isabela muda sua relação com a comida de uma forma muito natural.", "tempo": "há 2 semanas"},
    {"iniciais": "L.G.", "nota": 5, "texto": "Melhor investimento que já fiz na minha saúde. Recomendo demais!", "tempo": "há 1 mês"}
  ]'::jsonb
),

-- 21. Thiago Nascimento Cruz | Diabetes + Saúde intestinal | Presencial | Goiânia
(
  'Thiago Nascimento Cruz',
  'CRN-9 07143',
  'Goiânia',
  'Presencial',
  ARRAY['Diabetes', 'Saúde intestinal', 'Nutrição clínica'],
  4.5, 38, 180, 'thiago-nascimento-cruz',
  'Especialista em modulação da microbiota para controle de doenças metabólicas, com foco em diabetes tipo 2 e resistência insulínica. Utilizo exames funcionais para personalizar cada plano alimentar.',
  'Nutrição Funcional',
  'UFG — Universidade Federal de Goiás',
  7, 380,
  ARRAY['Português'],
  2022,
  '[
    {"iniciais": "D.A.", "nota": 5, "texto": "Meu médico ficou impressionado com a melhora nos exames em apenas 3 meses.", "tempo": "há 2 semanas"},
    {"iniciais": "S.F.", "nota": 4, "texto": "Muito conhecimento sobre microbiota. Atendimento muito completo.", "tempo": "há 1 mês"},
    {"iniciais": "N.B.", "nota": 4, "texto": "Bom profissional, consultório bem localizado em Goiânia.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 22. Vanessa Martins Ribeiro | Oncologia | Online | Belo Horizonte
(
  'Vanessa Martins Ribeiro',
  'CRN-4 09865',
  'Belo Horizonte',
  'Online',
  ARRAY['Oncologia', 'Saúde intestinal', 'Nutrição clínica'],
  4.7, 55, 260, 'vanessa-martins-ribeiro',
  'Atendo pacientes oncológicos de forma remota, oferecendo suporte nutricional em todas as fases do tratamento. Tenho pós-graduação em oncologia e experiência em casos de alta complexidade, sempre com escuta ativa e compaixão.',
  'Nutrição Oncológica',
  'PUC Minas — Pontifícia Universidade Católica de Minas Gerais',
  10, 620,
  ARRAY['Português'],
  2021,
  '[
    {"iniciais": "F.L.", "nota": 5, "texto": "A Vanessa foi um presente durante o tratamento da minha mãe. Sensacional.", "tempo": "há 3 semanas"},
    {"iniciais": "C.T.", "nota": 5, "texto": "Muito humana e competente. O atendimento online facilitou muito.", "tempo": "há 1 mês"},
    {"iniciais": "H.M.", "nota": 4, "texto": "Ótima profissional, muito atenciosa com as especificidades de cada tratamento.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 23. Felipe Araújo Dias | Nutrição esportiva + Vegetarianismo | Online | Curitiba
(
  'Felipe Araújo Dias',
  'CRN-8 12034',
  'Curitiba',
  'Online',
  ARRAY['Nutrição esportiva', 'Vegetarianismo', 'Alto desempenho'],
  4.8, 47, 220, 'felipe-araujo-dias',
  'Atleta vegetariano e nutricionista esportivo. Especialista em mostrar que dietas plant-based podem e devem ser usadas por atletas de alto desempenho. Atendo online corredores, nadadores e praticantes de esportes coletivos.',
  'Nutrição Esportiva',
  'UFPR — Universidade Federal do Paraná',
  8, 430,
  ARRAY['Português', 'Inglês'],
  2021,
  '[
    {"iniciais": "O.S.", "nota": 5, "texto": "Provei que dá pra ser atleta vegetariano com muito mais saúde. Obrigado Felipe!", "tempo": "há 2 semanas"},
    {"iniciais": "Y.A.", "nota": 5, "texto": "Conhecimento técnico impressionante. Plano muito bem montado.", "tempo": "há 1 mês"},
    {"iniciais": "B.V.", "nota": 4, "texto": "Muito bom! Só acho que podia ter mais opções de receitas.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 24. Mariana Vieira Campos | Emagrecimento | Presencial | Rio de Janeiro
(
  'Mariana Vieira Campos',
  'CRN-2 17459',
  'Rio de Janeiro',
  'Presencial',
  ARRAY['Emagrecimento', 'Nutrição clínica', 'Diabetes'],
  4.1, 19, 130, 'mariana-vieira-campos',
  'Recém-formada e com muita energia para ajudar meus pacientes a transformar a relação com a comida. Atendo presencialmente no Rio de Janeiro com foco em emagrecimento saudável e prevenção de doenças crônicas.',
  'Nutrição',
  'UFRJ — Universidade Federal do Rio de Janeiro',
  2, 140,
  ARRAY['Português'],
  2024,
  '[
    {"iniciais": "A.N.", "nota": 5, "texto": "Muito atenciosa e dedicada. Já perdi 4kg no primeiro mês!", "tempo": "há 1 semana"},
    {"iniciais": "J.T.", "nota": 4, "texto": "Boa profissional, ainda está ganhando experiência mas tem muito potencial.", "tempo": "há 1 mês"},
    {"iniciais": "P.H.", "nota": 3, "texto": "Competente, mas ainda precisa de mais tempo de prática.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 25. Henrique Santana Oliveira | Nutrição clínica + Diabetes | Presencial | Salvador
(
  'Henrique Santana Oliveira',
  'CRN-5 13892',
  'Salvador',
  'Presencial',
  ARRAY['Nutrição clínica', 'Diabetes', 'Oncologia'],
  4.6, 71, 215, 'henrique-santana-oliveira',
  'Nutricionista clínico com experiência em ambiente hospitalar e ambulatorial. Atendo pacientes com diabetes, doenças renais e oncológicos, sempre com protocolos individualizados e acompanhamento próximo.',
  'Nutrição Clínica Hospitalar',
  'UFBA — Universidade Federal da Bahia',
  10, 780,
  ARRAY['Português'],
  2020,
  '[
    {"iniciais": "Z.P.", "nota": 5, "texto": "Meu rim agradece. Controle da dieta renal melhorou muito com o Henrique.", "tempo": "há 3 semanas"},
    {"iniciais": "W.C.", "nota": 5, "texto": "Muito experiente e sério. Atendimento de alto nível em Salvador.", "tempo": "há 1 mês"},
    {"iniciais": "Q.M.", "nota": 4, "texto": "Ótimo profissional, o consultório fica um pouco longe mas vale a pena.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 26. Carolina Dias Nunes | Vegetarianismo + Nutrição funcional | Online | Florianópolis
(
  'Carolina Dias Nunes',
  'CRN-4 20671',
  'Florianópolis',
  'Online',
  ARRAY['Vegetarianismo', 'Nutrição funcional', 'Saúde intestinal'],
  4.9, 82, 195, 'carolina-dias-nunes',
  'Nutricionista funcional especializada em dietas vegetarianas e veganas. Trabalho com um olhar integrativo, unindo alimentação, microbiota e estilo de vida para promover saúde de forma ampla e sustentável.',
  'Nutrição Funcional',
  'UFSC — Universidade Federal de Santa Catarina',
  9, 720,
  ARRAY['Português', 'Inglês'],
  2020,
  '[
    {"iniciais": "U.R.", "nota": 5, "texto": "A Carolina transformou minha saúde com uma abordagem totalmente diferente!", "tempo": "há 1 semana"},
    {"iniciais": "X.T.", "nota": 5, "texto": "Muito conhecimento em nutrição funcional. Recomendo para todos!", "tempo": "há 3 semanas"},
    {"iniciais": "V.D.", "nota": 5, "texto": "Incrível como a alimentação muda tudo quando é bem orientada. Gratidão!", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 27. Bruno Carvalho Assis | Nutrição esportiva | Presencial | São Paulo
(
  'Bruno Carvalho Assis',
  'CRN-3 31205',
  'São Paulo',
  'Presencial',
  ARRAY['Nutrição esportiva', 'Suplementação', 'Alto desempenho'],
  4.2, 27, 245, 'bruno-carvalho-assis',
  'Especialista em musculação e fisiculturismo. Trabalho com atletas de bodybuilding e powerlifting, desenvolvendo protocolos de bulk e cutting com uso racional de suplementação.',
  'Nutrição Esportiva',
  'UNIFESP — Universidade Federal de São Paulo',
  5, 260,
  ARRAY['Português'],
  2023,
  '[
    {"iniciais": "T.N.", "nota": 5, "texto": "Meu bulk foi o melhor da minha vida com a orientação do Bruno. Top!", "tempo": "há 2 semanas"},
    {"iniciais": "E.G.", "nota": 4, "texto": "Muito conhecimento em suplementação. Fui bem orientado.", "tempo": "há 1 mês"},
    {"iniciais": "I.O.", "nota": 3, "texto": "Bom profissional mas os planos são muito focados em fisiculturismo.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 28. Aline Rocha Bezerra | Materno-infantil + Diabetes gestacional | Online | Natal
(
  'Aline Rocha Bezerra',
  'CRN-5 09517',
  'Natal',
  'Online',
  ARRAY['Nutrição materno-infantil', 'Diabetes', 'Amamentação'],
  4.7, 64, 155, 'aline-rocha-bezerra',
  'Especialista em diabetes gestacional e nutrição na gravidez de risco. Acompanho gestantes com hiperglicemia, hipertensão e outras complicações, garantindo segurança para mãe e bebê durante toda a gestação.',
  'Nutrição Materno-Infantil',
  'UFRN — Universidade Federal do Rio Grande do Norte',
  8, 610,
  ARRAY['Português'],
  2021,
  '[
    {"iniciais": "J.B.", "nota": 5, "texto": "Com diabetes gestacional, a Aline foi essencial para minha gravidez saudável.", "tempo": "há 1 semana"},
    {"iniciais": "M.F.", "nota": 5, "texto": "Muito atenciosa e sempre responde rápido. Recomendo para gestantes!", "tempo": "há 1 mês"},
    {"iniciais": "G.A.", "nota": 4, "texto": "Ótima profissional. O plano foi difícil mas o resultado compensou.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 29. Sandro Teixeira Moraes | Emagrecimento + Comportamento alimentar | Presencial | Manaus
(
  'Sandro Teixeira Moraes',
  'CRN-1 08234',
  'Manaus',
  'Presencial',
  ARRAY['Emagrecimento', 'Nutrição clínica'],
  4.5, 33, 140, 'sandro-teixeira-moraes',
  'Único nutricionista da região com especialização em comportamento alimentar e transtornos alimentares. Atendo em Manaus pacientes com compulsão, restrição e dificuldade de manter uma alimentação equilibrada.',
  'Nutrição e Comportamento Alimentar',
  'UFAM — Universidade Federal do Amazonas',
  7, 340,
  ARRAY['Português'],
  2022,
  '[
    {"iniciais": "L.T.", "nota": 5, "texto": "Sandro me ajudou a superar uma relação muito difícil com a comida. Obrigada!", "tempo": "há 3 semanas"},
    {"iniciais": "C.E.", "nota": 4, "texto": "Muito bom profissional. Em Manaus é difícil achar esse nível de especialização.", "tempo": "há 1 mês"},
    {"iniciais": "R.P.", "nota": 4, "texto": "Atendimento humanizado e muito competente.", "tempo": "há 2 meses"}
  ]'::jsonb
),

-- 30. Luciana Pinto Azevedo | Saúde intestinal + Oncologia | Online | Brasília
(
  'Luciana Pinto Azevedo',
  'CRN-1 11782',
  'Brasília',
  'Online',
  ARRAY['Saúde intestinal', 'Oncologia', 'Nutrição funcional'],
  4.8, 91, 235, 'luciana-pinto-azevedo',
  'Nutricionista funcional e oncológica. Minha especialidade é o cuidado com a microbiota intestinal em pacientes oncológicos, onde uma microbiota equilibrada pode influenciar diretamente a resposta ao tratamento e a qualidade de vida.',
  'Nutrição Oncológica e Funcional',
  'UnB — Universidade de Brasília',
  11, 810,
  ARRAY['Português', 'Inglês'],
  2020,
  '[
    {"iniciais": "N.H.", "nota": 5, "texto": "A Luciana combina duas áreas que raramente se veem juntas. Excelente!", "tempo": "há 2 semanas"},
    {"iniciais": "O.K.", "nota": 5, "texto": "Me deu esperança e resultados concretos durante o tratamento.", "tempo": "há 1 mês"},
    {"iniciais": "A.Z.", "nota": 5, "texto": "Abordagem única e muito eficaz. Muito grata pelo acompanhamento.", "tempo": "há 2 meses"}
  ]'::jsonb
);
