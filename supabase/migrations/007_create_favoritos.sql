CREATE TABLE IF NOT EXISTS public.favoritos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  paciente_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  nutricionista_id uuid REFERENCES public.nutricionistas ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(paciente_id, nutricionista_id)
);

ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "favoritos_select_own" ON public.favoritos
  FOR SELECT TO authenticated
  USING (auth.uid() = paciente_id);

CREATE POLICY "favoritos_insert_own" ON public.favoritos
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = paciente_id);

CREATE POLICY "favoritos_delete_own" ON public.favoritos
  FOR DELETE TO authenticated
  USING (auth.uid() = paciente_id);
