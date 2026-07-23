'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Mouse parallax
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background depth layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#0a0a0a] to-[#050505]" />
        
        {/* Soft spotlight glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(180, 180, 180, 0.15) 0%, transparent 70%)',
            transform: prefersReducedMotion ? 'none' : `translate(calc(-50% + ${mousePosition.x * 20}px), calc(-50% + ${mousePosition.y * 20}px))`,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Editorial grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }}
        />

        {/* Subtle vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      {/* Main content container - 50/50 split */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[85vh] py-12">
        
        {/* Left column - Typography (50% width) */}
        <div className="flex flex-col space-y-6 lg:space-y-8 order-2 lg:order-1">
          {/* Status Badge - Premium floating pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex"
          >
           
          </motion.div>

          {/* Large name - Editorial typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Geist',sans-serif] font-light leading-[0.9] tracking-[-0.05em]"
          >
            <span className="text-[clamp(3.5rem,8vw,7rem)] text-white inline mt-[-0.05em] me-3">
              Jobel
            </span>
            <span className="text-[clamp(3.5rem,8vw,7rem)] text-white inline mt-[-0.05em]">
              Golde
            </span>
          </motion.h1>

          {/* Professional title with thin style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <p className="font-['Geist',sans-serif] font-light text-[clamp(0.8rem,1.2vw,1.2rem)] tracking-[0.15em] uppercase text-white/40">
              Software Engineer
            </p>
            
            {/* Rotating specialization */}
            <div className="h-8 flex items-center">
              <span className="text-white/60 text-[clamp(0.85rem,1vw,1rem)] tracking-wide">
                Specializing in{' '}
                {isMounted && !prefersReducedMotion ? (
                  <span className="relative inline-block text-white/90 font-medium">
                    {specializations.map((spec, i) => (
                      <span
                        key={spec}
                        className={cn(
                          'absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                          i === specIndex
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2 pointer-events-none'
                        )}
                        aria-hidden={i !== specIndex}
                      >
                        {spec}
                      </span>
                    ))}
                    <span className="invisible">{specializations[specIndex]}</span>
                  </span>
                ) : (
                  <span className="text-white/90 font-medium">{specializations[0]}</span>
                )}
              </span>
            </div>
          </motion.div>

          {/* Location - Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex items-center gap-2 text-white/30 text-sm tracking-wide pt-2"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Sorsogon, Philippines</span>
          </motion.div>

          {/* CTA Buttons - Premium redesign */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-black font-medium text-sm tracking-wide rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                See projects
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/80" />
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-transparent border border-white/15 text-white/80 font-medium text-sm tracking-wide rounded-full hover:bg-white/5 hover:border-white/25 transition-all duration-300"
            >
              Get in touch
            </motion.a>
          </motion.div>

          {/* Tech stack - Subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 pt-6"
          >
            {techStack.map((tech, index) => (
              <span
                key={tech}
                className="px-3 py-1.5 border border-white/5 bg-white/[0.02] font-mono text-[0.65rem] tracking-[0.1em] uppercase text-white/30 rounded-full"
                style={{ transitionDelay: `${index * 20}ms` }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right column - Large portrait with cinematic treatment (50% width) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2 relative flex items-center justify-center"
          style={{
            transform: prefersReducedMotion ? 'none' : `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px)`,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Portrait container with cinematic styling */}
          <div className="relative w-full max-w-[520px] aspect-[4/5]">
            {/* Soft radial backlight */}
            <div 
              className="absolute inset-0 rounded-3xl blur-[80px] opacity-30"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
              }}
            />

            {/* Main portrait with feathered edge */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)',
              }} />
              
              {/* Warm rim light gradient */}
              <div className="absolute inset-0 z-10 pointer-events-none" style={{
                background: 'linear-gradient(135deg, rgba(255,200,150,0.08) 0%, transparent 50%, rgba(150,180,255,0.04) 100%)',
              }} />

              <Image
                src="/me2.png"
                alt="Jobel V. Golde"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover object-center scale-105"
                style={{
                  filter: 'contrast(1.05) saturate(0.95) brightness(0.85)',
                }}
              />

              {/* Feathered edge overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none rounded-3xl" style={{
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4)',
              }} />
            </div>

            {/* Premium decorative frame line */}
            <div className="absolute -inset-2 rounded-[2rem] border border-white/[0.03] pointer-events-none" />
          </div>

          {/* Editorial decorative elements */}
          <div className="absolute -bottom-4 -left-4 w-12 h-12 border-l border-b border-white/[0.04] pointer-events-none hidden xl:block" />
          <div className="absolute -top-4 -right-4 w-12 h-12 border-r border-t border-white/[0.04] pointer-events-none hidden xl:block" />
        </motion.div>
      </div>

      {/* Scroll indicator - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/20 hover:text-white/40 transition-colors"
        >
          <span className="text-[0.55rem] tracking-[0.2em] uppercase font-mono">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.a>
      </motion.div>
    </section>
  );
}