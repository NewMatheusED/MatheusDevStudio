export interface Project {
  slug: string;
  title: string;
  description: string;
  url: string;
  image: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    slug: "academia-zero-grau",
    title: "Academia Zero Grau",
    description:
      "Site institucional completo para uma academia, pensado para transmitir a energia da marca com responsividade total em qualquer dispositivo.",
    url: "https://academiazerograu.com.br/",
    image: "/img/acad.PNG",
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    slug: "curse-of-ioher",
    title: "Curse Of Ioher",
    description:
      "Projeto com foco em acessibilidade web: modo de alto contraste, ajuste de tamanho de fonte e suporte a Libras para a comunidade surda.",
    url: "https://curse-of-ioher.vercel.app/",
    image: "/img/ioher.png",
    stack: ["HTML5", "CSS3", "JavaScript", "Acessibilidade"],
  },
  {
    slug: "jnc-embalagens",
    title: "JNC Embalagens",
    description:
      "Site institucional para fabricante de embalagens, com galeria de produtos interativa e identidade visual desenvolvida sob medida.",
    url: "https://jncembalagens.com.br/",
    image: "/img/jnc.png",
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    slug: "fonpack-embalagens",
    title: "FonPack Embalagens",
    description:
      "Presença digital para empresa de embalagens sob medida, com apresentação clara dos serviços de personalização para clientes B2B.",
    url: "https://fonpackembalagens.com.br/",
    image: "/img/fonpack.jpg",
    stack: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    slug: "rs-advogados",
    title: "RS Advogados Associados",
    description:
      "Aplicação full-stack em PHP e MySQL com painel administrativo, gerenciador de comentários e proteção contra SQL Injection.",
    url: "https://sergioedugomes.adv.br/",
    image: "/img/RS.png",
    stack: ["PHP", "MySQL"],
  },
];
