-- Tabela de pacientes vinculada ao Supabase Auth
CREATE TABLE IF NOT EXISTS public.pacientes (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nome text,
  email text,
  avatar_url text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- RLS: cada paciente só lê e edita o próprio registro
ALTER TABLE public.pacientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pacientes_select_own" ON public.pacientes
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "pacientes_update_own" ON public.pacientes
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Trigger: cria automaticamente o registro em pacientes quando um usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.pacientes (id, nome, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
