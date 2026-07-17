'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

const projects = [
  {
    title: 'Lost and Found System',
    description:
      'A community platform for reporting and recovering lost items—real-time status updates, searchable categories, and a flow built for local use.',
    tech: ['Laravel', 'Vue.js', 'Bootstrap', 'Inertia'],
    github: 'https://github.com/jobelGolde12/bulan_lost_and_found3.git',
    category: 'Capstone',
    year: '2024',
  },
  {
    title: 'Profanity Detection API',
    description:
      'REST API focused on Tagalog and regional Filipino terms, built to plug into posts, comments, and messaging without a heavy client.',
    tech: ['Laravel', 'REST API', 'React'],
    github: 'https://github.com/jobelGolde12/profanity_api.git',
    category: 'API',
    year: '2024',
  },
  {
    title: 'Protec Damayan',
    description:
      'Barangay Bonga mutual-aid system for fund records and disbursements, with automated death announcements over SMS via Semaphore.',
    tech: ['Laravel', 'Vue.js', 'Bootstrap'],
    github: 'https://github.com/jobelGolde12/damayan.git',
    category: 'Community',
    year: '2023',
  },
];

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.08 + index * 0.1,
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative"
    >
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl px-5 py-6 sm:px-7 sm:py-8
          bg-zinc-50/80 dark:bg-zinc-900/40
          transition-[background-color,transform,box-shadow] duration-300 ease-out
          hover:bg-zinc-100/90 dark:hover:bg-zinc-900/70
          hover:-translate-y-0.5
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2
          focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8 lg:gap-10">
          {/* Index */}
          <span
            className="shrink-0 font-mono text-sm tracking-widest text-zinc-300 dark:text-zinc-600
              sm:pt-1 sm:w-10 transition-colors duration-300
              group-hover:text-emerald-500/80"
            aria-hidden
          >
            {number}
          </span>

          {/* Body */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                {project.category}
              </span>
              <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700" aria-hidden>
                ·
              </span>
              <time className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                {project.year}
              </time>
            </div>

            <div className="flex items-start justify-between gap-4">
              <h3
                className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50
                  transition-colors duration-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
              >
                {project.title}
              </h3>
              <span
                className="mt-1 shrink-0 flex h-9 w-9 items-center justify-center rounded-full
                  bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400
                  transition-all duration-300
                  group-hover:bg-emerald-500 group-hover:text-white
                  group-hover:rotate-12"
                aria-hidden
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>

            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-1 gap-y-2" aria-label="Technologies used">
              {project.tech.map((tech, i) => (
                <li key={tech} className="flex items-center text-sm text-zinc-500 dark:text-zinc-500">
                  {i > 0 && (
                    <span className="mx-2 text-zinc-300 dark:text-zinc-700 select-none" aria-hidden>
                      /
                    </span>
                  )}
                  <span className="transition-colors duration-200 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header — matches About / Skills rhythm */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-emerald-500 font-medium tracking-wider uppercase text-sm">
                Selected work
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight text-zinc-900 dark:text-white">
                Projects
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-right">
              Academic and personal systems I&apos;ve built end to end—from
              idea to working code.
            </p>
          </div>
        </motion.div>

        {/* Project list */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Quiet footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-12 md:mt-14 flex justify-center sm:justify-start"
        >
          <a
            href="https://github.com/jobelGolde12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-sm font-medium text-zinc-500 dark:text-zinc-400
              hover:text-zinc-900 dark:hover:text-white transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-sm"
          >
            <GithubIcon className="h-4 w-4" />
            <span>More on GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
