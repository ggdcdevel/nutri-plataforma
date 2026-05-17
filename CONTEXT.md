# NutriMatch — Context

## Descrição do projeto

**NutriMatch** é uma plataforma de conexão entre pacientes e nutricionistas no Brasil. O objetivo é permitir que usuários encontrem profissionais verificados com base em especialidade, modalidade de atendimento (online ou presencial), localização e avaliação, e entrem em contato para agendar consultas.

O produto está em fase de MVP — ainda não há autenticação, sistema de pagamento ou agendamento real. O fluxo atual termina em "Solicitar agendamento" (botão placeholder no perfil do nutricionista).

---

## Stack utilizada

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 16.2.6 | Framework principal (App Router, server components) |
| React | 19.2.4 | UI |
| TypeScript | ^5 | Tipagem |
| Tailwind CSS | ^4 | Estilização |
| shadcn/ui | ^4.7.0 | Componentes base (Button, Badge, Input, Separator) |
| @supabase/supabase-js | ^2.49.4 | Cliente do banco de dados |
| Supabase | — | Banco de dados PostgreSQL + Row Level Security |
| Lucide React | ^1.16.0 | Ícones |
| Inter (Google Fonts) | — | Tipografia |
| Vercel | — | Deploy e hospedagem |
| pnpm | 10.x | Gerenciador de pacotes |

---

## O que já foi construído

### Páginas

| Arquivo | Descrição |
|---|---|
| `src/app/page.tsx` | Landing page — compõe os blocos Hero, HowItWorks, Stats e ForNutritionists |
| `src/app/nutricionistas/page.tsx` | Listagem de nutricionistas — server component que busca dados do Supabase e passa para o componente cliente; aceita `?busca=` na URL |
| `src/app/nutricionistas/[slug]/page.tsx` | Perfil individual — busca o nutricionista por slug no Supabase; retorna 404 se não encontrado |
| `src/app/layout.tsx` | Layout raiz — fonte Inter, metadados globais, lang pt-BR |

### Componentes — landing page

| Arquivo | Descrição |
|---|---|
| `src/components/navbar.tsx` | Barra de navegação com links e CTAs |
| `src/components/hero.tsx` | Seção hero com busca funcional (navega para `/nutricionistas?busca=`) e tags clicáveis |
| `src/components/how-it-works.tsx` | Seção "Como funciona" — 3 passos |
| `src/components/stats.tsx` | Bloco de números/estatísticas da plataforma |
| `src/components/for-nutritionists.tsx` | Seção de captação de nutricionistas |
| `src/components/footer.tsx` | Rodapé com links |

### Componentes — listagem

| Arquivo | Descrição |
|---|---|
| `src/components/nutricionistas/nutricionistas-listing.tsx` | Componente cliente com busca, filtros e ordenação client-side sobre os dados recebidos como prop |
| `src/components/nutricionistas/filters-sidebar.tsx` | Sidebar de filtros: modalidade, especialidade, avaliação mínima e localização com geolocalização via browser API + Nominatim |
| `src/components/nutricionistas/nutricionista-card.tsx` | Card de nutricionista na grid da listagem |

### Componentes — perfil

| Arquivo | Descrição |
|---|---|
| `src/components/nutricionistas/profile-sections.tsx` | Seções About, Formação/Experiência e Avaliações detalhadas |
| `src/components/nutricionistas/profile-sidebar.tsx` | Sidebar do perfil com preço, botão de agendamento e informações gerais |

### Componentes UI (shadcn)

| Arquivo | Descrição |
|---|---|
| `src/components/ui/badge.tsx` | Componente Badge |
| `src/components/ui/button.tsx` | Componente Button |
| `src/components/ui/input.tsx` | Componente Input |
| `src/components/ui/separator.tsx` | Componente Separator |

### Lib / infra

| Arquivo | Descrição |
|---|---|
| `src/lib/supabase.ts` | Singleton do cliente Supabase tipado com `Database` |
| `src/lib/database.types.ts` | Tipos TypeScript que espelham o schema do banco (gerado manualmente) |
| `src/lib/types.ts` | Tipos de domínio da aplicação: `Nutricionista` e `NutricionistaProfile` |
| `src/lib/queries/nutricionistas.ts` | `getNutricionistas()` e `getNutricionistaBySlug()` — únicas funções que tocam o Supabase |
| `src/lib/utils.ts` | Utilitário `cn()` para merge de classes Tailwind |

### Dados / migrations

| Arquivo | Descrição |
|---|---|
| `supabase/migrations/001_create_nutricionistas.sql` | Cria a tabela, configura RLS e popula 6 nutricionistas originais |
| `supabase/migrations/002_seed_extra_nutricionistas.sql` | Adiciona 24 nutricionistas para massa de teste (total: 30) |
| `src/data/nutricionistas.ts` | ⚠️ Arquivo legado — mock original da listagem, não é mais usado pela app |
| `src/data/nutricionistas-profiles.ts` | ⚠️ Arquivo legado — mock original dos perfis, não é mais usado pela app |

