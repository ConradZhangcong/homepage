export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["React", "TypeScript", "Vue", "SCSS", "Tailwind CSS", "Next.js"],
  },
  {
    label: "Tools & Platform",
    skills: ["Node.js", "Vite", "Git", "Docker", "CI/CD", "Linux"],
  },
  {
    label: "Exploring",
    skills: ["AI Agent", "LLM", "Prompt Engineering", "Python"],
  },
];
