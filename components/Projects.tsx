'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ─── Data ─────────────────────────────────────────────── */

interface Project {
  title: string;
  image: string | null;
  gradient: string;
}

const projects: Project[] = [
  {
    title: 'Profanity Detection API',
    image: '/images/project_profanity_api.png',
    gradient: 'from-violet-500/80 to-indigo-900/80',
  },
  {
    title: 'Lost and Found System',
    image: '/images/project_lost_and_found.png',
    gradient: 'from-emerald-500/80 to-teal-900/80',
  },
  {
    title: 'Protec Damayan',
    image: null,
    gradient: 'from-amber-500 via-orange-500 to-rose-700',
  },
  {
    title: 'School Portal',
    image: null,
    gradient: 'from-sky-500 via-blue-600 to-indigo-800',
  },
];

/* ─── Helpers ──────────────────────────────────────────── */

const CARD_WIDTH_VW = 70;
const GAP_VW = 2.5;
const FIRST_CARD_OFFSET_VW = 5; // left padding so first card isn't flush

const totalContentWidthVW =
  projects.length * CARD_WIDTH_VW +
  (projects.length - 1) * GAP_VW +
  FIRST_CARD_OFFSET_VW;

const xTravelVW = -(totalContentWidthVW - 100); // negative = scroll left

/* ─── Component ────────────────────────────────────────── */

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `${xTravelVW}vw`]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${totalContentWidthVW}vw)` }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* ── Horizontal track ── */}
        <motion.div
          className="flex items-center gap-[2.5vw] pl-[5vw]"
          style={{ x }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="relative w-[70vw] flex-shrink-0 aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
            >
              {project.image ? (
                <>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="70vw"
                    className="object-cover brightness-[1.15] contrast-[1.1]"
                    priority={i < 2}
                  />
                  {/* Thin gradient edge to soften the image against the dark page */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06] rounded-2xl pointer-events-none" />
                </>
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
