# NutriMatch — Plano de Testes (QA)

Este arquivo descreve os testes manuais e automatizáveis da plataforma NutriMatch.
Use-o em uma sessão dedicada de QA para validar cada release antes de fazer push.

O servidor local deve estar rodando em `http://localhost:3000` antes de iniciar.
Para subir o servidor: `pnpm dev` na raiz do projeto.

---

## Como usar este arquivo em uma sessão de Claude

1. Abra uma nova sessão do Claude Code
2. Diga: *"Leia o arquivo QA.md e execute todos os testes usando o servidor em localhost:3000. Use as preview tools para cada caso."*
3. O Claude vai executar cada caso, capturar screenshots/snapshots e reportar PASSOU / FALHOU com evidência

---

## T01 — Página inicial carrega corretamente

**URL:** `http://localhost:3000/`

**Verificar:**
- [ ] Título "Encontre seu nutricionista ideal, online ou presencial" visível
- [ ] Campo "Especialidade ou nome..." presente
- [ ] Campo "Sua cidade..." presente
- [ ] Botão "Buscar" presente
- [ ] Tags clicáveis visíveis: Emagrecimento, Nutrição esportiva, Vegetarianismo, Diabetes, Gestação
- [ ] Seção "Como funciona" visível abaixo do hero

---

## T02 — Busca pelo hero navega com parâmetros corretos

**URL inicial:** `http://localhost:3000/`

**Passos:**
1. Preencher "Especialidade ou nome..." com `Diabetes`
2. Preencher "Sua cidade..." com `São Paulo`
3. Clicar em "Buscar"

**Verificar:**
- [ ] URL resultante contém `?busca=Diabetes`
- [ ] URL resultante contém `cidade=S%C3%A3o+Paulo` (ou `cidade=São+Paulo`)
- [ ] Página de listagem carrega
- [ ] Campo de busca mostra `Diabetes` pré-preenchido
- [ ] Campo de localização na sidebar mostra `São Paulo` pré-preenchido

---

## T03 — Enter no hero navega corretamente

**URL inicial:** `http://localhost:3000/`

**Passos:**
1. Preencher "Especialidade ou nome..." com `Emagrecimento`
2. Pressionar Enter (disparar evento keydown com key='Enter' no input)

**Verificar:**
- [ ] Navega para `/nutricionistas?busca=Emagrecimento`
- [ ] Resultados são filtrados por "Emagrecimento"

---

## T04 — Tag clicável na home

**URL inicial:** `http://localhost:3000/`

**Passos:**
1. Clicar na tag "Vegetarianismo"

**Verificar:**
- [ ] Navega para `/nutricionistas?busca=Vegetarianismo`
- [ ] Campo de busca na listagem mostra `Vegetarianismo`
- [ ] Resultados filtrados (menos de 30)

---

## T05 — Listagem carrega 30 nutricionistas sem filtros

**URL:** `http://localhost:3000/nutricionistas`

**Verificar:**
- [ ] Texto "30 nutricionistas encontrados"
- [ ] Grid de cards visível

---

## T06 — Filtro de busca por texto

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `Diabetes` no campo de busca da listagem

**Verificar:**
- [ ] Contador cai para menos de 30
- [ ] Todos os cards exibidos têm "Diabetes" no nome, cidade ou especialidades
- [ ] Botão X aparece no campo de busca
- [ ] Clicar no X limpa o campo e volta a 30 resultados

---

## T07 — Filtro de localização filtra todos (sem exceção Online)

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `São Paulo` no campo de localização da sidebar

**Verificar:**
- [ ] Contador cai (menos de 30)
- [ ] Todos os cards exibidos têm cidade "São Paulo" (Online e Presencial)
- [ ] Nenhum card de outras cidades aparece (ex: Natal, Brasília, Salvador)

---

## T08 — Filtro de modalidade

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Selecionar radio "Online"

**Verificar:**
- [ ] Somente nutricionistas Online aparecem
- [ ] Selecionar "Presencial" → somente Presencial aparecem
- [ ] Selecionar "Todos" → volta a 30

---

## T09 — Filtro de especialidade (checkbox)

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Marcar checkbox "Diabetes"

**Verificar:**
- [ ] Resultados filtrados por nutricionistas com Diabetes nas especialidades
- [ ] Marcar segundo checkbox "Emagrecimento" → união (OR) dos dois filtros, mais resultados que só Diabetes

---

## T10 — Filtro de avaliação mínima

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Selecionar "4.5+"

**Verificar:**
- [ ] Todos os cards exibidos têm nota ≥ 4.5
- [ ] Selecionar "4.0+" → mais resultados que 4.5+
- [ ] Selecionar "Qualquer" → volta a 30

---

## T11 — Ordenação

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Selecionar "Melhor avaliados" no dropdown de ordenação

**Verificar:**
- [ ] Primeiro card tem nota mais alta
- [ ] Selecionar "Menor preço" → primeiro card tem menor preço

---

## T12 — Limpar todos os filtros

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `Diabetes` na busca
2. Selecionar modalidade `Online`
3. Digitar `São Paulo` na localização
4. Clicar em "Limpar tudo"

**Verificar:**
- [ ] Campo de busca vazio
- [ ] Modalidade voltou para "Todos"
- [ ] Localização vazia
- [ ] Avaliação voltou para "Qualquer"
- [ ] Contador volta a 30

---

## T13 — Estado vazio (zero resultados)

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `xyzabcxyz` na busca

**Verificar:**
- [ ] Mensagem "Nenhum nutricionista encontrado para esses filtros." visível
- [ ] Botão "Limpar filtros" visível
- [ ] Clicar em "Limpar filtros" → volta a 30 resultados

---

## T14 — Perfil do nutricionista

**URL:** `http://localhost:3000/nutricionistas` → clicar em "Ver perfil" no primeiro card

**Verificar:**
- [ ] URL muda para `/nutricionistas/[slug]`
- [ ] Nome do nutricionista visível
- [ ] CRN visível
- [ ] Bio / apresentação visível
- [ ] Especialidades listadas
- [ ] Seção de avaliações presente
- [ ] Botão "Solicitar agendamento" visível na sidebar

---

## T15 — Perfil inexistente retorna 404

**URL:** `http://localhost:3000/nutricionistas/slug-que-nao-existe`

**Verificar:**
- [ ] Página 404 do Next.js é exibida (não quebra com erro 500)

---

## T16 — Navegação pelo navbar

**URL:** `http://localhost:3000/`

**Verificar:**
- [ ] Clicar em "Nutricionistas" no navbar → navega para `/nutricionistas`
- [ ] Clicar em "NutriMatch" (logo) → volta para `/`

---

## Notas de ambiente

- Banco de dados: Supabase (requer variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` em `.env.local`)
- Total de nutricionistas no banco: 30
- Auto-detect de localização (GPS) não funciona no preview headless — testar manualmente no browser real
- O filtro de modalidade "Online/Presencial" e o filtro de localização são independentes: use "Online" na modalidade para ver só atendimentos remotos, independente de cidade
