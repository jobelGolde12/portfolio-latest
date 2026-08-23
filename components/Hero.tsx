'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const specializations = [
  'full-stack web apps',
  'REST APIs',
  'developer tooling',
  'community systems',
];

const techStack = ['Laravel', 'React', 'Next.js', 'Vue.js', 'TypeScript', 'MySQL'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [specIndex, setSpecIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Rotate specialization text (static under reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setSpecIndex((prev) => (prev + 1) % specializations.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-bg-base pt-28 pb-16 sm:pt-32 lg:min-h-[92vh] lg:pt-24 lg:pb-20"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        {/* ── Left — typography (columns 1–7) ── */}
        <div className="flex flex-col items-start lg:col-span-7">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="editorial-label mb-6"
          >
            Software engineer · Full-stack
          </motion.p>

          {/* Name — the dominant typographic object */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,9vw,6.75rem)] font-light leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-text-primary"
          >
            Jobel Golde.
          </motion.h1>

          {/* Value proposition — one short editorial line */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-lg leading-[1.5] text-text-secondary"
          >
            Building systems that stay boring under load — specializing in{' '}
            {!prefersReducedMotion ? (
              <span className="relative inline-block whitespace-nowrap align-baseline">
                {specializations.map((spec, i) => (
                  <span
                    key={spec}
                    className={cn(
                      'absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      i === specIndex
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-1 opacity-0',
                    )}
                    aria-hidden={i !== specIndex}
                  >
                    {spec}.
                  </span>
                ))}
                {/* Invisible sizer prevents layout shift while rotating */}
                <span className="invisible">{specializations[specIndex]}.</span>
              </span>
            ) : (
              <span>{specializations[0]}.</span>
            )}
          </motion.p>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="mt-5 flex items-center gap-2 text-sm text-text-tertiary"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Sorsogon, Philippines
          </motion.p>

          {/* CTAs — one compact dark button + one text link */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <a
              href="#projects"
              className="group inline-flex min-h-11 items-center gap-2 rounded-sm bg-ink px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              See projects
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a
              href="#contact"
              className="editorial-link group min-h-11 items-center py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              Get in touch
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </motion.div>

          {/* Stack — quiet mono tags */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            aria-label="Core technologies"
            className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-2"
          >
            {techStack.map((tech) => (
              <li
                key={tech}
                className="border border-border-subtle bg-bg-surface px-2.5 py-1 font-mono text-[11px] tracking-wide text-text-secondary"
              >
                {tech}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ── Right — one dominant visual (columns 8–12) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <figure className="relative mx-auto w-full max-w-[400px] lg:max-w-none lg:-translate-y-2 lg:translate-x-2">
            {/* Single dominant visual — settles gently under a fine pointer */}
            <div className="hero-portrait overflow-hidden rounded-sm">
              <Image
                src="/profile.png"
                alt="Portrait of Jobel V. Golde"
                width={1254}
                height={1254}
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption className="editorial-label mt-3 flex items-center justify-between">
              <span>Jobel V. Golde</span>
              <span aria-hidden>Bulan, Sorsogon ↗</span>
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
