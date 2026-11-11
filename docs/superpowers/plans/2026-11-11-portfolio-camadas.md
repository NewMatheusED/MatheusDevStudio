# Portfólio "Camadas" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir todo o visual e o conteúdo do portfólio MatheusDevStudio pela direção "Camadas": uma cena de abertura em três camadas controlada pela rolagem, seguida de casos, trabalhos, sobre e contato.

**Architecture:** Página única em Next.js (App Router). O conteúdo (camadas, tecnologias, projetos) vive em `content/` como dados tipados. A cena de abertura é um componente cliente que lê a rolagem, converte em estado por uma função pura (`lib/scene.ts`) e publica o estado como variáveis CSS e `data-step`; toda a aparência 3D fica em CSS (`app/scene.css`). As demais seções são componentes de servidor.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, `motion` (já instalado), Vitest + Testing Library, `next/font` (Archivo). Nenhuma dependência nova.

**Spec:** `docs/superpowers/specs/2026-11-11-portfolio-camadas-design.md`. Referência de comportamento da cena: `.superpowers/brainstorm/362-1794408529/content/camadas-v5.html` (rascunho; não copiar o código como está, reproduzir o comportamento).

## Global Constraints

- Marca: **MatheusDevStudio** na navegação, título da página e rodapé.
- Cores: fundo `#0f1318`, texto `#eef1f4`, secundário `#98a2ae`, linhas `#232a33`, azul `#3b5bdb`, azul claro `#93a7ff`, verde-petróleo `#2f6f7d` / `#11262d`, verde de status `#5fe3b0`.
- Tipografia: só Archivo. Títulos com `font-stretch` entre 112% e 118%, peso 700. Monoespaçada do sistema apenas nas rotas da camada de API.
- Largura máxima do conteúdo: 1680 px, com `padding-inline: clamp(24px, 5vw, 96px)`.
- O Beergam não aparece na primeira chamada do site. Nenhuma linguagem de venda do produto.
- Nomes de tecnologia nunca são o texto principal de um bloco.
- Nenhum texto pode sobrepor a pilha de camadas, de 360 a 2560 px de largura.
- Movimento automático só na cena de abertura. Nenhuma animação de entrada por seção.
- `prefers-reduced-motion: reduce`: nenhuma animação automática; etapas continuam funcionando.
- Ícones de tecnologia servidos de `public/icons/tech/`, nunca de CDN em produção.
- Textos em português, frases diretas, sem caixa alta em rótulos e sem "→" em botões.
- Sem dependências novas no `package.json`.
- Todo commit termina com `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`.

## Review Focus

1. **Largura intermediária (760 a 1100 px), duas colunas apertadas:** o título não pode encostar na pilha. Coberto pelo teste de `stackScale` na Task 3 e pela verificação em 900 px na Task 11.
2. **Tela baixa (1366×650, celular deitado):** título, frase e 12 botões de tecnologia precisam caber na área fixa sem cortar. Regra e verificação na Task 5.
3. **Blocos de camada inativos recebendo foco por teclado:** os três blocos ficam no DOM; os inativos precisam estar `inert`. Teste na Task 5.
4. **Ícone de tecnologia ausente ou que falha ao carregar:** o botão continua legível só com o nome. Teste na Task 2 (todo `slug` tem arquivo) e na Task 5 (imagem com `alt=""`, nome sempre em texto).
5. **Antes da hidratação ou sem JavaScript:** a abertura mostra o estado inicial legível e os três blocos de camada existem no HTML. Teste na Task 5.

---

### Task 1: Fundação visual e limpeza

**Files:**
- Modify: `app/globals.css`, `lib/fonts.ts`, `app/layout.tsx`, `app/page.tsx`
- Delete: `components/sections/hero-section.tsx`, `about-section.tsx`, `projects-section.tsx`, `project-card.tsx`, `skills-section.tsx`, `components/motion/reveal.tsx`, `content/skills.ts`, `content/skills.test.ts`, `components/layout/use-is-past-hero.ts`, `use-is-past-hero.test.ts`, `scripts/recolor-logo.mjs`, `scripts/recolor-logo.test.ts`, `public/img/acad.PNG`, `public/img/jquery-logo-svgrepo-com.svg`, `public/img/senac.png`, `public/img/logo-gold.png`
- Git: tirar `node_modules` do índice

