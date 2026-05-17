-- Adiciona campo origem à tabela principal de nutricionistas
-- Marca os 30 registros de teste existentes como 'random_teste'
ALTER TABLE public.nutricionistas
  ADD COLUMN IF NOT EXISTS origem text NOT NULL DEFAULT 'random_teste';

UPDATE public.nutricionistas SET origem = 'random_teste';

-- Adiciona campo origem à tabela de leads
-- Permite rastrear de onde o lead veio (ex: instagram_ads, facebook_ads, organico, navbar)
ALTER TABLE public.leads_nutricionistas
  ADD COLUMN IF NOT EXISTS origem text NOT NULL DEFAULT 'direto';
