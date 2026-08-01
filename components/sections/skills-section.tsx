import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { skillCategories } from "@/content/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-24 md:pl-64">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-foreground">Skills</h2>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.category} delay={index * 0.08}>
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">{category.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-border text-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