**Interfaces:**
- Produces: tokens Tailwind `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `text-primary` (azul), `text-accent` (azul claro) com os valores do Global Constraints; classe utilitária `.wrap` (largura máxima 1680 px e padding lateral); classe `.display` (font-stretch 115%, peso 700, `letter-spacing: -0.02em`, `line-height: 1.04`); variável `--font-archivo`.

- [ ] **Step 1:** `git rm -r --cached node_modules -q` e confirmar que `.gitignore` já lista `node_modules/`. Adicionar `.playwright-mcp/` ao `.gitignore`.
- [ ] **Step 2:** Em `lib/fonts.ts`, trocar Fraunces, Fira Code e Inter por Archivo de `next/font/google` com `axes: ["wdth"]`, `variable: "--font-archivo"`, `display: "swap"`. Exportar `fontVariables`.
- [ ] **Step 3:** Em `app/globals.css`, manter os imports e o bloco `@theme inline`, apontar `--font-sans` para `var(--font-archivo)`, remover `--font-display` e `--font-mono`. Redefinir `:root` com: `--background: #0f1318`, `--foreground: #eef1f4`, `--card: #161b22`, `--muted-foreground: #98a2ae`, `--border: #232a33`, `--input: #2c3440`, `--primary: #3b5bdb`, `--primary-foreground: #eef1f4`, `--accent: #93a7ff`, `--accent-foreground: #0f1318`, `--ring: #93a7ff`, `--radius: 0.75rem`. Adicionar `.wrap`, `.display` e `html { scroll-behavior: smooth }` dentro de `@media (prefers-reduced-motion: no-preference)`.
- [ ] **Step 4:** Apagar os arquivos listados em Delete. Reduzir `app/page.tsx` a `<main>` com um `<h1 className="display">MatheusDevStudio</h1>` provisório.
- [ ] **Step 5:** Run: `npm run build && npm test`. Expected: build conclui; testes restantes passam (os de `projects` são reescritos na Task 2 e podem ser apagados agora junto com o arquivo antigo se quebrarem a compilação).
- [ ] **Step 6:** Commit: `chore: reset visual foundation for Camadas redesign`

---

### Task 2: Conteúdo em dados

**Files:**
- Create: `content/layers.ts`, `content/layers.test.ts`, `public/icons/tech/*.svg`
- Modify: `content/projects.ts`, `content/projects.test.ts`

**Interfaces:**
- Produces:

```ts
// content/layers.ts
export type LayerId = "interface" | "api" | "infra";
export interface Tech { slug: string; name: string; why: string }
export interface Layer { id: LayerId; label: string; title: string; body: string; techs: Tech[] }
export const layers: Layer[]; // ordem: interface, api, infra

// content/projects.ts
export type ProjectKind = "featured" | "client" | "own";
export interface Project {
  slug: string; kind: ProjectKind; title: string; description: string;
  url: string; linkLabel: string; stack: string[];
  image?: string;   // só featured
  role?: string;    // só beergam
  result?: string;  // só beergam
}
export const projects: Project[];
export const byKind: (kind: ProjectKind) => Project[];
```

- [ ] **Step 1: Testes de `layers`** em `content/layers.test.ts`:

```ts
it("has the three layers in order", () => {
  expect(layers.map((l) => l.id)).toEqual(["interface", "api", "infra"]);
  expect(layers.map((l) => l.label)).toEqual(["Interface", "API", "Infraestrutura"]);
});
it("lists 12, 12 and 11 technologies", () => {
  expect(layers.map((l) => l.techs.length)).toEqual([12, 12, 11]);
});
it("explains every technology in plain language and has its icon on disk", () => {
  for (const tech of layers.flatMap((l) => l.techs)) {
    expect(tech.why.length).toBeGreaterThan(15);
    expect(existsSync(`public/icons/tech/${tech.slug}.svg`)).toBe(true);
  }
});
it("never names a technology in a layer's main sentence", () => {
  for (const layer of layers) for (const tech of layer.techs) expect(layer.body).not.toContain(tech.name);
});
```

- [ ] **Step 2:** Run `npx vitest run content/layers.test.ts`. Expected: FAIL (módulo não existe).
- [ ] **Step 3:** Criar `content/layers.ts`. Títulos e frases: tabela "Rolagem" do spec, literalmente. Tecnologias, nomes e textos `why`: copiar do array `tech` em `camadas-v5.html`, literalmente. `slug` é o nome do arquivo do ícone, sem sufixo de cor (`nextdotjs`, não `nextdotjs/white`); "SAP Fiori" e "ABAP e OData" usam ambos `sap`.
- [ ] **Step 4:** Baixar os ícones uma vez: para cada slug, `curl -s https://cdn.simpleicons.org/<slug> -o public/icons/tech/<slug>.svg`; para `nextdotjs`, `shadcnui`, `socketdotio`, `sentry`, `vercel` usar `https://cdn.simpleicons.org/<slug>/white` (a cor de marca some no fundo escuro). Conferir que nenhum arquivo ficou vazio.
- [ ] **Step 5:** Run o teste. Expected: PASS.
- [ ] **Step 6: Testes de `projects`** (substituir o arquivo):

