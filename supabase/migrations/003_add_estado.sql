-- Adiciona coluna estado à tabela nutricionistas
ALTER TABLE public.nutricionistas
ADD COLUMN IF NOT EXISTS estado text NOT NULL DEFAULT '';

-- Popula o estado com base na cidade
UPDATE public.nutricionistas SET estado = CASE cidade
  WHEN 'São Paulo'       THEN 'SP'
  WHEN 'Campinas'        THEN 'SP'
  WHEN 'Rio de Janeiro'  THEN 'RJ'
  WHEN 'Belo Horizonte'  THEN 'MG'
  WHEN 'Porto Alegre'    THEN 'RS'
  WHEN 'Curitiba'        THEN 'PR'
  WHEN 'Brasília'        THEN 'DF'
  WHEN 'Florianópolis'   THEN 'SC'
  WHEN 'Recife'          THEN 'PE'
  WHEN 'Salvador'        THEN 'BA'
  WHEN 'Fortaleza'       THEN 'CE'
  WHEN 'Goiânia'         THEN 'GO'
  WHEN 'Natal'           THEN 'RN'
  WHEN 'Manaus'          THEN 'AM'
  ELSE ''
END;
