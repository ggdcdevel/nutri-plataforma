-- 008_leads_agendamento.sql
-- Adds whatsapp to nutricionistas and agendamento fields to leads_nutricionistas

-- WhatsApp do nutricionista (apenas dígitos, ex: 5511999999999)
ALTER TABLE public.nutricionistas
  ADD COLUMN IF NOT EXISTS whatsapp text;

-- Novos campos de agendamento em leads_nutricionistas
ALTER TABLE public.leads_nutricionistas
  ADD COLUMN IF NOT EXISTS nutricionista_id   uuid REFERENCES public.nutricionistas ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS nutricionista_email text,
  ADD COLUMN IF NOT EXISTS modalidade_escolhida text,
  ADD COLUMN IF NOT EXISTS objetivo            text,
  ADD COLUMN IF NOT EXISTS mensagem            text,
  ADD COLUMN IF NOT EXISTS paciente_id         uuid REFERENCES auth.users ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS paciente_email      text;
