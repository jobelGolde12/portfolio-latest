'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TerminalArtifact = dynamic(() => import('@/components/TerminalArtifact'), { ssr: false });

const specializations = [
  'full-stack web apps',
  'REST APIs',
  'developer tooling',
  'community systems',
];

const techStack = [
  'Laravel',
  'React',
  'Next.js',
  'Vue.js',
  'TypeScript',
  'MySQL',
];

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [specIndex, setSpecIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Rotate specialization text
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setSpecIndex((prev) => (prev + 1) % specializations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-signal-dim rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        {/* Status line — signal motif first appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Badge status="success" label="Available for new roles — usually replies within a day" />
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden ring-2 ring-border-subtle ring-offset-4 ring-offset-bg-base">
            <Image
              src="/profile.jpg"
              alt="Jobel V. Golde"
              fill
              priority
              sizes="(max-width: 768px) 96px, 112px"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAAACoB//Z"
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-text-primary leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] mb-6"
          style={{ fontSize: 'var(--text-5xl)' }}
        >
          I build systems that{' '}
          <span className="text-accent-signal italic">stay boring</span>
          <br />
          under load.
        </motion.h1>

        {/* Rotating subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 h-7 flex items-center justify-center"
        >
          <span className="text-text-secondary text-lg">
            Specializing in{' '}
            {isMounted && !prefersReducedMotion ? (
              <span className="relative inline-block">
                {specializations.map((spec, i) => (
                  <span
                    key={spec}
                    className={cn(
                      'absolute inset-0 transition-all duration-500',
                      i === specIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2 pointer-events-none',
                    )}
                    aria-hidden={i !== specIndex}
                  >
                    {spec}
                  </span>
                ))}
                <span className="invisible">{specializations[specIndex]}</span>
              </span>
            ) : (
              <span className="text-text-primary font-medium">{specializations[0]}</span>
            )}
          </span>
        </motion.div>

        {/* Name + location */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-3 text-sm text-text-tertiary mb-10"
        >
          <span className="font-medium text-text-secondary">Jobel V. Golde</span>
          <span className="w-1 h-1 rounded-full bg-text-tertiary" />
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            Sorsogon, Philippines
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent-signal text-white font-medium text-sm shadow-md hover:brightness-110 hover:shadow-lg transition-all duration-200"
          >
            See projects
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-border-strong text-text-primary font-medium text-sm hover:bg-bg-surface-2 transition-all duration-200"
          >
            Get in touch
          </motion.a>
        </motion.div>

        {/* Tech stack preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-16"
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-bg-surface border border-border-subtle font-mono text-xs text-text-tertiary"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Terminal artifact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[560px] mx-auto"
        >
          <TerminalArtifact />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-text-tertiary hover:text-text-secondary transition-colors"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
