import { Globe, Palette, LineChart, Server, Workflow, Wrench } from 'lucide-react';

export interface Service {
  icon: typeof Globe;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Full-stack web applications built with Laravel, React, Vue.js, and Next.js — from concept to deployment, with clean code and solid architecture.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Thoughtful interfaces designed for clarity and ease of use. Wireframes, prototypes, and polished visuals tailored to your audience and goals.',
  },
  {
    icon: LineChart,
    title: 'SEO Optimization',
    description:
      'Improve search visibility with semantic markup, performance tuning, structured data, and content strategy that works with search algorithms.',
  },
  {
    icon: Server,
    title: 'REST API Development',
    description:
      'Custom APIs with Laravel — secure, well-documented endpoints designed for speed, scalability, and easy integration by frontend teams.',
  },
  {
    icon: Workflow,
    title: 'System Architecture',
    description:
      'Database design, infrastructure planning, and system architecture that keeps your project maintainable as it grows.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description:
      'Ongoing improvements, bug fixes, performance audits, and technical guidance to keep your systems running smoothly.',
  },
];
