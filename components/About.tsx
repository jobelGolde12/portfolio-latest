'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { Pill } from '@/components/ui/pill';
import { aboutContent } from '@/data/about';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section header — label left, statement right */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="editorial-label"
              id="about-label"
            >
              About
            </motion.p>
          </div>

          <div className="lg:col-span-8">
            <motion.h2
              id="about-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.08] tracking-[-0.03em] text-text-primary"
            >
              A developer who enjoys the unglamorous parts —
              <span className="text-text-secondary"> the schema, the edge cases, the handoff.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base leading-[1.75] text-text-secondary"
            >
              {aboutContent.summary}
            </motion.p>
          </div>
        </div>

        {/* Detail rows — editorial index */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid gap-x-12 gap-y-10 border-t border-border-subtle pt-10 md:grid-cols-2 md:pt-12"
        >
          {/* Education */}
          <div>
            <p className="editorial-label mb-4">Education</p>
            <h3 className="text-base font-medium text-text-primary">
              {aboutContent.education.degree}
            </h3>
            <p className="mt-1.5 text-sm text-text-secondary">{aboutContent.education.school}</p>
            <p className="mt-3 font-mono text-xs text-text-tertiary">
              {aboutContent.education.year}
            </p>
          </div>

          {/* Languages & interests */}
          <div className="space-y-8">
            <div>
              <p className="editorial-label mb-4">Languages</p>
              <div className="flex flex-wrap gap-2">
                {aboutContent.languages.map((lang) => (
                  <Pill key={lang}>{lang}</Pill>
                ))}
              </div>
            </div>
            <div>
              <p className="editorial-label mb-4">Interests</p>
              <div className="flex flex-wrap gap-2">
                {aboutContent.interests.map((interest) => (
                  <Pill key={interest}>{interest}</Pill>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location + map */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <p className="editorial-label mb-4">Based in</p>
          <p className="mb-6 text-base text-text-primary">{aboutContent.location}</p>
          <MapView />
        </motion.div>
      </div>
    </section>
  );
}
