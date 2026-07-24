'use client';

import { useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Pill } from '@/components/ui/pill';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

const aboutContent = {
  summary: `A passionate programmer with strong experience in developing multiple systems. I enjoy solving problems through code, continuously improving my skills, and exploring different areas of the IT industry. Motivated, adaptable, and eager to learn, I aim to contribute to meaningful projects while expanding my knowledge in software development and emerging technologies.`,
  education: {
    school: 'Sorsogon State University - Bulan Campus',
    degree: 'Bachelor of Science in Information Technology (BSIT)',
    year: '2022 - 2026',
  },
  location: 'Bulan, Sorsogon, Philippines',
  languages: ['English', 'Filipino'],
  interests: ['Web Development', 'Problem Solving', 'System Design', 'UI/UX Design'],
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const labelClass =
  'font-mono text-[11px] tracking-[0.2em] uppercase text-white/35 mb-6';

export default function About() {
  const contentRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);

  const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });
  const isSummaryInView = useInView(summaryRef, { once: true, margin: '-80px' });
  const isEducationInView = useInView(educationRef, { once: true, margin: '-80px' });
  const isLocationInView = useInView(locationRef, { once: true, margin: '-80px' });
  const isLanguagesInView = useInView(languagesRef, { once: true, margin: '-80px' });
  const isInterestsInView = useInView(interestsRef, { once: true, margin: '-80px' });

  const prefersReducedMotion = useReducedMotion();

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="about" className="text-white">
      {/* ---------------------------------------------------------------- */}
      {/* 1. INTRO — full-viewport statement                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-accent-signal font-mono text-xs tracking-wider uppercase mb-4"
        >
          About
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-['Geist',sans-serif] font-light leading-[0.9] tracking-[-0.05em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] mx-auto"
        >
          A bit about me.
        </motion.h2>

        <motion.button
          type="button"
          onClick={scrollToContent}
          aria-label="Scroll to read more about me"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        >
          <span className="font-mono text-[10px] tracking-wider uppercase">Scroll</span>
          <motion.span
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="block w-px h-8 bg-white/40"
          />
        </motion.button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. CONTENT — sticky image (left) + scroll-driven reveals (right)  */}
      {/* ---------------------------------------------------------------- */}
      <div ref={contentRef} className="px-4 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16">
          {/* Left column — sticky image, visible immediately */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isContentInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-28"
            >
              <motion.div
                className="relative w-full max-w-[440px] mx-auto lg:mx-0 aspect-[4/5] lg:max-h-[70vh] overflow-hidden"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        borderRadius: [
                          '60% 40% 55% 45% / 55% 60% 40% 45%',
                          '40% 60% 45% 55% / 60% 45% 55% 40%',
                          '55% 45% 40% 60% / 45% 55% 60% 40%',
                          '45% 55% 60% 40% / 40% 45% 55% 60%',
                          '60% 40% 55% 45% / 55% 60% 40% 45%',
                        ],
                      }
                }
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Jobel V. Golde"
                  fill
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right column — each section has its own huge margin & trigger */}
          <div className="lg:pt-4">

            {/* ── Summary ── */}
            <motion.div
              ref={summaryRef}
              variants={fadeUp}
              initial="hidden"
              animate={isSummaryInView ? 'visible' : 'hidden'}
              className="mt-[70dvh]"
            >
              <p className="text-lg md:text-xl leading-[1.85] text-white/85 font-light tracking-wide">
                {aboutContent.summary}
              </p>
            </motion.div>

            {/* ── Education ── */}
            <motion.div
              ref={educationRef}
              variants={fadeUp}
              initial="hidden"
              animate={isEducationInView ? 'visible' : 'hidden'}
              className="mt-[60dvh]"
            >
              <p className={labelClass}>Education</p>
              <div className="space-y-2.5">
                <h3 className="text-lg md:text-xl font-medium tracking-tight leading-snug">
                  {aboutContent.education.degree}
                </h3>
                <p className="text-sm md:text-base text-white/55 leading-relaxed">
                  {aboutContent.education.school}
                </p>
                <div className="flex items-center gap-4 mt-5 pt-5 border-t border-white/[0.06]">
                  <span className="font-mono text-xs text-white/40 tracking-wider">
                    {aboutContent.education.year}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Location ── */}
            <motion.div
              ref={locationRef}
              variants={fadeUp}
              initial="hidden"
              animate={isLocationInView ? 'visible' : 'hidden'}
              className="mt-[60dvh]"
            >
              <p className={labelClass}>Based in</p>
              <p className="text-base md:text-lg font-light text-white/80 tracking-wide">
                {aboutContent.location}
              </p>
              <MapView />
            </motion.div>

            {/* ── Languages ── */}
            <motion.div
              ref={languagesRef}
              variants={fadeUp}
              initial="hidden"
              animate={isLanguagesInView ? 'visible' : 'hidden'}
              className="mt-[60dvh]"
            >
              <p className={labelClass}>Languages</p>
              <div className="flex flex-wrap gap-2.5">
                {aboutContent.languages.map((lang) => (
                  <Pill key={lang}>{lang}</Pill>
                ))}
              </div>
            </motion.div>

            {/* ── Interests ── */}
            <motion.div
              ref={interestsRef}
              variants={fadeUp}
              initial="hidden"
              animate={isInterestsInView ? 'visible' : 'hidden'}
              className="mt-[60dvh] mb-[60dvh]"
            >
              <p className={labelClass}>Interests</p>
              <div className="flex flex-wrap gap-2.5">
                {aboutContent.interests.map((interest) => (
                  <Pill key={interest}>{interest}</Pill>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}