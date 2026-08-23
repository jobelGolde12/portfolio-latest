'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';
import { timelineEntries, type TimelineEntry } from '@/data/timeline';

const typeLabel: Record<TimelineEntry['type'], string> = {
  project: 'Project',
  education: 'Education',
  milestone: 'Milestone',
};

function EntryRow({ entry }: { entry: TimelineEntry }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="
        grid gap-x-10 gap-y-3 border-b border-border-subtle py-8 md:py-10
        md:grid-cols-[6rem_1fr] lg:grid-cols-[8rem_20rem_1fr]
      "
    >
      {/* Year gutter */}
      <time
        dateTime={entry.date}
        className="font-mono text-sm text-text-faint tabular-nums"
      >
        {entry.date}
      </time>

      {/* Title block */}
      <div>
        <h3
          className={cn(
            'text-lg font-medium tracking-[-0.01em] text-text-primary',
            entry.featured && 'font-display text-xl font-normal',
          )}
        >
          {entry.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-2 text-[13px] text-text-secondary">
          <span>{entry.organization}</span>
          <span aria-hidden>·</span>
          <span className="editorial-label" style={{ letterSpacing: '0.08em' }}>
            {typeLabel[entry.type]}
          </span>
        </p>

        {entry.tags && entry.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="max-w-md text-sm leading-[1.75] text-text-secondary">
        {entry.description}
      </p>
    </motion.li>
  );
}

export default function Timeline() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="editorial-label">Journey</p>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="experience-heading"
              className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.08] tracking-[-0.03em] text-text-primary"
            >
              Experience<span aria-hidden>.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-[1.7] text-text-secondary">
              A short record of what I have built and studied — projects,
              coursework, and the milestones in between.
            </p>
          </div>
        </div>

        {/* Entries */}
        <ol className="border-t border-border-subtle">
          {timelineEntries.map((entry) => (
            <EntryRow key={`${entry.date}-${entry.title}`} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  );
}
