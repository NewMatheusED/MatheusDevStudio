# Portfólio "Camadas": desenho do novo site

Data: 2026-11-11
Substitui o desenho de 2026-08-01 (`2026-08-01-portfolio-redesign-design.md`), cujo resultado o Matheus rejeitou.

## Por que isso existe

O site atual foi refeito em agosto e o Matheus não gostou de nada: acha feio, mal planejado, com estrutura e cores ruins. Além do visual, o conteúdo está velho: o Beergam (o trabalho mais importante dele) não aparece, a FonPack está descrita como site em HTML/CSS/JS quando hoje é uma vitrine em React, o "Sobre" gira em torno de ABAP/Fiori e a lista de skills destaca jQuery e Bootstrap.

O site tem dois leitores:

- um possível cliente, decidindo se contrata;
- alguém que só quer conhecer o Matheus.

Os dois precisam sair, em poucos segundos, com a impressão de que ele constrói produto de verdade, da infraestrutura à tela, e tem bom gosto.

## O que é sucesso

- O Matheus abre o site no monitor 2K dele e no celular e sente orgulho de mandar o link.
- A tela nunca parece vazia nem parada: o espaço está ocupado e há sempre algo vivo, como nas páginas do Beergam.
- Um cliente leigo entende o que ele faz sem conhecer nenhum termo técnico; alguém da área encontra a stack completa.
- Não tem cara de site gerado por IA.

## O que não é objetivo

- Blog, área de cliente, múltiplos idiomas, tema claro alternável.
- Página própria por projeto. Tudo fica na página inicial.
- Refazer o envio do formulário de contato (Formspree continua).

## O que seria fracasso mesmo funcionando

- Virar propaganda do Beergam. Ele entra como caso de sucesso, sóbrio, e não aparece na primeira chamada do site.
- Copiar o Beergam. A família visual é a mesma (escuro, sóbrio, linhas finas, produto real na tela), a identidade é do Matheus.
- Texto técnico demais na frente. Nomes de tecnologia nunca são o texto principal.
- Layout preso numa coluna estreita com vazio em volta em telas grandes.
- Texto sobreposto à cena das camadas em qualquer largura.
- Animação genérica espalhada (cada seção subindo com fade). O movimento se concentra na cena de abertura.
- Links quebrados.

## Referências

- **beergam.ai**: sobriedade, linhas finas dividindo a página em células, títulos grandes, espaço sempre ocupado. Limita a largura em Full HD, mas nunca parece vazio.
- **Páginas de produto da Apple**: cena fixa que evolui com a rolagem, com calma.
- **voidzero.dev**: pilha em perspectiva com camadas espessas (placas) e etiquetas ligadas por linha a cada camada, ocupando o espaço em volta.

O protótipo aprovado está em `.superpowers/brainstorm/362-1794408529/content/camadas-v5.html`. Ele é a referência de comportamento e de aparência da cena de abertura. É rascunho descartável: o código não deve ser reaproveitado como está, mas a cena final deve se comportar como ele, somando o que está descrito abaixo.

## Identidade visual

Decidido com o Matheus pelos protótipos:

- **Fundo** grafite azulado `#0f1318`; texto `#eef1f4`; texto secundário `#98a2ae`; linhas `#232a33`.
- **Azul** `#3b5bdb` (camada do meio, gráficos) e azul claro `#93a7ff` (foco, seleção, brilho).
- **Verde-petróleo** `#2f6f7d` / `#11262d` (camada de infraestrutura) e verde de status `#5fe3b0`.
- **Tipografia**: Archivo, uma família só. Títulos em largura expandida (cerca de 112 a 118%) e peso 700; corpo em largura normal. Trechos de código (rotas da API) em monoespaçada do sistema.
- **Fundo vivo**: grade fina que some nas bordas, chão em perspectiva sob as camadas, brilho azul atrás da pilha, luz suave que segue o mouse.
- **Estrutura**: linhas verticais marcando as laterais do conteúdo e células divididas por linhas finas, no espírito do Beergam.
- **Largura**: o conteúdo cresce até cerca de 1680 px; título, texto e cena escalam com a tela.

