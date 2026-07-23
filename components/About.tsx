'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Pill } from '@/components/ui/pill';

const aboutContent = {
  summary: `A passionate programmer with strong experience in developing multiple systems. I enjoy solving problems through code, continuously improving my skills, and exploring different areas of the IT industry. Motivated, adaptable, and eager to learn, I aim to contribute to meaningful projects while expanding my knowledge in software development and emerging technologies.`,
  education: {
    school: 'Sorsogon State University - Bulan Campus',
    degree: 'Bachelor of Science in Information Technology (BSIT)',
    year: '2022 - Present',
  },
  location: 'Bonga, Bulan, Sorsogon, Philippines',
  languages: ['English', 'Filipino'],
  interests: ['Web Development', 'Problem Solving', 'System Design', 'UI/UX Design'],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-[720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-accent-signal font-mono text-xs tracking-wider uppercase">
            About
          </span>
          <h2 className="text-text-primary mt-2 font-display tracking-[var(--tracking-tight)]" style={{ fontSize: 'var(--text-3xl)' }}>
            A bit about me
          </h2>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[280px] mx-auto mb-8 aspect-square rounded-xl overflow-hidden ring-1 ring-border-subtle">
              <Image
                src="/profile.jpg"
                alt="Jobel V. Golde"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="text-text-secondary leading-[1.7]" style={{ fontSize: 'var(--text-base)' }}>
              {aboutContent.summary}
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <p className="text-text-tertiary text-xs mb-1.5 font-mono uppercase tracking-wider">Education</p>
                <p className="font-medium text-text-primary text-sm leading-snug">{aboutContent.education.degree}</p>
              </Card>
              <Card>
                <p className="text-text-tertiary text-xs mb-1.5 font-mono uppercase tracking-wider">University</p>
                <p className="font-medium text-text-primary text-sm">{aboutContent.education.school}</p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-text-tertiary text-xs mb-3 font-mono uppercase tracking-wider">Languages</p>
              <div className="flex flex-wrap gap-2">
                {aboutContent.languages.map((lang) => (
                  <Pill key={lang}>{lang}</Pill>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-text-tertiary text-xs mb-3 font-mono uppercase tracking-wider">Interests</p>
              <div className="flex flex-wrap gap-2">
                {aboutContent.interests.map((interest) => (
                  <Pill key={interest}>{interest}</Pill>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
