'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Pill } from '@/components/ui/pill';

const skillGroups = [
  {
    id: 'core',
    title: 'Core engineering',
    description: 'Languages & paradigms I\'m genuinely fluent in',
    skills: ['JavaScript', 'PHP', 'Java', 'C++', 'Python'],
  },
  {
    id: 'systems',
    title: 'Systems & infrastructure',
    description: 'Where I operate — databases, networking, data',
    skills: ['MySQL', 'phpMyAdmin', 'LAN/WAN', 'IP Addressing', 'Wireshark'],
  },
  {
    id: 'craft',
    title: 'Craft & tooling',
    description: 'The day-to-day tools that shape how I work',
    skills: [
      'Laravel',
      'React',
      'Vue.js',
      'Next.js',
      'Inertia.js',
      'HTML/CSS',
      'Tailwind',
      'Bootstrap',
      'Git',
      'Postman',
      'Figma',
      'VS Code',
      'XAMPP',
      'Laragon',
    ],
  },
  {
    id: 'exploring',
    title: 'Currently exploring',
    description: 'Actively learning right now',
    skills: ['TypeScript', 'Docker', 'Cloud Platforms'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" className="py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-accent-signal font-mono text-xs tracking-wider uppercase">
                Capabilities
              </span>
              <h2 className="text-text-primary mt-2 font-display tracking-[var(--tracking-tight)]" style={{ fontSize: 'var(--text-3xl)' }}>
                Skills
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-[1.7] text-text-secondary sm:text-right">
              Stack I use day to day — focused on full-stack web, with a foundation
              in systems and networking.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.id}
              variants={itemVariants}
              className="rounded-xl border border-border-subtle bg-bg-surface p-6"
            >
              <div className="mb-4">
                <h3 className="text-text-primary font-medium text-sm">
                  {group.title}
                </h3>
                <p className="text-text-tertiary text-xs mt-0.5">
                  {group.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
