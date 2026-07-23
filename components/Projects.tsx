'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import { Card } from '@/components/ui/card';
import { GithubIcon } from './Icons';
import { cn } from '@/lib/utils';

/* ─── Data ─────────────────────────────────────────────── */

const projects = [
  {
    title: 'Profanity Detection API',
    description:
      'REST API focused on Tagalog and regional Filipino terms, built to plug into posts, comments, and messaging without a heavy client.',
    problem: 'Filipino social platforms lack reliable profanity detection for Tagalog and regional dialects, relying on English-only filters that miss most local inappropriate content.',
    decision: 'Built a custom Laravel REST API with a curated lexicon approach instead of ML-based NLP — faster to deploy, zero model-training overhead, and accurate for the specific language domain.',
    metrics: ['~50ms avg response time', 'Supports Tagalog + regional terms', 'REST integration-ready'],
    tech: ['Laravel', 'REST API', 'React'],
    github: 'https://github.com/jobelGolde12/profanity_api.git',
    live: 'https://filipino-profanity-api-latest.vercel.app/',
    category: 'API',
    year: '2024',
    status: 'shipped' as const,
    image: '/images/project_profanity_api.png',
  },
  {
    title: 'Lost and Found System',
    description:
      'A community platform for reporting and recovering lost items — real-time status updates, searchable categories, and a flow built for local use.',
    problem: 'Communities in Bulan lack a centralized system for reporting lost items. Physical bulletin boards and social media posts get buried, making recovery slow and unreliable.',
    decision: 'Used Laravel + Vue.js with Inertia for server-rendered SPA behavior — real-time status updates without WebSocket complexity, and a familiar stack for rapid iteration.',
    metrics: ['Real-time item status', 'Searchable categories', 'Built for local community use'],
    tech: ['Laravel', 'Vue.js', 'Bootstrap', 'Inertia'],
    github: 'https://github.com/jobelGolde12/bulan_lost_and_found3.git',
    category: 'Capstone',
    year: '2024',
    status: 'shipped' as const,
    image: '/images/project_lost_and_found.png',
  },
  {
    title: 'Protec Damayan',
    description:
      'Barangay Bonga mutual-aid system for fund records and disbursements, with automated death announcements over SMS via Semaphore.',
    problem: 'Barangay Bonga\'s mutual-aid fund relied on manual ledger tracking and word-of-mouth announcements, leading to record discrepancies and delayed community notifications.',
    decision: 'Automated fund tracking with Laravel and integrated Semaphore for SMS death announcements — replacing manual processes with reliable, auditable digital records.',
    metrics: ['Automated SMS announcements', 'Digital fund ledger', 'Transparent disbursement records'],
    tech: ['Laravel', 'Vue.js', 'Bootstrap'],
    github: 'https://github.com/jobelGolde12/damayan.git',
    category: 'Community',
    year: '2023',
    status: 'shipped' as const,
    image: null,
  },
  {
    title: 'School Portal',
    description:
      'Student information and access system with role-based authentication for students, teachers, and administrators.',
    problem: 'Students and faculty needed a centralized platform to access grades, announcements, and schedules without relying on scattered email chains and paper-based systems.',
    decision: 'Built with Laravel + Vue.js using Inertia for seamless SPA navigation, with role-based access control to tailor the experience for students, teachers, and administrators.',
    metrics: ['Role-based access (3 user types)', 'Centralized academic info', 'Secure authentication'],
    tech: ['Laravel', 'Vue.js', 'Inertia.js'],
    github: 'https://github.com/jobelGolde12/school_portal.git',
    category: 'Education',
    year: '2023',
    status: 'shipped' as const,
    image: null,
  },
];

const categories = ['All', 'API', 'Capstone', 'Community', 'Education'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.article variants={itemVariants} className="group">
      <Card hoverable className="h-full">
        <div className="flex flex-col gap-4">
          {/* Header: category + status + year */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-text-tertiary" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                {project.category}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge status="success" label={project.status} />
              <time className="text-xs text-text-tertiary font-mono tabular-nums">
                {project.year}
              </time>
            </div>
          </div>

          {/* Project image (if available) */}
          {project.image && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-bg-surface-2">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-text-primary font-semibold tracking-tight" style={{ fontSize: 'var(--text-lg)' }}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-[1.7]">
            {project.description}
          </p>

          {/* Problem + Decision (case study preview) */}
          <div className="space-y-3 rounded-lg bg-bg-base p-4 border border-border-subtle">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-accent-warm mb-1">Problem</p>
              <p className="text-text-secondary text-sm leading-[1.6]">{project.problem}</p>
            </div>
            <div className="border-t border-border-subtle pt-3">
              <p className="text-[11px] font-mono uppercase tracking-wider text-accent-signal mb-1">Decision</p>
              <p className="text-text-secondary text-sm leading-[1.6]">{project.decision}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap gap-3">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-signal-dim text-accent-signal-text text-xs font-mono"
              >
                {metric}
              </span>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.tech.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-2 border-t border-border-subtle">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-signal transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-signal transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              Source code
            </a>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-accent-signal font-mono text-xs tracking-wider uppercase">
                Selected work
              </span>
              <h2 className="text-text-primary mt-2 font-display tracking-[var(--tracking-tight)]" style={{ fontSize: 'var(--text-3xl)' }}>
                Projects
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-[1.7] text-text-secondary sm:text-right">
              Academic and personal systems I&apos;ve built end to end — from
              idea to working code.
            </p>
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-10"
          role="radiogroup"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              role="radio"
              aria-checked={activeFilter === cat}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                activeFilter === cat
                  ? 'bg-accent-signal text-white'
                  : 'bg-bg-surface-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface border border-transparent hover:border-border-subtle',
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 md:mt-14 flex justify-center"
        >
          <a
            href="https://github.com/jobelGolde12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-sm font-medium text-text-secondary hover:text-accent-signal transition-colors"
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
