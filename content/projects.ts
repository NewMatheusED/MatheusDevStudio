export type ProjectKind = "featured" | "client" | "own";

export interface Project {
  slug: string;
  kind: ProjectKind;
  title: string;
  description: string;
  url: string;
  linkLabel: string;
  stack: string[];
  /** print do projeto; só nos destaques */
  image?: string;
  /** papel do Matheus no projeto; só no Beergam */
  role?: string;
  /** um resultado, em frase; só no Beergam */
  result?: string;
}

export const projects: Project[] = [
  {
    slug: "beergam",
    kind: "featured",
    title: "Beergam",
    description: "Plataforma de gestão para quem vende no Mercado Livre e na Shopee.",
    role: "Estou no projeto desde o primeiro dia e participei da estrutura inteira: infraestrutura, backend e interface.",
    result: "Hoje mais de 300 sellers usam o sistema.",
    url: "https://beergam.ai",
    linkLabel: "Visitar beergam.ai",
    image: "/img/cases/beergam.webp",
    stack: [
      "React",
      "TypeScript",
      "React Router",
      "Tailwind CSS",
      "Python",
      "Flask",
      "Celery",
      "Redis",
      "MySQL",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "Argo CD",
    ],
  },
  {
    slug: "fonpack",
    kind: "featured",
    title: "FonPack Embalagens",
    description:
      "Vitrine online para uma indústria de embalagens. O cliente escolhe medidas e cores no catálogo e fecha o orçamento direto no WhatsApp da empresa.",
    url: "https://fonpackembalagens.com.br/",
    linkLabel: "Visitar o site",
    image: "/img/cases/fonpack.webp",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Zustand"],
  },
  {
    slug: "rs-advogados",
    kind: "client",
    title: "RS Advogados",
    description: "Site com painel administrativo e gestão de comentários.",
    url: "https://sergioedugomes.com.br/",
    linkLabel: "Visitar o site",
    stack: ["PHP", "MySQL"],
  },
  {
    slug: "jnc-embalagens",
    kind: "client",
    title: "JNC Embalagens",
    description: "Site institucional com galeria de produtos.",
    url: "https://jncembalagens.com.br/",
    linkLabel: "Visitar o site",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "curse-of-ioher",
    kind: "client",
    title: "Curse of Ioher",
    description: "Projeto de acessibilidade com alto contraste, ajuste de fonte e Libras.",
    url: "https://curse-of-ioher.vercel.app/",
    linkLabel: "Visitar o site",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "senate-tracker",
    kind: "own",
    title: "Senate Tracker",
    description: "Sistema em três partes: API, frontend e um serviço de inteligência artificial.",
    url: "https://github.com/NewMatheusED/projeto-POO",
    linkLabel: "Ver no GitHub",
    stack: ["Java", "React", "Python"],
  },
  {
    slug: "compilador-minic",
    kind: "own",
    title: "Compilador MINIC",
    description: "Um compilador escrito do zero, da leitura do código à análise da gramática.",
    url: "https://github.com/NewMatheusED/Compilador-MINIC",
    linkLabel: "Ver no GitHub",
    stack: ["C"],
  },
];

export const byKind = (kind: ProjectKind): Project[] => projects.filter((p) => p.kind === kind);