A FonPack é a única seção que sai dessa paleta: usa as cores dela (fundo claro esverdeado, verde escuro, kraft) para quebrar o escuro e mostrar outro registro de trabalho.

## A página, de cima para baixo

### Navegação

Barra fixa no topo, translúcida: logo com o nome "MatheusDevStudio" à esquerda; Trabalhos, Sobre, Contato à direita. No celular, menu padrão (o projeto já tem um componente de gaveta). Navegação convencional, sem invenção.

### 1. Abertura: a cena das camadas

É a peça central e onde o esforço de animação se concentra. Uma área alta com conteúdo fixo na tela; a rolagem controla o estado.

**Estado inicial.** À esquerda: título "Construo o produto inteiro. Da infraestrutura à tela.", o texto "Sou o Matheus, desenvolvedor fullstack. Faço sites e sistemas sob medida, do servidor ao que aparece na tela." e dois botões, "Ver trabalhos" e "Falar comigo". À direita: a pilha de três camadas em perspectiva, já levemente separada, flutuando de leve. No pé, uma faixa de quatro células com os trabalhos (Beergam, FonPack, RS Advogados, JNC Embalagens), cada uma levando ao projeto. Acima da faixa, centralizado, o ícone de mouse animado indicando rolagem; some quando a pessoa rola.

**As três camadas**, de cima para baixo:

- *Interface*: um painel claro com menu lateral, três números, um gráfico que se desenha, um aviso de "Nova venda" que aparece de tempos em tempos e o faturamento subindo. Os números são inventados; é uma tela genérica, não um print do Beergam.
- *API*: placa azul com uma lista de chamadas (`GET /vendas 200 38 ms` e semelhantes) que piscam conforme "chegam".
- *Infraestrutura*: placa verde-petróleo com uma grade de servidores com luz de status; de vez em quando um fica amarelo e volta.

Pontos de luz descem entre as camadas, como dados passando. A pilha inclina de leve acompanhando o mouse (só em dispositivos com mouse).

**Rolagem.** As camadas se afastam e cada uma ganha a vez: a camada em foco acende, as outras apagam, e o bloco de texto à esquerda troca. Cada etapa tem título, uma frase em linguagem de negócio, e os botões de tecnologia:

| Camada | Título | Frase |
|---|---|---|
| Interface | A parte que as pessoas tocam. | As telas, os botões, os gráficos. Tudo o que o seu cliente vê e usa, rápido no celular e no computador. |
| API | As regras do negócio. | O que acontece quando alguém clica: cálculos, cadastros, pagamentos e integrações com outros sistemas. |
| Infraestrutura | O que mantém tudo de pé. | Os servidores onde o sistema mora, preparados para ficar no ar o dia inteiro e crescer junto com o uso. |

**Tecnologias clicáveis.** Abaixo da frase, botões com ícone e nome. Clicar em um mostra, logo abaixo, uma linha simples dizendo para que serve. O primeiro já vem selecionado. A lista e os textos estão no protótipo v5 e devem ser levados como estão:

- Interface: React, TypeScript, Next.js, React Router, Tailwind CSS, Vite, TanStack Query, shadcn/ui, Socket.IO, SAP Fiori, HTML e CSS, JavaScript.
- API: Python, Flask, SQLAlchemy, Celery, Redis, MySQL, MongoDB, Node.js, PHP, Stripe, Pytest, ABAP e OData.
- Infraestrutura: Docker, Kubernetes, Argo CD, GitHub Actions, Traefik, Cloudflare, Prometheus, Grafana, Sentry, Vercel, Git.

O SAP entra aqui, dentro das camadas, de propósito: presente sem ser o assunto principal.

**Seletor de camada.** Durante as três etapas, um seletor "Interface / API / Infraestrutura" no pé da tela mostra onde a pessoa está e leva direto à camada clicada.

