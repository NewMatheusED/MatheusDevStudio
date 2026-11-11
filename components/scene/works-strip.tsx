import { projects } from "@/content/projects";

const lines: Record<string, string> = {
  beergam: "Plataforma para sellers",
  fonpack: "Vitrine com orçamento",
  "rs-advogados": "Site com painel",
  "jnc-embalagens": "Site institucional",
};

/** Faixa de quatro células no pé da abertura, levando a cada trabalho. Some ao rolar (CSS). */
export function WorksStrip() {
  return (
    <>
      <nav className="strip" aria-label="Trabalhos em destaque">
        {projects
          .filter((p) => p.slug in lines)
          .map((p) => (
            <a key={p.slug} href={`#trabalho-${p.slug}`}>
              <strong>{p.title}</strong>
              <span>{lines[p.slug]}</span>
            </a>
          ))}
      </nav>
      <span className="scroll-hint" role="img" aria-label="Role a página" />
    </>
  );
}
