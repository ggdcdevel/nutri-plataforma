-- 009_seed_whatsapp.sql
-- Popula o campo whatsapp nos 30 nutricionistas do seed
-- Formato: só dígitos sem +55, ex: 11987650001
-- A AgendamentoModal já prepend "55" ao montar o link do WhatsApp

-- DDDs por cidade:
-- São Paulo (SP): 11  |  Campinas (SP): 19  |  Rio de Janeiro (RJ): 21
-- Belo Horizonte (MG): 31  |  Brasília (DF): 61  |  Curitiba (PR): 41
-- Porto Alegre (RS): 51  |  Florianópolis (SC): 48  |  Recife (PE): 81
-- Salvador (BA): 71  |  Fortaleza (CE): 85  |  Goiânia (GO): 62
-- Natal (RN): 84  |  Manaus (AM): 92

-- 001 — Ana Beatriz Moura | São Paulo (11)
UPDATE public.nutricionistas SET whatsapp = '11987650001' WHERE slug = 'ana-beatriz-moura';

-- 002 — Carlos Eduardo Lima | Campinas (19)
UPDATE public.nutricionistas SET whatsapp = '19987650002' WHERE slug = 'carlos-eduardo-lima';

-- 003 — Fernanda Costa | Rio de Janeiro (21)
UPDATE public.nutricionistas SET whatsapp = '21987650003' WHERE slug = 'fernanda-costa';

-- 004 — Rafael Mendes | São Paulo (11)
UPDATE public.nutricionistas SET whatsapp = '11987650004' WHERE slug = 'rafael-mendes';

-- 005 — Juliana Pires | Belo Horizonte (31)
UPDATE public.nutricionistas SET whatsapp = '31987650005' WHERE slug = 'juliana-pires';

-- 006 — Marcos Alves | São Paulo (11)
UPDATE public.nutricionistas SET whatsapp = '11987650006' WHERE slug = 'marcos-alves';

-- 007 — Beatriz Oliveira Santos | Porto Alegre (51)
UPDATE public.nutricionistas SET whatsapp = '51987650007' WHERE slug = 'beatriz-oliveira-santos';

-- 008 — Diego Ferreira Costa | Curitiba (41)
UPDATE public.nutricionistas SET whatsapp = '41987650008' WHERE slug = 'diego-ferreira-costa';

-- 009 — Camila Rodrigues Almeida | Brasília (61)
UPDATE public.nutricionistas SET whatsapp = '61987650009' WHERE slug = 'camila-rodrigues-almeida';

-- 010 — Luísa Mendonça Ferraz | Florianópolis (48)
UPDATE public.nutricionistas SET whatsapp = '48987650010' WHERE slug = 'luisa-mendonca-ferraz';

-- 011 — Paulo Henrique Gomes | Belo Horizonte (31)
UPDATE public.nutricionistas SET whatsapp = '31987650011' WHERE slug = 'paulo-henrique-gomes';

-- 012 — Tatiana Borges Lima | Recife (81)
UPDATE public.nutricionistas SET whatsapp = '81987650012' WHERE slug = 'tatiana-borges-lima';

-- 013 — André Lopes Pereira | São Paulo (11)
UPDATE public.nutricionistas SET whatsapp = '11987650013' WHERE slug = 'andre-lopes-pereira';

-- 014 — Renata Souza Braga | Rio de Janeiro (21)
UPDATE public.nutricionistas SET whatsapp = '21987650014' WHERE slug = 'renata-souza-braga';

-- 015 — Guilherme Faria Neto | Campinas (19)
UPDATE public.nutricionistas SET whatsapp = '19987650015' WHERE slug = 'guilherme-faria-neto';

-- 016 — Patrícia Lima Costa | Salvador (71)
UPDATE public.nutricionistas SET whatsapp = '71987650016' WHERE slug = 'patricia-lima-costa';

-- 017 — Rodrigo Barros Vieira | São Paulo (11)
UPDATE public.nutricionistas SET whatsapp = '11987650017' WHERE slug = 'rodrigo-barros-vieira';

-- 018 — Amanda Cunha Silveira | Fortaleza (85)
UPDATE public.nutricionistas SET whatsapp = '85987650018' WHERE slug = 'amanda-cunha-silveira';

-- 019 — Leonardo Cardoso Melo | Porto Alegre (51)
UPDATE public.nutricionistas SET whatsapp = '51987650019' WHERE slug = 'leonardo-cardoso-melo';

-- 020 — Isabela Freitas Duarte | São Paulo (11)
UPDATE public.nutricionistas SET whatsapp = '11987650020' WHERE slug = 'isabela-freitas-duarte';

-- 021 — Thiago Nascimento Cruz | Goiânia (62)
UPDATE public.nutricionistas SET whatsapp = '62987650021' WHERE slug = 'thiago-nascimento-cruz';

-- 022 — Vanessa Martins Ribeiro | Belo Horizonte (31)
UPDATE public.nutricionistas SET whatsapp = '31987650022' WHERE slug = 'vanessa-martins-ribeiro';

-- 023 — Felipe Araújo Dias | Curitiba (41)
UPDATE public.nutricionistas SET whatsapp = '41987650023' WHERE slug = 'felipe-araujo-dias';

-- 024 — Mariana Vieira Campos | Rio de Janeiro (21)
UPDATE public.nutricionistas SET whatsapp = '21987650024' WHERE slug = 'mariana-vieira-campos';

-- 025 — Henrique Santana Oliveira | Salvador (71)
UPDATE public.nutricionistas SET whatsapp = '71987650025' WHERE slug = 'henrique-santana-oliveira';

-- 026 — Carolina Dias Nunes | Florianópolis (48)
UPDATE public.nutricionistas SET whatsapp = '48987650026' WHERE slug = 'carolina-dias-nunes';

-- 027 — Bruno Carvalho Assis | São Paulo (11)
UPDATE public.nutricionistas SET whatsapp = '11987650027' WHERE slug = 'bruno-carvalho-assis';

-- 028 — Aline Rocha Bezerra | Natal (84)
UPDATE public.nutricionistas SET whatsapp = '84987650028' WHERE slug = 'aline-rocha-bezerra';

-- 029 — Sandro Teixeira Moraes | Manaus (92)
UPDATE public.nutricionistas SET whatsapp = '92987650029' WHERE slug = 'sandro-teixeira-moraes';

-- 030 — Luciana Pinto Azevedo | Brasília (61)
UPDATE public.nutricionistas SET whatsapp = '61987650030' WHERE slug = 'luciana-pinto-azevedo';
