# NutriMatch — Context

## Descrição do projeto

**NutriMatch** é uma plataforma de conexão entre pacientes e nutricionistas no Brasil. O objetivo é permitir que usuários encontrem profissionais verificados com base em especialidade, modalidade de atendimento (online ou presencial), localização e avaliação, e entrem em contato para agendar consultas.

O produto está em fase de MVP com autenticação de pacientes implementada. O fluxo termina em "Solicitar agendamento" — o botão já abre o modal de login, mas o agendamento real ainda não existe.

---

## Stack utilizada

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 16.2.6 | Framework principal (App Router, server components) |
| React | 19.2.4 | UI |
| TypeScript | ^5 | Tipagem |
| Tailwind CSS | ^4 | Estilização |
| shadcn/ui | ^4.7.0 | Componentes base (Button, Badge, Input, Separator) |
| @supabase/supabase-js | ^2.105.4 | Cliente do banco de dados + Auth |
| Supabase | — | Banco de dados PostgreSQL + Auth + Row Level Security |
| Lucide React | latest | Ícones |
| Inter (Google Fonts) | — | Tipografia |
| Vercel | — | Deploy e hospedagem |
| pnpm | 10.x | Gerenciador de pacotes |

---

## O que já foi construído

### Páginas

| Arquivo | Descrição |
|---|---|
| `src/app/page.tsx` | Landing page — compõe Hero, HowItWorks, Stats e ForNutritionists |
| `src/app/nutricionistas/page.tsx` | Listagem — server component que busca do Supabase; aceita `?busca=` e `?cidade=` |
| `src/app/nutricionistas/[slug]/page.tsx` | Perfil individual — busca por slug; retorna 404 se não encontrado |
| `src/app/cadastro-nutricionista/page.tsx` | Landing de captação para nutricionistas — hero, benefícios, prova social, formulário; salva em `leads_nutricionistas`; lê `?origem=` da URL |
| `src/app/minha-conta/page.tsx` | Dashboard do paciente — protegido por auth; redireciona para `/` se não logado |
| `src/app/recuperar-senha/page.tsx` | Envia e-mail de recuperação de senha via Supabase Auth |
| `src/app/redefinir-senha/page.tsx` | Define nova senha usando token do Supabase (evento PASSWORD_RECOVERY) |
| `src/app/layout.tsx` | Layout raiz — envolve tudo com `AuthProvider` + `AuthModal`; fonte Inter; lang pt-BR |

### Componentes — landing page

| Arquivo | Descrição |
|---|---|
| `src/components/navbar.tsx` | Navbar com auth: botão "Entrar" abre AuthModal quando deslogado; avatar com dropdown "Minha conta / Sair" quando logado |
| `src/components/hero.tsx` | Hero com dois campos separados (especialidade + cidade), autocomplete, auto-detect GPS |
| `src/components/how-it-works.tsx` | Seção "Como funciona" — 3 passos |
| `src/components/stats.tsx` | Bloco de números/estatísticas |
| `src/components/for-nutritionists.tsx` | Seção de captação; botão aponta para `/cadastro-nutricionista?origem=organico` |
| `src/components/footer.tsx` | Rodapé com links, incluindo "Para nutricionistas" → `/cadastro-nutricionista?origem=footer` |

### Componentes — listagem

| Arquivo | Descrição |
|---|---|
| `src/components/nutricionistas/nutricionistas-listing.tsx` | Componente cliente com busca (botão X para limpar), filtros e ordenação client-side |
| `src/components/nutricionistas/filters-sidebar.tsx` | Sidebar de filtros: modalidade, especialidade, avaliação mínima, localização com `CityAutocomplete` + geolocalização |
| `src/components/nutricionistas/nutricionista-card.tsx` | Card na grid; exibe cidade no formato "Cidade, UF" |

### Componentes — perfil

| Arquivo | Descrição |
|---|---|
| `src/components/nutricionistas/profile-sections.tsx` | Seções About, Formação/Experiência e Avaliações detalhadas |
| `src/components/nutricionistas/profile-sidebar.tsx` | Sidebar com preço, botão "Solicitar agendamento" (abre AuthModal se não logado), informações gerais |

### Componentes — autenticação

| Arquivo | Descrição |
|---|---|
| `src/components/auth/AuthModal.tsx` | Modal sobreposto com abas "Entrar" / "Criar conta"; botões Google e Facebook (OAuth); formulário e-mail+senha; link para recuperação de senha |

### Componentes UI (shadcn + custom)

| Arquivo | Descrição |
|---|---|
| `src/components/ui/badge.tsx` | Badge (shadcn) |
| `src/components/ui/button.tsx` | Button (shadcn) |
| `src/components/ui/input.tsx` | Input (shadcn) |
| `src/components/ui/separator.tsx` | Separator (shadcn) |
| `src/components/ui/city-autocomplete.tsx` | Autocomplete de cidades com dropdown, navegação por teclado, formato "Cidade, UF" |

