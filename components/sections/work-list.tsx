import type { Project } from "@/content/projects";

/** Lista simples de trabalhos: uma linha inteira clicável por projeto. */
export function WorkList({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <section className="border-t border-border">
      <div className="wrap py-[clamp(72px,8vw,120px)]">
        <h2 className="display text-[clamp(28px,3vw,52px)]">{title}</h2>
        <ul className="mt-10">
          {projects.map((project) => (
            <li key={project.slug} id={`trabalho-${project.slug}`} className="border-t border-border">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-1 py-6 md:grid-cols-[1fr_1.6fr_auto] md:items-baseline md:gap-8"
              >
                <strong className="text-[clamp(20px,1.5vw,26px)] font-semibold transition-colors group-hover:text-accent group-focus-visible:text-accent">
                  {project.title}
                </strong>
                <span className="text-muted-foreground">
                  {project.description}
                  <span className="mt-1 block text-sm">{project.stack.join(", ")}</span>
                </span>
                <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {project.linkLabel}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
