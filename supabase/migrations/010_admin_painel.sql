-- 010_admin_painel.sql
-- Sistema de roles + painel admin

-- ─── 1. Coluna role em pacientes ─────────────────────────────────────────────
ALTER TABLE public.pacientes
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'paciente'
    CHECK (role IN ('paciente', 'nutricionista', 'admin'));

-- ─── 2. Colunas admin em nutricionistas ──────────────────────────────────────
ALTER TABLE public.nutricionistas
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'aprovado', 'bloqueado')),
  ADD COLUMN IF NOT EXISTS destaque boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS aprovado_em timestamptz;

-- Nutricionistas do seed já estão aprovados
UPDATE public.nutricionistas SET status = 'aprovado' WHERE status = 'pendente';

-- ─── 3. Tabela page_views ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.page_views (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nutricionista_id uuid REFERENCES public.nutricionistas ON DELETE SET NULL,
  pagina          text NOT NULL,
  origem          text,
  created_at      timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_views_insert_public"
  ON public.page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ─── 4. Função helper get_user_role() ────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text AS $$
  SELECT COALESCE(role, 'paciente')::text
  FROM public.pacientes
  WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ─── 5. RLS — admin pode tudo nas tabelas principais ─────────────────────────

-- nutricionistas: admin tem acesso total de escrita
CREATE POLICY "nutricionistas_admin_all"
  ON public.nutricionistas FOR ALL
  USING (public.get_user_role() = 'admin')
  WITH CHECK (public.get_user_role() = 'admin');

-- leads_nutricionistas: admin pode ler, atualizar e deletar
CREATE POLICY "leads_admin_all"
  ON public.leads_nutricionistas FOR ALL
  USING (public.get_user_role() = 'admin')
  WITH CHECK (public.get_user_role() = 'admin');

-- pacientes: admin pode ler e atualizar todos
CREATE POLICY "pacientes_admin_select"
  ON public.pacientes FOR SELECT
  USING (public.get_user_role() = 'admin');

CREATE POLICY "pacientes_admin_update"
  ON public.pacientes FOR UPDATE
  USING (public.get_user_role() = 'admin')
  WITH CHECK (public.get_user_role() = 'admin');

-- page_views: admin pode ler tudo
CREATE POLICY "page_views_admin_select"
  ON public.page_views FOR SELECT
  USING (public.get_user_role() = 'admin');

-- ─── 6. RPC: buscar usuário por e-mail ───────────────────────────────────────
CREATE OR REPLACE FUNCTION public.admin_get_user_by_email(search_email text)
RETURNS TABLE (
  user_id        uuid,
  user_email     text,
  user_nome      text,
  user_role      text,
  user_created_at timestamptz
)
SECURITY DEFINER
LANGUAGE plpgsql AS $$
BEGIN
  IF public.get_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
  SELECT
    u.id,
    u.email::text,
    COALESCE(p.nome, split_part(u.email::text, '@', 1)) AS user_nome,
    COALESCE(p.role, 'paciente')::text AS user_role,
    u.created_at
  FROM auth.users u
  LEFT JOIN public.pacientes p ON p.id = u.id
  WHERE lower(u.email::text) = lower(search_email);
END;
$$;

-- ─── 7. RPC: atualizar role de qualquer usuário ───────────────────────────────
CREATE OR REPLACE FUNCTION public.admin_set_user_role(target_user_id uuid, new_role text)
RETURNS void
SECURITY DEFINER
LANGUAGE plpgsql AS $$
BEGIN
  IF public.get_user_role() <> 'admin' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  IF new_role NOT IN ('paciente', 'nutricionista', 'admin') THEN
    RAISE EXCEPTION 'Role inválido: %', new_role;
  END IF;

  INSERT INTO public.pacientes (id, role)
  VALUES (target_user_id, new_role)
  ON CONFLICT (id) DO UPDATE SET role = new_role;
END;
$$;

-- ─── 8. Promover gil_stuart@hotmail.com para admin ───────────────────────────
-- Garante que o usuário tem linha em pacientes (caso trigger não tenha rodado)
INSERT INTO public.pacientes (id, nome, email)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', split_part(email::text, '@', 1)),
  email::text
FROM auth.users
WHERE lower(email::text) = 'gil_stuart@hotmail.com'
ON CONFLICT (id) DO NOTHING;

-- Promove para admin
UPDATE public.pacientes
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE lower(email::text) = 'gil_stuart@hotmail.com');
