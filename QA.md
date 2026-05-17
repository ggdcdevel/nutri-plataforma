# NutriMatch — Plano de Testes (QA)

Este arquivo descreve os testes regressivos da plataforma NutriMatch.
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
- [ ] Campo "Sua cidade..." presente (campo separado do de especialidade)
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
- [ ] URL resultante contém `busca=Diabetes`
- [ ] URL resultante contém `cidade=S%C3%A3o+Paulo%2C+SP` ou `cidade=São+Paulo`
- [ ] Página de listagem carrega
- [ ] Campo de busca da listagem mostra `Diabetes` pré-preenchido
- [ ] Campo de localização na sidebar mostra `São Paulo` (ou `São Paulo, SP`) pré-preenchido

---

## T03 — Enter no hero navega corretamente

**URL inicial:** `http://localhost:3000/`

**Passos:**
1. Preencher "Especialidade ou nome..." com `Emagrecimento`
2. Disparar evento keydown com key=`Enter` no campo de especialidade

**Verificar:**
- [ ] Navega para `/nutricionistas?busca=Emagrecimento`
- [ ] Resultados filtrados por "Emagrecimento"

---

## T04 — Enter no campo cidade do hero navega corretamente

**URL inicial:** `http://localhost:3000/`

**Passos:**
1. Preencher "Sua cidade..." com `Curitiba`
2. Disparar evento keydown com key=`Enter` no campo de cidade (sem dropdown aberto)

**Verificar:**
- [ ] Navega para `/nutricionistas?cidade=Curitiba`
- [ ] Resultados filtrados por Curitiba

---

## T05 — Autocomplete de cidade no hero

**URL inicial:** `http://localhost:3000/`

**Passos:**
1. Digitar `São` no campo "Sua cidade..."

**Verificar:**
- [ ] Dropdown aparece com sugestões contendo "São" no nome
- [ ] Cada sugestão exibe cidade e sigla do estado (ex: "São Paulo" + "SP")
- [ ] Clicar em "São Paulo" preenche o campo com `São Paulo, SP`
- [ ] Dropdown fecha após seleção

---

## T06 — Navegação por teclado no autocomplete

**URL inicial:** `http://localhost:3000/`

**Passos:**
1. Digitar `Belo` no campo cidade
2. Pressionar ArrowDown para navegar pelo dropdown
3. Pressionar Enter para selecionar

**Verificar:**
- [ ] Item destacado muda ao pressionar ArrowDown/ArrowUp
- [ ] Enter seleciona o item destacado e fecha o dropdown
- [ ] Escape fecha o dropdown sem selecionar

---

## T07 — Tag clicável na home inclui cidade

**URL inicial:** `http://localhost:3000/`

**Passos:**
1. Preencher "Sua cidade..." com `Curitiba, PR`
2. Clicar na tag "Vegetarianismo"

**Verificar:**
- [ ] URL contém `busca=Vegetarianismo` E `cidade=Curitiba%2C+PR`
- [ ] Listagem pré-filtrada com os dois parâmetros

---

## T08 — Listagem carrega 30 nutricionistas sem filtros

**URL:** `http://localhost:3000/nutricionistas`

**Verificar:**
- [ ] Texto "30 nutricionistas encontrados"
- [ ] Grid de cards visível
- [ ] Cada card exibe cidade no formato "Cidade, UF" (ex: "São Paulo, SP")

---

## T09 — Exibição de cidade e estado nos cards

**URL:** `http://localhost:3000/nutricionistas`

**Verificar:**
- [ ] Cards mostram "São Paulo, SP" (não só "São Paulo")
- [ ] Cards mostram "Curitiba, PR", "Porto Alegre, RS", etc.
- [ ] Nenhum card com campo de cidade vazio

---

## T10 — Filtro de busca por texto

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `Diabetes` no campo de busca da listagem

**Verificar:**
- [ ] Contador cai para menos de 30
- [ ] Todos os cards exibidos têm "Diabetes" no nome, cidade ou especialidades
- [ ] Botão X aparece no campo de busca
- [ ] Clicar no X limpa o campo e volta a 30 resultados

---

## T11 — Autocomplete de cidade na sidebar

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `Porto` no campo de localização da sidebar

**Verificar:**
- [ ] Dropdown aparece com "Porto Alegre" + "RS" (e eventualmente outros)
- [ ] Clicar em "Porto Alegre" preenche o campo com `Porto Alegre, RS`
- [ ] Contador atualiza filtrando apenas nutricionistas de Porto Alegre
- [ ] Nenhum card de outra cidade aparece

---

## T12 — Filtro de localização filtra todos (sem exceção Online)

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `São Paulo, SP` no campo de localização da sidebar

