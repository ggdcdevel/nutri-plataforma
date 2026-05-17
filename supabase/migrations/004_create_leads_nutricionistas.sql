-- Tabela de leads de nutricionistas para lista de espera
CREATE TABLE IF NOT EXISTS public.leads_nutricionistas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  crn text NOT NULL,
  cidade text NOT NULL,
  modalidade text NOT NULL,
  especialidades text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'aguardando',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- RLS: leitura bloqueada publicamente, insert liberado
ALTER TABLE public.leads_nutricionistas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leads_insert_public" ON public.leads_nutricionistas
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
