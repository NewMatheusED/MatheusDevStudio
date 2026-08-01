import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <Reveal delay={delay}>
      <Card className="group overflow-hidden border-border bg-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_rgba(232,166,80,0.35)]">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 640px) 40rem, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline" className="border-border font-mono text-[11px] text-accent">
                {tech.toLowerCase()}
              </Badge>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:text-foreground"
          >
            Ver projeto <ArrowUpRight size={14} />
          </a>
        </div>
      </Card>
    </Reveal>
  );
}
