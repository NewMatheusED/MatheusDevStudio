import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function ProjectsSection() {
  return (
    <section id="projetos" className="px-6 py-24 md:pl-64">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-foreground">Projetos</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={index * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