### Lib / infra

| Arquivo | Descrição |
|---|---|
| `src/lib/supabase.ts` | Singleton do cliente Supabase tipado com `Database` |
| `src/lib/database.types.ts` | Tipos TypeScript do schema do banco (mantido manualmente — todas as tabelas com Insert/Update explícitos sem referências circulares) |
| `src/lib/types.ts` | Tipos de domínio: `Nutricionista` e `NutricionistaProfile` |
| `src/lib/auth-context.tsx` | `AuthProvider` e `useAuth` — expõe `user`, `session`, `loading`, `isModalOpen`, `openAuthModal`, `closeAuthModal`, `signOut` |
| `src/lib/queries/nutricionistas.ts` | `getNutricionistas()` e `getNutricionistaBySlug()` — mapeiam snake_case → camelCase |
| `src/lib/cidades.ts` | Lista estática de ~70 cidades brasileiras com sigla de estado (`CidadeOption[]`) |
| `src/lib/utils.ts` | `cn()` para merge de classes Tailwind |

### Migrations

| Arquivo | Status | O que faz |
|---|---|---|
| `001_create_nutricionistas.sql` | ✅ Aplicada | Cria tabela `nutricionistas` + RLS + 6 registros |
| `002_seed_extra_nutricionistas.sql` | ✅ Aplicada | +24 registros de teste (total 30) |
| `003_add_estado.sql` | ✅ Aplicada | Coluna `estado` (UF) em `nutricionistas` |
| `004_create_leads_nutricionistas.sql` | ✅ Aplicada | Tabela `leads_nutricionistas` com RLS (insert público) |
| `005_add_origem.sql` | ✅ Aplicada | Campo `origem` em `nutricionistas` e `leads_nutricionistas` |
| `006_auth_pacientes.sql` | ⏳ Pendente | Tabela `pacientes` + trigger de auto-criação no cadastro |

### Qualidade / documentação

| Arquivo | Descrição |
|---|---|
| `QA.md` | 30 casos de teste regressivos (T01–T30) cobrindo todos os fluxos incluindo auth e cadastro |
| `CONTEXT.md` | Este arquivo |

---

## Estado atual do banco de dados

### Tabela: `public.nutricionistas`

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `uuid` | PK |
| `nome` | `text` | Nome completo |
| `crn` | `text` | Registro CRN |
| `cidade` | `text` | Cidade de atuação |
| `estado` | `text` | Sigla do estado (ex: `SP`) |
| `modalidade` | `text` | `'Online'` ou `'Presencial'` |
| `especialidades` | `text[]` | Array de especialidades |
| `nota` | `numeric(3,1)` | Avaliação média |
| `avaliacoes` | `integer` | Total de avaliações |
| `preco` | `integer` | Preço por consulta em reais |
| `slug` | `text` | Identificador único para URL |
| `bio` | `text` | Apresentação |
| `formacao` | `text` | Curso de graduação |
| `universidade` | `text` | Instituição |
| `experiencia_anos` | `integer` | Anos de experiência |
| `atendimentos` | `integer` | Atendimentos realizados |
| `idiomas` | `text[]` | Idiomas falados |
| `membro_desde` | `integer` | Ano de cadastro |
| `avaliacoes_detalhadas` | `jsonb` | Array de `{ iniciais, nota, texto, tempo }` |
| `origem` | `text` | Fonte do registro (ex: `random_teste`) |
| `created_at` | `timestamptz` | Data de criação |

### Tabela: `public.leads_nutricionistas`

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `uuid` | PK |
| `nome` | `text` | Nome completo |
| `email` | `text` | E-mail profissional |
| `whatsapp` | `text` | Telefone com máscara `(XX) XXXXX-XXXX` |
| `crn` | `text` | Registro CRN |
| `cidade` | `text` | Cidade e estado (ex: `São Paulo, SP`) |
| `modalidade` | `text` | `Online`, `Presencial` ou `Ambos` |
| `especialidades` | `text[]` | Especialidades selecionadas |
| `status` | `text` | Default: `aguardando` |
| `origem` | `text` | Fonte do lead (ex: `instagram_ads`, `organico`, `navbar`, `footer`) |
| `created_at` | `timestamptz` | Data de criação |

**RLS:** insert público (`anon`); sem leitura pública.

### Tabela: `public.pacientes` (migration 006 — pendente)

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | `uuid` | PK — referencia `auth.users` |
| `nome` | `text` | Nome extraído do metadata do Auth |
| `email` | `text` | E-mail |
| `avatar_url` | `text` | URL do avatar (OAuth) |
| `created_at` | `timestamptz` | Data de criação |

