'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';

interface TimelineEntry {
  date: string;
  title: string;
  organization: string;
  type: 'project' | 'education' | 'milestone';
  description: string;
  tags?: string[];
  featured?: boolean;
}

const entries: TimelineEntry[] = [
  {
    date: '2024',
    title: 'Profanity Detection API',
    organization: 'Independent Project',
    type: 'milestone',
    description: 'Built a custom REST API for Filipino profanity detection, specialized in Tagalog and regional terms. Deployed and integrated by external services.',
    tags: ['Laravel', 'REST API', 'React'],
    featured: true,
  },
  {
    date: '2024',
    title: 'Lost and Found System',
    organization: 'Capstone Project',
    type: 'project',
    description: 'Community platform for reporting and recovering lost items with real-time status updates and searchable categories.',
    tags: ['Laravel', 'Vue.js', 'Inertia'],
  },
  {
    date: '2023',
    title: 'Protec Damayan',
    organization: 'Barangay Bonga',
    type: 'project',
    description: 'Mutual-aid system for fund records and disbursements with automated SMS death announcements via Semaphore.',
    tags: ['Laravel', 'Vue.js', 'SMS Integration'],
  },
  {
    date: '2023',
    title: 'School Portal',
    organization: 'University Project',
    type: 'project',
    description: 'Student information and access system with role-based authentication for students, teachers, and administrators.',
    tags: ['Laravel', 'Vue.js', 'Inertia.js'],
  },
  {
    date: '2022',
    title: 'BSIT Enrollment',
    organization: 'Sorsogon State University',
    type: 'education',
    description: 'Began Bachelor of Science in Information Technology at Bulan Campus. Focused on software development and systems design.',
    tags: ['BSIT', 'Sorsogon State University'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [showAll, setShowAll] = useState(false);

  const displayEntries = showAll ? entries : entries.slice(0, 4);

  return (
    <section id="experience" className="py-24 md:py-32 px-4 text-white" ref={ref}>
      <div className="max-w-[720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-12 md:mb-16"
        >
          <span className="text-accent-signal font-mono text-xs tracking-wider uppercase">
            Journey
          </span>
          <h2 className="mt-2 font-display tracking-[var(--tracking-tight)]" style={{ fontSize: 'var(--text-3xl)' }}>
            Experience
          </h2>
        </motion.div>

        {/* Timeline rail */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border-subtle" />

          <div className="space-y-0">
            <AnimatePresence>
              {displayEntries.map((entry, index) => (
                <motion.div
                  key={`${entry.date}-${entry.title}`}
                  variants={itemVariants}
                  className="relative flex gap-6 pb-8 last:pb-0"
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0 mt-1">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        entry.featured
                          ? 'bg-accent-warm/20 ring-2 ring-accent-warm'
                          : entry.type === 'education'
                            ? 'bg-accent-signal-dim ring-2 ring-accent-signal'
                            : 'bg-bg-surface-2 ring-2 ring-border-subtle',
                      )}
                    >
                      <div
                        className={cn(
                          'w-2.5 h-2.5 rounded-full',
                          entry.featured
                            ? 'bg-accent-warm'
                            : entry.type === 'education'
                              ? 'bg-accent-signal'
                              : 'bg-text-tertiary',
                        )}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <time className="text-xs font-mono text-white/50 tabular-nums">
                        {entry.date}
                      </time>
                      <span className="text-xs text-white/50">·</span>
                      <span className="text-xs text-white/50">
                        {entry.organization}
                      </span>
                    </div>

                    <h3 className="font-medium text-sm mb-1.5">
                      {entry.title}
                    </h3>

                    <p className="text-sm leading-[1.6] mb-3">
                      {entry.description}
                    </p>

                    {entry.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Show more/less */}
        {entries.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-white/50 hover:text-accent-signal transition-colors"
            >
              {showAll ? 'Show less' : `Show earlier history (${entries.length - 4} more)`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
