export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "Sass", "Bootstrap", "jQuery"],
  },
  {
    category: "Backend",
    skills: ["PHP", "MySQL", "Python"],
  },
  {
    category: "Ferramentas",
    skills: ["Git", "GitHub", "NPM"],
  },
];
