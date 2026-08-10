/**
 * Skill groups with per-skill proficiency levels:
 *   4 = advanced · 3 = proficient · 2 = intermediate · 1 = familiar
 * Adjust the levels to match reality — honesty reads better than over-rating.
 */

export type SkillLevel = 1 | 2 | 3 | 4;

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: { name: string; level: SkillLevel }[];
}

export const LEVEL_LABELS: Record<SkillLevel, string> = {
  1: 'familiar',
  2: 'intermediate',
  3: 'proficient',
  4: 'advanced',
};

export const MAX_LEVEL = 4;

export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    title: 'Core engineering',
    description: "Languages & paradigms I'm genuinely fluent in",
    skills: [
      { name: 'JavaScript', level: 4 },
      { name: 'PHP', level: 4 },
      { name: 'Java', level: 3 },
      { name: 'C++', level: 3 },
      { name: 'Python', level: 3 },
    ],
  },
  {
    id: 'systems',
    title: 'Systems & infrastructure',
    description: 'Where I operate — databases, networking, data',
    skills: [
      { name: 'MySQL', level: 4 },
      { name: 'phpMyAdmin', level: 4 },
      { name: 'LAN/WAN', level: 3 },
      { name: 'IP Addressing', level: 3 },
      { name: 'Wireshark', level: 2 },
    ],
  },
  {
    id: 'craft',
    title: 'Craft & tooling',
    description: 'The day-to-day tools that shape how I work',
    skills: [
      { name: 'Laravel', level: 4 },
      { name: 'React', level: 4 },
      { name: 'Vue.js', level: 4 },
      { name: 'Next.js', level: 3 },
      { name: 'Inertia.js', level: 4 },
      { name: 'HTML/CSS', level: 4 },
      { name: 'Tailwind', level: 4 },
      { name: 'Bootstrap', level: 4 },
      { name: 'Git', level: 4 },
      { name: 'Postman', level: 4 },
      { name: 'Figma', level: 3 },
      { name: 'VS Code', level: 4 },
      { name: 'XAMPP', level: 4 },
      { name: 'Laragon', level: 4 },
    ],
  },
  {
    id: 'exploring',
    title: 'Currently exploring',
    description: 'Actively learning right now',
    skills: [
      { name: 'TypeScript', level: 2 },
      { name: 'Docker', level: 1 },
      { name: 'Cloud Platforms', level: 1 },
    ],
  },
];
