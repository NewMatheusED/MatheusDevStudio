# Redesign do portfólio MatheusDevStudio

## Contexto

O site atual (`public/*.html`) é um site estático de 2021-2023: HTML puro + jQuery + particles.js + AOS + Font Awesome, sem build tool. Tem 4 páginas: Home, Portfólio (sobre + carreira + projetos + skills), Contato (formulário Formspree) e Política de Privacidade. Hospedado na Vercel. O dono considera o visual datado/genérico e quer uma reconstrução completa, mantendo a hospedagem na Vercel.

Este documento descreve o redesign completo: nova stack, identidade visual, estrutura de página e conteúdo.

## Stack técnica

- **Next.js 15** (App Router), **React 19**, TypeScript.
- **TanStack Query** para data-fetching/estado assíncrono onde fizer sentido (ex: estado de envio do formulário de contato). Não introduzir onde Server Components já resolvem — sem uso forçado.
- **Tailwind CSS v4**, tokens de design centralizados em `app/globals.css` via `@theme`.
- **shadcn/ui**: `Button`, `Sheet` (menu mobile), `Badge` (skills/tags), `Card` (projetos), `Form`/`Input`/`Textarea` (contato), `NavigationMenu`.
- **Motion** (motion.dev, sucessor do Framer Motion) para scroll reveals e transições de layout.
- Site **single-page** (`/`) com seções por âncora + rota separada `/politica-de-privacidade`.
- Formulário de contato mantém o **Formspree** existente (endpoint atual), só reestilizado com shadcn — sem criar backend próprio.
- Mantém **Vercel Analytics** e **Speed Insights** (scripts já presentes no site atual).
- Deploy continua na Vercel, sem mudança de domínio.

## Identidade visual

### Paleta (dark)

| Token | Hex | Uso |
|---|---|---|
| `background` | `#010314` | fundo base |
| `surface` | `#0D0B1A` | cards, painéis elevados |
| `border` | `#221D33` | divisórias sutis |
| `accent` (dourado) | `#E8A650` | CTAs, títulos em destaque, links/estado ativo |
| `foreground` | `#F5EFE6` | texto principal |
| `muted` | `#9B96A8` | texto secundário |

Paleta escolhida após comparar 3 variações (laranja vibrante puro, âmbar suave, preto com fundo violeta) — o dono preferiu o âmbar suave por transmitir elegância "leve e ornada" em vez de um laranja mais "tech/startup".

### Tipografia

- **Fraunces** (serifada, com itálico usado em palavras de destaque) → headings (h1/h2/h3). Escolhida por ter personalidade mais quente/arredondada que combina com a geometria do Fira Code, evitando o clichê do Playfair Display.
- **Fira Code** (monoespaçada) → labels técnicas, tags de stack/skills, "assinatura dev" no hero (ex: `<DevFullstack />`), itens de navegação. Representa o lado "desenvolvimento" do dono.
- **Inter** → corpo de texto (parágrafos, descrições).

Essa combinação foi pedida explicitamente pelo dono para misturar "o mundo do design com o mundo do dev" — serifada elegante + monoespaçada técnica.

### Logo

- Logo existente (`public/img/Logo.png`) é um monograma geométrico em linha (M/A entrelaçados), atualmente na cor bronze `#A97C53`.
- **Recolorir para `#E8A650`** (o dourado da nova paleta), mantendo o traço/forma originais.
- Usar a logo de verdade no header (ícone + wordmark "**MatheusDevStudio**" em Fraunces) — não substituir por texto solto com o primeiro nome.

## Estrutura da página (single-page)

### Navegação com transformação no scroll

- **Estado inicial (topo)**: nav horizontal fixa — logo + wordmark à esquerda, links de âncora (Sobre, Projetos, Skills, Contato) à direita.
- **Ao rolar além do hero**: a nav horizontal recolhe e uma **sidebar fixa** assume (visível em viewports ≥ md): logo + wordmark compacto, breve tagline, e navegação vertical com indicador de seção ativa (dots), acompanhando o scroll. Em mobile, mantém nav horizontal com menu `Sheet` (hambúrguer) em vez da sidebar.
- Transição animada via Motion (`layout` animation), não corte seco.

### Seções, em ordem