```ts
it("features Beergam then FonPack", () => {
  expect(byKind("featured").map((p) => p.slug)).toEqual(["beergam", "fonpack"]);
});
it("lists three client works and two own projects", () => {
  expect(byKind("client").map((p) => p.slug)).toEqual(["rs-advogados", "jnc-embalagens", "curse-of-ioher"]);
  expect(byKind("own").map((p) => p.slug)).toEqual(["senate-tracker", "compilador-minic"]);
});
it("uses the law firm's new domain and drops the offline gym site", () => {
  expect(projects.find((p) => p.slug === "rs-advogados")?.url).toBe("https://sergioedugomes.com.br/");
  expect(projects.some((p) => p.url.includes("academiazerograu"))).toBe(false);
});
it("gives every project an https link, a link label and a stack", () => {
  for (const p of projects) {
    expect(p.url.startsWith("https://")).toBe(true);
    expect(p.linkLabel.length).toBeGreaterThan(0);
    expect(p.stack.length).toBeGreaterThan(0);
  }
});
it("keeps the Beergam case sober", () => {
  const b = projects.find((p) => p.slug === "beergam")!;
  expect(b.result).toBe("Hoje mais de 300 sellers usam o sistema.");
  expect(b.description + b.role).not.toMatch(/melhor|líder|revolucion|incrível/i);
});
```

- [ ] **Step 7:** Reescrever `content/projects.ts` com os textos, stacks e links das seções 2 a 5 do spec. `image`: `/img/cases/beergam.webp` e `/img/cases/fonpack.webp` (arquivos chegam na Task 7). `linkLabel`: "Visitar beergam.ai", "Visitar o site" (FonPack e clientes), "Ver no GitHub" (próprios). URLs próprios: `https://github.com/NewMatheusED/projeto-POO` e `https://github.com/NewMatheusED/Compilador-MINIC`.
- [ ] **Step 8:** Run `npm test`. Expected: PASS.
- [ ] **Step 9:** Commit: `feat: add layers and projects content for Camadas`

---

### Task 3: Estado da cena (lógica pura)

**Files:**
- Create: `lib/scene.ts`, `lib/scene.test.ts`

**Interfaces:**
- Produces:

```ts
export type SceneStep = 0 | 1 | 2 | 3 | 4;      // 0 abertura, 1..3 camadas, 4 fechamento
export interface SceneState { open: number; flat: number; step: SceneStep }
export function sceneState(progress: number): SceneState;
export const STEP_ANCHORS: readonly [number, number, number]; // progresso para onde o seletor leva
export function stackScale(stackWidth: number, viewportWidth: number): number;
```

- [ ] **Step 1: Testes** em `lib/scene.test.ts`:

```ts
it("starts slightly open at the top", () => {
  expect(sceneState(0)).toEqual({ open: 0.16, flat: 0, step: 0 });
});
it("clamps out-of-range progress", () => {
  expect(sceneState(-1)).toEqual(sceneState(0));
  expect(sceneState(2)).toEqual(sceneState(1));
});
it("walks through the layers in order", () => {
  expect([0.1, 0.27, 0.49, 0.71, 0.95].map((p) => sceneState(p).step)).toEqual([0, 1, 2, 3, 4]);
});
it("is fully open while a layer is in focus", () => {
  for (const p of STEP_ANCHORS) expect(sceneState(p)).toMatchObject({ open: 1, flat: 0 });
});
it("closes and flattens at the end", () => {
  expect(sceneState(1)).toMatchObject({ open: 0, flat: 1, step: 4 });
});
it("selector anchors land on steps 1, 2 and 3", () => {
  expect(STEP_ANCHORS.map((p) => sceneState(p).step)).toEqual([1, 2, 3]);
});
it("keeps the stack inside its column", () => {
  // a pilha projetada ocupa cerca de 560 px de largura em escala 1
  for (const w of [300, 420, 520, 780, 1100]) expect(stackScale(w, 1440) * 560).toBeLessThanOrEqual(w);
});
it("caps the scale on huge screens and uses viewport width on phones", () => {
  expect(stackScale(2000, 2560)).toBe(1.7);
  expect(stackScale(390, 390)).toBeCloseTo((390 * 0.6) / 430, 3);
});
```

