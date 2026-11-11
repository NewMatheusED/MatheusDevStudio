import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

interface FeaturedCaseProps {
  project: Project;
  /** imagem à esquerda, texto à direita */
  flip?: boolean;
}

/** Um trabalho em destaque: texto de um lado, print real do outro. */
export function FeaturedCase({ project, flip = false }: FeaturedCaseProps) {
  return (
    <section
      id={`trabalho-${project.slug}`}
      className={cn("case border-t border-border", project.slug === "fonpack" && "theme-fonpack")}
    >
      <div
        className={cn(
          "wrap grid items-center gap-10 py-[clamp(80px,9vw,140px)] md:gap-16",
          flip ? "md:grid-cols-[1.25fr_1fr]" : "md:grid-cols-[1fr_1.25fr]",
        )}
      >
        <div className={cn(flip && "md:order-2")}>
          <h2 className="display text-[clamp(30px,3.6vw,64px)]">{project.title}</h2>
          <div className="case-muted mt-5 max-w-[52ch] space-y-4 text-[clamp(17px,1.15vw,21px)] leading-relaxed">
            <p>{project.description}</p>
            {project.role && <p>{project.role}</p>}
            {project.result && <p className="case-strong">{project.result}</p>}
          </div>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tecnologias usadas">
            {project.stack.map((tech) => (
              <li key={tech} className="case-tag rounded-md border px-2.5 py-1 text-sm">
                {tech}
              </li>
            ))}
          </ul>
          <a className="case-link btn mt-8" href={project.url} target="_blank" rel="noreferrer">
            {project.linkLabel}
          </a>
        </div>
        {project.image && (
          <div className={cn("case-shot overflow-hidden rounded-[14px] border", "order-first", !flip && "md:order-none")}>
            <Image
              src={project.image}
              alt={`Tela inicial de ${project.title}`}
              width={1600}
              height={1000}
              sizes="(min-width: 768px) 55vw, 100vw"
              className="block h-auto w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