1. **Hero** — layout assimétrico (2 colunas em desktop): à esquerda, `<DevFullstack />` (label Fira Code) + headline em Fraunces + subtítulo em Inter + CTA "Ver projetos" (dourado) + atalhos de contato (E-mail, LinkedIn, Baixar CV — mesmos da versão atual). À direita, retrato do dono com moldura/borda sutil na paleta escura.
2. **Sobre** — texto reescrito em 1ª pessoa, mais conciso que o parágrafo corrido atual, organizado em blocos curtos cobrindo: apresentação pessoal, trajetória (multimídia → Ciências da Computação → ABAP/Fiori → hoje fullstack). Mantém o link para o vídeo de apresentação do YouTube como um link discreto opcional (não destaque visual forte).
3. **Projetos** — grid de cards com imagem, título, descrição reescrita (mais concisa), tags de stack em estilo Fira Code (Badge), e link "Ver projeto". Lista curada (ver seção Conteúdo abaixo).
4. **Skills** — badges agrupadas por categoria (Frontend / Backend / Ferramentas), substituindo a grade solta de ícones do site atual.
5. **Contato** — formulário Formspree restilizado (Nome, E-mail, Mensagem) + atalhos diretos (WhatsApp, E-mail).

**Footer** — logo, e-mail, telefone, link para `/politica-de-privacidade`, redes sociais (LinkedIn, GitHub).

## Conteúdo

### Projetos (curados)

Removidos da lista atual: "Blog Pessoal" e "Cooperative Game" (projetos escolares antigos, sem imagem própria — ambos usam `senac.png` como placeholder hoje).

Lista final, em ordem:

1. **Academia Zero Grau** — https://academiazerograu.com.br/
2. **Curse Of Ioher** — https://curse-of-ioher.vercel.app/ (destaque para acessibilidade: alto contraste, modificador de fonte, recurso de Libras)
3. **JNC Embalagens** — https://jncembalagens.com.br/
4. **FonPack Embalagens** — https://fonpackembalagens.com.br/ (novo item, adicionado pelo dono; empresa de embalagens sob medida, B2B)
5. **RS Advogados Associados** — https://sergioedugomes.adv.br/ (full-stack PHP/MySQL com painel admin)

Todas as descrições serão reescritas de forma mais concisa e profissional, mantendo os fatos técnicos de cada projeto.

### Textos gerais

Hero, Sobre e descrições de projetos são reescritos (não apenas copiados) — mais concisos, tom profissional, mantendo todos os fatos (trajetória, tecnologias, resultados).

### Identidade profissional

O dono é **desenvolvedor fullstack**, não apenas front-end — isso deve refletir no hero, meta description e enquadramento geral do "Sobre" (não usar "front-end" como identidade principal).

## Motion & micro-interações

- **Scroll reveals**: fade + slide sutil (12–16px, ~0.4s, easing suave) em títulos de seção e cards, em cascata leve (stagger pequeno) — nunca a seção inteira de uma vez.
- **Hero → sidebar**: transição animada de layout ao cruzar o fim do hero (ver Navegação acima).
- **Cards de projeto**: hover com elevação leve (translateY -4px + sombra dourada suave). Sem tilt 3D, sem glow exagerado.
- **Sidebar/dots de navegação**: indicador ativo desliza suavemente entre seções conforme o scroll.
- **CTA principal**: micro-interação de hover (realce sutil na borda/fundo dourado), sem gradientes animados.

Princípio geral: efeitos perceptíveis mas discretos — nada de parallax pesado, partículas de fundo (remove particles.js), ou glow/gradiente exagerado que remeta a "vibe code" genérico.

## SEO

- Metadata completa via Next.js Metadata API (`title`, `description`, Open Graph, Twitter Card), em português, revisando os textos atuais.
- `app/sitemap.ts` e `app/robots.ts` gerados nativamente pelo App Router.
- JSON-LD (`Person`/`ProfilePage`) para rich results.
- Imagens via `next/image` (otimização automática).
- Estrutura pronta para cadastro no Google Search Console (dono vai cadastrar o site lá; preparar para adicionar meta tag ou arquivo de verificação quando ele fornecer o código).

## Fora de escopo

- Migração do formulário de contato para backend próprio (mantém Formspree).
- Blog ou CMS.
- Internacionalização (site continua só em português).
- Reescrita do vídeo de apresentação (mantém o mesmo vídeo do YouTube, só reposicionado como link discreto).
