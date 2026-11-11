export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { id: "trabalhos", label: "Trabalhos", href: "/#trabalhos" },
  { id: "sobre", label: "Sobre", href: "/#sobre" },
  { id: "contato", label: "Contato", href: "/#contato" },
];