**Final da cena.** As três camadas se fecham e viram uma tela de frente. Texto: "Junto, vira produto no ar." e "Foi assim, camada por camada, que participei da construção do Beergam." A página segue para o caso do Beergam.

**O que a versão final acrescenta ao protótipo** (vindo do VoidZero):

- camadas com espessura, como placas, em vez de folhas finas;
- etiquetas "Interface", "API" e "Infraestrutura" ligadas por linha a cada camada, ocupando o espaço em volta da pilha. Clicar numa etiqueta leva à etapa correspondente.

**Regras da cena.**

- O tamanho da pilha é calculado pelo espaço da coluna dela; o texto nunca encosta nas camadas, de 360 px a 2560 px de largura.
- No celular, a pilha fica em cima e o texto embaixo; a faixa de trabalhos some (os projetos vêm logo depois); os botões de tecnologia quebram em linhas.
- Com "reduzir movimento" ativado no sistema: nada se move sozinho; as etapas continuam funcionando pela rolagem e pelo seletor.
- A cena é decorativa para leitor de tela; títulos, frases e botões de tecnologia são conteúdo real e navegável por teclado, com foco visível.

### 2. Beergam

Caso de sucesso, em tom sóbrio. Texto de um lado, print real do produto do outro.

- O que é: plataforma de gestão para quem vende no Mercado Livre e na Shopee.
- O papel do Matheus: está no projeto desde o primeiro dia e participou da estrutura inteira, da infraestrutura ao backend e à interface.
- Um resultado, em frase e não em painel de números: mais de 300 sellers usam o sistema.
- Tecnologias usadas, como etiquetas simples (não clicáveis): React, TypeScript, React Router, Tailwind CSS, Python, Flask, Celery, Redis, MySQL, MongoDB, Docker, Kubernetes, Argo CD.
- Link: "Visitar beergam.ai".

Nada de linguagem de venda do produto.

### 3. FonPack Embalagens

Segundo destaque, nas cores da FonPack. Print real de um lado, texto do outro.

- O que é: vitrine online para uma indústria de embalagens; o cliente escolhe medidas e cores no catálogo e fecha o orçamento direto no WhatsApp da empresa.
- Tecnologias: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Zustand.
- Link: `https://fonpackembalagens.com.br/`.

### 4. Outros trabalhos para clientes

Lista simples em linhas, cada uma com nome, uma frase, tecnologias e link:

- RS Advogados: site com painel administrativo e gestão de comentários. PHP, MySQL. `https://sergioedugomes.com.br/` (o domínio antigo `.adv.br` morreu).
- JNC Embalagens: site institucional com galeria de produtos. HTML, CSS, JavaScript. `https://jncembalagens.com.br/`.
- Curse of Ioher: projeto de acessibilidade com alto contraste, ajuste de fonte e Libras. HTML, CSS, JavaScript. `https://curse-of-ioher.vercel.app/`.

A Academia Zero Grau sai: o site está fora do ar.

### 5. Projetos próprios

Seção pequena, separada dos trabalhos para clientes, com link para o GitHub (`github.com/NewMatheusED`):

- Senate Tracker: sistema em três partes, com API em Java, frontend em React e serviço de IA em Python. Link para o repositório principal, `projeto-POO` (os outros dois são `projeto-POO-frontend` e `projeto-POO-IA`).
- Compilador MINIC: compilador escrito em C. Repositório `Compilador-MINIC`.

### 6. Sobre mim

Foto (`public/img/perfil3.jpg`) e texto curto:

- programa desde os 14 anos; formação técnica em multimídia; cursa Ciência da Computação;
- um parágrafo próprio para ABAP e Fiori: é uma área em que ele investiu bastante e onde quer trabalhar mais (relatórios, aplicativos SAPUI5, integrações via OData). Presente e claro, sem ser o centro do texto.

Links: vídeo de apresentação no YouTube (o mesmo link de hoje), currículo (`public/img/CV.pdf`), LinkedIn, GitHub.