**Verificar:**
- [ ] Contador cai (menos de 30)
- [ ] Todos os cards são de São Paulo (Online e Presencial)
- [ ] Nenhum card de outra cidade aparece (Natal, Brasília, Salvador etc.)

---

## T13 — Filtro de localização aceita só cidade sem estado

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `Curitiba` (sem ", PR") no campo de localização

**Verificar:**
- [ ] Filtra normalmente, mostrando nutricionistas de Curitiba
- [ ] Mesmo resultado de digitar `Curitiba, PR`

---

## T14 — Filtro de modalidade independente de localização

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Selecionar radio "Online"

**Verificar:**
- [ ] Somente nutricionistas Online aparecem (de qualquer cidade)
- [ ] Selecionar "Presencial" → somente Presencial aparecem
- [ ] Selecionar "Todos" → volta a 30

---

## T15 — Filtro de especialidade (checkbox)

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Marcar checkbox "Diabetes"

**Verificar:**
- [ ] Resultados filtrados por nutricionistas com Diabetes nas especialidades
- [ ] Marcar segundo checkbox "Emagrecimento" → união (OR), mais resultados que só Diabetes

---

## T16 — Filtro de avaliação mínima

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Selecionar "4.5+"

**Verificar:**
- [ ] Todos os cards exibidos têm nota ≥ 4.5
- [ ] Selecionar "4.0+" → mais resultados que 4.5+
- [ ] Selecionar "Qualquer" → volta a 30

---

## T17 — Ordenação

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Selecionar "Melhor avaliados" no dropdown de ordenação

**Verificar:**
- [ ] Primeiro card tem nota mais alta
- [ ] Selecionar "Menor preço" → primeiro card tem menor preço

---

## T18 — Limpar todos os filtros

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `Diabetes` na busca
2. Selecionar modalidade `Online`
3. Selecionar cidade `São Paulo, SP` via autocomplete
4. Clicar em "Limpar tudo"

**Verificar:**
- [ ] Campo de busca vazio
- [ ] Modalidade voltou para "Todos"
- [ ] Localização vazia
- [ ] Avaliação voltou para "Qualquer"
- [ ] Contador volta a 30

---

## T19 — Estado vazio (zero resultados)

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Digitar `xyzabcxyz` na busca

**Verificar:**
- [ ] Mensagem "Nenhum nutricionista encontrado para esses filtros." visível
- [ ] Botão "Limpar filtros" visível
- [ ] Clicar em "Limpar filtros" → volta a 30 resultados

---

## T20 — Perfil do nutricionista

**URL:** `http://localhost:3000/nutricionistas` → clicar em "Ver perfil" no primeiro card

**Verificar:**
- [ ] URL muda para `/nutricionistas/[slug]`
- [ ] Nome do nutricionista visível
- [ ] CRN visível
- [ ] Bio / apresentação visível
- [ ] Especialidades listadas
- [ ] Cidade exibida no formato "Cidade, UF" na sidebar do perfil
- [ ] Seção de avaliações presente
- [ ] Botão "Solicitar agendamento" visível na sidebar

---

## T21 — Perfil inexistente retorna 404

**URL:** `http://localhost:3000/nutricionistas/slug-que-nao-existe`

**Verificar:**
- [ ] Página 404 do Next.js é exibida (não quebra com erro 500)

---

## T22 — Navegação pelo navbar

**URL:** `http://localhost:3000/nutricionistas`

**Verificar:**
- [ ] Clicar em "NutriMatch" (logo) → navega para `/`
- [ ] A partir da home, clicar em "Encontrar nutricionista" → navega para `/nutricionistas`

---

## T23 — Combinação de filtros (regressivo geral)

**URL:** `http://localhost:3000/nutricionistas`

**Passos:**
1. Selecionar modalidade `Presencial`
2. Marcar especialidade `Nutrição esportiva`
3. Selecionar avaliação `4.5+`
4. Digitar `São Paulo` na localização

**Verificar:**
- [ ] Todos os filtros aplicados simultaneamente (AND entre eles)
- [ ] Cada card satisfaz: Presencial + tem "Nutrição esportiva" + nota ≥ 4.5 + cidade São Paulo
- [ ] Se nenhum satisfaz, exibe estado vazio com botão "Limpar filtros"

---

## Notas de ambiente

- Banco de dados: Supabase — requer variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` em `.env.local`
- Total de nutricionistas no banco: 30 (requer migration `003_add_estado.sql` aplicada para exibir estado)
- Auto-detect de localização (GPS) não funciona em preview headless — testar manualmente no browser real
- O filtro de modalidade e o filtro de localização são independentes: selecionar "Online" mostra online de qualquer cidade; localização filtra por cidade independente de modalidade
- Autocomplete de cidade usa lista estática de ~70 cidades brasileiras (`src/lib/cidades.ts`) — cidades fora da lista ainda podem ser digitadas manualmente e o filtro funciona normalmente