---

## Estado atual do banco de dados

### Tabela: `public.nutricionistas`

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `uuid` | PK gerada automaticamente |
| `nome` | `text` | Nome completo |
| `crn` | `text` | Registro no Conselho Regional de Nutrição |
| `cidade` | `text` | Cidade de atuação |
| `modalidade` | `text` | `'Online'` ou `'Presencial'` |
| `especialidades` | `text[]` | Array de especialidades |
| `nota` | `numeric(3,1)` | Avaliação média (ex: 4.9) |
| `avaliacoes` | `integer` | Número total de avaliações |
| `preco` | `integer` | Preço por consulta em reais |
| `slug` | `text` | Identificador único para URL (único) |
| `bio` | `text` | Texto de apresentação |
| `formacao` | `text` | Curso de graduação |
| `universidade` | `text` | Instituição de ensino |
| `experiencia_anos` | `integer` | Anos de experiência |
| `atendimentos` | `integer` | Número de atendimentos realizados |
| `idiomas` | `text[]` | Idiomas falados |
| `membro_desde` | `integer` | Ano de cadastro na plataforma |
| `avaliacoes_detalhadas` | `jsonb` | Array de `{ iniciais, nota, texto, tempo }` |
| `created_at` | `timestamptz` | Data de criação do registro |

**RLS ativo:** policy de leitura pública para `anon` e `authenticated`.

**Volume atual:** 30 nutricionistas (6 reais + 24 de massa de teste).

---

## O que falta fazer

### Funcionalidades core
- [ ] **Autenticação** — cadastro e login de pacientes e nutricionistas (Supabase Auth)
- [ ] **Cadastro de nutricionista** — formulário de onboarding com upload de foto e documentos
- [ ] **Sistema de agendamento** — o botão "Solicitar agendamento" não tem ação real ainda
- [ ] **Mensagens / contato** — canal de comunicação entre paciente e nutricionista após contato
- [ ] **Avaliações reais** — sistema para pacientes deixarem avaliações após consultas

### Melhorias na listagem
- [ ] **Paginação ou scroll infinito** — atualmente carrega os 30 de uma vez
- [ ] **Filtro de preço** — faixa de preço com slider
- [ ] **Foto real** — avatares são iniciais com cor; suporte a foto de perfil via Supabase Storage

### Perfil do nutricionista
- [ ] **Disponibilidade** — agenda com horários disponíveis
- [ ] **Verificação de CRN** — badge de verificado após checagem do registro

### Infra / qualidade
- [ ] Deletar `src/data/nutricionistas.ts` e `src/data/nutricionistas-profiles.ts` (legados)
- [ ] Gerar `database.types.ts` via `supabase gen types` em vez de manter manualmente
- [ ] Adicionar `generateStaticParams` na página de perfil para pre-render estático

---

## Padrões adotados

### Arquitetura
- **Server components por padrão** — pages são `async` e fazem fetch no servidor
- **Client components apenas onde necessário** — componentes com `useState`/`useEffect` têm `"use client"`
- **Queries centralizadas** — todo acesso ao Supabase passa por `src/lib/queries/`
- **Tipos centralizados** — `src/lib/types.ts` é a fonte de verdade dos tipos de domínio

### Nomenclatura
- Arquivos de componente: `kebab-case.tsx`
- Tipos e interfaces: `PascalCase`
- Funções utilitárias: `camelCase`
- Slugs: nome em minúsculas sem acentos com hífens (ex: `ana-beatriz-moura`)
- Colunas no banco: `snake_case` → mapeadas para `camelCase` na camada de query

### Paleta de cores (Tailwind custom tokens)
| Token | Uso |
|---|---|
| `nutri-green` | Cor primária — botões, badges online, destaques |
| `nutri-green-dark` | Hover dos elementos verdes |
| `nutri-surface` | Background das páginas internas |
| `nutri-text` | Texto principal |
| `nutri-muted` | Texto secundário / placeholders |
| `amber-500` | Badge "Presencial" |

### Busca e filtros
- Normalização de acentos via `NFD + /\p{Diacritic}/gu` antes de comparar
- Filtro de localização inteligente: nutricionistas **online sempre aparecem**; presenciais só aparecem se a cidade bater
- Geolocalização via browser API + reverse geocoding pelo Nominatim (OpenStreetMap)

---

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima (pública) do Supabase |

**Configuradas em:**
- **Vercel** — painel do projeto → Settings → Environment Variables (produção e preview)
- **Local** — arquivo `.env.local` na raiz do projeto (não versionado)

> O prefixo `NEXT_PUBLIC_` expõe as variáveis para o browser. Isso é seguro para a anon key do Supabase desde que RLS esteja ativo (está).