### 7. Contato

Título "Tem um projeto em mente?". O caminho principal é um botão "Chamar no WhatsApp", que abre `https://wa.me/5511985648888`. Ao lado, o formulário curto (nome, e-mail, mensagem) com a validação e o envio que já existem, e e-mail e LinkedIn como alternativa. O botão "Falar comigo" da abertura leva a esta seção.

### Rodapé

MatheusDevStudio, ano, link para a política de privacidade.

## Logo

O Matheus gosta do conceito atual (um monograma juntando letras do nome) e acha a execução velha. Redesenhar o mesmo conceito com traço mais grosso e menos cruzamentos, para ler bem em tamanho pequeno (aba do navegador, barra de navegação), na cor clara do site. 

A marca é **MatheusDevStudio** (decisão do Matheus): é o nome na navegação, no título da página e no rodapé. O nome dele, Matheus Eduardo, aparece no texto ("Sou o Matheus") e no "Sobre".

A logo precisa de duas versões: só o símbolo (ícone da aba, imagem de compartilhamento, espaços pequenos) e símbolo com o nome "MatheusDevStudio" ao lado (navegação, rodapé). Apresentar duas ou três opções do símbolo a ele antes de fixar. Até lá, o site usa o nome por extenso.

## Como é feito

Decisões do Matheus:

- Inspiração no Beergam e na Apple, sem copiar; direção "Camadas"; cena como no protótipo v5.
- Beergam como caso de sucesso, fora da primeira chamada.
- ABAP/Fiori citado, sem ser o principal.
- Tecnologias clicáveis com nome e ícone; tecnologias também em cada projeto.
- FonPack e Beergam como destaques; RS Advogados no domínio novo; Senate Tracker nos projetos próprios.
- A marca continua MatheusDevStudio; a logo tem versão só símbolo e versão com o nome.
- WhatsApp no contato: (11) 98564-8888.

Decisões minhas (o Matheus não opinou; pode vetar):

- Continua em Next.js, no mesmo repositório, reaproveitando formulário de contato, validação, envio, página de privacidade, sitemap, robots, métricas da Vercel e o menu em gaveta. Todo o visual atual é descartado: seções, cores, fontes e o componente de entrada com fade.
- A cena é feita com CSS 3D e a biblioteca `motion`, que já está instalada. Sem biblioteca 3D nova.
- Ícones de tecnologia como SVG dentro do projeto, sem depender de serviço externo em produção.
- Conteúdo (projetos, tecnologias e seus textos) em arquivos de dados em `content/`, como já é hoje.
- Prints do Beergam e da FonPack capturados dos sites no ar e otimizados.
- Incluir o Compilador MINIC; linkar o Senate Tracker pelo GitHub, já que o domínio dele está fora do ar.
- Título e descrição da página (para Google e compartilhamento) reescritos no tom novo; imagem de compartilhamento nova quando a logo estiver definida.
- Limpeza: o repositório tem 194 arquivos antigos de `node_modules` rastreados pelo git, aparecendo como apagados. Tirar do índice.

## O que fica com quem constrói

- Estrutura de componentes e divisão da cena.
- Como produzir a espessura das placas e as linhas das etiquetas.
- Pontos de quebra exatos e escala tipográfica fina.
- Textos de apoio menores (rótulos de botão, mensagens do formulário), no mesmo tom direto.
- Quais testes existentes manter, adaptar ou apagar junto com o código que sai.

## Como conferir que ficou pronto

- Abrir em 390, 768, 1280, 1920 e 2560 px de largura e percorrer a cena inteira: nenhum texto sobre as camadas, nenhuma área morta grande, nada cortado.
- Todos os links externos respondendo.
- Formulário de contato enviando.
- Navegação por teclado na cena (botões de tecnologia, seletor, etiquetas) com foco visível.
- "Reduzir movimento" ativado: sem animação automática, conteúdo todo acessível.
- `npm run build` e `npm test` passando.
- O Matheus olhando no monitor dele e no celular.
