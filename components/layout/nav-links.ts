export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { id: "sobre", label: "Sobre", href: "#sobre" },
  { id: "projetos", label: "Projetos", href: "#projetos" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contato", label: "Contato", href: "#contato" },
];
