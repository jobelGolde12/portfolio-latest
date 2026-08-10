'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ─── Data ─────────────────────────────────────────────── */

interface Project {
  title: string;
  image: string | null;
  gradient: string;
  link: string;
}

const projects: Project[] = [
  {
    title: 'Profanity Detection API',
    image: '/images/project_profanity_api.png',
    gradient: 'from-violet-500/80 to-indigo-900/80',
    link: 'https://filipino-profanity-api-latest.vercel.app/?fbclid=IwY2xjawTQHvRleHRuA2FlbQIxMABicmlkETFPaTlrYkFpWWJXQmJZM2t0c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHm6csQVvHFJnFC0wiHyGPLWtfrYWUhUp5Ma77zfzX7qQ6dpyPbWtsEgVbqgg_aem_TrYXt57tRJKARQ_7vM1myQ',
  },
  {
    title: 'TrailMates',
    image: '/images/project_trailmates.png',
    gradient: 'from-violet-500/80 to-indigo-900/80',
    link: 'https://companion-hike.onrender.com/',
  },
  { 
    title: 'TaskMind',
    image: '/images/project_taskmind.png',
    gradient: 'from-emerald-500/80 to-teal-900/80',
    link: 'https://whatshouldido-five.vercel.app/',
  },
  {
    title: 'Suitora',
    image: '/images/project_suitora.png',
    gradient: 'from-amber-500 via-orange-500 to-rose-700',
    link: 'https://suitora-kappa.vercel.app/',
  },
  {
    title: 'Dugtong',
    image: '/images/project_dugtong.png',
    gradient: 'from-sky-500 via-blue-600 to-indigo-800',
    link: 'https://github.com/jobelGolde12/DUGTONG',
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

/* ─── Card ─────────────────────────────────────────────── */

/**
 * Project media card.
 *
 * Uses a padding-bottom aspect-ratio box so height is never 0 when the only
 * child is an absolutely positioned image (a common flex + `fill` collapse).
 * Gradient is always painted underneath so the card is visible even if the
 * image fails to load.
 */
function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image) && !imageFailed;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-[70vw] flex-none rounded-2xl overflow-hidden shadow-2xl shadow-black/30 block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      aria-label={project.title}
    >
      {/* 16:9 aspect box — height comes from width, independent of children */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {/* Always-on gradient base (visible by default / on image failure) */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            project.gradient,
          )}
          aria-hidden
        />

        {showImage && project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="70vw"
            priority={priority}
            className="object-cover brightness-[1.15] contrast-[1.1]"
            onError={() => setImageFailed(true)}
          />
        )}

        {/* Soft edge ring */}
        <div
          className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] pointer-events-none"
          aria-hidden
        />

        {/* Title label so cards remain identifiable without image */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none">
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-white tracking-tight">
            {project.title}
          </h3>
        </div>
      </div>
    </a>
  );
}

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
      aria-label="Projects"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* ── Horizontal track ── */}
        <motion.div
          className="flex items-center gap-[2.5vw] pl-[5vw] will-change-transform"
          style={{ x }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              priority={i < 2}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