**RLS:** select e update apenas pelo próprio usuário (`auth.uid() = id`).
**Trigger:** `on_auth_user_created` — cria registro automaticamente ao cadastrar.

---

## O que falta fazer

### Funcionalidades core
- [ ] **Agendamento real** — botão "Solicitar agendamento" abre modal mas não agenda nada ainda
- [ ] **Mensagens / contato** — canal entre paciente e nutricionista
- [ ] **Avaliações reais** — pacientes deixam avaliações após consultas
- [ ] **Painel do nutricionista** — gestão de perfil, agenda, visualização de leads

### Configuração pendente (Supabase)
- [ ] Aplicar migration `006_auth_pacientes.sql` no SQL Editor
- [ ] Authentication → Providers → habilitar **Google** (precisa de Client ID e Secret do Google Cloud)
- [ ] Authentication → Providers → habilitar **Facebook** (precisa de App ID e Secret da Meta)
- [ ] Authentication → URL Configuration → adicionar redirect URLs de produção e localhost

### Melhorias na listagem
- [ ] Paginação ou scroll infinito
- [ ] Filtro de preço com slider
- [ ] Foto de perfil real via Supabase Storage

### Perfil do nutricionista
- [ ] Disponibilidade / agenda
- [ ] Badge de CRN verificado

### Infra / qualidade
- [ ] Gerar `database.types.ts` via `supabase gen types` em vez de manter manualmente
- [ ] Adicionar `generateStaticParams` na página de perfil
- [ ] Expandir `src/lib/cidades.ts` com mais municípios

---

## Padrões adotados

### Arquitetura
- **Server components por padrão** — pages são `async` e fazem fetch no servidor
- **Client components onde necessário** — componentes com `useState`/`useEffect` têm `"use client"`
- **Auth via Context** — `AuthProvider` no layout raiz; `useAuth()` em qualquer client component
- **Queries centralizadas** — todo acesso ao Supabase passa por `src/lib/queries/`
- **Tipos centralizados** — `src/lib/types.ts` é a fonte de verdade dos tipos de domínio

### Busca e filtros
- Normalização de acentos via `NFD + /\p{Diacritic}/gu` (função `norm()`)
- Busca por texto: nome, cidade e especialidades (OR)
- Filtro de localização: aceita "São Paulo" ou "São Paulo, SP"
- **Online NÃO tem exceção no filtro de localização** — todos filtrados igualmente pela cidade
- Geolocalização via browser API + Nominatim, normalizado contra lista `CIDADES`

### Rastreamento de origem
- Leads capturados com campo `origem` via `?origem=` na URL
- Valores padrão: `navbar`, `organico`, `footer`, `direto`
- Campanha Instagram: `/cadastro-nutricionista?origem=instagram_ads`

### Nomenclatura
- Arquivos de componente: `kebab-case.tsx` (exceto `AuthModal.tsx` por convenção de componente)
- Tipos e interfaces: `PascalCase`
- Funções utilitárias: `camelCase`
- Slugs: nome em minúsculas sem acentos com hífens
- Colunas no banco: `snake_case` → `camelCase` na camada de query

### Paleta de cores (Tailwind custom tokens)
| Token | Uso |
|---|---|
| `nutri-green` | Cor primária — botões, badges online, destaques |
| `nutri-green-dark` | Hover dos elementos verdes |
| `nutri-surface` | Background das páginas internas |
| `nutri-text` | Texto principal |
| `nutri-muted` | Texto secundário / placeholders |
| `amber-500` | Badge "Presencial" |

---

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima (pública) do Supabase |

Configuradas em Vercel (Settings → Environment Variables) e localmente em `.env.local`.

---

## Fluxo de desenvolvimento e deploy

- Repositório: `https://github.com/ggdcdevel/nutri-plataforma`
- Branch principal: `main`
- Deploy automático via Vercel a cada push na `main`
- Push requer GitHub PAT: `git push https://TOKEN@github.com/ggdcdevel/nutri-plataforma.git main`
- Não há `gh` CLI — usar PowerShell + API do GitHub para PRs se necessário

### Migrations do Supabase
Aplicadas manualmente no painel do Supabase (SQL Editor). Sem CLI configurada.

### Servidor local
Iniciado via `.claude/launch.json` com `start-dev.cmd` (define PATH do node + pnpm e cd para o diretório raiz).

---

## Testes

- `QA.md` contém 30 casos (T01–T30)
- Para executar: nova sessão do Claude → *"Leia o QA.md e execute todos os testes usando o servidor em localhost:3000"*
- T24–T30 cobrem a landing de cadastro e os links de origem
- Testes de auth (modal, OAuth, recuperação de senha) ainda precisam ser adicionados ao QA.md
