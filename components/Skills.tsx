'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillGroups = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'PHP', 'Java', 'C++', 'Python'],
  },
  {
    title: 'Web',
    skills: [
      'Laravel',
      'React',
      'Vue.js',
      'Next.js',
      'Inertia.js',
      'HTML/CSS',
      'Tailwind',
      'Bootstrap',
    ],
  },
  {
    title: 'Data & tools',
    skills: [
      'MySQL',
      'Git',
      'Postman',
      'Figma',
      'VS Code',
      'XAMPP',
      'Laragon',
    ],
  },
  {
    title: 'Networking',
    skills: ['LAN/WAN', 'IP Addressing', 'Wireshark'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" className="py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header — same rhythm as Projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-emerald-500 font-medium tracking-wider uppercase text-sm">
                Capabilities
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight text-zinc-900 dark:text-white">
                Skills
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-right">
              Stack I use day to day—focused on full-stack web, with a foundation
              in systems and networking.
            </p>
          </div>
        </motion.div>

        {/* Groups */}
        <div className="flex flex-col">
          {skillGroups.map((group, index) => {
            const number = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.05 + index * 0.04,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group py-7 sm:py-8 first:pt-0 last:pb-0
                  border-b border-zinc-100 dark:border-zinc-800/80 last:border-b-0"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-10 lg:gap-14">
                  <div className="flex items-baseline gap-3 sm:w-40 lg:w-48 shrink-0">
                    <span
                      className="font-mono text-xs tracking-widest text-zinc-300 dark:text-zinc-600
                        transition-colors duration-200 group-hover:text-emerald-500/70"
                      aria-hidden
                    >
                      {number}
                    </span>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
                      {group.title}
                    </h3>
                  </div>

                  <ul
                    className="flex flex-wrap gap-2 sm:gap-2.5 flex-1 min-w-0"
                    aria-label={`${group.title} skills`}
                  >
                    {group.skills.map((skill) => (
                      <li key={skill}>
                        <span
                          className="inline-block px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400
                            bg-zinc-100/80 dark:bg-zinc-900/60 rounded-md
                            transition-colors duration-150
                            hover:text-zinc-900 dark:hover:text-zinc-100
                            hover:bg-zinc-200/70 dark:hover:bg-zinc-800/80"
                        >
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