- [ ] **Step 2:** Run `npx vitest run lib/scene.test.ts`. Expected: FAIL.
- [ ] **Step 3:** Implementar. Limiares de etapa: `p < 0.16 → 0`, `< 0.38 → 1`, `< 0.60 → 2`, `< 0.82 → 3`, senão `4`. Com `ease(v) = 1 - (1 - v)^3` e `clamp` em [0, 1]: `flat = ease((p - 0.82) / 0.14)`; `open = (0.16 + 0.84 * ease(p / 0.18)) * (1 - flat)`. `STEP_ANCHORS = [0.27, 0.49, 0.71]`. `stackScale`: se `viewportWidth < 760`, `viewportWidth * 0.6 / 430`; senão `min(1.7, stackWidth / 610)`. Arredondar `open` e `flat` a 3 casas.
- [ ] **Step 4:** Run o teste. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: add pure scene state for scroll-driven layers`

---

### Task 4: A pilha de camadas

**Files:**
- Create: `app/scene.css`, `components/scene/layers-scene.tsx`, `components/scene/layer-stack.tsx`
- Modify: `app/layout.tsx` (importar `scene.css`), `app/page.tsx`

**Interfaces:**
- Consumes: `sceneState`, `stackScale` (Task 3).
- Produces: `<LayersScene>{children}</LayersScene>` (cliente): `<div className="scene" data-step>` com altura `560vh`, filho fixo `.scene-sticky` > `.scene-stage`; publica no elemento as variáveis `--open`, `--flat`, `--s`, `--tx`, `--ty`, `--mx`, `--my` e o atributo `data-step` (0 a 4). Exporta também `useSceneStep(): SceneStep` (contexto) e `goToStep(step: 1 | 2 | 3): void`. `<LayerStack />` (servidor, `aria-hidden`): a pilha, sem lógica.

- [ ] **Step 1:** `LayersScene`: um `useEffect` com listeners `scroll` (passivo) e `resize` que calculam `progress = clamp(-rect.top / (rect.height - innerHeight))`, chamam `sceneState` e `stackScale(stackEl.clientWidth, innerWidth)` e escrevem variáveis e `data-step` direto no elemento (sem `setState` por quadro); `setState` só quando `step` muda, para alimentar o contexto. Em `(pointer: fine)`, `pointermove` escreve `--tx` (±5deg), `--ty` (±4deg), `--mx`, `--my`. `goToStep(n)` rola para `sceneEl.offsetTop + (sceneEl.offsetHeight - innerHeight) * STEP_ANCHORS[n - 1]`, com `behavior: "smooth"` só sem reduzir movimento.
- [ ] **Step 2:** `LayerStack`: `.stack` > `.iso` contendo, nesta ordem, `.floor`, `.plane.infra` (12 `.pod`), `.plane.api` (5 `.req`: `GET /vendas 200 38 ms`, `POST /anuncios 201 61 ms`, `GET /lucro?mes=11 200 44 ms`, `PUT /precos/812 200 52 ms`, `GET /estoque 200 29 ms`), 3 `.pkt`, `.plane.ui` (menu lateral, três números "Faturamento R$ 48.210", "Lucro R$ 11,9 mil", "Margem 24,7%", gráfico SVG com os dois `path` do protótipo, aviso "Nova venda: R$ 189,90").
- [ ] **Step 3:** `app/scene.css`: reproduzir do protótipo v5 a geometria (`.iso` com `rotateX(58deg) rotateZ(-32deg)`, base 430 px, `aspect-ratio: 16 / 10.5`, `transform-style: preserve-3d`, escala `var(--s)`), o afastamento por `translateZ(calc(var(--open) * ±150px))`, o achatamento por `--flat`, o chão em grade, o brilho, a grade de fundo mascarada, a luz que segue `--mx/--my`, o apagar das camadas fora de foco por `data-step`, e as animações (`float`, `draw`, `hit`, `blink`, `drop`, `toast`). Bloco `@media (prefers-reduced-motion: reduce)` desligando todas as animações e transições da cena.
- [ ] **Step 4: Espessura das placas (novo em relação ao protótipo).** Cada `.plane` ganha lateral visível: `box-shadow` empilhado em 10 passos de 1 px no eixo Z não funciona em 3D, então usar dois pseudo-elementos por placa (`::before` e `::after`) posicionados nas bordas inferior e direita, com `transform-origin` na borda e `rotateX(-90deg)` / `rotateY(90deg)`, altura 14 px, na cor da placa escurecida 25%. Conferir visualmente que as três placas leem como objetos sólidos.
- [ ] **Step 5:** Montar em `app/page.tsx`: `<LayersScene><div /><LayerStack /></LayersScene>`.
- [ ] **Step 6:** Run `npm run dev`, abrir em 1440 px e rolar a cena inteira. Expected: pilha levemente aberta no topo, abre até o fim de 18% da rolagem, cada camada acende na sua vez, fecha e fica de frente no final; sem erro no console.
- [ ] **Step 7:** Run `npm run build`. Expected: conclui.
- [ ] **Step 8:** Commit: `feat: add scroll-driven layer stack`

---

### Task 5: Texto da cena, tecnologias clicáveis e navegação entre camadas

**Files:**
- Create: `components/scene/scene-copy.tsx`, `components/scene/tech-chips.tsx`, `components/scene/tech-chips.test.tsx`, `components/scene/scene-copy.test.tsx`, `components/scene/layer-pager.tsx`, `components/scene/works-strip.tsx`
- Modify: `app/scene.css`, `app/page.tsx`

**Interfaces:**
- Consumes: `layers` (Task 2), `byKind` (Task 2), `useSceneStep`, `goToStep` (Task 4).
- Produces: `<SceneCopy />`, `<TechChips techs={Tech[]} />`, `<LayerPager />`, `<WorksStrip />`.

- [ ] **Step 1: Testes de `TechChips`:**

```tsx
it("shows the first technology's explanation by default", () => {
  render(<TechChips techs={layers[0].techs} />);
  expect(screen.getByRole("button", { name: "React" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText(layers[0].techs[0].why)).toBeInTheDocument();
});
it("switches the explanation on click", async () => {
  render(<TechChips techs={layers[0].techs} />);
  await userEvent.click(screen.getByRole("button", { name: "TypeScript" }));
  expect(screen.getByRole("button", { name: "TypeScript" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "React" })).toHaveAttribute("aria-pressed", "false");
  expect(screen.getByText(layers[0].techs[1].why)).toBeInTheDocument();
});
it("stays readable when an icon fails: the name is text and the image is decorative", () => {
  render(<TechChips techs={layers[0].techs} />);
  const button = screen.getByRole("button", { name: "React" });
  expect(button).toHaveTextContent("React");
  expect(button.querySelector("img")).toHaveAttribute("alt", "");
});
```

(`@testing-library/user-event` não está instalado; usar `fireEvent.click` de `@testing-library/react`.)

- [ ] **Step 2: Testes de `SceneCopy`** (envolver num provedor de contexto com o `step` desejado):

```tsx
it("renders the opening and all three layers in the markup", () => {
  renderWithStep(0);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Construo o produto inteiro. Da infraestrutura à tela.");
  for (const layer of layers) expect(screen.getByText(layer.title)).toBeInTheDocument();
});
it("never mentions Beergam in the opening block", () => {
  renderWithStep(0);
  expect(screen.getByTestId("copy-0")).not.toHaveTextContent(/beergam/i);
});
it("makes inactive blocks inert", () => {
  renderWithStep(2);
  expect(screen.getByTestId("copy-2")).not.toHaveAttribute("inert");
  for (const id of ["copy-0", "copy-1", "copy-3", "copy-4"]) expect(screen.getByTestId(id)).toHaveAttribute("inert");
});
```

- [ ] **Step 3:** Run os dois arquivos. Expected: FAIL.
- [ ] **Step 4:** `TechChips` (cliente): `<div class="chips">` de `<button type="button" aria-pressed>` com `<img src="/icons/tech/{slug}.svg" alt="" width=18 height=18>` e o nome; abaixo `<p class="why" aria-live="polite">`. Estado local com o índice selecionado, inicial 0.
- [ ] **Step 5:** `SceneCopy` (cliente): cinco blocos `.copy` com `data-testid="copy-N"`, `inert` quando `N !== step`. Bloco 0: `<h1 class="display">`, o parágrafo de apresentação e os botões "Ver trabalhos" (`#trabalhos`) e "Falar comigo" (`#contato`), textos do spec. Blocos 1 a 3: `<h2 class="display">` com `layer.title`, `<p>` com `layer.body`, `<TechChips>`. Bloco 4: "Junto, vira produto no ar." e "Foi assim, camada por camada, que participei da construção do Beergam."
- [ ] **Step 6:** `LayerPager` (cliente): três `<button>` com `layer.label`, `aria-current="step"` no ativo, `onClick={() => goToStep(n)}`; visível só nas etapas 1 a 3. `WorksStrip` (servidor): quatro `<a href="#trabalho-{slug}">` com título e uma linha curta para beergam ("Plataforma para sellers"), fonpack ("Vitrine com orçamento"), rs-advogados ("Site com painel"), jnc-embalagens ("Site institucional"); visível só na etapa 0. Indicador de rolagem: `<span class="scroll-hint" role="img" aria-label="Role a página">`, visível só na etapa 0.
- [ ] **Step 7:** CSS: grade da `.scene-stage` em `minmax(0, 1fr) minmax(0, 1.15fr)`, `padding-bottom: 104px`, bordas laterais de 1 px; título `clamp(32px, 3vw, 64px)`, títulos de camada `clamp(28px, 2.8vw, 58px)`; faixa com 104 px de altura e células separadas por linha; seletor em pílula centralizado no pé. Abaixo de 760 px: uma coluna, pilha em cima ocupando `42vh`, faixa oculta, botões de tecnologia menores. **Tela baixa** (`max-height: 720px` com largura ≥ 760 px): ocultar a faixa, reduzir títulos em 20% e limitar `.chips` a `max-height: 9.5em` com `overflow-y: auto`.
- [ ] **Step 8:** Montar em `app/page.tsx`: `<LayersScene><SceneCopy /><LayerStack /><WorksStrip /><LayerPager /></LayersScene>`.
- [ ] **Step 9:** Run `npm test`. Expected: PASS.
- [ ] **Step 10:** Abrir em 1440×900, 1366×650 e 390×800; percorrer a cena. Expected: nenhum texto sobre a pilha; os 12 botões da camada de interface cabem ou rolam dentro da própria área; Tab só alcança os botões do bloco ativo.
- [ ] **Step 11:** Commit: `feat: add scene copy, clickable technologies and layer pager`

---

### Task 6: Etiquetas ligadas às camadas e toques vivos

**Files:**
- Create: `components/scene/layer-labels.tsx`, `components/scene/live-panel.tsx`
- Modify: `components/scene/layer-stack.tsx`, `app/scene.css`

**Interfaces:**
- Consumes: `layers`, `goToStep`, `useSceneStep`.
- Produces: `<LayerLabels />` (cliente), `<LivePanel />` (cliente, sem saída visual própria).

- [ ] **Step 1:** `LayerLabels`: três `<button>` com `layer.label`, posicionados fora da pilha (Interface e Infraestrutura à direita, API à esquerda da pilha, dentro da coluna dela), cada um com uma linha pontilhada de 1 px até a borda da sua camada. As etiquetas ficam em 2D sobre a cena; a posição vertical de cada uma acompanha `--open` (`translateY(calc(var(--open) * ∓N px))`, com N ajustado a olho para a linha tocar a placa aberta). Clique chama `goToStep`. Ocultas na etapa 4 e abaixo de 760 px. A etiqueta da camada ativa usa `#93a7ff`.
- [ ] **Step 2:** `LivePanel`: `setInterval` de 2400 ms que soma de 90 a 330 ao faturamento e escreve `R$ ` + `toLocaleString("pt-BR")` no elemento `#fat`, e marca um `.pod` aleatório com a classe `warn` por 1400 ms. Não inicia com `prefers-reduced-motion: reduce`; limpa o intervalo ao desmontar.
- [ ] **Step 3:** Run `npm run dev`, conferir em 1440 e 2000 px. Expected: as três linhas tocam as placas com a pilha aberta e fechada; etiquetas não cobrem texto nem saem da coluna.
- [ ] **Step 4:** Run `npm run build && npm test`. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: add layer labels and live panel details`

---

### Task 7: Casos em destaque (Beergam e FonPack)

**Files:**
- Create: `components/sections/featured-case.tsx`, `public/img/cases/beergam.webp`, `public/img/cases/fonpack.webp`
- Delete: `public/img/fonpack.jpg`
- Modify: `app/page.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: `byKind("featured")`.
- Produces: `<FeaturedCase project={Project} flip?: boolean />` (servidor); cada um com `id="trabalho-{slug}"`. O primeiro fica dentro de `<section id="trabalhos">`.

- [ ] **Step 1:** Capturar os prints com o navegador em 1600×1000: página inicial de `https://beergam.ai` (após recusar o aviso de cookies) e de `https://fonpackembalagens.com.br/`. Converter para WebP com largura 1600 usando `sharp` (já instalado) e salvar nos caminhos acima.
- [ ] **Step 2:** `FeaturedCase`: duas colunas (`1fr 1.25fr`, uma coluna abaixo de 760 px com a imagem em cima); `<h2 class="display">`, `description`, `role` e `result` quando existirem, lista de `stack` como etiquetas simples (não botões), link com `linkLabel` (`target="_blank" rel="noreferrer"`); imagem com `next/image`, cantos de 14 px e borda de 1 px. `flip` inverte as colunas.
- [ ] **Step 3:** Tema da FonPack: quando `project.slug === "fonpack"`, a seção recebe a classe `theme-fonpack`, definida em `globals.css` com fundo `#e9ebdf`, texto `#24352b`, secundário `#56655b`, botão `#24352b` com texto `#f4f1e8`, etiquetas com borda `#b9c2ad`.
- [ ] **Step 4:** Seções separadas por `border-top: 1px solid var(--border)` e `padding-block: clamp(80px, 9vw, 140px)`. Montar as duas na página, FonPack com `flip`.
- [ ] **Step 5:** Run `npm run build`; conferir em 390 e 1920 px. Expected: sem estouro horizontal; o texto do Beergam é o do spec, sem números além de "mais de 300 sellers".
- [ ] **Step 6:** Commit: `feat: add Beergam and FonPack featured cases`

---

### Task 8: Outros trabalhos e projetos próprios

**Files:**
- Create: `components/sections/work-list.tsx`
- Delete: `public/img/RS.png`, `public/img/jnc.png`, `public/img/ioher.png`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `byKind("client")`, `byKind("own")`.
- Produces: `<WorkList title={string} projects={Project[]} />` (servidor).

- [ ] **Step 1:** `WorkList`: `<h2 class="display">` e uma lista de `<a>` em linha inteira clicável (`id="trabalho-{slug}"`), grade `1fr 1.6fr auto`: título, descrição com as tecnologias em texto secundário abaixo, e `linkLabel`. Linhas separadas por borda fina; no foco e no hover o título fica `#93a7ff`. Uma coluna abaixo de 760 px.
- [ ] **Step 2:** Montar duas instâncias: "Outros trabalhos" (clientes) e "Projetos próprios".
- [ ] **Step 3:** Run `npm run build`. Expected: conclui.
- [ ] **Step 4:** Commit: `feat: add client work and own projects lists`

---

### Task 9: Sobre, contato, navegação e rodapé

**Files:**
- Create: `components/sections/about-section.tsx`
- Modify: `components/sections/contact-section.tsx`, `components/layout/nav-links.ts`, `components/layout/site-nav.tsx`, `components/layout/mobile-menu.tsx`, `components/layout/site-footer.tsx`, `components/logo.tsx`, `app/page.tsx`, `app/politica-de-privacidade/page.tsx`

**Interfaces:**
- Produces: `navLinks = [{ id: "trabalhos", label: "Trabalhos", href: "#trabalhos" }, { id: "sobre", label: "Sobre", href: "#sobre" }, { id: "contato", label: "Contato", href: "#contato" }]`; `<Logo />` renderiza só o texto "MatheusDevStudio" (peso 700, largura expandida) até a Task 10.

- [ ] **Step 1:** `SiteNav`: uma barra só, fixa, `background: rgba(15,19,24,.72)` com `backdrop-filter: blur(14px)`; `<Logo />` à esquerda (link para `/`), links à direita com o ativo em `#eef1f4`. Remover a troca para barra lateral e o uso de `useIsPastHero`. Abaixo de 760 px, manter `MobileMenu` com as cores novas.
- [ ] **Step 2:** `AboutSection` (`id="sobre"`): grade `300px 1fr`; foto `perfil3.jpg` (4:5, cantos de 14 px); `<h2 class="display">Sobre mim</h2>`; dois parágrafos do spec (trajetória; ABAP e Fiori com a primeira frase em destaque de peso, não de cor); links "Assistir ao vídeo de apresentação" (`https://youtu.be/oW6opek-WDE`), "Baixar currículo" (`/img/CV.pdf`, `download`), LinkedIn e GitHub (URLs já usados no rodapé atual).
- [ ] **Step 3:** `ContactSection` (`id="contato"`): título "Tem um projeto em mente?"; à esquerda, botão principal "Chamar no WhatsApp" para `https://wa.me/5511985648888` e, abaixo, e-mail e LinkedIn; à direita, o formulário existente sem alterar campos, validação ou envio. Remover `Reveal` e as classes de cor antigas. Mensagem de sucesso: "Mensagem enviada. Respondo em até um dia útil."
- [ ] **Step 4:** `SiteFooter`: "MatheusDevStudio", ano corrente, link para a política de privacidade, ícones de LinkedIn e GitHub. Remover `md:pl-64` e demais restos da barra lateral em `politica-de-privacidade/page.tsx` e ajustar a tipografia dela às classes novas.
- [ ] **Step 5:** Ordem final em `app/page.tsx`: `SiteNav`, cena, Beergam, FonPack, Outros trabalhos, Projetos próprios, Sobre, Contato, `SiteFooter`.
- [ ] **Step 6:** Run `npm run build && npm test`. Expected: PASS (os testes de `use-active-section`, `contact-schema`, `submit-contact` e `form` continuam valendo).
- [ ] **Step 7:** Enviar uma mensagem de teste pelo formulário em `npm run dev`. Expected: aparece a mensagem de sucesso.
- [ ] **Step 8:** Commit: `feat: add about, contact, navigation and footer`

---

### Task 10: Logo e metadados

**Files:**
- Create: `public/logo/symbol.svg`, `app/icon.svg`, `app/opengraph-image.png`
- Delete: `public/img/Logo.ico`, `Logo.jpg`, `Logo.png`, `LogoIco.png`, `etc/Cores.psd` (confirmar com o Matheus antes de apagar o PSD)
- Modify: `components/logo.tsx`, `app/layout.tsx`

**Interfaces:**
- Produces: `<Logo showWordmark?: boolean />`: símbolo SVG em linha (`currentColor`) e, por padrão, o nome ao lado.

- [ ] **Step 1:** Desenhar três opções do monograma em SVG (`viewBox="0 0 32 32"`, traço de 2,5 a 3, `stroke-linecap: round`, no máximo duas letras legíveis, M e E ou M e D, mantendo a ideia de letras que compartilham hastes do logo atual em `public/img/Logo.png`). Mostrar as três ao Matheus lado a lado em 16, 32 e 128 px, sozinhas e com o nome. **Parar aqui e esperar a escolha dele.**
- [ ] **Step 2:** Salvar a escolhida em `public/logo/symbol.svg` e em `app/icon.svg` (fundo `#0f1318`, traço `#eef1f4`, cantos arredondados). `Logo` passa a renderizar o símbolo em linha, mais o nome quando `showWordmark` não for `false`.
- [ ] **Step 3:** Gerar `app/opengraph-image.png` (1200×630): fundo `#0f1318`, símbolo, "MatheusDevStudio" e a frase "Construo o produto inteiro. Da infraestrutura à tela.".
- [ ] **Step 4:** `app/layout.tsx`: `title: "MatheusDevStudio | Matheus Eduardo, desenvolvedor fullstack"`, `description: "Sites e sistemas sob medida, da infraestrutura à tela. Conheça os trabalhos de Matheus Eduardo."`; remover `icons`, `openGraph.images` e `twitter.images` manuais (os arquivos em `app/` cobrem); `jobTitle` e `sameAs` do JSON-LD ficam como estão.
- [ ] **Step 5:** Run `npm run build`. Expected: conclui; `/icon.svg` e `/opengraph-image.png` aparecem nas rotas geradas.
- [ ] **Step 6:** Commit: `feat: add redesigned logo and page metadata`

---

### Task 11: Verificação final

**Files:** nenhum novo; correções onde a verificação apontar.

- [ ] **Step 1:** `npm run build && npm test && npm run lint`. Expected: tudo passa (se o ESLint ainda acusar configuração a migrar, registrar e não bloquear).
- [ ] **Step 2:** Com `npm start`, percorrer a página inteira em 390×800, 768×1024, 900×800, 1280×800, 1366×650, 1920×1080 e 2560×1300. Em cada uma, conferir: nenhum texto sobre a pilha; nenhuma barra de rolagem horizontal; nenhuma área grande vazia na abertura; faixa, seletor e indicador de rolagem aparecem e somem nas etapas certas.
- [ ] **Step 3:** Teclado: Tab do topo ao rodapé. Expected: foco sempre visível; na cena, só os controles do bloco ativo recebem foco; etiquetas e seletor levam à camada certa.
- [ ] **Step 4:** Emular `prefers-reduced-motion: reduce`. Expected: nada se move sozinho; rolagem e seletor continuam trocando as etapas.
- [ ] **Step 5:** Para cada `url` em `content/projects.ts` e cada link do Sobre, Contato e rodapé, requisitar e conferir resposta 200 (o JNC bloqueia requisição sem navegador; conferir abrindo a página).
- [ ] **Step 6:** Lighthouse na página inicial em modo celular. Expected: acessibilidade ≥ 95; registrar desempenho e, se LCP > 2,5 s, reduzir o peso dos prints.
- [ ] **Step 7:** Entregar ao Matheus para olhar no monitor 2K e no celular. Ajustar o que ele apontar.
- [ ] **Step 8:** Commit das correções: `fix: polish from final verification`
