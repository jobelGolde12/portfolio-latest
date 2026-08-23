'use client';

import { motion } from 'framer-motion';
import { skillGroups, LEVEL_LABELS } from '@/data/skills';

/* ─── SkillBadge ─────────────────────────────────────────── */
function SkillBadge({ skill }: { skill: { name: string; level: keyof typeof LEVEL_LABELS } }) {
  return (
    <span
      className="
        inline-flex items-center
        border border-border-subtle bg-bg-base
        px-2.5 py-1.5
        text-[13px] text-text-primary
        transition-colors duration-200
        hover:border-border-strong
      "
      title={`${skill.name} — ${LEVEL_LABELS[skill.level]}`}
    >
      {skill.name}
    </span>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="editorial-label">Capabilities</p>
          </div>
          <div className="lg:col-span-8">
            <motion.h2
              id="skills-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.08] tracking-[-0.03em]"
            >
              Skills.
            </motion.h2>
            <p className="mt-4 max-w-md text-sm leading-[1.7] text-text-secondary">
              Stack I use day to day — focused on full-stack web, with a foundation in
              systems and networking.
            </p>
          </div>
        </div>

        {/* Index rows */}
        <div className="border-t border-border-subtle">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: Math.min(i * 0.06, 0.18),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                grid gap-x-10 gap-y-4 border-b border-border-subtle py-8
                md:grid-cols-[10rem_16rem_1fr] md:py-10
              "
            >
              {/* Group title + index number */}
              <h3 className="text-base font-medium text-text-primary">
                <span className="mr-3 font-mono text-xs text-text-faint" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {group.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-[1.65] text-text-secondary">{group.description}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2" role="list" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <span key={skill.name} role="listitem" className="inline-flex">
                    <SkillBadge skill={skill} />
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
